import React, { useState, useMemo, useEffect } from 'react';
import { Topic, StudentProgress } from '../../types/curriculum';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { useCurriculumOverrides } from '../../context/CurriculumOverridesContext';
import { getTopicGamePack } from '../../data/interactiveGamesData';
import {
  getTopicIfpClassificationData,
  TopicIfpClassificationPack,
  IfpClassificationCard,
  IfpCategoryBucket
} from '../../data/ifpClassificationData';
import confetti from 'canvas-confetti';
import {
  Sliders,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Edit3,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Award,
  Layers,
  Hand,
  Maximize2,
  Minimize2,
  Building2,
  AlertOctagon,
  School,
  MessageSquareWarning,
  BookOpenCheck,
  SmartphoneNfc,
  Split,
  Repeat,
  MapPin,
  Power,
  ShieldCheck,
  Lightbulb,
  AlertTriangle,
  Eye,
  Check,
  X,
  FileSpreadsheet,
  Cpu,
  HardDrive,
  Monitor,
  Keyboard,
  Printer,
  Wifi,
  Radio,
  Code2,
  Terminal,
  Lock,
  Search,
  FileText,
  Globe,
  Zap,
  Shuffle,
  Star,
  ThumbsUp,
  Heart,
  HeartHandshake,
  Users,
  Clock,
  Network,
  UserCheck,
  Gamepad2,
  MousePointerClick,
  Dices,
  XCircle
} from 'lucide-react';

// Specialized Dedicated Topic Simulations
import { SpreadsheetSimulation } from './simulations/SpreadsheetSimulation';
import { NetworkTopologySimulation } from './simulations/NetworkTopologySimulation';
import { CodeMazeSimulation } from './simulations/CodeMazeSimulation';
import { CredibilityFactScanner } from './simulations/CredibilityFactScanner';
import { CyberSecuritySimulation } from './simulations/CyberSecuritySimulation';
import { ComputerIPOSimulation } from './simulations/ComputerIPOSimulation';
import { SearchEngineSimulation } from './simulations/SearchEngineSimulation';
import { ComputationalThinkingSimulation } from './simulations/ComputationalThinkingSimulation';
import { DigitalFootprintAuditSimulation } from './simulations/DigitalFootprintAuditSimulation';
import { VirtualPublicSpaceSimulation } from './simulations/VirtualPublicSpaceSimulation';
import { DocumentProcessorSimulation } from './simulations/DocumentProcessorSimulation';
import { DynamicTopicExperimentLab } from './simulations/DynamicTopicExperimentLab';
import { ScenarioChallengeSimulation } from './simulations/ScenarioChallengeSimulation';
import { TeacherModuleToolbar } from '../modals/LiveInlineEditorOverlay';

interface SimulasiViewProps {
  topic: Topic;
  progress: StudentProgress;
  onSaveResult: (score: number) => void;
  onNext: () => void;
  onBackToDashboard: () => void;
}

export const SimulasiView: React.FC<SimulasiViewProps> = ({
  topic,
  progress,
  onSaveResult,
  onNext,
  onBackToDashboard
}) => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();
  const { isTeacher, showTeacherAnswerKeys, openEditorModal } = useUserRole();
  const { overrides, getEffectiveGamePack } = useCurriculumOverrides();
  const sim = topic.simulasi;
  const customSimImage = overrides[topic.id]?.customSimulasiImageUrl;
  const baseGamePack = getTopicGamePack(topic.id, topic.title, topic.grade);
  const gamePack = getEffectiveGamePack(topic.id, baseGamePack);

  // 4 Pilihan Ragam Aktivitas Simulasi
  // 'utama' | 'klasifikasi' | 'tebak-gambar' | 'kasus-nyata'
  const [activeSimTab, setActiveSimTab] = useState<'utama' | 'klasifikasi' | 'tebak-gambar' | 'kasus-nyata'>('utama');

  // IFP Fullscreen Mode
  const [isIfpFullscreen, setIsIfpFullscreen] = useState(false);

  // ==========================================
  // STATE KLASIFIKASI VISUAL (IFP TOUCH LAYAR SENTUH)
  // ==========================================
  const ifpPack = useMemo<TopicIfpClassificationPack>(() => {
    return getTopicIfpClassificationData(topic);
  }, [topic]);

  const [cardsOrder, setCardsOrder] = useState<IfpClassificationCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [score, setScore] = useState(0);

  // Mode Giliran Siswa Maju ke Layar Sentuh IFP
  const [studentTurnIndex, setStudentTurnIndex] = useState<number>(1);
  const [studentTurnName, setStudentTurnName] = useState<string>('Siswa 1');

  // Sinkronisasi data saat topik berganti
  useEffect(() => {
    setCardsOrder([...ifpPack.cards]);
    setPlacements({});
    setSelectedCardId(null);
    setIsEvaluated(false);
    setScore(0);
    setStudentTurnIndex(1);
    setStudentTurnName('Siswa 1');
  }, [ifpPack]);

  const cards = cardsOrder.length > 0 ? cardsOrder : ifpPack.cards;
  const categories = ifpPack.categories;

  // Dynamic icon helper
  const renderCardIcon = (iconType: string) => {
    const props = { className: 'w-7 h-7 sm:w-8 sm:h-8 shrink-0' };
    switch (iconType) {
      case 'Building2': return <Building2 {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />;
      case 'AlertOctagon': return <AlertOctagon {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-rose-600" />;
      case 'School': return <School {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600" />;
      case 'MessageSquareWarning': return <MessageSquareWarning {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />;
      case 'BookOpenCheck': return <BookOpenCheck {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />;
      case 'SmartphoneNfc': return <SmartphoneNfc {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />;
      case 'Split': return <Split {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600" />;
      case 'Repeat': return <Repeat {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />;
      case 'MapPin': return <MapPin {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />;
      case 'Power': return <Power {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />;
      case 'ShieldCheck': return <ShieldCheck {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />;
      case 'AlertTriangle': return <AlertTriangle {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />;
      case 'Cpu': return <Cpu {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />;
      case 'HardDrive': return <HardDrive {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />;
      case 'Monitor': return <Monitor {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />;
      case 'Keyboard': return <Keyboard {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600" />;
      case 'Mouse': return <MousePointerClick {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />;
      case 'Printer': return <Printer {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />;
      case 'Wifi': return <Wifi {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-600" />;
      case 'Radio': return <Radio {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />;
      case 'Code2': return <Code2 {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />;
      case 'Terminal': return <Terminal {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-slate-700 dark:text-slate-300" />;
      case 'Lock': return <Lock {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />;
      case 'Search': return <Search {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />;
      case 'FileSpreadsheet': return <FileSpreadsheet {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />;
      case 'FileText': return <FileText {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />;
      case 'Globe': return <Globe {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600" />;
      case 'HeartHandshake': return <HeartHandshake {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-rose-500" />;
      case 'Users': return <Users {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />;
      case 'Clock': return <Clock {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />;
      case 'Network': return <Network {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-600" />;
      case 'Heart': return <Heart {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-rose-500" />;
      case 'Gamepad2': return <Gamepad2 {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />;
      default: return <Sparkles {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />;
    }
  };

  // Helper tema visual penuh warna untuk keranjang kategori IFP
  const getCategoryTheme = (themeColor: string, isTargeted: boolean) => {
    switch (themeColor) {
      case 'sky':
        return {
          container: isTargeted
            ? 'border-4 border-sky-500 bg-sky-100/95 dark:bg-sky-950/90 ring-4 ring-sky-400/50 shadow-2xl scale-[1.02]'
            : 'border-3 border-sky-400/80 bg-gradient-to-b from-sky-50/95 via-sky-50/60 to-blue-50/80 dark:from-sky-950/50 dark:to-blue-950/30 hover:border-sky-500 shadow-lg shadow-sky-500/10',
          badge: 'bg-sky-600 text-white shadow-md shadow-sky-600/30',
          title: 'text-sky-950 dark:text-sky-100',
          desc: 'text-sky-700 dark:text-sky-300',
          btnDirect: 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs',
          pill: 'border-sky-300 dark:border-sky-700 bg-sky-100 dark:bg-sky-900/70 text-sky-950 dark:text-sky-100'
        };
      case 'purple':
        return {
          container: isTargeted
            ? 'border-4 border-purple-500 bg-purple-100/95 dark:bg-purple-950/90 ring-4 ring-purple-400/50 shadow-2xl scale-[1.02]'
            : 'border-3 border-purple-400/80 bg-gradient-to-b from-purple-50/95 via-purple-50/60 to-fuchsia-50/80 dark:from-purple-950/50 dark:to-fuchsia-950/30 hover:border-purple-500 shadow-lg shadow-purple-500/10',
          badge: 'bg-purple-600 text-white shadow-md shadow-purple-600/30',
          title: 'text-purple-950 dark:text-purple-100',
          desc: 'text-purple-700 dark:text-purple-300',
          btnDirect: 'bg-purple-600 hover:bg-purple-500 text-white shadow-xs',
          pill: 'border-purple-300 dark:border-purple-700 bg-purple-100 dark:bg-purple-900/70 text-purple-950 dark:text-purple-100'
        };
      case 'amber':
        return {
          container: isTargeted
            ? 'border-4 border-amber-500 bg-amber-100/95 dark:bg-amber-950/90 ring-4 ring-amber-400/50 shadow-2xl scale-[1.02]'
            : 'border-3 border-amber-400/80 bg-gradient-to-b from-amber-50/95 via-yellow-50/60 to-orange-50/80 dark:from-amber-950/50 dark:to-orange-950/30 hover:border-amber-500 shadow-lg shadow-amber-500/10',
          badge: 'bg-amber-600 text-white shadow-md shadow-amber-600/30',
          title: 'text-amber-950 dark:text-amber-100',
          desc: 'text-amber-700 dark:text-amber-300',
          btnDirect: 'bg-amber-600 hover:bg-amber-500 text-white shadow-xs',
          pill: 'border-amber-300 dark:border-amber-700 bg-amber-100 dark:bg-amber-900/70 text-amber-950 dark:text-amber-100'
        };
      case 'rose':
        return {
          container: isTargeted
            ? 'border-4 border-rose-500 bg-rose-100/95 dark:bg-rose-950/90 ring-4 ring-rose-400/50 shadow-2xl scale-[1.02]'
            : 'border-3 border-rose-400/80 bg-gradient-to-b from-rose-50/95 via-pink-50/60 to-red-50/80 dark:from-rose-950/50 dark:to-pink-950/30 hover:border-rose-500 shadow-lg shadow-rose-500/10',
          badge: 'bg-rose-600 text-white shadow-md shadow-rose-600/30',
          title: 'text-rose-950 dark:text-rose-100',
          desc: 'text-rose-700 dark:text-rose-300',
          btnDirect: 'bg-rose-600 hover:bg-rose-500 text-white shadow-xs',
          pill: 'border-rose-300 dark:border-rose-700 bg-rose-100 dark:bg-rose-900/70 text-rose-950 dark:text-rose-100'
        };
      case 'teal':
        return {
          container: isTargeted
            ? 'border-4 border-teal-500 bg-teal-100/95 dark:bg-teal-950/90 ring-4 ring-teal-400/50 shadow-2xl scale-[1.02]'
            : 'border-3 border-teal-400/80 bg-gradient-to-b from-teal-50/95 via-cyan-50/60 to-emerald-50/80 dark:from-teal-950/50 dark:to-cyan-950/30 hover:border-teal-500 shadow-lg shadow-teal-500/10',
          badge: 'bg-teal-600 text-white shadow-md shadow-teal-600/30',
          title: 'text-teal-950 dark:text-teal-100',
          desc: 'text-teal-700 dark:text-teal-300',
          btnDirect: 'bg-teal-600 hover:bg-teal-500 text-white shadow-xs',
          pill: 'border-teal-300 dark:border-teal-700 bg-teal-100 dark:bg-teal-900/70 text-teal-950 dark:text-teal-100'
        };
      case 'emerald':
      default:
        return {
          container: isTargeted
            ? 'border-4 border-emerald-500 bg-emerald-100/95 dark:bg-emerald-950/90 ring-4 ring-emerald-400/50 shadow-2xl scale-[1.02]'
            : 'border-3 border-emerald-400/80 bg-gradient-to-b from-emerald-50/95 via-teal-50/60 to-green-50/80 dark:from-emerald-950/50 dark:to-teal-950/30 hover:border-emerald-500 shadow-lg shadow-emerald-500/10',
          badge: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30',
          title: 'text-emerald-950 dark:text-emerald-100',
          desc: 'text-emerald-700 dark:text-emerald-300',
          btnDirect: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs',
          pill: 'border-emerald-300 dark:border-emerald-700 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-950 dark:text-emerald-100'
        };
    }
  };

  const handleSelectCard = (id: string) => {
    playClick();
    setSelectedCardId(id === selectedCardId ? null : id);
  };

  const handleAssignToCategory = (cat: string) => {
    if (!selectedCardId) return;
    playClick();
    setPlacements((prev) => ({
      ...prev,
      [selectedCardId]: cat
    }));
    setSelectedCardId(null);
    setIsEvaluated(false);
  };

  const handleDirectAssign = (cardId: string, cat: string) => {
    playClick();
    setPlacements((prev) => ({
      ...prev,
      [cardId]: cat
    }));
    setIsEvaluated(false);
  };

  const handleRemoveFromPlacement = (cardId: string) => {
    playClick();
    setPlacements((prev) => {
      const copy = { ...prev };
      delete copy[cardId];
      return copy;
    });
    setIsEvaluated(false);
  };

  const handleShuffleCards = () => {
    playClick();
    setCardsOrder((prev) => {
      const copy = [...prev];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
    setSelectedCardId(null);
  };

  const handleResetKlasifikasi = () => {
    playClick();
    setPlacements({});
    setSelectedCardId(null);
    setIsEvaluated(false);
    setScore(0);
  };

  const handleNextStudentTurn = () => {
    playFanfare();
    const nextIdx = studentTurnIndex + 1;
    setStudentTurnIndex(nextIdx);
    setStudentTurnName(`Siswa ${nextIdx}`);
    setPlacements({});
    setSelectedCardId(null);
    setIsEvaluated(false);
    setScore(0);
    handleShuffleCards();
  };

  const handleEvaluate = () => {
    playClick();
    let correctCount = 0;
    cards.forEach((card) => {
      if (placements[card.id] === card.correctCategory) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / cards.length) * 100);
    setScore(calculatedScore);
    setIsEvaluated(true);

    if (calculatedScore >= 80) {
      playFanfare();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } else {
      playSuccess();
    }

    onSaveResult(calculatedScore);
  };

  // ==========================================
  // STATE TEBAK & INSPEKSI GAMBAR VISUAL
  // ==========================================
  const [inspectCardIdx, setInspectCardIdx] = useState(0);
  const [inspectAnswered, setInspectAnswered] = useState<Record<number, string>>({});

  const handleInspectAnswer = (cat: string) => {
    playClick();
    setInspectAnswered((prev) => ({
      ...prev,
      [inspectCardIdx]: cat
    }));

    const card = cards[inspectCardIdx];
    if (cat === card.correctCategory) {
      playSuccess();
    } else {
      playError();
    }
  };

  // Helper router for Mode 1: Lab Utama Khusus Topik (Variatif, Interaktif & Tanpa Mencocokkan Kartu!)
  const renderDedicatedTopicSimulation = () => {
    const t = topic.title.toLowerCase();
    const id = topic.id;
    const type = sim?.type;

    // 1. Berpikir Komputasional (4 Pilar CT Workbench)
    if (id === 'k7-bk' || t.includes('berpikir komputasional') || t.includes('computational thinking')) {
      return <ComputationalThinkingSimulation />;
    }

    // 2. Google Dokumen / Aplikasi Pengolah Kata
    if (id === 'k7-gdoc' || t.includes('dokumen') || t.includes('word') || t.includes('pengolah kata')) {
      return <DocumentProcessorSimulation />;
    }

    // 3. Rekam Jejak Digital (Audit & Privacy Hardening)
    if (id === 'k8-rekam-jejak-digital' || t.includes('rekam jejak') || t.includes('jejak digital')) {
      return <DigitalFootprintAuditSimulation />;
    }

    // 4. Ruang Publik Virtual & Netiket (Community Moderator Sandbox)
    if (id === 'k9-ruang-publik-virtual' || t.includes('ruang publik') || t.includes('media sosial') || t.includes('netiket')) {
      return <VirtualPublicSpaceSimulation />;
    }

    // 5. Lembar Kerja / Spreadsheet / Excel
    if (t.includes('excel') || t.includes('spreadsheet') || t.includes('lembar kerja') || type === 'formula-tester') {
      return <SpreadsheetSimulation topicTitle={topic.title} />;
    }

    // 6. Jaringan Komputer & Topologi LAN
    if (t.includes('jaringan') || t.includes('lan') || t.includes('topologi') || type === 'network-connector') {
      return <NetworkTopologySimulation />;
    }

    // 7. Pemrograman / Coding / Algoritma Game
    if (t.includes('pemrograman') || t.includes('coding') || t.includes('algoritma game') || type === 'code-builder') {
      return <CodeMazeSimulation />;
    }

    // 8. Fakta, Hoaks & Kredibilitas Informasi
    if (t.includes('informasi digital') || t.includes('kredibilitas') || t.includes('fakta') || t.includes('hoaks') || type === 'fact-checker') {
      return <CredibilityFactScanner />;
    }

    // 9. Keamanan Siber & Password
    if (t.includes('keamanan') || t.includes('siber') || t.includes('password') || type === 'cyber-security') {
      return <CyberSecuritySimulation />;
    }

    // 10. Perangkat Keras / Komputer IPO (Rakit PC, Siklus Bus, CPU)
    if (t.includes('komputer') || t.includes('hardware') || t.includes('perangkat keras') || id === 'k7-komputer') {
      return <ComputerIPOSimulation />;
    }

    // 11. Browser & Mesin Pencari
    if (t.includes('browser') || t.includes('search') || t.includes('mesin pencari') || id === 'k7-bse') {
      return <SearchEngineSimulation />;
    }

    // Universal Dynamic Process & Parameter Experiment Lab (Bukan mencocokkan kartu!)
    return <DynamicTopicExperimentLab topic={topic} />;
  };

  // Helper untuk merender Klasifikasi IFP Interaktif Multi-Touch Layar Sentuh Penuh Warna
  const renderSuperFunIfpClassification = () => {
    const placedCount = Object.keys(placements).length;
    const selectedCard = selectedCardId ? cards.find((c) => c.id === selectedCardId) : null;

    return (
      <div className="space-y-6">
        {/* Banner Utama Ramah Anak & Guru */}
        <div className="p-6 rounded-3xl bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black tracking-wide text-white border border-white/30">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>KLASIFIKASI IFP · LAYAR SENTUH KELAS</span>
              </div>

              {/* Giliran Siswa Maju Badge */}
              <div className="flex items-center gap-2 bg-amber-400 text-slate-900 px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm shadow-md animate-pulse">
                <UserCheck className="w-4 h-4 text-slate-900" />
                <span>Giliran: {studentTurnName}</span>
                <button
                  type="button"
                  onClick={handleNextStudentTurn}
                  className="ml-1 px-2.5 py-0.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold hover:bg-slate-800"
                  title="Ganti ke giliran siswa berikutnya yang maju ke layar"
                >
                  Ganti ➡️
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight drop-shadow-xs">
              {ifpPack.title}
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100 max-w-3xl leading-relaxed">
              {ifpPack.subtitle || ifpPack.scenario}
            </p>

            {/* IFP Action Toolbar: Acak Soal, Reset, Giliran Berikutnya */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleShuffleCards}
                className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 backdrop-blur-sm border border-white/20 transition-all active:scale-95 shadow-sm"
                title="Acak urutan kartu soal untuk siswa berikutnya"
              >
                <Dices className="w-4 h-4 text-amber-300" />
                <span>Acak Kartu 🎲</span>
              </button>

              <button
                type="button"
                onClick={handleResetKlasifikasi}
                className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 backdrop-blur-sm border border-white/20 transition-all active:scale-95 shadow-sm"
                title="Kosongkan semua keranjang untuk mengulang"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Papan 🔄</span>
              </button>

              <button
                type="button"
                onClick={handleEvaluate}
                disabled={placedCount === 0}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-lg ml-auto"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Periksa Jawaban ⭐</span>
              </button>

              {isTeacher && showTeacherAnswerKeys && (
                <button
                  type="button"
                  onClick={() => {
                    const autoPlace: Record<string, string> = {};
                    cards.forEach((c) => {
                      autoPlace[c.id] = c.correctCategory;
                    });
                    setPlacements(autoPlace);
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold border border-emerald-400/50"
                >
                  Kunci Guru (Otomatis)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Petunjuk Interaktif Siswa yang Maju */}
        <div className={`p-4 rounded-2xl border transition-all ${
          selectedCard
            ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 ring-4 ring-amber-400/20'
            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}>
          {selectedCard ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100 shrink-0">
                  <Hand className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider">
                    Kartu Dipilih:
                  </div>
                  <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    "{selectedCard.sentence || selectedCard.title}"
                  </div>
                  <div className="text-xs text-amber-900 dark:text-amber-200 font-medium">
                    👉 Sentuh salah satu KERANJANG WARNA di bawah ini untuk memasukkan kartu ini!
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCardId(null)}
                className="px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-700 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100"
              >
                Batal Pilih
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2.5">
                <MousePointerClick className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Cara Bermain:</strong> Sentuh <strong>Kartu Soal</strong> di bawah, lalu sentuh <strong>Keranjang Kategori</strong> tujuannya. Atau sentuh langsung tombol warna di kartu!
                </span>
              </div>
              <span className="font-mono font-bold text-xs px-2.5 py-1 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0">
                {placedCount} / {cards.length} Selesai
              </span>
            </div>
          )}
        </div>

        {/* KERANJANG KATEGORI PENUH WARNA & MENYENANGKAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
          {categories.map((bucket) => {
            const bucketName = typeof bucket === 'string' ? bucket : bucket.name;
            const bucketTheme = typeof bucket === 'string' ? 'emerald' : bucket.themeColor;
            const bucketBadge = typeof bucket === 'string' ? 'Kategori' : bucket.badge;
            const bucketDesc = typeof bucket === 'string' ? '' : bucket.description;

            const isTargeted = selectedCardId !== null;
            const theme = getCategoryTheme(bucketTheme, isTargeted);
            const assignedCards = cards.filter((c) => placements[c.id] === bucketName);

            return (
              <div
                key={bucketName}
                onClick={() => handleAssignToCategory(bucketName)}
                className={`p-5 rounded-3xl transition-all cursor-pointer min-h-[220px] flex flex-col justify-between select-none relative ${theme.container}`}
              >
                <div className="space-y-3">
                  {/* Bucket Header */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-black/5 dark:border-white/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${theme.badge}`}>
                          {bucketBadge}
                        </span>
                      </div>
                      <h3 className={`text-base sm:text-lg font-black leading-snug ${theme.title}`}>
                        {bucketName}
                      </h3>
                      {bucketDesc && (
                        <p className={`text-xs leading-relaxed font-medium ${theme.desc}`}>
                          {bucketDesc}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-900/80 shadow-xs border border-black/5 shrink-0">
                      {assignedCards.length} Kartu
                    </span>
                  </div>

                  {/* Placed Cards List */}
                  <div className="space-y-2 pt-1 min-h-[70px]">
                    {assignedCards.length === 0 ? (
                      <div className="text-center py-5">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 italic">
                          {selectedCardId
                            ? '👉 Sentuh di sini untuk memasukkan kartu!'
                            : 'Keranjang ini masih kosong'}
                        </p>
                      </div>
                    ) : (
                      assignedCards.map((c) => {
                        const isCorrect = c.correctCategory === bucketName;

                        return (
                          <div
                            key={c.id}
                            className={`p-3 rounded-2xl border transition-all flex items-start justify-between gap-2.5 ${
                              isEvaluated
                                ? isCorrect
                                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold'
                                  : 'bg-rose-500 text-white border-rose-600 shadow-md'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-xs'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <div className="p-1 rounded-lg bg-white/20 dark:bg-slate-800/80 shrink-0">
                                {renderCardIcon(c.iconName || c.iconType || 'Sparkles')}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-extrabold leading-tight">
                                  {c.sentence || c.title}
                                </p>
                                <p className="text-[11px] opacity-80 truncate mt-0.5">
                                  {c.shortContext || c.description}
                                </p>
                                {isEvaluated && !isCorrect && (
                                  <p className="text-[11px] bg-white text-rose-700 px-2 py-0.5 rounded-md font-bold mt-1">
                                    Seharusnya: {c.correctCategory}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Tombol Hapus dari Keranjang */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromPlacement(c.id);
                              }}
                              className="p-1.5 rounded-lg bg-black/5 hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/25 shrink-0 transition-colors"
                              title="Keluarkan kartu dari keranjang ini"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Drop Indicator saat kartu dipilih */}
                {selectedCardId && (
                  <div className="pt-3 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black shadow-md uppercase tracking-wider animate-bounce ${theme.badge}`}>
                      <Check className="w-4 h-4" />
                      <span>+ Masukkan ke {bucketName}</span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DAFTAR KARTU SOAL CERITA / CONTOH SEHARI-HARI */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>📚 Kartu Kalimat Cerita & Perilaku Sehari-Hari</span>
                <span className="text-xs font-normal text-slate-500 font-mono">
                  (Total {cards.length} Kartu)
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Pilih kartu di bawah atau tekan tombol keranjang langsung di setiap kartu:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {cards.map((card) => {
              const isSelected = selectedCardId === card.id;
              const assignedCategory = placements[card.id];

              return (
                <div
                  key={card.id}
                  onClick={() => handleSelectCard(card.id)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-sm select-none active:scale-[0.98] ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/90 dark:bg-amber-950/80 ring-4 ring-amber-400/40 shadow-xl scale-[1.02]'
                      : assignedCategory
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 opacity-90'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0">
                        {renderCardIcon(card.iconName || card.iconType || 'Sparkles')}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                          "{card.sentence || card.title}"
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          {card.shortContext || card.description}
                        </p>
                      </div>
                    </div>

                    {(card.studentHint || card.hint) && (
                      <div className="p-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span><strong>Petunjuk:</strong> {card.studentHint || card.hint}</span>
                      </div>
                    )}

                    {assignedCategory && (
                      <div className="pt-1 flex items-center justify-between text-[11px]">
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Sudah di: {assignedCategory}</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromPlacement(card.id);
                          }}
                          className="text-rose-600 hover:underline font-bold text-[10px]"
                        >
                          Batalkan
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Tombol Cepat 1-Tap Masuk Keranjang di Layar Sentuh */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Pindah Langsung ke Keranjang:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((bucket) => {
                        const bName = typeof bucket === 'string' ? bucket : bucket.name;
                        const bTheme = typeof bucket === 'string' ? 'emerald' : bucket.themeColor;
                        const t = getCategoryTheme(bTheme, false);
                        const isThis = assignedCategory === bName;

                        return (
                          <button
                            key={bName}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDirectAssign(card.id, bName);
                            }}
                            className={`px-2.5 py-1 text-xs rounded-xl font-black transition-all active:scale-95 ${
                              isThis
                                ? `${t.badge} shadow-xs ring-2 ring-black/20`
                                : `${t.pill} hover:opacity-90 border`
                            }`}
                          >
                            {bName}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HASIL EVALUASI & PERAYAAN SKOR */}
        {isEvaluated && (
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-b from-white to-emerald-50 dark:from-slate-900 dark:to-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-extrabold text-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>HASIL KLASIFIKASI {studentTurnName.toUpperCase()}</span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                {score} / 100 Poin
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-400 py-1">
                <Star className={`w-6 h-6 ${score >= 30 ? 'fill-amber-400' : 'text-slate-300'}`} />
                <Star className={`w-6 h-6 ${score >= 70 ? 'fill-amber-400' : 'text-slate-300'}`} />
                <Star className={`w-6 h-6 ${score === 100 ? 'fill-amber-400' : 'text-slate-300'}`} />
              </div>
            </div>

            <p className="text-xs sm:text-base text-slate-700 dark:text-slate-300 max-w-xl mx-auto font-medium">
              {score === 100
                ? '🎉 Hebat sekali! Semua kartu kalimat perilaku sehari-hari berhasil dipilah dengan tepat ke keranjangnya!'
                : score >= 60
                ? '👍 Bagus! Sebagian besar kartu sudah tepat. Cek keranjang yang bertanda merah dan diskusikan bersama teman!'
                : '💪 Jangan berkecil hati! Coba baca petunjuk di setiap kartu dan ulangi lagi bersama guru dan teman!'}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleNextStudentTurn}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95"
              >
                <Users className="w-4 h-4" />
                <span>Ajak Siswa Lain Maju 🚀 (Acak Soal Baru)</span>
              </button>

              <button
                type="button"
                onClick={handleResetKlasifikasi}
                className="px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Ulangi Sekali Lagi 🔄
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200 ${
        isIfpFullscreen ? 'fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto max-w-none p-6' : ''
      }`}
    >
      <TeacherModuleToolbar
        topicId={topic.id}
        moduleKey="simulasi"
        moduleTitle="Modul 4: Simulasi & Studi Kasus"
        editorTab="simulasi"
      />
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            playClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu Materi</span>
        </button>

        <div className="flex items-center gap-2">
          {isTeacher && (
            <button
              type="button"
              onClick={() => {
                playClick();
                openEditorModal('simulasi');
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs active:scale-95 transition-all"
              title="Edit skenario dan petunjuk simulasi"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Simulasi</span>
            </button>
          )}

          {/* IFP Screen Toggle */}
          <button
            onClick={() => setIsIfpFullscreen(!isIfpFullscreen)}
            className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            title="Layar Penuh untuk IFP / Proyektor"
          >
            {isIfpFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isIfpFullscreen ? 'Keluar Layar Penuh' : 'Mode IFP Layar Penuh'}</span>
          </button>

          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Modul 4 dari 9 · Simulasi Visual
          </span>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <Sliders className="w-4 h-4" />
          <span>Laboratorium Interaktif & Simulasi Khusus Topik</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Simulasi: {topic.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Dirancang 100% sesuai materi pilihanmu · Dilengkapi beragam pilihan aktivitas interaktif multi-touch untuk Layar Sentuh IFP & Laptop
        </p>
      </div>

      {/* 4 PILIHAN RAGAM AKTIVITAS SIMULASI (ACTIVITY HUB SELECTOR) */}
      <div className="p-1.5 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
          <button
            onClick={() => {
              playClick();
              setActiveSimTab('utama');
            }}
            className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeSimTab === 'utama'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 shrink-0" />
            <span className="truncate">1. Lab Utama Materi</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveSimTab('klasifikasi');
            }}
            className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeSimTab === 'klasifikasi'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span className="truncate">2. Klasifikasi IFP</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveSimTab('tebak-gambar');
            }}
            className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeSimTab === 'tebak-gambar'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4 shrink-0" />
            <span className="truncate">3. Detektif Visual</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveSimTab('kasus-nyata');
            }}
            className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeSimTab === 'kasus-nyata'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <School className="w-4 h-4 shrink-0" />
            <span className="truncate">4. Kasus Sehari-Hari</span>
          </button>
        </div>
      </div>

      {/* Petunjuk Multi-Touch IFP Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
        <Hand className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong className="font-bold text-slate-900 dark:text-white block mb-0.5">
            Petunjuk Penggunaan Layar Sentuh (IFP / Touchscreen Multi-Touch):
          </strong>
          Sentuh elemen visual interaktif di bawah ini untuk bereksperimen. Di layar sentuh IFP kelas, beberapa siswa dapat menyentuh tombol simulasi secara bersamaan (*multi-touch*).
        </div>
      </div>

      {/* Skenario & Gambar Visual Simulasi (Dapat Diedit Guru) */}
      {(sim?.scenario || sim?.instructions || customSimImage || isTeacher) && (
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 shadow-sm space-y-4">
          {customSimImage && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-72 bg-slate-950 flex items-center justify-center">
              <img
                src={customSimImage}
                alt={`Visual Simulasi ${topic.title}`}
                className="w-full max-h-72 object-contain"
              />
              {isTeacher && (
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    openEditorModal('simulasi');
                  }}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-lg"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Ganti Gambar Simulasi</span>
                </button>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {sim?.scenario && (
                <div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block text-[11px]">
                    Skenario Praktik Simulasi:
                  </span>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{sim.scenario}</p>
                </div>
              )}
              {sim?.instructions && (
                <div className="pt-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">
                    Instruksi Langkah Kerja:
                  </span>
                  <p>{sim.instructions}</p>
                </div>
              )}
            </div>

            {isTeacher && !customSimImage && (
              <button
                type="button"
                onClick={() => {
                  playClick();
                  openEditorModal('simulasi');
                }}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-100 text-xs font-bold transition-all"
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>+ Tambah / Ganti Gambar Simulasi</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TAB AKTIVITAS 1: LAB UTAMA MATERI                                      */}
      {/* ========================================================================= */}
      {activeSimTab === 'utama' && (
        <div className="animate-in fade-in duration-300">
          {renderDedicatedTopicSimulation()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TAB AKTIVITAS 2: KLASIFIKASI KARTU BERGAMBAR MULTI-TOUCH IFP          */}
      {/* ========================================================================= */}
      {activeSimTab === 'klasifikasi' && (
        <div className="animate-in fade-in duration-300">
          {renderSuperFunIfpClassification()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB AKTIVITAS 3: TEBAK & INSPEKSI GAMBAR VISUAL                        */}
      {/* ========================================================================= */}
      {activeSimTab === 'tebak-gambar' && (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Kasus Gambar {inspectCardIdx + 1} dari {cards.length}
            </span>

            <div className="flex gap-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    playClick();
                    setInspectCardIdx(i);
                  }}
                  className={`w-7 h-7 rounded-xl font-bold text-xs transition-all ${
                    inspectCardIdx === i
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : inspectAnswered[i]
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700'
                      : 'border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Inspektor Kartu Gambar */}
          {(() => {
            const currentCard = cards[inspectCardIdx];
            const answer = inspectAnswered[inspectCardIdx];
            const isCorrect = answer === currentCard.correctCategory;

            return (
              <div className="space-y-6 text-center max-w-xl mx-auto py-4">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border-4 border-emerald-400 flex items-center justify-center p-4 shadow-lg">
                  {renderCardIcon(currentCard.iconName || currentCard.iconType || 'Sparkles')}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {currentCard.sentence || currentCard.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {currentCard.shortContext || currentCard.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Pilih Kategori yang Paling Tepat:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {categories.map((bucket) => {
                      const catName = typeof bucket === 'string' ? bucket : bucket.name;
                      return (
                        <button
                          key={catName}
                          onClick={() => handleInspectAnswer(catName)}
                          className={`px-5 py-3 rounded-2xl border-2 font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-95 ${
                            answer === catName
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-500 text-white'
                                : 'border-rose-500 bg-rose-500 text-white'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-500'
                          }`}
                        >
                          {catName}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {answer && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 animate-in fade-in">
                    {isCorrect ? (
                      <span className="font-bold text-emerald-600">
                        🎉 Jawabanmu Tepat! Kasus ini tergolong ke dalam: {currentCard.correctCategory}.
                      </span>
                    ) : (
                      <span className="font-bold text-rose-600">
                        ❌ Belum tepat. Jawaban yang benar adalah: {currentCard.correctCategory}.
                      </span>
                    )}
                  </div>
                )}

                {/* Navigasi Kartu Berikutnya */}
                <div className="pt-2 flex justify-between">
                  <button
                    disabled={inspectCardIdx === 0}
                    onClick={() => {
                      playClick();
                      setInspectCardIdx((prev) => Math.max(0, prev - 1));
                    }}
                    className="px-4 py-2 border rounded-xl text-xs font-bold disabled:opacity-30"
                  >
                    &larr; Kasus Sebelumnya
                  </button>

                  <button
                    disabled={inspectCardIdx === cards.length - 1}
                    onClick={() => {
                      playClick();
                      setInspectCardIdx((prev) => Math.min(cards.length - 1, prev + 1));
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold disabled:opacity-30 flex items-center gap-1.5"
                  >
                    <span>Kasus Berikutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB AKTIVITAS 4: SIMULASI KASUS NYATA SEKOLAH                           */}
      {/* ========================================================================= */}
      {activeSimTab === 'kasus-nyata' && (
        <div className="animate-in fade-in duration-300">
          <ScenarioChallengeSimulation topic={topic} />
        </div>
      )}

      {/* Bottom Nav Action */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={() => {
            playClick();
            onBackToDashboard();
          }}
          className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
        >
          Menu Materi
        </button>

        <button
          onClick={() => {
            playClick();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-colors"
        >
          <span>Lanjut ke Model Pembelajaran PBL</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
