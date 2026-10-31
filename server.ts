import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function hashTeacherPinServer(pin: string): string {
  const clean = String(pin || '').trim().toLowerCase();
  const salted = `spenmakro_secure_salt_2025::${clean}::informatika`;
  let h1 = 0xdeadbeef ^ salted.length;
  let h2 = 0x41c6ce57 ^ salted.length;
  for (let i = 0, ch; i < salted.length; i++) {
    ch = salted.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 'sec_' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

const DEFAULT_PIN_HASH = hashTeacherPinServer('smart123');

const DEFAULT_TEACHER_PROFILE = {
  teacherName: "Muhammad Rif'ani, S.Kom.",
  teacherNIP: '19910916 202421 1 010',
  teacherRole: 'Guru Informatika SMP Negeri 5 Kroya',
  schoolName: 'SMP Negeri 5 Kroya',
  schoolAddress: 'Jl. Raya Mujur-Kroya, Kabupaten Cilacap, Jawa Tengah'
};

export interface StudentDatabaseEntry {
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

interface MainCmsDatabase {
  pinHash: string;
  hasCustomPin: boolean;
  overrides: Record<string, any>;
  teacherProfile: typeof DEFAULT_TEACHER_PROFILE;
  studentRecords: StudentDatabaseEntry[];
  updatedAt: string;
}

const DB_FILE_PATH = path.resolve(__dirname, 'cms-database.json');
const PUBLIC_DB_FILE_PATH = path.resolve(__dirname, 'public', 'cms-database.json');

function loadCmsDatabase(): MainCmsDatabase {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        pinHash: typeof parsed.pinHash === 'string' && parsed.pinHash ? parsed.pinHash : DEFAULT_PIN_HASH,
        hasCustomPin: Boolean(parsed.hasCustomPin),
        overrides: parsed.overrides && typeof parsed.overrides === 'object' ? parsed.overrides : {},
        teacherProfile:
          parsed.teacherProfile && typeof parsed.teacherProfile === 'object'
            ? { ...DEFAULT_TEACHER_PROFILE, ...parsed.teacherProfile }
            : { ...DEFAULT_TEACHER_PROFILE },
        studentRecords: Array.isArray(parsed.studentRecords) ? parsed.studentRecords : [],
        updatedAt: parsed.updatedAt || new Date().toISOString()
      };
    }
  } catch (err) {
    console.warn('Warning loading cms-database.json, initializing fresh state:', err);
  }
  const initial: MainCmsDatabase = {
    pinHash: DEFAULT_PIN_HASH,
    hasCustomPin: false,
    overrides: {},
    teacherProfile: { ...DEFAULT_TEACHER_PROFILE },
    studentRecords: [],
    updatedAt: new Date().toISOString()
  };
  saveCmsDatabase(initial);
  return initial;
}

function saveCmsDatabase(dbState: MainCmsDatabase): void {
  try {
    dbState.updatedAt = new Date().toISOString();
    const jsonStr = JSON.stringify(dbState, null, 2);
    fs.writeFileSync(DB_FILE_PATH, jsonStr, 'utf-8');
    try {
      const publicDir = path.dirname(PUBLIC_DB_FILE_PATH);
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(PUBLIC_DB_FILE_PATH, jsonStr, 'utf-8');
    } catch {}
  } catch (err) {
    console.error('Failed to persist cms-database.json:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  let cmsDb: MainCmsDatabase = loadCmsDatabase();

  // Support base64 image uploads from canvas and CMS
  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));

  // =========================================================================
  // MAIN APPLICATION DATABASE ENDPOINTS (MATERI, YOUTUBE, GAMBAR, PASSWORD)
  // =========================================================================

  // 1. Get complete global state (overrides, teacherProfile, password hash, studentRecords)
  app.get('/api/cms/state', (_req, res) => {
    cmsDb = loadCmsDatabase();
    return res.json({
      ok: true,
      pinHash: cmsDb.pinHash,
      hasCustomPin: cmsDb.hasCustomPin,
      overrides: cmsDb.overrides,
      teacherProfile: cmsDb.teacherProfile,
      studentRecordsCount: cmsDb.studentRecords.length,
      updatedAt: cmsDb.updatedAt
    });
  });

  // 2. Verify teacher password against main database
  app.post('/api/cms/verify-pin', (req, res) => {
    cmsDb = loadCmsDatabase();
    const { pin } = req.body || {};
    const inputHash = hashTeacherPinServer(String(pin || ''));
    const isMatch = inputHash === cmsDb.pinHash;
    return res.json({
      ok: isMatch,
      pinHash: cmsDb.pinHash,
      hasCustomPin: cmsDb.hasCustomPin
    });
  });

  // 3. Update teacher password globally in main database
  app.post('/api/cms/update-pin', (req, res) => {
    cmsDb = loadCmsDatabase();
    const { currentPin, newPin } = req.body || {};
    const currentInputHash = hashTeacherPinServer(String(currentPin || ''));

    if (currentInputHash !== cmsDb.pinHash) {
      return res.status(400).json({
        ok: false,
        message: 'Password lama yang Anda masukkan tidak sesuai dengan database.'
      });
    }

    const cleanNew = String(newPin || '').trim();
    if (cleanNew.length < 4 || cleanNew.length > 30) {
      return res.status(400).json({
        ok: false,
        message: 'Password baru minimal harus terdiri dari 4 hingga 30 karakter.'
      });
    }

    const newHash = hashTeacherPinServer(cleanNew);
    cmsDb.pinHash = newHash;
    cmsDb.hasCustomPin = newHash !== DEFAULT_PIN_HASH;
    saveCmsDatabase(cmsDb);

    return res.json({
      ok: true,
      pinHash: cmsDb.pinHash,
      hasCustomPin: cmsDb.hasCustomPin,
      updatedAt: cmsDb.updatedAt,
      message: 'Password Guru berhasil diperbarui dan disimpan ke database utama aplikasi!'
    });
  });

  // 4. Save topic override (materi, link YouTube, gambar, soal, simulasi, mini-game, live inline edit)
  app.post('/api/cms/save-override', (req, res) => {
    cmsDb = loadCmsDatabase();
    const { topicId, partial, fullTopicOverride, allOverrides } = req.body || {};

    if (allOverrides && typeof allOverrides === 'object') {
      Object.entries(allOverrides).forEach(([tid, incomingOv]) => {
        if (incomingOv && typeof incomingOv === 'object') {
          const existingTopicOv = cmsDb.overrides[tid] || {};
          const incomingObj = incomingOv as Record<string, any>;
          cmsDb.overrides[tid] = {
            ...existingTopicOv,
            ...incomingObj,
            customMiniGameQuestions: incomingObj.customMiniGameQuestions
              ? {
                  ...(existingTopicOv.customMiniGameQuestions || {}),
                  ...incomingObj.customMiniGameQuestions
                }
              : existingTopicOv.customMiniGameQuestions
          };
        }
      });
    } else if (topicId && typeof topicId === 'string') {
      const existingTopicOv = cmsDb.overrides[topicId] || {};
      if (fullTopicOverride && typeof fullTopicOverride === 'object') {
        cmsDb.overrides[topicId] = {
          ...existingTopicOv,
          ...fullTopicOverride,
          customMiniGameQuestions: fullTopicOverride.customMiniGameQuestions
            ? {
                ...(existingTopicOv.customMiniGameQuestions || {}),
                ...fullTopicOverride.customMiniGameQuestions
              }
            : existingTopicOv.customMiniGameQuestions
        };
      } else if (partial && typeof partial === 'object') {
        cmsDb.overrides[topicId] = {
          ...existingTopicOv,
          ...partial,
          customMiniGameQuestions: partial.customMiniGameQuestions
            ? {
                ...(existingTopicOv.customMiniGameQuestions || {}),
                ...partial.customMiniGameQuestions
              }
            : existingTopicOv.customMiniGameQuestions
        };
      }
    }

    saveCmsDatabase(cmsDb);
    return res.json({
      ok: true,
      overrides: cmsDb.overrides,
      updatedAt: cmsDb.updatedAt
    });
  });

  // 5. Reset topic override or all overrides in main database
  app.post('/api/cms/reset-override', (req, res) => {
    cmsDb = loadCmsDatabase();
    const { topicId, resetAll } = req.body || {};

    if (resetAll) {
      cmsDb.overrides = {};
    } else if (topicId && typeof topicId === 'string') {
      delete cmsDb.overrides[topicId];
    }

    saveCmsDatabase(cmsDb);
    return res.json({
      ok: true,
      overrides: cmsDb.overrides,
      updatedAt: cmsDb.updatedAt
    });
  });

  // 6. Save or reset teacher identity profile in main database
  app.post('/api/cms/teacher-profile', (req, res) => {
    cmsDb = loadCmsDatabase();
    const { teacherProfile, reset } = req.body || {};

    if (reset) {
      cmsDb.teacherProfile = { ...DEFAULT_TEACHER_PROFILE };
    } else if (teacherProfile && typeof teacherProfile === 'object') {
      cmsDb.teacherProfile = {
        ...cmsDb.teacherProfile,
        ...teacherProfile
      };
    }

    saveCmsDatabase(cmsDb);
    return res.json({
      ok: true,
      teacherProfile: cmsDb.teacherProfile,
      updatedAt: cmsDb.updatedAt
    });
  });

  // =========================================================================
  // STUDENT USAGE, NAMES & SCORES DATABASE ENDPOINTS
  // =========================================================================

  // 7. Get all stored student score & usage records from main database
  app.get('/api/cms/students', (_req, res) => {
    cmsDb = loadCmsDatabase();
    return res.json({
      ok: true,
      studentRecords: cmsDb.studentRecords,
      updatedAt: cmsDb.updatedAt
    });
  });

  // 8. Record or update a student's name, class, score, mini-game / assessment activity
  app.post('/api/cms/students/record', (req, res) => {
    cmsDb = loadCmsDatabase();
    const {
      recordId,
      studentName,
      className,
      studentNumber,
      topicId,
      topicTitle,
      activityType,
      activityName,
      score,
      maxScore,
      mode,
      details
    } = req.body || {};

    const cleanName = String(studentName || '').trim().slice(0, 120);
    if (!cleanName) {
      return res.status(400).json({
        ok: false,
        message: 'Nama siswa wajib diisi untuk disimpan ke database.'
      });
    }

    const cleanClass = String(className || '-').trim().slice(0, 60) || '-';
    const cleanNumber = String(studentNumber || '-').trim().slice(0, 30) || '-';
    const cleanTopicId = String(topicId || 'k7-bk').replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 128) || 'k7-bk';
    const cleanTopicTitle = String(topicTitle || 'Informatika').trim().slice(0, 300) || 'Informatika';
    const allowedTypes = ['mini-game', 'kuis', 'asesmen-awal', 'asesmen-akhir', 'simulasi', 'pbl', 'profil'];
    const cleanActivityType = allowedTypes.includes(activityType) ? activityType : 'mini-game';
    const cleanActivityName = String(activityName || 'Aktivitas Belajar').trim().slice(0, 200) || 'Aktivitas Belajar';
    const numericScore = Math.max(0, Math.min(100000, Math.round(Number(score) || 0)));
    const numericMaxScore = Math.max(0, Math.min(100000, Math.round(Number(maxScore) || 100)));
    const cleanMode = String(mode || 'individu').trim().slice(0, 40);
    const cleanDetails = String(details || '').trim().slice(0, 500);
    const nowIso = new Date().toISOString();

    const safeId =
      typeof recordId === 'string' && recordId.trim()
        ? recordId.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 128)
        : `rec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    const existingIdx = cmsDb.studentRecords.findIndex((r) => r.recordId === safeId);
    const entry: StudentDatabaseEntry = {
      recordId: safeId,
      studentName: cleanName,
      className: cleanClass,
      studentNumber: cleanNumber,
      topicId: cleanTopicId,
      topicTitle: cleanTopicTitle,
      activityType: cleanActivityType as StudentDatabaseEntry['activityType'],
      activityName: cleanActivityName,
      score: numericScore,
      maxScore: numericMaxScore,
      mode: cleanMode,
      details: cleanDetails,
      createdAt: existingIdx >= 0 ? cmsDb.studentRecords[existingIdx].createdAt : nowIso,
      updatedAt: nowIso
    };

    if (existingIdx >= 0) {
      cmsDb.studentRecords[existingIdx] = entry;
    } else {
      // Keep newest records first, cap at 500 records
      cmsDb.studentRecords = [entry, ...cmsDb.studentRecords].slice(0, 500);
    }

    saveCmsDatabase(cmsDb);
    return res.json({
      ok: true,
      record: entry,
      studentRecords: cmsDb.studentRecords,
      updatedAt: cmsDb.updatedAt
    });
  });

  // 9. Delete a single student record or clear all records
  app.post('/api/cms/students/delete', (req, res) => {
    cmsDb = loadCmsDatabase();
    const { recordId, clearAll } = req.body || {};

    if (clearAll) {
      cmsDb.studentRecords = [];
    } else if (recordId && typeof recordId === 'string') {
      cmsDb.studentRecords = cmsDb.studentRecords.filter((r) => r.recordId !== recordId);
    }

    saveCmsDatabase(cmsDb);
    return res.json({
      ok: true,
      studentRecords: cmsDb.studentRecords,
      updatedAt: cmsDb.updatedAt
    });
  });

  // Initialize Gemini API client on server-side
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // Endpoint: Penilaian Sketsa Otomatis Cerdas & Multimodal
  app.post('/api/evaluate-sketch', async (req, res) => {
    try {
      const {
        challengeTitle,
        topicTitle,
        clue,
        keyElements,
        blueImageBase64,
        redImageBase64,
        isSolo,
        blueIsEmpty = false,
        redIsEmpty = false,
        blueLabel = 'Tim Biru',
        redLabel = 'Tim Merah'
      } = req.body;

      // ATURAN MUTLAK: JIKA KANVAS KOSONG, SKOR WAJIB 0 (NOL)!
      if (isSolo && blueIsEmpty) {
        return res.json({
          fallbackNeeded: false,
          blueScore: 0,
          redScore: 0,
          winner: 'draw',
          summaryReason: 'Kanvas masih kosong (belum ada gambar yang dibuat), sehingga skornya adalah 0.',
          blueStrengths: 'Kanvas kosong — Skor 0. Silakan tekan Mulai Waktu dan ikuti Arahan Bentuk Gambar!'
        });
      }

      if (!isSolo && blueIsEmpty && redIsEmpty) {
        return res.json({
          fallbackNeeded: false,
          blueScore: 0,
          redScore: 0,
          winner: 'draw',
          summaryReason: 'Kedua kanvas kosong (belum ada goresan gambar), sehingga kedua pemain mendapat skor 0.',
          blueStrengths: 'Kanvas kosong — Skor 0.',
          redStrengths: 'Kanvas kosong — Skor 0.'
        });
      }

      if (!ai) {
        return res.json({ fallbackNeeded: true, message: 'Server-side Gemini API not configured' });
      }

      const cleanBlueBase64 = blueImageBase64
        ? blueImageBase64.replace(/^data:image\/\w+;base64,/, '')
        : '';
      const cleanRedBase64 = redImageBase64
        ? redImageBase64.replace(/^data:image\/\w+;base64,/, '')
        : '';

      if (!cleanBlueBase64 && !cleanRedBase64) {
        return res.json({ fallbackNeeded: true, message: 'No image data provided' });
      }

      const promptInstructions = isSolo
        ? `Anda adalah guru Informatika dan juri seni visual yang sangat objektif untuk siswa SMP Negeri 5 Kroya.
Tantangan Sketsa: "${challengeTitle}"
Topik Materi: "${topicTitle}"
Petunjuk Soal: "${clue}"
Elemen Kunci Wajib: ${(keyElements || []).join(', ')}

Berikut adalah 1 gambar sketsa siswa (Gambar 1).
Nilai sketsa siswa secara objektif:
1. PENTING MUTLAK: Jika gambar kosong/putih bersih tanpa coretan objek, berikan nilai 'blueScore' tepat 0 (NOL)!
2. Akurasi Bentuk Dasar (50%): Apakah sketsa membentuk bentuk dasar sesuai arahan soal (misal kotak, lingkaran, segitiga, belah ketupat, panah, monitor, router, awan, atau perisai)?
3. Kelengkapan & Kerapian (50%): Apakah bentuknya jelas dan mudah dikenali?

Keluarkan nilai 'blueScore' antara 0 - 98 dan ringkasan penilaian edukatif dalam Bahasa Indonesia yang jelas dan memotivasi.`
        : `Anda adalah guru Informatika dan juri visual yang sangat adil dan objektif untuk siswa SMP Negeri 5 Kroya.
Dua siswa/tim sedang bertanding dalam duel sketsa cepat:
- Gambar 1: ${blueLabel} (Tim Kiri / Biru)
- Gambar 2: ${redLabel} (Tim Kanan / Merah)

Tantangan Sketsa: "${challengeTitle}"
Topik Materi: "${topicTitle}"
Petunjuk Soal: "${clue}"
Elemen Kunci Wajib: ${(keyElements || []).join(', ')}

ATURAN PENILAIAN SANGAT KETAT:
1. PENTING MUTLAK: Kanvas yang kosong/putih bersih WAJIB diberi skor 0 (NOL)!
2. Gambar yang bentuk dasarnya paling sesuai arahan, paling rapi, dan jelas WAJIB MENDAPATKAN NILAI LEBIH TINGGI DAN MENANG (blue atau red).
3. Tentukan pemenang ('blue' jika ${blueLabel} lebih bagus, 'red' jika ${redLabel} lebih bagus, atau 'draw' jika seimbang).`;

      const contentsParts: any[] = [{ text: promptInstructions }];

      if (cleanBlueBase64) {
        contentsParts.push({ text: isSolo ? 'Berikut Sketsa Siswa:' : `Sketsa Gambar 1 (${blueLabel}):` });
        contentsParts.push({
          inlineData: {
            mimeType: 'image/png',
            data: cleanBlueBase64
          }
        });
      }

      if (cleanRedBase64 && !isSolo) {
        contentsParts.push({ text: `Sketsa Gambar 2 (${redLabel}):` });
        contentsParts.push({
          inlineData: {
            mimeType: 'image/png',
            data: cleanRedBase64
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts: contentsParts },
        config: {
          systemInstruction:
            'Anda adalah sistem penilai gambar AI objektif dan guru Informatika SMP Negeri 5 Kroya. Jika kanvas kosong berikan nilai 0. Jika ada gambar yang sesuai arahan bentuk sederhana, berikan nilai proporsional.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              blueScore: {
                type: Type.INTEGER,
                description: 'Nilai sketsa gambar 1 (0-100, wajib 0 jika kanvas kosong)'
              },
              redScore: {
                type: Type.INTEGER,
                description: 'Nilai sketsa gambar 2 (0-100, wajib 0 jika kanvas kosong)'
              },
              winner: {
                type: Type.STRING,
                description: 'Pemenang: "blue", "red", atau "draw"'
              },
              summaryReason: {
                type: Type.STRING,
                description: 'Alasan penilaian dalam Bahasa Indonesia'
              },
              blueStrengths: {
                type: Type.STRING,
                description: 'Kelebihan sketsa gambar 1'
              },
              redStrengths: {
                type: Type.STRING,
                description: 'Kelebihan sketsa gambar 2'
              }
            },
            required: ['blueScore', 'redScore', 'winner', 'summaryReason']
          }
        }
      });

      const text = response.text?.trim() || '{}';
      const parsed = JSON.parse(text);

      const finalBlueScore = blueIsEmpty ? 0 : (parsed.blueScore ?? 75);
      const finalRedScore = isSolo || redIsEmpty ? 0 : (parsed.redScore ?? 75);
      const finalWinner = isSolo
        ? finalBlueScore > 0 ? 'blue' : 'draw'
        : finalBlueScore > finalRedScore
        ? 'blue'
        : finalRedScore > finalBlueScore
        ? 'red'
        : 'draw';

      return res.json({
        fallbackNeeded: false,
        blueScore: finalBlueScore,
        redScore: finalRedScore,
        winner: finalWinner,
        summaryReason: parsed.summaryReason || 'Sistem telah menganalisis kemiripan struktur sketsa gambar.',
        blueStrengths: blueIsEmpty ? 'Kanvas kosong — Skor 0.' : parsed.blueStrengths,
        redStrengths: redIsEmpty ? 'Kanvas kosong — Skor 0.' : parsed.redStrengths
      });
    } catch (err: any) {
      console.error('Error during Gemini sketch evaluation:', err);
      return res.json({
        fallbackNeeded: true,
        message: err.message || 'Error executing Gemini sketch evaluation'
      });
    }
  });

  // Mount Vite middleware in development or serve static in production
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SPENMAKRO Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
