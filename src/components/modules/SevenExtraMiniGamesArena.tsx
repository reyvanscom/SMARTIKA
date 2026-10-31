import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Topic } from '../../types/curriculum';
import { useTheme } from '../../context/ThemeContext';
import { useCurriculumOverrides } from '../../context/CurriculumOverridesContext';
import { getTopicGamePack } from '../../data/interactiveGamesData';
import { getExtraMiniGamesForTopic, WhackMoleItem } from '../../data/sevenNewMiniGamesData';
import {
  Zap,
  Shield,
  Bomb,
  Scissors,
  Timer,
  Crosshair,
  Gift,
  Search,
  RotateCcw,
  ArrowRight,
  Play,
  Eye,
  Trophy,
  Shuffle,
  Cpu,
  Clock,
  CheckCircle2,
  XCircle,
  Flame,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { soundManager } from '../../utils/soundSystem';
import { SketsaCepatGame } from './SketsaCepatGame';

export type ExtraGameType =
  | 'tug-of-war'
  | 'bomb-defusal'
  | 'tower-defense'
  | 'whack-a-mole'
  | 'robo-maze'
  | 'spin-wheel'
  | 'cyber-detective'
  | 'sketsa-cepat';

interface SevenExtraMiniGamesArenaProps {
  topic: Topic;
  gameType: ExtraGameType;
  mode: 'individu' | 'duel' | 'kelompok';
  playStyle?: 'gantian' | 'bersama';
  roundCount?: number;
  onChangeRoundCount?: (rounds: number) => void;
  blueLabel: string;
  redLabel: string;
  blueHp: number;
  redHp: number;
  blueScore: number;
  redScore: number;
  activeTurn: 'blue' | 'red';
  attackTrigger: { id: number; attacker: 'blue' | 'red'; damage: number } | null;
  onTriggerCombat: (
    isCorrect: boolean,
    customPoints?: number,
    customDamage?: number,
    teamOverride?: 'blue' | 'red'
  ) => void;
  onResetCombat: () => void;
  shuffleTick?: number;
  onShuffleQuestions?: () => void;
}

const WHEEL_SEGMENTS = [
  { label: '+200 Poin Super', points: 200, damage: 30, effect: 'bonus', color: 'bg-amber-500' },
  { label: 'Serangan Kritis 40 DMG', points: 120, damage: 40, effect: 'crit', color: 'bg-rose-600' },
  { label: 'Curi 150 Poin Lawan', points: 150, damage: 25, effect: 'steal', color: 'bg-purple-600' },
  { label: 'Perisai Energi +150 Poin', points: 150, damage: 25, effect: 'shield', color: 'bg-emerald-600' },
  { label: 'Poin Ganda 2x (+250)', points: 250, damage: 35, effect: 'double', color: 'bg-sky-600' },
  { label: 'Kotak Misteri Kejutan', points: 180, damage: 30, effect: 'mystery', color: 'bg-indigo-600' }
];

export const SevenExtraMiniGamesArena: React.FC<SevenExtraMiniGamesArenaProps> = ({
  topic,
  gameType,
  mode,
  roundCount: propRoundCount,
  onChangeRoundCount,
  blueLabel,
  redLabel,
  blueHp,
  redHp,
  blueScore,
  redScore,
  onTriggerCombat,
  onResetCombat,
  shuffleTick = 0,
  onShuffleQuestions
}) => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();
  const { getEffectiveGamePack, overrides } = useCurriculumOverrides();
  const topicOverride = overrides[topic.id];
  const effectiveGamePack = useMemo(() => {
    const raw = getTopicGamePack(topic.id, topic.title, topic.grade);
    return getEffectiveGamePack(topic.id, raw);
  }, [topic.id, topic.title, topic.grade, getEffectiveGamePack]);
  const [localResetTick, setLocalResetTick] = useState(0);
  const [internalRounds, setInternalRounds] = useState<number>(propRoundCount || 5);
  const totalRounds = propRoundCount || internalRounds;

  useEffect(() => {
    if (propRoundCount) {
      setInternalRounds(propRoundCount);
    }
  }, [propRoundCount]);

  const handleSelectRounds = (r: number) => {
    playClick();
    setInternalRounds(r);
    if (onChangeRoundCount) {
      onChangeRoundCount(r);
    } else {
      setLocalResetTick((t) => t + 1);
      onResetCombat();
    }
  };

  // Di semua game selain tinju & balap, jika mode Duel atau Kelompok -> Otomatis Layar Terpisah (Split-Screen)!
  const isSplitMultiplayer = mode === 'duel' || mode === 'kelompok';

  // Helper Fisher-Yates shuffle
  const shuffleArr = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Buat deck berbeda untuk Pemain 2 agar tidak pernah sama urutan soalnya dengan Pemain 1
  const makeDistinctRedOrder = <T,>(blueArr: T[]): T[] => {
    if (blueArr.length <= 1) return [...blueArr];
    const offset = Math.max(1, Math.floor(blueArr.length / 2));
    const rotated = blueArr.map((_, idx) => blueArr[(idx + offset) % blueArr.length]);
    return rotated;
  };

  const shuffleStringOptions = (opts: string[], corrIdx: number) => {
    const correctText = opts[corrIdx] ?? opts[0] ?? '';
    const shuffled = shuffleArr(opts);
    return {
      options: shuffled,
      correctIndex: Math.max(0, shuffled.indexOf(correctText))
    };
  };

  // Expand array to at least `minLen` items
  const expandToRounds = <T,>(arr: T[], minLen: number): T[] => {
    if (arr.length === 0) return [];
    const result: T[] = [];
    while (result.length < minLen) {
      result.push(...arr);
    }
    return result.slice(0, minLen);
  };

  // Signature isi bank soal 7 Extra Mini Games agar deck HANYA diacak ulang jika soal di database benar-benar berubah
  const extraPackSignature = useMemo(() => {
    const base = getExtraMiniGamesForTopic(topic, effectiveGamePack, topicOverride);
    const tugSig = (base.tugOfWar || [])
      .map((q) => `${q.question}:${q.correctIndex}:${(q.options || []).join('|')}`)
      .join(';');
    const bombSig = (base.bombDefusal || [])
      .map((b) => `${b.clueQuestion}:${b.correctWireIndex}:${(b.wires || []).map((w) => w.label).join('|')}`)
      .join(';');
    const tdSig = (base.towerDefense || [])
      .map((w) => `${w.question}:${w.correctIndex}:${(w.turretOptions || []).join('|')}`)
      .join(';');
    const moleSig = (base.whackMoleItems || [])
      .map((m) => `${m.label}:${m.isSafeValid}`)
      .join(';');
    const mazeSig = (base.roboMaze || [])
      .map((m) => `${m.checkpointQuestion}:${m.checkpointCorrectIndex}:${(m.checkpointOptions || []).join('|')}`)
      .join(';');
    const wheelSig = (base.spinWheel || [])
      .map((q) => `${q.question}:${q.correctIndex}:${(q.options || []).join('|')}`)
      .join(';');
    const csiSig = (base.detectiveCases || [])
      .map((c) => `${c.crimeScene}:${c.correctSuspectIndex}:${(c.suspectOptions || []).join('|')}`)
      .join(';');
    return `${topic.id}__${tugSig}__${bombSig}__${tdSig}__${moleSig}__${mazeSig}__${wheelSig}__${csiSig}`;
  }, [topic, effectiveGamePack, topicOverride]);

  // Memoize & dynamically shuffle separate Blue & Red question decks ONLY when extraPackSignature or reset/shuffle ticks change
  const pack = useMemo(() => {
    const base = getExtraMiniGamesForTopic(topic, effectiveGamePack, topicOverride);
    const targetLen = Math.max(totalRounds, 7);
    const tugTargetLen = Math.max(totalRounds, 12);

    // 1. Tug of War (Blue vs Red distinct decks, expanded so match doesn't end too fast)
    const rawBlueTug = expandToRounds(shuffleArr(base.tugOfWar), tugTargetLen);
    const rawRedTug = expandToRounds(makeDistinctRedOrder(rawBlueTug), tugTargetLen);

    const blueTug = rawBlueTug.map((q, idx) => {
      const { options, correctIndex } = shuffleStringOptions(q.options, q.correctIndex);
      return { ...q, id: idx + 1, options, correctIndex };
    });
    const redTug = rawRedTug.map((q, idx) => {
      const { options, correctIndex } = shuffleStringOptions(q.options, q.correctIndex);
      return { ...q, id: idx + 1, options, correctIndex };
    });

    // 2. Bomb Defusal (Blue vs Red distinct decks)
    const rawBlueBombs = expandToRounds(shuffleArr(base.bombDefusal), targetLen);
    const rawRedBombs = expandToRounds(makeDistinctRedOrder(rawBlueBombs), targetLen);

    const mapBombDeck = (bombs: typeof base.bombDefusal) =>
      bombs.map((b, idx) => {
        const correctLabel = b.wires[b.correctWireIndex]?.label ?? b.wires[0]?.label ?? '';
        const shuffledLabels = shuffleArr(b.wires.map((w) => w.label));
        const newWires = b.wires.map((w, wIdx) => ({
          ...w,
          label: shuffledLabels[wIdx] ?? w.label
        }));
        const newCorrectWireIndex = Math.max(
          0,
          newWires.findIndex((w) => w.label === correctLabel)
        );
        return {
          ...b,
          id: idx + 1,
          wires: newWires,
          correctWireIndex: newCorrectWireIndex
        };
      });

    const blueBombs = mapBombDeck(rawBlueBombs);
    const redBombs = mapBombDeck(rawRedBombs);

    // 3. Tower Defense (Blue vs Red distinct decks)
    const rawBlueWaves = expandToRounds(shuffleArr(base.towerDefense), targetLen);
    const rawRedWaves = expandToRounds(makeDistinctRedOrder(rawBlueWaves), targetLen);

    const blueWaves = rawBlueWaves.map((w, idx) => {
      const { options, correctIndex } = shuffleStringOptions(w.turretOptions, w.correctIndex);
      return { ...w, waveNumber: idx + 1, turretOptions: options, correctIndex };
    });
    const redWaves = rawRedWaves.map((w, idx) => {
      const { options, correctIndex } = shuffleStringOptions(w.turretOptions, w.correctIndex);
      return { ...w, waveNumber: idx + 1, turretOptions: options, correctIndex };
    });

    // 4. Robo Maze (Blue vs Red distinct mazes & checkpoint questions)
    const rawBlueMazes = expandToRounds(shuffleArr(base.roboMaze), targetLen);
    const rawRedMazes = expandToRounds(makeDistinctRedOrder(rawBlueMazes), targetLen);

    const blueMazes = rawBlueMazes.map((m, idx) => {
      const { options, correctIndex } = shuffleStringOptions(
        m.checkpointOptions,
        m.checkpointCorrectIndex
      );
      return {
        ...m,
        level: idx + 1,
        checkpointOptions: options,
        checkpointCorrectIndex: correctIndex
      };
    });
    const redMazes = rawRedMazes.map((m, idx) => {
      const { options, correctIndex } = shuffleStringOptions(
        m.checkpointOptions,
        m.checkpointCorrectIndex
      );
      return {
        ...m,
        level: idx + 1,
        checkpointOptions: options,
        checkpointCorrectIndex: correctIndex
      };
    });

    // 5. Spin Wheel (Blue vs Red distinct wheel decks)
    const rawBlueWheel = expandToRounds(shuffleArr(base.spinWheel || base.tugOfWar), targetLen);
    const rawRedWheel = expandToRounds(makeDistinctRedOrder(rawBlueWheel), targetLen);

    const blueWheel = rawBlueWheel.map((q, idx) => {
      const { options, correctIndex } = shuffleStringOptions(q.options, q.correctIndex);
      return { ...q, id: idx + 1, options, correctIndex };
    });
    const redWheel = rawRedWheel.map((q, idx) => {
      const { options, correctIndex } = shuffleStringOptions(q.options, q.correctIndex);
      return { ...q, id: idx + 1, options, correctIndex };
    });

    // 6. Cyber Detective (Blue vs Red distinct cases)
    const rawBlueCases = expandToRounds(shuffleArr(base.detectiveCases), targetLen);
    const rawRedCases = expandToRounds(makeDistinctRedOrder(rawBlueCases), targetLen);

    const blueCases = rawBlueCases.map((c, idx) => {
      const { options, correctIndex } = shuffleStringOptions(
        c.suspectOptions,
        c.correctSuspectIndex
      );
      return {
        ...c,
        id: idx + 1,
        caseNumber: idx + 1,
        suspectOptions: options,
        correctSuspectIndex: correctIndex
      };
    });
    const redCases = rawRedCases.map((c, idx) => {
      const { options, correctIndex } = shuffleStringOptions(
        c.suspectOptions,
        c.correctSuspectIndex
      );
      return {
        ...c,
        id: idx + 1,
        caseNumber: idx + 1,
        suspectOptions: options,
        correctSuspectIndex: correctIndex
      };
    });

    return {
      blueTug,
      redTug,
      blueBombs,
      redBombs,
      blueWaves,
      redWaves,
      whackMoleItems: shuffleArr(base.whackMoleItems),
      blueMazes,
      redMazes,
      blueWheel,
      redWheel,
      blueCases,
      redCases
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id, extraPackSignature, shuffleTick, localResetTick, totalRounds]);

  // Speed-based scoring tracker per team
  const blueQStartRef = useRef<number>(Date.now());
  const redQStartRef = useRef<number>(Date.now());
  const [speedTick, setSpeedTick] = useState(0);
  const [blueLastSpeedBonus, setBlueLastSpeedBonus] = useState<number | null>(null);
  const [redLastSpeedBonus, setRedLastSpeedBonus] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpeedTick((t) => t + 1);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  // Calculate live speed bonus (up to +100 bonus points for fast answers!)
  const getLiveSpeedBonus = (team: 'blue' | 'red', maxBonus = 100) => {
    void speedTick;
    const start = team === 'blue' ? blueQStartRef.current : redQStartRef.current;
    const elapsedSec = Math.max(0, (Date.now() - start) / 1000);
    // Lose ~6 bonus points per second, minimum +15 speed bonus
    return Math.max(15, Math.round(maxBonus - Math.min(15, elapsedSec) * (maxBonus / 17)));
  };

  const handleTriggerShuffle = () => {
    playClick();
    if (onShuffleQuestions) {
      onShuffleQuestions();
    } else {
      setLocalResetTick((t) => t + 1);
      onResetCombat();
    }
  };

  const handleTriggerReset = () => {
    playClick();
    setLocalResetTick((t) => t + 1);
    onResetCombat();
  };

  const renderRoundModeSelector = () => (
    <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-xl">
      <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">
        Ronde:
      </span>
      {[3, 5, 7, 10].map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => handleSelectRounds(r)}
          className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
            totalRounds === r
              ? 'bg-amber-500 text-slate-950 shadow-2xs scale-105'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
          title={`Atur Mode ${r} Ronde`}
        >
          {r}
        </button>
      ))}
    </div>
  );

  const renderGameControlButtons = () => (
    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
      {renderRoundModeSelector()}
      <button
        type="button"
        onClick={handleTriggerShuffle}
        className="px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
        title="Acak urutan soal dan pilihan jawaban"
      >
        <Shuffle className="w-3 h-3" />
        <span>Acak Soal</span>
      </button>
      <button
        type="button"
        onClick={handleTriggerReset}
        className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 text-[11px] font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
        title="Reset permainan ke awal"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Reset</span>
      </button>
    </div>
  );

  // ==========================================================================
  // STATE PER GAME (INDEPENDENT BLUE & RED PROGRESS FOR SPLIT-SCREEN FOCUS)
  // ==========================================================================

  // 1. TARIK TAMBANG SIBER (tug-of-war)
  const [blueTugIdx, setBlueTugIdx] = useState(0);
  const [redTugIdx, setRedTugIdx] = useState(0);
  const [ropePos, setRopePos] = useState(0);
  const [blueCombo, setBlueCombo] = useState(0);
  const [redCombo, setRedCombo] = useState(0);
  const [blueTugSel, setBlueTugSel] = useState<number | null>(null);
  const [redTugSel, setRedTugSel] = useState<number | null>(null);
  const [tugPullImpulse, setTugPullImpulse] = useState<'none' | 'blue' | 'red'>('none');
  const [tugCrossedLoser, setTugCrossedLoser] = useState<'none' | 'blue' | 'red'>('none');
  const [tugHeaveTick, setTugHeaveTick] = useState(0);

  // 2. JINAKKAN BOM WAKTU SIBER (bomb-defusal)
  const [blueBombIdx, setBlueBombIdx] = useState(0);
  const [redBombIdx, setRedBombIdx] = useState(0);
  const [blueBombTimer, setBlueBombTimer] = useState(35);
  const [redBombTimer, setRedBombTimer] = useState(35);
  const [blueCutWire, setBlueCutWire] = useState<number | null>(null);
  const [redCutWire, setRedCutWire] = useState<number | null>(null);
  const [blueHoverWire, setBlueHoverWire] = useState<number | null>(null);
  const [redHoverWire, setRedHoverWire] = useState<number | null>(null);
  const [blueBombStatus, setBlueBombStatus] = useState<'active' | 'defused' | 'exploded'>('active');
  const [redBombStatus, setRedBombStatus] = useState<'active' | 'defused' | 'exploded'>('active');
  const [bombMs, setBombMs] = useState<number>(99);

  // 3. PERTAHANAN MENARA FIREWALL: TEMBAKAN SIBER VS ROBOT JAHAT (tower-defense PvZ style)
  const [blueWaveIdx, setBlueWaveIdx] = useState(0);
  const [redWaveIdx, setRedWaveIdx] = useState(0);
  const [blueEnemyDist, setBlueEnemyDist] = useState(85);
  const [redEnemyDist, setRedEnemyDist] = useState(85);
  const [blueTdSel, setBlueTdSel] = useState<number | null>(null);
  const [redTdSel, setRedTdSel] = useState<number | null>(null);
  const [blueLaserActive, setBlueLaserActive] = useState(false);
  const [redLaserActive, setRedLaserActive] = useState(false);
  const [blueTdShotState, setBlueTdShotState] = useState<'idle' | 'shooting' | 'hit-wrong'>('idle');
  const [redTdShotState, setRedTdShotState] = useState<'idle' | 'shooting' | 'hit-wrong'>('idle');
  const [tdWalkTick, setTdWalkTick] = useState(0);

  // 4. KETUK VIRUS (whack-a-mole)
  const [moleRunning, setMoleRunning] = useState(true);
  const [moleTimeLeft, setMoleTimeLeft] = useState(45);
  const [activePortals, setActivePortals] = useState<Record<number, WhackMoleItem>>({});
  const [redActivePortals, setRedActivePortals] = useState<Record<number, WhackMoleItem>>({});
  const [portalSpawnTime, setPortalSpawnTime] = useState<number>(Date.now());
  const [moleHits, setMoleHits] = useState(0);
  const [moleMistakes, setMoleMistakes] = useState(0);
  const [redMoleHits, setRedMoleHits] = useState(0);
  const [redMoleMistakes, setRedMoleMistakes] = useState(0);
  const [moleFeedback, setMoleFeedback] = useState<{ text: string; good: boolean } | null>(null);

  // 5. LABIRIN KODING ALGORITMA (robo-maze) - ANTI DOUBLE-CLICK + MODE RONDE
  const [blueMazeIdx, setBlueMazeIdx] = useState(0);
  const [redMazeIdx, setRedMazeIdx] = useState(0);
  const activeBlueMaze = pack.blueMazes[blueMazeIdx % pack.blueMazes.length] || pack.blueMazes[0];
  const activeRedMaze = pack.redMazes[redMazeIdx % pack.redMazes.length] || pack.redMazes[0];
  const [robotPos, setRobotPos] = useState<[number, number]>(activeBlueMaze.startPos);
  const [redRobotPos, setRedRobotPos] = useState<[number, number]>(activeRedMaze.startPos);
  const [robotCommands, setRobotCommands] = useState<('MAJU' | 'KIRI' | 'KANAN' | 'LOMPAT')[]>([]);
  const [redRobotCommands, setRedRobotCommands] = useState<('MAJU' | 'KIRI' | 'KANAN' | 'LOMPAT')[]>([]);
  const [mazeStatus, setMazeStatus] = useState<'planning' | 'checkpoint' | 'success' | 'crashed'>('planning');
  const [redMazeStatus, setRedMazeStatus] = useState<'planning' | 'checkpoint' | 'success' | 'crashed'>('planning');
  const lastBlueMazeClickRef = useRef<number>(0);
  const lastRedMazeClickRef = useRef<number>(0);

  // 6. RODA KEBERUNTUNGAN & KOTAK MISTERI (spin-wheel)
  const [blueWheelIdx, setBlueWheelIdx] = useState(0);
  const [redWheelIdx, setRedWheelIdx] = useState(0);
  const [blueSpinning, setBlueSpinning] = useState(false);
  const [redSpinning, setRedSpinning] = useState(false);
  const [blueWheelRot, setBlueWheelRot] = useState(0);
  const [redWheelRot, setRedWheelRot] = useState(0);
  const [blueSegment, setBlueSegment] = useState<typeof WHEEL_SEGMENTS[0]>(WHEEL_SEGMENTS[0]);
  const [redSegment, setRedSegment] = useState<typeof WHEEL_SEGMENTS[0]>(WHEEL_SEGMENTS[1]);
  const [blueWheelAns, setBlueWheelAns] = useState<number | null>(null);
  const [redWheelAns, setRedWheelAns] = useState<number | null>(null);

  // 7. DETEKTIF SIBER CSI (cyber-detective)
  const [blueCaseIdx, setBlueCaseIdx] = useState(0);
  const [redCaseIdx, setRedCaseIdx] = useState(0);
  const [blueClues, setBlueClues] = useState<number>(1);
  const [redClues, setRedClues] = useState<number>(1);
  const [blueDetAns, setBlueDetAns] = useState<number | null>(null);
  const [redDetAns, setRedDetAns] = useState<number | null>(null);

  // Helper to generate active portals for Ketuk Virus
  const generateMolePortals = useCallback(() => {
    const items = pack.whackMoleItems;
    if (!items || items.length === 0) return { blue: {}, red: {} };

    const viruses = items.filter((it) => !it.isSafeValid);
    const safeFiles = items.filter((it) => it.isSafeValid);

    const pickItem = () => {
      const spawnVirus = Math.random() < 0.72 && viruses.length > 0;
      const pool = spawnVirus ? viruses : safeFiles.length > 0 ? safeFiles : items;
      return pool[Math.floor(Math.random() * pool.length)];
    };

    const nextBlue: Record<number, WhackMoleItem> = {};
    const nextRed: Record<number, WhackMoleItem> = {};

    const blueHoles = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5).slice(0, 5);
    const redHoles = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5).slice(0, 5);

    blueHoles.forEach((h) => {
      nextBlue[h] = pickItem();
    });
    redHoles.forEach((h) => {
      nextRed[h] = pickItem();
    });

    if (viruses.length > 0) {
      nextBlue[blueHoles[0]] = viruses[Math.floor(Math.random() * viruses.length)];
      nextBlue[blueHoles[1]] = viruses[Math.floor(Math.random() * viruses.length)];
      nextRed[redHoles[0]] = viruses[Math.floor(Math.random() * viruses.length)];
      nextRed[redHoles[1]] = viruses[Math.floor(Math.random() * viruses.length)];
    }

    return { blue: nextBlue, red: nextRed };
  }, [pack]);

  // Reset all game states when topic, gameType, mode, or reset ticks change
  useEffect(() => {
    blueQStartRef.current = Date.now();
    redQStartRef.current = Date.now();
    setBlueLastSpeedBonus(null);
    setRedLastSpeedBonus(null);

    setBlueTugIdx(0);
    setRedTugIdx(0);
    setRopePos(0);
    setBlueCombo(0);
    setRedCombo(0);
    setBlueTugSel(null);
    setRedTugSel(null);

    setBlueBombIdx(0);
    setRedBombIdx(0);
    setBlueBombTimer(35);
    setRedBombTimer(35);
    setBlueCutWire(null);
    setRedCutWire(null);
    setBlueHoverWire(null);
    setRedHoverWire(null);
    setBlueBombStatus('active');
    setRedBombStatus('active');
    setTugPullImpulse('none');
    setTugCrossedLoser('none');

    setBlueWaveIdx(0);
    setRedWaveIdx(0);
    setBlueEnemyDist(85);
    setRedEnemyDist(85);
    setBlueTdSel(null);
    setRedTdSel(null);
    setBlueLaserActive(false);
    setRedLaserActive(false);
    setBlueTdShotState('idle');
    setRedTdShotState('idle');

    setMoleRunning(true);
    setMoleTimeLeft(45);
    const initial = generateMolePortals();
    setActivePortals(initial.blue);
    setRedActivePortals(initial.red);
    setPortalSpawnTime(Date.now());
    setMoleHits(0);
    setMoleMistakes(0);
    setRedMoleHits(0);
    setRedMoleMistakes(0);
    setMoleFeedback(null);

    setBlueMazeIdx(0);
    setRedMazeIdx(0);
    setRobotPos(pack.blueMazes[0].startPos);
    setRedRobotPos(pack.redMazes[0].startPos);
    setRobotCommands([]);
    setRedRobotCommands([]);
    setMazeStatus('planning');
    setRedMazeStatus('planning');

    setBlueWheelIdx(0);
    setRedWheelIdx(0);
    setBlueSegment(WHEEL_SEGMENTS[0]);
    setRedSegment(WHEEL_SEGMENTS[1]);
    setBlueWheelAns(null);
    setRedWheelAns(null);

    setBlueCaseIdx(0);
    setRedCaseIdx(0);
    setBlueClues(1);
    setRedClues(1);
    setBlueDetAns(null);
    setRedDetAns(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id, gameType, mode, extraPackSignature, shuffleTick, localResetTick, totalRounds]);

  // Bomb countdown effect (independent timers for Blue & Red + fast ms counter)
  useEffect(() => {
    if (gameType !== 'bomb-defusal') return;
    if (blueHp <= 0 || redHp <= 0) return;

    const msInterval = setInterval(() => {
      if (blueBombStatus === 'active' || (isSplitMultiplayer && redBombStatus === 'active')) {
        setBombMs((prev) => (prev <= 7 ? 99 : prev - 7));
      }
    }, 75);

    const timer = setInterval(() => {
      if (blueBombStatus === 'active' && blueBombIdx < totalRounds) {
        setBlueBombTimer((prev) => Math.max(0, prev - 1));
      }
      if (isSplitMultiplayer && redBombStatus === 'active' && redBombIdx < totalRounds) {
        setRedBombTimer((prev) => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => {
      clearInterval(msInterval);
      clearInterval(timer);
    };
  }, [gameType, blueBombStatus, redBombStatus, blueBombIdx, redBombIdx, totalRounds, isSplitMultiplayer, blueHp, redHp]);

  // Handle bomb explosions when timer reaches 0
  useEffect(() => {
    if (gameType !== 'bomb-defusal') return;
    if (blueBombStatus === 'active' && blueBombTimer === 0) {
      setBlueBombStatus('exploded');
      playError();
      soundManager.playRobotKO();
      onTriggerCombat(false, 0, 25, 'blue');
    }
  }, [gameType, blueBombStatus, blueBombTimer, playError, onTriggerCombat]);

  useEffect(() => {
    if (gameType !== 'bomb-defusal') return;
    if (isSplitMultiplayer && redBombStatus === 'active' && redBombTimer === 0) {
      setRedBombStatus('exploded');
      playError();
      soundManager.playRobotKO();
      onTriggerCombat(false, 0, 25, 'red');
    }
  }, [gameType, isSplitMultiplayer, redBombStatus, redBombTimer, playError, onTriggerCombat]);

  // Plants vs Zombies style Evil Robot walking and marching animation for Tower Defense (Menara Firewall)
  useEffect(() => {
    if (gameType !== 'tower-defense') return;
    if (blueHp <= 0 || redHp <= 0) return;

    const walkAnim = setInterval(() => {
      setTdWalkTick((t) => (t + 1) % 1000);
    }, 320);

    const marchTimer = setInterval(() => {
      setBlueEnemyDist((prev) => {
        if (prev <= 26) {
          return 78;
        }
        return prev - 2;
      });

      if (isSplitMultiplayer) {
        setRedEnemyDist((prev) => {
          if (prev <= 26) {
            return 78;
          }
          return prev - 2;
        });
      }
    }, 1200);

    return () => {
      clearInterval(walkAnim);
      clearInterval(marchTimer);
    };
  }, [gameType, isSplitMultiplayer, blueHp, redHp]);

  // Animasi gerakan robot menarik tambang (Heave-Ho / Tarik-Ulur seperti orang tarik tambang)
  useEffect(() => {
    if (gameType !== 'tug-of-war') return;
    if (blueHp <= 0 || redHp <= 0 || tugCrossedLoser !== 'none') return;

    const heaveTimer = setInterval(() => {
      setTugHeaveTick((t) => (t + 1) % 10000);
    }, 100);

    return () => clearInterval(heaveTimer);
  }, [gameType, blueHp, redHp, tugCrossedLoser]);

  // Otomatis lanjut ke soal tarik tambang berikutnya setelah semua peserta di layar menjawab
  const tugEffectiveRounds = Math.max(totalRounds, 8);
  const tugStateRef = useRef({
    ropePos,
    blueScore,
    redScore,
    playFanfare,
    onTriggerCombat
  });
  tugStateRef.current = {
    ropePos,
    blueScore,
    redScore,
    playFanfare,
    onTriggerCombat
  };

  useEffect(() => {
    if (gameType !== 'tug-of-war') return;
    if (blueHp <= 0 || redHp <= 0 || tugCrossedLoser !== 'none') return;

    const blueDoneOrAnswered = blueTugIdx >= tugEffectiveRounds || blueTugSel !== null;
    const redDoneOrAnswered = !isSplitMultiplayer || redTugIdx >= tugEffectiveRounds || redTugSel !== null;
    const anyJustAnswered = blueTugSel !== null || (isSplitMultiplayer && redTugSel !== null);

    if (!blueDoneOrAnswered || !redDoneOrAnswered || !anyJustAnswered) return;

    const timer = window.setTimeout(() => {
      const nextBlueIdx = blueTugSel !== null ? blueTugIdx + 1 : blueTugIdx;
      const nextRedIdx = isSplitMultiplayer && redTugSel !== null ? redTugIdx + 1 : redTugIdx;

      if (blueTugSel !== null) {
        setBlueTugSel(null);
        setBlueLastSpeedBonus(null);
        blueQStartRef.current = Date.now();
        setBlueTugIdx(nextBlueIdx);
      }
      if (isSplitMultiplayer && redTugSel !== null) {
        setRedTugSel(null);
        setRedLastSpeedBonus(null);
        redQStartRef.current = Date.now();
        setRedTugIdx(nextRedIdx);
      }

      // Jika seluruh ronde selesai dan belum ada yang melewati garis tengah, tentukan pemenang dari posisi tambang / skor
      const allFinished = isSplitMultiplayer
        ? nextBlueIdx >= tugEffectiveRounds && nextRedIdx >= tugEffectiveRounds
        : nextBlueIdx >= tugEffectiveRounds;

      if (allFinished) {
        const {
          ropePos: curRope,
          blueScore: curBlue,
          redScore: curRed,
          playFanfare: fanfare,
          onTriggerCombat: triggerCombat
        } = tugStateRef.current;
        fanfare();
        if (curRope < 0 || (curRope === 0 && curBlue >= curRed)) {
          triggerCombat(true, 100, 100, 'blue');
        } else {
          if (isSplitMultiplayer) {
            triggerCombat(true, 100, 100, 'red');
          } else {
            triggerCombat(false, 0, 100, 'blue');
          }
        }
      }
    }, 1650);

    return () => window.clearTimeout(timer);
  }, [
    gameType,
    blueHp,
    redHp,
    tugCrossedLoser,
    blueTugSel,
    redTugSel,
    blueTugIdx,
    redTugIdx,
    tugEffectiveRounds,
    isSplitMultiplayer
  ]);

  // Ketuk Virus spawner & timer effect
  useEffect(() => {
    if (gameType !== 'whack-a-mole' || !moleRunning) return;
    if (blueHp <= 0 || redHp <= 0) return;

    const clock = setInterval(() => {
      setMoleTimeLeft((prev) => {
        if (prev <= 1) {
          setMoleRunning(false);
          playFanfare();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawner = setInterval(() => {
      const spawned = generateMolePortals();
      setActivePortals(spawned.blue);
      setRedActivePortals(spawned.red);
      setPortalSpawnTime(Date.now());
    }, 1450);

    return () => {
      clearInterval(clock);
      clearInterval(spawner);
    };
  }, [gameType, moleRunning, blueHp, redHp, generateMolePortals, playFanfare]);

  const isArenaFinished = blueHp <= 0 || redHp <= 0;

  // ============================================================================
  // HELPER: RENDER ROUND COMPLETED CARD FOR A PLAYER IN SPLIT-SCREEN
  // ============================================================================
  const renderPlayerFinishedCard = (team: 'blue' | 'red') => {
    const isBlue = team === 'blue';
    return (
      <div
        className={`flex-1 p-5 rounded-3xl border-2 flex flex-col items-center justify-center text-center gap-3 ${
          isBlue
            ? 'bg-sky-950/30 border-sky-500/60 text-sky-100'
            : 'bg-rose-950/30 border-rose-500/60 text-rose-100'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300">
          <Trophy className="w-6 h-6" />
        </div>
        <h4 className="text-base font-black">
          🎉 {isBlue ? blueLabel : redLabel} Selesai {totalRounds} Ronde!
        </h4>
        <p className="text-xs opacity-85">
          Total Skor Saat Ini: <strong className="text-amber-300">{isBlue ? blueScore : redScore} Poin</strong>
        </p>
        <button
          type="button"
          onClick={handleTriggerShuffle}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Mainkan Seri Baru</span>
        </button>
      </div>
    );
  };

  // ============================================================================
  // RENDER 5: TARIK TAMBANG ENERGI SIBER (LEWATI BATAS GARIS TENGAH = KALAH!)
  // ============================================================================
  if (gameType === 'tug-of-war') {
    // Ambang batas dibuat 100 (bukan 48) dan tarikan per soal lebih terukur agar lomba tarik tambang seru & TIDAK terlalu cepat selesai!
    const CENTER_LINE_KO_LIMIT = 100;
    const tugMaxRounds = Math.max(totalRounds, 8);
    const ropePercent = Math.max(2, Math.min(98, 50 + (ropePos / CENTER_LINE_KO_LIMIT) * 45));
    // Pergeseran grup SVG: saat |ropePos| = 100 -> ropeOffsetPx = ±135px (Robot depan terseret melewati Garis Tengah di x=480)
    const ropeOffsetPx = (ropePos / CENTER_LINE_KO_LIMIT) * 135;

    const blueDistToCenterPct = Math.max(
      0,
      Math.min(100, Math.round(((CENTER_LINE_KO_LIMIT - ropePos) / CENTER_LINE_KO_LIMIT) * 100))
    );
    const redDistToCenterPct = Math.max(
      0,
      Math.min(100, Math.round(((CENTER_LINE_KO_LIMIT + ropePos) / CENTER_LINE_KO_LIMIT) * 100))
    );

    // Kinematika Gerakan Robot Menarik Tambang ("Heave-Ho" seperti orang tarik tambang)
    const blueSpeedMult = tugPullImpulse === 'blue' ? 0.95 : 0.42;
    const redSpeedMult = tugPullImpulse === 'red' ? 0.95 : 0.42;
    const blueWave = Math.sin(tugHeaveTick * blueSpeedMult);
    const blueWaveSupport = Math.sin(tugHeaveTick * blueSpeedMult - 0.55);
    const redWave = Math.sin(tugHeaveTick * redSpeedMult + 1.1);
    const redWaveSupport = Math.sin(tugHeaveTick * redSpeedMult + 0.55);

    // Fase tarikan (positif saat badan condong ke belakang menarik tambang dengan kuat)
    const bluePullStroke = Math.max(-0.35, blueWave);
    const blueSupportStroke = Math.max(-0.35, blueWaveSupport);
    const redPullStroke = Math.max(-0.35, redWave);
    const redSupportStroke = Math.max(-0.35, redWaveSupport);

    const blueBaseLean =
      tugCrossedLoser === 'blue'
        ? 58
        : tugPullImpulse === 'blue'
        ? -30
        : ropePos < -20
        ? -23
        : ropePos > 25
        ? -11
        : -19;
    const redBaseLean =
      tugCrossedLoser === 'red'
        ? -58
        : tugPullImpulse === 'red'
        ? 30
        : ropePos > 20
        ? 23
        : ropePos < -25
        ? 11
        : 19;

    // Sudut ayunan badan condong ke belakang-depan seperti orang menghentak tali tambang
    const blueLeaningDeg =
      tugCrossedLoser === 'blue'
        ? 58
        : blueBaseLean - bluePullStroke * (tugPullImpulse === 'blue' ? 14 : 9);
    const blueSupportLeaningDeg =
      tugCrossedLoser === 'blue'
        ? 52
        : blueBaseLean - 3 - blueSupportStroke * (tugPullImpulse === 'blue' ? 14 : 9);

    const redLeaningDeg =
      tugCrossedLoser === 'red'
        ? -58
        : redBaseLean + redPullStroke * (tugPullImpulse === 'red' ? 14 : 9);
    const redSupportLeaningDeg =
      tugCrossedLoser === 'red'
        ? -52
        : redBaseLean + 3 + redSupportStroke * (tugPullImpulse === 'red' ? 14 : 9);

    // Gerakan lutut menekuk (squat) & hentakan badan ke belakang saat menarik tambang
    const blueHeaveX = tugCrossedLoser === 'blue' ? 18 : -bluePullStroke * (tugPullImpulse === 'blue' ? 13 : 7.5);
    const blueSquatY = tugCrossedLoser === 'blue' ? 6 : Math.abs(bluePullStroke) * (tugPullImpulse === 'blue' ? 7 : 4.5);
    const blueSupHeaveX = tugCrossedLoser === 'blue' ? 15 : -blueSupportStroke * (tugPullImpulse === 'blue' ? 12 : 7);
    const blueSupSquatY = tugCrossedLoser === 'blue' ? 5 : Math.abs(blueSupportStroke) * 4;

    const redHeaveX = tugCrossedLoser === 'red' ? -18 : redPullStroke * (tugPullImpulse === 'red' ? 13 : 7.5);
    const redSquatY = tugCrossedLoser === 'red' ? 6 : Math.abs(redPullStroke) * (tugPullImpulse === 'red' ? 7 : 4.5);
    const redSupHeaveX = tugCrossedLoser === 'red' ? -15 : redSupportStroke * (tugPullImpulse === 'red' ? 12 : 7);
    const redSupSquatY = tugCrossedLoser === 'red' ? 5 : Math.abs(redSupportStroke) * 4;

    // Gerakan lengan & siku menarik tambang ke arah dada/pinggang (hand-over-hand heave)
    const blueArmPull = bluePullStroke * (tugPullImpulse === 'blue' ? 15 : 9.5);
    const blueSupArmPull = blueSupportStroke * (tugPullImpulse === 'blue' ? 13 : 8);
    const redArmPull = redPullStroke * (tugPullImpulse === 'red' ? 15 : 9.5);
    const redSupArmPull = redSupportStroke * (tugPullImpulse === 'red' ? 13 : 8);

    // Getaran tali tambang saat ditarik kedua kubu
    const ropeVibrationY = Math.sin(tugHeaveTick * 1.15) * (tugPullImpulse !== 'none' ? 3.2 : 1.5);
    const ropeHeaveShiftX = (redHeaveX + blueHeaveX) * 0.45;

    const handleAnswerTug = (team: 'blue' | 'red', idx: number) => {
      if (isArenaFinished || tugCrossedLoser !== 'none') return;
      const isBlue = team === 'blue';
      if (isBlue && blueTugSel !== null) return;
      if (!isBlue && redTugSel !== null) return;

      const q = isBlue
        ? pack.blueTug[blueTugIdx % pack.blueTug.length]
        : pack.redTug[redTugIdx % pack.redTug.length];

      if (isBlue) setBlueTugSel(idx);
      else setRedTugSel(idx);

      const isCorrect = idx === q.correctIndex;
      const speedBonus = isCorrect ? getLiveSpeedBonus(team, 100) : 0;

      if (isBlue) setBlueLastSpeedBonus(speedBonus);
      else setRedLastSpeedBonus(speedBonus);

      let nextRopePos = ropePos;
      // Damage HP per tarikan dibuat kecil (5-6 HP) agar pertandingan TIDAK selesai terlalu cepat sebelum tambang benar-benar tertarik melewati garis tengah
      const chipDamage = Math.max(4, Math.round(45 / tugMaxRounds));

      if (isCorrect) {
        // Kekuatan tarik per soal ~14-18 poin dari batas 100 (butuh ~6-7 tarikan bersih untuk menyeret lawan melewati garis tengah!)
        const pullPower = 13 + Math.round(speedBonus / 22);
        const totalPoints = 100 + speedBonus;
        setTugPullImpulse(team);
        setTimeout(() => setTugPullImpulse('none'), 1000);

        if (isBlue) {
          setBlueCombo((c) => c + 1);
          nextRopePos = Math.max(-115, ropePos - pullPower);
        } else {
          setRedCombo((c) => c + 1);
          nextRopePos = Math.min(115, ropePos + pullPower);
        }
        setRopePos(nextRopePos);

        // CEK APAKAH MUSUH / LAWAN MELEWATI BATAS GARIS TENGAH:
        if (nextRopePos <= -CENTER_LINE_KO_LIMIT) {
          setTugCrossedLoser('red');
          playFanfare();
          soundManager.playRobotKO();
          setTimeout(() => {
            onTriggerCombat(true, totalPoints + 250, 100, 'blue');
          }, 950);
          return;
        }
        if (nextRopePos >= CENTER_LINE_KO_LIMIT) {
          setTugCrossedLoser('blue');
          playFanfare();
          soundManager.playRobotKO();
          setTimeout(() => {
            onTriggerCombat(true, totalPoints + 250, 100, 'red');
          }, 950);
          return;
        }

        onTriggerCombat(true, totalPoints, chipDamage, team);
      } else {
        setTugPullImpulse(isBlue ? 'red' : 'blue');
        setTimeout(() => setTugPullImpulse('none'), 1000);

        if (isBlue) {
          setBlueCombo(0);
          nextRopePos = Math.min(115, ropePos + 12);
        } else {
          setRedCombo(0);
          nextRopePos = Math.max(-115, ropePos - 12);
        }
        setRopePos(nextRopePos);

        // CEK APAKAH AKIBAT SALAH JAWAB ROBOT TERSERET MELEWATI BATAS GARIS TENGAH:
        if (nextRopePos >= CENTER_LINE_KO_LIMIT) {
          setTugCrossedLoser('blue');
          soundManager.playRobotKO();
          setTimeout(() => {
            if (isSplitMultiplayer) {
              onTriggerCombat(true, 150, 100, 'red');
            } else {
              onTriggerCombat(false, 0, 100, 'blue');
            }
          }, 950);
          return;
        }
        if (nextRopePos <= -CENTER_LINE_KO_LIMIT) {
          setTugCrossedLoser('red');
          soundManager.playRobotKO();
          setTimeout(() => {
            onTriggerCombat(true, 150, 100, 'blue');
          }, 950);
          return;
        }

        onTriggerCombat(false, 0, chipDamage, team);
      }
    };

    const handleNextTug = (team: 'blue' | 'red') => {
      playClick();
      if (team === 'blue') {
        setBlueTugSel(null);
        setBlueLastSpeedBonus(null);
        blueQStartRef.current = Date.now();
        setBlueTugIdx((i) => i + 1);
      } else {
        setRedTugSel(null);
        setRedLastSpeedBonus(null);
        redQStartRef.current = Date.now();
        setRedTugIdx((i) => i + 1);
      }
    };

    const renderTugPlayerPanel = (team: 'blue' | 'red') => {
      const isBlue = team === 'blue';
      const qIdx = isBlue ? blueTugIdx : redTugIdx;
      if (qIdx >= tugMaxRounds) return renderPlayerFinishedCard(team);

      const q = isBlue
        ? pack.blueTug[qIdx % pack.blueTug.length]
        : pack.redTug[qIdx % pack.redTug.length];
      const picked = isBlue ? blueTugSel : redTugSel;
      const speedBonus = isBlue ? blueLastSpeedBonus : redLastSpeedBonus;
      const liveBonus = getLiveSpeedBonus(team, 100);
      const waitingOpponent =
        isSplitMultiplayer &&
        picked !== null &&
        (isBlue ? redTugSel === null && redTugIdx < tugMaxRounds : blueTugSel === null && blueTugIdx < tugMaxRounds);

      return (
        <div
          className={`flex-1 min-h-0 p-3.5 sm:p-4 rounded-3xl border-2 flex flex-col justify-between gap-2.5 shadow-lg ${
            isBlue
              ? 'bg-sky-950/15 dark:bg-slate-900 border-sky-500/60'
              : 'bg-rose-950/15 dark:bg-slate-900 border-rose-500/60'
          }`}
        >
          {/* Header Pemain & Indikator Kecepatan */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <span
                className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider text-white ${
                  isBlue ? 'bg-sky-600' : 'bg-rose-600'
                }`}
              >
                {isBlue ? `🔵 ${blueLabel}` : `🔴 ${redLabel}`} · Ronde {qIdx + 1}/{tugMaxRounds}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-600 dark:text-amber-300 text-[11px] font-black flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {picked === null
                    ? `⚡ Bonus Cepat: +${liveBonus} Pts`
                    : speedBonus && speedBonus > 0
                    ? `⚡ Dapat +${100 + speedBonus} Pts!`
                    : '0 Pts'}
                </span>
              </span>
            </div>

            {/* Kotak Soal Terpisah Milik Pemain Ini */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-white">
              <span
                className={`text-[10px] font-black uppercase tracking-wider block mb-0.5 ${
                  isBlue ? 'text-sky-400' : 'text-rose-400'
                }`}
              >
                SOAL TARIK TAMBANG {isBlue ? blueLabel : redLabel}:
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold leading-snug">{q.question}</h3>
            </div>
          </div>

          {/* Pilihan Jawaban */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-auto">
            {q.options.map((opt, idx) => {
              const isSelected = picked === idx;
              const isCorrect = idx === q.correctIndex;
              let cls = isBlue
                ? 'border-sky-300 dark:border-sky-800 bg-white dark:bg-slate-800 hover:border-sky-500 text-slate-800 dark:text-slate-100'
                : 'border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-800 hover:border-rose-500 text-slate-800 dark:text-slate-100';
              if (picked !== null) {
                if (isCorrect) {
                  cls =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected) {
                  cls =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200';
                } else {
                  cls = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              }
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={picked !== null}
                  onClick={() => handleAnswerTug(team, idx)}
                  className={`p-2.5 sm:p-3 rounded-xl border-2 text-left text-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer ${cls}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-white font-black text-xs flex items-center justify-center shrink-0 ${
                      isBlue ? 'bg-sky-600' : 'bg-rose-600'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug font-semibold line-clamp-2">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Status Jawaban & Lanjut Otomatis */}
          {picked !== null ? (
            <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-2">
                {picked === q.correctIndex
                  ? `✅ HUP! TARIKAN KUAT! (+${100 + (speedBonus || 0)} Pts) ${
                      waitingOpponent ? '⏳ Menunggu lawan menjawab...' : '⏭️ Otomatis lanjut soal berikutnya...'
                    }`
                  : `❌ Terpeleset! Robotmu tertarik mendekati garis tengah! ${
                      waitingOpponent ? '⏳ Menunggu lawan menjawab...' : '⏭️ Otomatis lanjut soal berikutnya...'
                    }`}
              </span>
              {!waitingOpponent && (
                <button
                  type="button"
                  onClick={() => handleNextTug(team)}
                  className={`px-3.5 py-1.5 rounded-xl text-white text-xs font-black shrink-0 flex items-center gap-1 cursor-pointer ${
                    isBlue ? 'bg-sky-600 hover:bg-sky-500' : 'bg-rose-600 hover:bg-rose-500'
                  }`}
                >
                  <span>Lanjut</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="text-[11px] text-center font-bold text-amber-600 dark:text-amber-400">
              💪 Jawab benar beruntun untuk menghentak & menyeret robot lawan melewati BATAS GARIS TENGAH!
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="h-full min-h-0 flex flex-col justify-between gap-2.5 overflow-y-auto">
        {/* Visual Panggung Robot 2D Full-Body Tarik Tambang Energi Siber */}
        <div className="p-2.5 sm:p-3 rounded-3xl bg-slate-950 border-2 border-sky-500/40 text-white shadow-xl flex flex-col gap-2 shrink-0 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-black uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Tarik Tambang Robot Siber · Efek Tarik-Ulur Aktif!</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-amber-500/30 text-[11px] font-bold text-amber-300">
                Combo Tarikan: 🔵 {blueCombo}x vs 🔴 {redCombo}x
              </span>
              <span className="text-[11px] font-extrabold text-rose-300 hidden sm:inline">
                {tugCrossedLoser === 'red'
                  ? `🚨 MUSUH (${redLabel}) MELEWATI BATAS GARIS TENGAH — MUSUH KALAH!`
                  : tugCrossedLoser === 'blue'
                  ? `🚨 ${blueLabel} MELEWATI BATAS GARIS TENGAH — ${blueLabel} KALAH!`
                  : `⚠️ Jarak Musuh ke Garis Tengah: ${redDistToCenterPct}%`}
              </span>
            </div>
            {renderGameControlButtons()}
          </div>

          {/* PANGGUNG ANIMASI ROBOT 2D FULL BODY MENARIK TAMBANG */}
          <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 overflow-hidden select-none">
            {/* HUD Skor & Jarak Garis Tengah Kiri & Kanan */}
            <div className="absolute top-2 left-2.5 z-10 px-2.5 py-1 rounded-xl bg-sky-950/90 border border-sky-400/60 shadow-md flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
              <div>
                <div className="text-[10px] font-black text-sky-200 uppercase leading-none">{blueLabel}</div>
                <div className="text-xs font-mono font-black text-sky-400">
                  {blueScore} Pts · Jarak Aman {blueDistToCenterPct}%
                </div>
              </div>
            </div>

            <div className="absolute top-2 right-2.5 z-10 px-2.5 py-1 rounded-xl bg-rose-950/90 border border-rose-400/60 shadow-md flex items-center gap-2 text-right">
              <div>
                <div className="text-[10px] font-black text-rose-200 uppercase leading-none">{redLabel}</div>
                <div className="text-xs font-mono font-black text-rose-400">
                  {redScore} Pts · Jarak Garis {redDistToCenterPct}%
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
            </div>

            {/* Banner Pengumuman KO Garis Tengah Langsung di Panggung */}
            {tugCrossedLoser !== 'none' && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in zoom-in-95">
                <div
                  className={`p-4 rounded-2xl border-2 text-center shadow-2xl max-w-sm w-full ${
                    tugCrossedLoser === 'red'
                      ? 'bg-sky-950/95 border-sky-400 text-sky-100'
                      : 'bg-rose-950/95 border-rose-400 text-rose-100'
                  }`}
                >
                  <span className="text-3xl">🚨💥</span>
                  <h3 className="text-base sm:text-lg font-black tracking-wide mt-1">
                    {tugCrossedLoser === 'red'
                      ? `MUSUH (${redLabel}) TERSERET MELEWATI GARIS TENGAH!`
                      : `${blueLabel} TERSERET MELEWATI GARIS TENGAH!`}
                  </h3>
                  <p className="text-xs font-bold text-amber-300 mt-1">
                    {tugCrossedLoser === 'red'
                      ? `🏆 ${blueLabel} MENANG MUTLAK (KO GARIS TENGAH)!`
                      : `💀 ${redLabel} MENANG (KO GARIS TENGAH)!`}
                  </p>
                </div>
              </div>
            )}

            {/* SVG Arena Robot 2D Full Body dengan Efek Gerakan Orang Menarik Tambang */}
            <svg
              viewBox="0 0 960 215"
              className="w-full h-36 sm:h-44 md:h-48 block"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="cyberSkyGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#082f49" stopOpacity="0.55" />
                  <stop offset="50%" stopColor="#0f172a" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#4c0519" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="blueMechaArmor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="55%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
                <linearGradient id="redMechaArmor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="55%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#9f1239" />
                </linearGradient>
                <linearGradient id="ropeEnergyGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="48%" stopColor="#fbbf24" />
                  <stop offset="52%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
                <linearGradient id="lavaPitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Latar Belakang Stadion Siber */}
              <rect x="0" y="0" width="960" height="215" fill="url(#cyberSkyGrad)" />

              {/* Sorot Lampu Stadion Kiri & Kanan */}
              <polygon points="0,0 260,185 110,185" fill="#38bdf8" opacity="0.08" />
              <polygon points="960,0 700,185 850,185" fill="#f43f5e" opacity="0.08" />

              {/* Lantai Baja Kiri & Kanan */}
              <rect x="0" y="182" width="445" height="33" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
              <rect x="515" y="182" width="445" height="33" fill="#0f172a" stroke="#e11d48" strokeWidth="2" />

              {/* Pijakan Besi Anti-Selip (Cleats) untuk Kaki Robot */}
              {[90, 155, 220, 285, 350, 410].map((cx) => (
                <polygon key={`bc-${cx}`} points={`${cx},182 ${cx + 12},174 ${cx + 16},182`} fill="#38bdf8" opacity="0.75" />
              ))}
              {[550, 610, 675, 740, 805, 870].map((cx) => (
                <polygon key={`rc-${cx}`} points={`${cx},182 ${cx - 12},174 ${cx - 16},182`} fill="#fb7185" opacity="0.75" />
              ))}

              {/* Jurang Plasma & BATAS GARIS TENGAH (x = 480) */}
              <rect x="445" y="180" width="70" height="35" fill="url(#lavaPitGrad)" />
              <path
                d="M446,184 Q462,172 480,184 T514,182"
                fill="none"
                stroke="#fde047"
                strokeWidth="3"
              />

              {/* Sinar Laser Vertikal BATAS GARIS TENGAH Penentu Kalah/Menang */}
              <line
                x1="480"
                y1="22"
                x2="480"
                y2="185"
                stroke="#ef4444"
                strokeWidth="5"
                opacity="0.35"
              />
              <line
                x1="480"
                y1="22"
                x2="480"
                y2="185"
                stroke="#fde047"
                strokeWidth="2.5"
                strokeDasharray="7 5"
              />
              <rect x="375" y="6" width="210" height="18" rx="6" fill="#dc2626" stroke="#fde047" strokeWidth="1.5" />
              <text x="480" y="18" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="900" letterSpacing="0.6">
                ⚠️ BATAS GARIS TENGAH (LEWATI = KALAH!) ⚠️
              </text>
              <text x="480" y="204" textAnchor="middle" fill="#fef08a" fontSize="8.5" fontWeight="900">
                GARIS TENGAH
              </text>

              {/* =============================================================== */}
              {/* GRUP BERGERAK: TALI TAMBANG + SKUAD ROBOT 2D FULL BODY KIRI/KANAN */}
              {/* =============================================================== */}
              <g
                style={{
                  transform: `translateX(${ropeOffsetPx + ropeHeaveShiftX}px)`,
                  transition: 'transform 160ms ease-out'
                }}
              >
                {/* Indikator Seruan "HUP! TARIK!" yang Muncul Berirama saat Menghentak Tambang */}
                {bluePullStroke > 0.35 && (
                  <g transform={`translate(${275 + blueHeaveX}, ${34 - bluePullStroke * 6})`}>
                    <rect x="-46" y="-11" width="92" height="16" rx="8" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.2" />
                    <text x="0" y="0" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="900">
                      {tugPullImpulse === 'blue' ? '🔥 TARIK KUAT! HUP!' : '💪 HUP! TARIK!'}
                    </text>
                  </g>
                )}
                {redPullStroke > 0.35 && (
                  <g transform={`translate(${685 + redHeaveX}, ${34 - redPullStroke * 6})`}>
                    <rect x="-46" y="-11" width="92" height="16" rx="8" fill="#e11d48" stroke="#fecdd3" strokeWidth="1.2" />
                    <text x="0" y="0" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="900">
                      {tugPullImpulse === 'red' ? '🔥 TARIK KUAT! HUP!' : '💪 HUP! TARIK!'}
                    </text>
                  </g>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 1. ROBOT SUPPORT BIRU (BELAKANG KIRI - EFEK TARIK TAMBANG)    */}
                {/* ------------------------------------------------------------- */}
                <g transform={`translate(${205 + blueSupHeaveX}, ${180 + blueSupSquatY})`}>
                  {/* Percikan Debu & Hentakan Kaki di Lantai saat Menarik */}
                  {blueSupportStroke > 0.1 && (
                    <g transform={`translate(0, ${-blueSupSquatY})`}>
                      <circle cx={38 + blueSupportStroke * 8} cy="-3" r={2.5 + blueSupportStroke * 2} fill="#38bdf8" opacity="0.85" />
                      <circle cx={-18 - blueSupportStroke * 6} cy="-2" r="2.5" fill="#fde047" opacity="0.85" />
                    </g>
                  )}

                  {/* Kaki Menekuk & Menahan Beban (Tetap Menapak Lantai saat Squat) */}
                  <line x1="-8" y1="-34" x2={-24 - blueSupportStroke * 6} y2={-16 - blueSupSquatY * 0.5} stroke="#64748b" strokeWidth="9" strokeLinecap="round" />
                  <line x1={-24 - blueSupportStroke * 6} y1={-16 - blueSupSquatY * 0.5} x2={-14 - blueSupHeaveX * 0.4} y2={-blueSupSquatY} stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
                  <rect x={-24 - blueSupHeaveX * 0.4} y={-5 - blueSupSquatY} width="22" height="8" rx="3" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />

                  <line x1="6" y1="-34" x2={24 - blueSupportStroke * 4} y2={-15 - blueSupSquatY * 0.5} stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" />
                  <line x1={24 - blueSupportStroke * 4} y1={-15 - blueSupSquatY * 0.5} x2={38 - blueSupHeaveX * 0.45} y2={-blueSupSquatY} stroke="#0369a1" strokeWidth="10" strokeLinecap="round" />
                  <rect x={28 - blueSupHeaveX * 0.45} y={-6 - blueSupSquatY} width="24" height="9" rx="3" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />

                  {/* Badan Atas Condong ke Belakang & Menghentak Tali (Torso Heave) */}
                  <g transform={`rotate(${blueSupportLeaningDeg})`}>
                    <polygon
                      points={`-28,-62 ${-64 - blueSupportStroke * 22},-52 -52,-68 ${-72 - blueSupportStroke * 24},-75 -28,-78`}
                      fill="#38bdf8"
                      opacity={blueSupportStroke > 0.2 ? '0.95' : '0.7'}
                    />
                    <polygon points="-28,-65 -48,-58 -45,-72" fill="#e0f2fe" />
                    <rect x="-15" y="-42" width="30" height="12" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                    <rect x="-18" y="-82" width="36" height="42" rx="7" fill="url(#blueMechaArmor)" stroke="#bae6fd" strokeWidth="2" />
                    <circle cx="2" cy="-62" r="7" fill="#0f172a" stroke="#7dd3fc" strokeWidth="2" />
                    <circle cx="2" cy="-62" r="4" fill="#38bdf8" />
                    <rect x="-13" y="-108" width="26" height="22" rx="6" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                    <line x1="0" y1="-108" x2="-6" y2="-119" stroke="#38bdf8" strokeWidth="2.5" />
                    <circle cx="-6" cy="-120" r="3.5" fill="#fde047" />
                    <rect x="-8" y="-102" width="18" height="9" rx="3" fill="#0f172a" />
                    <line x1="-4" y1="-98" x2="2" y2="-96" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="4" y1="-96" x2="8" y2="-98" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Lengan Menarik Tambang Maju-Mundur (Hand-over-hand Pull) */}
                    <line x1="8" y1="-74" x2={24 - blueSupArmPull * 0.85} y2={-61 + blueSupportStroke * 4} stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                    <line x1={24 - blueSupArmPull * 0.85} y1={-61 + blueSupportStroke * 4} x2={48 - blueSupArmPull} y2="-63" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
                    <circle cx={50 - blueSupArmPull} cy="-63" r="6" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
                  </g>
                </g>

                {/* ------------------------------------------------------------- */}
                {/* 2. ROBOT UTAMA TITAN BIRU (DEPAN KIRI - EFEK TARIK TAMBANG)   */}
                {/* ------------------------------------------------------------- */}
                <g transform={`translate(${355 + blueHeaveX}, ${180 + blueSquatY})`}>
                  {/* Efek Hentakan Kaki & Percikan Saat Menarik Tambang */}
                  <g transform={`translate(0, ${-blueSquatY})`}>
                    <circle cx={48 + bluePullStroke * 10} cy="-3" r={3 + Math.max(0, bluePullStroke) * 2.5} fill="#fde047" />
                    <circle cx={56 + bluePullStroke * 14} cy={-8 - Math.max(0, bluePullStroke) * 5} r="2.5" fill="#38bdf8" />
                    <circle cx={-24 - bluePullStroke * 8} cy="-2" r="3" fill="#fde047" />
                  </g>

                  {/* Kaki Menekuk Lutut & Menjejak Cleat Baja seperti Orang Tarik Tambang */}
                  <line x1="-10" y1="-42" x2={-30 - bluePullStroke * 7} y2={-20 - blueSquatY * 0.5} stroke="#475569" strokeWidth="12" strokeLinecap="round" />
                  <circle cx={-30 - bluePullStroke * 7} cy={-20 - blueSquatY * 0.5} r="6" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1={-30 - bluePullStroke * 7} y1={-20 - blueSquatY * 0.5} x2={-18 - blueHeaveX * 0.45} y2={-blueSquatY} stroke="#0284c7" strokeWidth="13" strokeLinecap="round" />
                  <path
                    d={`M${-30 - blueHeaveX * 0.45},${2 - blueSquatY} L${-4 - blueHeaveX * 0.45},${2 - blueSquatY} L${-8 - blueHeaveX * 0.45},${-8 - blueSquatY} L${-26 - blueHeaveX * 0.45},${-8 - blueSquatY} Z`}
                    fill="#38bdf8"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />

                  <line x1="8" y1="-42" x2={28 - bluePullStroke * 5} y2={-20 - blueSquatY * 0.5} stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
                  <circle cx={28 - bluePullStroke * 5} cy={-20 - blueSquatY * 0.5} r="6" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1={28 - bluePullStroke * 5} y1={-20 - blueSquatY * 0.5} x2={46 - blueHeaveX * 0.5} y2={-blueSquatY} stroke="#0369a1" strokeWidth="13" strokeLinecap="round" />
                  <path
                    d={`M${32 - blueHeaveX * 0.5},${2 - blueSquatY} L${60 - blueHeaveX * 0.5},${2 - blueSquatY} L${54 - blueHeaveX * 0.5},${-9 - blueSquatY} L${34 - blueHeaveX * 0.5},${-9 - blueSquatY} Z`}
                    fill="#38bdf8"
                    stroke="#e0f2fe"
                    strokeWidth="2"
                  />

                  {/* Badan Atas Condong & Mengayun ke Belakang Menarik Tambang */}
                  <g transform={`rotate(${blueLeaningDeg})`}>
                    <polygon
                      points={`-26,-68 ${-82 - bluePullStroke * 28},-54 -66,-74 ${-94 - bluePullStroke * 32},-84 -64,-88 -78,-100 -26,-90`}
                      fill="#0ea5e9"
                      opacity={tugPullImpulse === 'blue' || bluePullStroke > 0.25 ? '1' : '0.75'}
                    />
                    <polygon points="-26,-72 -58,-64 -52,-82 -26,-85" fill="#e0f2fe" />
                    <rect x="-30" y="-92" width="12" height="32" rx="4" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />

                    <rect x="-18" y="-52" width="38" height="14" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <rect x="-5" y="-50" width="12" height="10" rx="2" fill="#fbbf24" />

                    <path
                      d="M-24,-98 L26,-98 L20,-50 L-18,-50 Z"
                      fill="url(#blueMechaArmor)"
                      stroke="#e0f2fe"
                      strokeWidth="2.5"
                    />
                    <rect x="-29" y="-101" width="16" height="18" rx="5" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                    <rect x="15" y="-101" width="16" height="18" rx="5" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />

                    <circle cx="2" cy="-75" r="10" fill="#0f172a" stroke="#bae6fd" strokeWidth="2" />
                    <circle cx="2" cy="-75" r="6" fill="#38bdf8" />
                    <circle cx="2" cy="-75" r="2.5" fill="#ffffff" />

                    <rect x="-16" y="-130" width="34" height="28" rx="7" fill="#0284c7" stroke="#e0f2fe" strokeWidth="2.5" />
                    <polygon points="1,-130 -10,-144 0,-138 12,-144" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.2" />
                    <rect x="-10" y="-123" width="24" height="13" rx="3" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
                    {ropePos <= 20 ? (
                      <>
                        <polygon points="-7,-118 1,-115 -7,-113" fill="#38bdf8" />
                        <polygon points="11,-118 3,-115 11,-113" fill="#38bdf8" />
                      </>
                    ) : (
                      <>
                        <circle cx="-3" cy="-116" r="2.5" fill="#fde047" />
                        <circle cx="7" cy="-116" r="2.5" fill="#fde047" />
                      </>
                    )}

                    {/* Dua Lengan Menarik Tambang secara Berirama (Siku Menekuk & Menarik ke Belakang) */}
                    <line x1="-8" y1="-88" x2={16 - blueArmPull * 0.9} y2={-68 + bluePullStroke * 5} stroke="#475569" strokeWidth="10" strokeLinecap="round" />
                    <line x1={16 - blueArmPull * 0.9} y1={-68 + bluePullStroke * 5} x2={42 - blueArmPull} y2="-66" stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
                    <circle cx={45 - blueArmPull} cy="-66" r="6.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />

                    <line x1="12" y1="-88" x2={32 - blueArmPull * 0.85} y2={-66 + bluePullStroke * 5} stroke="#94a3b8" strokeWidth="11" strokeLinecap="round" />
                    <circle cx={32 - blueArmPull * 0.85} cy={-66 + bluePullStroke * 5} r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1={32 - blueArmPull * 0.85} y1={-66 + bluePullStroke * 5} x2={60 - blueArmPull} y2="-64" stroke="#38bdf8" strokeWidth="11" strokeLinecap="round" />
                    <circle cx={62 - blueArmPull} cy="-64" r="7" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
                  </g>
                </g>

                {/* ------------------------------------------------------------- */}
                {/* 3. ROBOT SUPPORT MERAH (BELAKANG KANAN - EFEK TARIK TAMBANG)  */}
                {/* ------------------------------------------------------------- */}
                <g transform={`translate(${755 + redSupHeaveX}, ${180 + redSupSquatY})`}>
                  {redSupportStroke > 0.1 && (
                    <g transform={`translate(0, ${-redSupSquatY})`}>
                      <circle cx={-38 - redSupportStroke * 8} cy="-3" r={2.5 + redSupportStroke * 2} fill="#fb7185" opacity="0.85" />
                      <circle cx={18 + redSupportStroke * 6} cy="-2" r="2.5" fill="#fde047" opacity="0.85" />
                    </g>
                  )}

                  {/* Kaki Menekuk & Menahan Beban */}
                  <line x1="8" y1="-34" x2={24 + redSupportStroke * 6} y2={-16 - redSupSquatY * 0.5} stroke="#64748b" strokeWidth="9" strokeLinecap="round" />
                  <line x1={24 + redSupportStroke * 6} y1={-16 - redSupSquatY * 0.5} x2={14 - redSupHeaveX * 0.4} y2={-redSupSquatY} stroke="#e11d48" strokeWidth="10" strokeLinecap="round" />
                  <rect x={2 - redSupHeaveX * 0.4} y={-5 - redSupSquatY} width="22" height="8" rx="3" fill="#fb7185" stroke="#0f172a" strokeWidth="1.5" />

                  <line x1="-6" y1="-34" x2={-24 + redSupportStroke * 4} y2={-15 - redSupSquatY * 0.5} stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" />
                  <line x1={-24 + redSupportStroke * 4} y1={-15 - redSupSquatY * 0.5} x2={-38 - redSupHeaveX * 0.45} y2={-redSupSquatY} stroke="#be123c" strokeWidth="10" strokeLinecap="round" />
                  <rect x={-52 - redSupHeaveX * 0.45} y={-6 - redSupSquatY} width="24" height="9" rx="3" fill="#fb7185" stroke="#0f172a" strokeWidth="1.5" />

                  {/* Badan Atas Condong & Menghentak ke Belakang */}
                  <g transform={`rotate(${redSupportLeaningDeg})`}>
                    <polygon
                      points={`28,-62 ${64 + redSupportStroke * 22},-52 52,-68 ${72 + redSupportStroke * 24},-75 28,-78`}
                      fill="#f43f5e"
                      opacity={redSupportStroke > 0.2 ? '0.95' : '0.7'}
                    />
                    <polygon points="28,-65 48,-58 45,-72" fill="#fecdd3" />
                    <rect x="-15" y="-42" width="30" height="12" rx="4" fill="#1e293b" stroke="#fb7185" strokeWidth="1.5" />
                    <rect x="-18" y="-82" width="36" height="42" rx="7" fill="url(#redMechaArmor)" stroke="#fecdd3" strokeWidth="2" />
                    <circle cx="-2" cy="-62" r="7" fill="#0f172a" stroke="#fda4af" strokeWidth="2" />
                    <circle cx="-2" cy="-62" r="4" fill="#f43f5e" />
                    <rect x="-13" y="-108" width="26" height="22" rx="6" fill="#e11d48" stroke="#fecdd3" strokeWidth="2" />
                    <line x1="0" y1="-108" x2="6" y2="-119" stroke="#fb7185" strokeWidth="2.5" />
                    <circle cx="6" cy="-120" r="3.5" fill="#fde047" />
                    <rect x="-10" y="-102" width="18" height="9" rx="3" fill="#0f172a" />
                    <line x1="-8" y1="-98" x2="-4" y2="-96" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="4" y1="-98" x2="-2" y2="-96" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Lengan Menarik Tambang Maju-Mundur */}
                    <line x1="-8" y1="-74" x2={-24 + redSupArmPull * 0.85} y2={-61 + redSupportStroke * 4} stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                    <line x1={-24 + redSupArmPull * 0.85} y1={-61 + redSupportStroke * 4} x2={-48 + redSupArmPull} y2="-63" stroke="#fb7185" strokeWidth="9" strokeLinecap="round" />
                    <circle cx={-50 + redSupArmPull} cy="-63" r="6" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
                  </g>
                </g>

                {/* ------------------------------------------------------------- */}
                {/* 4. ROBOT UTAMA DESTROYER MERAH (DEPAN KANAN - EFEK TARIK)     */}
                {/* ------------------------------------------------------------- */}
                <g transform={`translate(${605 + redHeaveX}, ${180 + redSquatY})`}>
                  <g transform={`translate(0, ${-redSquatY})`}>
                    <circle cx={-48 - redPullStroke * 10} cy="-3" r={3 + Math.max(0, redPullStroke) * 2.5} fill="#fde047" />
                    <circle cx={-56 - redPullStroke * 14} cy={-8 - Math.max(0, redPullStroke) * 5} r="2.5" fill="#fb7185" />
                    <circle cx={24 + redPullStroke * 8} cy="-2" r="3" fill="#fde047" />
                  </g>

                  {/* Kaki Menekuk Lutut & Menjejak Cleat Baja */}
                  <line x1="10" y1="-42" x2={30 + redPullStroke * 7} y2={-20 - redSquatY * 0.5} stroke="#475569" strokeWidth="12" strokeLinecap="round" />
                  <circle cx={30 + redPullStroke * 7} cy={-20 - redSquatY * 0.5} r="6" fill="#fb7185" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1={30 + redPullStroke * 7} y1={-20 - redSquatY * 0.5} x2={18 - redHeaveX * 0.45} y2={-redSquatY} stroke="#e11d48" strokeWidth="13" strokeLinecap="round" />
                  <path
                    d={`M${30 - redHeaveX * 0.45},${2 - redSquatY} L${4 - redHeaveX * 0.45},${2 - redSquatY} L${8 - redHeaveX * 0.45},${-8 - redSquatY} L${26 - redHeaveX * 0.45},${-8 - redSquatY} Z`}
                    fill="#fb7185"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />

                  <line x1="-8" y1="-42" x2={-28 + redPullStroke * 5} y2={-20 - redSquatY * 0.5} stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
                  <circle cx={-28 + redPullStroke * 5} cy={-20 - redSquatY * 0.5} r="6" fill="#fb7185" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1={-28 + redPullStroke * 5} y1={-20 - redSquatY * 0.5} x2={-46 - redHeaveX * 0.5} y2={-redSquatY} stroke="#be123c" strokeWidth="13" strokeLinecap="round" />
                  <path
                    d={`M${-32 - redHeaveX * 0.5},${2 - redSquatY} L${-60 - redHeaveX * 0.5},${2 - redSquatY} L${-54 - redHeaveX * 0.5},${-9 - redSquatY} L${-34 - redHeaveX * 0.5},${-9 - redSquatY} Z`}
                    fill="#fb7185"
                    stroke="#fecdd3"
                    strokeWidth="2"
                  />

                  {/* Badan Atas Condong & Mengayun ke Belakang Menarik Tambang */}
                  <g transform={`rotate(${redLeaningDeg})`}>
                    <polygon
                      points={`26,-68 ${82 + redPullStroke * 28},-54 66,-74 ${94 + redPullStroke * 32},-84 64,-88 78,-100 26,-90`}
                      fill="#f43f5e"
                      opacity={tugPullImpulse === 'red' || redPullStroke > 0.25 ? '1' : '0.75'}
                    />
                    <polygon points="26,-72 58,-64 52,-82 26,-85" fill="#fef08a" />
                    <rect x="18" y="-92" width="12" height="32" rx="4" fill="#334155" stroke="#fb7185" strokeWidth="1.5" />

                    <rect x="-20" y="-52" width="38" height="14" rx="5" fill="#0f172a" stroke="#fb7185" strokeWidth="2" />
                    <rect x="-7" y="-50" width="12" height="10" rx="2" fill="#fbbf24" />

                    <path
                      d="M-26,-98 L24,-98 L18,-50 L-20,-50 Z"
                      fill="url(#redMechaArmor)"
                      stroke="#fecdd3"
                      strokeWidth="2.5"
                    />
                    <rect x="-31" y="-101" width="16" height="18" rx="5" fill="#e11d48" stroke="#fda4af" strokeWidth="2" />
                    <rect x="13" y="-101" width="16" height="18" rx="5" fill="#e11d48" stroke="#fda4af" strokeWidth="2" />

                    <circle cx="-2" cy="-75" r="10" fill="#0f172a" stroke="#fda4af" strokeWidth="2" />
                    <circle cx="-2" cy="-75" r="6" fill="#f43f5e" />
                    <circle cx="-2" cy="-75" r="2.5" fill="#ffffff" />

                    <rect x="-18" y="-130" width="34" height="28" rx="7" fill="#e11d48" stroke="#fecdd3" strokeWidth="2.5" />
                    <polygon points="-1,-130 -12,-144 0,-138 10,-144" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.2" />
                    <rect x="-14" y="-123" width="24" height="13" rx="3" fill="#090d16" stroke="#fb7185" strokeWidth="1.5" />
                    {ropePos >= -20 ? (
                      <>
                        <polygon points="-11,-118 -3,-115 -11,-113" fill="#fb7185" />
                        <polygon points="7,-118 -1,-115 7,-113" fill="#fb7185" />
                      </>
                    ) : (
                      <>
                        <circle cx="-7" cy="-116" r="2.5" fill="#fde047" />
                        <circle cx="3" cy="-116" r="2.5" fill="#fde047" />
                      </>
                    )}

                    {/* Dua Lengan Menarik Tambang secara Berirama */}
                    <line x1="8" y1="-88" x2={-16 + redArmPull * 0.9} y2={-68 + redPullStroke * 5} stroke="#475569" strokeWidth="10" strokeLinecap="round" />
                    <line x1={-16 + redArmPull * 0.9} y1={-68 + redPullStroke * 5} x2={-42 + redArmPull} y2="-66" stroke="#e11d48" strokeWidth="10" strokeLinecap="round" />
                    <circle cx={-45 + redArmPull} cy="-66" r="6.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />

                    <line x1="-12" y1="-88" x2={-32 + redArmPull * 0.85} y2={-66 + redPullStroke * 5} stroke="#94a3b8" strokeWidth="11" strokeLinecap="round" />
                    <circle cx={-32 + redArmPull * 0.85} cy={-66 + redPullStroke * 5} r="5" fill="#fb7185" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1={-32 + redArmPull * 0.85} y1={-66 + redPullStroke * 5} x2={-60 + redArmPull} y2="-64" stroke="#fb7185" strokeWidth="11" strokeLinecap="round" />
                    <circle cx={-62 + redArmPull} cy="-64" r="7" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
                  </g>
                </g>

                {/* ------------------------------------------------------------- */}
                {/* 5. TALI TAMBANG ENERGI SIBER (BERGETAR & MENEGANG SAAT DITARIK) */}
                {/* ------------------------------------------------------------- */}
                <path
                  d={`M ${125 + blueHeaveX} ${118 + blueSquatY * 0.5} Q 480 ${118 + ropeVibrationY} ${835 + redHeaveX} ${118 + redSquatY * 0.5}`}
                  fill="none"
                  stroke="url(#ropeEnergyGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity="0.35"
                />
                <path
                  d={`M ${125 + blueHeaveX} ${118 + blueSquatY * 0.5} Q 480 ${118 + ropeVibrationY} ${835 + redHeaveX} ${118 + redSquatY * 0.5}`}
                  fill="none"
                  stroke="url(#ropeEnergyGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${130 + blueHeaveX} ${118 + blueSquatY * 0.5} Q 480 ${118 + ropeVibrationY} ${830 + redHeaveX} ${118 + redSquatY * 0.5}`}
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="5"
                  strokeDasharray="8 8"
                  strokeDashoffset={(tugHeaveTick * 3) % 16}
                />

                {/* Bendera / Inti Penanda Tengah Tambang */}
                <g transform={`translate(480, ${118 + ropeVibrationY * 0.7})`}>
                  <polygon points="-10,6 10,6 15,38 0,28 -15,38" fill="#ef4444" stroke="#fde047" strokeWidth="2" />
                  <circle cx="0" cy="0" r="15" fill="#fbbf24" stroke="#ffffff" strokeWidth="3" />
                  <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">
                    ⚡
                  </text>
                </g>
              </g>
            </svg>

            {/* Bar Indikator Tarikan & Batas Garis Tengah di Bawah Panggung */}
            <div className="px-3 pb-2 pt-1 bg-slate-950/90 border-t border-slate-800/80 flex items-center gap-2">
              <span className="text-[10px] font-black text-sky-400 uppercase shrink-0">
                ◀ Tarikan Biru ({Math.round(100 - ropePercent)}%)
              </span>
              <div className="w-full h-3 rounded-full bg-slate-800 border border-slate-700 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-500"
                  style={{ width: `${100 - ropePercent}%` }}
                />
                <div
                  className="absolute inset-y-0 right-0 bg-gradient-to-l from-rose-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${ropePercent}%` }}
                />
                {/* Penanda Garis Tengah di Bar */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-yellow-300 z-10 shadow-[0_0_8px_#fde047]" />
              </div>
              <span className="text-[10px] font-black text-rose-400 uppercase shrink-0">
                Tarikan Merah ({Math.round(ropePercent)}%) ▶
              </span>
            </div>
          </div>
        </div>

        {/* Layar Permainan: Terpisah Kiri & Kanan jika Duel/Kelompok */}
        {!isArenaFinished && (
          <div
            className={`flex-1 min-h-0 ${
              isSplitMultiplayer ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'flex flex-col'
            }`}
          >
            {renderTugPlayerPanel('blue')}
            {isSplitMultiplayer && renderTugPlayerPanel('red')}
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // RENDER 6: JINAKKAN BOM WAKTU SIBER (VISUAL MENDEBARKAN C4 / TIME-BOMB)
  // ============================================================================
  if (gameType === 'bomb-defusal') {
    const handleCutWire = (team: 'blue' | 'red', wIdx: number) => {
      if (isArenaFinished) return;
      const isBlue = team === 'blue';
      const status = isBlue ? blueBombStatus : redBombStatus;
      if (status !== 'active') return;

      const bomb = isBlue
        ? pack.blueBombs[blueBombIdx % pack.blueBombs.length]
        : pack.redBombs[redBombIdx % pack.redBombs.length];
      const remTime = isBlue ? blueBombTimer : redBombTimer;

      if (isBlue) setBlueCutWire(wIdx);
      else setRedCutWire(wIdx);

      const isCorrect = wIdx === bomb.correctWireIndex;
      // Semakin cepat memotong kabel (sisa detik banyak), semakin besar poinnya!
      const speedBonus = isCorrect ? Math.round(remTime * 3) : 0;

      if (isBlue) {
        setBlueLastSpeedBonus(speedBonus);
        setBlueBombStatus(isCorrect ? 'defused' : 'exploded');
      } else {
        setRedLastSpeedBonus(speedBonus);
        setRedBombStatus(isCorrect ? 'defused' : 'exploded');
      }

      if (isCorrect) {
        playSuccess();
        onTriggerCombat(true, 100 + speedBonus, Math.round(100 / totalRounds), team);
      } else {
        playError();
        soundManager.playRobotKO();
        onTriggerCombat(false, 0, 20, team);
      }
    };

    const handleNextBomb = (team: 'blue' | 'red') => {
      playClick();
      if (team === 'blue') {
        setBlueBombIdx((i) => i + 1);
        setBlueBombTimer(35);
        setBlueCutWire(null);
        setBlueHoverWire(null);
        setBlueBombStatus('active');
        setBlueLastSpeedBonus(null);
      } else {
        setRedBombIdx((i) => i + 1);
        setRedBombTimer(35);
        setRedCutWire(null);
        setRedHoverWire(null);
        setRedBombStatus('active');
        setRedLastSpeedBonus(null);
      }
    };

    const renderBombPlayerPanel = (team: 'blue' | 'red') => {
      const isBlue = team === 'blue';
      const bIdx = isBlue ? blueBombIdx : redBombIdx;
      if (bIdx >= totalRounds) return renderPlayerFinishedCard(team);

      const bomb = isBlue
        ? pack.blueBombs[bIdx % pack.blueBombs.length]
        : pack.redBombs[bIdx % pack.redBombs.length];
      const timerVal = isBlue ? blueBombTimer : redBombTimer;
      const status = isBlue ? blueBombStatus : redBombStatus;
      const cutIdx = isBlue ? blueCutWire : redCutWire;
      const hoverIdx = isBlue ? blueHoverWire : redHoverWire;
      const setHoverIdx = isBlue ? setBlueHoverWire : setRedHoverWire;
      const speedBonus = isBlue ? blueLastSpeedBonus : redLastSpeedBonus;

      const isCritical = status === 'active' && timerVal <= 12;
      const isWarning = status === 'active' && timerVal <= 20 && timerVal > 12;
      // Sudut jarum manometer tekanan bom (-60deg aman -> +65deg zona merah kritis)
      const gaugeAngle = Math.min(68, Math.max(-60, 68 - (timerVal / 35) * 128));
      const msDisplay =
        status === 'defused'
          ? '00'
          : status === 'exploded'
          ? '99'
          : String(isBlue ? bombMs : (bombMs + 37) % 100).padStart(2, '0');

      return (
        <div
          className={`relative flex-1 min-h-0 p-3 sm:p-4 rounded-3xl border-2 flex flex-col justify-between gap-2.5 shadow-2xl overflow-hidden transition-all ${
            status === 'exploded'
              ? 'bg-rose-950/90 border-rose-500 ring-4 ring-rose-500/50 animate-pulse'
              : status === 'defused'
              ? 'bg-emerald-950/40 dark:bg-slate-900 border-emerald-500 ring-2 ring-emerald-400/40'
              : isCritical
              ? 'bg-rose-950/35 dark:bg-slate-950 border-rose-500 ring-2 ring-rose-500/60'
              : isBlue
              ? 'bg-sky-950/20 dark:bg-slate-900 border-sky-500/60'
              : 'bg-rose-950/20 dark:bg-slate-900 border-rose-500/60'
          }`}
        >
          {/* Efek Lampu Strobo Darurat Saat Waktu Kritis */}
          {isCritical && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-rose-600/15 via-transparent to-rose-600/15 animate-pulse" />
          )}

          {/* BAGIAN ATAS: KOPER BOM SIBER C4 INTERAKTIF + LAYAR HITUNG MUNDUR LED */}
          <div className="space-y-2 relative z-10">
            {/* Bar Status Unit Penjinak Bom */}
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase text-white flex items-center gap-1.5 shadow-sm ${
                    isBlue ? 'bg-sky-600' : 'bg-rose-600'
                  }`}
                >
                  <Bomb className={`w-3.5 h-3.5 ${status === 'active' ? 'animate-bounce' : ''}`} />
                  <span>
                    {isBlue ? blueLabel : redLabel} · Bom #{bIdx + 1}/{totalRounds}
                  </span>
                </span>

                <span
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border ${
                    status === 'defused'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : status === 'exploded'
                      ? 'bg-rose-600 border-white text-white animate-bounce'
                      : isCritical
                      ? 'bg-rose-600/30 border-rose-400 text-rose-300 animate-pulse'
                      : 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>
                    {status === 'defused'
                      ? 'AMAN TERKENDALI'
                      : status === 'exploded'
                      ? 'DETONASI!'
                      : isCritical
                      ? 'DARURAT KRITIS!'
                      : 'DETONATOR AKTIF'}
                  </span>
                </span>
              </div>

              <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-600 dark:text-amber-300 text-[11px] font-black">
                ⚡ Potensi Bonus Cepat: +{timerVal * 3} Pts
              </span>
            </div>

            {/* VISUAL KOPER BOM WAKTU SIBER C4 (TACTICAL TIME-BOMB CHASSIS) */}
            <div
              className={`rounded-2xl bg-slate-950 border-2 p-2.5 sm:p-3 text-white shadow-inner relative overflow-hidden ${
                status === 'exploded'
                  ? 'border-rose-500 shadow-[inset_0_0_35px_rgba(244,63,94,0.65)]'
                  : status === 'defused'
                  ? 'border-emerald-500 shadow-[inset_0_0_25px_rgba(16,185,129,0.35)]'
                  : isCritical
                  ? 'border-rose-500 shadow-[inset_0_0_28px_rgba(244,63,94,0.45)]'
                  : 'border-slate-700'
              }`}
            >
              {/* Pita Garis Bahaya Kuning-Hitam (Hazard Stripes) di Atas Koper Bom */}
              <div
                className="h-2 w-full rounded-full mb-2 opacity-85"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #0f172a 10px, #0f172a 20px)'
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-center">
                {/* MODUL 1 (KIRI): BLOK C-4 EXPLOSIVE + MANOMETER TEKANAN + LAYAR LED DIGITAL */}
                <div className="lg:col-span-5 flex items-center justify-between gap-2 bg-slate-900/95 border border-slate-800 rounded-xl p-2">
                  {/* Blok C4 & Manometer Tekanan */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-11 h-14 rounded-lg bg-gradient-to-b from-amber-700 via-amber-800 to-stone-900 border-2 border-amber-500/70 flex flex-col items-center justify-between p-1 shrink-0 shadow-md">
                      <div className="w-full h-1.5 bg-slate-950 rounded-xs" />
                      <span className="text-[9px] font-black text-amber-200 tracking-tighter leading-none">
                        C-4
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          status === 'defused'
                            ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                            : 'bg-rose-500 animate-ping shadow-[0_0_10px_#f43f5e]'
                        }`}
                      />
                      <div className="w-full h-1.5 bg-slate-950 rounded-xs" />
                    </div>

                    {/* Manometer Tekanan Detonator */}
                    <div className="flex flex-col items-center">
                      <svg viewBox="0 0 60 38" className="w-14 h-9">
                        <path
                          d="M 6 32 A 24 24 0 0 1 54 32"
                          fill="none"
                          stroke="#334155"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 6 32 A 24 24 0 0 1 24 9"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 24 9 A 24 24 0 0 1 40 10"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="5"
                        />
                        <path
                          d="M 40 10 A 24 24 0 0 1 54 32"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <g transform={`translate(30, 32) rotate(${gaugeAngle})`}>
                          <line x1="0" y1="0" x2="0" y2="-20" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="0" cy="0" r="3.5" fill="#f59e0b" />
                        </g>
                      </svg>
                      <span className="text-[8px] font-mono uppercase text-slate-400 -mt-1">
                        TEKANAN INTI
                      </span>
                    </div>
                  </div>

                  {/* Layar Hitung Mundur Digital 7-Segmen Merah Menyala */}
                  <div
                    className={`px-2.5 py-1.5 rounded-xl border-2 font-mono text-right flex flex-col items-end justify-center min-w-[118px] ${
                      status === 'defused'
                        ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.4)]'
                        : status === 'exploded'
                        ? 'bg-rose-950 border-rose-400 text-rose-200 shadow-[0_0_24px_rgba(244,63,94,0.9)]'
                        : isCritical
                        ? 'bg-black border-rose-500 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.7)] animate-pulse'
                        : isWarning
                        ? 'bg-black border-amber-500 text-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.4)]'
                        : 'bg-black border-rose-500/80 text-rose-400 shadow-[0_0_14px_rgba(244,63,94,0.35)]'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest opacity-85">
                      <Activity className="w-2.5 h-2.5" />
                      <span>
                        {status === 'defused'
                          ? 'DISARMED'
                          : status === 'exploded'
                          ? 'BOOM!!'
                          : 'TIMER BOM'}
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-black tracking-wider leading-none mt-0.5">
                      00:{String(timerVal).padStart(2, '0')}
                      <span className="text-xs opacity-80">:{msDisplay}</span>
                    </div>
                  </div>
                </div>

                {/* MODUL 2 (KANAN): SIRKUIT RANGKAIAN KABEL BOM INTERAKTIF (SVG WIRE HARNESS) */}
                <div className="lg:col-span-7 bg-slate-900/95 border border-slate-800 rounded-xl p-1.5 relative">
                  <div className="flex items-center justify-between px-1.5 pb-1 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <span>⚡ RANGKAIAN KABEL DETONATOR (KLIK UNTUK POTONG)</span>
                    <span className="text-amber-400 flex items-center gap-1">
                      <Scissors className="w-3 h-3" />
                      <span>
                        {hoverIdx !== null && bomb.wires[hoverIdx]
                          ? `Target Tang: Kabel ${bomb.wires[hoverIdx].color}`
                          : 'Arahkan / Pilih Kabel'}
                      </span>
                    </span>
                  </div>

                  <svg viewBox="0 0 360 86" className="w-full h-20 block select-none">
                    {/* Papan Sirkuit PCB Gelap */}
                    <rect x="2" y="2" width="356" height="82" rx="8" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />
                    {/* Jalur Emas PCB Tipis */}
                    <path d="M 35 15 L 95 15 L 115 28 M 240 68 L 295 68 L 315 50" stroke="#1e293b" strokeWidth="1.5" fill="none" />

                    {/* Blok Terminal Kiri (Detonator) & Kanan (Inti C4) */}
                    <rect x="8" y="8" width="28" height="70" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                    <text x="22" y="46" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="900" transform="rotate(-90 22 46)">
                      DETONATOR
                    </text>

                    <rect x="324" y="8" width="28" height="70" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                    <text x="338" y="46" textAnchor="middle" fill="#f87171" fontSize="7" fontWeight="900" transform="rotate(90 338 46)">
                      INTI C-4
                    </text>

                    {/* Render Setiap Kabel Bom Secara Visual */}
                    {bomb.wires.map((wire, wIdx) => {
                      const yPos = 16 + wIdx * 18;
                      const isThisCut = cutIdx === wIdx;
                      const isHovered = hoverIdx === wIdx;
                      const isCorrectWire = wIdx === bomb.correctWireIndex;

                      return (
                        <g
                          key={wIdx}
                          className={status === 'active' ? 'cursor-pointer' : ''}
                          onClick={() => handleCutWire(team, wIdx)}
                          onMouseEnter={() => setHoverIdx(wIdx)}
                          onMouseLeave={() => setHoverIdx(null)}
                        >
                          {/* Pin Konektor Kiri & Kanan */}
                          <circle cx="36" cy={yPos} r="4.5" fill="#64748b" stroke="#0f172a" strokeWidth="1" />
                          <circle cx="324" cy={yPos} r="4.5" fill="#64748b" stroke="#0f172a" strokeWidth="1" />

                          {!isThisCut ? (
                            <>
                              {/* Bayangan Kabel */}
                              <path
                                d={`M 36 ${yPos + 2} C 110 ${yPos - 7}, 250 ${yPos + 9}, 324 ${yPos + 2}`}
                                fill="none"
                                stroke="#000000"
                                strokeWidth="6"
                                opacity="0.55"
                              />
                              {/* Kabel Utuh Berwarna */}
                              <path
                                d={`M 36 ${yPos} C 110 ${yPos - 9}, 250 ${yPos + 7}, 324 ${yPos}`}
                                fill="none"
                                stroke={wire.hex}
                                strokeWidth={isHovered ? '6.5' : '5'}
                                strokeLinecap="round"
                              />
                              {/* Kilau Isolasi Kabel */}
                              <path
                                d={`M 40 ${yPos - 1} C 110 ${yPos - 10}, 250 ${yPos + 6}, 320 ${yPos - 1}`}
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="1.2"
                                opacity="0.4"
                                strokeDasharray="12 18"
                              />
                              {/* Indikator Tang Pemotong Saat Hover */}
                              {isHovered && status === 'active' && (
                                <g transform={`translate(180, ${yPos})`}>
                                  <circle cx="0" cy="0" r="9" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
                                  <text x="0" y="3.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0f172a">
                                    ✂
                                  </text>
                                </g>
                              )}
                            </>
                          ) : (
                            <>
                              {/* Kabel Terpotong Dua Bagian dengan Celah di Tengah */}
                              <path
                                d={`M 36 ${yPos} Q 105 ${yPos - 8}, 162 ${yPos - 3}`}
                                fill="none"
                                stroke={wire.hex}
                                strokeWidth="5"
                                strokeLinecap="round"
                              />
                              <path
                                d={`M 198 ${yPos + 3} Q 255 ${yPos + 8}, 324 ${yPos}`}
                                fill="none"
                                stroke={wire.hex}
                                strokeWidth="5"
                                strokeLinecap="round"
                              />
                              {/* Serabut Tembaga di Ujung Potongan */}
                              <circle cx="164" cy={yPos - 3} r="3" fill="#fbbf24" />
                              <circle cx="196" cy={yPos + 3} r="3" fill="#fbbf24" />

                              {/* Efek Percikan Api / Perisai Aman di Titik Potong */}
                              {isCorrectWire ? (
                                <g transform={`translate(180, ${yPos})`}>
                                  <circle cx="0" cy="0" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                                  <text x="0" y="3.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0f172a">
                                    ✓
                                  </text>
                                </g>
                              ) : (
                                <g transform={`translate(180, ${yPos})`}>
                                  <polygon
                                    points="0,-13 4,-4 13,-6 6,2 11,11 1,6 -6,12 -5,2 -13,-3 -4,-4"
                                    fill="#f43f5e"
                                    stroke="#fde047"
                                    strokeWidth="1.5"
                                  />
                                </g>
                              )}
                            </>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Kotak Petunjuk Sandi Penjinakan Bom */}
              <div className="mt-2 p-2.5 rounded-xl bg-slate-900/95 border border-amber-500/40 text-white flex items-start gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 shrink-0 mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                    🔍 INSTRUKSI PENJINAKAN BOM ({isBlue ? blueLabel : redLabel}):
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold leading-snug text-white">
                    {bomb.clue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TOMBOL PILIHAN KABEL YANG AKAN DIPOTONG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-auto relative z-10">
            {bomb.wires.map((wire, wIdx) => {
              const isCut = cutIdx === wIdx;
              const isRight = wIdx === bomb.correctWireIndex;
              const isHovered = hoverIdx === wIdx;
              return (
                <button
                  key={wIdx}
                  type="button"
                  disabled={status !== 'active'}
                  onMouseEnter={() => setHoverIdx(wIdx)}
                  onMouseLeave={() => setHoverIdx(null)}
                  onClick={() => handleCutWire(team, wIdx)}
                  className={`p-2.5 sm:p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer ${
                    status === 'active'
                      ? isHovered
                        ? 'border-amber-400 bg-slate-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.25)] scale-[1.01]'
                        : 'border-slate-700 bg-slate-900 hover:border-amber-400 text-white'
                      : isRight
                      ? 'border-emerald-500 bg-emerald-950 text-emerald-100 ring-2 ring-emerald-400/50'
                      : isCut
                      ? 'border-rose-500 bg-rose-950 text-rose-100 ring-2 ring-rose-400/50'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 opacity-55'
                  }`}
                >
                  {/* Visual Potongan Kabel Berwarna di Samping Tombol */}
                  <div className="relative flex flex-col items-center justify-center shrink-0">
                    <div
                      className={`w-4 h-10 rounded-full border border-white/30 shadow-sm ${
                        isCut ? 'opacity-40 scale-y-75' : ''
                      }`}
                      style={{ backgroundColor: wire.hex }}
                    />
                    {isCut && (
                      <span className="absolute text-xs font-black">
                        {isRight ? '✅' : '💥'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="text-[11px] font-black uppercase flex items-center gap-1"
                        style={{ color: wire.hex }}
                      >
                        <Scissors className="w-3 h-3 inline shrink-0" />
                        <span>POTONG KABEL {wire.color}</span>
                      </span>
                      {isCut && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-[9px] font-black text-amber-300">
                          ✂️ TERPOTONG
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-100 line-clamp-2 leading-snug mt-0.5">
                      {wire.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* STATUS AKHIR RONDE BOM (DEFUSED / EXPLODED) */}
          {status !== 'active' ? (
            <div
              className={`p-2.5 sm:p-3 rounded-2xl border-2 flex items-center justify-between gap-2 relative z-10 animate-in zoom-in-95 ${
                status === 'defused'
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-rose-950 border-rose-400 text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.45)]'
              }`}
            >
              <span className="text-xs font-bold line-clamp-2">
                {status === 'defused'
                  ? `🛡️ BOM BERHASIL DIJINAKKAN! +${100 + (speedBonus || 0)} Poin (Bonus Cepat +${speedBonus || 0})`
                  : `💥 KABOOM!! Bom Meledak! ${bomb.explanation}`}
              </span>
              <button
                type="button"
                onClick={() => handleNextBomb(team)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 flex items-center gap-1 cursor-pointer shadow-md"
              >
                <span>Bom Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-[11px] text-center font-bold text-rose-500 dark:text-amber-400 flex items-center justify-center gap-1.5 relative z-10">
              <Scissors className="w-3.5 h-3.5 animate-pulse" />
              <span>
                Hati-hati! Pilih & potong satu kabel jawaban yang tepat sebelum waktu habis!
              </span>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="h-full min-h-0 flex flex-col justify-between gap-2.5 overflow-y-auto">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950 border-2 border-rose-500/50 text-white flex flex-wrap items-center justify-between gap-2 shrink-0 shadow-lg">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black">
            <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-400/50 text-rose-300 flex items-center gap-1.5 uppercase">
              <Bomb className="w-4 h-4 text-rose-400 animate-bounce" />
              <span>Misi Penjinakan Bom Siber C-4</span>
            </span>
            <span className="text-sky-300">{blueLabel}: {blueScore} Pts</span>
            <span className="text-slate-600">|</span>
            <span className="text-rose-300">{redLabel}: {redScore} Pts</span>
          </div>
          {renderGameControlButtons()}
        </div>

        {!isArenaFinished && (
          <div
            className={`flex-1 min-h-0 ${
              isSplitMultiplayer ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'flex flex-col'
            }`}
          >
            {renderBombPlayerPanel('blue')}
            {isSplitMultiplayer && renderBombPlayerPanel('red')}
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // RENDER 7: MENARA FIREWALL — GAYA PLANTS VS ZOMBIES (TEMBAKAN VS ROBOT JAHAT)
  // ============================================================================
  if (gameType === 'tower-defense') {
    const handleFireTurret = (team: 'blue' | 'red', idx: number) => {
      if (isArenaFinished) return;
      const isBlue = team === 'blue';
      if (isBlue && blueTdSel !== null) return;
      if (!isBlue && redTdSel !== null) return;

      const wave = isBlue
        ? pack.blueWaves[blueWaveIdx % pack.blueWaves.length]
        : pack.redWaves[redWaveIdx % pack.redWaves.length];

      if (isBlue) setBlueTdSel(idx);
      else setRedTdSel(idx);

      const isCorrect = idx === wave.correctIndex;
      const speedBonus = isCorrect ? getLiveSpeedBonus(team, 100) : 0;

      if (isBlue) setBlueLastSpeedBonus(speedBonus);
      else setRedLastSpeedBonus(speedBonus);

      if (isCorrect) {
        playSuccess();
        if (isBlue) {
          setBlueLaserActive(true);
          setBlueTdShotState('shooting');
          setTimeout(() => setBlueLaserActive(false), 900);
          setBlueEnemyDist(95);
        } else {
          setRedLaserActive(true);
          setRedTdShotState('shooting');
          setTimeout(() => setRedLaserActive(false), 900);
          setRedEnemyDist(95);
        }
        const basePts = wave.enemyType === 'boss' ? 140 : 100;
        onTriggerCombat(true, basePts + speedBonus, Math.round(100 / totalRounds), team);
      } else {
        playError();
        if (isBlue) {
          setBlueTdShotState('hit-wrong');
          setBlueEnemyDist((d) => Math.max(16, d - 28));
        } else {
          setRedTdShotState('hit-wrong');
          setRedEnemyDist((d) => Math.max(16, d - 28));
        }
        onTriggerCombat(false, 0, 20, team);
      }
    };

    const handleNextWave = (team: 'blue' | 'red') => {
      playClick();
      if (team === 'blue') {
        setBlueTdSel(null);
        setBlueTdShotState('idle');
        setBlueEnemyDist(88);
        setBlueLastSpeedBonus(null);
        blueQStartRef.current = Date.now();
        setBlueWaveIdx((w) => w + 1);
      } else {
        setRedTdSel(null);
        setRedTdShotState('idle');
        setRedEnemyDist(88);
        setRedLastSpeedBonus(null);
        redQStartRef.current = Date.now();
        setRedWaveIdx((w) => w + 1);
      }
    };

    const renderTdPlayerPanel = (team: 'blue' | 'red') => {
      const isBlue = team === 'blue';
      const wIdx = isBlue ? blueWaveIdx : redWaveIdx;
      if (wIdx >= totalRounds) return renderPlayerFinishedCard(team);

      const wave = isBlue
        ? pack.blueWaves[wIdx % pack.blueWaves.length]
        : pack.redWaves[wIdx % pack.redWaves.length];
      const picked = isBlue ? blueTdSel : redTdSel;
      const laserOn = isBlue ? blueLaserActive : redLaserActive;
      const shotState = isBlue ? blueTdShotState : redTdShotState;
      const dist = isBlue ? blueEnemyDist : redEnemyDist;
      const speedBonus = isBlue ? blueLastSpeedBonus : redLastSpeedBonus;
      const liveBonus = getLiveSpeedBonus(team, 100);
      const isBossWave = wave.enemyType === 'boss';

      // Koordinat X Robot Jahat di halaman rumput siber (235 = tepat di depan perisai Wall-Bot, 600 = baru muncul di kanan)
      const enemySvgX = Math.max(230, Math.min(605, 225 + (dist / 100) * 375));
      const legSwing = tdWalkTick % 2 === 0 ? 9 : -9;
      const armBob = tdWalkTick % 2 === 0 ? -3 : 3;

      const AMMO_CARDS = [
        { code: 'A', name: 'PLASMA PEA', cost: '25⚡', color: '#10b981', badgeBg: 'bg-emerald-600' },
        { code: 'B', name: 'GATLING LASER', cost: '50⚡', color: '#38bdf8', badgeBg: 'bg-sky-600' },
        { code: 'C', name: 'FIREBALL CANNON', cost: '75⚡', color: '#f59e0b', badgeBg: 'bg-amber-600' },
        { code: 'D', name: 'EMP ULTRA', cost: '100⚡', color: '#a855f7', badgeBg: 'bg-purple-600' }
      ];

      return (
        <div
          className={`flex-1 min-h-0 p-3 sm:p-4 rounded-3xl border-2 flex flex-col justify-between gap-2.5 shadow-xl ${
            isBlue
              ? 'bg-emerald-950/20 dark:bg-slate-900 border-emerald-500/60'
              : 'bg-rose-950/20 dark:bg-slate-900 border-rose-500/60'
          }`}
        >
          <div className="space-y-2">
            {/* HUD Atas Gaya Plants vs Zombies: Energi Surya Siber + Bar Bendera Gelombang */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 bg-slate-950 border border-emerald-500/40 rounded-2xl px-2.5 py-1.5 text-white">
              <div className="flex items-center gap-2">
                {/* Bank Energi Siber (Seperti Sun Bank di PvZ) */}
                <div className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-black flex items-center gap-1 shadow-xs">
                  <span>☀️</span>
                  <span>{150 + wIdx * 25}⚡</span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase text-white flex items-center gap-1 ${
                    isBlue ? 'bg-sky-600' : 'bg-rose-600'
                  }`}
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>{isBlue ? blueLabel : redLabel}</span>
                </span>
              </div>

              {/* Progress Gelombang Robot Jahat (Seperti Level Flag Meter di PvZ) */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1">
                  <span className="text-[10px] font-black text-emerald-300 uppercase">
                    🚩 Gelombang {wIdx + 1}/{totalRounds}
                  </span>
                  <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-rose-500 transition-all"
                      style={{ width: `${((wIdx + 1) / totalRounds) * 100}%` }}
                    />
                  </div>
                </div>

                <span className="px-2 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-black">
                  {picked === null
                    ? `⚡ Bonus Cepat: +${liveBonus} Pts`
                    : `⚡ +${speedBonus || 0} Pts`}
                </span>
              </div>
            </div>

            {/* =============================================================== */}
            {/* PANGGUNG 2D PLANTS VS ZOMBIES: PENEMBAK SIBER VS ROBOT JAHAT    */}
            {/* =============================================================== */}
            <div className="relative rounded-2xl bg-slate-950 border-2 border-emerald-500/50 overflow-hidden shadow-inner select-none">
              <svg
                viewBox="0 0 680 172"
                className="w-full h-36 sm:h-42 block"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id={`pvzLawnBg-${team}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#022c22" />
                    <stop offset="75%" stopColor="#064e3b" />
                    <stop offset="100%" stopColor="#1e1b4b" />
                  </linearGradient>
                  <linearGradient id={`peaTurretGrad-${team}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="60%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#065f46" />
                  </linearGradient>
                  <linearGradient id={`evilBotGrad-${team}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="55%" stopColor="#9f1239" />
                    <stop offset="100%" stopColor="#31102f" />
                  </linearGradient>
                </defs>

                {/* Latar Belakang Halaman Siber */}
                <rect x="0" y="0" width="680" height="172" fill={`url(#pvzLawnBg-${team})`} />

                {/* Petak-Petak Rumput Siber (Checkered PvZ Lawn Grid 8 Kolom x 3 Baris) */}
                {[0, 1, 2].map((row) =>
                  [0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
                    const isEven = (row + col) % 2 === 0;
                    const tileX = 64 + col * 68;
                    const tileY = 18 + row * 48;
                    return (
                      <rect
                        key={`${row}-${col}`}
                        x={tileX}
                        y={tileY}
                        width="68"
                        height="48"
                        fill={
                          col >= 7
                            ? '#1e1b4b'
                            : isEven
                            ? '#065f46'
                            : '#047857'
                        }
                        fillOpacity={col >= 7 ? '0.75' : '0.55'}
                        stroke="#10b981"
                        strokeOpacity="0.22"
                        strokeWidth="1"
                      />
                    );
                  })
                )}

                {/* Zona Gelap Kemunculan Robot Jahat di Sisi Kanan (Robot Spawn Zone) */}
                <rect x="608" y="18" width="72" height="144" fill="#0f172a" opacity="0.7" />
                <line x1="608" y1="18" x2="608" y2="162" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5 4" />
                <text x="644" y="32" textAnchor="middle" fill="#fb7185" fontSize="7.5" fontWeight="900">
                  ZONA INVASI
                </text>

                {/* ----------------------------------------------------------- */}
                {/* MARKAS INTI SERVER & PEMOTONG RUMPUT EMP (SISI PALING KIRI) */}
                {/* ----------------------------------------------------------- */}
                <rect x="4" y="18" width="56" height="144" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="32" y="34" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontWeight="900">
                  INTI DATA
                </text>
                {/* Otak / Server Core yang Dilindungi */}
                <circle cx="32" cy="72" r="14" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="32" y="77" textAnchor="middle" fontSize="14">
                  🧠
                </text>
                {/* EMP Lawnmower (Traktor Pelindung Terakhir ala PvZ) */}
                <g transform="translate(14, 118)">
                  <rect x="0" y="6" width="34" height="18" rx="4" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
                  <polygon points="34,8 44,14 34,22" fill="#f59e0b" />
                  <circle cx="8" cy="25" r="5" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="26" cy="25" r="5" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                  <text x="17" y="18" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="900">
                    EMP
                  </text>
                </g>

                {/* ----------------------------------------------------------- */}
                {/* BARISAN PERTAHANAN PENEMBAK SIBER (ALA TANAMAN PVZ DI KIRI) */}
                {/* ----------------------------------------------------------- */}

                {/* 1. Penembak Pendukung Atas (Mini Pea-Laser Bot di Lajur Atas) */}
                <g transform="translate(155, 42)">
                  <ellipse cx="0" cy="14" rx="16" ry="5" fill="#022c22" opacity="0.7" />
                  <path d="M-10,14 L0,2 L10,14 Z" fill="#059669" stroke="#6ee7b7" strokeWidth="1.5" />
                  <circle cx="0" cy="-4" r="11" fill={`url(#peaTurretGrad-${team})`} stroke="#a7f3d0" strokeWidth="1.8" />
                  <rect x="8" y="-9" width="14" height="9" rx="3" fill="#047857" stroke="#6ee7b7" strokeWidth="1.5" />
                  <circle cx="2" cy="-6" r="3" fill="#0f172a" />
                  <circle cx="3" cy="-7" r="1.2" fill="#38bdf8" />
                </g>

                {/* 2. Penembak Pendukung Bawah (Mini Pea-Laser Bot di Lajur Bawah) */}
                <g transform="translate(155, 138)">
                  <ellipse cx="0" cy="14" rx="16" ry="5" fill="#022c22" opacity="0.7" />
                  <path d="M-10,14 L0,2 L10,14 Z" fill="#059669" stroke="#6ee7b7" strokeWidth="1.5" />
                  <circle cx="0" cy="-4" r="11" fill={`url(#peaTurretGrad-${team})`} stroke="#a7f3d0" strokeWidth="1.8" />
                  <rect x="8" y="-9" width="14" height="9" rx="3" fill="#047857" stroke="#6ee7b7" strokeWidth="1.5" />
                  <circle cx="2" cy="-6" r="3" fill="#0f172a" />
                  <circle cx="3" cy="-7" r="1.2" fill="#38bdf8" />
                </g>

                {/* 3. Kolom 1 Lajur Tengah (x=96, y=94): GENERATOR SURYA SIBER (Cyber-Sunflower) */}
                <g transform="translate(96, 94)">
                  <ellipse cx="0" cy="20" rx="18" ry="6" fill="#022c22" opacity="0.7" />
                  {/* Batang & Daun Mekanik */}
                  <line x1="0" y1="20" x2="0" y2="-2" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
                  <ellipse cx="-9" cy="14" rx="8" ry="4" fill="#10b981" transform="rotate(-20 -9 14)" />
                  <ellipse cx="9" cy="14" rx="8" ry="4" fill="#10b981" transform="rotate(20 9 14)" />
                  {/* Kelopak Surya Emas */}
                  <circle cx="0" cy="-6" r="16" fill="#f59e0b" stroke="#fde047" strokeWidth="2.5" strokeDasharray="6 3" />
                  <circle cx="0" cy="-6" r="11" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
                  {/* Wajah Ramah Cyber-Sunflower */}
                  <circle cx="-4" cy="-8" r="2" fill="#fde047" />
                  <circle cx="4" cy="-8" r="2" fill="#fde047" />
                  <path d="M-4,-3 Q0,1 4,-3" fill="none" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* 4. Kolom 2 Lajur Tengah (x=164, y=94): MERIAM PENEMBAK UTAMA (Cyber Gatling Pea-Shooter) */}
                <g
                  transform={`translate(${laserOn ? 158 : 164}, 94)`}
                  style={{ transition: 'transform 120ms ease-out' }}
                >
                  <ellipse cx="0" cy="22" rx="22" ry="7" fill="#022c22" opacity="0.8" />
                  {/* Kaki Tripod Tanaman Mekanik */}
                  <path d="M-16,22 L-6,4 L6,4 L16,22 Z" fill="#047857" stroke="#34d399" strokeWidth="2" />
                  {/* Kepala Meriam Bulat Ala Peashooter */}
                  <circle cx="0" cy="-8" r="18" fill={`url(#peaTurretGrad-${team})`} stroke="#a7f3d0" strokeWidth="2.5" />
                  {/* Helm / Crest Penembak */}
                  <polygon points="-12,-22 0,-32 10,-22" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
                  {/* Visor Mata Penembak */}
                  <rect x="-4" y="-16" width="16" height="9" rx="3" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
                  <polygon points="-1,-13 8,-11 -1,-9" fill="#38bdf8" />
                  {/* Laras Moncong Tembakan Plasma Ganda (Pea Cannon Mouth) */}
                  <rect x="14" y="-15" width="18" height="13" rx="4" fill="#065f46" stroke="#6ee7b7" strokeWidth="2" />
                  <ellipse cx="32" cy="-8.5" rx="4" ry="7.5" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                  {/* Efek Kilatan Moncong Saat Menembak */}
                  {(laserOn || tdWalkTick % 2 === 0) && (
                    <circle
                      cx="36"
                      cy="-8.5"
                      r={laserOn ? 9 : 4}
                      fill={laserOn ? '#fde047' : '#34d399'}
                      opacity="0.9"
                    />
                  )}
                </g>

                {/* 5. Kolom 3 Lajur Tengah (x=224, y=94): ROBOT PERISAI BAJA (Cyber Wall-Nut Shield) */}
                <g transform="translate(224, 94)">
                  <ellipse cx="0" cy="22" rx="18" ry="6" fill="#022c22" opacity="0.75" />
                  <rect
                    x="-15"
                    y="-18"
                    width="30"
                    height="40"
                    rx="10"
                    fill="#334155"
                    stroke={dist <= 28 ? '#f43f5e' : '#38bdf8'}
                    strokeWidth="2.5"
                  />
                  <rect x="-11" y="-12" width="22" height="28" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                  {/* Mata Tangguh Wall-Bot */}
                  <circle cx="-4" cy="-4" r="2.5" fill="#38bdf8" />
                  <circle cx="5" cy="-4" r="2.5" fill="#38bdf8" />
                  <line x1="-6" y1="-8" x2="-1" y2="-6" stroke="#bae6fd" strokeWidth="2" />
                  <line x1="7" y1="-8" x2="2" y2="-6" stroke="#bae6fd" strokeWidth="2" />
                  {/* Perisai Energi Hologram di Depan Wall-Bot */}
                  <path
                    d="M 18 -22 Q 25 2, 18 24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    opacity="0.85"
                  />
                </g>

                {/* ----------------------------------------------------------- */}
                {/* PELURU TEMBAKAN PLASMA PEA-SHOTS MELESAT KE ROBOT JAHAT     */}
                {/* ----------------------------------------------------------- */}
                {laserOn ? (
                  <g>
                    {/* Sinar Tembakan Super & Rentetan Bola Plasma Pea saat Jawaban Benar */}
                    <line
                      x1="196"
                      y1="85"
                      x2={enemySvgX - 10}
                      y2="85"
                      stroke="#34d399"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.45"
                    />
                    {[0.2, 0.45, 0.7, 0.92].map((ratio, idx) => {
                      const bx = 200 + (enemySvgX - 210) * ratio;
                      return (
                        <g key={idx} transform={`translate(${bx}, 85)`}>
                          <circle cx="0" cy="0" r="9" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                          <circle cx="-2" cy="-2" r="3" fill="#a7f3d0" />
                        </g>
                      );
                    })}
                    {/* Ledakan Hancur pada Tubuh Robot Jahat */}
                    <g transform={`translate(${enemySvgX - 8}, 82)`}>
                      <polygon
                        points="0,-32 9,-10 32,-16 15,3 28,24 4,14 -14,28 -11,5 -32,-6 -10,-12"
                        fill="#f59e0b"
                        stroke="#fef08a"
                        strokeWidth="2.5"
                      />
                      <text x="0" y="4" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="900">
                        BOOM!
                      </text>
                    </g>
                  </g>
                ) : picked === null ? (
                  /* Tembakan Peluru Plasma Penjaga Rutin (Pea Projectiles) */
                  <g>
                    <circle
                      cx={205 + ((tdWalkTick * 38) % Math.max(40, enemySvgX - 220))}
                      cy="85"
                      r="6.5"
                      fill="#34d399"
                      stroke="#ecfdf5"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={185 + (((tdWalkTick + 2) * 45) % 340)}
                      cy="38"
                      r="4.5"
                      fill="#38bdf8"
                    />
                    <circle
                      cx={185 + (((tdWalkTick + 1) * 45) % 340)}
                      cy="134"
                      r="4.5"
                      fill="#38bdf8"
                    />
                  </g>
                ) : null}

                {/* ----------------------------------------------------------- */}
                {/* PASUKAN ROBOT JAHAT 2D FULL BODY (BERJALAN DARI KANAN)      */}
                {/* ----------------------------------------------------------- */}
                <g
                  transform={`translate(${enemySvgX}, 116)`}
                  style={{ transition: 'transform 450ms linear' }}
                >
                  {/* Bayangan Kaki Robot Jahat */}
                  <ellipse cx="0" cy="6" rx="22" ry="6" fill="#000000" opacity="0.55" />

                  {/* Kaki Mekanik Robot Jahat Berjalan (Animasi Langkah) */}
                  <line
                    x1="-6"
                    y1="-22"
                    x2={-10 + legSwing}
                    y2="4"
                    stroke="#475569"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <rect x={-18 + legSwing} y="0" width="14" height="6" rx="2" fill="#9f1239" />

                  <line
                    x1="6"
                    y1="-22"
                    x2={10 - legSwing}
                    y2="4"
                    stroke="#334155"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <rect x={2 - legSwing} y="0" width="14" height="6" rx="2" fill="#be123c" />

                  {/* Tubuh Baja Robot Jahat (Bungkuk Maju ala Zombie-Bot) */}
                  <g transform={`rotate(-8) scale(${isBossWave ? 1.18 : 1})`}>
                    <rect
                      x="-16"
                      y="-58"
                      width="32"
                      height="38"
                      rx="6"
                      fill={`url(#evilBotGrad-${team})`}
                      stroke="#fda4af"
                      strokeWidth="2"
                    />
                    {/* Simbol Bahaya / Tengkorak Siber di Dada Robot Jahat */}
                    <circle cx="0" cy="-40" r="8" fill="#090d16" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="0" y="-36" textAnchor="middle" fontSize="9" fill="#fb7185">
                      ☠
                    </text>

                    {/* Kedua Lengan Robot Jahat Menjulur ke Depan (Gaya Zombie Menyerang) */}
                    <line
                      x1="-10"
                      y1="-50"
                      x2="-36"
                      y2={-46 + armBob}
                      stroke="#64748b"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                    />
                    {/* Capit Cakar Kiri */}
                    <path
                      d={`M -36 ${-46 + armBob} L -45 ${-51 + armBob} M -36 ${-46 + armBob} L -45 ${-41 + armBob}`}
                      stroke="#f43f5e"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <line
                      x1="-4"
                      y1="-44"
                      x2="-32"
                      y2={-36 - armBob}
                      stroke="#94a3b8"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                    />
                    {/* Capit Cakar Kanan */}
                    <path
                      d={`M -32 ${-36 - armBob} L -41 ${-41 - armBob} M -32 ${-36 - armBob} L -41 ${-31 - armBob}`}
                      stroke="#f43f5e"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Kepala Robot Jahat */}
                    <rect
                      x="-15"
                      y="-82"
                      width="28"
                      height="22"
                      rx="5"
                      fill="#4c0519"
                      stroke="#fb7185"
                      strokeWidth="2"
                    />
                    {/* Mata Merah Menyala Jahat */}
                    <circle cx="-7" cy="-73" r="3.5" fill="#ef4444" />
                    <circle cx="-7" cy="-73" r="1.5" fill="#fef08a" />
                    <circle cx="3" cy="-73" r="3.5" fill="#ef4444" />
                    <circle cx="3" cy="-73" r="1.5" fill="#fef08a" />
                    {/* Mulut Bergerigi Besi */}
                    <rect x="-11" y="-66" width="16" height="4" fill="#090d16" />
                    <line x1="-8" y1="-66" x2="-8" y2="-62" stroke="#e2e8f0" strokeWidth="1.5" />
                    <line x1="-3" y1="-66" x2="-3" y2="-62" stroke="#e2e8f0" strokeWidth="1.5" />
                    <line x1="2" y1="-66" x2="2" y2="-62" stroke="#e2e8f0" strokeWidth="1.5" />

                    {/* Topi Kerucut / Ember Baja ala Conehead/Buckethead Zombie atau Tanduk Boss */}
                    {isBossWave ? (
                      <>
                        <polygon points="-14,-82 -24,-98 -6,-82" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.2" />
                        <polygon points="12,-82 22,-98 4,-82" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.2" />
                      </>
                    ) : (
                      <polygon
                        points="-14,-82 12,-82 0,-102"
                        fill="#f97316"
                        stroke="#fed7aa"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>

                  {/* Bar HP & Nama Robot Jahat di Atas Kepalanya */}
                  <g transform="translate(0, -106)">
                    <rect x="-42" y="-12" width="84" height="14" rx="4" fill="#090d16" stroke="#f43f5e" strokeWidth="1" />
                    <text x="0" y="-2.5" textAnchor="middle" fill="#fda4af" fontSize="7.5" fontWeight="900">
                      {isBossWave ? '👹 BOSS: ' : '🤖 '}
                      {wave.enemyName.slice(0, 14)}
                    </text>
                  </g>
                </g>

                {/* Robot Jahat Cadangan yang Mengantre di Zona Invasi Kanan */}
                <g transform="translate(648, 62) scale(0.68)" opacity="0.75">
                  <rect x="-12" y="-45" width="24" height="30" rx="4" fill="#881337" stroke="#fb7185" strokeWidth="1.5" />
                  <rect x="-10" y="-64" width="20" height="17" rx="4" fill="#4c0519" stroke="#fb7185" strokeWidth="1.5" />
                  <circle cx="-4" cy="-56" r="2.5" fill="#ef4444" />
                  <circle cx="4" cy="-56" r="2.5" fill="#ef4444" />
                  <line x1="-8" y1="-38" x2="-24" y2="-36" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
                </g>

                {/* Sinar Serangan Balik Robot Jahat Jika Salah Pilih Amunisi */}
                {shotState === 'hit-wrong' && (
                  <g>
                    <line
                      x1={enemySvgX - 30}
                      y1="82"
                      x2="235"
                      y2="88"
                      stroke="#f43f5e"
                      strokeWidth="5"
                      strokeDasharray="8 4"
                    />
                    <text x="310" y="65" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="900">
                      ⚠️ PERISAI ROBOT JAHAT MENANGKIS TEMBAKAN!
                    </text>
                  </g>
                )}
              </svg>

              {/* Status Bar Bawah Lajur Pertahanan */}
              <div className="px-3 py-1 bg-slate-950/95 border-t border-emerald-500/30 flex items-center justify-between text-[10px] font-bold">
                <span className="text-emerald-400">
                  🌻 Skuad Penembak Siber Siaga
                </span>
                <span className={dist <= 35 ? 'text-rose-400 animate-pulse font-black' : 'text-amber-300'}>
                  🤖 Posisi Robot Jahat: {Math.round(dist)}m dari Benteng ({dist <= 35 ? 'BAHAYA DEKAT!' : 'Berjalan Maju...'})
                </span>
              </div>
            </div>

            {/* Kotak Soal Skenario Serangan Robot Jahat */}
            <div className="p-2.5 rounded-2xl bg-slate-900 border border-emerald-500/40 text-white">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  🎯 TARGET TEMBAKAN PENEMBAK SIBER ({wave.enemyName}):
                </span>
                <span className="text-[10px] text-amber-300 italic line-clamp-1">
                  "{wave.scenario}"
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold leading-snug">
                {wave.question}
              </h3>
            </div>
          </div>

          {/* KARTU AMUNISI TEMBAKAN ALA SEED PACKET PLANTS VS ZOMBIES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-auto">
            {wave.turretOptions.map((opt, idx) => {
              const isRight = idx === wave.correctIndex;
              const isChosen = picked === idx;
              const ammo = AMMO_CARDS[idx % AMMO_CARDS.length];

              let cls =
                'border-emerald-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-500 text-slate-800 dark:text-slate-100';
              if (picked !== null) {
                if (isRight)
                  cls =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-400/50';
                else if (isChosen)
                  cls =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400/50';
                else cls = 'opacity-50 border-slate-200 dark:border-slate-800';
              }
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={picked !== null}
                  onClick={() => handleFireTurret(team, idx)}
                  className={`p-2.5 rounded-2xl border-2 text-left text-xs transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer shadow-xs ${cls}`}
                >
                  {/* Ikon Kartu Senjata PvZ */}
                  <div
                    className={`w-11 h-12 rounded-xl ${ammo.badgeBg} text-white flex flex-col items-center justify-between p-1 shrink-0 shadow-sm border border-white/25`}
                  >
                    <span className="text-[9px] font-black leading-none">🔫 {ammo.code}</span>
                    <Crosshair className="w-3.5 h-3.5" />
                    <span className="text-[8px] font-mono font-black bg-slate-950/70 px-1 rounded">
                      {ammo.cost}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider block"
                      style={{ color: ammo.color }}
                    >
                      TEMBAK: {ammo.name}
                    </span>
                    <span className="leading-snug font-semibold line-clamp-2">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {picked !== null ? (
            <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-2">
                {picked === wave.correctIndex
                  ? `💥 TEMBAKAN TELAK! Robot Jahat "${wave.enemyName}" Hancur! (+Bonus Cepat ${speedBonus || 0} Pts)`
                  : `❌ Tembakan Meleset! Robot Jahat maju menyerang! ${wave.explanation}`}
              </span>
              <button
                type="button"
                onClick={() => handleNextWave(team)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shrink-0 flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <span>Gelombang Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-[11px] text-center font-bold text-emerald-600 dark:text-emerald-400">
              🌻🔫 Pilih kartu tembakan yang tepat untuk menembak jatuh Robot Jahat sebelum mencapai Inti Server!
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="h-full min-h-0 flex flex-col justify-between gap-2.5 overflow-y-auto">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950 border-2 border-emerald-500/50 text-white flex flex-wrap items-center justify-between gap-2 shrink-0 shadow-lg">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center gap-1.5 uppercase">
              <Crosshair className="w-4 h-4 text-emerald-400" />
              <span>Penembak Siber vs Robot Jahat (Mode PvZ)</span>
            </span>
            <span className="text-sky-300">{blueLabel}: {blueScore} Pts</span>
            <span className="text-slate-600">|</span>
            <span className="text-rose-300">{redLabel}: {redScore} Pts</span>
          </div>
          {renderGameControlButtons()}
        </div>

        {!isArenaFinished && (
          <div
            className={`flex-1 min-h-0 ${
              isSplitMultiplayer ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'flex flex-col'
            }`}
          >
            {renderTdPlayerPanel('blue')}
            {isSplitMultiplayer && renderTdPlayerPanel('red')}
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // RENDER 8: KETUK VIRUS (SPLIT-SCREEN DUEL/KELOMPOK + SPEED BONUS)
  // ============================================================================
  if (gameType === 'whack-a-mole') {
    const handleWhackPortal = (holeIdx: number, team: 'blue' | 'red' = 'blue') => {
      if (!moleRunning || isArenaFinished) return;
      const isRedSide = team === 'red';
      const item = isRedSide ? redActivePortals[holeIdx] : activePortals[holeIdx];
      if (!item) return;

      if (isRedSide) {
        setRedActivePortals((prev) => {
          const next = { ...prev };
          delete next[holeIdx];
          return next;
        });
      } else {
        setActivePortals((prev) => {
          const next = { ...prev };
          delete next[holeIdx];
          return next;
        });
      }

      const isVirusTarget = !item.isSafeValid;
      // Semakin cepat mengetuk sejak portal muncul, semakin tinggi poinnya (25 s/d 50 Poin)!
      const reactionMs = Math.max(50, Date.now() - portalSpawnTime);
      const speedBonus = Math.max(5, Math.min(25, Math.round((1500 - reactionMs) / 55)));
      const totalPts = 25 + speedBonus;

      if (isVirusTarget) {
        if (isRedSide) setRedMoleHits((h) => h + 1);
        else setMoleHits((h) => h + 1);
        setMoleFeedback({
          text: `💥 VIRUS DIBASMI! +${totalPts} Poin (Bonus Cepat +${speedBonus}!)`,
          good: true
        });
        onTriggerCombat(true, totalPts, 10, team);
      } else {
        if (isRedSide) setRedMoleMistakes((m) => m + 1);
        else setMoleMistakes((m) => m + 1);
        setMoleFeedback({
          text: `⚠️ Awas! Itu File Sistem Aman (${item.label})`,
          good: false
        });
        onTriggerCombat(false, 0, 10, team);
      }
    };

    const renderPortalGrid = (portals: Record<number, WhackMoleItem>, team: 'blue' | 'red') => (
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-[210px]">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((holeIdx) => {
          const item = portals[holeIdx];
          const isVirus = item ? !item.isSafeValid : false;

          return (
            <button
              key={holeIdx}
              type="button"
              disabled={!moleRunning || !item}
              onClick={() => handleWhackPortal(holeIdx, team)}
              className={`rounded-2xl border-2 p-2 sm:p-2.5 flex flex-col items-center justify-center text-center transition-all touch-manipulation select-none ${
                !item
                  ? 'border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/60 text-slate-400'
                  : isVirus
                  ? 'border-rose-500 bg-gradient-to-b from-rose-900 via-rose-950 to-slate-950 text-white shadow-[0_0_18px_rgba(244,63,94,0.45)] hover:scale-[1.02] active:scale-90 cursor-pointer'
                  : 'border-emerald-500/80 bg-gradient-to-b from-emerald-950 to-slate-950 text-emerald-100 shadow-sm active:scale-95 cursor-pointer'
              }`}
            >
              {item ? (
                <>
                  <span
                    className={`text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-1 flex items-center gap-1 ${
                      isVirus
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-emerald-500/30 border border-emerald-400/50 text-emerald-200'
                    }`}
                  >
                    {isVirus ? '🦠 VIRUS · KETUK!' : '🛡️ FILE AMAN'}
                  </span>
                  <span className="text-[11px] sm:text-xs font-extrabold leading-snug line-clamp-2">
                    {item.label}
                  </span>
                </>
              ) : (
                <span className="text-[10px] font-mono opacity-40">PORTAL #{holeIdx + 1}</span>
              )}
            </button>
          );
        })}
      </div>
    );

    return (
      <div className="h-full min-h-0 flex flex-col justify-between gap-2.5 overflow-y-auto">
        <div className="p-3 sm:p-3.5 rounded-3xl bg-slate-950 border-2 border-emerald-500/50 text-white shadow-lg flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 block">
              ⚡ Ketuk Lebih Cepat = Poin Lebih Banyak (+25 s/d +50 Poin per Virus!)
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold text-white">
              🎯 Ketuk semua <span className="text-rose-400 underline">🦠 VIRUS / BUG (Merah)</span>, hindari <span className="text-emerald-400">🛡️ File Aman (Hijau)</span>!
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {moleFeedback && (
              <span
                className={`px-2.5 py-1 rounded-xl text-xs font-black ${
                  moleFeedback.good
                    ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-400'
                    : 'bg-rose-900/90 text-rose-200 border border-rose-400'
                }`}
              >
                {moleFeedback.text}
              </span>
            )}
            <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold">
              ⏱️ <span className="text-amber-400 font-mono">{moleTimeLeft}s</span>
            </div>
            {renderGameControlButtons()}
          </div>
        </div>

        <div className="flex-1 min-h-0 p-3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col">
          {isSplitMultiplayer ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
              <div className="p-2.5 rounded-2xl bg-sky-950/15 border-2 border-sky-500/50 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-black text-sky-600 dark:text-sky-300">
                  <span>🔵 LAYAR {blueLabel} ({blueScore} Pts)</span>
                  <span>🦠 Dibasmi: {moleHits} | Salah: {moleMistakes}</span>
                </div>
                {renderPortalGrid(activePortals, 'blue')}
              </div>

              <div className="p-2.5 rounded-2xl bg-rose-950/15 border-2 border-rose-500/50 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-black text-rose-600 dark:text-rose-300">
                  <span>🔴 LAYAR {redLabel} ({redScore} Pts)</span>
                  <span>🦠 Dibasmi: {redMoleHits} | Salah: {redMoleMistakes}</span>
                </div>
                {renderPortalGrid(redActivePortals, 'red')}
              </div>
            </div>
          ) : (
            renderPortalGrid(activePortals, 'blue')
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER 9: LABIRIN KODING ALGORITMA (BEBAS DOUBLE-KLIK + MODE RONDE + SPLIT-SCREEN)
  // ============================================================================
  if (gameType === 'robo-maze') {
    const addCommand = (cmd: 'MAJU' | 'KIRI' | 'KANAN' | 'LOMPAT', team: 'blue' | 'red' = 'blue') => {
      const now = Date.now();
      if (team === 'red') {
        if (now - lastRedMazeClickRef.current < 160) return;
        lastRedMazeClickRef.current = now;
        if (redMazeStatus !== 'planning') return;
        playClick();
        setRedRobotCommands((prev) => [...prev, cmd]);
      } else {
        if (now - lastBlueMazeClickRef.current < 160) return;
        lastBlueMazeClickRef.current = now;
        if (mazeStatus !== 'planning') return;
        playClick();
        setRobotCommands((prev) => [...prev, cmd]);
      }
    };

    const removeLastCommand = (team: 'blue' | 'red' = 'blue') => {
      const now = Date.now();
      if (team === 'red') {
        if (now - lastRedMazeClickRef.current < 160) return;
        lastRedMazeClickRef.current = now;
        playClick();
        setRedRobotCommands((prev) => prev.slice(0, -1));
      } else {
        if (now - lastBlueMazeClickRef.current < 160) return;
        lastBlueMazeClickRef.current = now;
        playClick();
        setRobotCommands((prev) => prev.slice(0, -1));
      }
    };

    const runMazeSimulation = (team: 'blue' | 'red' = 'blue') => {
      const now = Date.now();
      if (team === 'red') {
        if (now - lastRedMazeClickRef.current < 200) return;
        lastRedMazeClickRef.current = now;
      } else {
        if (now - lastBlueMazeClickRef.current < 200) return;
        lastBlueMazeClickRef.current = now;
      }

      playClick();
      const maze = team === 'red' ? activeRedMaze : activeBlueMaze;
      const cmds = team === 'red' ? redRobotCommands : robotCommands;
      let [r, c] = maze.startPos;

      for (const cmd of cmds) {
        if (cmd === 'MAJU') r = Math.max(0, r - 1);
        else if (cmd === 'LOMPAT') r = Math.max(0, r - 2);
        else if (cmd === 'KIRI') c = Math.max(0, c - 1);
        else if (cmd === 'KANAN') c = Math.min(4, c + 1);

        const hitLaser = maze.lasers.some(([lr, lc]) => lr === r && lc === c);
        if (hitLaser) {
          if (team === 'red') {
            setRedRobotPos([r, c]);
            setRedMazeStatus('crashed');
          } else {
            setRobotPos([r, c]);
            setMazeStatus('crashed');
          }
          onTriggerCombat(false, 0, 15, team);
          return;
        }
      }

      if (team === 'red') setRedRobotPos([r, c]);
      else setRobotPos([r, c]);

      if (r === maze.goalPos[0] && c === maze.goalPos[1]) {
        playSuccess();
        if (team === 'red') setRedMazeStatus('checkpoint');
        else setMazeStatus('checkpoint');
      } else {
        if (team === 'red') setRedMazeStatus('crashed');
        else setMazeStatus('crashed');
        onTriggerCombat(false, 0, 15, team);
      }
    };

    const handleAnswerCheckpoint = (team: 'blue' | 'red', oIdx: number) => {
      const isBlue = team === 'blue';
      const maze = isBlue ? activeBlueMaze : activeRedMaze;
      const ok = oIdx === maze.checkpointCorrectIndex;
      const speedBonus = ok ? getLiveSpeedBonus(team, 100) : 0;

      if (isBlue) {
        setBlueLastSpeedBonus(speedBonus);
        setMazeStatus('success');
      } else {
        setRedLastSpeedBonus(speedBonus);
        setRedMazeStatus('success');
      }

      onTriggerCombat(ok, ok ? 120 + speedBonus : 0, Math.round(100 / totalRounds), team);
    };

    const handleNextMazeRound = (team: 'blue' | 'red') => {
      playClick();
      if (team === 'blue') {
        const nextIdx = blueMazeIdx + 1;
        setBlueMazeIdx(nextIdx);
        const nextMaze = pack.blueMazes[nextIdx % pack.blueMazes.length] || pack.blueMazes[0];
        setRobotPos(nextMaze.startPos);
        setRobotCommands([]);
        setMazeStatus('planning');
        setBlueLastSpeedBonus(null);
        blueQStartRef.current = Date.now();
      } else {
        const nextIdx = redMazeIdx + 1;
        setRedMazeIdx(nextIdx);
        const nextMaze = pack.redMazes[nextIdx % pack.redMazes.length] || pack.redMazes[0];
        setRedRobotPos(nextMaze.startPos);
        setRedRobotCommands([]);
        setRedMazeStatus('planning');
        setRedLastSpeedBonus(null);
        redQStartRef.current = Date.now();
      }
    };

    const renderMazePlayerPanel = (team: 'blue' | 'red') => {
      const isBlue = team === 'blue';
      const mIdx = isBlue ? blueMazeIdx : redMazeIdx;
      if (mIdx >= totalRounds) return renderPlayerFinishedCard(team);

      const maze = isBlue ? activeBlueMaze : activeRedMaze;
      const pos = isBlue ? robotPos : redRobotPos;
      const cmds = isBlue ? robotCommands : redRobotCommands;
      const status = isBlue ? mazeStatus : redMazeStatus;
      const speedBonus = isBlue ? blueLastSpeedBonus : redLastSpeedBonus;
      const liveBonus = getLiveSpeedBonus(team, 100);

      return (
        <div
          className={`flex-1 min-h-0 p-3.5 rounded-3xl border-2 flex flex-col justify-between gap-2.5 shadow-lg ${
            isBlue
              ? 'bg-sky-950/15 dark:bg-slate-900 border-sky-500/60'
              : 'bg-rose-950/15 dark:bg-slate-900 border-rose-500/60'
          }`}
        >
          {/* Header & Peta Labirin 5x5 Milik Pemain Ini */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-white">
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase text-white ${
                    isBlue ? 'bg-sky-600' : 'bg-rose-600'
                  }`}
                >
                  {isBlue ? `🚀 ${blueLabel}` : `🔥 ${redLabel}`} · Ronde {mIdx + 1}/{totalRounds}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black">
                  ⚡ Bonus Cepat: +{status === 'success' ? speedBonus || 0 : liveBonus} Pts
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-black text-white">
                {maze.title}: {maze.missionDesc}
              </h4>
              <p className="text-[11px] text-slate-300 leading-snug">
                <strong className="text-sky-300">MAJU</strong>=naik 1,{' '}
                <strong className="text-amber-300">LOMPAT</strong>=naik 2 (lompati ⚡),{' '}
                <strong className="text-emerald-300">KIRI/KANAN</strong>=geser 1 kotak ke 💎.
              </p>
            </div>

            {/* Grid 5x5 */}
            <div className="grid grid-cols-5 gap-1 p-1.5 rounded-2xl bg-slate-900 border-2 border-slate-700 w-36 h-36 sm:w-40 sm:h-40 shrink-0">
              {Array.from({ length: 25 }).map((_, i) => {
                const r = Math.floor(i / 5);
                const c = i % 5;
                const isRobotHere = pos[0] === r && pos[1] === c;
                const isGoal = maze.goalPos[0] === r && maze.goalPos[1] === c;
                const isLaser = maze.lasers.some(([lr, lc]) => lr === r && lc === c);

                return (
                  <div
                    key={i}
                    className={`rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                      isRobotHere
                        ? isBlue
                          ? 'border-sky-400 bg-sky-500/30 shadow-[0_0_8px_#38bdf8]'
                          : 'border-rose-400 bg-rose-500/30 shadow-[0_0_8px_#f43f5e]'
                        : isGoal
                        ? 'border-emerald-400 bg-emerald-500/20 animate-pulse'
                        : isLaser
                        ? 'border-rose-500/60 bg-rose-950/60'
                        : 'border-slate-800 bg-slate-950'
                    }`}
                  >
                    {isRobotHere ? (isBlue ? '🚀' : '🔥') : isGoal ? '💎' : isLaser ? '⚡' : ''}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Area Checkpoint atau Susun Blok Perintah */}
          {status === 'checkpoint' ? (
            <div className="space-y-2 my-auto">
              <div className="p-2.5 rounded-2xl bg-emerald-950 border border-emerald-400 text-emerald-100">
                <span className="text-[10px] font-black uppercase text-emerald-300 block">
                  💎 SOAL CHECKPOINT SERVER ({isBlue ? blueLabel : redLabel}):
                </span>
                <p className="text-xs font-bold">{maze.checkpointQuestion}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {maze.checkpointOptions.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleAnswerCheckpoint(team, oIdx)}
                    className="p-2.5 rounded-xl border-2 border-emerald-400 bg-emerald-50 dark:bg-slate-800 hover:bg-emerald-100 text-left text-xs font-bold text-slate-900 dark:text-white cursor-pointer active:scale-95"
                  >
                    {String.fromCharCode(65 + oIdx)}. {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : status === 'success' ? (
            <div className="p-3 rounded-2xl bg-emerald-950/90 border border-emerald-400 text-emerald-100 flex items-center justify-between gap-2 my-auto">
              <span className="text-xs font-bold">
                🎉 Ronde {mIdx + 1} Tuntas! (+{120 + (speedBonus || 0)} Poin · Bonus Cepat +{speedBonus || 0})
              </span>
              <button
                type="button"
                onClick={() => handleNextMazeRound(team)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Ronde Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-2 my-auto">
              {/* Baris Blok Algoritma yang Sudah Disusun */}
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 min-h-10 flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex flex-wrap items-center gap-1">
                  {cmds.length === 0 ? (
                    <span className="text-[11px] text-slate-400 italic">
                      Klik tombol perintah satu per satu untuk menyusun langkah menuju 💎...
                    </span>
                  ) : (
                    cmds.map((cmd, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded-lg text-white font-mono text-[11px] font-bold ${
                          isBlue ? 'bg-sky-600' : 'bg-rose-600'
                        }`}
                      >
                        {idx + 1}.{cmd}
                      </span>
                    ))
                  )}
                </div>
                {cmds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => removeLastCommand(team)}
                    className="px-2 py-0.5 rounded-lg bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 text-[11px] font-bold cursor-pointer"
                  >
                    ⌫ Hapus 1
                  </button>
                )}
              </div>

              {/* Tombol Perintah (Anti Double-Click: Hanya 1 Handler onClick + Cooldown) */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {(['MAJU', 'KIRI', 'KANAN', 'LOMPAT'] as const).map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      disabled={status !== 'planning'}
                      onClick={() => addCommand(cmd, team)}
                      className={`px-3 py-2 rounded-xl text-white text-xs font-black active:scale-95 transition-transform cursor-pointer disabled:opacity-40 ${
                        isBlue ? 'bg-sky-600 hover:bg-sky-500' : 'bg-rose-600 hover:bg-rose-500'
                      }`}
                    >
                      + {cmd}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={status !== 'planning' || cmds.length === 0}
                    onClick={() => runMazeSimulation(team)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-black flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Jalankan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      if (isBlue) {
                        setRobotPos(maze.startPos);
                        setRobotCommands([]);
                        setMazeStatus('planning');
                      } else {
                        setRedRobotPos(maze.startPos);
                        setRedRobotCommands([]);
                        setRedMazeStatus('planning');
                      }
                    }}
                    className="px-2.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
                  >
                    ↺ Ulang
                  </button>
                </div>
              </div>

              {status === 'crashed' && (
                <div className="text-xs font-bold text-rose-500 flex items-center justify-between">
                  <span>💥 Menabrak laser ⚡ atau belum sampai di 💎! Klik "↺ Ulang" untuk memperbaiki.</span>
                </div>
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="h-full min-h-0 flex flex-col justify-between gap-2.5 overflow-y-auto">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950 border border-purple-500/50 text-white flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 text-xs font-black">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>
              Labirin Koding Algoritma ({totalRounds} Ronde) · {blueLabel}: {blueScore} Pts | {redLabel}: {redScore} Pts
            </span>
          </div>
          {renderGameControlButtons()}
        </div>

        {!isArenaFinished && (
          <div
            className={`flex-1 min-h-0 ${
              isSplitMultiplayer ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'flex flex-col'
            }`}
          >
            {renderMazePlayerPanel('blue')}
            {isSplitMultiplayer && renderMazePlayerPanel('red')}
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // RENDER 10: RODA KEBERUNTUNGAN & KOTAK MISTERI (SPLIT-SCREEN DUEL/KELOMPOK)
  // ============================================================================
  if (gameType === 'spin-wheel') {
    const handleSpinForTeam = (team: 'blue' | 'red') => {
      const isBlue = team === 'blue';
      if (isBlue && blueSpinning) return;
      if (!isBlue && redSpinning) return;
      playClick();

      const chosenIdx = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
      const extraSpins = 360 * 3 + chosenIdx * 60;

      if (isBlue) {
        setBlueSpinning(true);
        setBlueWheelRot((r) => r + extraSpins);
        setTimeout(() => {
          setBlueSpinning(false);
          setBlueSegment(WHEEL_SEGMENTS[chosenIdx]);
          playSuccess();
        }, 700);
      } else {
        setRedSpinning(true);
        setRedWheelRot((r) => r + extraSpins);
        setTimeout(() => {
          setRedSpinning(false);
          setRedSegment(WHEEL_SEGMENTS[chosenIdx]);
          playSuccess();
        }, 700);
      }
    };

    const handleAnswerWheel = (team: 'blue' | 'red', idx: number) => {
      if (isArenaFinished) return;
      const isBlue = team === 'blue';
      if (isBlue && blueWheelAns !== null) return;
      if (!isBlue && redWheelAns !== null) return;

      const q = isBlue
        ? pack.blueWheel[blueWheelIdx % pack.blueWheel.length]
        : pack.redWheel[redWheelIdx % pack.redWheel.length];
      const seg = isBlue ? blueSegment : redSegment;

      if (isBlue) setBlueWheelAns(idx);
      else setRedWheelAns(idx);

      const ok = idx === q.correctIndex;
      const speedBonus = ok ? getLiveSpeedBonus(team, 100) : 0;

      if (isBlue) setBlueLastSpeedBonus(speedBonus);
      else setRedLastSpeedBonus(speedBonus);

      onTriggerCombat(ok, ok ? seg.points + speedBonus : 0, Math.round(100 / totalRounds), team);
    };

    const handleNextWheel = (team: 'blue' | 'red') => {
      playClick();
      if (team === 'blue') {
        setBlueWheelAns(null);
        setBlueLastSpeedBonus(null);
        blueQStartRef.current = Date.now();
        setBlueWheelIdx((i) => i + 1);
        handleSpinForTeam('blue');
      } else {
        setRedWheelAns(null);
        setRedLastSpeedBonus(null);
        redQStartRef.current = Date.now();
        setRedWheelIdx((i) => i + 1);
        handleSpinForTeam('red');
      }
    };

    const renderWheelPlayerPanel = (team: 'blue' | 'red') => {
      const isBlue = team === 'blue';
      const wIdx = isBlue ? blueWheelIdx : redWheelIdx;
      if (wIdx >= totalRounds) return renderPlayerFinishedCard(team);

      const q = isBlue
        ? pack.blueWheel[wIdx % pack.blueWheel.length]
        : pack.redWheel[wIdx % pack.redWheel.length];
      const seg = isBlue ? blueSegment : redSegment;
      const rot = isBlue ? blueWheelRot : redWheelRot;
      const spinning = isBlue ? blueSpinning : redSpinning;
      const picked = isBlue ? blueWheelAns : redWheelAns;
      const speedBonus = isBlue ? blueLastSpeedBonus : redLastSpeedBonus;
      const liveBonus = getLiveSpeedBonus(team, 100);

      return (
        <div
          className={`flex-1 min-h-0 p-3.5 sm:p-4 rounded-3xl border-2 flex flex-col justify-between gap-2.5 shadow-lg ${
            isBlue
              ? 'bg-sky-950/15 dark:bg-slate-900 border-sky-500/60'
              : 'bg-rose-950/15 dark:bg-slate-900 border-rose-500/60'
          }`}
        >
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-11 h-11 rounded-full border-2 border-amber-400 flex items-center justify-center transition-transform duration-700 bg-gradient-to-tr from-rose-600 via-indigo-600 to-emerald-500 shrink-0"
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  <span className="text-[8px] font-black text-white bg-slate-950 px-1 rounded">
                    SPIN
                  </span>
                </div>
                <div>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-black uppercase text-white ${
                      isBlue ? 'bg-sky-600' : 'bg-rose-600'
                    }`}
                  >
                    {isBlue ? blueLabel : redLabel} · Ronde {wIdx + 1}/{totalRounds}
                  </span>
                  <div className="text-xs font-extrabold text-amber-500 mt-0.5 flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    <span>{seg.label}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="px-2 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-600 dark:text-amber-300 text-[10px] font-black">
                  ⚡ Bonus Cepat: +{picked === null ? liveBonus : speedBonus || 0}
                </span>
                <button
                  type="button"
                  disabled={spinning || picked !== null}
                  onClick={() => handleSpinForTeam(team)}
                  className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer disabled:opacity-40"
                >
                  🎡 Putar
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-amber-400/30 text-white">
              <span className="text-[10px] font-black uppercase text-amber-400 block mb-0.5">
                SOAL KOTAK MISTERI ({isBlue ? blueLabel : redLabel}):
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold leading-snug">{q.question}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-auto">
            {q.options.map((opt, idx) => {
              const isRight = idx === q.correctIndex;
              const isPicked = picked === idx;
              let cls =
                'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 text-slate-800 dark:text-slate-100';
              if (picked !== null) {
                if (isRight)
                  cls =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                else if (isPicked)
                  cls =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200';
                else cls = 'opacity-50 border-slate-200 dark:border-slate-800';
              }
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={picked !== null}
                  onClick={() => handleAnswerWheel(team, idx)}
                  className={`p-2.5 rounded-xl border-2 text-left text-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer ${cls}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug font-semibold line-clamp-2">{opt}</span>
                </button>
              );
            })}
          </div>

          {picked !== null ? (
            <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-2">
                {picked === q.correctIndex
                  ? `✅ Klaim Hadiah! +${seg.points + (speedBonus || 0)} Poin (Bonus Cepat +${speedBonus || 0})`
                  : `❌ Belum tepat. ${q.explanation}`}
              </span>
              <button
                type="button"
                onClick={() => handleNextWheel(team)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <span>Lanjut</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-[11px] text-center font-bold text-slate-500 dark:text-slate-400">
              ⚡ Jawab lebih cepat untuk menggandakan hadiah roda keberuntungan!
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="h-full min-h-0 flex flex-col justify-between gap-2.5 overflow-y-auto">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950 border border-amber-500/50 text-white flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 text-xs font-black">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Roda Keberuntungan · {blueLabel}: {blueScore} Pts | {redLabel}: {redScore} Pts</span>
          </div>
          {renderGameControlButtons()}
        </div>

        {!isArenaFinished && (
          <div
            className={`flex-1 min-h-0 ${
              isSplitMultiplayer ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'flex flex-col'
            }`}
          >
            {renderWheelPlayerPanel('blue')}
            {isSplitMultiplayer && renderWheelPlayerPanel('red')}
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // RENDER 12: SKETSA CEPAT INFORMATIKA
  // ============================================================================
  if (gameType === 'sketsa-cepat') {
    return (
      <SketsaCepatGame
        topic={topic}
        mode={mode}
        totalRounds={totalRounds}
        onSelectRounds={handleSelectRounds}
        shuffleTick={shuffleTick + localResetTick}
        blueLabel={blueLabel}
        redLabel={redLabel}
        onTriggerCombat={onTriggerCombat}
        renderGameControlButtons={renderGameControlButtons}
      />
    );
  }

  // ============================================================================
  // RENDER 11: DETEKTIF SIBER CSI (SPLIT-SCREEN DUEL/KELOMPOK)
  // ============================================================================
  const handleAnswerDetective = (team: 'blue' | 'red', idx: number) => {
    if (isArenaFinished) return;
    const isBlue = team === 'blue';
    if (isBlue && blueDetAns !== null) return;
    if (!isBlue && redDetAns !== null) return;

    const c = isBlue
      ? pack.blueCases[blueCaseIdx % pack.blueCases.length]
      : pack.redCases[redCaseIdx % pack.redCases.length];
    const cluesOpened = isBlue ? blueClues : redClues;
    const basePoints = cluesOpened === 1 ? 150 : cluesOpened === 2 ? 120 : 90;

    if (isBlue) setBlueDetAns(idx);
    else setRedDetAns(idx);

    const ok = idx === c.correctSuspectIndex;
    const speedBonus = ok ? getLiveSpeedBonus(team, 100) : 0;

    if (isBlue) setBlueLastSpeedBonus(speedBonus);
    else setRedLastSpeedBonus(speedBonus);

    onTriggerCombat(ok, ok ? basePoints + speedBonus : 0, Math.round(100 / totalRounds), team);
  };

  const handleNextCase = (team: 'blue' | 'red') => {
    playClick();
    if (team === 'blue') {
      setBlueDetAns(null);
      setBlueClues(1);
      setBlueLastSpeedBonus(null);
      blueQStartRef.current = Date.now();
      setBlueCaseIdx((i) => i + 1);
    } else {
      setRedDetAns(null);
      setRedClues(1);
      setRedLastSpeedBonus(null);
      redQStartRef.current = Date.now();
      setRedCaseIdx((i) => i + 1);
    }
  };

  const renderDetectivePlayerPanel = (team: 'blue' | 'red') => {
    const isBlue = team === 'blue';
    const cIdx = isBlue ? blueCaseIdx : redCaseIdx;
    if (cIdx >= totalRounds) return renderPlayerFinishedCard(team);

    const currentCase = isBlue
      ? pack.blueCases[cIdx % pack.blueCases.length]
      : pack.redCases[cIdx % pack.redCases.length];
    const cluesOpened = isBlue ? blueClues : redClues;
    const picked = isBlue ? blueDetAns : redDetAns;
    const speedBonus = isBlue ? blueLastSpeedBonus : redLastSpeedBonus;
    const liveBonus = getLiveSpeedBonus(team, 100);
    const basePts = cluesOpened === 1 ? 150 : cluesOpened === 2 ? 120 : 90;

    return (
      <div
        className={`flex-1 min-h-0 p-3.5 sm:p-4 rounded-3xl border-2 flex flex-col justify-between gap-2.5 shadow-lg ${
          isBlue
            ? 'bg-sky-950/15 dark:bg-slate-900 border-sky-500/60'
            : 'bg-rose-950/15 dark:bg-slate-900 border-rose-500/60'
        }`}
      >
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span
              className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase text-white flex items-center gap-1.5 ${
                isBlue ? 'bg-sky-600' : 'bg-rose-600'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>
                {isBlue ? blueLabel : redLabel} · Kasus {cIdx + 1}/{totalRounds}
              </span>
            </span>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-600 dark:text-amber-300 text-[10px] font-black">
                ⚡ +{picked === null ? basePts + liveBonus : basePts + (speedBonus || 0)} Pts
              </span>
              {cluesOpened < 3 && picked === null && (
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    if (isBlue) setBlueClues((c) => Math.min(3, c + 1));
                    else setRedClues((c) => Math.min(3, c + 1));
                  }}
                  className="px-2.5 py-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>Buka Bukti #{cluesOpened + 1}</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-900 border border-teal-500/30 text-white space-y-1.5">
            <div className="text-xs font-black text-teal-300">
              📋 {currentCase.caseTitle}
            </div>
            <p className="text-xs text-slate-200 leading-snug">{currentCase.incidentReport}</p>
            <div className="grid grid-cols-1 gap-1 pt-1">
              {currentCase.clues.slice(0, cluesOpened).map((clueText, idx) => (
                <div
                  key={idx}
                  className="p-1.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-[11px] text-teal-100"
                >
                  <strong className="text-amber-300">Bukti #{idx + 1}:</strong> {clueText}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-auto">
          {currentCase.suspectOptions.map((opt, idx) => {
            const isRight = idx === currentCase.correctSuspectIndex;
            const isChosen = picked === idx;
            let cls =
              'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-500 text-slate-800 dark:text-slate-100';
            if (picked !== null) {
              if (isRight)
                cls =
                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
              else if (isChosen)
                cls =
                  'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200';
              else cls = 'opacity-50 border-slate-200 dark:border-slate-800';
            }
            return (
              <button
                key={idx}
                type="button"
                disabled={picked !== null}
                onClick={() => handleAnswerDetective(team, idx)}
                className={`p-2.5 rounded-xl border-2 text-left text-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer ${cls}`}
              >
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug font-semibold line-clamp-2">{opt}</span>
              </button>
            );
          })}
        </div>

        {picked !== null ? (
          <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-2">
              {picked === currentCase.correctSuspectIndex
                ? `✅ Kasus Terpecahkan! +${basePts + (speedBonus || 0)} Poin (Bonus Cepat +${speedBonus || 0})`
                : `❌ Kurang tepat. ${currentCase.explanation}`}
            </span>
            <button
              type="button"
              onClick={() => handleNextCase(team)}
              className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="text-[11px] text-center font-bold text-slate-500 dark:text-slate-400">
            ⚡ Pecahkan kasus lebih cepat dengan sedikit bukti untuk poin tertinggi!
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full min-h-0 flex flex-col justify-between gap-2.5 overflow-y-auto">
      <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950 border border-teal-500/50 text-white flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 text-xs font-black">
          <Search className="w-4 h-4 text-teal-400" />
          <span>Detektif Siber CSI · {blueLabel}: {blueScore} Pts | {redLabel}: {redScore} Pts</span>
        </div>
        {renderGameControlButtons()}
      </div>

      {!isArenaFinished && (
        <div
          className={`flex-1 min-h-0 ${
            isSplitMultiplayer ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'flex flex-col'
          }`}
        >
          {renderDetectivePlayerPanel('blue')}
          {isSplitMultiplayer && renderDetectivePlayerPanel('red')}
        </div>
      )}
    </div>
  );
};
