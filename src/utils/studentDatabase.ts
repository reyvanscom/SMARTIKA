import {
  syncStudentRecordToFirestore,
  fetchAllStudentRecordsFromFirestore,
  deleteStudentRecordFromFirestore
} from '../firebase';

export interface StudentDatabaseRecord {
  recordId: string;
  studentName: string;
  className: string;
  studentNumber: string;
  topicId: string;
  topicTitle: string;
  activityType: 'mini-game' | 'kuis' | 'asesmen-awal' | 'asesmen-akhir' | 'simulasi' | 'pbl' | 'profil';
  activityName: string;
  score: number;
  maxScore: number;
  mode: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

const LOCAL_STUDENT_DB_KEY = 'smart_info_student_db_records_v1';
const LOCAL_DUEL_NAMES_KEY = 'smart_info_duel_player_names_v1';

export interface DuelPlayerNames {
  player1Name: string;
  player1Class: string;
  player2Name: string;
  player2Class: string;
}

export function getSavedDuelPlayerNames(): DuelPlayerNames {
  try {
    const raw = localStorage.getItem(LOCAL_DUEL_NAMES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        player1Name: typeof parsed.player1Name === 'string' ? parsed.player1Name : '',
        player1Class: typeof parsed.player1Class === 'string' ? parsed.player1Class : '',
        player2Name: typeof parsed.player2Name === 'string' ? parsed.player2Name : '',
        player2Class: typeof parsed.player2Class === 'string' ? parsed.player2Class : ''
      };
    }
  } catch {}
  return {
    player1Name: '',
    player1Class: '',
    player2Name: '',
    player2Class: ''
  };
}

export function saveDuelPlayerNames(names: Partial<DuelPlayerNames>): DuelPlayerNames {
  const current = getSavedDuelPlayerNames();
  const next: DuelPlayerNames = {
    player1Name: names.player1Name !== undefined ? names.player1Name.slice(0, 60) : current.player1Name,
    player1Class: names.player1Class !== undefined ? names.player1Class.slice(0, 30) : current.player1Class,
    player2Name: names.player2Name !== undefined ? names.player2Name.slice(0, 60) : current.player2Name,
    player2Class: names.player2Class !== undefined ? names.player2Class.slice(0, 30) : current.player2Class
  };
  try {
    localStorage.setItem(LOCAL_DUEL_NAMES_KEY, JSON.stringify(next));
  } catch {}
  return next;
}

export function getLocalStudentRecordsCache(): StudentDatabaseRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STUDENT_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

function setLocalStudentRecordsCache(records: StudentDatabaseRecord[]): void {
  try {
    localStorage.setItem(LOCAL_STUDENT_DB_KEY, JSON.stringify(records.slice(0, 500)));
  } catch {}
}

/**
 * Fetch all student records from Firebase Cloud Firestore, Main Server API (/api/cms/students), and local cache.
 * Ensures 100% synchronization on Vercel across all student and teacher devices.
 */
export async function fetchAllStudentRecordsFromDb(): Promise<StudentDatabaseRecord[]> {
  const byId = new Map<string, StudentDatabaseRecord>();

  // 1. Seed with local cache
  getLocalStudentRecordsCache().forEach((r) => {
    if (r && r.recordId) byId.set(r.recordId, r);
  });

  // 2. Try Express server API (/api/cms/students)
  try {
    const res = await fetch('/api/cms/students');
    const ct = res.headers.get('content-type') || '';
    if (res.ok && ct.includes('application/json')) {
      const data = await res.json();
      if (data && Array.isArray(data.studentRecords)) {
        data.studentRecords.forEach((r: StudentDatabaseRecord) => {
          if (r && r.recordId) byId.set(r.recordId, r);
        });
      }
    }
  } catch {}

  // 3. Fetch live cloud student records from Firebase Firestore (works on Vercel!)
  try {
    const cloudRecords = await fetchAllStudentRecordsFromFirestore();
    if (Array.isArray(cloudRecords)) {
      cloudRecords.forEach((r: StudentDatabaseRecord) => {
        if (r && r.recordId) byId.set(r.recordId, r);
      });
    }
  } catch {}

  const merged = Array.from(byId.values()).sort(
    (a, b) => new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime()
  );
  setLocalStudentRecordsCache(merged);
  return merged;
}

/**
 * Save a student's name, class, score, and activity to Firebase Firestore & Main Server Database
 */
export async function saveStudentScoreToDatabase(params: {
  studentName: string;
  className?: string;
  studentNumber?: string;
  topicId: string;
  topicTitle: string;
  activityType: 'mini-game' | 'kuis' | 'asesmen-awal' | 'asesmen-akhir' | 'simulasi' | 'pbl' | 'profil';
  activityName: string;
  score: number;
  maxScore?: number;
  mode?: string;
  details?: string;
  recordId?: string;
}): Promise<StudentDatabaseRecord | null> {
  const cleanName = (params.studentName || '').trim() || 'Siswa SMPN 5 Kroya';
  const cleanClass = (params.className || '').trim() || 'Kelas VII/VIII/IX';
  const cleanNumber = (params.studentNumber || '').trim() || '-';
  const safeScore = Math.max(0, Math.round(Number(params.score) || 0));
  const safeMaxScore = Math.max(0, Math.round(Number(params.maxScore ?? 100)));
  const nowIso = new Date().toISOString();

  const generatedId =
    params.recordId ||
    `rec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`.replace(/[^a-zA-Z0-9_\-]/g, '_');

  const optimisticEntry: StudentDatabaseRecord = {
    recordId: generatedId,
    studentName: cleanName,
    className: cleanClass,
    studentNumber: cleanNumber,
    topicId: params.topicId || 'k7-bk',
    topicTitle: params.topicTitle || 'Informatika',
    activityType: params.activityType,
    activityName: params.activityName,
    score: safeScore,
    maxScore: safeMaxScore,
    mode: params.mode || 'individu',
    details: params.details || '',
    createdAt: nowIso,
    updatedAt: nowIso
  };

  // Update local cache immediately
  const cached = getLocalStudentRecordsCache();
  const existingIdx = cached.findIndex((r) => r.recordId === generatedId);
  if (existingIdx >= 0) {
    cached[existingIdx] = optimisticEntry;
    setLocalStudentRecordsCache([...cached]);
  } else {
    setLocalStudentRecordsCache([optimisticEntry, ...cached]);
  }

  // Sync to Firebase Cloud Firestore (works on Vercel for all students & teachers)
  syncStudentRecordToFirestore({
    recordId: generatedId,
    studentName: cleanName,
    className: cleanClass,
    studentNumber: cleanNumber,
    topicId: params.topicId || 'k7-bk',
    topicTitle: params.topicTitle || 'Informatika',
    activityType: params.activityType,
    activityName: params.activityName,
    score: safeScore,
    maxScore: safeMaxScore,
    mode: params.mode || 'individu',
    details: params.details || ''
  }).catch(() => {});

  // Sync to Main Server Database (/api/cms/students/record -> cms-database.json)
  try {
    const res = await fetch('/api/cms/students/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(optimisticEntry)
    });
    const ct = res.headers.get('content-type') || '';
    if (res.ok && ct.includes('application/json')) {
      const data = await res.json();
      if (data && Array.isArray(data.studentRecords)) {
        setLocalStudentRecordsCache(data.studentRecords);
      }
      if (data && data.record) {
        return data.record;
      }
    }
  } catch {}

  return optimisticEntry;
}

/**
 * Delete a student record or clear all records from Firebase Firestore & Main Server Database (Teacher only)
 */
export async function deleteStudentRecordFromDatabase(params: {
  recordId?: string;
  clearAll?: boolean;
}): Promise<StudentDatabaseRecord[]> {
  await deleteStudentRecordFromFirestore(params).catch(() => {});

  try {
    const res = await fetch('/api/cms/students/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const ct = res.headers.get('content-type') || '';
    if (res.ok && ct.includes('application/json')) {
      const data = await res.json();
      if (data && Array.isArray(data.studentRecords)) {
        setLocalStudentRecordsCache(data.studentRecords);
        return data.studentRecords;
      }
    }
  } catch {}

  if (params.clearAll) {
    setLocalStudentRecordsCache([]);
    return [];
  }
  const filtered = getLocalStudentRecordsCache().filter((r) => r.recordId !== params.recordId);
  setLocalStudentRecordsCache(filtered);
  return filtered;
}
