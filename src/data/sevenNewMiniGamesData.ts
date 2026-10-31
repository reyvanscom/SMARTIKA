import { Topic } from '../types/curriculum';
import { getTopicGamePack, BattleBotQuestion, TopicGamePack } from './interactiveGamesData';
import { TopicContentOverride, SpecificMiniGameId } from '../context/CurriculumOverridesContext';

export interface TugOfWarQuestion {
  id: number;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  pullPower: number; // e.g., 25
  explanation: string;
}

export interface BombWireQuestion {
  id: number;
  bombCode: string;
  timerSeconds: number;
  scenario: string;
  clue: string;
  wires: {
    color: 'Merah' | 'Biru' | 'Kuning' | 'Hijau';
    hex: string;
    label: string;
  }[];
  correctWireIndex: number;
  explanation: string;
}

export interface TowerDefenseWave {
  waveNumber: number;
  enemyName: string;
  enemyType: 'virus' | 'trojan' | 'phishing' | 'worm' | 'boss';
  enemyHp: number;
  scenario: string;
  question: string;
  turretOptions: string[];
  correctIndex: number;
  explanation: string;
}

export interface WhackMoleItem {
  id: string;
  label: string;
  isSafeValid: boolean; // true = Ketuk (+poin), false = Jebakan/Hoaks/Virus (-poin)
  tag: string;
}

export interface RoboMazeLevel {
  level: number;
  title: string;
  missionDesc: string;
  gridSize: number; // 5x5
  startPos: [number, number]; // [row, col]
  goalPos: [number, number];
  lasers: [number, number][];
  solutionSteps: ('MAJU' | 'KIRI' | 'KANAN' | 'LOMPAT')[];
  checkpointQuestion: string;
  checkpointOptions: string[];
  checkpointCorrectIndex: number;
  explanation: string;
}

export interface DetectiveCase {
  id: number;
  caseNumber: string;
  caseTitle: string;
  incidentReport: string;
  clues: [string, string, string]; // 3 progressive clues
  suspectOptions: string[];
  correctSuspectIndex: number;
  explanation: string;
}

export interface ExtraMiniGamesPack {
  tugOfWar: TugOfWarQuestion[];
  bombDefusal: BombWireQuestion[];
  towerDefense: TowerDefenseWave[];
  whackMoleItems: WhackMoleItem[];
  roboMaze: RoboMazeLevel[];
  spinWheel: TugOfWarQuestion[];
  detectiveCases: DetectiveCase[];
}

// Helper deterministic shuffle so options aren't always index 0
function rotateOptions(
  options: string[],
  correctIndex: number,
  seed: number
): { options: string[]; correctIndex: number } {
  if (!options || options.length === 0) {
    return { options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'], correctIndex: 0 };
  }
  const shift = seed % options.length;
  const newOptions: string[] = [];
  let newCorrect = 0;
  for (let i = 0; i < options.length; i++) {
    const srcIdx = (i + shift) % options.length;
    newOptions.push(options[srcIdx]);
    if (srcIdx === correctIndex) {
      newCorrect = i;
    }
  }
  return { options: newOptions, correctIndex: newCorrect };
}

/**
 * Menghasilkan paket lengkap Mini Game Ekstra (Game 5 - 11) yang terhubung penuh
 * dengan database override Guru (customMiniGameQuestions per game maupun customBattleBotQuestions).
 */
export function getExtraMiniGamesForTopic(
  topic: Topic,
  effectivePack?: ReturnType<typeof getTopicGamePack>,
  topicOverride?: TopicContentOverride
): ExtraMiniGamesPack {
  const basePack = effectivePack || getTopicGamePack(topic.id, topic.title, topic.grade);
  const concepts = topic.materi.keyConcepts || [];
  const summaryList = topic.materi.summary || [];
  const mistakesList = topic.materi.commonMistakes || [];
  const dailyExamples = topic.materi.dailyLifeExamples || [];
  const schoolExamples = topic.materi.schoolExamples || [];

  const customMap = topicOverride?.customMiniGameQuestions || {};

  // 1. TARIK TAMBANG SIBER 3D (Cyber Tug-of-War)
  const customTugList = customMap['tug-of-war'];
  const tugOfWar: TugOfWarQuestion[] = [];

  if (Array.isArray(customTugList) && customTugList.length > 0) {
    customTugList.forEach((q, i) => {
      const rawOpts = q.options.map((o) => o.text);
      const safeCorrect = typeof q.correctIndex === 'number' ? q.correctIndex : 0;
      tugOfWar.push({
        id: i + 1,
        title: q.scenario || `Tarikan Energi #${i + 1} · ${topic.title}`,
        question: q.question,
        options: rawOpts,
        correctIndex: safeCorrect,
        pullPower: q.damage || 25,
        explanation: q.explanation || `Jawaban tepat memperkuat tarikan energi pada materi ${topic.title}.`
      });
    });
  } else {
    const battleAsQuiz = (basePack.battleBot || []).map((b) => ({
      question: b.question,
      options: b.options,
      correctAnswer: b.options[b.correctIndex]?.label || 'A',
      explanation: b.explanation
    }));
    const sourceQuiz = [...battleAsQuiz, ...(topic.kuis || []), ...(topic.asesmenAwal || [])];

    for (let i = 0; i < Math.min(10, sourceQuiz.length); i++) {
      const q = sourceQuiz[i];
      const rawOpts = q.options.map((o) => o.text);
      const rawCorrect = q.options.findIndex((o) => o.label === q.correctAnswer);
      const safeCorrect = rawCorrect >= 0 ? rawCorrect : 0;
      const rotated = rotateOptions(rawOpts, safeCorrect, i + topic.grade);

      tugOfWar.push({
        id: i + 1,
        title: `Tarikan Energi #${i + 1} · ${topic.title}`,
        question: q.question,
        options: rotated.options,
        correctIndex: rotated.correctIndex,
        pullPower: 25,
        explanation:
          'explanation' in q && q.explanation
            ? q.explanation
            : 'recommendation' in q && q.recommendation
            ? q.recommendation
            : `Jawaban tepat memperkuat tarikan energi pada materi ${topic.title}.`
      });
    }
  }

  // 2. JINAKKAN BOM WAKTU SIBER (Cyber Bomb Defusal - 4 Kabel Warna)
  const wirePalette: { color: 'Merah' | 'Biru' | 'Kuning' | 'Hijau'; hex: string }[] = [
    { color: 'Merah', hex: '#ef4444' },
    { color: 'Biru', hex: '#3b82f6' },
    { color: 'Kuning', hex: '#eab308' },
    { color: 'Hijau', hex: '#10b981' }
  ];

  const customBombList = customMap['bomb-defusal'];
  let bombDefusal: BombWireQuestion[] = [];

  if (Array.isArray(customBombList) && customBombList.length > 0) {
    bombDefusal = customBombList.map((q, idx) => {
      const rawOpts = q.options.map((o) => o.text);
      const safeCorrect = typeof q.correctIndex === 'number' ? q.correctIndex : 0;
      return {
        id: idx + 1,
        bombCode: `BOMB-${topic.id.toUpperCase()}-0${idx + 1}`,
        timerSeconds: 35,
        scenario:
          q.scenario ||
          `Inti Server SMPN 5 Kroya dipasang virus waktu pada modul ${topic.title}! Potong 1 kabel yang berisi pernyataan BENAR untuk menjinakkan bom!`,
        clue: q.question,
        wires: wirePalette.map((wp, wIdx) => ({
          color: wp.color,
          hex: wp.hex,
          label: rawOpts[wIdx] || `Kabel Cadangan ${wp.color}`
        })),
        correctWireIndex: safeCorrect,
        explanation: q.explanation || 'Kabel berhasil dijinakkan sesuai konsep materi.'
      };
    });
  } else if (
    Array.isArray(topicOverride?.customBattleBotQuestions) &&
    topicOverride!.customBattleBotQuestions!.length > 0 &&
    (!topicOverride?.customAsesmenAkhir || topicOverride.customAsesmenAkhir.length === 0)
  ) {
    bombDefusal = topicOverride!.customBattleBotQuestions!.map((q, idx) => {
      const rawOpts = q.options.map((o) => o.text);
      const rotated = rotateOptions(rawOpts, q.correctIndex, idx + 2);
      return {
        id: idx + 1,
        bombCode: `BOMB-${topic.id.toUpperCase()}-0${idx + 1}`,
        timerSeconds: 35,
        scenario:
          q.scenario ||
          `Inti Server SMPN 5 Kroya dipasang virus waktu pada modul ${topic.title}! Potong 1 kabel yang berisi pernyataan BENAR untuk menjinakkan bom!`,
        clue: q.question,
        wires: wirePalette.map((wp, wIdx) => ({
          color: wp.color,
          hex: wp.hex,
          label: rotated.options[wIdx] || `Kabel Cadangan ${wp.color}`
        })),
        correctWireIndex: rotated.correctIndex,
        explanation: q.explanation
      };
    });
  } else {
    const finalQuestions = topic.asesmenAkhir || [];
    bombDefusal = finalQuestions.slice(0, 8).map((fq, idx) => {
      const rawOpts = fq.options.map((o) => o.text);
      const rawCorrect = fq.options.findIndex((o) => o.label === fq.correctAnswer);
      const safeCorrect = rawCorrect >= 0 ? rawCorrect : 0;
      const rotated = rotateOptions(rawOpts, safeCorrect, idx + 2);

      return {
        id: idx + 1,
        bombCode: `BOMB-${topic.id.toUpperCase()}-0${idx + 1}`,
        timerSeconds: 35,
        scenario: `Inti Server SMPN 5 Kroya dipasang virus waktu pada modul ${topic.title}! Potong 1 kabel yang berisi pernyataan BENAR untuk menjinakkan bom!`,
        clue: fq.question,
        wires: wirePalette.map((wp, wIdx) => ({
          color: wp.color,
          hex: wp.hex,
          label: rotated.options[wIdx] || `Kabel Cadangan ${wp.color}`
        })),
        correctWireIndex: rotated.correctIndex,
        explanation: fq.explanation
      };
    });
  }

  // 3. PERTAHANAN MENARA FIREWALL 3D (Tower Defense: Serangan Malware)
  const enemyCatalog: {
    name: string;
    type: 'virus' | 'trojan' | 'phishing' | 'worm' | 'boss';
    hp: number;
  }[] = [
    { name: 'Drone Hoaks Pengintai', type: 'phishing', hp: 100 },
    { name: 'Worm Pengganda Data', type: 'worm', hp: 120 },
    { name: 'Trojan Penyamaran', type: 'trojan', hp: 140 },
    { name: 'Virus Perusak Logika', type: 'virus', hp: 160 },
    { name: `MEGA BOSS: Peretas ${topic.title}`, type: 'boss', hp: 250 }
  ];

  const customTdList = customMap['tower-defense'];
  let towerDefense: TowerDefenseWave[] = [];

  if (Array.isArray(customTdList) && customTdList.length > 0) {
    towerDefense = customTdList.map((src, idx) => {
      const enemy = enemyCatalog[idx % enemyCatalog.length];
      const rawOpts = src.options.map((o) => o.text);
      return {
        waveNumber: idx + 1,
        enemyName: enemy.name,
        enemyType: enemy.type,
        enemyHp: enemy.hp,
        scenario: src.scenario || `Gelombang Serangan #${idx + 1}: ${enemy.name}`,
        question: src.question,
        turretOptions: rawOpts,
        correctIndex: typeof src.correctIndex === 'number' ? src.correctIndex : 0,
        explanation: src.explanation || 'Tembakan Firewall tepat menghancurkan ancaman siber.'
      };
    });
  } else {
    const raceList = basePack.robotRace || [];
    const battleList = basePack.battleBot || [];
    const combinedTdSources =
      Array.isArray(topicOverride?.customBattleBotQuestions) && topicOverride!.customBattleBotQuestions!.length > 0
        ? topicOverride!.customBattleBotQuestions!
        : [...raceList, ...battleList];

    const tdCount = Math.max(enemyCatalog.length, combinedTdSources.length);
    towerDefense = Array.from({ length: tdCount }).map((_, idx) => {
      const enemy = enemyCatalog[idx % enemyCatalog.length];
      const src = combinedTdSources[idx % combinedTdSources.length];
      const rawOpts = src.options.map((o) => o.text);
      const rotated = rotateOptions(rawOpts, src.correctIndex, idx + 3);

      return {
        waveNumber: idx + 1,
        enemyName: enemy.name,
        enemyType: enemy.type,
        enemyHp: enemy.hp,
        scenario: src.scenario,
        question: src.question,
        turretOptions: rotated.options,
        correctIndex: rotated.correctIndex,
        explanation: src.explanation
      };
    });
  }

  // 4. KETUK CEPAT PAKET DATA VS VIRUS (Whack-a-Mole Cyber)
  const customMoleList = customMap['whack-a-mole'];
  const whackMoleItems: WhackMoleItem[] = [];

  if (Array.isArray(customMoleList) && customMoleList.length > 0) {
    customMoleList.forEach((q, qIdx) => {
      const safeCorr = typeof q.correctIndex === 'number' ? q.correctIndex : 0;
      q.options.forEach((opt, oIdx) => {
        if (!opt.text.trim()) return;
        const isSafe = oIdx === safeCorr;
        whackMoleItems.push({
          id: `custom-mole-${qIdx}-${oIdx}`,
          label: opt.text.slice(0, 65),
          isSafeValid: isSafe,
          tag: isSafe ? `${q.scenario || 'Data Valid'} (+20)` : 'Jebakan Siber (-15)'
        });
      });
    });
  } else {
    concepts.forEach((c, i) => {
      whackMoleItems.push({
        id: `valid-c-${i}`,
        label: c.title.replace(/^\d+\.\s*/, ''),
        isSafeValid: true,
        tag: 'Konsep Benar (+20)'
      });
      if (c.bulletPoints?.[0]) {
        whackMoleItems.push({
          id: `valid-bp-${i}`,
          label: c.bulletPoints[0].slice(0, 55),
          isSafeValid: true,
          tag: 'Praktik Tepat (+20)'
        });
      }
    });

    summaryList.forEach((s, i) => {
      whackMoleItems.push({
        id: `valid-sum-${i}`,
        label: s.slice(0, 55),
        isSafeValid: true,
        tag: 'Prinsip Utama (+20)'
      });
    });

    schoolExamples.forEach((ex, i) => {
      whackMoleItems.push({
        id: `valid-sch-${i}`,
        label: ex.slice(0, 55),
        isSafeValid: true,
        tag: 'Penerapan Positif (+20)'
      });
    });

    mistakesList.forEach((m, i) => {
      whackMoleItems.push({
        id: `trap-m-${i}`,
        label: m.slice(0, 55),
        isSafeValid: false,
        tag: 'Kesalahan Umum (-15)'
      });
    });

    const extraTraps = [
      `Sebar Hoaks tanpa Cek Fakta`,
      `Bagikan Password & Kode OTP`,
      `Plagiat Tanpa Sitasi Sumber`,
      `Klik Link Phishing Hadiah Palsu`,
      `Hapus File Tugas Teman Sekelompok`,
      `Matikan Firewall & Antivirus Lab`
    ];
    extraTraps.forEach((tr, i) => {
      whackMoleItems.push({
        id: `trap-ex-${i}`,
        label: tr,
        isSafeValid: false,
        tag: 'Jebakan Siber (-15)'
      });
    });
  }

  // 5. LABIRIN KODING ROBOT 3D (Robo-Maze Block Coding)
  const mazeTemplates: {
    startPos: [number, number];
    goalPos: [number, number];
    lasers: [number, number][];
    solutionSteps: ('MAJU' | 'KIRI' | 'KANAN' | 'LOMPAT')[];
  }[] = [
    {
      startPos: [4, 0],
      goalPos: [1, 3],
      lasers: [
        [3, 1],
        [2, 2],
        [4, 2]
      ],
      solutionSteps: ['MAJU', 'MAJU', 'MAJU', 'KANAN', 'MAJU', 'MAJU', 'MAJU']
    },
    {
      startPos: [4, 1],
      goalPos: [0, 3],
      lasers: [
        [2, 1],
        [3, 3],
        [1, 2]
      ],
      solutionSteps: ['MAJU', 'LOMPAT', 'MAJU', 'KANAN', 'MAJU', 'MAJU']
    },
    {
      startPos: [4, 4],
      goalPos: [1, 1],
      lasers: [
        [3, 3],
        [2, 2],
        [1, 3]
      ],
      solutionSteps: ['MAJU', 'MAJU', 'MAJU', 'KIRI', 'MAJU', 'MAJU', 'MAJU']
    },
    {
      startPos: [4, 2],
      goalPos: [0, 2],
      lasers: [
        [3, 2],
        [1, 2],
        [2, 1],
        [2, 3]
      ],
      solutionSteps: ['LOMPAT', 'LOMPAT']
    }
  ];

  const customMazeList = customMap['robo-maze'];
  let roboMaze: RoboMazeLevel[] = [];

  if (Array.isArray(customMazeList) && customMazeList.length > 0) {
    roboMaze = customMazeList.map((q, idx) => {
      const tpl = mazeTemplates[idx % mazeTemplates.length];
      const rawOpts = q.options.map((o) => o.text);
      return {
        level: idx + 1,
        title: q.scenario || `Misi Labirin #${idx + 1}: Kristal ${topic.title}`,
        missionDesc: `Susun blok algoritma agar Robot 3D mencapai Kristal Energi tanpa menabrak Laser, lalu buka kunci gerbang ${topic.title}!`,
        gridSize: 5,
        startPos: tpl.startPos,
        goalPos: tpl.goalPos,
        lasers: tpl.lasers,
        solutionSteps: tpl.solutionSteps,
        checkpointQuestion: q.question,
        checkpointOptions: rawOpts,
        checkpointCorrectIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || `Algoritma tepat membuka gerbang kristal ${topic.title}.`
      };
    });
  } else {
    roboMaze = mazeTemplates.map((tpl, idx) => {
      const qSource = topic.kuis[idx % topic.kuis.length] || topic.asesmenAwal[0];
      const rawOpts = qSource.options.map((o) => o.text);
      const rawCorrect = qSource.options.findIndex((o) => o.label === qSource.correctAnswer);
      const rotated = rotateOptions(rawOpts, rawCorrect >= 0 ? rawCorrect : 0, idx + 1);

      return {
        level: idx + 1,
        title: `Misi Labirin #${idx + 1}: Kristal ${topic.title}`,
        missionDesc: `Susun blok algoritma agar Robot 3D mencapai Kristal Energi tanpa menabrak Laser, lalu buka kunci gerbang ${topic.title}!`,
        gridSize: 5,
        startPos: tpl.startPos,
        goalPos: tpl.goalPos,
        lasers: tpl.lasers,
        solutionSteps: tpl.solutionSteps,
        checkpointQuestion: qSource.question,
        checkpointOptions: rotated.options,
        checkpointCorrectIndex: rotated.correctIndex,
        explanation:
          'explanation' in qSource && qSource.explanation
            ? qSource.explanation
            : `Algoritma tepat membuka gerbang kristal ${topic.title}.`
      };
    });
  }

  // 6. RODA KEBERUNTUNGAN & KOTAK MISTERI (Spin Wheel)
  const customSpinList = customMap['spin-wheel'];
  const spinWheel: TugOfWarQuestion[] =
    Array.isArray(customSpinList) && customSpinList.length > 0
      ? customSpinList.map((q, i) => ({
          id: i + 1,
          title: q.scenario || `Roda Misteri #${i + 1} · ${topic.title}`,
          question: q.question,
          options: q.options.map((o) => o.text),
          correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
          pullPower: q.damage || 25,
          explanation: q.explanation || `Jawaban tepat membuka hadiah Roda Misteri ${topic.title}.`
        }))
      : tugOfWar;

  // 7. DETEKTIF SIBER: TANGKAP PELAKU (Cyber CSI Investigation)
  const customDetList = customMap['cyber-detective'];
  const battleList = basePack.battleBot || [];
  let detectiveCases: DetectiveCase[] = [];

  if (Array.isArray(customDetList) && customDetList.length > 0) {
    detectiveCases = customDetList.map((bb, idx) => {
      const conceptHint =
        concepts[idx % Math.max(1, concepts.length)]?.explanation ||
        topic.materi.infoPenting ||
        topic.shortDesc;
      const exampleHint =
        dailyExamples[idx % Math.max(1, dailyExamples.length)] ||
        schoolExamples[0] ||
        topic.materi.tahukahKamu;

      const rawOpts = bb.options.map((o) => o.text);
      return {
        id: idx + 1,
        caseNumber: `CSI-${topic.grade}0${idx + 1}-${topic.id.toUpperCase()}`,
        caseTitle: bb.scenario || `Kasus Investigasi #${idx + 1}: Insiden ${topic.title}`,
        incidentReport: `${bb.scenario || 'Laporan Insiden Siber:'} Tim Detektif Siber SMPN 5 Kroya diminta menyelidiki bukti digital dan menentukan kesimpulan tindakan yang paling tepat!`,
        clues: [
          `Bukti Lapangan #1 (Konteks): ${exampleHint}`,
          `Bukti Forensik #2 (Prinsip Materi): ${conceptHint}`,
          `Bukti Kunci #3 (Analisis Pertanyaan): ${bb.question} — Petunjuk Rahasia: ${(bb.explanation || '').slice(0, 95)}...`
        ],
        suspectOptions: rawOpts,
        correctSuspectIndex: typeof bb.correctIndex === 'number' ? bb.correctIndex : 0,
        explanation: bb.explanation || 'Analisis forensik tepat sesuai konsep materi.'
      };
    });
  } else {
    detectiveCases = battleList.slice(0, 8).map((bb, idx) => {
      const conceptHint =
        concepts[idx % Math.max(1, concepts.length)]?.explanation ||
        topic.materi.infoPenting ||
        topic.shortDesc;
      const exampleHint =
        dailyExamples[idx % Math.max(1, dailyExamples.length)] ||
        schoolExamples[0] ||
        topic.materi.tahukahKamu;

      const rawOpts = bb.options.map((o) => o.text);
      const rotated = rotateOptions(rawOpts, bb.correctIndex, idx + 4);

      return {
        id: idx + 1,
        caseNumber: `CSI-${topic.grade}0${idx + 1}-${topic.id.toUpperCase()}`,
        caseTitle: `Kasus Investigasi #${idx + 1}: Insiden ${topic.title}`,
        incidentReport: `${bb.scenario} Tim Detektif Siber SMPN 5 Kroya diminta menyelidiki bukti digital dan menentukan kesimpulan tindakan yang paling tepat!`,
        clues: [
          `Bukti Lapangan #1 (Konteks): ${exampleHint}`,
          `Bukti Forensik #2 (Prinsip Materi): ${conceptHint}`,
          `Bukti Kunci #3 (Analisis Pertanyaan): ${bb.question} — Petunjuk Rahasia: ${bb.explanation.slice(0, 95)}...`
        ],
        suspectOptions: rotated.options,
        correctSuspectIndex: rotated.correctIndex,
        explanation: bb.explanation
      };
    });
  }

  return {
    tugOfWar,
    bombDefusal,
    towerDefense,
    whackMoleItems,
    roboMaze,
    spinWheel,
    detectiveCases
  };
}

/**
 * Menghasilkan daftar soal standar (format BattleBotQuestion[]) untuk masing-masing dari 12 Mini Game
 * agar Guru dapat melihat, mengedit, mendownload Template Excel, dan mengupload Bank Soal spesifik per Mini Game.
 */
export function getDefaultQuestionsForMiniGame(
  topic: Topic,
  gameId: SpecificMiniGameId,
  effPack: TopicGamePack,
  ov?: TopicContentOverride
): BattleBotQuestion[] {
  const customSpecific = ov?.customMiniGameQuestions?.[gameId];
  if (Array.isArray(customSpecific) && customSpecific.length > 0) {
    return customSpecific;
  }

  const extra = getExtraMiniGamesForTopic(topic, effPack, ov);

  switch (gameId) {
    case 'battle-bot':
      return effPack.battleBot || [];
    case 'balap-robot':
      return (effPack.robotRace || []).map((r, i) => ({
        id: i + 1,
        scenario: r.scenario || r.sectorName || `Sektor Balap #${i + 1}`,
        question: r.question,
        options: r.options,
        correctIndex: r.correctIndex,
        damage: r.boostPower || 25,
        explanation: r.explanation || ''
      }));
    case 'tug-of-war':
      return extra.tugOfWar.map((t, i) => ({
        id: i + 1,
        scenario: t.title,
        question: t.question,
        options: [
          { label: 'A', text: t.options[0] || 'Opsi A' },
          { label: 'B', text: t.options[1] || 'Opsi B' },
          { label: 'C', text: t.options[2] || 'Opsi C' },
          { label: 'D', text: t.options[3] || 'Opsi D' }
        ],
        correctIndex: t.correctIndex,
        damage: t.pullPower || 25,
        explanation: t.explanation
      }));
    case 'bomb-defusal':
      return extra.bombDefusal.map((b, i) => ({
        id: i + 1,
        scenario: b.scenario,
        question: b.clue,
        options: [
          { label: 'A', text: b.wires[0]?.label || 'Kabel Merah' },
          { label: 'B', text: b.wires[1]?.label || 'Kabel Biru' },
          { label: 'C', text: b.wires[2]?.label || 'Kabel Kuning' },
          { label: 'D', text: b.wires[3]?.label || 'Kabel Hijau' }
        ],
        correctIndex: b.correctWireIndex,
        damage: 30,
        explanation: b.explanation
      }));
    case 'tower-defense':
      return extra.towerDefense.map((w, i) => ({
        id: i + 1,
        scenario: `${w.enemyName} — ${w.scenario}`,
        question: w.question,
        options: [
          { label: 'A', text: w.turretOptions[0] || 'Opsi A' },
          { label: 'B', text: w.turretOptions[1] || 'Opsi B' },
          { label: 'C', text: w.turretOptions[2] || 'Opsi C' },
          { label: 'D', text: w.turretOptions[3] || 'Opsi D' }
        ],
        correctIndex: w.correctIndex,
        damage: 30,
        explanation: w.explanation
      }));
    case 'whack-a-mole': {
      const validList = extra.whackMoleItems.filter((m) => m.isSafeValid);
      const trapList = extra.whackMoleItems.filter((m) => !m.isSafeValid);
      const count = Math.max(5, Math.min(10, validList.length));
      return Array.from({ length: count }).map((_, i) => {
        const validItem = validList[i % Math.max(1, validList.length)]?.label || 'Praktik Informatika Tepat';
        const trap1 = trapList[(i * 3) % Math.max(1, trapList.length)]?.label || 'Sebar Hoaks Tanpa Cek Fakta';
        const trap2 = trapList[(i * 3 + 1) % Math.max(1, trapList.length)]?.label || 'Bagikan Password & OTP';
        const trap3 = trapList[(i * 3 + 2) % Math.max(1, trapList.length)]?.label || 'Klik Link Phishing Palsu';
        return {
          id: i + 1,
          scenario: `Portal Data Siber #${i + 1} (Opsi Benar = Data Valid +20, Opsi Lain = Virus/Jebakan -15)`,
          question: `Manakah paket data yang AMAN & VALID untuk diketuk pada materi ${topic.title}?`,
          options: [
            { label: 'A', text: validItem },
            { label: 'B', text: trap1 },
            { label: 'C', text: trap2 },
            { label: 'D', text: trap3 }
          ],
          correctIndex: 0,
          damage: 20,
          explanation: `Data "${validItem}" adalah prinsip benar (+20 poin), sedangkan lainnya adalah jebakan siber (-15 poin).`
        };
      });
    }
    case 'robo-maze':
      return extra.roboMaze.map((m, i) => ({
        id: i + 1,
        scenario: m.title,
        question: m.checkpointQuestion,
        options: [
          { label: 'A', text: m.checkpointOptions[0] || 'Opsi A' },
          { label: 'B', text: m.checkpointOptions[1] || 'Opsi B' },
          { label: 'C', text: m.checkpointOptions[2] || 'Opsi C' },
          { label: 'D', text: m.checkpointOptions[3] || 'Opsi D' }
        ],
        correctIndex: m.checkpointCorrectIndex,
        damage: 25,
        explanation: m.explanation
      }));
    case 'spin-wheel':
      return extra.spinWheel.map((s, i) => ({
        id: i + 1,
        scenario: s.title,
        question: s.question,
        options: [
          { label: 'A', text: s.options[0] || 'Opsi A' },
          { label: 'B', text: s.options[1] || 'Opsi B' },
          { label: 'C', text: s.options[2] || 'Opsi C' },
          { label: 'D', text: s.options[3] || 'Opsi D' }
        ],
        correctIndex: s.correctIndex,
        damage: s.pullPower || 25,
        explanation: s.explanation
      }));
    case 'cyber-detective':
      return extra.detectiveCases.map((c, i) => ({
        id: i + 1,
        scenario: c.caseTitle,
        question: `${c.incidentReport} (${c.clues[2] || ''})`,
        options: [
          { label: 'A', text: c.suspectOptions[0] || 'Opsi A' },
          { label: 'B', text: c.suspectOptions[1] || 'Opsi B' },
          { label: 'C', text: c.suspectOptions[2] || 'Opsi C' },
          { label: 'D', text: c.suspectOptions[3] || 'Opsi D' }
        ],
        correctIndex: c.correctSuspectIndex,
        damage: 30,
        explanation: c.explanation
      }));
    case 'sketsa-cepat':
      return (effPack.wordScramble || []).map((w, i) => ({
        id: i + 1,
        scenario: `Tantangan Sketsa #${i + 1}: ${w.word}`,
        question: w.clue,
        options: [
          { label: 'A', text: `Gambar bentuk utama ${w.word}` },
          { label: 'B', text: `Tambahkan bagian detail pendukung` },
          { label: 'C', text: `Beri garis penghubung atau simbol penjelas` },
          { label: 'D', text: w.word }
        ],
        correctIndex: 0,
        damage: 30,
        explanation: w.dailyContext || `Sketsa visual mempresentasikan konsep ${w.word}.`
      }));
    default:
      return effPack.battleBot || [];
  }
}

