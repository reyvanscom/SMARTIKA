import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Topic } from '../../types/curriculum';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { useCurriculumOverrides, SpecificMiniGameId } from '../../context/CurriculumOverridesContext';
import {
  getTopicGamePack,
  PictureGuessQuestion,
  WordScrambleQuestion,
  RobotRaceQuestion
} from '../../data/interactiveGamesData';
import { soundManager } from '../../utils/soundSystem';
import { RobotBattleArena3D } from './RobotBattleArena3D';
import { RobotRaceArena3D } from './RobotRaceArena3D';
import { PictureIllustration } from './PictureIllustration';
import { SevenExtraMiniGamesArena, ExtraGameType } from './SevenExtraMiniGamesArena';
import { StudentDatabaseModal } from '../modals/StudentDatabaseModal';
import { QuestionBankExcelModal } from '../modals/QuestionBankExcelModal';
import {
  MINI_GAME_QUIZ_TEMPLATES,
  downloadMiniGameTemplateExcel,
  parseQuestionBankExcel
} from '../../utils/excelQuestionBank';
import {
  saveStudentScoreToDatabase,
  getSavedDuelPlayerNames
} from '../../utils/studentDatabase';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Swords,
  Flag,
  Users,
  User,
  Edit3,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Zap,
  HelpCircle,
  Eye,
  CheckCircle2,
  XCircle,
  Flame,
  Gauge,
  Bomb,
  Shield,
  Cpu,
  Gift,
  Search,
  Crosshair,
  Maximize2,
  Minimize2,
  Dices,
  Shuffle,
  Palette,
  Database,
  Volume2,
  VolumeX,
  Download,
  Upload,
  FileSpreadsheet
} from 'lucide-react';

interface MiniGameViewProps {
  topic: Topic;
  onNext: () => void;
  onBackToDashboard: () => void;
}

type MiniGameType =
  | 'battle-bot'
  | 'balap-robot'
  | 'tebak-kata'
  | 'tebak-gambar'
  | ExtraGameType;
type GameMode = 'individu' | 'duel' | 'kelompok';
type PlayStyle = 'gantian' | 'bersama';

export const MiniGameView: React.FC<MiniGameViewProps> = ({
  topic,
  onNext,
  onBackToDashboard
}) => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();
  const {
    studentProfile,
    isTeacher,
    showTeacherAnswerKeys,
    toggleTeacherAnswerKeys,
    openEditorModal
  } = useUserRole();
  const {
    overrides,
    getEffectiveTopic,
    getEffectiveGamePack,
    getEffectivePictureGuess,
    getEffectivePblScenario,
    syncMultipleTopicOverrides
  } = useCurriculumOverrides();
  const topicOverride = overrides[topic.id];
  const baseGamePack = useMemo(
    () => getTopicGamePack(topic.id, topic.title, topic.grade),
    [topic.id, topic.title, topic.grade]
  );
  const gamePack = useMemo(
    () => getEffectiveGamePack(topic.id, baseGamePack),
    [topic.id, baseGamePack, getEffectiveGamePack]
  );
  const effectivePictureGuess = useMemo<PictureGuessQuestion[]>(
    () => (getEffectivePictureGuess(topic.id, gamePack.pictureGuess) as PictureGuessQuestion[]) || [],
    [topic.id, gamePack.pictureGuess, getEffectivePictureGuess]
  );
  const raceQuestions = gamePack.robotRace || [];

  // Modal Bank Soal & Template khusus Mini Game Aktif
  const [isMiniGameBankModalOpen, setIsMiniGameBankModalOpen] = useState<boolean>(false);
  const [quickSyncBanner, setQuickSyncBanner] = useState<string | null>(null);
  const quickExcelUploadRef = useRef<HTMLInputElement | null>(null);

  // Native Browser Fullscreen state
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsBrowserFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleBrowserFullscreen = async () => {
    playClick();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore if blocked by iframe permissions
    }
  };

  // Active game type, multiplayer mode (Individu, Duel, Kelompok) & Play Style (Gantian vs Main Bersama Multi-Touch)
  const [activeGame, setActiveGame] = useState<MiniGameType>('battle-bot');
  const [mode, setMode] = useState<GameMode>('individu');
  const [playStyle, setPlayStyle] = useState<PlayStyle>('bersama');

  // Pilihan Ronde 3, 7, dan 10 & Pengacak Soal/Jawaban Dinamis
  const [roundCount, setRoundCount] = useState<number>(3);
  const [shuffleTick, setShuffleTick] = useState<number>(0);

  // State Musik Mini Game & Modal Database Skor Siswa
  const [isGameMusicPlaying, setIsGameMusicPlaying] = useState<boolean>(() =>
    soundManager.isMiniGameMusicActive()
  );
  const [isStudentDbModalOpen, setIsStudentDbModalOpen] = useState<boolean>(false);
  const [duelNames, setDuelNames] = useState(() => getSavedDuelPlayerNames());

  // Otomatis putar musik sesuai mini game yang sedang dimainkan & hentikan saat keluar dari MiniGameView
  useEffect(() => {
    if (soundManager.isMiniGameMusicActive()) {
      soundManager.startMiniGameMusic(activeGame);
      setIsGameMusicPlaying(true);
    }
    return () => {
      soundManager.stopMiniGameMusic();
    };
  }, [activeGame]);

  const handleToggleGameMusic = () => {
    const nextState = soundManager.toggleMiniGameMusic(activeGame);
    setIsGameMusicPlaying(nextState);
  };

  const isSimultaneous = mode === 'duel' || mode === 'kelompok';
  const isSplitMultiplayer = mode === 'duel' || mode === 'kelompok';

  // Helper Fisher-Yates True Random Shuffle agar soal & jawaban tidak bisa dihafalkan pemain lain
  const shuffleArray = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffleOptionChoices = (
    rawOpts: { label: string; text: string }[],
    rawCorrectIdx: number
  ) => {
    const correctText = rawOpts[rawCorrectIdx]?.text ?? rawOpts[0]?.text ?? '';
    const texts = shuffleArray(rawOpts.map((o) => o.text));
    const labels = ['A', 'B', 'C', 'D'];
    const options = texts.map((text, idx) => ({
      label: labels[idx] || String.fromCharCode(65 + idx),
      text
    }));
    const correctIndex = Math.max(0, texts.indexOf(correctText));
    return { options, correctIndex };
  };

  const shuffleDistinctOptionPair = (
    rawOpts: { label: string; text: string }[],
    rawCorrectIdx: number
  ) => {
    const blue = shuffleOptionChoices(rawOpts, rawCorrectIdx);
    let red = shuffleOptionChoices(rawOpts, rawCorrectIdx);
    if (rawOpts.length > 1) {
      let attempts = 0;
      const blueSig = blue.options.map((o) => o.text).join('||');
      while (
        attempts < 10 &&
        (red.correctIndex === blue.correctIndex ||
          red.options.map((o) => o.text).join('||') === blueSig)
      ) {
        red = shuffleOptionChoices(rawOpts, rawCorrectIdx);
        attempts++;
      }
    }
    return { blue, red };
  };

  // Signature isi bank soal yang stabil & kanonis agar deck HANYA diacak ulang jika isi soal benar-benar berubah
  const questionBankSignature = useMemo(() => {
    const botSig = (gamePack.battleBot || [])
      .map((q) => `${q.question}:${q.correctIndex}:${(q.options || []).map((o) => o.text).join('|')}`)
      .join(';;');
    const raceSig = (gamePack.robotRace || [])
      .map((q) => `${q.question}:${q.correctIndex}:${(q.options || []).map((o) => o.text).join('|')}`)
      .join(';;');
    const wordSig = (gamePack.wordScramble || [])
      .map((w) => `${w.word}:${w.scrambled}:${w.clue}`)
      .join(';;');
    const picSig = (effectivePictureGuess || [])
      .map((p) => `${p.title}:${p.correctIndex}:${(p.options || []).join('|')}`)
      .join(';;');
    const kuisSig = (topic.kuis || [])
      .map((q) => `${q.question}:${q.correctAnswer}`)
      .join(';;');
    const customMiniMap = topicOverride?.customMiniGameQuestions || {};
    const customMiniSig = Object.keys(customMiniMap)
      .sort()
      .map((gKey) => {
        const list = customMiniMap[gKey as SpecificMiniGameId] || [];
        return `${gKey}=[${list
          .map((q) => `${q.question}:${q.correctIndex}:${(q.options || []).map((o) => o.text).join('|')}`)
          .join(';')}]`;
      })
      .join('||');
    return `${topic.id}__${botSig}__${raceSig}__${wordSig}__${picSig}__${kuisSig}__${customMiniSig}`;
  }, [
    topic.id,
    topic.kuis,
    gamePack.battleBot,
    gamePack.robotRace,
    gamePack.wordScramble,
    effectivePictureGuess,
    topicOverride?.customMiniGameQuestions
  ]);

  // Gabungkan bank soal topik (prioritaskan 100% soal custom Guru jika sudah diatur di database)
  const {
    shuffledBotDeck,
    shuffledRaceDeck,
    shuffledWordDeck,
    shuffledRedWordDeck,
    shuffledPicDeck,
    shuffledRedPicDeck
  } = useMemo(() => {
    const expandDeck = <T,>(arr: T[], minLen: number): T[] => {
      if (arr.length === 0) return [];
      const out: T[] = [];
      while (out.length < minLen) {
        out.push(...arr);
      }
      return out.slice(0, minLen);
    };

    const extraPool = [
      ...(topic.kuis || []),
      ...(topic.asesmenAwal || []),
      ...(topic.asesmenAkhir || [])
    ].map((q, idx) => {
      const corrIdx = Math.max(
        0,
        q.options.findIndex((o) => o.label === q.correctAnswer)
      );
      return {
        id: 100 + idx,
        scenario: `Tantangan Materi ${topic.title}`,
        question: q.question,
        options: q.options.map((o) => ({ label: o.label, text: o.text })),
        correctIndex: corrIdx,
        damage: 25,
        explanation: ('explanation' in q ? q.explanation : '') || ''
      };
    });

    const hasCustomBot =
      (topicOverride?.customMiniGameQuestions?.['battle-bot'] &&
        topicOverride.customMiniGameQuestions['battle-bot']!.length > 0) ||
      (topicOverride?.customBattleBotQuestions && topicOverride.customBattleBotQuestions.length > 0);

    const hasCustomRace =
      (topicOverride?.customMiniGameQuestions?.['balap-robot'] &&
        topicOverride.customMiniGameQuestions['balap-robot']!.length > 0) ||
      (topicOverride?.customRobotRaceQuestions && topicOverride.customRobotRaceQuestions.length > 0) ||
      hasCustomBot;

    const primaryBotPool = shuffleArray(gamePack.battleBot || []);
    const primaryRacePool = shuffleArray(
      (gamePack.robotRace || []).map((rq: RobotRaceQuestion, idx: number) => ({
        id: 200 + idx,
        scenario: rq.scenario,
        question: rq.question,
        options: rq.options,
        correctIndex: rq.correctIndex,
        damage: rq.boostPower || 25,
        explanation: rq.explanation
      }))
    );

    let botPoolShuffled = primaryBotPool;
    if (hasCustomBot && primaryBotPool.length > 0) {
      botPoolShuffled = expandDeck(primaryBotPool, roundCount);
    } else {
      const rawBotPool = [...primaryBotPool, ...primaryRacePool, ...shuffleArray(extraPool)];
      const uniqueBotMap = new Map<string, (typeof rawBotPool)[0]>();
      rawBotPool.forEach((item) => {
        if (!uniqueBotMap.has(item.question)) {
          uniqueBotMap.set(item.question, item);
        }
      });
      const prioritizedList = Array.from(uniqueBotMap.values());
      botPoolShuffled = expandDeck(
        shuffleArray(prioritizedList.slice(0, Math.max(roundCount, primaryBotPool.length))),
        roundCount
      );
    }

    const botDeck = botPoolShuffled.map((q, idx) => {
      const single = shuffleOptionChoices(q.options, q.correctIndex);
      const { blue, red } = shuffleDistinctOptionPair(q.options, q.correctIndex);
      return {
        ...q,
        id: idx + 1,
        options: single.options,
        correctIndex: single.correctIndex,
        blueOptions: blue.options,
        blueCorrectIndex: blue.correctIndex,
        redOptions: red.options,
        redCorrectIndex: red.correctIndex
      };
    });

    let racePoolShuffled = primaryRacePool;
    if (hasCustomRace && primaryRacePool.length > 0) {
      racePoolShuffled = expandDeck(primaryRacePool, roundCount);
    } else {
      const rawRacePool = [...primaryRacePool, ...primaryBotPool, ...shuffleArray(extraPool)];
      const uniqueRaceMap = new Map<string, (typeof rawRacePool)[0]>();
      rawRacePool.forEach((item) => {
        if (!uniqueRaceMap.has(item.question)) {
          uniqueRaceMap.set(item.question, item);
        }
      });
      const prioritizedRaceList = Array.from(uniqueRaceMap.values());
      racePoolShuffled = expandDeck(
        shuffleArray(prioritizedRaceList.slice(0, Math.max(roundCount, primaryRacePool.length))),
        roundCount
      );
    }

    const stepBoost = Math.ceil(100 / roundCount);
    const raceDeck = racePoolShuffled.map((q, idx) => {
      const single = shuffleOptionChoices(q.options, q.correctIndex);
      const { blue, red } = shuffleDistinctOptionPair(q.options, q.correctIndex);
      return {
        id: idx + 1,
        sectorName: `Sektor Sirkuit ${idx + 1}`,
        scenario: q.scenario,
        question: q.question,
        options: single.options,
        correctIndex: single.correctIndex,
        blueOptions: blue.options,
        blueCorrectIndex: blue.correctIndex,
        redOptions: red.options,
        redCorrectIndex: red.correctIndex,
        boostPower: stepBoost,
        explanation: q.explanation
      };
    });

    const makeDistinctRedOrder = <T,>(blueArr: T[]): T[] => {
      if (blueArr.length <= 1) return [...blueArr];
      const offset = Math.max(1, Math.floor(blueArr.length / 2));
      return blueArr.map((_, idx) => blueArr[(idx + offset) % blueArr.length]);
    };

    const rawWordPool = shuffleArray<WordScrambleQuestion>(gamePack.wordScramble || []);
    const wordPoolShuffled = expandDeck(rawWordPool, roundCount).map((w: WordScrambleQuestion) => {
      const chars = shuffleArray(w.scrambled.split(' ').filter(Boolean));
      return {
        ...w,
        scrambled: chars.join(' ')
      };
    });

    const redWordPoolShuffled = expandDeck(makeDistinctRedOrder(rawWordPool), roundCount).map(
      (w: WordScrambleQuestion) => {
        const chars = shuffleArray(w.scrambled.split(' ').filter(Boolean));
        return {
          ...w,
          scrambled: chars.join(' ')
        };
      }
    );

    const rawPicPool = shuffleArray<PictureGuessQuestion>(effectivePictureGuess || []);
    const picPoolShuffled = expandDeck(rawPicPool, roundCount).map((pic: PictureGuessQuestion) => {
      const correctText = pic.options[pic.correctIndex] ?? pic.options[0] ?? '';
      const shuffledOpts = shuffleArray(pic.options);
      const newCorrectIdx = Math.max(0, shuffledOpts.indexOf(correctText));
      return {
        ...pic,
        options: shuffledOpts,
        correctIndex: newCorrectIdx,
        originalAnswerKey: correctText
      };
    });

    const redPicPoolShuffled = expandDeck(makeDistinctRedOrder(rawPicPool), roundCount).map(
      (pic: PictureGuessQuestion) => {
        const correctText = pic.options[pic.correctIndex] ?? pic.options[0] ?? '';
        const shuffledOpts = shuffleArray(pic.options);
        const newCorrectIdx = Math.max(0, shuffledOpts.indexOf(correctText));
        return {
          ...pic,
          options: shuffledOpts,
          correctIndex: newCorrectIdx,
          originalAnswerKey: correctText
        };
      }
    );

    return {
      shuffledBotDeck: botDeck,
      shuffledRaceDeck: raceDeck,
      shuffledWordDeck: wordPoolShuffled,
      shuffledRedWordDeck: redWordPoolShuffled,
      shuffledPicDeck: picPoolShuffled,
      shuffledRedPicDeck: redPicPoolShuffled
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id, roundCount, shuffleTick, questionBankSignature]);

  // Shared 3D Combat HP & Turn State across Arena Games
  const [blueHp, setBlueHp] = useState(100);
  const [redHp, setRedHp] = useState(100);
  const [activeTurn, setActiveTurn] = useState<'blue' | 'red'>('blue');
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [attackTrigger, setAttackTrigger] = useState<{
    id: number;
    attacker: 'blue' | 'red';
    damage: number;
  } | null>(null);

  // Speed-based scoring tracker & round-entry guard per team
  const blueStartTimeRef = useRef<number>(Date.now());
  const redStartTimeRef = useRef<number>(Date.now());
  const botRoundEntryTimeRef = useRef<number>(0);
  const raceRoundEntryTimeRef = useRef<number>(0);
  const [blueLastBonus, setBlueLastBonus] = useState<number>(0);
  const [redLastBonus, setRedLastBonus] = useState<number>(0);

  const calcFastPoints = (team: 'blue' | 'red', basePts = 25, maxBonus = 25) => {
    const start = team === 'blue' ? blueStartTimeRef.current : redStartTimeRef.current;
    const elapsedSec = Math.max(0, (Date.now() - start) / 1000);
    const speedBonus = Math.max(5, Math.round(maxBonus - Math.min(14, elapsedSec) * 1.5));
    if (team === 'blue') setBlueLastBonus(speedBonus);
    else setRedLastBonus(speedBonus);
    return basePts + speedBonus;
  };

  // ==========================================
  // 1. STATE PERTARUNGAN ROBOT 3D (BATTLE BOT)
  // ==========================================
  const [botQIndex, setBotQIndex] = useState(0);
  const [botSelectedOption, setBotSelectedOption] = useState<number | null>(null);
  const [botIsAnswered, setBotIsAnswered] = useState(false);
  const [botBlueSelected, setBotBlueSelected] = useState<number | null>(null);
  const [botRedSelected, setBotRedSelected] = useState<number | null>(null);
  const [botFirstStrike, setBotFirstStrike] = useState<'blue' | 'red' | null>(null);
  const [botRoundLocked, setBotRoundLocked] = useState<boolean>(false);
  const [botRoundNotice, setBotRoundNotice] = useState<{
    type: 'fast-win' | 'wrong-chance' | 'steal-win' | 'both-wrong';
    winner?: 'blue' | 'red';
    points?: number;
    title: string;
    subtitle: string;
  } | null>(null);

  // ==========================================
  // 2. STATE BALAPAN MOBIL 3D (ROBOT RACE)
  // ==========================================
  const [raceQIndex, setRaceQIndex] = useState(0);
  const [raceSelectedOption, setRaceSelectedOption] = useState<number | null>(null);
  const [raceIsAnswered, setRaceIsAnswered] = useState(false);
  const [raceBlueSelected, setRaceBlueSelected] = useState<number | null>(null);
  const [raceRedSelected, setRaceRedSelected] = useState<number | null>(null);
  const [raceFirstBoost, setRaceFirstBoost] = useState<'blue' | 'red' | null>(null);
  const [raceRoundLocked, setRaceRoundLocked] = useState<boolean>(false);
  const [raceRoundNotice, setRaceRoundNotice] = useState<{
    type: 'fast-win' | 'wrong-chance' | 'steal-win' | 'both-wrong';
    winner?: 'blue' | 'red';
    points?: number;
    title: string;
    subtitle: string;
  } | null>(null);
  const [blueProgress, setBlueProgress] = useState(0);
  const [redProgress, setRedProgress] = useState(0);
  const [raceBlueHp, setRaceBlueHp] = useState(100);
  const [raceRedHp, setRaceRedHp] = useState(100);
  const [raceTurn, setRaceTurn] = useState<'blue' | 'red'>('blue');
  const [raceEvent, setRaceEvent] = useState<{
    id: number;
    type: 'blue-boost' | 'red-boost' | 'both-boost';
  } | null>(null);

  // ==========================================
  // 3. STATE TEBAK KATA INFORMATIKA (INDEPENDENT BLUE & RED)
  // ==========================================
  const [wordQIndex, setWordQIndex] = useState(0);
  const [wordBlueQIndex, setWordBlueQIndex] = useState(0);
  const [wordRedQIndex, setWordRedQIndex] = useState(0);
  const [userLetters, setUserLetters] = useState<string[]>([]);
  const [userTileIndices, setUserTileIndices] = useState<number[]>([]);
  const [wordIsCorrect, setWordIsCorrect] = useState<boolean | null>(null);
  const [wordBlueLetters, setWordBlueLetters] = useState<string[]>([]);
  const [wordBlueTileIndices, setWordBlueTileIndices] = useState<number[]>([]);
  const [wordRedLetters, setWordRedLetters] = useState<string[]>([]);
  const [wordRedTileIndices, setWordRedTileIndices] = useState<number[]>([]);
  const [wordBlueCorrect, setWordBlueCorrect] = useState<boolean | null>(null);
  const [wordRedCorrect, setWordRedCorrect] = useState<boolean | null>(null);

  // Stabilisator Layar Sentuh IFP (Smartboard Anti-Ghost-Touch & Cooldown Filter)
  const [ifpStabilizerMode, setIfpStabilizerMode] = useState<'ifp' | 'standar'>('ifp');
  const ifpCooldownMs = ifpStabilizerMode === 'ifp' ? 120 : 60;
  const lastSingleTapRef = useRef<number>(0);
  const lastBlueTapRef = useRef<number>(0);
  const lastRedTapRef = useRef<number>(0);

  // ==========================================
  // 4. STATE TEBAK GAMBAR MISTERI (INDEPENDENT BLUE & RED)
  // ==========================================
  const [picQIndex, setPicQIndex] = useState(0);
  const [picBlueQIndex, setPicBlueQIndex] = useState(0);
  const [picRedQIndex, setPicRedQIndex] = useState(0);
  const [picRevealedTiles, setPicRevealedTiles] = useState<boolean[]>([false, false, false, false]);
  const [picRedRevealedTiles, setPicRedRevealedTiles] = useState<boolean[]>([false, false, false, false]);
  const [picSelectedOption, setPicSelectedOption] = useState<number | null>(null);
  const [picBlueSelected, setPicBlueSelected] = useState<number | null>(null);
  const [picRedSelected, setPicRedSelected] = useState<number | null>(null);

  // Labels for Left (Blue) and Right (Red) Contestants based on Game, Mode & Saved Student Names
  const p1DisplayName = studentProfile.name || duelNames.player1Name || '';
  const p2DisplayName = duelNames.player2Name || '';

  const getBlueRobotLabel = () => {
    if (activeGame === 'battle-bot') {
      if (mode === 'individu') return p1DisplayName ? `${p1DisplayName} · Atom Biru 3D` : 'Atom Biru 3D';
      if (mode === 'duel') return `${p1DisplayName || 'Pemain 1'} · Bot Biru (${blueScore} Pts)`;
      return `${p1DisplayName || 'Tim Biru'} · Bot Biru (${blueScore} Pts)`;
    }
    if (mode === 'individu') return `${p1DisplayName || 'Siswa'} (${blueScore} Pts)`;
    if (mode === 'duel') return `${p1DisplayName || 'Pemain 1'} (${blueScore} Pts)`;
    return `${p1DisplayName || 'Tim Biru'} (${blueScore} Pts)`;
  };

  const getRedRobotLabel = () => {
    if (activeGame === 'battle-bot') {
      if (mode === 'individu') return 'Zeus Rival 3D';
      if (mode === 'duel') return `${p2DisplayName || 'Pemain 2'} · Bot Merah (${redScore} Pts)`;
      return `${p2DisplayName || 'Tim Merah'} · Bot Merah (${redScore} Pts)`;
    }
    if (mode === 'individu') return 'Sistem Tantangan';
    if (mode === 'duel') return `${p2DisplayName || 'Pemain 2'} (${redScore} Pts)`;
    return `${p2DisplayName || 'Tim Merah'} (${redScore} Pts)`;
  };

  const getGameDisplayTitle = (g: MiniGameType): string => {
    const map: Record<MiniGameType, string> = {
      'battle-bot': 'Robot Tinju 3D',
      'balap-robot': 'Balap Motor 3D',
      'tebak-kata': 'Tebak Kata Informatika',
      'tebak-gambar': 'Tebak Gambar Misteri',
      'tug-of-war': 'Tarik Tambang Siber',
      'bomb-defusal': 'Jinakkan Bom Siber',
      'tower-defense': 'Menara Firewall',
      'whack-a-mole': 'Ketuk Virus Siber',
      'robo-maze': 'Labirin Koding',
      'spin-wheel': 'Roda Keberuntungan',
      'cyber-detective': 'Detektif Siber CSI',
      'sketsa-cepat': 'Sketsa Cepat Informatika'
    };
    return map[g] || g;
  };

  // Otomatis simpan skor siswa ke Database Utama setiap kali skor bertambah di Mini Game
  const sessionRecordIdRef = useRef<string>(
    `mg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  );
  const redSessionRecordIdRef = useRef<string>(
    `mg_p2_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  );

  useEffect(() => {
    sessionRecordIdRef.current = `mg_${activeGame}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    redSessionRecordIdRef.current = `mg_p2_${activeGame}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  }, [activeGame, topic.id, mode]);

  useEffect(() => {
    if (activeGame === 'sketsa-cepat') return; // Sketsa Cepat menyimpan langsung per ronde
    if (blueScore <= 0 && redScore <= 0) return;

    const p1 = studentProfile.name || duelNames.player1Name || 'Siswa SMPN 5 Kroya';
    const c1 = studentProfile.className || duelNames.player1Class || 'Kelas VII/VIII/IX';

    if (blueScore > 0) {
      saveStudentScoreToDatabase({
        recordId: sessionRecordIdRef.current,
        studentName: p1,
        className: c1,
        studentNumber: studentProfile.studentNumber || '-',
        topicId: topic.id,
        topicTitle: topic.title,
        activityType: 'mini-game',
        activityName: `Mini Game: ${getGameDisplayTitle(activeGame)}`,
        score: blueScore,
        maxScore: 100,
        mode,
        details: `Skor ${blueScore} Poin (${mode.toUpperCase()})`
      }).catch(() => {});
    }

    if (mode !== 'individu' && redScore > 0) {
      const p2 = duelNames.player2Name || 'Pemain 2';
      const c2 = duelNames.player2Class || c1;
      saveStudentScoreToDatabase({
        recordId: redSessionRecordIdRef.current,
        studentName: p2,
        className: c2,
        studentNumber: '-',
        topicId: topic.id,
        topicTitle: topic.title,
        activityType: 'mini-game',
        activityName: `Mini Game: ${getGameDisplayTitle(activeGame)}`,
        score: redScore,
        maxScore: 100,
        mode,
        details: `Skor Lawan Duel ${redScore} Poin (${mode.toUpperCase()})`
      }).catch(() => {});
    }
  }, [blueScore, redScore, activeGame, mode, topic.id, topic.title, studentProfile, duelNames]);

  // Reset game state without reshuffling questions (Tombol Reset)
  const resetOnlyCurrentGame = () => {
    playClick();
    blueStartTimeRef.current = Date.now();
    redStartTimeRef.current = Date.now();
    botRoundEntryTimeRef.current = Date.now();
    raceRoundEntryTimeRef.current = Date.now();
    setBlueLastBonus(0);
    setRedLastBonus(0);

    setBlueHp(100);
    setRedHp(100);
    setActiveTurn('blue');
    setBlueScore(0);
    setRedScore(0);
    setAttackTrigger(null);

    setBotQIndex(0);
    setBotSelectedOption(null);
    setBotIsAnswered(false);
    setBotBlueSelected(null);
    setBotRedSelected(null);
    setBotFirstStrike(null);
    setBotRoundLocked(false);
    setBotRoundNotice(null);

    setRaceQIndex(0);
    setRaceSelectedOption(null);
    setRaceIsAnswered(false);
    setRaceBlueSelected(null);
    setRaceRedSelected(null);
    setRaceFirstBoost(null);
    setRaceRoundLocked(false);
    setRaceRoundNotice(null);
    setBlueProgress(0);
    setRedProgress(0);
    setRaceBlueHp(100);
    setRaceRedHp(100);
    setRaceTurn('blue');
    setRaceEvent(null);

    setWordQIndex(0);
    setWordBlueQIndex(0);
    setWordRedQIndex(0);
    setUserLetters([]);
    setUserTileIndices([]);
    setWordIsCorrect(null);
    setWordBlueLetters([]);
    setWordBlueTileIndices([]);
    setWordRedLetters([]);
    setWordRedTileIndices([]);
    setWordBlueCorrect(null);
    setWordRedCorrect(null);

    setPicQIndex(0);
    setPicBlueQIndex(0);
    setPicRedQIndex(0);
    setPicRevealedTiles([false, false, false, false]);
    setPicRedRevealedTiles([false, false, false, false]);
    setPicSelectedOption(null);
    setPicBlueSelected(null);
    setPicRedSelected(null);
  };

  // Acak ulang urutan soal & pilihan jawaban sekaligus reset state (Tombol Acak Soal & Jawaban)
  const resetAllGames = () => {
    setShuffleTick((t) => t + 1);
    resetOnlyCurrentGame();
  };

  const renderInlineShuffleAndReset = (isDark = false) => (
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        onClick={() => {
          resetAllGames();
          if (activeGame === 'battle-bot') soundManager.playBoxingBell(1);
          else if (activeGame === 'balap-robot') soundManager.playMotoRevStart();
        }}
        className="px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[10px] sm:text-[11px] font-extrabold flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
        title="Acak urutan soal dan pilihan jawaban"
      >
        <Shuffle className="w-3 h-3" />
        <span>Acak Soal & Jawaban</span>
      </button>
      <button
        type="button"
        onClick={() => {
          resetOnlyCurrentGame();
          if (activeGame === 'battle-bot') soundManager.playBoxingBell(1);
          else if (activeGame === 'balap-robot') soundManager.playMotoRevStart();
        }}
        className={`px-2.5 py-1 rounded-xl text-[10px] sm:text-[11px] font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition-all border ${
          isDark
            ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-100'
            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
        }`}
        title="Reset permainan ke awal"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Reset</span>
      </button>
    </div>
  );

  const handleChangeRoundCount = (newRounds: number) => {
    setRoundCount(newRounds);
    setShuffleTick((t) => t + 1);
    resetOnlyCurrentGame();

    if (activeGame === 'battle-bot') {
      soundManager.playBoxingBell(1);
    } else if (activeGame === 'balap-robot') {
      soundManager.playMotoRevStart();
    } else {
      playClick();
    }
  };

  // Helper to apply combat outcome for a specific team (used in Simultaneous Multi-Touch mode)
  const applySpecificTeamCombat = (
    team: 'blue' | 'red',
    isCorrect: boolean,
    pts = 20,
    dmg = 25,
    isFinalRound = false
  ) => {
    const opponent = team === 'blue' ? 'red' : 'blue';
    if (isCorrect) {
      playSuccess();
      if (team === 'blue') {
        setBlueScore((s) => s + pts);
        setAttackTrigger({ id: Date.now() + Math.random(), attacker: 'blue', damage: dmg });
        setRedHp((prev) => {
          const next = Math.max(0, prev - dmg);
          return isFinalRound && blueHp >= next ? 0 : next;
        });
      } else {
        setRedScore((s) => s + pts);
        setAttackTrigger({ id: Date.now() + Math.random(), attacker: 'red', damage: dmg });
        setBlueHp((prev) => {
          const next = Math.max(0, prev - dmg);
          return isFinalRound && redHp >= next ? 0 : next;
        });
      }
    } else {
      playError();
      setAttackTrigger({ id: Date.now() + Math.random(), attacker: opponent, damage: 15 });
      if (team === 'blue') {
        setBlueHp((prev) => Math.max(0, prev - 15));
      } else {
        setRedHp((prev) => Math.max(0, prev - 15));
      }
    }
  };

  // Helper to apply 3D robot combat outcome for Turn-Based / Individu games
  const applyCombatOutcome = (isCorrect: boolean, isFinalRound: boolean) => {
    const damageAmt = 25;

    if (mode === 'individu') {
      if (isCorrect) {
        playSuccess();
        setBlueScore((s) => s + 20);
        setAttackTrigger({ id: Date.now(), attacker: 'blue', damage: damageAmt });
        setRedHp((prev) => {
          const next = Math.max(0, prev - damageAmt);
          return isFinalRound && blueHp >= next ? 0 : next;
        });
      } else {
        playError();
        setAttackTrigger({ id: Date.now(), attacker: 'red', damage: damageAmt });
        setBlueHp((prev) => {
          const next = Math.max(0, prev - damageAmt);
          return isFinalRound && next < redHp ? 0 : next;
        });
      }
    } else {
      const currentAttacker = activeTurn;
      const opponent = currentAttacker === 'blue' ? 'red' : 'blue';

      if (isCorrect) {
        playSuccess();
        if (currentAttacker === 'blue') {
          setBlueScore((s) => s + 20);
          setAttackTrigger({ id: Date.now(), attacker: 'blue', damage: 30 });
          setRedHp((prev) => {
            const next = Math.max(0, prev - 30);
            return isFinalRound ? 0 : next;
          });
        } else {
          setRedScore((s) => s + 20);
          setAttackTrigger({ id: Date.now(), attacker: 'red', damage: 30 });
          setBlueHp((prev) => {
            const next = Math.max(0, prev - 30);
            return isFinalRound ? 0 : next;
          });
        }
      } else {
        playError();
        setAttackTrigger({ id: Date.now(), attacker: opponent, damage: 20 });
        if (currentAttacker === 'blue') {
          setBlueHp((prev) => Math.max(0, prev - 20));
        } else {
          setRedHp((prev) => Math.max(0, prev - 20));
        }
      }
    }
  };

  // Helper for the 7 Extra Mini Games combat & turn advancement
  const handleExtraGameCombat = (
    isCorrect: boolean,
    customPoints = 100,
    customDamage = 25,
    teamOverride?: 'blue' | 'red'
  ) => {
    if (teamOverride) {
      const opponent = teamOverride === 'blue' ? 'red' : 'blue';
      if (isCorrect) {
        playSuccess();
        if (teamOverride === 'blue') {
          setBlueScore((s) => s + customPoints);
          setAttackTrigger({ id: Date.now() + Math.random(), attacker: 'blue', damage: customDamage });
          setRedHp((prev) => {
            const next = Math.max(0, prev - customDamage);
            if (next === 0) {
              playFanfare();
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
            }
            return next;
          });
        } else {
          setRedScore((s) => s + customPoints);
          setAttackTrigger({ id: Date.now() + Math.random(), attacker: 'red', damage: customDamage });
          setBlueHp((prev) => {
            const next = Math.max(0, prev - customDamage);
            if (next === 0) {
              playFanfare();
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
            }
            return next;
          });
        }
      } else {
        playError();
        setAttackTrigger({ id: Date.now() + Math.random(), attacker: opponent, damage: customDamage });
        if (teamOverride === 'blue') {
          setBlueHp((prev) => {
            const next = Math.max(0, prev - customDamage);
            if (next === 0) {
              playFanfare();
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
            }
            return next;
          });
        } else {
          setRedHp((prev) => {
            const next = Math.max(0, prev - customDamage);
            if (next === 0) {
              playFanfare();
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
            }
            return next;
          });
        }
      }
      return;
    }

    if (mode === 'individu') {
      if (isCorrect) {
        playSuccess();
        setBlueScore((s) => s + customPoints);
        setAttackTrigger({ id: Date.now(), attacker: 'blue', damage: customDamage });
        setRedHp((prev) => {
          const next = Math.max(0, prev - customDamage);
          if (next === 0) {
            playFanfare();
            confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
          }
          return next;
        });
      } else {
        playError();
        setAttackTrigger({ id: Date.now(), attacker: 'red', damage: customDamage });
        setBlueHp((prev) => Math.max(0, prev - customDamage));
      }
    } else {
      const currentAttacker = activeTurn;
      const opponent = currentAttacker === 'blue' ? 'red' : 'blue';
      if (isCorrect) {
        playSuccess();
        if (currentAttacker === 'blue') {
          setBlueScore((s) => s + customPoints);
          setAttackTrigger({ id: Date.now(), attacker: 'blue', damage: customDamage });
          setRedHp((prev) => {
            const next = Math.max(0, prev - customDamage);
            if (next === 0) {
              playFanfare();
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
            }
            return next;
          });
        } else {
          setRedScore((s) => s + customPoints);
          setAttackTrigger({ id: Date.now(), attacker: 'red', damage: customDamage });
          setBlueHp((prev) => {
            const next = Math.max(0, prev - customDamage);
            if (next === 0) {
              playFanfare();
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
            }
            return next;
          });
        }
      } else {
        playError();
        setAttackTrigger({ id: Date.now(), attacker: opponent, damage: 20 });
        if (currentAttacker === 'blue') {
          setBlueHp((prev) => Math.max(0, prev - 20));
        } else {
          setRedHp((prev) => Math.max(0, prev - 20));
        }
      }
      setActiveTurn(opponent);
    }
  };

  // Helper to launch multi-burst celebration fireworks (Kembang Api Kemenangan)
  const launchVictoryFireworks = () => {
    playFanfare();
    const colors = ['#facc15', '#38bdf8', '#f43f5e', '#34d399', '#a855f7', '#fb923c'];
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { x: 0.5, y: 0.55 },
      colors
    });
    window.setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 70,
        origin: { x: 0.15, y: 0.6 },
        colors
      });
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 70,
        origin: { x: 0.85, y: 0.6 },
        colors
      });
    }, 320);
    window.setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        startVelocity: 40,
        origin: { x: 0.5, y: 0.35 },
        colors
      });
    }, 700);
  };

  // Helper to ensure the losing robot explodes when the game finishes
  const explodeDefeatedRobotOnFinish = () => {
    if (blueHp > redHp || blueScore > redScore) {
      setRedHp(0);
    } else if (redHp > blueHp || redScore > blueScore) {
      setBlueHp(0);
    } else {
      if (mode === 'individu') setRedHp(0);
    }
  };

  // ==========================================
  // HANDLERS: 1. PERTARUNGAN ROBOT TINJU 3D
  // ==========================================
  const currentBotQ = shuffledBotDeck[botQIndex % Math.max(1, shuffledBotDeck.length)];
  const roundStepDamage = Math.max(12, Math.ceil(100 / roundCount));

  const getTeamContestantTitle = (team: 'blue' | 'red', isRace = false) => {
    if (team === 'blue') {
      if (mode === 'individu') return p1DisplayName || (isRace ? 'Motor Siswa' : 'Robot Siswa');
      if (mode === 'duel') return p1DisplayName ? `${p1DisplayName} (Biru)` : 'Pemain 1 (Biru)';
      return 'Kelompok Biru';
    }
    if (mode === 'individu') return isRace ? 'Motor Rival 3D' : 'Robot Rival 3D';
    if (mode === 'duel') return p2DisplayName ? `${p2DisplayName} (Merah)` : 'Pemain 2 (Merah)';
    return 'Kelompok Merah';
  };

  const handleBotAnswer = (optIdx: number) => {
    if (botIsAnswered || !currentBotQ) return;
    if (Date.now() - botRoundEntryTimeRef.current < 300) return;
    setBotSelectedOption(optIdx);
    setBotIsAnswered(true);

    const isCorrect = optIdx === currentBotQ.correctIndex;
    const isFinalRound = botQIndex === shuffledBotDeck.length - 1;
    const dmg = roundStepDamage;

    if (mode === 'individu') {
      if (isCorrect) {
        const fastPts = calcFastPoints('blue', 25, 15);
        soundManager.playRobotPunchHit(dmg >= 30 || isFinalRound);
        setBlueScore((s) => s + fastPts);
        setAttackTrigger({ id: Date.now(), attacker: 'blue', damage: dmg });
        setRedHp((prev) => {
          const next = Math.max(0, prev - dmg);
          const finalHp = isFinalRound && blueHp >= next ? 0 : next;
          if (finalHp === 0) {
            setTimeout(() => {
              soundManager.playRobotKO();
              launchVictoryFireworks();
            }, 280);
          } else if (finalHp <= 35) {
            setTimeout(() => soundManager.playRobotCriticalSparks(), 260);
          }
          return finalHp;
        });
      } else {
        soundManager.playRobotCounterHit();
        setAttackTrigger({ id: Date.now(), attacker: 'red', damage: dmg });
        setBlueHp((prev) => {
          const next = Math.max(0, prev - dmg);
          const finalHp = isFinalRound && next < redHp ? 0 : next;
          if (finalHp === 0) {
            setTimeout(() => {
              soundManager.playRobotKO();
              launchVictoryFireworks();
            }, 280);
          } else if (finalHp <= 35) {
            setTimeout(() => soundManager.playRobotCriticalSparks(), 260);
          }
          return finalHp;
        });
      }
    }
  };

  const handleSimultaneousBotAnswer = (team: 'blue' | 'red', optIdx: number) => {
    if (!currentBotQ || botRoundLocked) return;
    if (Date.now() - botRoundEntryTimeRef.current < 350) return;
    if (team === 'blue' && botBlueSelected !== null) return;
    if (team === 'red' && botRedSelected !== null) return;

    if (team === 'blue') setBotBlueSelected(optIdx);
    else setBotRedSelected(optIdx);

    const targetIndex =
      team === 'blue' ? currentBotQ.blueCorrectIndex : currentBotQ.redCorrectIndex;
    const isCorrect = optIdx === targetIndex;
    const opponent = team === 'blue' ? 'red' : 'blue';
    const otherAlreadyAnswered =
      team === 'blue' ? botRedSelected !== null : botBlueSelected !== null;
    const isFinalRound = botQIndex >= shuffledBotDeck.length - 1;

    const teamTitle = getTeamContestantTitle(team, false);
    const oppTitle = getTeamContestantTitle(opponent, false);
    const nextRoundNum = botQIndex + 2;

    if (!otherAlreadyAnswered) {
      if (isCorrect) {
        // PESERTA PERTAMA MENJAWAB BENAR -> LAWAN LANGSUNG TERKUNCI & OTOMATIS NEXT ROUND!
        const fastPts = calcFastPoints(team, 30, 20);
        const dmg = roundStepDamage + 12;
        setBotFirstStrike(team);
        setBotRoundLocked(true);

        soundManager.playRobotPunchHit(true);
        setAttackTrigger({ id: Date.now() + Math.random(), attacker: team, damage: dmg });

        const oppCurrentHp = team === 'blue' ? redHp : blueHp;
        const willKO = isFinalRound || oppCurrentHp - dmg <= 0;

        if (team === 'blue') {
          setBlueScore((s) => s + fastPts);
          setRedHp((prev) => {
            const next = Math.max(0, prev - dmg);
            const finalHp = isFinalRound && blueHp >= next ? 0 : next;
            if (finalHp === 0) setTimeout(() => soundManager.playRobotKO(), 280);
            else if (finalHp <= 35) setTimeout(() => soundManager.playRobotCriticalSparks(), 260);
            return finalHp;
          });
        } else {
          setRedScore((s) => s + fastPts);
          setBlueHp((prev) => {
            const next = Math.max(0, prev - dmg);
            const finalHp = isFinalRound && redHp >= next ? 0 : next;
            if (finalHp === 0) setTimeout(() => soundManager.playRobotKO(), 280);
            else if (finalHp <= 35) setTimeout(() => soundManager.playRobotCriticalSparks(), 260);
            return finalHp;
          });
        }

        setBotRoundNotice({
          type: 'fast-win',
          winner: team,
          points: fastPts,
          title: `🥊 TERCEPAT & TEPAT! ${teamTitle} Meraih +${fastPts} Poin (Bonus Cepat)!`,
          subtitle: willKO
            ? `🔒 Jawaban ${oppTitle} Terkunci! Pukulan K.O. — Otomatis menampilkan Pemenang...`
            : `🔒 Jawaban ${oppTitle} Terkunci! 🔔 Otomatis lanjut ke Soal Ronde ${nextRoundNum}...`
        });
      } else {
        // PESERTA PERTAMA MENJAWAB SALAH -> MUSUH BISA MENJAWAB!
        playError();
        if (team === 'blue') {
          setBlueHp((prev) => Math.max(5, prev - 10));
        } else {
          setRedHp((prev) => Math.max(5, prev - 10));
        }
        setBotRoundNotice({
          type: 'wrong-chance',
          winner: opponent,
          title: `⚠️ ${teamTitle} Menjawab Cepat Namun SALAH!`,
          subtitle: `🎯 KESEMPATAN EMAS untuk ${oppTitle}! Silakan jawab — benar maupun salah otomatis lanjut ke ronde berikutnya!`
        });
      }
    } else {
      // PESERTA KEDUA MENJAWAB SETELAH PESERTA PERTAMA SALAH -> KUNCI & OTOMATIS NEXT ROUND (BENAR ATAUPUN SALAH)!
      setBotRoundLocked(true);

      if (isCorrect) {
        const stealPts = 30;
        const dmg = roundStepDamage + 8;
        setBotFirstStrike(team);

        soundManager.playRobotPunchHit(true);
        setAttackTrigger({ id: Date.now() + Math.random(), attacker: team, damage: dmg });

        const oppCurrentHp = team === 'blue' ? redHp : blueHp;
        const willKO = isFinalRound || oppCurrentHp - dmg <= 0;

        if (team === 'blue') {
          setBlueScore((s) => s + stealPts);
          setRedHp((prev) => {
            const next = Math.max(0, prev - dmg);
            const finalHp = isFinalRound && blueHp >= next ? 0 : next;
            if (finalHp === 0) setTimeout(() => soundManager.playRobotKO(), 280);
            else if (finalHp <= 35) setTimeout(() => soundManager.playRobotCriticalSparks(), 260);
            return finalHp;
          });
        } else {
          setRedScore((s) => s + stealPts);
          setBlueHp((prev) => {
            const next = Math.max(0, prev - dmg);
            const finalHp = isFinalRound && redHp >= next ? 0 : next;
            if (finalHp === 0) setTimeout(() => soundManager.playRobotKO(), 280);
            else if (finalHp <= 35) setTimeout(() => soundManager.playRobotCriticalSparks(), 260);
            return finalHp;
          });
        }

        setBotRoundNotice({
          type: 'steal-win',
          winner: team,
          points: stealPts,
          title: `🥊 SKENARIO MENANG! ${teamTitle} Menjawab Benar (+${stealPts} Poin)!`,
          subtitle: willKO
            ? `🏆 Pukulan K.O.! Otomatis menampilkan Pemenang...`
            : `🔔 Otomatis lanjut ke Soal Ronde ${nextRoundNum}...`
        });
      } else {
        // Peserta kedua juga menjawab salah -> otomatis next round
        soundManager.playRobotCounterHit();
        if (team === 'blue') {
          setBlueHp((prev) => Math.max(5, prev - 10));
        } else {
          setRedHp((prev) => Math.max(5, prev - 10));
        }

        setBotRoundNotice({
          type: 'both-wrong',
          title: `💥 Kedua Kubu Meleset di Ronde Ini!`,
          subtitle: isFinalRound
            ? `🔔 Otomatis menampilkan Hasil Akhir Pertandingan...`
            : `🔔 Otomatis lanjut ke Soal Ronde ${nextRoundNum}...`
        });
      }
    }
  };

  const handleNextBotQuestion = () => {
    const now = Date.now();
    blueStartTimeRef.current = now;
    redStartTimeRef.current = now;
    botRoundEntryTimeRef.current = now;
    setBotRoundLocked(false);
    setBotRoundNotice(null);

    if (botQIndex < shuffledBotDeck.length - 1 && blueHp > 0 && redHp > 0) {
      soundManager.playBoxingBell(1);
      setBotQIndex((prev) => prev + 1);
      setBotSelectedOption(null);
      setBotIsAnswered(false);
      setBotBlueSelected(null);
      setBotRedSelected(null);
      setBotFirstStrike(null);
      if (mode !== 'individu') {
        setActiveTurn((prev) => (prev === 'blue' ? 'red' : 'blue'));
      }
    } else {
      explodeDefeatedRobotOnFinish();
      soundManager.playRobotKO();
      launchVictoryFireworks();
      setBotQIndex(shuffledBotDeck.length);
    }
  };

  // ==========================================
  // HANDLERS: 2. BALAP MOTOR FUTURISTIK 3D
  // ==========================================
  const currentRaceQ = shuffledRaceDeck[raceQIndex % Math.max(1, shuffledRaceDeck.length)];
  const sectorStepBoost = Math.max(12, Math.ceil(100 / roundCount));

  const handleRaceAnswer = (optIdx: number) => {
    if (raceIsAnswered || !currentRaceQ) return;
    if (Date.now() - raceRoundEntryTimeRef.current < 300) return;
    setRaceSelectedOption(optIdx);
    setRaceIsAnswered(true);

    const isCorrect = optIdx === currentRaceQ.correctIndex;
    const isLastSector = raceQIndex === shuffledRaceDeck.length - 1;

    if (mode === 'individu') {
      if (isCorrect) {
        const fastPts = calcFastPoints('blue', 25, 15);
        soundManager.playMotoNitroBoost();
        setBlueScore((s) => s + fastPts);
        const nextBlue =
          isLastSector && blueProgress + sectorStepBoost >= redProgress
            ? 100
            : Math.min(100, blueProgress + sectorStepBoost);
        const nextRed = Math.min(90, redProgress + Math.max(6, Math.floor(sectorStepBoost * 0.45)));
        if (blueProgress <= redProgress && nextBlue > nextRed) {
          setTimeout(() => soundManager.playMotoOvertake(), 260);
        }
        if (nextBlue >= 100) {
          setTimeout(() => {
            soundManager.playMotoFinishLine();
            launchVictoryFireworks();
          }, 350);
        }
        setBlueProgress(nextBlue);
        setRedProgress(nextRed);
        setRaceRedHp((hp) => (nextBlue >= 100 ? 0 : Math.max(0, hp - 20)));
        setRaceEvent({ id: Date.now(), type: 'blue-boost' });
      } else {
        soundManager.playMotoTireSlip();
        const nextRed = isLastSector ? 100 : Math.min(100, redProgress + sectorStepBoost);
        if (nextRed >= 100) {
          setTimeout(() => {
            soundManager.playMotoFinishLine();
            launchVictoryFireworks();
          }, 350);
        }
        setRedProgress(nextRed);
        setRaceBlueHp((hp) => (nextRed >= 100 ? 0 : Math.max(0, hp - 25)));
        setRaceEvent({ id: Date.now(), type: 'red-boost' });
      }
    }
  };

  const handleSimultaneousRaceAnswer = (team: 'blue' | 'red', optIdx: number) => {
    if (!currentRaceQ || raceRoundLocked) return;
    if (Date.now() - raceRoundEntryTimeRef.current < 350) return;
    if (team === 'blue' && raceBlueSelected !== null) return;
    if (team === 'red' && raceRedSelected !== null) return;

    if (team === 'blue') setRaceBlueSelected(optIdx);
    else setRaceRedSelected(optIdx);

    const targetIdx =
      team === 'blue' ? currentRaceQ.blueCorrectIndex : currentRaceQ.redCorrectIndex;
    const isCorrect = optIdx === targetIdx;
    const opponent = team === 'blue' ? 'red' : 'blue';
    const otherAlreadyAnswered =
      team === 'blue' ? raceRedSelected !== null : raceBlueSelected !== null;
    const isLastSector = raceQIndex >= shuffledRaceDeck.length - 1;

    const teamTitle = getTeamContestantTitle(team, true);
    const oppTitle = getTeamContestantTitle(opponent, true);
    const nextRoundNum = raceQIndex + 2;

    if (!otherAlreadyAnswered) {
      // PESERTA PERTAMA MENJAWAB -> TUNGGU PESERTA KEDUA MENJAWAB SEBELUM PINDAH SOAL!
      if (isCorrect) {
        const fastPts = calcFastPoints(team, 30, 20);
        const boostAmt = sectorStepBoost + 10;
        setRaceFirstBoost(team);

        soundManager.playMotoNitroBoost();
        setTimeout(() => soundManager.playMotoOvertake(), 240);
        setRaceEvent({
          id: Date.now() + Math.random(),
          type: team === 'blue' ? 'blue-boost' : 'red-boost'
        });

        const nextProg =
          team === 'blue'
            ? Math.min(100, blueProgress + boostAmt)
            : Math.min(100, redProgress + boostAmt);

        if (team === 'blue') {
          setBlueScore((s) => s + fastPts);
          if (nextProg >= 100) setTimeout(() => soundManager.playMotoFinishLine(), 350);
          setBlueProgress(nextProg);
          setRaceRedHp((hp) => (nextProg >= 100 ? 0 : Math.max(0, hp - 25)));
        } else {
          setRedScore((s) => s + fastPts);
          if (nextProg >= 100) setTimeout(() => soundManager.playMotoFinishLine(), 350);
          setRedProgress(nextProg);
          setRaceBlueHp((hp) => (nextProg >= 100 ? 0 : Math.max(0, hp - 25)));
        }

        setRaceRoundNotice({
          type: 'fast-win',
          winner: team,
          points: fastPts,
          title: `🚀 NITRO TERCEPAT! ${teamTitle} Meraih +${fastPts} Poin (Bonus Cepat)!`,
          subtitle: `⏳ Menunggu ${oppTitle} memilih jawaban... Otomatis lanjut ke ronde berikutnya setelah semua peserta menjawab!`
        });
      } else {
        soundManager.playMotoTireSlip();
        if (team === 'blue') {
          setRaceBlueHp((hp) => Math.max(5, hp - 15));
        } else {
          setRaceRedHp((hp) => Math.max(5, hp - 15));
        }
        setRaceRoundNotice({
          type: 'wrong-chance',
          winner: opponent,
          title: `⚠️ ${teamTitle} Menjawab Cepat Namun SALAH (Ban Selip)!`,
          subtitle: `🎯 KESEMPATAN EMAS untuk ${oppTitle}! Jawab benar sekarang — otomatis lanjut setelah semua peserta menjawab!`
        });
      }
    } else {
      // PESERTA KEDUA MENJAWAB -> SEMUA PESERTA SUDAH MENJAWAB, KUNCI & OTOMATIS LANJUT KE SOAL BERIKUTNYA!
      setRaceRoundLocked(true);

      if (isCorrect) {
        if (raceFirstBoost === null) {
          // Peserta pertama salah, peserta kedua benar -> Skenario Menang!
          const stealPts = 30;
          const boostAmt = sectorStepBoost + 8;
          setRaceFirstBoost(team);

          soundManager.playMotoNitroBoost();
          setTimeout(() => soundManager.playMotoOvertake(), 240);
          setRaceEvent({
            id: Date.now() + Math.random(),
            type: team === 'blue' ? 'blue-boost' : 'red-boost'
          });

          const nextProg =
            team === 'blue'
              ? isLastSector && blueProgress + boostAmt >= redProgress
                ? 100
                : Math.min(100, blueProgress + boostAmt)
              : isLastSector && redProgress + boostAmt >= blueProgress
              ? 100
              : Math.min(100, redProgress + boostAmt);
          const oppCurrentHp = team === 'blue' ? raceRedHp : raceBlueHp;
          const willFinish = isLastSector || nextProg >= 100 || oppCurrentHp - 25 <= 0;

          if (team === 'blue') {
            setBlueScore((s) => s + stealPts);
            if (nextProg >= 100) setTimeout(() => soundManager.playMotoFinishLine(), 350);
            setBlueProgress(nextProg);
            setRaceRedHp((hp) => (nextProg >= 100 ? 0 : Math.max(0, hp - 25)));
          } else {
            setRedScore((s) => s + stealPts);
            if (nextProg >= 100) setTimeout(() => soundManager.playMotoFinishLine(), 350);
            setRedProgress(nextProg);
            setRaceBlueHp((hp) => (nextProg >= 100 ? 0 : Math.max(0, hp - 25)));
          }

          setRaceRoundNotice({
            type: 'steal-win',
            winner: team,
            points: stealPts,
            title: `🏍️💨 SKENARIO MENANG! ${teamTitle} Menyalip dengan Nitro (+${stealPts} Poin)!`,
            subtitle: willFinish
              ? `✅ Semua peserta sudah menjawab! Motor melesat ke Garis Finish — Otomatis menampilkan Pemenang...`
              : `✅ Semua peserta sudah menjawab! 🏁 Otomatis lanjut ke Soal Ronde ${nextRoundNum}...`
          });
        } else {
          // Peserta pertama sudah benar duluan, peserta kedua juga benar -> dapat poin akurasi dasar
          const basePts = 20;
          const secondBoost = Math.max(8, Math.round(sectorStepBoost * 0.55));
          soundManager.playMotoNitroBoost();
          setRaceEvent({
            id: Date.now() + Math.random(),
            type: team === 'blue' ? 'blue-boost' : 'red-boost'
          });

          if (team === 'blue') {
            setBlueScore((s) => s + basePts);
            setBlueProgress((p) => Math.min(98, p + secondBoost));
          } else {
            setRedScore((s) => s + basePts);
            setRedProgress((p) => Math.min(98, p + secondBoost));
          }

          setRaceRoundNotice({
            type: 'fast-win',
            winner: raceFirstBoost,
            points: basePts,
            title: `🚀 KEDUA PESERTA BENAR! ${oppTitle} Unggul Cepat, ${teamTitle} +${basePts} Poin!`,
            subtitle: isLastSector
              ? `✅ Semua peserta sudah menjawab! Otomatis menampilkan Hasil Akhir Balapan...`
              : `✅ Semua peserta sudah menjawab! 🏁 Otomatis lanjut ke Soal Ronde ${nextRoundNum}...`
          });
        }
      } else {
        // Peserta kedua menjawab salah
        soundManager.playMotoTireSlip();
        if (team === 'blue') {
          setRaceBlueHp((hp) => Math.max(5, hp - 15));
        } else {
          setRaceRedHp((hp) => Math.max(5, hp - 15));
        }

        if (raceFirstBoost !== null) {
          setRaceRoundNotice({
            type: 'fast-win',
            winner: raceFirstBoost,
            title: `🏍️ ${oppTitle} Memenangkan Sektor Ini! (${teamTitle} Selip)`,
            subtitle: isLastSector
              ? `✅ Semua peserta sudah menjawab! Otomatis menampilkan Pemenang...`
              : `✅ Semua peserta sudah menjawab! 🏁 Otomatis lanjut ke Soal Ronde ${nextRoundNum}...`
          });
        } else {
          setRaceRoundNotice({
            type: 'both-wrong',
            title: `⚠️ Kedua Motor Selip di Sektor Ini!`,
            subtitle: isLastSector
              ? `✅ Semua peserta sudah menjawab! Otomatis menampilkan Hasil Akhir Balapan...`
              : `✅ Semua peserta sudah menjawab! 🏁 Otomatis lanjut ke Soal Ronde ${nextRoundNum}...`
          });
        }
      }
    }
  };

  const handleNextRaceQuestion = () => {
    const now = Date.now();
    blueStartTimeRef.current = now;
    redStartTimeRef.current = now;
    raceRoundEntryTimeRef.current = now;
    setRaceRoundLocked(false);
    setRaceRoundNotice(null);

    if (
      raceQIndex < shuffledRaceDeck.length - 1 &&
      blueProgress < 100 &&
      redProgress < 100 &&
      raceBlueHp > 0 &&
      raceRedHp > 0
    ) {
      soundManager.playMotoRevStart();
      setRaceQIndex((prev) => prev + 1);
      setRaceSelectedOption(null);
      setRaceIsAnswered(false);
      setRaceBlueSelected(null);
      setRaceRedSelected(null);
      setRaceFirstBoost(null);
      if (mode !== 'individu') {
        setRaceTurn((prev) => (prev === 'blue' ? 'red' : 'blue'));
      }
    } else {
      if (blueProgress > redProgress || (blueProgress === redProgress && blueScore >= redScore)) {
        setBlueProgress(100);
        setRaceRedHp(0);
      } else {
        setRedProgress(100);
        setRaceBlueHp(0);
      }
      soundManager.playMotoFinishLine();
      launchVictoryFireworks();
      setRaceQIndex(shuffledRaceDeck.length);
    }
  };

  // Ref selalu menunjuk ke fungsi terbaru agar timer auto-next akurat
  const handleNextBotRef = useRef(handleNextBotQuestion);
  handleNextBotRef.current = handleNextBotQuestion;

  const handleNextRaceRef = useRef(handleNextRaceQuestion);
  handleNextRaceRef.current = handleNextRaceQuestion;

  // Otomatis pindah ke soal/ronde berikutnya pada Robot Tinju saat ronde terkunci
  // (Peserta pertama benar -> langsung terkunci & next round; Peserta pertama salah -> musuh jawab benar/salah -> terkunci & next round)
  const allBotParticipantsAnswered = isSimultaneous
    ? botRoundLocked
    : botIsAnswered;

  useEffect(() => {
    if (activeGame !== 'battle-bot') return;
    if (!allBotParticipantsAnswered) return;
    if (botQIndex >= shuffledBotDeck.length) return;

    const timer = window.setTimeout(() => {
      handleNextBotRef.current();
    }, 1900);

    return () => window.clearTimeout(timer);
  }, [activeGame, allBotParticipantsAnswered, botQIndex, shuffledBotDeck.length]);

  // Otomatis pindah ke soal/ronde berikutnya pada Balap Motor jika SEMUA peserta sudah menjawab
  const allRaceParticipantsAnswered = isSimultaneous
    ? raceBlueSelected !== null && raceRedSelected !== null && raceRoundLocked
    : raceIsAnswered;

  useEffect(() => {
    if (activeGame !== 'balap-robot') return;
    if (!allRaceParticipantsAnswered) return;
    if (raceQIndex >= shuffledRaceDeck.length) return;

    const timer = window.setTimeout(() => {
      handleNextRaceRef.current();
    }, 1900);

    return () => window.clearTimeout(timer);
  }, [activeGame, allRaceParticipantsAnswered, raceQIndex, shuffledRaceDeck.length]);

  // ==========================================
  // HANDLERS: 3. TEBAK KATA INFORMATIKA
  // ==========================================
  const currentWordQ = shuffledWordDeck[wordQIndex % Math.max(1, shuffledWordDeck.length)];
  const targetWord = currentWordQ.word;
  const availableLetterList = currentWordQ.scrambled.split(' ').filter(Boolean);

  const blueWordQ = shuffledWordDeck[wordBlueQIndex % Math.max(1, shuffledWordDeck.length)];
  const blueTargetWord = blueWordQ.word;
  const blueAvailableLetterList = blueWordQ.scrambled.split(' ').filter(Boolean);

  const redWordQ = shuffledRedWordDeck[wordRedQIndex % Math.max(1, shuffledRedWordDeck.length)];
  const redTargetWord = redWordQ.word;
  const redAvailableLetterList = redWordQ.scrambled.split(' ').filter(Boolean);

  const handleAddLetter = (char: string, tileIdx: number) => {
    if (wordIsCorrect === true) return;
    if (userTileIndices.includes(tileIdx)) return;

    const now = Date.now();
    if (now - lastSingleTapRef.current < 80) return;
    lastSingleTapRef.current = now;

    if (userLetters.length < targetWord.length) {
      playClick();
      const nextLetters = [...userLetters, char];
      const nextIndices = [...userTileIndices, tileIdx];
      setUserLetters(nextLetters);
      setUserTileIndices(nextIndices);

      if (nextLetters.length === targetWord.length) {
        const formedWord = nextLetters.join('');
        const isCorrect = formedWord === targetWord;
        const isFinalRound = wordQIndex === shuffledWordDeck.length - 1;
        setWordIsCorrect(isCorrect);
        if (isCorrect) {
          const pts = calcFastPoints('blue', 25, 25);
          applySpecificTeamCombat('blue', true, pts, 25, isFinalRound);
        } else {
          applyCombatOutcome(false, isFinalRound);
        }
      }
    }
  };

  const handleBackspaceLetter = () => {
    const now = Date.now();
    if (now - lastSingleTapRef.current < 140) return;
    lastSingleTapRef.current = now;

    playClick();
    setUserLetters((prev) => prev.slice(0, -1));
    setUserTileIndices((prev) => prev.slice(0, -1));
    setWordIsCorrect(null);
  };

  const handleClearAllLetters = () => {
    playClick();
    setUserLetters([]);
    setUserTileIndices([]);
    setWordIsCorrect(null);
  };

  const handleRemoveLetterAtIndex = (index: number) => {
    if (wordIsCorrect === true) return;
    if (index >= userLetters.length) return;
    playClick();
    const nextLetters = [...userLetters];
    const nextIndices = [...userTileIndices];
    nextLetters.splice(index, 1);
    nextIndices.splice(index, 1);
    setUserLetters(nextLetters);
    setUserTileIndices(nextIndices);
    setWordIsCorrect(null);
  };

  const handleTeamAddLetter = (team: 'blue' | 'red', char: string, tileIdx: number) => {
    const now = Date.now();

    if (team === 'blue') {
      if (now - lastBlueTapRef.current < ifpCooldownMs) return;
      lastBlueTapRef.current = now;
      if (wordBlueCorrect === true) return;
      if (wordBlueTileIndices.includes(tileIdx)) return;

      if (wordBlueLetters.length < blueTargetWord.length) {
        playClick();
        const nextLetters = [...wordBlueLetters, char];
        const nextIndices = [...wordBlueTileIndices, tileIdx];
        setWordBlueLetters(nextLetters);
        setWordBlueTileIndices(nextIndices);
        if (nextLetters.length === blueTargetWord.length) {
          const ok = nextLetters.join('') === blueTargetWord;
          setWordBlueCorrect(ok);
          const isFinalRound = wordBlueQIndex >= shuffledWordDeck.length - 1;
          const pts = ok ? calcFastPoints('blue', 25, 25) : 0;
          applySpecificTeamCombat('blue', ok, pts, 25, isFinalRound);
        }
      }
    } else {
      if (now - lastRedTapRef.current < ifpCooldownMs) return;
      lastRedTapRef.current = now;
      if (wordRedCorrect === true) return;
      if (wordRedTileIndices.includes(tileIdx)) return;

      if (wordRedLetters.length < redTargetWord.length) {
        playClick();
        const nextLetters = [...wordRedLetters, char];
        const nextIndices = [...wordRedTileIndices, tileIdx];
        setWordRedLetters(nextLetters);
        setWordRedTileIndices(nextIndices);
        if (nextLetters.length === redTargetWord.length) {
          const ok = nextLetters.join('') === redTargetWord;
          setWordRedCorrect(ok);
          const isFinalRound = wordRedQIndex >= shuffledRedWordDeck.length - 1;
          const pts = ok ? calcFastPoints('red', 25, 25) : 0;
          applySpecificTeamCombat('red', ok, pts, 25, isFinalRound);
        }
      }
    }
  };

  const handleTeamBackspaceLetter = (team: 'blue' | 'red') => {
    const now = Date.now();
    playClick();
    if (team === 'blue') {
      if (now - lastBlueTapRef.current < 140) return;
      lastBlueTapRef.current = now;
      setWordBlueLetters((prev) => prev.slice(0, -1));
      setWordBlueTileIndices((prev) => prev.slice(0, -1));
      setWordBlueCorrect(null);
    } else {
      if (now - lastRedTapRef.current < 140) return;
      lastRedTapRef.current = now;
      setWordRedLetters((prev) => prev.slice(0, -1));
      setWordRedTileIndices((prev) => prev.slice(0, -1));
      setWordRedCorrect(null);
    }
  };

  const handleTeamClearAll = (team: 'blue' | 'red') => {
    playClick();
    if (team === 'blue') {
      setWordBlueLetters([]);
      setWordBlueTileIndices([]);
      setWordBlueCorrect(null);
    } else {
      setWordRedLetters([]);
      setWordRedTileIndices([]);
      setWordRedCorrect(null);
    }
  };

  const handleNextTeamWordQuestion = (team: 'blue' | 'red') => {
    playClick();
    if (team === 'blue') {
      blueStartTimeRef.current = Date.now();
      setBlueLastBonus(0);
      if (wordBlueQIndex < shuffledWordDeck.length - 1) {
        setWordBlueQIndex((prev) => prev + 1);
        setWordBlueLetters([]);
        setWordBlueTileIndices([]);
        setWordBlueCorrect(null);
      } else {
        setWordBlueQIndex(shuffledWordDeck.length);
        if (wordRedQIndex >= shuffledRedWordDeck.length - 1) {
          explodeDefeatedRobotOnFinish();
          playFanfare();
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setWordQIndex(shuffledWordDeck.length);
        }
      }
    } else {
      redStartTimeRef.current = Date.now();
      setRedLastBonus(0);
      if (wordRedQIndex < shuffledRedWordDeck.length - 1) {
        setWordRedQIndex((prev) => prev + 1);
        setWordRedLetters([]);
        setWordRedTileIndices([]);
        setWordRedCorrect(null);
      } else {
        setWordRedQIndex(shuffledRedWordDeck.length);
        if (wordBlueQIndex >= shuffledWordDeck.length - 1) {
          explodeDefeatedRobotOnFinish();
          playFanfare();
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setWordQIndex(shuffledWordDeck.length);
        }
      }
    }
  };

  const handleNextWordQuestion = () => {
    playClick();
    blueStartTimeRef.current = Date.now();
    redStartTimeRef.current = Date.now();
    setBlueLastBonus(0);
    setRedLastBonus(0);
    if (wordQIndex < shuffledWordDeck.length - 1) {
      setWordQIndex((prev) => prev + 1);
      setWordBlueQIndex((prev) => prev + 1);
      setWordRedQIndex((prev) => prev + 1);
      setUserLetters([]);
      setUserTileIndices([]);
      setWordIsCorrect(null);
      setWordBlueLetters([]);
      setWordBlueTileIndices([]);
      setWordRedLetters([]);
      setWordRedTileIndices([]);
      setWordBlueCorrect(null);
      setWordRedCorrect(null);
    } else {
      explodeDefeatedRobotOnFinish();
      playFanfare();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setWordQIndex(shuffledWordDeck.length);
    }
  };

  // ==========================================
  // HANDLERS: 4. TEBAK GAMBAR MISTERI
  // ==========================================
  const currentPicQ = shuffledPicDeck[picQIndex % Math.max(1, shuffledPicDeck.length)];
  const bluePicQ = shuffledPicDeck[picBlueQIndex % Math.max(1, shuffledPicDeck.length)];
  const redPicQ = shuffledRedPicDeck[picRedQIndex % Math.max(1, shuffledRedPicDeck.length)];

  const handleRevealTile = (idx: number, team: 'blue' | 'red' = 'blue') => {
    playClick();
    if (team === 'red') {
      setPicRedRevealedTiles((prev) => {
        const next = [...prev];
        next[idx] = true;
        return next;
      });
    } else {
      setPicRevealedTiles((prev) => {
        const next = [...prev];
        next[idx] = true;
        return next;
      });
    }
  };

  const handlePicAnswer = (optIdx: number) => {
    if (picSelectedOption !== null) return;
    setPicSelectedOption(optIdx);
    setPicRevealedTiles([true, true, true, true]);

    const isCorrect = optIdx === currentPicQ.correctIndex;
    const isFinalRound = picQIndex === shuffledPicDeck.length - 1;
    if (isCorrect) {
      const pts = calcFastPoints('blue', 25, 25);
      applySpecificTeamCombat('blue', true, pts, 25, isFinalRound);
    } else {
      applyCombatOutcome(false, isFinalRound);
    }
  };

  const handleSimultaneousPicAnswer = (team: 'blue' | 'red', optIdx: number) => {
    if (team === 'blue' && picBlueSelected !== null) return;
    if (team === 'red' && picRedSelected !== null) return;

    if (team === 'blue') {
      setPicBlueSelected(optIdx);
      setPicRevealedTiles([true, true, true, true]);
      const isCorrect = optIdx === bluePicQ.correctIndex;
      const isFinalRound = picBlueQIndex >= shuffledPicDeck.length - 1;
      const pts = isCorrect ? calcFastPoints('blue', 25, 25) : 0;
      applySpecificTeamCombat('blue', isCorrect, pts, 25, isFinalRound);
    } else {
      setPicRedSelected(optIdx);
      setPicRedRevealedTiles([true, true, true, true]);
      const isCorrect = optIdx === redPicQ.correctIndex;
      const isFinalRound = picRedQIndex >= shuffledRedPicDeck.length - 1;
      const pts = isCorrect ? calcFastPoints('red', 25, 25) : 0;
      applySpecificTeamCombat('red', isCorrect, pts, 25, isFinalRound);
    }
  };

  const handleNextTeamPicQuestion = (team: 'blue' | 'red') => {
    playClick();
    if (team === 'blue') {
      blueStartTimeRef.current = Date.now();
      setBlueLastBonus(0);
      if (picBlueQIndex < shuffledPicDeck.length - 1) {
        setPicBlueQIndex((prev) => prev + 1);
        setPicRevealedTiles([false, false, false, false]);
        setPicBlueSelected(null);
      } else {
        setPicBlueQIndex(shuffledPicDeck.length);
        if (picRedQIndex >= shuffledRedPicDeck.length - 1) {
          explodeDefeatedRobotOnFinish();
          playFanfare();
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setPicQIndex(shuffledPicDeck.length);
        }
      }
    } else {
      redStartTimeRef.current = Date.now();
      setRedLastBonus(0);
      if (picRedQIndex < shuffledRedPicDeck.length - 1) {
        setPicRedQIndex((prev) => prev + 1);
        setPicRedRevealedTiles([false, false, false, false]);
        setPicRedSelected(null);
      } else {
        setPicRedQIndex(shuffledRedPicDeck.length);
        if (picBlueQIndex >= shuffledPicDeck.length - 1) {
          explodeDefeatedRobotOnFinish();
          playFanfare();
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setPicQIndex(shuffledPicDeck.length);
        }
      }
    }
  };

  const handleNextPicQuestion = () => {
    playClick();
    blueStartTimeRef.current = Date.now();
    redStartTimeRef.current = Date.now();
    setBlueLastBonus(0);
    setRedLastBonus(0);
    if (picQIndex < shuffledPicDeck.length - 1) {
      setPicQIndex((prev) => prev + 1);
      setPicBlueQIndex((prev) => prev + 1);
      setPicRedQIndex((prev) => prev + 1);
      setPicRevealedTiles([false, false, false, false]);
      setPicRedRevealedTiles([false, false, false, false]);
      setPicSelectedOption(null);
      setPicBlueSelected(null);
      setPicRedSelected(null);
    } else {
      explodeDefeatedRobotOnFinish();
      playFanfare();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setPicQIndex(shuffledPicDeck.length);
    }
  };

  // Helper to get winner summary text
  const getWinnerSummaryText = (isRace = false) => {
    const isRobotBattle = activeGame === 'battle-bot';
    if (mode === 'individu') {
      const playerWon = isRace ? blueProgress >= redProgress : blueHp >= redHp;
      if (isRace) {
        return playerWon
          ? 'Selamat! Motor Futuristik 3D milikmu berhasil melesat melewati Garis Finish di posisi Pertama!'
          : 'Motor lawan unggul di Garis Finish kali ini. Yuk tekan Balapan Lagi untuk menyalip di sirkuit 3D!';
      }
      if (isRobotBattle) {
        return playerWon
          ? 'Selamat! K.O.! Robot Tinju Atom Biru 3D milikmu berhasil menumbangkan lawan di atas Ring Real Bot 3D!'
          : 'Robot lawan unggul di ring kali ini. Yuk tekan Main Lagi untuk membalas dengan Uppercut 3D!';
      }
      return playerWon
        ? `Selamat! Kamu berhasil menuntaskan tantangan ini dengan skor tinggi (${blueScore} Poin)!`
        : 'Energi habis kali ini. Yuk tekan Main Lagi untuk menaklukkan tantangan materi ini!';
    }
    const blueNameStr = getTeamContestantTitle('blue', isRace);
    const redNameStr = getTeamContestantTitle('red', isRace);
    const p1Val = isRace ? blueProgress * 1000 + blueScore : blueScore * 1000 + blueHp;
    const p2Val = isRace ? redProgress * 1000 + redScore : redScore * 1000 + redHp;
    if (p1Val > p2Val) {
      return isRace
        ? `SELAMAT! Pemenang Balap Motor 3D: ${blueNameStr} 🏆 (${blueScore} Poin • Finish ${blueProgress}%)!`
        : `SELAMAT! Pemenang Ring Robot Tinju 3D: ${blueNameStr} 🏆 (${blueScore} Poin — K.O.)!`;
    }
    if (p2Val > p1Val) {
      return isRace
        ? `SELAMAT! Pemenang Balap Motor 3D: ${redNameStr} 🏆 (${redScore} Poin • Finish ${redProgress}%)!`
        : `SELAMAT! Pemenang Ring Robot Tinju 3D: ${redNameStr} 🏆 (${redScore} Poin — K.O.)!`;
    }
    return 'Pertandingan Berakhir Seri! Kedua Kubu Sama-Sama Hebat 🤝';
  };

  // Render Podium Pemenang + Tulisan SELAMAT + Visual Kembang Api Meriah
  const renderChampionshipVictoryCard = (isRace: boolean) => {
    const blueTitle = getTeamContestantTitle('blue', isRace);
    const redTitle = getTeamContestantTitle('red', isRace);

    let winnerSide: 'blue' | 'red' | 'draw' = 'blue';
    let winReason = '';

    if (isRace) {
      if (blueProgress >= 100 && redProgress < 100) {
        winnerSide = 'blue';
        winReason = '🏁 Melewati Garis Finish Pertama (100%)!';
      } else if (redProgress >= 100 && blueProgress < 100) {
        winnerSide = 'red';
        winReason = '🏁 Melewati Garis Finish Pertama (100%)!';
      } else if (raceRedHp <= 0 && raceBlueHp > 0) {
        winnerSide = 'blue';
        winReason = '💥 Energi Motor Lawan Habis!';
      } else if (raceBlueHp <= 0 && raceRedHp > 0) {
        winnerSide = 'red';
        winReason = '💥 Energi Motor Lawan Habis!';
      } else if (blueScore > redScore || (blueScore === redScore && blueProgress > redProgress)) {
        winnerSide = 'blue';
        winReason = '⭐ Unggul Poin & Jarak Sirkuit!';
      } else if (redScore > blueScore || (redScore === blueScore && redProgress > blueProgress)) {
        winnerSide = 'red';
        winReason = '⭐ Unggul Poin & Jarak Sirkuit!';
      } else {
        winnerSide = mode === 'individu' ? 'blue' : 'draw';
        winReason = '🤝 Pertandingan Sengit Berakhir Imbang!';
      }
    } else {
      if (redHp <= 0 && blueHp > 0) {
        winnerSide = 'blue';
        winReason = '💥 MENANG K.O. — Nyawa Robot Lawan Habis (0% HP)!';
      } else if (blueHp <= 0 && redHp > 0) {
        winnerSide = 'red';
        winReason = '💥 MENANG K.O. — Nyawa Robot Lawan Habis (0% HP)!';
      } else if (blueScore > redScore || (blueScore === redScore && blueHp > redHp)) {
        winnerSide = 'blue';
        winReason = '🥊 Menang Keunggulan Poin & Energi Ring!';
      } else if (redScore > blueScore || (redScore === blueScore && redHp > blueHp)) {
        winnerSide = 'red';
        winReason = '🥊 Menang Keunggulan Poin & Energi Ring!';
      } else {
        winnerSide = mode === 'individu' ? 'blue' : 'draw';
        winReason = '🤝 Duel Sengit Berakhir Seri!';
      }
    }

    const winnerName =
      winnerSide === 'blue'
        ? blueTitle
        : winnerSide === 'red'
        ? redTitle
        : 'Kedua Kubu (Seri)';

    return (
      <div className="relative my-auto p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border-2 border-amber-400 text-white text-center space-y-3.5 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* VISUAL KEMBANG API (ANIMATED FIREWORKS BACKGROUND & BURSTS) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Firework Burst Kiri Atas */}
          <div className="absolute -top-4 left-4 w-24 h-24 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
          <svg className="absolute top-2 left-4 w-16 h-16 text-amber-300 animate-spin" style={{ animationDuration: '9s' }} viewBox="0 0 100 100">
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="50" y1="6" x2="50" y2="24" />
              <line x1="50" y1="76" x2="50" y2="94" />
              <line x1="6" y1="50" x2="24" y2="50" />
              <line x1="76" y1="50" x2="94" y2="50" />
              <line x1="19" y1="19" x2="32" y2="32" />
              <line x1="68" y1="68" x2="81" y2="81" />
              <line x1="81" y1="19" x2="68" y2="32" />
              <line x1="32" y1="68" x2="19" y2="81" />
            </g>
            <circle cx="50" cy="50" r="6" fill="#facc15" />
          </svg>

          {/* Firework Burst Kanan Atas */}
          <div className="absolute -top-4 right-4 w-24 h-24 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
          <svg className="absolute top-3 right-4 w-16 h-16 text-cyan-300 animate-spin" style={{ animationDuration: '7s' }} viewBox="0 0 100 100">
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="50" y1="6" x2="50" y2="24" />
              <line x1="50" y1="76" x2="50" y2="94" />
              <line x1="6" y1="50" x2="24" y2="50" />
              <line x1="76" y1="50" x2="94" y2="50" />
              <line x1="19" y1="19" x2="32" y2="32" />
              <line x1="68" y1="68" x2="81" y2="81" />
              <line x1="81" y1="19" x2="68" y2="32" />
              <line x1="32" y1="68" x2="19" y2="81" />
            </g>
            <circle cx="50" cy="50" r="6" fill="#38bdf8" />
          </svg>

          {/* Firework Burst Bawah */}
          <svg className="absolute bottom-3 left-8 w-12 h-12 text-rose-400 animate-bounce" viewBox="0 0 100 100">
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="28" />
              <line x1="50" y1="72" x2="50" y2="90" />
              <line x1="10" y1="50" x2="28" y2="50" />
              <line x1="72" y1="50" x2="90" y2="50" />
            </g>
            <circle cx="50" cy="50" r="5" fill="#fb7185" />
          </svg>
          <svg className="absolute bottom-3 right-8 w-12 h-12 text-emerald-400 animate-bounce" viewBox="0 0 100 100">
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="28" />
              <line x1="50" y1="72" x2="50" y2="90" />
              <line x1="10" y1="50" x2="28" y2="50" />
              <line x1="72" y1="50" x2="90" y2="50" />
            </g>
            <circle cx="50" cy="50" r="5" fill="#34d399" />
          </svg>
        </div>

        {/* Trofi & Tulisan SELAMAT */}
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/60 text-amber-300 text-[11px] font-black uppercase tracking-widest animate-bounce">
            <span>🎆</span>
            <span>PESTA KEMBANG API JUARA</span>
            <span>🎆</span>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-orange-500 text-slate-950 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.6)] border-2 border-white">
            <Trophy className="w-9 h-9" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-cyan-200">
            🎉 SELAMAT KEPADA PEMENANG! 🎉
          </h2>

          {/* Nama Pemenang Utama */}
          <div
            className={`mx-auto max-w-md p-3 rounded-2xl border-2 shadow-lg ${
              winnerSide === 'blue'
                ? 'bg-sky-950/90 border-sky-400 text-sky-100'
                : winnerSide === 'red'
                ? 'bg-rose-950/90 border-rose-400 text-rose-100'
                : 'bg-purple-950/90 border-purple-400 text-purple-100'
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-300">
              {isRace ? '🏆 JUARA SIRKUIT BALAP MOTOR 3D' : '🏆 JUARA RING ROBOT TINJU 3D'}
            </div>
            <div className="text-base sm:text-lg font-black text-white mt-0.5">
              {winnerName}
            </div>
            <div className="text-[11px] font-bold text-amber-200 mt-0.5">
              {winReason}
            </div>
          </div>
        </div>

        {/* Papan Skor Akhir Biru vs Merah */}
        <div className="relative z-10 grid grid-cols-2 gap-2 text-left">
          <div
            className={`p-2.5 rounded-2xl border ${
              winnerSide === 'blue'
                ? 'bg-sky-900/50 border-sky-400 ring-2 ring-sky-400/50'
                : 'bg-slate-900/80 border-slate-700 opacity-85'
            }`}
          >
            <div className="text-[10px] font-black uppercase text-sky-300 truncate">
              🔵 {blueTitle} {winnerSide === 'blue' && '👑'}
            </div>
            <div className="text-sm sm:text-base font-black text-white">
              {blueScore} Poin
            </div>
            <div className="text-[10px] font-semibold text-slate-300">
              {isRace ? `Jarak: ${blueProgress}% • Energi: ${raceBlueHp}%` : `Sisa Nyawa: ${blueHp}% HP`}
            </div>
          </div>

          <div
            className={`p-2.5 rounded-2xl border ${
              winnerSide === 'red'
                ? 'bg-rose-900/50 border-rose-400 ring-2 ring-rose-400/50'
                : 'bg-slate-900/80 border-slate-700 opacity-85'
            }`}
          >
            <div className="text-[10px] font-black uppercase text-rose-300 truncate">
              🔴 {redTitle} {winnerSide === 'red' && '👑'}
            </div>
            <div className="text-sm sm:text-base font-black text-white">
              {redScore} Poin
            </div>
            <div className="text-[10px] font-semibold text-slate-300">
              {isRace ? `Jarak: ${redProgress}% • Energi: ${raceRedHp}%` : `Sisa Nyawa: ${redHp}% HP`}
            </div>
          </div>
        </div>

        {/* Tombol Kembang Api, Main Lagi & Pindah Game */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={launchVictoryFireworks}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-slate-950 text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>🎆 Kembang Api Lagi!</span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetAllGames();
              if (isRace) soundManager.playMotoRevStart();
              else soundManager.playBoxingBell(1);
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>{isRace ? 'Balapan Lagi' : 'Main Lagi'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isRace) {
                setActiveGame('battle-bot');
                resetAllGames();
                soundManager.playBoxingBell(1);
              } else {
                setActiveGame('balap-robot');
                resetAllGames();
                soundManager.playMotoRevStart();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            {isRace ? <Swords className="w-3.5 h-3.5" /> : <Flag className="w-3.5 h-3.5" />}
            <span>{isRace ? 'Robot Tinju 3D' : 'Balap Motor 3D'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen overflow-hidden flex flex-col bg-slate-100 dark:bg-slate-950 select-none animate-in fade-in duration-200">
      {/* ===================================================================== */}
      {/* 1. COMPACT FULL-SCREEN COMMAND HEADER (Zero Vertical Waste)           */}
      {/* ===================================================================== */}
      <div className="shrink-0 px-3 sm:px-5 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        {/* Left: Back Button + Topic & Active Game Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={() => {
              playClick();
              if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
              }
              onBackToDashboard();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Menu Materi</span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider truncate">
              <Gamepad2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Arena Full-Screen IFP · {topic.title}</span>
            </div>
            <h1 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
              {activeGame === 'battle-bot' && '1. Pertarungan Robot Tinju 3D (Real Bot Boxing)'}
              {activeGame === 'balap-robot' && '2. Balap Motor Futuristik 3D (Sirkuit Garis Finish)'}
              {activeGame === 'tebak-kata' && '3. Tebak Kata Informatika'}
              {activeGame === 'tebak-gambar' && '4. Tebak Gambar Misteri'}
              {activeGame === 'tug-of-war' && '5. Tarik Tambang Energi Siber'}
              {activeGame === 'bomb-defusal' && '6. Jinakkan Bom Waktu Siber'}
              {activeGame === 'tower-defense' && '7. Pertahanan Menara Firewall'}
              {activeGame === 'whack-a-mole' && '8. Ketuk Virus & Malware Siber'}
              {activeGame === 'robo-maze' && '9. Labirin Koding Algoritma'}
              {activeGame === 'spin-wheel' && '10. Roda Keberuntungan & Kotak Misteri'}
              {activeGame === 'cyber-detective' && '11. Detektif Siber: Investigasi Kasus (CSI)'}
              {activeGame === 'sketsa-cepat' && '12. Sketsa Cepat Informatika (Tantangan Gambar Layar Sentuh & Kursor)'}
            </h1>
          </div>
        </div>

        {/* Center: Mode Pemain Selector (Individu / Duel / Kelompok) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                playClick();
                setMode('individu');
                resetAllGames();
              }}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                mode === 'individu'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Individu</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setMode('duel');
                setPlayStyle('bersama');
                resetAllGames();
              }}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                mode === 'duel'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Swords className="w-3 h-3" />
              <span>Duel 1v1</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setMode('kelompok');
                setPlayStyle('bersama');
                resetAllGames();
              }}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                mode === 'kelompok'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>Kelompok</span>
            </button>
          </div>

          {mode !== 'individu' && (activeGame === 'battle-bot' || activeGame === 'balap-robot') && (
            <span className="hidden xl:flex px-2.5 py-1 rounded-xl bg-gradient-to-r from-sky-600 via-purple-600 to-rose-600 text-white text-[10px] font-extrabold items-center gap-1 shadow-xs">
              <Zap className="w-3 h-3" />
              <span>Soal Sama • Opsi Jawaban Acak • Tercepat & Tepat Kunci Lawan!</span>
            </span>
          )}

          {mode !== 'individu' && activeGame !== 'battle-bot' && activeGame !== 'balap-robot' && (
            <span className="hidden xl:flex px-2.5 py-1 rounded-xl bg-gradient-to-r from-sky-600 to-rose-600 text-white text-[10px] font-extrabold items-center gap-1 shadow-xs">
              <Zap className="w-3 h-3" />
              <span>Layar Terpisah P1 vs P2 • Soal Berbeda</span>
            </span>
          )}

          {/* Pilihan Ronde 3, 5, 7, dan 10 untuk Seluruh Mini Game */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/80">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 px-1.5">
              Ronde:
            </span>
            {[3, 5, 7, 10].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleChangeRoundCount(r)}
                className={`px-2 h-6 rounded-lg text-[11px] font-black transition-all flex items-center justify-center ${
                  roundCount === r
                    ? 'bg-purple-600 text-white shadow-xs scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                }`}
                title={`Main ${r} Ronde`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Musik Game + Database Skor Siswa + Acak Soal & Jawaban + Reset + Fullscreen Toggle + Next Module */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {/* Tombol Musik Mini Game Dinamis Sesuai Game */}
          <button
            type="button"
            onClick={handleToggleGameMusic}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 border transition-all cursor-pointer ${
              isGameMusicPlaying
                ? 'bg-pink-600 text-white border-pink-500 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}
            title={`Musik Mini Game: ${soundManager.getMiniGameTrackName(activeGame)}`}
          >
            {isGameMusicPlaying ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden md:inline">
              {isGameMusicPlaying ? soundManager.getMiniGameTrackName(activeGame) : 'Musik: OFF'}
            </span>
          </button>

          {/* Tombol Input Nama Siswa & Lihat Database Skor */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsStudentDbModalOpen(true);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Isi Nama Siswa & Lihat Riwayat Skor di Database Utama"
          >
            <Database className="w-3.5 h-3.5" />
            <span>
              {p1DisplayName
                ? mode === 'individu'
                  ? `👤 ${p1DisplayName}`
                  : `👤 ${p1DisplayName} vs ${p2DisplayName || 'P2'}`
                : 'Nama Siswa & Skor DB'}
            </span>
          </button>

          <button
            onClick={() => {
              resetAllGames();
              if (activeGame === 'battle-bot') soundManager.playBoxingBell(1);
              else if (activeGame === 'balap-robot') soundManager.playMotoRevStart();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-[11px] font-extrabold text-white flex items-center gap-1 shadow-xs cursor-pointer"
            title="Acak Ulang Urutan Soal & Pilihan Jawaban"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Acak Soal</span>
          </button>

          <button
            onClick={() => {
              resetOnlyCurrentGame();
              if (activeGame === 'battle-bot') soundManager.playBoxingBell(1);
              else if (activeGame === 'balap-robot') soundManager.playMotoRevStart();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
            title="Reset Skor & Permainan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={toggleBrowserFullscreen}
            className="px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1 transition-colors"
            title="Layar Penuh Browser (Full Screen)"
          >
            {isBrowserFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              playClick();
              if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
              }
              onNext();
            }}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold shadow-xs flex items-center gap-1"
          >
            <span>Kuis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BAR KHUSUS GURU: TEMPLATE BANK SOAL PER KUIS MINI GAME & SINKRON DB   */}
      {/* ===================================================================== */}
      {isTeacher && (
        <div
          data-live-editor-ignore="true"
          className="shrink-0 px-3 sm:px-5 py-2 bg-amber-50 dark:bg-amber-950/90 border-b border-amber-300 dark:border-amber-700 flex flex-wrap items-center justify-between gap-2 text-xs"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
              Mode Guru •{' '}
              {MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === activeGame)?.shortLabel || 'Mini Game'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] flex items-center gap-1">
              <Database className="w-3 h-3" />
              Sinkron Database Realtime
            </span>
            {quickSyncBanner && (
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white font-black text-[11px] animate-pulse">
                ✅ {quickSyncBanner}
              </span>
            )}
            {showTeacherAnswerKeys && (
              <div className="text-emerald-900 dark:text-emerald-200 font-bold text-[11px] flex flex-wrap items-center gap-2">
                {activeGame === 'battle-bot' && currentBotQ && (
                  <span>
                    🔑 <strong>Kunci Robot Tinju:</strong>{' '}
                    {isSimultaneous
                      ? `P1 Biru = ${currentBotQ.blueOptions[currentBotQ.blueCorrectIndex]?.label} | P2 Merah = ${currentBotQ.redOptions[currentBotQ.redCorrectIndex]?.label} (${currentBotQ.options[currentBotQ.correctIndex]?.text})`
                      : `Opsi ${currentBotQ.options[currentBotQ.correctIndex]?.label} — ${currentBotQ.options[currentBotQ.correctIndex]?.text}`}
                  </span>
                )}
                {activeGame === 'balap-robot' && currentRaceQ && (
                  <span>
                    🔑 <strong>Kunci Balap Motor:</strong>{' '}
                    {isSimultaneous
                      ? `P1 Biru = ${currentRaceQ.blueOptions[currentRaceQ.blueCorrectIndex]?.label} | P2 Merah = ${currentRaceQ.redOptions[currentRaceQ.redCorrectIndex]?.label} (${currentRaceQ.options[currentRaceQ.correctIndex]?.text})`
                      : `Opsi ${currentRaceQ.options[currentRaceQ.correctIndex]?.label} — ${currentRaceQ.options[currentRaceQ.correctIndex]?.text}`}
                  </span>
                )}
                {activeGame === 'tebak-kata' && currentWordQ && (
                  <span>
                    🔑 <strong>Kunci Kata Seharusnya:</strong> {currentWordQ.word}
                  </span>
                )}
                {activeGame === 'tebak-gambar' && currentPicQ && (
                  <span>
                    🔑 <strong>Kunci Tebak Gambar:</strong> Opsi{' '}
                    {String.fromCharCode(65 + currentPicQ.correctIndex)} —{' '}
                    {currentPicQ.options[currentPicQ.correctIndex]}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <input
              ref={quickExcelUploadRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  const buf = await file.arrayBuffer();
                  const parsed = parseQuestionBankExcel(
                    buf,
                    topic.id,
                    activeGame === 'tebak-kata'
                      ? 'mini-game-kata'
                      : activeGame === 'tebak-gambar'
                      ? 'mini-game-gambar'
                      : 'mini-game-battle',
                    activeGame as SpecificMiniGameId
                  );
                  if (parsed.totalItemsUpdated > 0) {
                    await syncMultipleTopicOverrides(parsed.updatesByTopic);
                    playSuccess();
                    setShuffleTick((t) => t + 1);
                    setQuickSyncBanner(
                      `Bank Soal ${
                        MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === activeGame)?.shortLabel || 'Game'
                      } (${parsed.totalItemsUpdated} Soal) Tersinkron ke DB!`
                    );
                    setTimeout(() => setQuickSyncBanner(null), 6000);
                  }
                } catch (err) {
                  console.error('Upload template mini game gagal:', err);
                } finally {
                  e.target.value = '';
                }
              }}
            />

            <button
              type="button"
              onClick={toggleTeacherAnswerKeys}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border cursor-pointer ${
                showTeacherAnswerKeys
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              {showTeacherAnswerKeys ? 'Kunci: TAMPIL' : 'Tampilkan Kunci'}
            </button>

            <button
              type="button"
              onClick={() => {
                playClick();
                setIsMiniGameBankModalOpen(true);
              }}
              className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-extrabold inline-flex items-center gap-1 shadow-xs cursor-pointer"
              title="Buka Menu Pembuat Bank Soal & Template untuk Kuis Mini Game Ini"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>
                Bank Soal & Template{' '}
                {MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === activeGame)?.shortLabel}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClick();
                downloadMiniGameTemplateExcel({
                  scope: 'single-topic',
                  topicId: topic.id,
                  gameId: activeGame as SpecificMiniGameId,
                  helpers: {
                    getEffectiveTopic,
                    getEffectiveGamePack,
                    getEffectivePblScenario,
                    overrides
                  }
                });
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-extrabold inline-flex items-center gap-1 shadow-xs cursor-pointer"
              title="Download Template Excel (.xlsx) untuk Kuis Mini Game yang sedang aktif"
            >
              <Download className="w-3 h-3" />
              <span>Download Template</span>
            </button>

            <button
              type="button"
              onClick={() => quickExcelUploadRef.current?.click()}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-extrabold inline-flex items-center gap-1 shadow-xs cursor-pointer"
              title="Upload Template Excel (.xlsx) dan langsung sinkronkan ke database utama"
            >
              <Upload className="w-3 h-3" />
              <span>Upload & Sinkron DB</span>
            </button>

            <button
              type="button"
              onClick={() => openEditorModal('tebak-gambar')}
              className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-extrabold inline-flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" /> Edit Cepat
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. COMPACT SINGLE-BAR 12 MINI GAME SWITCHER                           */}
      {/* ===================================================================== */}
      <div className="shrink-0 px-3 sm:px-5 py-1.5 bg-slate-200/70 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: 'battle-bot' as MiniGameType, label: '1. Robot Tinju 3D', icon: Swords, activeCls: 'bg-purple-600 text-white' },
            { id: 'balap-robot' as MiniGameType, label: '2. Balap Motor 3D', icon: Flag, activeCls: 'bg-amber-500 text-slate-950' },
            { id: 'tebak-kata' as MiniGameType, label: '3. Tebak Kata', icon: HelpCircle, activeCls: 'bg-purple-600 text-white' },
            { id: 'tebak-gambar' as MiniGameType, label: '4. Tebak Gambar', icon: Eye, activeCls: 'bg-purple-600 text-white' },
            { id: 'tug-of-war' as MiniGameType, label: '5. Tarik Tambang', icon: Zap, activeCls: 'bg-sky-600 text-white' },
            { id: 'bomb-defusal' as MiniGameType, label: '6. Jinakkan Bom', icon: Bomb, activeCls: 'bg-rose-600 text-white' },
            { id: 'tower-defense' as MiniGameType, label: '7. Menara Firewall', icon: Shield, activeCls: 'bg-indigo-600 text-white' },
            { id: 'whack-a-mole' as MiniGameType, label: '8. Ketuk Virus', icon: Crosshair, activeCls: 'bg-emerald-600 text-white' },
            { id: 'robo-maze' as MiniGameType, label: '9. Labirin Koding', icon: Cpu, activeCls: 'bg-violet-600 text-white' },
            { id: 'spin-wheel' as MiniGameType, label: '10. Roda Misteri', icon: Gift, activeCls: 'bg-amber-500 text-slate-950' },
            { id: 'cyber-detective' as MiniGameType, label: '11. Detektif CSI', icon: Search, activeCls: 'bg-teal-600 text-white' },
            { id: 'sketsa-cepat' as MiniGameType, label: '12. Sketsa Cepat', icon: Palette, activeCls: 'bg-emerald-600 text-white' }
          ].map((g) => {
            const Icon = g.icon;
            const isAct = activeGame === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  setActiveGame(g.id);
                  resetAllGames();
                  if (g.id === 'battle-bot') soundManager.playBoxingBell(1);
                  else if (g.id === 'balap-robot') soundManager.playMotoRevStart();
                  else playClick();
                }}
                className={`px-2.5 py-1.5 text-[11px] font-extrabold rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                  isAct
                    ? `${g.activeCls} shadow-sm scale-[1.02]`
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. MAIN COCKPIT STAGE (Responsive Scroll on Mobile, Full Fit on LG+)  */}
      {/* ===================================================================== */}
      <div className="flex-1 min-h-0 p-2 sm:p-3.5 overflow-y-auto lg:overflow-hidden flex flex-col">
        {/* =================================================================== */}
        {/* GAME 1: PERTARUNGAN ROBOT TINJU 3D                                  */}
        {/* =================================================================== */}
        {activeGame === 'battle-bot' && (
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
            {/* Left 6/7 Cols: 3D Real Bot Boxing Arena */}
            <div className={`${isSimultaneous ? 'lg:col-span-6' : 'lg:col-span-7'} relative h-full min-h-[280px] sm:min-h-[340px] lg:min-h-0 flex flex-col`}>
              <RobotBattleArena3D
                blueName={getBlueRobotLabel()}
                redName={getRedRobotLabel()}
                blueHp={blueHp}
                redHp={redHp}
                activeTurn={isSimultaneous ? 'both' : mode === 'individu' ? 'blue' : activeTurn}
                attackTrigger={attackTrigger}
                subtitle={
                  isSimultaneous
                    ? '⚡ Siapa Cepat & Tepat: Poin Lebih Banyak + Pukulan Telak + Kunci Lawan!'
                    : 'Jawab tepat untuk melancarkan Jab, Hook & Mega Uppercut Robot Tinju 3D!'
                }
              />

              {/* Overlay Banner Kembang Api di Arena 3D saat Pertandingan Selesai */}
              {(botQIndex >= shuffledBotDeck.length || (!isSimultaneous && (blueHp <= 0 || redHp <= 0))) && (
                <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-md animate-bounce">
                  <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-xs sm:text-sm text-center shadow-[0_0_30px_rgba(250,204,21,0.85)] border-2 border-white">
                    🎆 SELAMAT! {getWinnerSummaryText(false)} 🎆
                  </div>
                </div>
              )}
            </div>

            {/* Right Cols: Boxing Question & Combo Control Deck */}
            <div className={`${isSimultaneous ? 'lg:col-span-6' : 'lg:col-span-5'} h-full min-h-0 p-3.5 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl flex flex-col justify-between overflow-y-auto`}>
              {botQIndex < shuffledBotDeck.length ? (
                <>
                  {/* ATAS: Pilihan Ronde 3, 5, 7, 10, Skenario & Pertanyaan */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-lg">
                          Ronde Tinju {botQIndex + 1} / {shuffledBotDeck.length}
                        </span>
                        {isSimultaneous && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                            🔀 Soal Sama • Urutan Jawaban Acak
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                            Ronde:
                          </span>
                          {[3, 5, 7, 10].map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => handleChangeRoundCount(r)}
                              className={`px-2 h-5 rounded-md text-[10px] font-black transition-all cursor-pointer ${
                                roundCount === r
                                  ? 'bg-purple-600 text-white shadow-2xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-purple-100'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                        {renderInlineShuffleAndReset(false)}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/60">
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-snug">
                        "{currentBotQ.scenario}"
                      </p>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                      {currentBotQ.question}
                    </h3>
                  </div>

                  {/* BAWAH: Pilihan Jawaban (Duel/Kelompok Cepat vs Individu) */}
                  {isSimultaneous ? (
                    <>
                      <div className="grid grid-cols-2 gap-2 my-2">
                        {/* Pad Biru */}
                        <div
                          className={`p-2.5 rounded-2xl border-2 space-y-1.5 transition-all ${
                            botRoundNotice?.type === 'wrong-chance' && botRoundNotice.winner === 'blue'
                              ? 'bg-emerald-950/20 border-emerald-500 ring-2 ring-emerald-400/50 animate-pulse'
                              : 'bg-sky-950/15 border-sky-500/60'
                          }`}
                        >
                          <div className="text-[10px] font-black uppercase text-sky-600 dark:text-sky-300 flex items-center justify-between gap-1">
                            <span className="truncate">🥊 {getTeamContestantTitle('blue', false)}</span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] shrink-0 ${
                                botRoundLocked && botBlueSelected === null
                                  ? 'bg-rose-600 text-white'
                                  : botBlueSelected !== null
                                  ? botBlueSelected === currentBotQ.blueCorrectIndex
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-rose-600 text-white'
                                  : botRoundNotice?.type === 'wrong-chance' && botRoundNotice.winner === 'blue'
                                  ? 'bg-emerald-500 text-slate-950 animate-bounce'
                                  : 'bg-sky-500/20 text-sky-600 dark:text-sky-300'
                              }`}
                            >
                              {botRoundLocked && botBlueSelected === null
                                ? '🔒 Terkunci!'
                                : botBlueSelected !== null
                                ? botBlueSelected === currentBotQ.blueCorrectIndex
                                  ? '✅ Benar!'
                                  : '❌ Salah!'
                                : botRoundNotice?.type === 'wrong-chance' && botRoundNotice.winner === 'blue'
                                ? '🎯 Rebut Poin!'
                                : '⚡ Cepat Jawab!'}
                            </span>
                          </div>

                          {botRoundLocked && botBlueSelected === null && (
                            <div className="p-1.5 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-[10px] font-bold text-center">
                              🔒 Jawaban Terkunci — Lawan Menjawab Tercepat & Benar!
                            </div>
                          )}

                          {currentBotQ.blueOptions.map((opt: { label: string; text: string }, idx: number) => {
                            const isSel = botBlueSelected === idx;
                            const isCorr = idx === currentBotQ.blueCorrectIndex;
                            const isDisabled = botBlueSelected !== null || botRoundLocked;
                            let cls =
                              'border-sky-300 dark:border-sky-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                            if (isDisabled) {
                              if (isSel && isCorr) {
                                cls =
                                  'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-400';
                              } else if (isSel && !isCorr) {
                                cls =
                                  'border-rose-500 bg-rose-100 dark:bg-rose-900/70 text-rose-950 dark:text-rose-100 font-bold ring-2 ring-rose-400';
                              } else {
                                cls = 'opacity-40 border-slate-200 dark:border-slate-800';
                              }
                            }
                              return (
                                <button
                                  key={`bot-blue-${botQIndex}-${opt.label}`}
                                  type="button"
                                  disabled={isDisabled}
                                  onClick={() => handleSimultaneousBotAnswer('blue', idx)}
                                  className={`w-full p-2 rounded-xl border text-left text-[11px] flex items-center gap-1.5 active:scale-95 touch-manipulation transition-all ${cls}`}
                                >
                                  <span className="w-5 h-5 rounded bg-sky-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                                    {opt.label}
                                  </span>
                                  <span className="line-clamp-2 leading-tight">{opt.text}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Pad Merah */}
                          <div
                            className={`p-2.5 rounded-2xl border-2 space-y-1.5 transition-all ${
                              botRoundNotice?.type === 'wrong-chance' && botRoundNotice.winner === 'red'
                                ? 'bg-emerald-950/20 border-emerald-500 ring-2 ring-emerald-400/50 animate-pulse'
                                : 'bg-rose-950/15 border-rose-500/60'
                            }`}
                          >
                            <div className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-300 flex items-center justify-between gap-1">
                              <span className="truncate">🥊 {getTeamContestantTitle('red', false)}</span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] shrink-0 ${
                                  botRoundLocked && botRedSelected === null
                                    ? 'bg-rose-600 text-white'
                                    : botRedSelected !== null
                                    ? botRedSelected === currentBotQ.redCorrectIndex
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-rose-600 text-white'
                                    : botRoundNotice?.type === 'wrong-chance' && botRoundNotice.winner === 'red'
                                    ? 'bg-emerald-500 text-slate-950 animate-bounce'
                                    : 'bg-rose-500/20 text-rose-600 dark:text-rose-300'
                                }`}
                              >
                                {botRoundLocked && botRedSelected === null
                                  ? '🔒 Terkunci!'
                                  : botRedSelected !== null
                                  ? botRedSelected === currentBotQ.redCorrectIndex
                                    ? '✅ Benar!'
                                    : '❌ Salah!'
                                  : botRoundNotice?.type === 'wrong-chance' && botRoundNotice.winner === 'red'
                                  ? '🎯 Rebut Poin!'
                                  : '⚡ Cepat Jawab!'}
                              </span>
                            </div>

                            {botRoundLocked && botRedSelected === null && (
                              <div className="p-1.5 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-[10px] font-bold text-center">
                                🔒 Jawaban Terkunci — Lawan Menjawab Tercepat & Benar!
                              </div>
                            )}

                            {currentBotQ.redOptions.map((opt: { label: string; text: string }, idx: number) => {
                              const isSel = botRedSelected === idx;
                              const isCorr = idx === currentBotQ.redCorrectIndex;
                              const isDisabled = botRedSelected !== null || botRoundLocked;
                              let cls =
                                'border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                              if (isDisabled) {
                                if (isSel && isCorr) {
                                  cls =
                                    'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-400';
                                } else if (isSel && !isCorr) {
                                  cls =
                                    'border-rose-500 bg-rose-100 dark:bg-rose-900/70 text-rose-950 dark:text-rose-100 font-bold ring-2 ring-rose-400';
                                } else {
                                  cls = 'opacity-40 border-slate-200 dark:border-slate-800';
                                }
                              }
                              return (
                                <button
                                  key={`bot-red-${botQIndex}-${opt.label}`}
                                  type="button"
                                  disabled={isDisabled}
                                  onClick={() => handleSimultaneousBotAnswer('red', idx)}
                                  className={`w-full p-2 rounded-xl border text-left text-[11px] flex items-center gap-1.5 active:scale-95 touch-manipulation transition-all ${cls}`}
                                >
                                  <span className="w-5 h-5 rounded bg-rose-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                                    {opt.label}
                                  </span>
                                  <span className="line-clamp-2 leading-tight">{opt.text}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* NOTIFIKASI RONDE BERIKUTNYA / KESEMPATAN REBUT POIN */}
                        {botRoundNotice ? (
                          <div
                            className={`p-3 rounded-2xl border-2 shadow-lg flex flex-wrap items-center justify-between gap-2 animate-in fade-in ${
                              botRoundNotice.type === 'wrong-chance'
                                ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-400 text-amber-950 dark:text-amber-100'
                                : 'bg-slate-950 border-purple-500 text-white'
                            }`}
                          >
                            <div className="space-y-0.5 flex-1 min-w-[180px]">
                              <div className="text-xs font-black">{botRoundNotice.title}</div>
                              <div className="text-[11px] opacity-90">{botRoundNotice.subtitle}</div>
                            </div>
                            {botRoundLocked && (
                              <button
                                type="button"
                                onClick={handleNextBotQuestion}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-xl shadow-md flex items-center gap-1.5 text-xs shrink-0 cursor-pointer ring-2 ring-purple-400/50 animate-pulse"
                              >
                                <span>
                                  {botQIndex < shuffledBotDeck.length - 1 && blueHp > 0 && redHp > 0
                                    ? `Lanjut ke Soal Ronde ${botQIndex + 2}`
                                    : 'Lihat Pemenang & Kembang Api'}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                      ) : (
                        <div className="text-[11px] text-center font-bold text-purple-600 dark:text-purple-400">
                          ⚡ Jawab paling cepat & tepat untuk mendapat Bonus Poin + Pukulan Telak & mengunci jawaban lawan!
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-2 my-2">
                        {currentBotQ.options.map((opt: { label: string; text: string }, idx: number) => {
                          const isSelected = botSelectedOption === idx;

                          let btnStyle =
                            'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:border-purple-400';

                          if (botIsAnswered) {
                            if (isSelected) {
                              btnStyle =
                                'border-purple-500 bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 font-bold ring-2 ring-purple-400';
                            } else {
                              btnStyle = 'opacity-45 border-slate-200 dark:border-slate-800';
                            }
                          }

                          return (
                            <button
                              key={`bot-single-${botQIndex}-${opt.label}`}
                              type="button"
                              disabled={botIsAnswered}
                              onClick={() => handleBotAnswer(idx)}
                              className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 active:scale-98 ${btnStyle}`}
                            >
                              <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs">
                                {opt.label}
                              </span>
                              <span className="text-xs font-semibold leading-snug">
                                {opt.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {botIsAnswered ? (
                        <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 animate-in fade-in">
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                            <strong className="text-slate-900 dark:text-white block">
                              {botSelectedOption === currentBotQ.correctIndex
                                ? '🥊 PUKULAN MASUK TELAK! Otomatis lanjut ke ronde berikutnya...'
                                : '⚡ Pukulan meleset! Otomatis lanjut ke ronde berikutnya...'}
                            </strong>
                          </div>

                          <button
                            onClick={handleNextBotQuestion}
                            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl shadow-md flex items-center justify-center gap-2 text-xs"
                          >
                            <span>
                              {botQIndex < shuffledBotDeck.length - 1 && blueHp > 0 && redHp > 0
                                ? 'Ronde Tinju Berikutnya (Otomatis)'
                                : 'Lihat Hasil Pertandingan'}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center italic">
                          Pilih jawaban untuk melancarkan pukulan ke robot lawan!
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                renderChampionshipVictoryCard(false)
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* GAME 2: BALAP MOTOR FUTURISTIK 3D                                   */}
        {/* =================================================================== */}
        {activeGame === 'balap-robot' && (
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
            {/* Left Cols: 3D Futuristic Cyber-Moto Circuit */}
            <div className={`${isSimultaneous ? 'lg:col-span-6' : 'lg:col-span-7'} relative h-full min-h-[280px] sm:min-h-[340px] lg:min-h-0 flex flex-col`}>
              <RobotRaceArena3D
                blueName={getTeamContestantTitle('blue', true)}
                redName={getTeamContestantTitle('red', true)}
                blueProgress={blueProgress}
                redProgress={redProgress}
                blueHp={raceBlueHp}
                redHp={raceRedHp}
                activeTurn={isSimultaneous ? 'both' : mode === 'individu' ? 'blue' : raceTurn}
                raceEvent={raceEvent}
              />

              {/* Overlay Banner Kembang Api di Arena Sirkuit 3D saat Balapan Selesai */}
              {(raceQIndex >= shuffledRaceDeck.length ||
                (!isSimultaneous &&
                  (blueProgress >= 100 ||
                    redProgress >= 100 ||
                    raceBlueHp <= 0 ||
                    raceRedHp <= 0))) && (
                <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-md animate-bounce">
                  <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 text-slate-950 font-black text-xs sm:text-sm text-center shadow-[0_0_30px_rgba(250,204,21,0.85)] border-2 border-white">
                    🎆 SELAMAT! {getWinnerSummaryText(true)} 🎆
                  </div>
                </div>
              )}
            </div>

            {/* Right Cols: Race Sector Question & Nitro Deck */}
            <div className={`${isSimultaneous ? 'lg:col-span-6' : 'lg:col-span-5'} h-full min-h-0 p-3.5 sm:p-4 rounded-3xl border border-amber-300/70 dark:border-amber-800/60 bg-white dark:bg-slate-900 shadow-xl flex flex-col justify-between overflow-y-auto`}>
              {raceQIndex < shuffledRaceDeck.length ? (
                <>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-lg">
                          <Flag className="w-3.5 h-3.5" />
                          <span>
                            Ronde {raceQIndex + 1} / {shuffledRaceDeck.length}
                          </span>
                        </span>
                        {isSimultaneous && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                            🔀 Soal Sama • Urutan Jawaban Acak
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                            Ronde:
                          </span>
                          {[3, 5, 7, 10].map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => handleChangeRoundCount(r)}
                              className={`px-2 h-5 rounded-md text-[10px] font-black transition-all cursor-pointer ${
                                roundCount === r
                                  ? 'bg-amber-500 text-slate-950 shadow-2xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-100'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                        {renderInlineShuffleAndReset(false)}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60">
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-snug">
                        "{currentRaceQ.scenario}"
                      </p>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                      {currentRaceQ.question}
                    </h3>
                  </div>

                  {isSimultaneous ? (
                    <>
                      <div className="grid grid-cols-2 gap-2 my-2">
                        {/* Kokpit Motor Biru */}
                        <div
                          className={`p-2.5 rounded-2xl border-2 space-y-1.5 transition-all ${
                            raceRoundNotice?.type === 'wrong-chance' && raceRoundNotice.winner === 'blue'
                              ? 'bg-emerald-950/20 border-emerald-500 ring-2 ring-emerald-400/50 animate-pulse'
                              : 'bg-sky-950/15 border-sky-500/60'
                          }`}
                        >
                          <div className="text-[10px] font-black uppercase text-sky-600 dark:text-sky-300 flex items-center justify-between gap-1">
                            <span className="truncate">🏍️ {getTeamContestantTitle('blue', true)}</span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] shrink-0 ${
                                raceRoundLocked && raceBlueSelected === null
                                  ? 'bg-rose-600 text-white'
                                  : raceBlueSelected !== null
                                  ? raceBlueSelected === currentRaceQ.blueCorrectIndex
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-rose-600 text-white'
                                  : raceRoundNotice?.type === 'wrong-chance' && raceRoundNotice.winner === 'blue'
                                  ? 'bg-emerald-500 text-slate-950 animate-bounce'
                                  : 'bg-sky-500/20 text-sky-600 dark:text-sky-300'
                              }`}
                            >
                              {raceRoundLocked && raceBlueSelected === null
                                ? '🔒 Terkunci!'
                                : raceBlueSelected !== null
                                ? raceBlueSelected === currentRaceQ.blueCorrectIndex
                                  ? '🚀 Nitro!'
                                  : '❌ Selip!'
                                : raceRoundNotice?.type === 'wrong-chance' && raceRoundNotice.winner === 'blue'
                                ? '🎯 Rebut Nitro!'
                                : '⚡ Cepat Gas!'}
                            </span>
                          </div>

                          {raceRoundLocked && raceBlueSelected === null && (
                            <div className="p-1.5 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-[10px] font-bold text-center">
                              🔒 Jawaban Terkunci — Lawan Menjawab Tercepat & Benar!
                            </div>
                          )}

                          {currentRaceQ.blueOptions.map((opt, idx) => {
                            const isSel = raceBlueSelected === idx;
                            const isCorr = idx === currentRaceQ.blueCorrectIndex;
                            const isDisabled = raceBlueSelected !== null || raceRoundLocked;
                            let cls =
                              'border-sky-300 dark:border-sky-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                            if (isDisabled) {
                              if (isSel && isCorr) {
                                cls =
                                  'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-400';
                              } else if (isSel && !isCorr) {
                                cls =
                                  'border-rose-500 bg-rose-100 dark:bg-rose-900/70 text-rose-950 dark:text-rose-100 font-bold ring-2 ring-rose-400';
                              } else {
                                cls = 'opacity-40 border-slate-200 dark:border-slate-800';
                              }
                            }
                            return (
                              <button
                                key={`race-blue-${raceQIndex}-${opt.label}`}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => handleSimultaneousRaceAnswer('blue', idx)}
                                className={`w-full p-2 rounded-xl border text-left text-[11px] flex items-center gap-1.5 active:scale-95 touch-manipulation transition-all ${cls}`}
                              >
                                <span className="w-5 h-5 rounded bg-sky-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                                  {opt.label}
                                </span>
                                <span className="line-clamp-2 leading-tight">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Kokpit Motor Merah */}
                        <div
                          className={`p-2.5 rounded-2xl border-2 space-y-1.5 transition-all ${
                            raceRoundNotice?.type === 'wrong-chance' && raceRoundNotice.winner === 'red'
                              ? 'bg-emerald-950/20 border-emerald-500 ring-2 ring-emerald-400/50 animate-pulse'
                              : 'bg-rose-950/15 border-rose-500/60'
                          }`}
                        >
                          <div className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-300 flex items-center justify-between gap-1">
                            <span className="truncate">🏍️ {getTeamContestantTitle('red', true)}</span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] shrink-0 ${
                                raceRoundLocked && raceRedSelected === null
                                  ? 'bg-rose-600 text-white'
                                  : raceRedSelected !== null
                                  ? raceRedSelected === currentRaceQ.redCorrectIndex
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-rose-600 text-white'
                                  : raceRoundNotice?.type === 'wrong-chance' && raceRoundNotice.winner === 'red'
                                  ? 'bg-emerald-500 text-slate-950 animate-bounce'
                                  : 'bg-rose-500/20 text-rose-600 dark:text-rose-300'
                              }`}
                            >
                              {raceRoundLocked && raceRedSelected === null
                                ? '🔒 Terkunci!'
                                : raceRedSelected !== null
                                ? raceRedSelected === currentRaceQ.redCorrectIndex
                                  ? '🚀 Nitro!'
                                  : '❌ Selip!'
                                : raceRoundNotice?.type === 'wrong-chance' && raceRoundNotice.winner === 'red'
                                ? '🎯 Rebut Nitro!'
                                : '⚡ Cepat Gas!'}
                            </span>
                          </div>

                          {raceRoundLocked && raceRedSelected === null && (
                            <div className="p-1.5 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-[10px] font-bold text-center">
                              🔒 Jawaban Terkunci — Lawan Menjawab Tercepat & Benar!
                            </div>
                          )}

                          {currentRaceQ.redOptions.map((opt, idx) => {
                            const isSel = raceRedSelected === idx;
                            const isCorr = idx === currentRaceQ.redCorrectIndex;
                            const isDisabled = raceRedSelected !== null || raceRoundLocked;
                            let cls =
                              'border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                            if (isDisabled) {
                              if (isSel && isCorr) {
                                cls =
                                  'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-400';
                              } else if (isSel && !isCorr) {
                                cls =
                                  'border-rose-500 bg-rose-100 dark:bg-rose-900/70 text-rose-950 dark:text-rose-100 font-bold ring-2 ring-rose-400';
                              } else {
                                cls = 'opacity-40 border-slate-200 dark:border-slate-800';
                              }
                            }
                            return (
                              <button
                                key={`race-red-${raceQIndex}-${opt.label}`}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => handleSimultaneousRaceAnswer('red', idx)}
                                className={`w-full p-2 rounded-xl border text-left text-[11px] flex items-center gap-1.5 active:scale-95 touch-manipulation transition-all ${cls}`}
                              >
                                <span className="w-5 h-5 rounded bg-rose-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                                  {opt.label}
                                </span>
                                <span className="line-clamp-2 leading-tight">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* NOTIFIKASI RONDE BERIKUTNYA / KESEMPATAN REBUT NITRO */}
                      {raceRoundNotice ? (
                        <div
                          className={`p-3 rounded-2xl border-2 shadow-lg flex flex-wrap items-center justify-between gap-2 animate-in fade-in ${
                            raceRoundNotice.type === 'wrong-chance'
                              ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-400 text-amber-950 dark:text-amber-100'
                              : 'bg-slate-950 border-amber-500 text-white'
                          }`}
                        >
                          <div className="space-y-0.5 flex-1 min-w-[180px]">
                            <div className="text-xs font-black">{raceRoundNotice.title}</div>
                            <div className="text-[11px] opacity-90">{raceRoundNotice.subtitle}</div>
                          </div>
                          {raceRoundLocked && (
                            <button
                              type="button"
                              onClick={handleNextRaceQuestion}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-md flex items-center gap-1.5 text-xs shrink-0 cursor-pointer ring-2 ring-amber-300/60 animate-pulse"
                            >
                              <span>
                                {raceQIndex < shuffledRaceDeck.length - 1 &&
                                blueProgress < 100 &&
                                redProgress < 100 &&
                                raceBlueHp > 0 &&
                                raceRedHp > 0
                                  ? `Lanjut ke Soal Ronde ${raceQIndex + 2}`
                                  : 'Lihat Pemenang & Kembang Api'}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-[11px] text-center font-bold text-amber-600 dark:text-amber-400">
                          ⚡ Jawab paling cepat & tepat untuk memacu Nitro + Bonus Poin & mengunci jawaban lawan!
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-2 my-2">
                        {currentRaceQ.options.map((opt, idx) => {
                          const isSelected = raceSelectedOption === idx;

                          let btnStyle =
                            'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:border-amber-400';

                          if (raceIsAnswered) {
                            if (isSelected) {
                              btnStyle =
                                'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-bold ring-2 ring-amber-400';
                            } else {
                              btnStyle = 'opacity-45 border-slate-200 dark:border-slate-800';
                            }
                          }

                          return (
                            <button
                              key={`race-single-${raceQIndex}-${opt.label}`}
                              type="button"
                              disabled={raceIsAnswered}
                              onClick={() => handleRaceAnswer(idx)}
                              className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 active:scale-98 ${btnStyle}`}
                            >
                              <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-slate-700 text-amber-900 dark:text-amber-300 flex items-center justify-center font-extrabold text-xs shrink-0">
                                {opt.label}
                              </span>
                              <span className="text-xs font-semibold leading-snug">
                                {opt.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {raceIsAnswered ? (
                        <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 animate-in fade-in">
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                            <strong className="text-slate-900 dark:text-white block">
                              {raceSelectedOption === currentRaceQ.correctIndex
                                ? '🏍️⚡ NITRO PLASMA AKTIF! Motor Futuristik 3D wheelie & melesat!'
                                : '⚠️ Ban Selip di Tikungan! Motor lawan menyalip!'}
                            </strong>
                          </div>

                          <button
                            onClick={handleNextRaceQuestion}
                            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-md flex items-center justify-center gap-2 text-xs"
                          >
                            <span>
                              {raceQIndex < shuffledRaceDeck.length - 1 &&
                              blueProgress < 100 &&
                              redProgress < 100 &&
                              raceBlueHp > 0 &&
                              raceRedHp > 0
                                ? 'Sektor Balap Berikutnya'
                                : 'Lintasi Garis Finish!'}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center italic">
                          Pilih jawaban untuk memacu Nitro menuju Garis Finish!
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                renderChampionshipVictoryCard(true)
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* GAME 3: TEBAK KATA INFORMATIKA (SPLIT-SCREEN DUEL/KELOMPOK)         */}
        {/* =================================================================== */}
        {activeGame === 'tebak-kata' && (
          <div className="flex-1 min-h-0 flex flex-col justify-between gap-2.5 sm:gap-3 overflow-y-auto">
            {(isSplitMultiplayer
              ? wordBlueQIndex < shuffledWordDeck.length || wordRedQIndex < shuffledRedWordDeck.length
              : wordQIndex < shuffledWordDeck.length) ? (
              isSplitMultiplayer ? (
                <div className="flex-1 min-h-0 flex flex-col gap-2.5">
                  <div className="shrink-0 p-2.5 sm:p-3 rounded-2xl bg-slate-950 border border-purple-500/40 text-white flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-extrabold uppercase tracking-wider">
                        ⚡ Layar Terpisah Tebak Kata ({roundCount} Ronde)
                      </span>
                      <span className="text-[11px] text-amber-300 font-bold">
                        Soal & susunan huruf P1 dan P2 berbeda • Semakin cepat menyusun kata, semakin tinggi bonus poin!
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                      <span className="px-2.5 py-1 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-300">
                        {getBlueRobotLabel()}: {blueScore} Pts
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-rose-950 border border-rose-500/40 text-rose-300">
                        {getRedRobotLabel()}: {redScore} Pts
                      </span>
                      {renderInlineShuffleAndReset(true)}
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    {/* PANEL KIRI: PEMAIN 1 / TIM BIRU */}
                    <div className="p-3.5 sm:p-4 rounded-3xl bg-sky-950/20 dark:bg-slate-900 border-2 border-sky-500/70 shadow-lg flex flex-col justify-between gap-3">
                      <div className="flex items-center justify-between gap-2 border-b border-sky-500/30 pb-2">
                        <span className="px-3 py-1 rounded-xl bg-sky-600 text-white text-xs font-black">
                          🛡️ {getBlueRobotLabel()}
                        </span>
                        <span className="text-xs font-extrabold text-sky-600 dark:text-sky-300">
                          Ronde {Math.min(wordBlueQIndex + 1, shuffledWordDeck.length)} / {shuffledWordDeck.length} • ({blueTargetWord.length} Huruf)
                        </span>
                      </div>

                      {wordBlueQIndex < shuffledWordDeck.length ? (
                        <>
                          <div className="p-3 rounded-2xl bg-slate-900 text-white border border-sky-500/40 space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 block">
                              Soal Khusus Pemain 1 (Biru):
                            </span>
                            <p className="text-xs sm:text-sm font-extrabold leading-snug">
                              "{blueWordQ.dailyContext}"
                            </p>
                            <p className="text-[11px] text-amber-300 italic">
                              Petunjuk: {blueWordQ.clue}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-1.5">
                            {Array.from({ length: blueTargetWord.length }).map((_, i) => {
                              const ch = wordBlueLetters[i];
                              return (
                                <div
                                  key={i}
                                  className={`w-9 h-10 sm:w-11 sm:h-12 rounded-xl border-2 flex items-center justify-center text-sm sm:text-lg font-black font-mono select-none ${
                                    ch
                                      ? wordBlueCorrect === true
                                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                                        : wordBlueCorrect === false
                                        ? 'border-rose-500 bg-rose-500/20 text-rose-600 dark:text-rose-300'
                                        : 'border-sky-500 bg-sky-500/20 text-sky-900 dark:text-white'
                                      : 'border-dashed border-slate-300 dark:border-slate-700'
                                  }`}
                                >
                                  {ch || ''}
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-2">
                            {blueAvailableLetterList.map((letter: string, idx: number) => {
                              const isUsed = wordBlueTileIndices.includes(idx);
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  disabled={isUsed || wordBlueCorrect === true}
                                  onClick={() => handleTeamAddLetter('blue', letter, idx)}
                                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 text-sm sm:text-base font-black font-mono transition-all touch-manipulation select-none ${
                                    isUsed
                                      ? 'opacity-20 scale-90 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                      : 'bg-white dark:bg-slate-800 border-sky-400 dark:border-sky-600 hover:border-sky-500 text-slate-800 dark:text-white shadow-sm active:scale-90 cursor-pointer'
                                  }`}
                                >
                                  {letter}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-sky-500/20">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                disabled={wordBlueLetters.length === 0 || wordBlueCorrect === true}
                                onClick={() => handleTeamBackspaceLetter('blue')}
                                className="px-3 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-xs font-bold text-rose-700 dark:text-rose-300 active:scale-95 disabled:opacity-30"
                              >
                                ⌫ Hapus
                              </button>
                              <button
                                type="button"
                                disabled={wordBlueLetters.length === 0 || wordBlueCorrect === true}
                                onClick={() => handleTeamClearAll('blue')}
                                className="px-3 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 active:scale-95 disabled:opacity-30"
                              >
                                ↺ Reset
                              </button>
                            </div>

                            {wordBlueCorrect !== null && (
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs font-extrabold ${
                                    wordBlueCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                  }`}
                                >
                                  {wordBlueCorrect ? `✅ Benar! (+${25 + blueLastBonus} Pts)` : '❌ Belum Tepat'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleNextTeamWordQuestion('blue')}
                                  className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold flex items-center gap-1 shadow-sm"
                                >
                                  <span>Soal P1 Berikutnya</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="my-auto text-center p-6 space-y-2">
                          <Trophy className="w-10 h-10 text-sky-500 mx-auto" />
                          <p className="text-base font-black text-slate-900 dark:text-white">
                            {getBlueRobotLabel()} Selesai Semua Ronde!
                          </p>
                          <p className="text-xs text-slate-500">Total Skor: {blueScore} Poin</p>
                        </div>
                      )}
                    </div>

                    {/* PANEL KANAN: PEMAIN 2 / TIM MERAH */}
                    <div className="p-3.5 sm:p-4 rounded-3xl bg-rose-950/20 dark:bg-slate-900 border-2 border-rose-500/70 shadow-lg flex flex-col justify-between gap-3">
                      <div className="flex items-center justify-between gap-2 border-b border-rose-500/30 pb-2">
                        <span className="px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-black">
                          ⚔️ {getRedRobotLabel()}
                        </span>
                        <span className="text-xs font-extrabold text-rose-600 dark:text-rose-300">
                          Ronde {Math.min(wordRedQIndex + 1, shuffledRedWordDeck.length)} / {shuffledRedWordDeck.length} • ({redTargetWord.length} Huruf)
                        </span>
                      </div>

                      {wordRedQIndex < shuffledRedWordDeck.length ? (
                        <>
                          <div className="p-3 rounded-2xl bg-slate-900 text-white border border-rose-500/40 space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">
                              Soal Khusus Pemain 2 (Merah):
                            </span>
                            <p className="text-xs sm:text-sm font-extrabold leading-snug">
                              "{redWordQ.dailyContext}"
                            </p>
                            <p className="text-[11px] text-amber-300 italic">
                              Petunjuk: {redWordQ.clue}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-1.5">
                            {Array.from({ length: redTargetWord.length }).map((_, i) => {
                              const ch = wordRedLetters[i];
                              return (
                                <div
                                  key={i}
                                  className={`w-9 h-10 sm:w-11 sm:h-12 rounded-xl border-2 flex items-center justify-center text-sm sm:text-lg font-black font-mono select-none ${
                                    ch
                                      ? wordRedCorrect === true
                                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                                        : wordRedCorrect === false
                                        ? 'border-rose-500 bg-rose-500/20 text-rose-600 dark:text-rose-300'
                                        : 'border-rose-500 bg-rose-500/20 text-rose-900 dark:text-white'
                                      : 'border-dashed border-slate-300 dark:border-slate-700'
                                  }`}
                                >
                                  {ch || ''}
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-2">
                            {redAvailableLetterList.map((letter: string, idx: number) => {
                              const isUsed = wordRedTileIndices.includes(idx);
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  disabled={isUsed || wordRedCorrect === true}
                                  onClick={() => handleTeamAddLetter('red', letter, idx)}
                                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 text-sm sm:text-base font-black font-mono transition-all touch-manipulation select-none ${
                                    isUsed
                                      ? 'opacity-20 scale-90 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                      : 'bg-white dark:bg-slate-800 border-rose-400 dark:border-rose-600 hover:border-rose-500 text-slate-800 dark:text-white shadow-sm active:scale-90 cursor-pointer'
                                  }`}
                                >
                                  {letter}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-rose-500/20">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                disabled={wordRedLetters.length === 0 || wordRedCorrect === true}
                                onClick={() => handleTeamBackspaceLetter('red')}
                                className="px-3 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-xs font-bold text-rose-700 dark:text-rose-300 active:scale-95 disabled:opacity-30"
                              >
                                ⌫ Hapus
                              </button>
                              <button
                                type="button"
                                disabled={wordRedLetters.length === 0 || wordRedCorrect === true}
                                onClick={() => handleTeamClearAll('red')}
                                className="px-3 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 active:scale-95 disabled:opacity-30"
                              >
                                ↺ Reset
                              </button>
                            </div>

                            {wordRedCorrect !== null && (
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs font-extrabold ${
                                    wordRedCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                  }`}
                                >
                                  {wordRedCorrect ? `✅ Benar! (+${25 + redLastBonus} Pts)` : '❌ Belum Tepat'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleNextTeamWordQuestion('red')}
                                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1 shadow-sm"
                                >
                                  <span>Soal P2 Berikutnya</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="my-auto text-center p-6 space-y-2">
                          <Trophy className="w-10 h-10 text-rose-500 mx-auto" />
                          <p className="text-base font-black text-slate-900 dark:text-white">
                            {getRedRobotLabel()} Selesai Semua Ronde!
                          </p>
                          <p className="text-xs text-slate-500">Total Skor: {redScore} Poin</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* MODE INDIVIDU: Soal Petunjuk Kontekstual & Kotak Susunan Huruf */}
                  <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-950 border-2 border-purple-500/50 text-white shadow-lg flex flex-col gap-2.5 shrink-0 select-none">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-extrabold uppercase tracking-wider">
                          Tantangan Kata {wordQIndex + 1} / {shuffledWordDeck.length}
                        </span>
                        <span className="text-xs font-mono text-amber-300">
                          ({targetWord.length} Huruf)
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                        <span className="px-2.5 py-1 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-300">
                          {getBlueRobotLabel()}: {blueScore}pts ({blueHp}%)
                        </span>
                        {renderInlineShuffleAndReset(true)}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-900 border border-purple-500/30 text-center space-y-0.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center justify-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>SOAL PETUNJUK TEBAK KATA ({topic.title}):</span>
                      </div>
                      <p className="text-sm sm:text-base font-extrabold text-white leading-snug">
                        "{currentWordQ.dailyContext}"
                      </p>
                      <p className="text-xs text-amber-300 italic">
                        Petunjuk Kata: {currentWordQ.clue}
                      </p>
                    </div>

                    <div className="pt-1 text-center">
                      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                        {Array.from({ length: targetWord.length }).map((_, i) => {
                          const char = userLetters[i];
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleRemoveLetterAtIndex(i)}
                              title={char ? 'Ketuk untuk membatalkan huruf ini' : 'Kotak huruf jawaban'}
                              className={`w-11 h-12 sm:w-14 sm:h-16 md:w-16 md:h-18 rounded-2xl border-2 flex items-center justify-center text-lg sm:text-2xl font-black font-mono transition-all touch-manipulation select-none ${
                                char
                                  ? wordIsCorrect === true
                                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-400/40'
                                    : wordIsCorrect === false
                                    ? 'border-rose-400 bg-rose-500/20 text-rose-300 ring-2 ring-rose-400/40'
                                    : 'border-purple-400 bg-purple-500/30 text-white cursor-pointer hover:border-rose-400 hover:bg-rose-950/40'
                                  : 'border-dashed border-slate-700 bg-slate-900/90 text-slate-600'
                              }`}
                            >
                              {char || ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 p-3.5 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg flex flex-col justify-between gap-3 select-none">
                    <div className="space-y-3.5 my-auto max-w-4xl mx-auto w-full">
                      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 py-2">
                        {availableLetterList.map((letter: string, idx: number) => {
                          const isUsed = userTileIndices.includes(idx);
                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={isUsed || wordIsCorrect === true}
                              onClick={() => handleAddLetter(letter, idx)}
                              className={`w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center text-lg sm:text-2xl md:text-3xl font-black font-mono transition-all touch-manipulation select-none ${
                                isUsed
                                  ? 'opacity-20 scale-90 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                                  : 'border-purple-300 dark:border-purple-700 hover:border-purple-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md active:scale-95 cursor-pointer'
                              }`}
                            >
                              <span>{letter}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={handleBackspaceLetter}
                          disabled={userLetters.length === 0 || wordIsCorrect === true}
                          className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-800 text-xs sm:text-sm font-extrabold text-rose-700 dark:text-rose-300 active:scale-95 disabled:opacity-30 flex items-center gap-2 shadow-xs cursor-pointer"
                        >
                          <span>⌫ Hapus Huruf Terakhir</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleClearAllLetters}
                          disabled={userLetters.length === 0 || wordIsCorrect === true}
                          className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-300 active:scale-95 disabled:opacity-30 flex items-center gap-2 shadow-xs cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Bersihkan Kata</span>
                        </button>
                      </div>
                    </div>

                    {wordIsCorrect !== null ? (
                      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in select-none">
                        <div className="flex items-center gap-2">
                          {wordIsCorrect ? (
                            <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 className="w-5 h-5 shrink-0" />
                              <span>Tepat Sekali! Kata "{targetWord}" berhasil disusun (+{25 + blueLastBonus} Poin)!</span>
                            </span>
                          ) : (
                            <span className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                              <XCircle className="w-5 h-5 shrink-0" />
                              <span>Susunan belum tepat! Tekan Hapus / Bersihkan Kata, atau lanjut ke kata berikutnya.</span>
                            </span>
                          )}
                        </div>

                        <button
                          onClick={handleNextWordQuestion}
                          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl shadow-md text-xs sm:text-sm flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                          <span>
                            {wordQIndex < shuffledWordDeck.length - 1
                              ? 'Kata Berikutnya'
                              : 'Lihat Hasil Akhir'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-slate-400 select-none">
                        Ketuk huruf satu per satu dengan cepat untuk memperoleh bonus poin kecepatan!
                      </div>
                    )}
                  </div>
                </>
              )
            ) : (
              <div className="my-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-5 max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 mx-auto flex items-center justify-center">
                  <Trophy className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Tebak Kata Informatika Selesai!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {getWinnerSummaryText(false)}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={resetAllGames}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold flex items-center gap-1.5"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Acak Soal & Main Lagi</span>
                  </button>
                  <button
                    onClick={resetOnlyCurrentGame}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => {
                      playClick();
                      setActiveGame('tebak-gambar');
                      resetAllGames();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                  >
                    <span>Lanjut Tebak Gambar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* GAME 4: TEBAK GAMBAR MISTERI (SPLIT-SCREEN DUEL/KELOMPOK)           */}
        {/* =================================================================== */}
        {activeGame === 'tebak-gambar' && (
          <div className="flex-1 min-h-0 flex flex-col justify-between gap-2.5 sm:gap-3 overflow-y-auto">
            {(isSplitMultiplayer
              ? picBlueQIndex < shuffledPicDeck.length || picRedQIndex < shuffledRedPicDeck.length
              : picQIndex < shuffledPicDeck.length) ? (
              isSplitMultiplayer ? (
                <div className="flex-1 min-h-0 flex flex-col gap-2.5">
                  <div className="shrink-0 p-2.5 sm:p-3 rounded-2xl bg-slate-950 border border-purple-500/40 text-white flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-extrabold uppercase tracking-wider">
                        ⚡ Layar Terpisah Tebak Gambar ({roundCount} Ronde)
                      </span>
                      <span className="text-[11px] text-amber-300 font-bold">
                        Gambar & opsi P1 dan P2 berbeda • Menjawab lebih cepat meraih poin lebih tinggi!
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                      <span className="px-2.5 py-1 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-300">
                        {getBlueRobotLabel()}: {blueScore} Pts
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-rose-950 border border-rose-500/40 text-rose-300">
                        {getRedRobotLabel()}: {redScore} Pts
                      </span>
                      {renderInlineShuffleAndReset(true)}
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    {/* PANEL KIRI: PEMAIN 1 / TIM BIRU */}
                    <div className="p-3.5 sm:p-4 rounded-3xl bg-sky-950/20 dark:bg-slate-900 border-2 border-sky-500/70 shadow-lg flex flex-col justify-between gap-3">
                      <div className="flex items-center justify-between gap-2 border-b border-sky-500/30 pb-2">
                        <span className="px-3 py-1 rounded-xl bg-sky-600 text-white text-xs font-black">
                          🛡️ {getBlueRobotLabel()}
                        </span>
                        <span className="text-xs font-extrabold text-sky-600 dark:text-sky-300">
                          Ronde {Math.min(picBlueQIndex + 1, shuffledPicDeck.length)} / {shuffledPicDeck.length}
                        </span>
                      </div>

                      {picBlueQIndex < shuffledPicDeck.length ? (
                        <>
                          <div className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border-3 border-sky-500/60 bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                              <PictureIllustration
                                answerKey={bluePicQ.options[bluePicQ.correctIndex]}
                                iconName={bluePicQ.iconName}
                                title={bluePicQ.title}
                                customImageUrl={bluePicQ.customImageUrl}
                              />
                              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                                {[0, 1, 2, 3].map((tileIdx) => (
                                  <button
                                    key={tileIdx}
                                    type="button"
                                    disabled={picRevealedTiles[tileIdx]}
                                    onClick={() => handleRevealTile(tileIdx, 'blue')}
                                    className={`w-full h-full rounded-xl flex items-center justify-center font-black text-[10px] transition-all ${
                                      picRevealedTiles[tileIdx]
                                        ? 'opacity-0 pointer-events-none'
                                        : 'bg-gradient-to-br from-sky-600 to-indigo-700 text-white hover:brightness-110 shadow-sm'
                                    }`}
                                  >
                                    Buka {tileIdx + 1}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-slate-900 text-white border border-sky-500/40 space-y-1 flex-1">
                              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 block">
                                Kasus Gambar Pemain 1 (Biru):
                              </span>
                              <p className="text-xs sm:text-sm font-extrabold leading-snug">
                                "{bluePicQ.dailyContext}"
                              </p>
                              <p className="text-[11px] text-amber-300">
                                Petunjuk: {bluePicQ.clue}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {bluePicQ.options.map((optText: string, idx: number) => {
                              const isSel = picBlueSelected === idx;
                              const isCor = idx === bluePicQ.correctIndex;
                              let cls = 'border-sky-300 dark:border-sky-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                              if (picBlueSelected !== null) {
                                if (isCor) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 font-bold';
                                else if (isSel) cls = 'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-800 dark:text-rose-200';
                                else cls = 'opacity-50 border-slate-200 dark:border-slate-800';
                              }
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  disabled={picBlueSelected !== null}
                                  onClick={() => handleSimultaneousPicAnswer('blue', idx)}
                                  className={`p-2.5 rounded-xl border-2 text-left text-xs font-bold flex items-center gap-2 active:scale-95 touch-manipulation ${cls}`}
                                >
                                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                                    {String.fromCharCode(65 + idx)}
                                  </span>
                                  <span className="line-clamp-2">{optText}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-sky-500/20">
                            <span className="text-xs font-extrabold text-sky-600 dark:text-sky-300">
                              {picBlueSelected === null
                                ? 'Buka ubin & pilih jawaban secepatnya!'
                                : picBlueSelected === bluePicQ.correctIndex
                                ? `✅ Tepat! (+${25 + blueLastBonus} Pts)`
                                : '❌ Kurang Tepat'}
                            </span>
                            {picBlueSelected !== null && (
                              <button
                                type="button"
                                onClick={() => handleNextTeamPicQuestion('blue')}
                                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold flex items-center gap-1 shadow-sm"
                              >
                                <span>Gambar P1 Berikutnya</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="my-auto text-center p-6 space-y-2">
                          <Trophy className="w-10 h-10 text-sky-500 mx-auto" />
                          <p className="text-base font-black text-slate-900 dark:text-white">
                            {getBlueRobotLabel()} Selesai Semua Ronde!
                          </p>
                          <p className="text-xs text-slate-500">Total Skor: {blueScore} Poin</p>
                        </div>
                      )}
                    </div>

                    {/* PANEL KANAN: PEMAIN 2 / TIM MERAH */}
                    <div className="p-3.5 sm:p-4 rounded-3xl bg-rose-950/20 dark:bg-slate-900 border-2 border-rose-500/70 shadow-lg flex flex-col justify-between gap-3">
                      <div className="flex items-center justify-between gap-2 border-b border-rose-500/30 pb-2">
                        <span className="px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-black">
                          ⚔️ {getRedRobotLabel()}
                        </span>
                        <span className="text-xs font-extrabold text-rose-600 dark:text-rose-300">
                          Ronde {Math.min(picRedQIndex + 1, shuffledRedPicDeck.length)} / {shuffledRedPicDeck.length}
                        </span>
                      </div>

                      {picRedQIndex < shuffledRedPicDeck.length ? (
                        <>
                          <div className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border-3 border-rose-500/60 bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                              <PictureIllustration
                                answerKey={redPicQ.options[redPicQ.correctIndex]}
                                iconName={redPicQ.iconName}
                                title={redPicQ.title}
                                customImageUrl={redPicQ.customImageUrl}
                              />
                              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                                {[0, 1, 2, 3].map((tileIdx) => (
                                  <button
                                    key={tileIdx}
                                    type="button"
                                    disabled={picRedRevealedTiles[tileIdx]}
                                    onClick={() => handleRevealTile(tileIdx, 'red')}
                                    className={`w-full h-full rounded-xl flex items-center justify-center font-black text-[10px] transition-all ${
                                      picRedRevealedTiles[tileIdx]
                                        ? 'opacity-0 pointer-events-none'
                                        : 'bg-gradient-to-br from-rose-600 to-pink-700 text-white hover:brightness-110 shadow-sm'
                                    }`}
                                  >
                                    Buka {tileIdx + 1}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-slate-900 text-white border border-rose-500/40 space-y-1 flex-1">
                              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">
                                Kasus Gambar Pemain 2 (Merah):
                              </span>
                              <p className="text-xs sm:text-sm font-extrabold leading-snug">
                                "{redPicQ.dailyContext}"
                              </p>
                              <p className="text-[11px] text-amber-300">
                                Petunjuk: {redPicQ.clue}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {redPicQ.options.map((optText: string, idx: number) => {
                              const isSel = picRedSelected === idx;
                              const isCor = idx === redPicQ.correctIndex;
                              let cls = 'border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                              if (picRedSelected !== null) {
                                if (isCor) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 font-bold';
                                else if (isSel) cls = 'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-800 dark:text-rose-200';
                                else cls = 'opacity-50 border-slate-200 dark:border-slate-800';
                              }
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  disabled={picRedSelected !== null}
                                  onClick={() => handleSimultaneousPicAnswer('red', idx)}
                                  className={`p-2.5 rounded-xl border-2 text-left text-xs font-bold flex items-center gap-2 active:scale-95 touch-manipulation ${cls}`}
                                >
                                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                                    {String.fromCharCode(65 + idx)}
                                  </span>
                                  <span className="line-clamp-2">{optText}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-rose-500/20">
                            <span className="text-xs font-extrabold text-rose-600 dark:text-rose-300">
                              {picRedSelected === null
                                ? 'Buka ubin & pilih jawaban secepatnya!'
                                : picRedSelected === redPicQ.correctIndex
                                ? `✅ Tepat! (+${25 + redLastBonus} Pts)`
                                : '❌ Kurang Tepat'}
                            </span>
                            {picRedSelected !== null && (
                              <button
                                type="button"
                                onClick={() => handleNextTeamPicQuestion('red')}
                                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1 shadow-sm"
                              >
                                <span>Gambar P2 Berikutnya</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="my-auto text-center p-6 space-y-2">
                          <Trophy className="w-10 h-10 text-rose-500 mx-auto" />
                          <p className="text-base font-black text-slate-900 dark:text-white">
                            {getRedRobotLabel()} Selesai Semua Ronde!
                          </p>
                          <p className="text-xs text-slate-500">Total Skor: {redScore} Poin</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* MODE INDIVIDU: Soal Kontekstual & Kanvas 4 Ubin Gambar Misteri */}
                  <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-950 border-2 border-purple-500/50 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-extrabold uppercase tracking-wider">
                          Gambar Misteri {picQIndex + 1} / {shuffledPicDeck.length}
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          {picSelectedOption !== null && (
                            <button
                              type="button"
                              onClick={handleNextPicQuestion}
                              className="flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-black shadow-md ring-2 ring-purple-300 animate-pulse cursor-pointer"
                              title="Lanjut ke Gambar Berikutnya (Akses Cepat IFP)"
                            >
                              <span>{picQIndex < shuffledPicDeck.length - 1 ? 'Gambar Berikutnya →' : 'Lihat Hasil Akhir'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {renderInlineShuffleAndReset(true)}
                          {isTeacher && (
                            <button
                              type="button"
                              onClick={() => {
                                playClick();
                                openEditorModal('tebak-gambar');
                              }}
                              className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[11px] font-bold shadow-xs"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit Soal & Gambar</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                          SOAL PETUNJUK TEBAK GAMBAR ({topic.title}):
                        </span>
                        <p className="text-sm sm:text-base font-extrabold text-white leading-snug">
                          "{currentPicQ.dailyContext}"
                        </p>
                        <p className="text-xs text-amber-300 font-medium">
                          Petunjuk Visual: {currentPicQ.clue}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                        <span className="px-3 py-1 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-300">
                          {getBlueRobotLabel()}: {blueScore} Poin ({blueHp}%)
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-3xl border-4 border-purple-500/60 bg-slate-100 dark:bg-slate-900 overflow-hidden shadow-lg flex items-center justify-center p-2">
                        <div className="w-full h-full flex items-center justify-center">
                          <PictureIllustration
                            answerKey={currentPicQ.options[currentPicQ.correctIndex]}
                            iconName={currentPicQ.iconName}
                            title={currentPicQ.title}
                            customImageUrl={currentPicQ.customImageUrl}
                          />
                        </div>

                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1 pointer-events-auto">
                          {[0, 1, 2, 3].map((tileIdx) => (
                            <button
                              key={tileIdx}
                              disabled={picRevealedTiles[tileIdx]}
                              onClick={() => handleRevealTile(tileIdx, 'blue')}
                              className={`w-full h-full rounded-2xl flex items-center justify-center font-black text-xs transition-all ${
                                picRevealedTiles[tileIdx]
                                  ? 'opacity-0 pointer-events-none'
                                  : 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white hover:brightness-110 shadow-md active:scale-95'
                              }`}
                            >
                              <span>Buka {tileIdx + 1}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Ketuk ubin ungu untuk membuka petunjuk gambar
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 p-3.5 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg flex flex-col justify-between gap-2.5">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Pilih Jawaban yang Sesuai dengan Gambar Misteri di Atas:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 my-auto">
                      {currentPicQ.options.map((optText: string, idx: number) => {
                        const isSelected = picSelectedOption === idx;
                        const isCorrect = idx === currentPicQ.correctIndex;

                        let style =
                          'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-purple-500';

                        if (picSelectedOption !== null) {
                          if (isCorrect) {
                            style =
                              'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold';
                          } else if (isSelected) {
                            style =
                              'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={picSelectedOption !== null}
                            onClick={() => handlePicAnswer(idx)}
                            className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-center gap-3 active:scale-98 ${style}`}
                          >
                            <span className="w-7 h-7 rounded-xl bg-purple-100 dark:bg-slate-700 text-purple-900 dark:text-purple-300 font-black text-xs flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{optText}</span>
                          </button>
                        );
                      })}
                    </div>

                    {picSelectedOption !== null ? (
                      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {picSelectedOption === currentPicQ.correctIndex
                            ? `✅ Tebakan Tepat! Kamu mendapatkan +${25 + blueLastBonus} Poin!`
                            : '❌ Tebakan Kurang Tepat! Energi berkurang, tetap semangat!'}
                        </span>

                        <button
                          onClick={handleNextPicQuestion}
                          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl shadow-md text-xs flex items-center gap-2 shrink-0"
                        >
                          <span>
                            {picQIndex < shuffledPicDeck.length - 1
                              ? 'Gambar Berikutnya'
                              : 'Lihat Hasil Akhir'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-slate-400">
                        Buka ubin petunjuk di atas seperlunya lalu pilih jawaban secepatnya!
                      </div>
                    )}
                  </div>
                </>
              )
            ) : (
              <div className="my-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-5 max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center">
                  <Trophy className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Tebak Gambar Misteri Selesai!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {getWinnerSummaryText(false)}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={resetAllGames}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold flex items-center gap-1.5"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Acak Soal & Main Lagi</span>
                  </button>
                  <button
                    onClick={resetOnlyCurrentGame}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => {
                      playClick();
                      setActiveGame('tug-of-war');
                      resetAllGames();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                  >
                    <span>Lanjut ke Tarik Tambang Siber</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* GAMES 5–12: EIGHT EXTRA INTERACTIVE MINI GAMES                      */}
        {/* =================================================================== */}
        {(activeGame === 'tug-of-war' ||
          activeGame === 'bomb-defusal' ||
          activeGame === 'tower-defense' ||
          activeGame === 'whack-a-mole' ||
          activeGame === 'robo-maze' ||
          activeGame === 'spin-wheel' ||
          activeGame === 'cyber-detective' ||
          activeGame === 'sketsa-cepat') && (
          <div className="relative flex-1 min-h-0 flex flex-col">
            <SevenExtraMiniGamesArena
              topic={topic}
              gameType={activeGame}
              mode={mode}
              playStyle={playStyle}
              blueLabel={getBlueRobotLabel()}
              redLabel={getRedRobotLabel()}
              blueHp={blueHp}
              redHp={redHp}
              blueScore={blueScore}
              redScore={redScore}
              activeTurn={activeTurn}
              attackTrigger={attackTrigger}
              onTriggerCombat={handleExtraGameCombat}
              onResetCombat={resetOnlyCurrentGame}
              shuffleTick={shuffleTick}
              onShuffleQuestions={resetAllGames}
              roundCount={roundCount}
              onChangeRoundCount={handleChangeRoundCount}
            />

            {(blueHp <= 0 || redHp <= 0) && (
              <div className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-500 shadow-2xl text-center space-y-5 max-w-md w-full animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                      Pertandingan Mini Game Selesai!
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {getWinnerSummaryText(false)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      onClick={resetAllGames}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold flex items-center gap-1.5"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>Acak Soal & Main Lagi</span>
                    </button>
                    <button
                      onClick={resetOnlyCurrentGame}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                    <button
                      onClick={() => {
                        playClick();
                        if (document.fullscreenElement) {
                          document.exitFullscreen().catch(() => {});
                        }
                        onNext();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                    >
                      <span>Lanjut ke Kuis</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <StudentDatabaseModal
        isOpen={isStudentDbModalOpen}
        onClose={() => setIsStudentDbModalOpen(false)}
        topicId={topic.id}
        topicTitle={topic.title}
        currentMode={mode}
        onNamesUpdated={() => setDuelNames(getSavedDuelPlayerNames())}
      />

      {isMiniGameBankModalOpen && (
        <QuestionBankExcelModal
          isOpen={isMiniGameBankModalOpen}
          onClose={() => {
            setIsMiniGameBankModalOpen(false);
            setShuffleTick((t) => t + 1);
          }}
          initialTopic={topic}
          initialSection={
            activeGame === 'tebak-kata'
              ? 'mini-game-kata'
              : activeGame === 'tebak-gambar'
              ? 'mini-game-gambar'
              : 'mini-game-battle'
          }
          initialMiniGameId={activeGame as SpecificMiniGameId}
        />
      )}
    </div>
  );
};

