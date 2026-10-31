import * as XLSX from 'xlsx';
import {
  Topic,
  DiagnosticQuestion,
  KeyConcept,
  FormativeQuizItem,
  QuizQuestion,
  FinalAssessmentQuestion,
} from '../types/curriculum';
import { ALL_TOPICS } from '../data/allTopics';
import {
  getTopicGamePack,
  BattleBotQuestion,
  WordScrambleQuestion,
  PictureGuessQuestion,
  TopicGamePack,
} from '../data/interactiveGamesData';
import { getTopicPblScenario, PblScenario } from '../data/pblScenariosData';
import {
  TopicContentOverride,
  PictureGuessOverrideItem,
  SpecificMiniGameId,
} from '../context/CurriculumOverridesContext';
import { getDefaultQuestionsForMiniGame } from '../data/sevenNewMiniGamesData';

export interface MiniGameTemplateMeta {
  id: SpecificMiniGameId;
  number: number;
  label: string;
  shortLabel: string;
  sheetName: string;
  description: string;
  formatType: 'mcq' | 'word' | 'picture';
}

export const MINI_GAME_QUIZ_TEMPLATES: MiniGameTemplateMeta[] = [
  {
    id: 'battle-bot',
    number: 1,
    label: '1. Pertarungan Robot 3D (Robot Tinju)',
    shortLabel: '1. Robot Tinju',
    sheetName: 'MG01_Robot_Tinju',
    description: 'Bank soal duel Robot Tinju 3D (Skenario, Pertanyaan, Opsi A-D, Kunci Jawaban, Damage Poin, Pembahasan).',
    formatType: 'mcq',
  },
  {
    id: 'balap-robot',
    number: 2,
    label: '2. Balap Motor 3D (Sirkuit Siber)',
    shortLabel: '2. Balap Motor',
    sheetName: 'MG02_Balap_Motor',
    description: 'Bank soal Sirkuit Balap Motor 3D dengan efek Nitro Boost bagi penjawab cepat & tepat.',
    formatType: 'mcq',
  },
  {
    id: 'tebak-kata',
    number: 3,
    label: '3. Susun Kata (Word Scramble)',
    shortLabel: '3. Susun Kata',
    sheetName: 'MG03_Susun_Kata',
    description: 'Bank soal tebak dan susun huruf istilah penting Informatika beserta petunjuk & konteks.',
    formatType: 'word',
  },
  {
    id: 'tebak-gambar',
    number: 4,
    label: '4. Tebak Gambar Visual',
    shortLabel: '4. Tebak Gambar',
    sheetName: 'MG04_Tebak_Gambar',
    description: 'Bank soal tebak ilustrasi visual beserta petunjuk, opsi A-D, kunci jawaban, & link gambar custom.',
    formatType: 'picture',
  },
  {
    id: 'tug-of-war',
    number: 5,
    label: '5. Tarik Tambang Siber 3D',
    shortLabel: '5. Tarik Tambang',
    sheetName: 'MG05_Tarik_Tambang',
    description: 'Bank soal lomba Tarik Tambang Robot 3D (Skenario Tarikan, Pertanyaan, Opsi A-D, Kunci Jawaban, Kekuatan Tarik).',
    formatType: 'mcq',
  },
  {
    id: 'bomb-defusal',
    number: 6,
    label: '6. Jinak Bom Waktu Siber (4 Kabel)',
    shortLabel: '6. Jinak Bom',
    sheetName: 'MG06_Jinak_Bom',
    description: 'Bank soal penjinakan bom 4 kabel warna (Merah=Opsi A, Biru=Opsi B, Kuning=Opsi C, Hijau=Opsi D).',
    formatType: 'mcq',
  },
  {
    id: 'tower-defense',
    number: 7,
    label: '7. Menara Firewall vs Malware',
    shortLabel: '7. Menara Firewall',
    sheetName: 'MG07_Menara_Firewall',
    description: 'Bank soal pertahanan Menara Firewall menghadapi gelombang serangan robot virus & malware.',
    formatType: 'mcq',
  },
  {
    id: 'whack-a-mole',
    number: 8,
    label: '8. Ketuk Cepat Data Valid vs Virus',
    shortLabel: '8. Ketuk Data',
    sheetName: 'MG08_Ketuk_Data',
    description: 'Bank soal portal data: Opsi Kunci = Data Valid (+20 poin), 3 Opsi lainnya = Virus/Jebakan Siber (-15 poin).',
    formatType: 'mcq',
  },
  {
    id: 'robo-maze',
    number: 9,
    label: '9. Labirin Koding Algoritma',
    shortLabel: '9. Labirin Koding',
    sheetName: 'MG09_Labirin_Koding',
    description: 'Bank soal Checkpoint Server pada gerbang kristal Labirin Koding Robot 3D.',
    formatType: 'mcq',
  },
  {
    id: 'spin-wheel',
    number: 10,
    label: '10. Roda Keberuntungan & Misteri',
    shortLabel: '10. Roda Misteri',
    sheetName: 'MG10_Roda_Misteri',
    description: 'Bank soal tantangan Roda Keberuntungan & Kotak Misteri.',
    formatType: 'mcq',
  },
  {
    id: 'cyber-detective',
    number: 11,
    label: '11. Detektif Siber (Investigasi CSI)',
    shortLabel: '11. Detektif Siber',
    sheetName: 'MG11_Detektif_Siber',
    description: 'Bank soal kasus investigasi forensik Detektif Siber beserta analisis kesimpulan.',
    formatType: 'mcq',
  },
  {
    id: 'sketsa-cepat',
    number: 12,
    label: '12. Sketsa Cepat (Tantangan Gambar)',
    shortLabel: '12. Sketsa Cepat',
    sheetName: 'MG12_Sketsa_Cepat',
    description: 'Bank soal tantangan menggambar cepat (Judul Tantangan, Instruksi Gambar, & Langkah Bentuk Utama A-C + Kata Kunci D).',
    formatType: 'mcq',
  },
];

export type BankSoalSection =
  | 'semua'
  | 'materi'
  | 'asesmen-awal'
  | 'kuis-formatif'
  | 'mini-game-battle'
  | 'mini-game-kata'
  | 'mini-game-gambar'
  | 'simulasi-pbl'
  | 'kuis-hots'
  | 'asesmen-akhir';

export interface SectionMetadata {
  id: BankSoalSection;
  label: string;
  shortLabel: string;
  sheetName: string;
  description: string;
  badgeColor: string;
}

export const BANK_SOAL_SECTIONS: SectionMetadata[] = [
  {
    id: 'semua',
    label: 'Semua Bagian (Workbook Lengkap)',
    shortLabel: 'Semua Bagian',
    sheetName: 'Semua_Bagian',
    description: 'Gabungan seluruh Materi, Apersepsi, Asesmen Awal, Kuis Formatif, Mini Game, Simulasi/PBL, Kuis HOTS, dan Asesmen Akhir dalam 1 file Excel multi-sheet.',
    badgeColor: 'bg-amber-500 text-slate-950',
  },
  {
    id: 'materi',
    label: '1. Materi, Apersepsi & Video YouTube',
    shortLabel: 'Materi & Video',
    sheetName: 'Materi_Apersepsi',
    description: 'Judul Bab, Tujuan Pembelajaran, Cerita Apersepsi, Pertanyaan Pemantik, Link YouTube, Ringkasan Materi, Konsep Utama, dan Contoh Kontekstual.',
    badgeColor: 'bg-sky-600 text-white',
  },
  {
    id: 'asesmen-awal',
    label: '2. Soal Asesmen Awal (Diagnostik)',
    shortLabel: 'Asesmen Awal',
    sheetName: 'Asesmen_Awal',
    description: 'Soal pemetaan kemampuan awal siswa beserta Opsi A-D, Kunci Jawaban, Tag Konsep, dan Rekomendasi.',
    badgeColor: 'bg-teal-600 text-white',
  },
  {
    id: 'kuis-formatif',
    label: '3. Cek Pemahaman (Formatif Materi)',
    shortLabel: 'Cek Pemahaman',
    sheetName: 'Kuis_Formatif',
    description: 'Soal latihan singkat di dalam halaman Materi untuk menguji pemahaman langsung siswa.',
    badgeColor: 'bg-cyan-600 text-white',
  },
  {
    id: 'mini-game-battle',
    label: '4. Soal Mini Game (Tinju, Balap, Tarik Tambang, Firewall, Bom)',
    shortLabel: 'Game Tinju & Balap',
    sheetName: 'MiniGame_Battle_Balap',
    description: 'Bank soal utama untuk Mini Game Pertarungan Robot, Balap Motor, Tarik Tambang, Menara Firewall, dan Jinak Bom.',
    badgeColor: 'bg-purple-600 text-white',
  },
  {
    id: 'mini-game-kata',
    label: '5. Soal Mini Game Susun Kata & Sketsa Cepat',
    shortLabel: 'Game Kata & Sketsa',
    sheetName: 'MiniGame_Kata_Sketsa',
    description: 'Daftar kata kunci jawaban, petunjuk/perintah soal gambar sketsa cepat, dan konteks sehari-hari.',
    badgeColor: 'bg-fuchsia-600 text-white',
  },
  {
    id: 'mini-game-gambar',
    label: '6. Soal Mini Game Tebak Gambar Visual',
    shortLabel: 'Game Tebak Gambar',
    sheetName: 'MiniGame_TebakGambar',
    description: 'Soal tebak ilustrasi/gambar visual beserta petunjuk, pilihan ganda A-D, kunci jawaban, dan URL gambar custom.',
    badgeColor: 'bg-pink-600 text-white',
  },
  {
    id: 'simulasi-pbl',
    label: '7. Studi Kasus Simulasi & LKPD PBL',
    shortLabel: 'Simulasi & PBL',
    sheetName: 'Simulasi_PBL',
    description: 'Skenario simulasi interaktif, kasus kontekstual, misi LKPD Problem-Based Learning (PBL), serta kunci jawaban masalah & solusi ideal.',
    badgeColor: 'bg-emerald-600 text-white',
  },
  {
    id: 'kuis-hots',
    label: '8. Soal Kuis Interaktif HOTS',
    shortLabel: 'Kuis HOTS',
    sheetName: 'Kuis_HOTS',
    description: '10 Soal Kuis Interaktif berorientasi HOTS/MOTS/LOTS lengkap dengan Opsi A-D, Kunci Jawaban, dan Pembahasan.',
    badgeColor: 'bg-indigo-600 text-white',
  },
  {
    id: 'asesmen-akhir',
    label: '9. Soal Asesmen Akhir (Ujian Evaluasi Bab)',
    shortLabel: 'Asesmen Akhir',
    sheetName: 'Asesmen_Akhir',
    description: '10 Soal Evaluasi Akhir Bab untuk kelulusan sertifikat beserta Opsi A-D, Kunci Jawaban, Poin, dan Pembahasan.',
    badgeColor: 'bg-rose-600 text-white',
  },
];

// Helper to normalize Answer Letter ('A' | 'B' | 'C' | 'D') from various inputs
export function normalizeAnswerLetter(raw: any, options?: string[]): 'A' | 'B' | 'C' | 'D' {
  const str = String(raw ?? '').trim();
  const upper = str.toUpperCase();
  if (upper === 'A' || upper === '1' || upper.startsWith('A.') || upper.startsWith('OPSI A')) return 'A';
  if (upper === 'B' || upper === '2' || upper.startsWith('B.') || upper.startsWith('OPSI B')) return 'B';
  if (upper === 'C' || upper === '3' || upper.startsWith('C.') || upper.startsWith('OPSI C')) return 'C';
  if (upper === 'D' || upper === '4' || upper.startsWith('D.') || upper.startsWith('OPSI D')) return 'D';

  if (options && options.length > 0 && str) {
    const idx = options.findIndex((o) => o.trim().toLowerCase() === str.toLowerCase());
    if (idx === 0) return 'A';
    if (idx === 1) return 'B';
    if (idx === 2) return 'C';
    if (idx === 3) return 'D';
  }
  return 'A';
}

export function letterToIndex(letter: string): number {
  const clean = String(letter || 'A').trim().toUpperCase();
  if (clean === 'B') return 1;
  if (clean === 'C') return 2;
  if (clean === 'D') return 3;
  return 0;
}

export function indexToLetter(idx: number): 'A' | 'B' | 'C' | 'D' {
  if (idx === 1) return 'B';
  if (idx === 2) return 'C';
  if (idx === 3) return 'D';
  return 'A';
}

export function makeScrambledLetters(word: string): string {
  const clean = word.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!clean) return '';
  const arr = clean.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (i * 3 + 1) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.join('') === clean && arr.length > 1) {
    [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
  }
  return arr.join(' ');
}

interface ExportContextHelpers {
  getEffectiveTopic: (baseTopic: Topic) => Topic;
  getEffectiveGamePack: (topicId: string, basePack: TopicGamePack) => TopicGamePack;
  getEffectivePblScenario: (topicId: string, baseScenario: PblScenario) => PblScenario & {
    idealProblemAnswer: string;
    idealSolutionAnswer: string;
    customImageUrl?: string;
  };
  overrides: Record<string, TopicContentOverride>;
}

/**
 * Generates an Excel (.xlsx) file and triggers browser download for the chosen Topic(s) and Section.
 */
export function downloadQuestionBankExcel(params: {
  scope: 'single-topic' | 'all-topics';
  topicId: string;
  section: BankSoalSection;
  helpers: ExportContextHelpers;
}): void {
  const { scope, topicId, section, helpers } = params;
  const targetTopics =
    scope === 'all-topics'
      ? ALL_TOPICS
      : [ALL_TOPICS.find((t) => t.id === topicId) || ALL_TOPICS[0]];

  const wb = XLSX.utils.book_new();

  const shouldInclude = (sec: BankSoalSection) => section === 'semua' || section === sec;

  // 1. SHEET MATERI & APERSEPSI
  if (shouldInclude('materi')) {
    const rows: Record<string, any>[] = [];
    targetTopics.forEach((baseTopic) => {
      const eff = helpers.getEffectiveTopic(baseTopic);
      const ov = helpers.overrides[baseTopic.id] || {};
      const conceptsStr = (eff.materi.keyConcepts || [])
        .map((c) => `${c.title}: ${c.explanation} [${(c.bulletPoints || []).join('; ')}]`)
        .join(' || ');

      rows.push({
        ID_Materi: eff.id,
        Kelas: eff.grade,
        Judul_Materi: eff.title,
        Deskripsi_Singkat: eff.shortDesc,
        Tujuan_Pembelajaran: (eff.learningObjectives || []).join(' | '),
        Judul_Video_YouTube: eff.apersepsi.videoTitle,
        Link_Video_YouTube: eff.apersepsi.defaultVideoUrl,
        Durasi_Video: eff.apersepsi.videoDuration,
        Deskripsi_Video: eff.apersepsi.videoDescription,
        Cerita_Kontekstual_Apersepsi: eff.apersepsi.realLifeStory,
        Pertanyaan_Pemantik: (eff.apersepsi.triggerQuestions || []).join(' | '),
        Kunci_Jawaban_Pemantik: ov.customTriggerAnswerKey || 'Siswa mampu mengaitkan fenomena sehari-hari dengan konsep inti materi.',
        Ringkasan_Materi_Utama: eff.materi.overview,
        Tahukah_Kamu: eff.materi.tahukahKamu,
        Fakta_Menarik: eff.materi.faktaMenarik,
        Info_Penting: eff.materi.infoPenting,
        Konsep_Utama: conceptsStr,
        Contoh_Sehari_Hari: (eff.materi.dailyLifeExamples || []).join(' | '),
        Contoh_Di_Sekolah: (eff.materi.schoolExamples || []).join(' | '),
        Kesalahan_Umum: (eff.materi.commonMistakes || []).join(' | '),
        Rangkuman_Poin_Penting: (eff.materi.summary || []).join(' | '),
        Link_Gambar_Materi: ov.customMateriImageUrl || '',
        Link_Gambar_Infografis: ov.customInfographicUrl || '',
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 }, { wch: 8 }, { wch: 28 }, { wch: 35 }, { wch: 45 },
      { wch: 28 }, { wch: 38 }, { wch: 12 }, { wch: 35 }, { wch: 45 },
      { wch: 45 }, { wch: 40 }, { wch: 50 }, { wch: 40 }, { wch: 40 },
      { wch: 40 }, { wch: 60 }, { wch: 45 }, { wch: 45 }, { wch: 45 },
      { wch: 45 }, { wch: 30 }, { wch: 30 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Materi_Apersepsi');
  }

  // 2. SHEET ASESMEN AWAL (DIAGNOSTIK)
  if (shouldInclude('asesmen-awal')) {
    const rows: Record<string, any>[] = [];
    targetTopics.forEach((baseTopic) => {
      const eff = helpers.getEffectiveTopic(baseTopic);
      (eff.asesmenAwal || []).forEach((q, idx) => {
        const optA = q.options.find((o) => o.label === 'A')?.text || q.options[0]?.text || '';
        const optB = q.options.find((o) => o.label === 'B')?.text || q.options[1]?.text || '';
        const optC = q.options.find((o) => o.label === 'C')?.text || q.options[2]?.text || '';
        const optD = q.options.find((o) => o.label === 'D')?.text || q.options[3]?.text || '';
        rows.push({
          ID_Materi: eff.id,
          Judul_Materi: eff.title,
          No: idx + 1,
          Pertanyaan: q.question,
          Opsi_A: optA,
          Opsi_B: optB,
          Opsi_C: optC,
          Opsi_D: optD,
          Kunci_Jawaban: q.correctAnswer || 'A',
          Tag_Konsep: q.conceptTag || '',
          Rekomendasi_Belajar: q.recommendation || '',
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 }, { wch: 26 }, { wch: 6 }, { wch: 55 },
      { wch: 35 }, { wch: 35 }, { wch: 35 }, { wch: 35 },
      { wch: 14 }, { wch: 25 }, { wch: 45 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Asesmen_Awal');
  }

  // 3. SHEET KUIS FORMATIF (CEK PEMAHAMAN MATERI)
  if (shouldInclude('kuis-formatif')) {
    const rows: Record<string, any>[] = [];
    targetTopics.forEach((baseTopic) => {
      const eff = helpers.getEffectiveTopic(baseTopic);
      (eff.materi.formativeCheck || []).forEach((q, idx) => {
        rows.push({
          ID_Materi: eff.id,
          Judul_Materi: eff.title,
          No: idx + 1,
          Pertanyaan: q.question,
          Opsi_A: q.options[0] || '',
          Opsi_B: q.options[1] || '',
          Opsi_C: q.options[2] || '',
          Opsi_D: q.options[3] || '',
          Kunci_Jawaban: indexToLetter(q.answerIndex ?? 0),
          Pembahasan: q.explanation || '',
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 }, { wch: 26 }, { wch: 6 }, { wch: 55 },
      { wch: 35 }, { wch: 35 }, { wch: 35 }, { wch: 35 },
      { wch: 14 }, { wch: 50 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Kuis_Formatif');
  }

  // 4. SHEET MINI GAME BATTLE BOT & BALAP MOTOR
  if (shouldInclude('mini-game-battle')) {
    const rows: Record<string, any>[] = [];
    targetTopics.forEach((baseTopic) => {
      const rawPack = getTopicGamePack(baseTopic.id, baseTopic.title, baseTopic.grade);
      const effPack = helpers.getEffectiveGamePack(baseTopic.id, rawPack);
      (effPack.battleBot || []).forEach((q, idx) => {
        rows.push({
          ID_Materi: baseTopic.id,
          Judul_Materi: baseTopic.title,
          No: idx + 1,
          Skenario_Cerita: q.scenario || '',
          Pertanyaan: q.question,
          Opsi_A: q.options[0]?.text || '',
          Opsi_B: q.options[1]?.text || '',
          Opsi_C: q.options[2]?.text || '',
          Opsi_D: q.options[3]?.text || '',
          Kunci_Jawaban: indexToLetter(q.correctIndex ?? 0),
          Damage_Poin: q.damage || 25,
          Pembahasan: q.explanation || '',
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 }, { wch: 26 }, { wch: 6 }, { wch: 45 }, { wch: 55 },
      { wch: 35 }, { wch: 35 }, { wch: 35 }, { wch: 35 },
      { wch: 14 }, { wch: 14 }, { wch: 50 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'MiniGame_Battle_Balap');
  }

  // 5. SHEET MINI GAME SUSUN KATA & SKETSA CEPAT
  if (shouldInclude('mini-game-kata')) {
    const rows: Record<string, any>[] = [];
    targetTopics.forEach((baseTopic) => {
      const rawPack = getTopicGamePack(baseTopic.id, baseTopic.title, baseTopic.grade);
      const effPack = helpers.getEffectiveGamePack(baseTopic.id, rawPack);
      (effPack.wordScramble || []).forEach((w, idx) => {
        rows.push({
          ID_Materi: baseTopic.id,
          Judul_Materi: baseTopic.title,
          No: idx + 1,
          Kata_Kunci_Jawaban: w.word,
          Petunjuk_Soal_Perintah: w.clue,
          Konteks_Sehari_Hari: w.dailyContext,
          Huruf_Acak: w.scrambled || makeScrambledLetters(w.word),
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 }, { wch: 26 }, { wch: 6 }, { wch: 25 },
      { wch: 55 }, { wch: 50 }, { wch: 28 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'MiniGame_Kata_Sketsa');
  }

  // 6. SHEET MINI GAME TEBAK GAMBAR
  if (shouldInclude('mini-game-gambar')) {
    const rows: Record<string, any>[] = [];
    targetTopics.forEach((baseTopic) => {
      const rawPack = getTopicGamePack(baseTopic.id, baseTopic.title, baseTopic.grade);
      const effPack = helpers.getEffectiveGamePack(baseTopic.id, rawPack);
      (effPack.pictureGuess || []).forEach((pg: PictureGuessQuestion, idx: number) => {
        rows.push({
          ID_Materi: baseTopic.id,
          Judul_Materi: baseTopic.title,
          No: idx + 1,
          Judul_Soal_Gambar: pg.title,
          Petunjuk_Visual: pg.clue,
          Konteks_Sehari_Hari: pg.dailyContext,
          Opsi_A: pg.options[0] || '',
          Opsi_B: pg.options[1] || '',
          Opsi_C: pg.options[2] || '',
          Opsi_D: pg.options[3] || '',
          Kunci_Jawaban: indexToLetter(pg.correctIndex ?? 0),
          Link_Gambar_Custom: pg.customImageUrl || '',
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 }, { wch: 26 }, { wch: 6 }, { wch: 30 },
      { wch: 50 }, { wch: 45 }, { wch: 32 }, { wch: 32 },
      { wch: 32 }, { wch: 32 }, { wch: 14 }, { wch: 38 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'MiniGame_TebakGambar');
  }

  // 7. SHEET SIMULASI & STUDI KASUS PBL
  if (shouldInclude('simulasi-pbl')) {
    const rows: Record<string, any>[] = [];
    targetTopics.forEach((baseTopic) => {
      const eff = helpers.getEffectiveTopic(baseTopic);
      const rawPbl = getTopicPblScenario(
        baseTopic.id,
        baseTopic.title,
        baseTopic.grade,
        baseTopic.category
      );
      const effPbl = helpers.getEffectivePblScenario(baseTopic.id, rawPbl);

      rows.push({
        ID_Materi: eff.id,
        Judul_Materi: eff.title,
        Judul_Simulasi: eff.simulasi.title,
        Skenario_Simulasi: eff.simulasi.scenario,
        Instruksi_Simulasi: eff.simulasi.instructions,
        Judul_Kasus_PBL: effPbl.title,
        Lokasi_Kasus_PBL: effPbl.location,
        Tingkat_Urgensi_PBL: effPbl.urgencyLevel,
        Headline_Berita_PBL: effPbl.headline,
        Cerita_Konteks_PBL: effPbl.contextStory,
        Pertanyaan_Utama_PBL: effPbl.drivingQuestion,
        Target_Karya_LKPD: effPbl.deliverableName,
        Fakta_Yang_Diketahui: (effPbl.whatWeKnow || []).join(' | '),
        Hal_Yang_Perlu_Dipetakan: (effPbl.whatWeNeedToLearn || []).join(' | '),
        Kunci_Masalah_Ideal_PBL: effPbl.idealProblemAnswer || '',
        Kunci_Solusi_Ideal_PBL: effPbl.idealSolutionAnswer || '',
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 }, { wch: 26 }, { wch: 30 }, { wch: 45 },
      { wch: 45 }, { wch: 32 }, { wch: 25 }, { wch: 18 },
      { wch: 40 }, { wch: 55 }, { wch: 50 }, { wch: 32 },
      { wch: 45 }, { wch: 45 }, { wch: 55 }, { wch: 55 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Simulasi_PBL');
  }

  // 8. SHEET KUIS INTERAKTIF HOTS
  if (shouldInclude('kuis-hots')) {
    const rows: Record<string, any>[] = [];
    targetTopics.forEach((baseTopic) => {
      const eff = helpers.getEffectiveTopic(baseTopic);
      (eff.kuis || []).forEach((q, idx) => {
        const optA = q.options.find((o) => o.label === 'A')?.text || q.options[0]?.text || '';
        const optB = q.options.find((o) => o.label === 'B')?.text || q.options[1]?.text || '';
        const optC = q.options.find((o) => o.label === 'C')?.text || q.options[2]?.text || '';
        const optD = q.options.find((o) => o.label === 'D')?.text || q.options[3]?.text || '';
        rows.push({
          ID_Materi: eff.id,
          Judul_Materi: eff.title,
          No: idx + 1,
          Pertanyaan: q.question,
          Opsi_A: optA,
          Opsi_B: optB,
          Opsi_C: optC,
          Opsi_D: optD,
          Kunci_Jawaban: q.correctAnswer || 'A',
          Level_Kompetensi: q.competencyLevel || 'Penalaran (HOTS)',
          Pembahasan: q.explanation || '',
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 }, { wch: 26 }, { wch: 6 }, { wch: 55 },
      { wch: 35 }, { wch: 35 }, { wch: 35 }, { wch: 35 },
      { wch: 14 }, { wch: 22 }, { wch: 50 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Kuis_HOTS');
  }

  // 9. SHEET ASESMEN AKHIR
  if (shouldInclude('asesmen-akhir')) {
    const rows: Record<string, any>[] = [];
    targetTopics.forEach((baseTopic) => {
      const eff = helpers.getEffectiveTopic(baseTopic);
      (eff.asesmenAkhir || []).forEach((q, idx) => {
        const optA = q.options.find((o) => o.label === 'A')?.text || q.options[0]?.text || '';
        const optB = q.options.find((o) => o.label === 'B')?.text || q.options[1]?.text || '';
        const optC = q.options.find((o) => o.label === 'C')?.text || q.options[2]?.text || '';
        const optD = q.options.find((o) => o.label === 'D')?.text || q.options[3]?.text || '';
        rows.push({
          ID_Materi: eff.id,
          Judul_Materi: eff.title,
          No: idx + 1,
          Pertanyaan: q.question,
          Opsi_A: optA,
          Opsi_B: optB,
          Opsi_C: optC,
          Opsi_D: optD,
          Kunci_Jawaban: q.correctAnswer || 'A',
          Bobot_Poin: q.points || 10,
          Pembahasan: q.explanation || '',
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 }, { wch: 26 }, { wch: 6 }, { wch: 55 },
      { wch: 35 }, { wch: 35 }, { wch: 35 }, { wch: 35 },
      { wch: 14 }, { wch: 12 }, { wch: 50 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Asesmen_Akhir');
  }

  const safeTopicSlug =
    scope === 'all-topics'
      ? 'Semua_Materi_Kelas_7_8_9'
      : (ALL_TOPICS.find((t) => t.id === topicId)?.id || topicId).toUpperCase();
  const sectionMeta = BANK_SOAL_SECTIONS.find((s) => s.id === section);
  const safeSectionSlug = sectionMeta ? sectionMeta.sheetName : 'Bank_Soal';
  const fileName = `Bank_Soal_${safeTopicSlug}_${safeSectionSlug}.xlsx`;

  XLSX.writeFile(wb, fileName);
}

/**
 * Download Template Excel (.xlsx) khusus untuk salah satu dari 12 Mini Game (atau ke-12 Mini Game sekaligus)
 * lengkap dengan kolom Kode_Game agar saat diupload kembali otomatis tersinkron ke database Mini Game terkait.
 */
export function downloadMiniGameTemplateExcel(params: {
  scope: 'single-topic' | 'all-topics';
  topicId: string;
  gameId: SpecificMiniGameId | 'all-mini-games';
  helpers: ExportContextHelpers;
}): void {
  const { scope, topicId, gameId, helpers } = params;
  const targetTopics =
    scope === 'all-topics'
      ? ALL_TOPICS
      : [ALL_TOPICS.find((t) => t.id === topicId) || ALL_TOPICS[0]];

  const gamesToExport =
    gameId === 'all-mini-games'
      ? MINI_GAME_QUIZ_TEMPLATES
      : MINI_GAME_QUIZ_TEMPLATES.filter((g) => g.id === gameId);

  const wb = XLSX.utils.book_new();

  gamesToExport.forEach((gameMeta) => {
    const rows: Record<string, any>[] = [];

    targetTopics.forEach((baseTopic) => {
      const effTopic = helpers.getEffectiveTopic(baseTopic);
      const rawPack = getTopicGamePack(baseTopic.id, baseTopic.title, baseTopic.grade);
      const effPack = helpers.getEffectiveGamePack(baseTopic.id, rawPack);
      const ov = helpers.overrides[baseTopic.id];

      if (gameMeta.formatType === 'word') {
        (effPack.wordScramble || []).forEach((w, idx) => {
          rows.push({
            ID_Materi: baseTopic.id,
            Judul_Materi: effTopic.title,
            Kode_Game: gameMeta.id,
            Nama_Mini_Game: gameMeta.label,
            No: idx + 1,
            Kata_Kunci_Jawaban: w.word,
            Petunjuk_Soal_Perintah: w.clue,
            Konteks_Sehari_Hari: w.dailyContext,
            Huruf_Acak: w.scrambled || makeScrambledLetters(w.word),
          });
        });
      } else if (gameMeta.formatType === 'picture') {
        (effPack.pictureGuess || []).forEach((pg: PictureGuessQuestion, idx: number) => {
          rows.push({
            ID_Materi: baseTopic.id,
            Judul_Materi: effTopic.title,
            Kode_Game: gameMeta.id,
            Nama_Mini_Game: gameMeta.label,
            No: idx + 1,
            Judul_Soal_Gambar: pg.title,
            Petunjuk_Visual: pg.clue,
            Konteks_Sehari_Hari: pg.dailyContext,
            Opsi_A: pg.options[0] || '',
            Opsi_B: pg.options[1] || '',
            Opsi_C: pg.options[2] || '',
            Opsi_D: pg.options[3] || '',
            Kunci_Jawaban: indexToLetter(pg.correctIndex ?? 0),
            Link_Gambar_Custom: pg.customImageUrl || '',
          });
        });
      } else {
        const list = getDefaultQuestionsForMiniGame(effTopic, gameMeta.id, effPack, ov);
        list.forEach((q, idx) => {
          rows.push({
            ID_Materi: baseTopic.id,
            Judul_Materi: effTopic.title,
            Kode_Game: gameMeta.id,
            Nama_Mini_Game: gameMeta.label,
            No: idx + 1,
            Skenario_Cerita: q.scenario || '',
            Pertanyaan: q.question,
            Opsi_A: q.options[0]?.text || '',
            Opsi_B: q.options[1]?.text || '',
            Opsi_C: q.options[2]?.text || '',
            Opsi_D: q.options[3]?.text || '',
            Kunci_Jawaban: indexToLetter(q.correctIndex ?? 0),
            Damage_Poin: q.damage || 25,
            Pembahasan: q.explanation || '',
          });
        });
      }
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 12 },
      { wch: 24 },
      { wch: 16 },
      { wch: 28 },
      { wch: 6 },
      { wch: 42 },
      { wch: 52 },
      { wch: 34 },
      { wch: 34 },
      { wch: 34 },
      { wch: 34 },
      { wch: 14 },
      { wch: 14 },
      { wch: 45 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, gameMeta.sheetName.slice(0, 31));
  });

  const safeTopicSlug =
    scope === 'all-topics'
      ? 'Semua_Materi'
      : (ALL_TOPICS.find((t) => t.id === topicId)?.id || topicId).toUpperCase();
  const safeGameSlug =
    gameId === 'all-mini-games'
      ? 'Semua_12_MiniGame'
      : MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === gameId)?.sheetName || gameId;

  XLSX.writeFile(wb, `Template_BankSoal_${safeTopicSlug}_${safeGameSlug}.xlsx`);
}

export interface ParsedExcelBankResult {
  updatesByTopic: Record<string, Partial<TopicContentOverride>>;
  summaryMessages: string[];
  totalTopicsUpdated: number;
  totalItemsUpdated: number;
}

function splitPipeList(raw: any): string[] {
  const str = String(raw ?? '').trim();
  if (!str) return [];
  return str
    .split(/\s*\|\s*|\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseKeyConceptsString(raw: any, fallbackConcepts: KeyConcept[]): KeyConcept[] {
  const str = String(raw ?? '').trim();
  if (!str) return fallbackConcepts;
  const blocks = str
    .split(/\s*\|\|\s*/)
    .map((b) => b.trim())
    .filter(Boolean);
  if (blocks.length === 0) return fallbackConcepts;

  return blocks.map((block, idx) => {
    const existing = fallbackConcepts[idx];
    const bracketMatch = block.match(/\[(.*)\]$/);
    const bulletStr = bracketMatch ? bracketMatch[1] : '';
    const mainPart = bracketMatch ? block.slice(0, bracketMatch.index).trim() : block;
    const colonIdx = mainPart.indexOf(':');
    const title =
      colonIdx > 0 ? mainPart.slice(0, colonIdx).trim() : existing?.title || `Konsep ${idx + 1}`;
    const explanation =
      colonIdx > 0 ? mainPart.slice(colonIdx + 1).trim() : mainPart;
    const bulletPoints = bulletStr
      ? bulletStr
          .split(/\s*;\s*/)
          .map((s) => s.trim())
          .filter(Boolean)
      : existing?.bulletPoints || [];

    return {
      title,
      explanation,
      bulletPoints,
      iconName: existing?.iconName || 'Cpu',
    };
  });
}

/**
 * Parses an uploaded Excel (.xlsx / .xls / .csv) ArrayBuffer and extracts structured TopicContentOverride objects.
 */
export function parseQuestionBankExcel(
  buffer: ArrayBuffer,
  defaultTopicId: string,
  activeSectionFilter: BankSoalSection,
  targetMiniGameId?: SpecificMiniGameId
): ParsedExcelBankResult {
  const wb = XLSX.read(buffer, { type: 'array' });
  const updatesByTopic: Record<string, Partial<TopicContentOverride>> = {};
  const summaryMessages: string[] = [];
  let totalItemsUpdated = 0;

  const ensureTopicBucket = (tid: string): Partial<TopicContentOverride> => {
    const validTopic = ALL_TOPICS.find((t) => t.id.toLowerCase() === tid.toLowerCase());
    const resolvedId = validTopic ? validTopic.id : defaultTopicId;
    if (!updatesByTopic[resolvedId]) {
      updatesByTopic[resolvedId] = {};
    }
    return updatesByTopic[resolvedId];
  };

  const resolveRowTopicId = (row: Record<string, any>): string => {
    const rawId = String(row['ID_Materi'] || row['Topic_ID'] || row['id_materi'] || '').trim();
    if (rawId) {
      const match = ALL_TOPICS.find((t) => t.id.toLowerCase() === rawId.toLowerCase());
      if (match) return match.id;
    }
    const rawTitle = String(row['Judul_Materi'] || '').trim().toLowerCase();
    if (rawTitle) {
      const matchByTitle = ALL_TOPICS.find((t) => t.title.toLowerCase() === rawTitle);
      if (matchByTitle) return matchByTitle.id;
    }
    return defaultTopicId;
  };

  const resolveMiniGameIdFromRowOrSheet = (
    row: Record<string, any>,
    sheetName: string
  ): SpecificMiniGameId | null => {
    const rawCode = String(row['Kode_Game'] || row['ID_Game'] || '').trim().toLowerCase();
    if (rawCode) {
      const matched = MINI_GAME_QUIZ_TEMPLATES.find(
        (m) => m.id === rawCode || m.sheetName.toLowerCase() === rawCode
      );
      if (matched) return matched.id;
    }
    const lowerS = sheetName.toLowerCase();
    const matchedSheet = MINI_GAME_QUIZ_TEMPLATES.find(
      (m) => lowerS === m.sheetName.toLowerCase() || lowerS.includes(m.id)
    );
    if (matchedSheet) return matchedSheet.id;
    if (lowerS.includes('mg01') || lowerS.includes('robot_tinju')) return 'battle-bot';
    if (lowerS.includes('mg02') || lowerS.includes('balap_motor')) return 'balap-robot';
    if (lowerS.includes('mg03') || lowerS.includes('susun_kata')) return 'tebak-kata';
    if (lowerS.includes('mg04') || lowerS.includes('tebak_gambar')) return 'tebak-gambar';
    if (lowerS.includes('mg05') || lowerS.includes('tarik_tambang')) return 'tug-of-war';
    if (lowerS.includes('mg06') || lowerS.includes('jinak_bom')) return 'bomb-defusal';
    if (lowerS.includes('mg07') || lowerS.includes('menara_firewall')) return 'tower-defense';
    if (lowerS.includes('mg08') || lowerS.includes('ketuk_data')) return 'whack-a-mole';
    if (lowerS.includes('mg09') || lowerS.includes('labirin_koding')) return 'robo-maze';
    if (lowerS.includes('mg10') || lowerS.includes('roda_misteri')) return 'spin-wheel';
    if (lowerS.includes('mg11') || lowerS.includes('detektif_siber')) return 'cyber-detective';
    if (lowerS.includes('mg12') || lowerS.includes('sketsa_cepat')) return 'sketsa-cepat';
    return targetMiniGameId || null;
  };

  wb.SheetNames.forEach((sheetName) => {
    const ws = wb.Sheets[sheetName];
    if (!ws) return;
    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: '' });
    if (!rows || rows.length === 0) return;

    const lowerSheet = sheetName.toLowerCase();
    const firstRow = rows[0] || {};
    const keys = Object.keys(firstRow);
    const detectedSheetGameId = resolveMiniGameIdFromRowOrSheet(firstRow, sheetName);

    // Detect sheet type by sheetName or column headers
    const isMateriSheet =
      lowerSheet.includes('materi') ||
      keys.includes('Ringkasan_Materi_Utama') ||
      keys.includes('Link_Video_YouTube') ||
      (wb.SheetNames.length === 1 && activeSectionFilter === 'materi' && !detectedSheetGameId);

    const isAsesmenAwalSheet =
      lowerSheet.includes('asesmen_awal') ||
      lowerSheet.includes('diagnostik') ||
      keys.includes('Rekomendasi_Belajar') ||
      keys.includes('Tag_Konsep') ||
      (wb.SheetNames.length === 1 && activeSectionFilter === 'asesmen-awal' && !detectedSheetGameId);

    const isFormatifSheet =
      lowerSheet.includes('formatif') ||
      lowerSheet.includes('cek_pemahaman') ||
      (wb.SheetNames.length === 1 && activeSectionFilter === 'kuis-formatif' && !detectedSheetGameId);

    const isKataSheet =
      detectedSheetGameId === 'tebak-kata' ||
      lowerSheet.includes('kata') ||
      keys.includes('Kata_Kunci_Jawaban') ||
      keys.includes('Petunjuk_Soal_Perintah') ||
      (wb.SheetNames.length === 1 && activeSectionFilter === 'mini-game-kata' && detectedSheetGameId !== 'sketsa-cepat');

    const isGambarSheet =
      detectedSheetGameId === 'tebak-gambar' ||
      lowerSheet.includes('gambar') ||
      keys.includes('Judul_Soal_Gambar') ||
      keys.includes('Petunjuk_Visual') ||
      (wb.SheetNames.length === 1 && activeSectionFilter === 'mini-game-gambar');

    const isBattleOrSpecificMiniGameSheet =
      (detectedSheetGameId !== null &&
        detectedSheetGameId !== 'tebak-kata' &&
        detectedSheetGameId !== 'tebak-gambar') ||
      lowerSheet.includes('battle') ||
      lowerSheet.includes('balap') ||
      lowerSheet.includes('minigame') ||
      keys.includes('Kode_Game') ||
      keys.includes('Skenario_Cerita') ||
      keys.includes('Damage_Poin') ||
      (wb.SheetNames.length === 1 && activeSectionFilter === 'mini-game-battle');

    const isSimulasiPblSheet =
      lowerSheet.includes('simulasi') ||
      lowerSheet.includes('pbl') ||
      keys.includes('Judul_Kasus_PBL') ||
      keys.includes('Judul_Simulasi') ||
      (wb.SheetNames.length === 1 && activeSectionFilter === 'simulasi-pbl');

    const isKuisHotsSheet =
      lowerSheet.includes('kuis_hots') ||
      lowerSheet === 'kuis' ||
      keys.includes('Level_Kompetensi') ||
      (wb.SheetNames.length === 1 && activeSectionFilter === 'kuis-hots');

    const isAsesmenAkhirSheet =
      lowerSheet.includes('asesmen_akhir') ||
      lowerSheet.includes('ujian') ||
      keys.includes('Bobot_Poin') ||
      (wb.SheetNames.length === 1 && activeSectionFilter === 'asesmen-akhir');

    // 1. Parse Materi & Apersepsi
    if (isMateriSheet) {
      let count = 0;
      rows.forEach((row) => {
        const tid = resolveRowTopicId(row);
        const baseTopic = ALL_TOPICS.find((t) => t.id === tid) || ALL_TOPICS[0];
        const bucket = ensureTopicBucket(tid);

        if (row['Judul_Materi']) bucket.title = String(row['Judul_Materi']).trim();
        if (row['Deskripsi_Singkat']) bucket.shortDesc = String(row['Deskripsi_Singkat']).trim();
        const objectives = splitPipeList(row['Tujuan_Pembelajaran']);
        if (objectives.length > 0) bucket.learningObjectives = objectives;

        if (row['Judul_Video_YouTube']) bucket.customVideoTitle = String(row['Judul_Video_YouTube']).trim();
        if (row['Link_Video_YouTube']) bucket.customVideoUrl = String(row['Link_Video_YouTube']).trim();
        if (row['Durasi_Video']) bucket.customVideoDuration = String(row['Durasi_Video']).trim();
        if (row['Deskripsi_Video']) bucket.customVideoDescription = String(row['Deskripsi_Video']).trim();
        if (row['Cerita_Kontekstual_Apersepsi']) {
          bucket.customRealLifeStory = String(row['Cerita_Kontekstual_Apersepsi']).trim();
        }
        const triggers = splitPipeList(row['Pertanyaan_Pemantik']);
        if (triggers.length > 0) bucket.customTriggerQuestions = triggers;
        if (row['Kunci_Jawaban_Pemantik']) {
          bucket.customTriggerAnswerKey = String(row['Kunci_Jawaban_Pemantik']).trim();
        }

        if (row['Ringkasan_Materi_Utama']) bucket.overview = String(row['Ringkasan_Materi_Utama']).trim();
        if (row['Tahukah_Kamu']) bucket.tahukahKamu = String(row['Tahukah_Kamu']).trim();
        if (row['Fakta_Menarik']) bucket.faktaMenarik = String(row['Fakta_Menarik']).trim();
        if (row['Info_Penting']) bucket.infoPenting = String(row['Info_Penting']).trim();

        if (row['Konsep_Utama']) {
          bucket.customKeyConcepts = parseKeyConceptsString(
            row['Konsep_Utama'],
            baseTopic.materi.keyConcepts
          );
        }

        const dailyEx = splitPipeList(row['Contoh_Sehari_Hari']);
        if (dailyEx.length > 0) bucket.customDailyLifeExamples = dailyEx;

        const schoolEx = splitPipeList(row['Contoh_Di_Sekolah']);
        if (schoolEx.length > 0) bucket.customSchoolExamples = schoolEx;

        const mistakes = splitPipeList(row['Kesalahan_Umum']);
        if (mistakes.length > 0) bucket.customCommonMistakes = mistakes;

        const summary = splitPipeList(row['Rangkuman_Poin_Penting']);
        if (summary.length > 0) bucket.customSummary = summary;

        if (row['Link_Gambar_Materi']) bucket.customMateriImageUrl = String(row['Link_Gambar_Materi']).trim();
        if (row['Link_Gambar_Infografis']) bucket.customInfographicUrl = String(row['Link_Gambar_Infografis']).trim();

        count++;
        totalItemsUpdated++;
      });
      if (count > 0) summaryMessages.push(`Materi & Apersepsi (${count} bab)`);
      return;
    }

    // 2. Parse Asesmen Awal
    if (isAsesmenAwalSheet) {
      const grouped: Record<string, DiagnosticQuestion[]> = {};
      rows.forEach((row, idx) => {
        const qText = String(row['Pertanyaan'] || '').trim();
        if (!qText) return;
        const tid = resolveRowTopicId(row);
        if (!grouped[tid]) grouped[tid] = [];
        const optA = String(row['Opsi_A'] || 'Opsi A').trim();
        const optB = String(row['Opsi_B'] || 'Opsi B').trim();
        const optC = String(row['Opsi_C'] || 'Opsi C').trim();
        const optD = String(row['Opsi_D'] || 'Opsi D').trim();
        const ans = normalizeAnswerLetter(row['Kunci_Jawaban'], [optA, optB, optC, optD]);

        grouped[tid].push({
          id: grouped[tid].length + 1,
          question: qText,
          options: [
            { label: 'A', text: optA },
            { label: 'B', text: optB },
            { label: 'C', text: optC },
            { label: 'D', text: optD },
          ],
          correctAnswer: ans,
          conceptTag: String(row['Tag_Konsep'] || `Konsep ${idx + 1}`).trim(),
          recommendation: String(
            row['Rekomendasi_Belajar'] || 'Pelajari kembali bagian konsep utama pada modul materi.'
          ).trim(),
        });
        totalItemsUpdated++;
      });
      Object.entries(grouped).forEach(([tid, list]) => {
        if (list.length > 0) {
          ensureTopicBucket(tid).customAsesmenAwal = list;
        }
      });
      const totalQ = Object.values(grouped).reduce((acc, l) => acc + l.length, 0);
      if (totalQ > 0) summaryMessages.push(`Soal Asesmen Awal (${totalQ} soal)`);
      return;
    }

    // 3. Parse Kuis Formatif
    if (isFormatifSheet) {
      const grouped: Record<string, FormativeQuizItem[]> = {};
      rows.forEach((row) => {
        const qText = String(row['Pertanyaan'] || '').trim();
        if (!qText) return;
        const tid = resolveRowTopicId(row);
        if (!grouped[tid]) grouped[tid] = [];
        const optA = String(row['Opsi_A'] || 'Opsi A').trim();
        const optB = String(row['Opsi_B'] || 'Opsi B').trim();
        const optC = String(row['Opsi_C'] || 'Opsi C').trim();
        const optD = String(row['Opsi_D'] || 'Opsi D').trim();
        const ansLetter = normalizeAnswerLetter(row['Kunci_Jawaban'], [optA, optB, optC, optD]);

        grouped[tid].push({
          question: qText,
          options: [optA, optB, optC, optD],
          answerIndex: letterToIndex(ansLetter),
          explanation: String(row['Pembahasan'] || 'Jawaban sudah sesuai dengan konsep utama materi.').trim(),
        });
        totalItemsUpdated++;
      });
      Object.entries(grouped).forEach(([tid, list]) => {
        if (list.length > 0) {
          ensureTopicBucket(tid).customFormativeCheck = list;
        }
      });
      const totalQ = Object.values(grouped).reduce((acc, l) => acc + l.length, 0);
      if (totalQ > 0) summaryMessages.push(`Soal Cek Pemahaman Formatif (${totalQ} soal)`);
      return;
    }

    // 4. Parse Mini Game Susun Kata & Sketsa Cepat (Format Kata)
    if (isKataSheet) {
      const grouped: Record<string, WordScrambleQuestion[]> = {};
      rows.forEach((row) => {
        const word = String(row['Kata_Kunci_Jawaban'] || '').trim().toUpperCase();
        const clue = String(row['Petunjuk_Soal_Perintah'] || '').trim();
        if (!word && !clue) return;
        const tid = resolveRowTopicId(row);
        if (!grouped[tid]) grouped[tid] = [];
        const cleanWord = word || 'INFORMATIKA';
        const rawScrambled = String(row['Huruf_Acak'] || '').trim().toUpperCase();

        grouped[tid].push({
          id: grouped[tid].length + 1,
          word: cleanWord,
          clue: clue || `Susun kata atau gambar ilustrasi yang berkaitan dengan ${cleanWord}`,
          dailyContext: String(row['Konteks_Sehari_Hari'] || 'Penerapan dalam kehidupan sehari-hari.').trim(),
          scrambled: rawScrambled || makeScrambledLetters(cleanWord),
        });
        totalItemsUpdated++;
      });
      Object.entries(grouped).forEach(([tid, list]) => {
        if (list.length > 0) {
          ensureTopicBucket(tid).customWordScramble = list;
        }
      });
      const totalQ = Object.values(grouped).reduce((acc, l) => acc + l.length, 0);
      if (totalQ > 0) summaryMessages.push(`Soal Mini Game Susun Kata (${totalQ} soal)`);
      return;
    }

    // 5. Parse Mini Game Tebak Gambar
    if (isGambarSheet) {
      const grouped: Record<string, Record<number, PictureGuessOverrideItem>> = {};
      const groupedList: Record<string, PictureGuessQuestion[]> = {};
      const counts: Record<string, number> = {};
      rows.forEach((row) => {
        const title = String(row['Judul_Soal_Gambar'] || '').trim();
        const clue = String(row['Petunjuk_Visual'] || '').trim();
        if (!title && !clue) return;
        const tid = resolveRowTopicId(row);
        if (!grouped[tid]) {
          grouped[tid] = {};
          groupedList[tid] = [];
          counts[tid] = 0;
        }
        const idx = counts[tid];
        const optA = String(row['Opsi_A'] || 'Opsi A').trim();
        const optB = String(row['Opsi_B'] || 'Opsi B').trim();
        const optC = String(row['Opsi_C'] || 'Opsi C').trim();
        const optD = String(row['Opsi_D'] || 'Opsi D').trim();
        const ansLetter = normalizeAnswerLetter(row['Kunci_Jawaban'], [optA, optB, optC, optD]);

        const itemObj: PictureGuessOverrideItem = {
          title: title || `Tebak Gambar #${idx + 1}`,
          clue: clue || 'Perhatikan ilustrasi berikut dengan saksama.',
          dailyContext: String(row['Konteks_Sehari_Hari'] || '').trim(),
          options: [optA, optB, optC, optD],
          correctIndex: letterToIndex(ansLetter),
          customImageUrl: String(row['Link_Gambar_Custom'] || '').trim(),
        };
        grouped[tid][idx] = itemObj;
        groupedList[tid].push({
          id: idx + 1,
          illustrationType: 'pattern',
          title: itemObj.title!,
          clue: itemObj.clue!,
          dailyContext: itemObj.dailyContext || '',
          options: itemObj.options!,
          correctIndex: itemObj.correctIndex!,
          customImageUrl: itemObj.customImageUrl,
        });
        counts[tid]++;
        totalItemsUpdated++;
      });
      Object.entries(grouped).forEach(([tid, mapObj]) => {
        if (Object.keys(mapObj).length > 0) {
          const bucket = ensureTopicBucket(tid);
          bucket.pictureGuess = mapObj;
          bucket.customPictureGuessList = groupedList[tid];
        }
      });
      const totalQ = Object.values(counts).reduce((acc, c) => acc + c, 0);
      if (totalQ > 0) summaryMessages.push(`Soal Mini Game Tebak Gambar (${totalQ} soal)`);
      return;
    }

    // 6. Parse Mini Game (Semua 12 Mini Game Spesifik maupun Umum Battle/Balap)
    if (isBattleOrSpecificMiniGameSheet) {
      const groupedGeneral: Record<string, BattleBotQuestion[]> = {};
      const groupedByGame: Record<string, Partial<Record<SpecificMiniGameId, BattleBotQuestion[]>>> = {};
      let parsedCount = 0;

      rows.forEach((row) => {
        const qText = String(row['Pertanyaan'] || '').trim();
        if (!qText) return;
        const tid = resolveRowTopicId(row);
        const rowGameId = resolveMiniGameIdFromRowOrSheet(row, sheetName);

        const optA = String(row['Opsi_A'] || 'Opsi A').trim();
        const optB = String(row['Opsi_B'] || 'Opsi B').trim();
        const optC = String(row['Opsi_C'] || 'Opsi C').trim();
        const optD = String(row['Opsi_D'] || 'Opsi D').trim();
        const ansLetter = normalizeAnswerLetter(row['Kunci_Jawaban'], [optA, optB, optC, optD]);

        const qItem: BattleBotQuestion = {
          id: 1,
          scenario: String(row['Skenario_Cerita'] || 'Tantangan Arena Robot Edukasi').trim(),
          question: qText,
          options: [
            { label: 'A', text: optA },
            { label: 'B', text: optB },
            { label: 'C', text: optC },
            { label: 'D', text: optD },
          ],
          correctIndex: letterToIndex(ansLetter),
          damage: Math.max(10, Math.min(100, Number(row['Damage_Poin']) || 25)),
          explanation: String(row['Pembahasan'] || 'Tindakan tepat sesuai prinsip Informatika.').trim(),
        };

        if (rowGameId) {
          if (!groupedByGame[tid]) groupedByGame[tid] = {};
          if (!groupedByGame[tid][rowGameId]) groupedByGame[tid][rowGameId] = [];
          const targetList = groupedByGame[tid][rowGameId]!;
          qItem.id = targetList.length + 1;
          targetList.push(qItem);
        } else {
          if (!groupedGeneral[tid]) groupedGeneral[tid] = [];
          qItem.id = groupedGeneral[tid].length + 1;
          groupedGeneral[tid].push(qItem);
        }

        parsedCount++;
        totalItemsUpdated++;
      });

      Object.entries(groupedGeneral).forEach(([tid, list]) => {
        if (list.length > 0) {
          const bucket = ensureTopicBucket(tid);
          bucket.customBattleBotQuestions = list;
          bucket.customRobotRaceQuestions = list;
          bucket.customMiniGameQuestions = {
            ...(bucket.customMiniGameQuestions || {}),
            'battle-bot': list,
          };
        }
      });

      Object.entries(groupedByGame).forEach(([tid, gameMap]) => {
        const bucket = ensureTopicBucket(tid);
        bucket.customMiniGameQuestions = {
          ...(bucket.customMiniGameQuestions || {}),
          ...gameMap,
        };
        if (gameMap['battle-bot'] && gameMap['battle-bot'].length > 0) {
          bucket.customBattleBotQuestions = gameMap['battle-bot'];
        }
        if (gameMap['balap-robot'] && gameMap['balap-robot'].length > 0) {
          bucket.customRobotRaceQuestions = gameMap['balap-robot'];
        }
      });

      if (parsedCount > 0) {
        const gameTitle = detectedSheetGameId
          ? MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === detectedSheetGameId)?.shortLabel || detectedSheetGameId
          : 'Mini Game';
        summaryMessages.push(`Bank Soal ${gameTitle} (${parsedCount} soal)`);
      }
      return;
    }

    // 7. Parse Simulasi & PBL
    if (isSimulasiPblSheet) {
      let count = 0;
      rows.forEach((row) => {
        const tid = resolveRowTopicId(row);
        const baseTopic = ALL_TOPICS.find((t) => t.id === tid) || ALL_TOPICS[0];
        const rawPbl = getTopicPblScenario(
          baseTopic.id,
          baseTopic.title,
          baseTopic.grade,
          baseTopic.category
        );
        const bucket = ensureTopicBucket(tid);

        if (row['Judul_Simulasi']) bucket.simulationTitle = String(row['Judul_Simulasi']).trim();
        if (row['Skenario_Simulasi']) bucket.simulationScenario = String(row['Skenario_Simulasi']).trim();
        if (row['Instruksi_Simulasi']) bucket.simulationInstructions = String(row['Instruksi_Simulasi']).trim();

        const pblUpdate: Partial<PblScenario> = {
          ...(bucket.customPblScenario || {}),
        };
        if (row['Judul_Kasus_PBL']) pblUpdate.title = String(row['Judul_Kasus_PBL']).trim();
        if (row['Lokasi_Kasus_PBL']) pblUpdate.location = String(row['Lokasi_Kasus_PBL']).trim();
        if (row['Tingkat_Urgensi_PBL']) {
          const urg = String(row['Tingkat_Urgensi_PBL']).trim();
          if (urg === 'Mendesak' || urg === 'Penting' || urg === 'Biasa') {
            pblUpdate.urgencyLevel = urg;
          }
        }
        if (row['Headline_Berita_PBL']) pblUpdate.headline = String(row['Headline_Berita_PBL']).trim();
        if (row['Cerita_Konteks_PBL']) pblUpdate.contextStory = String(row['Cerita_Konteks_PBL']).trim();
        if (row['Pertanyaan_Utama_PBL']) pblUpdate.drivingQuestion = String(row['Pertanyaan_Utama_PBL']).trim();
        if (row['Target_Karya_LKPD']) pblUpdate.deliverableName = String(row['Target_Karya_LKPD']).trim();

        const knownList = splitPipeList(row['Fakta_Yang_Diketahui']);
        if (knownList.length > 0) pblUpdate.whatWeKnow = knownList;

        const learnList = splitPipeList(row['Hal_Yang_Perlu_Dipetakan']);
        if (learnList.length > 0) pblUpdate.whatWeNeedToLearn = learnList;

        if (Object.keys(pblUpdate).length > 0) {
          bucket.customPblScenario = {
            ...rawPbl,
            ...pblUpdate,
          };
        }

        if (row['Kunci_Masalah_Ideal_PBL']) {
          bucket.customPblIdealProblem = String(row['Kunci_Masalah_Ideal_PBL']).trim();
        }
        if (row['Kunci_Solusi_Ideal_PBL']) {
          bucket.customPblIdealSolution = String(row['Kunci_Solusi_Ideal_PBL']).trim();
        }

        count++;
        totalItemsUpdated++;
      });
      if (count > 0) summaryMessages.push(`Skenario Simulasi & PBL (${count} bab)`);
      return;
    }

    // 8. Parse Kuis Interaktif HOTS
    if (isKuisHotsSheet) {
      const grouped: Record<string, QuizQuestion[]> = {};
      rows.forEach((row) => {
        const qText = String(row['Pertanyaan'] || '').trim();
        if (!qText) return;
        const tid = resolveRowTopicId(row);
        if (!grouped[tid]) grouped[tid] = [];
        const optA = String(row['Opsi_A'] || 'Opsi A').trim();
        const optB = String(row['Opsi_B'] || 'Opsi B').trim();
        const optC = String(row['Opsi_C'] || 'Opsi C').trim();
        const optD = String(row['Opsi_D'] || 'Opsi D').trim();
        const ans = normalizeAnswerLetter(row['Kunci_Jawaban'], [optA, optB, optC, optD]);
        const rawLevel = String(row['Level_Kompetensi'] || '').trim();
        const level: QuizQuestion['competencyLevel'] =
          rawLevel === 'Penerapan (MOTS)' || rawLevel === 'Pemahaman (LOTS)'
            ? rawLevel
            : 'Penalaran (HOTS)';

        grouped[tid].push({
          id: grouped[tid].length + 1,
          question: qText,
          options: [
            { label: 'A', text: optA },
            { label: 'B', text: optB },
            { label: 'C', text: optC },
            { label: 'D', text: optD },
          ],
          correctAnswer: ans,
          competencyLevel: level,
          explanation: String(row['Pembahasan'] || 'Pembahasan sesuai dengan prinsip materi.').trim(),
        });
        totalItemsUpdated++;
      });
      Object.entries(grouped).forEach(([tid, list]) => {
        if (list.length > 0) {
          ensureTopicBucket(tid).customKuis = list;
        }
      });
      const totalQ = Object.values(grouped).reduce((acc, l) => acc + l.length, 0);
      if (totalQ > 0) summaryMessages.push(`Soal Kuis Interaktif HOTS (${totalQ} soal)`);
      return;
    }

    // 9. Parse Asesmen Akhir
    if (isAsesmenAkhirSheet) {
      const grouped: Record<string, FinalAssessmentQuestion[]> = {};
      rows.forEach((row) => {
        const qText = String(row['Pertanyaan'] || '').trim();
        if (!qText) return;
        const tid = resolveRowTopicId(row);
        if (!grouped[tid]) grouped[tid] = [];
        const optA = String(row['Opsi_A'] || 'Opsi A').trim();
        const optB = String(row['Opsi_B'] || 'Opsi B').trim();
        const optC = String(row['Opsi_C'] || 'Opsi C').trim();
        const optD = String(row['Opsi_D'] || 'Opsi D').trim();
        const ans = normalizeAnswerLetter(row['Kunci_Jawaban'], [optA, optB, optC, optD]);

        grouped[tid].push({
          id: grouped[tid].length + 1,
          question: qText,
          options: [
            { label: 'A', text: optA },
            { label: 'B', text: optB },
            { label: 'C', text: optC },
            { label: 'D', text: optD },
          ],
          correctAnswer: ans,
          points: Math.max(1, Math.min(100, Number(row['Bobot_Poin']) || 10)),
          explanation: String(row['Pembahasan'] || 'Pembahasan sesuai evaluasi akhir bab.').trim(),
        });
        totalItemsUpdated++;
      });
      Object.entries(grouped).forEach(([tid, list]) => {
        if (list.length > 0) {
          ensureTopicBucket(tid).customAsesmenAkhir = list;
        }
      });
      const totalQ = Object.values(grouped).reduce((acc, l) => acc + l.length, 0);
      if (totalQ > 0) summaryMessages.push(`Soal Asesmen Akhir (${totalQ} soal)`);
      return;
    }

    // Fallback generic question parser if user uploaded a custom single-sheet Excel with Pertanyaan & Opsi_A..D
    if (keys.includes('Pertanyaan') && (keys.includes('Opsi_A') || keys.includes('Kunci_Jawaban'))) {
      const grouped: Record<string, QuizQuestion[]> = {};
      rows.forEach((row) => {
        const qText = String(row['Pertanyaan'] || '').trim();
        if (!qText) return;
        const tid = resolveRowTopicId(row);
        if (!grouped[tid]) grouped[tid] = [];
        const optA = String(row['Opsi_A'] || 'Opsi A').trim();
        const optB = String(row['Opsi_B'] || 'Opsi B').trim();
        const optC = String(row['Opsi_C'] || 'Opsi C').trim();
        const optD = String(row['Opsi_D'] || 'Opsi D').trim();
        const ans = normalizeAnswerLetter(row['Kunci_Jawaban'], [optA, optB, optC, optD]);

        grouped[tid].push({
          id: grouped[tid].length + 1,
          question: qText,
          options: [
            { label: 'A', text: optA },
            { label: 'B', text: optB },
            { label: 'C', text: optC },
            { label: 'D', text: optD },
          ],
          correctAnswer: ans,
          competencyLevel: 'Penalaran (HOTS)',
          explanation: String(row['Pembahasan'] || '').trim(),
        });
        totalItemsUpdated++;
      });
      Object.entries(grouped).forEach(([tid, list]) => {
        if (list.length > 0) {
          ensureTopicBucket(tid).customKuis = list;
        }
      });
      const totalQ = Object.values(grouped).reduce((acc, l) => acc + l.length, 0);
      if (totalQ > 0) summaryMessages.push(`Soal Kuis (${totalQ} soal)`);
    }
  });

  return {
    updatesByTopic,
    summaryMessages,
    totalTopicsUpdated: Object.keys(updatesByTopic).length,
    totalItemsUpdated,
  };
}
