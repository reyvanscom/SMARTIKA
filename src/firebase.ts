import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  getDocFromServer,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Unsubscribe
} from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write'
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email
        })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

// Blueprint validation constants matching firebase-blueprint.json & firestore.rules
const ID_REGEX = /^[a-zA-Z0-9_\-]+$/;
const DEFAULT_TEACHER_PIN_HASH = 'sec_1cf7e71cc2a8a2';

function sanitizeBoundedString(val: unknown, maxLen: number, fallback = ''): string {
  const str = typeof val === 'string' ? val.trim() : fallback;
  return str.slice(0, maxLen);
}

function sanitizeSafeId(val: string, fallback = 'default_id'): string {
  const cleaned = String(val || '').replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 128);
  return cleaned.length >= 1 && ID_REGEX.test(cleaned) ? cleaned : fallback;
}

function getTeacherAuthorToken(explicitPinHash?: string): string {
  const user = auth.currentUser;
  if (user && user.emailVerified) {
    return sanitizeSafeId(user.uid, DEFAULT_TEACHER_PIN_HASH);
  }
  if (explicitPinHash && ID_REGEX.test(explicitPinHash)) {
    return explicitPinHash.slice(0, 128);
  }
  try {
    const savedHash = localStorage.getItem('smart_info_teacher_pin_hash_v2');
    if (savedHash && ID_REGEX.test(savedHash)) {
      return savedHash.slice(0, 128);
    }
  } catch {}
  return DEFAULT_TEACHER_PIN_HASH;
}

function serializeTopicPayloadJson(fullOverride: Record<string, any>): string {
  try {
    const raw = JSON.stringify(fullOverride || {});
    if (raw.length <= 850000) {
      return raw;
    }
    // If oversized due to large embedded base64 data URLs, strip only >60KB data URLs so document stays within Firestore 1MB limit
    const compactClone = JSON.parse(raw);
    for (const k of Object.keys(compactClone)) {
      const val = compactClone[k];
      if (typeof val === 'string' && val.startsWith('data:image/') && val.length > 60000) {
        delete compactClone[k];
      }
    }
    if (compactClone.inlineImageMap && typeof compactClone.inlineImageMap === 'object') {
      for (const ik of Object.keys(compactClone.inlineImageMap)) {
        if (
          typeof compactClone.inlineImageMap[ik] === 'string' &&
          compactClone.inlineImageMap[ik].length > 60000
        ) {
          delete compactClone.inlineImageMap[ik];
        }
      }
    }
    const compactRaw = JSON.stringify(compactClone);
    return compactRaw.length <= 890000 ? compactRaw : '{}';
  } catch {
    return '{}';
  }
}

export async function signInTeacherWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

/**
 * Syncs a complete TopicOverride record (including payloadJson with all 12 Mini-Game question banks,
 * Kuis, Asesmen Awal/Akhir, Simulasi, PBL, Video, and Inline Edits) to Firestore.
 * Works both with Google Admin Auth and Teacher PIN Auth on Vercel!
 */
export async function syncTopicOverrideToFirestore(
  topicId: string,
  fullOverride: Record<string, any>,
  explicitPinHash?: string
): Promise<boolean> {
  const safeTopicId = sanitizeSafeId(topicId, 'topic_default');
  const path = `topicOverrides/${safeTopicId}`;
  const docRef = doc(db, 'topicOverrides', safeTopicId);

  const safeTitle = sanitizeBoundedString(fullOverride?.title || safeTopicId, 300, safeTopicId) || safeTopicId;
  const safeVideoUrl = sanitizeBoundedString(fullOverride?.customVideoUrl || '', 1000, '');
  const safeVideoTitle = sanitizeBoundedString(fullOverride?.customVideoTitle || '', 300, '');
  const rawMateriImg = typeof fullOverride?.customMateriImageUrl === 'string' ? fullOverride.customMateriImageUrl : '';
  const rawInfoImg = typeof fullOverride?.customInfographicUrl === 'string' ? fullOverride.customInfographicUrl : '';
  const safeMateriImg = rawMateriImg.length <= 2000 ? rawMateriImg : '';
  const safeInfographicImg = rawInfoImg.length <= 2000 ? rawInfoImg : '';
  const payloadJson = serializeTopicPayloadJson(fullOverride);
  const authorId = getTeacherAuthorToken(explicitPinHash);

  try {
    const existingSnap = await getDoc(docRef);
    if (!existingSnap.exists()) {
      await setDoc(docRef, {
        topicId: safeTopicId,
        title: safeTitle,
        customVideoUrl: safeVideoUrl,
        customVideoTitle: safeVideoTitle,
        customMateriImageUrl: safeMateriImg,
        customInfographicUrl: safeInfographicImg,
        payloadJson,
        authorId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      const user = auth.currentUser;
      const updateData: Record<string, any> = {
        title: safeTitle,
        customVideoUrl: safeVideoUrl,
        customVideoTitle: safeVideoTitle,
        customMateriImageUrl: safeMateriImg,
        customInfographicUrl: safeInfographicImg,
        payloadJson,
        updatedAt: serverTimestamp()
      };
      if (!user || !user.emailVerified) {
        updateData.authorId = authorId;
      }
      await updateDoc(docRef, updateData);
    }
    return true;
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.WRITE, path);
    } catch {
      return false;
    }
  }
}

function parseTopicOverrideDocData(data: Record<string, any>): Record<string, any> | null {
  if (!data || typeof data !== 'object') return null;
  let parsedPayload: Record<string, any> = {};
  if (typeof data.payloadJson === 'string' && data.payloadJson.trim()) {
    try {
      const obj = JSON.parse(data.payloadJson);
      if (obj && typeof obj === 'object') {
        parsedPayload = obj;
      }
    } catch {}
  }

  const merged: Record<string, any> = { ...parsedPayload };
  if (typeof data.title === 'string' && data.title && data.title !== data.topicId) {
    merged.title = data.title;
  }
  if (typeof data.customVideoUrl === 'string' && data.customVideoUrl) {
    merged.customVideoUrl = data.customVideoUrl;
  }
  if (typeof data.customVideoTitle === 'string' && data.customVideoTitle) {
    merged.customVideoTitle = data.customVideoTitle;
  }
  if (typeof data.customMateriImageUrl === 'string' && data.customMateriImageUrl) {
    merged.customMateriImageUrl = data.customMateriImageUrl;
  }
  if (typeof data.customInfographicUrl === 'string' && data.customInfographicUrl) {
    merged.customInfographicUrl = data.customInfographicUrl;
  }

  return Object.keys(merged).length > 0 ? merged : null;
}

/**
 * Fetches all TopicOverrides from Firestore for the given list of curriculum topic IDs.
 * Uses document `get` per topicId so it works for all students and teachers on Vercel without requiring Google login.
 */
export async function fetchTopicOverridesFromFirestore(
  topicIds: string[]
): Promise<Record<string, any>> {
  const uniqueIds = Array.from(new Set(topicIds.filter(Boolean)));
  const result: Record<string, any> = {};

  await Promise.all(
    uniqueIds.map(async (tid) => {
      const safeId = sanitizeSafeId(tid, tid);
      try {
        const snap = await getDoc(doc(db, 'topicOverrides', safeId));
        if (snap.exists()) {
          const parsed = parseTopicOverrideDocData(snap.data());
          if (parsed) {
            result[tid] = parsed;
          }
        }
      } catch {
        // Ignore individual offline/missing doc errors
      }
    })
  );

  return result;
}

/**
 * Subscribes in real-time (`onSnapshot`) to Firestore topicOverrides documents for all curriculum topics.
 * Whenever a teacher updates questions, Excel banks, videos, or materials on Vercel, all connected student/teacher
 * browsers immediately receive the update.
 */
export function subscribeTopicOverridesFromFirestore(
  topicIds: string[],
  onTopicChanged: (topicId: string, overrideData: Record<string, any> | null) => void
): Unsubscribe {
  const uniqueIds = Array.from(new Set(topicIds.filter(Boolean)));
  const unsubscribes: Unsubscribe[] = [];

  uniqueIds.forEach((tid) => {
    const safeId = sanitizeSafeId(tid, tid);
    const docRef = doc(db, 'topicOverrides', safeId);
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (!snap.exists()) {
          onTopicChanged(tid, null);
          return;
        }
        const parsed = parseTopicOverrideDocData(snap.data());
        onTopicChanged(tid, parsed);
      },
      () => {
        // Silent listener fallback if offline
      }
    );
    unsubscribes.push(unsub);
  });

  return () => {
    unsubscribes.forEach((u) => {
      try {
        u();
      } catch {}
    });
  };
}

export async function deleteTopicOverrideFromFirestore(topicId: string): Promise<void> {
  const safeTopicId = sanitizeSafeId(topicId, 'topic_default');
  const path = `topicOverrides/${safeTopicId}`;
  try {
    await deleteDoc(doc(db, 'topicOverrides', safeTopicId));
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.DELETE, path);
    } catch {}
  }
}

/**
 * Syncs global AppSecurityConfig (teacher password hash & teacher profile) to Firestore.
 */
export async function syncAppConfigToFirestore(params: {
  pinHash: string;
  teacherName: string;
  teacherNIP: string;
  teacherRole: string;
  schoolName: string;
  schoolAddress: string;
  currentPinHashForAuth?: string;
}): Promise<boolean> {
  const configId = 'global';
  const path = `appConfigs/${configId}`;
  const docRef = doc(db, 'appConfigs', configId);

  const safePinHash = sanitizeSafeId(params.pinHash, DEFAULT_TEACHER_PIN_HASH);
  const safeTeacherName = sanitizeBoundedString(params.teacherName, 120, 'Guru Informatika') || 'Guru Informatika';
  const safeTeacherNIP = sanitizeBoundedString(params.teacherNIP, 60, '-') || '-';
  const safeTeacherRole = sanitizeBoundedString(params.teacherRole, 120, 'Guru Informatika') || 'Guru Informatika';
  const safeSchoolName = sanitizeBoundedString(params.schoolName, 120, 'SMP Negeri 5 Kroya') || 'SMP Negeri 5 Kroya';
  const safeSchoolAddress = sanitizeBoundedString(params.schoolAddress, 250, 'Cilacap') || 'Cilacap';

  try {
    const existingSnap = await getDoc(docRef);
    const user = auth.currentUser;
    if (!existingSnap.exists()) {
      const authorId =
        user && user.emailVerified ? sanitizeSafeId(user.uid, DEFAULT_TEACHER_PIN_HASH) : DEFAULT_TEACHER_PIN_HASH;
      await setDoc(docRef, {
        configId,
        pinHash: safePinHash,
        teacherName: safeTeacherName,
        teacherNIP: safeTeacherNIP,
        teacherRole: safeTeacherRole,
        schoolName: safeSchoolName,
        schoolAddress: safeSchoolAddress,
        authorId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      const existingData = existingSnap.data();
      const updatePayload: Record<string, any> = {
        pinHash: safePinHash,
        teacherName: safeTeacherName,
        teacherNIP: safeTeacherNIP,
        teacherRole: safeTeacherRole,
        schoolName: safeSchoolName,
        schoolAddress: safeSchoolAddress,
        updatedAt: serverTimestamp()
      };
      if (!user || !user.emailVerified) {
        updatePayload.authorId =
          params.currentPinHashForAuth || existingData?.pinHash || DEFAULT_TEACHER_PIN_HASH;
      }
      await updateDoc(docRef, updatePayload);
    }
    return true;
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.WRITE, path);
    } catch {
      return false;
    }
  }
}

export async function fetchAppConfigFromFirestore(): Promise<{
  pinHash?: string;
  teacherName?: string;
  teacherNIP?: string;
  teacherRole?: string;
  schoolName?: string;
  schoolAddress?: string;
} | null> {
  try {
    const snap = await getDoc(doc(db, 'appConfigs', 'global'));
    if (snap.exists()) {
      return snap.data() as any;
    }
  } catch {}
  return null;
}

export function subscribeAppConfigFromFirestore(
  onUpdate: (data: {
    pinHash?: string;
    teacherName?: string;
    teacherNIP?: string;
    teacherRole?: string;
    schoolName?: string;
    schoolAddress?: string;
  }) => void
): Unsubscribe {
  return onSnapshot(
    doc(db, 'appConfigs', 'global'),
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as any);
      }
    },
    () => {}
  );
}

/**
 * Syncs a StudentScoreRecord to Firestore (/studentRecords/{recordId}).
 * Works for all students on Vercel (both signed-in and web client students).
 */
export async function syncStudentRecordToFirestore(params: {
  recordId: string;
  studentName: string;
  className: string;
  studentNumber: string;
  topicId: string;
  topicTitle: string;
  activityType: 'mini-game' | 'kuis' | 'asesmen-awal' | 'asesmen-akhir' | 'simulasi' | 'pbl' | 'profil';
  activityName: string;
  score: number;
  maxScore?: number;
  mode?: string;
  details?: string;
}): Promise<void> {
  const user = auth.currentUser;
  const authorId =
    user && user.emailVerified ? sanitizeSafeId(user.uid, 'student_web_client') : 'student_web_client';

  const safeRecordId = sanitizeSafeId(params.recordId, `rec_${Date.now()}`);
  const path = `studentRecords/${safeRecordId}`;
  const docRef = doc(db, 'studentRecords', safeRecordId);

  const safeName = sanitizeBoundedString(params.studentName, 120, 'Siswa') || 'Siswa';
  const safeClass = sanitizeBoundedString(params.className, 60, '-') || '-';
  const safeNumber = sanitizeBoundedString(params.studentNumber, 30, '-') || '-';
  const safeTopicId = sanitizeSafeId(params.topicId || 'k7-bk', 'k7-bk');
  const safeTopicTitle = sanitizeBoundedString(params.topicTitle || 'Informatika', 300, 'Informatika') || 'Informatika';
  const allowedTypes = ['mini-game', 'kuis', 'asesmen-awal', 'asesmen-akhir', 'simulasi', 'pbl', 'profil'];
  const safeActivityType = allowedTypes.includes(params.activityType) ? params.activityType : 'mini-game';
  const safeActivityName = sanitizeBoundedString(params.activityName || 'Mini Game', 200, 'Mini Game') || 'Mini Game';
  const safeScore = Math.max(0, Math.min(100000, Math.round(Number(params.score) || 0)));
  const safeMaxScore = Math.max(0, Math.min(100000, Math.round(Number(params.maxScore ?? 100) || 100)));
  const safeMode = sanitizeBoundedString(params.mode || 'individu', 60, 'individu') || 'individu';
  const safeDetails = sanitizeBoundedString(params.details || '', 500, '');

  try {
    const existingSnap = await getDoc(docRef);
    if (!existingSnap.exists()) {
      await setDoc(docRef, {
        recordId: safeRecordId,
        studentName: safeName,
        className: safeClass,
        studentNumber: safeNumber,
        topicId: safeTopicId,
        topicTitle: safeTopicTitle,
        activityType: safeActivityType,
        activityName: safeActivityName,
        score: safeScore,
        maxScore: safeMaxScore,
        mode: safeMode,
        details: safeDetails,
        authorId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      await updateDoc(docRef, {
        studentName: safeName,
        className: safeClass,
        studentNumber: safeNumber,
        topicId: safeTopicId,
        topicTitle: safeTopicTitle,
        activityType: safeActivityType,
        activityName: safeActivityName,
        score: safeScore,
        maxScore: safeMaxScore,
        mode: safeMode,
        details: safeDetails,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.WRITE, path);
    } catch {}
  }
}

export async function fetchAllStudentRecordsFromFirestore(): Promise<any[]> {
  try {
    const snap = await getDocs(collection(db, 'studentRecords'));
    const list: any[] = [];
    snap.forEach((docSnap) => {
      const d = docSnap.data();
      if (d && d.recordId) {
        const createdAtIso =
          d.createdAt && typeof d.createdAt.toDate === 'function'
            ? d.createdAt.toDate().toISOString()
            : typeof d.createdAt === 'string'
            ? d.createdAt
            : new Date().toISOString();
        const updatedAtIso =
          d.updatedAt && typeof d.updatedAt.toDate === 'function'
            ? d.updatedAt.toDate().toISOString()
            : typeof d.updatedAt === 'string'
            ? d.updatedAt
            : createdAtIso;
        list.push({
          recordId: d.recordId,
          studentName: d.studentName || 'Siswa',
          className: d.className || '-',
          studentNumber: d.studentNumber || '-',
          topicId: d.topicId || 'k7-bk',
          topicTitle: d.topicTitle || 'Informatika',
          activityType: d.activityType || 'mini-game',
          activityName: d.activityName || 'Aktivitas',
          score: Number(d.score) || 0,
          maxScore: Number(d.maxScore ?? 100) || 100,
          mode: d.mode || 'individu',
          details: d.details || '',
          createdAt: createdAtIso,
          updatedAt: updatedAtIso
        });
      }
    });
    list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return list;
  } catch {
    return [];
  }
}

export async function deleteStudentRecordFromFirestore(params: {
  recordId?: string;
  clearAll?: boolean;
}): Promise<void> {
  try {
    if (params.clearAll) {
      const snap = await getDocs(collection(db, 'studentRecords'));
      await Promise.all(
        snap.docs.map((docSnap) => deleteDoc(doc(db, 'studentRecords', docSnap.id)).catch(() => {}))
      );
    } else if (params.recordId) {
      const safeId = sanitizeSafeId(params.recordId, params.recordId);
      await deleteDoc(doc(db, 'studentRecords', safeId));
    }
  } catch {}
}
