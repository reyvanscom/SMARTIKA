import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
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

function sanitizeBoundedString(val: unknown, maxLen: number, fallback = ''): string {
  const str = typeof val === 'string' ? val.trim() : fallback;
  return str.slice(0, maxLen);
}

function sanitizeSafeId(val: string, fallback = 'default_id'): string {
  const cleaned = val.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 128);
  return cleaned.length >= 1 && ID_REGEX.test(cleaned) ? cleaned : fallback;
}

export async function signInTeacherWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

/**
 * Syncs a TopicOverride summary record to Firestore if an authenticated & verified user is signed in.
 */
export async function syncTopicOverrideToFirestore(
  topicId: string,
  data: {
    title?: string;
    customVideoUrl?: string;
    customVideoTitle?: string;
    customMateriImageUrl?: string;
    customInfographicUrl?: string;
  }
): Promise<void> {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) return;

  const safeTopicId = sanitizeSafeId(topicId, 'topic_default');
  const path = `topicOverrides/${safeTopicId}`;
  const docRef = doc(db, 'topicOverrides', safeTopicId);

  const safeTitle = sanitizeBoundedString(data.title || safeTopicId, 300, safeTopicId) || safeTopicId;
  const safeVideoUrl = sanitizeBoundedString(data.customVideoUrl || '', 1000, '');
  const safeVideoTitle = sanitizeBoundedString(data.customVideoTitle || '', 300, '');
  const safeMateriImg = sanitizeBoundedString(data.customMateriImageUrl || '', 2000, '');
  const safeInfographicImg = sanitizeBoundedString(data.customInfographicUrl || '', 2000, '');

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
        authorId: sanitizeSafeId(user.uid, 'admin'),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      await updateDoc(docRef, {
        title: safeTitle,
        customVideoUrl: safeVideoUrl,
        customVideoTitle: safeVideoTitle,
        customMateriImageUrl: safeMateriImg,
        customInfographicUrl: safeInfographicImg,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteTopicOverrideFromFirestore(topicId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) return;

  const safeTopicId = sanitizeSafeId(topicId, 'topic_default');
  const path = `topicOverrides/${safeTopicId}`;
  try {
    await deleteDoc(doc(db, 'topicOverrides', safeTopicId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Syncs global AppSecurityConfig (teacher password hash & teacher profile) to Firestore
 * when an authenticated & verified user is signed in.
 */
export async function syncAppConfigToFirestore(params: {
  pinHash: string;
  teacherName: string;
  teacherNIP: string;
  teacherRole: string;
  schoolName: string;
  schoolAddress: string;
}): Promise<void> {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) return;

  const configId = 'global';
  const path = `appConfigs/${configId}`;
  const docRef = doc(db, 'appConfigs', configId);

  const safePinHash = sanitizeSafeId(params.pinHash, 'sec_default');
  const safeTeacherName = sanitizeBoundedString(params.teacherName, 120, 'Guru Informatika') || 'Guru Informatika';
  const safeTeacherNIP = sanitizeBoundedString(params.teacherNIP, 60, '-') || '-';
  const safeTeacherRole = sanitizeBoundedString(params.teacherRole, 120, 'Guru Informatika') || 'Guru Informatika';
  const safeSchoolName = sanitizeBoundedString(params.schoolName, 120, 'SMP Negeri 5 Kroya') || 'SMP Negeri 5 Kroya';
  const safeSchoolAddress = sanitizeBoundedString(params.schoolAddress, 250, 'Cilacap') || 'Cilacap';

  try {
    const existingSnap = await getDoc(docRef);
    if (!existingSnap.exists()) {
      await setDoc(docRef, {
        configId,
        pinHash: safePinHash,
        teacherName: safeTeacherName,
        teacherNIP: safeTeacherNIP,
        teacherRole: safeTeacherRole,
        schoolName: safeSchoolName,
        schoolAddress: safeSchoolAddress,
        authorId: sanitizeSafeId(user.uid, 'admin'),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      await updateDoc(docRef, {
        pinHash: safePinHash,
        teacherName: safeTeacherName,
        teacherNIP: safeTeacherNIP,
        teacherRole: safeTeacherRole,
        schoolName: safeSchoolName,
        schoolAddress: safeSchoolAddress,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Syncs a StudentScoreRecord to Firestore (/studentRecords/{recordId})
 * when an authenticated & verified user is signed in.
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
}): Promise<void> {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) return;

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
        authorId: sanitizeSafeId(user.uid, 'user'),
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
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
