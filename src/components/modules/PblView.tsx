import React, { useState, useEffect } from 'react';
import { Topic, StudentProgress, PblResult } from '../../types/curriculum';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { useCurriculumOverrides } from '../../context/CurriculumOverridesContext';
import { getTopicPblScenario, PblScenario } from '../../data/pblScenariosData';
import { TeacherModuleToolbar } from '../modals/LiveInlineEditorOverlay';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Lightbulb,
  Search,
  Target,
  FileText,
  Award,
  CheckSquare,
  Printer,
  Maximize2,
  Minimize2,
  Hand,
  Flame,
  BookmarkCheck,
  Heart,
  Check,
  Key,
  Edit3,
  Compass,
  Eye,
  EyeOff,
  Sparkles,
  Users,
  BookOpen,
  FolderSearch,
  Wrench,
  ClipboardCheck,
} from 'lucide-react';
import { LkpdPrintModal } from './LkpdPrintModal';

interface PblViewProps {
  topic: Topic;
  progress: StudentProgress;
  onSaveResult: (res: PblResult) => void;
  onNext: () => void;
  onBackToDashboard: () => void;
}

export const PblView: React.FC<PblViewProps> = ({
  topic,
  progress,
  onSaveResult,
  onNext,
  onBackToDashboard,
}) => {
  const { playClick, playFanfare } = useTheme();
  const {
    isTeacher,
    showTeacherAnswerKeys,
    toggleTeacherAnswerKeys,
    openEditorModal,
    studentProfile,
    updateStudentProfile,
  } = useUserRole();
  const { getEffectivePblScenario } = useCurriculumOverrides();
  const baseScenario: PblScenario = getTopicPblScenario(
    topic.id,
    topic.title,
    topic.grade,
    topic.category
  );
  const scenario = getEffectivePblScenario(topic.id, baseScenario);

  // Fullscreen IFP mode
  const [isIfpFullscreen, setIsIfpFullscreen] = useState(false);

  // 5 PBL Menus: 1 to 5
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Menu 1 state: Problem formulation
  const [studentProblemStatement, setStudentProblemStatement] = useState(
    progress.pblResult?.problemTitle || ''
  );

  // Menu 2 state: Selected team role, optional member names & known items check
  const [selectedRole, setSelectedRole] = useState<string>(
    progress.pblResult?.teamRole || 'Ketua Tim (Pengatur Diskusi)'
  );
  const [groupMemberNames, setGroupMemberNames] = useState<string>('');
  const [checkedKnownItems, setCheckedKnownItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  // Menu 3 state: Clue inspections, root causes aspect chosen, investigation notes
  const [inspectedClues, setInspectedClues] = useState<Record<string, boolean>>({});
  const [selectedCauses, setSelectedCauses] = useState<string[]>(
    progress.pblResult?.identifiedCauses || []
  );
  const [investigationNotes, setInvestigationNotes] = useState(
    progress.pblResult?.investigationNotes || ''
  );

  // Menu 4 state: Group's own solution steps (guided by kisi-kisi, not pre-filled answers)
  const [selectedActionIds, setSelectedActionIds] = useState<string[]>(
    progress.pblResult?.actionSteps || []
  );
  const [groupStep1Practical, setGroupStep1Practical] = useState('');
  const [groupStep2Rule, setGroupStep2Rule] = useState('');
  const [groupStep3Education, setGroupStep3Education] = useState('');
  const [solutionSummary, setSolutionSummary] = useState(
    progress.pblResult?.proposedSolution || ''
  );

  // Menu 5 state: Evaluation & Saving
  const [isCompleted, setIsCompleted] = useState(progress.pblResult !== undefined);
  const [calculatedScore, setCalculatedScore] = useState(progress.pblResult?.score || 0);
  const [studentName, setStudentName] = useState(
    progress.pblResult?.studentName || studentProfile.name || ''
  );
  const [studentClass, setStudentClass] = useState(studentProfile.className || '');

  // Sync state when topic changes
  useEffect(() => {
    setActivePhase(1);
    setStudentProblemStatement(progress.pblResult?.problemTitle || '');
    setSelectedRole(progress.pblResult?.teamRole || 'Ketua Tim (Pengatur Diskusi)');
    setGroupMemberNames('');
    setCheckedKnownItems({ 0: true, 1: true, 2: true });
    setInspectedClues({});
    setSelectedCauses(progress.pblResult?.identifiedCauses || []);
    setInvestigationNotes(progress.pblResult?.investigationNotes || '');
    setSelectedActionIds(progress.pblResult?.actionSteps || []);
    setGroupStep1Practical('');
    setGroupStep2Rule('');
    setGroupStep3Education('');
    setSolutionSummary(progress.pblResult?.proposedSolution || '');
    setIsCompleted(progress.pblResult !== undefined);
    setCalculatedScore(progress.pblResult?.score || 0);
  }, [topic.id]);

  const teamRoles = [
    {
      title: 'Ketua Tim (Pengatur Diskusi)',
      icon: Target,
      desc: 'Memimpin jalannya diskusi kelompok dan memastikan semua teman ikut berpendapat.',
    },
    {
      title: 'Detektif Bukti (Pemeriksa Fakta)',
      icon: Search,
      desc: 'Membuka kartu petunjuk bukti di Menu 3 dan mencari penyebab masalahnya.',
    },
    {
      title: 'Perancang Solusi (Pencetus Ide)',
      icon: Lightbulb,
      desc: 'Mengusulkan langkah perbaikan dan aturan bersama berdasarkan kisi-kisi di Menu 4.',
    },
    {
      title: 'Juru Tulis & Bicara (Notulen)',
      icon: FileText,
      desc: 'Mengetik hasil diskusi kelompok di layar dan membacakannya di depan kelas.',
    },
  ];

  // Kategori aspek penyelidikan untuk siswa SMP (bahasa ramah anak, tanpa membocorkan jawaban)
  const studentCauseAspectGuides = [
    {
      id: 'aspek-perilaku',
      label: '1. Faktor Kebiasaan / Kurang Teliti',
      guidingPrompt:
        'Apakah masalah ini terjadi karena ada orang yang terburu-buru, lupa, atau kurang hati-hati?',
    },
    {
      id: 'aspek-teknis',
      label: '2. Faktor Cara Kerja Alat / Aplikasi',
      guidingPrompt:
        'Apakah ada fitur komputer/HP atau cara kerja teknologi yang belum dipahami dengan benar?',
    },
    {
      id: 'aspek-prosedur',
      label: '3. Faktor Belum Ada Aturan Bersama',
      guidingPrompt:
        'Apakah di kelas/sekolah belum ada aturan atau langkah pengecekan bersama yang disepakati?',
    },
  ];

  const handleToggleClue = (clueId: string) => {
    playClick();
    setInspectedClues((prev) => ({ ...prev, [clueId]: !prev[clueId] }));
  };

  const handleOpenAllClues = () => {
    playClick();
    const allOpen: Record<string, boolean> = {};
    scenario.clues.forEach((c) => {
      allOpen[c.id] = true;
    });
    setInspectedClues(allOpen);
  };

  const handleToggleCause = (causeText: string) => {
    playClick();
    setSelectedCauses((prev) =>
      prev.includes(causeText) ? prev.filter((c) => c !== causeText) : [...prev, causeText]
    );
  };

  const handleToggleAction = (actionId: string) => {
    playClick();
    setSelectedActionIds((prev) =>
      prev.includes(actionId) ? prev.filter((a) => a !== actionId) : [...prev, actionId]
    );
  };

  const appendSentenceStarter = (
    currentVal: string,
    setter: (val: string) => void,
    starterText: string
  ) => {
    playClick();
    if (!currentVal.trim()) {
      setter(starterText);
    } else if (!currentVal.includes(starterText)) {
      setter(`${currentVal.trim()} ${starterText}`);
    }
  };

  // Combine structured group solution steps into final solution text
  const getCombinedSolutionText = () => {
    const parts: string[] = [];
    if (groupStep1Practical.trim()) {
      parts.push(`1. Langkah Cepat: ${groupStep1Practical.trim()}`);
    }
    if (groupStep2Rule.trim()) {
      parts.push(`2. Aturan Bersama: ${groupStep2Rule.trim()}`);
    }
    if (groupStep3Education.trim()) {
      parts.push(`3. Karya (${scenario.deliverableName}): ${groupStep3Education.trim()}`);
    }
    if (solutionSummary.trim() && !parts.some((p) => solutionSummary.includes(p))) {
      parts.push(`Kesimpulan: ${solutionSummary.trim()}`);
    }
    return parts.join(' | ');
  };

  const getCustomActionStepsList = (): string[] => {
    const customSteps: string[] = [];
    if (groupStep1Practical.trim()) {
      customSteps.push(`Langkah Praktis Segera: ${groupStep1Practical.trim()}`);
    }
    if (groupStep2Rule.trim()) {
      customSteps.push(`Aturan & Kesepakatan Bersama: ${groupStep2Rule.trim()}`);
    }
    if (groupStep3Education.trim()) {
      customSteps.push(`Karya & Edukasi Pencegahan: ${groupStep3Education.trim()}`);
    }
    return customSteps;
  };

  // Step completion checks for visual SMP progress tracker
  const openedCluesCount = scenario.clues.filter((c) => inspectedClues[c.id]).length;
  const isStep1Done = studentProblemStatement.trim().length >= 8;
  const isStep2Done = Boolean(selectedRole) && Object.values(checkedKnownItems).some(Boolean);
  const isStep3Done =
    openedCluesCount >= 1 && (selectedCauses.length >= 1 || investigationNotes.trim().length >= 8);
  const isStep4Done =
    groupStep1Practical.trim().length >= 5 ||
    groupStep2Rule.trim().length >= 5 ||
    groupStep3Education.trim().length >= 5 ||
    solutionSummary.trim().length >= 8;

  const completedStepsCount = [isStep1Done, isStep2Done, isStep3Done, isStep4Done].filter(
    Boolean
  ).length;

  const pblMenus = [
    {
      num: 1 as const,
      title: 'Menu 1: Cerita & Masalah',
      subtitle: 'Baca kasus & tulis masalahnya',
      icon: BookOpen,
      isDone: isStep1Done,
    },
    {
      num: 2 as const,
      title: 'Menu 2: Bagi Tugas Tim',
      subtitle: 'Pilih peran & cek kisi-kisi',
      icon: Users,
      isDone: isStep2Done,
    },
    {
      num: 3 as const,
      title: 'Menu 3: Buka Bukti',
      subtitle: 'Cek bukti & cari penyebab',
      icon: FolderSearch,
      isDone: isStep3Done,
    },
    {
      num: 4 as const,
      title: 'Menu 4: Rancang Solusi',
      subtitle: 'Susun solusi dari kisi-kisi',
      icon: Wrench,
      isDone: isStep4Done,
    },
    {
      num: 5 as const,
      title: 'Menu 5: Nilai & Cetak',
      subtitle: 'Simpan nilai & cetak LKPD',
      icon: ClipboardCheck,
      isDone: isCompleted,
    },
  ];

  const handleFinalizePbl = () => {
    playClick();
    const combinedSol = getCombinedSolutionText();
    const customSteps = getCustomActionStepsList();

    let score = 20; // base score for group participation
    if (isStep1Done) score += 20;
    if (openedCluesCount >= 1) score += 20;
    if (selectedCauses.length >= 1 || investigationNotes.trim().length >= 8) score += 20;
    if (selectedActionIds.length >= 1 || customSteps.length >= 1) score += 10;
    if (combinedSol.length >= 10) score += 10;

    score = Math.min(100, score);
    setCalculatedScore(score);
    setIsCompleted(true);

    const predicate =
      score >= 85
        ? 'Sangat Baik (Detektif Kritis & Solutif)'
        : score >= 70
        ? 'Baik (Pemecah Masalah Terampil)'
        : 'Cukup (Perlu Eksplorasi Lanjutan)';

    const effectiveCauses =
      selectedCauses.length > 0
        ? selectedCauses
        : investigationNotes.trim()
        ? [investigationNotes.trim()]
        : ['Dianalisis bersama kelompok berdasarkan bukti lapangan.'];

    const effectiveActions =
      customSteps.length > 0
        ? customSteps
        : selectedActionIds.length > 0
        ? selectedActionIds
        : ['Solusi dirumuskan secara mandiri oleh kelompok.'];

    const result: PblResult = {
      problemTitle: studentProblemStatement || scenario.title,
      identifiedCauses: effectiveCauses,
      investigationNotes:
        investigationNotes || 'Penyelidikan kasus diselesaikan sesuai kisi-kisi langkah PBL.',
      proposedSolution:
        combinedSol || 'Solusi hasil diskusi kelompok untuk diterapkan di sekolah.',
      teamRole: groupMemberNames.trim()
        ? `${selectedRole} (Anggota: ${groupMemberNames.trim()})`
        : selectedRole,
      actionSteps: effectiveActions,
      score,
      predicate,
      dateCompleted: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      studentName,
    };

    onSaveResult(result);
    playFanfare();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  // LKPD Printable Modal
  const [isLkpdModalOpen, setIsLkpdModalOpen] = useState(false);

  const handlePrintWorksheet = () => {
    playClick();
    setIsLkpdModalOpen(true);
  };

  return (
    <div
      className={`py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200 ${
        isIfpFullscreen
          ? 'fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 overflow-y-auto max-w-none p-6'
          : ''
      }`}
    >
      <TeacherModuleToolbar
        topicId={topic.id}
        moduleKey="pbl"
        moduleTitle="Modul 5: Studi Kasus PBL"
        editorTab="pbl"
      />

      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            playClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu Materi</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {isTeacher && (
            <button
              type="button"
              onClick={toggleTeacherAnswerKeys}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 border cursor-pointer transition-all ${
                showTeacherAnswerKeys
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 border-emerald-400 hover:bg-emerald-50'
              }`}
            >
              {showTeacherAnswerKeys ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" /> Sembunyikan Kunci Jawaban & Solusi Guru
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" /> Buka Kunci Jawaban & Solusi PBL (Mode Guru)
                </>
              )}
            </button>
          )}

          {/* IFP Screen Toggle */}
          <button
            onClick={() => setIsIfpFullscreen(!isIfpFullscreen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs"
            title="Layar Penuh untuk Layar Sentuh IFP / Proyektor"
          >
            {isIfpFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {isIfpFullscreen ? 'Tutup Layar Penuh' : 'Mode Layar Sentuh IFP'}
            </span>
          </button>

          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-800">
            Modul 5 · Detektif Pemecah Masalah (PBL)
          </span>
        </div>
      </div>

      {/* Header Info & Alur Singkat Anak SMP */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-rose-950/30 border border-rose-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Misi Kelompok Anak SMP · Kelas {topic.grade}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200">
            <span>Progres Kerja Kelompok:</span>
            <span className="text-rose-600 dark:text-rose-400">
              {completedStepsCount} dari 4 Tahap Terisi
            </span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
          Misi Kasus: {scenario.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Bayangkan kelompokmu adalah <strong>Tim Detektif Sekolah</strong>! Kerjakan berurutan dari{' '}
          <strong>Menu 1 sampai Menu 5</strong> di bawah ini. Di setiap menu sudah ada{' '}
          <strong>Kisi-Kisi & Pertanyaan Bantuan</strong> agar kelompokmu mudah menemukan solusi sendiri.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* PETA ALUR 5 MENU PBL (VISUAL & MUDAH DIMENGERTI ANAK SMP)                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {pblMenus.map((menu) => {
          const Icon = menu.icon;
          const isActive = activePhase === menu.num;
          return (
            <button
              key={menu.num}
              type="button"
              onClick={() => {
                playClick();
                setActivePhase(menu.num);
              }}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isActive
                  ? 'border-rose-600 bg-rose-600 text-white shadow-lg scale-[1.01]'
                  : menu.isDone
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 text-slate-800 dark:text-slate-100 hover:border-emerald-400'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <div
                  className={`p-1.5 rounded-xl ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : menu.isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white text-rose-700'
                      : menu.isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {isActive ? 'Sedang Dibuka' : menu.isDone ? '✓ Sudah Diisi' : `Langkah ${menu.num}`}
                </span>
              </div>
              <div>
                <div className="text-xs font-black leading-tight">{menu.title}</div>
                <div
                  className={`text-[10px] mt-0.5 leading-snug ${
                    isActive ? 'text-rose-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {menu.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MENU 1: BACA CERITA & CARI MASALAHNYA                                     */}
      {/* ========================================================================= */}
      {activePhase === 1 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Kotak Panduan 3 Langkah Mudah untuk Anak SMP */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
              <Hand className="w-4 h-4 text-sky-600" />
              <span>Cara Kerja Kelompok di Menu 1 (Ikuti 3 Langkah Mudah Ini):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Baca cerita kejadian</strong> di bawah bersama teman kelompokmu.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Jawab 3 Kisi-Kisi</strong> dengan berdiskusi singkat.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Ketik masalah utamanya</strong> di kotak paling bawah, lalu klik Lanjut!
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border-2 border-rose-200 dark:border-rose-900/80 bg-white dark:bg-slate-900 shadow-xl space-y-5">
            {/* Bagian 1: Cerita Kasus */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>BAGIAN 1 · BACA CERITA KEJADIAN DI: {scenario.location.toUpperCase()}</span>
              </span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                Status Kasus: {scenario.urgencyLevel}
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                {scenario.headline}
              </h2>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p>{scenario.contextStory}</p>
              </div>
            </div>

            {/* Pertanyaan Tantangan Utama */}
            <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Pertanyaan Tantangan untuk Kelompokmu:</span>
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed">
                "{scenario.drivingQuestion}"
              </p>
            </div>

            {/* Bagian 2: KISI-KISI MERUMUSKAN MASALAH (UNTUK KELOMPOK SISWA SMP) */}
            <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
                <Compass className="w-4 h-4 text-amber-600 shrink-0" />
                <span>BAGIAN 2 · KISI-KISI MENCARI MASALAH UTAMA (DISKUSIKAN DULU):</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 space-y-1">
                  <span className="font-black text-amber-800 dark:text-amber-300 block">
                    Kisi-kisi A: Siapa yang Kesulitan?
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    Siapa tokoh di cerita tadi yang mengalami masalah, dan apa kerugian yang mereka rasakan?
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 space-y-1">
                  <span className="font-black text-amber-800 dark:text-amber-300 block">
                    Kisi-kisi B: Apa Masalah Intinya?
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    Kejadian bermasalah apa yang berhubungan dengan materi <strong>{topic.title}</strong>?
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 space-y-1">
                  <span className="font-black text-amber-800 dark:text-amber-300 block">
                    Kisi-kisi C: Apa yang Ingin Dicari?
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    Tuliskan dalam 1-2 kalimat sederhana tentang masalah apa yang harus diselesaikan kelompokmu!
                  </p>
                </div>
              </div>
            </div>

            {/* Kunci Jawaban Rumusan Masalah PBL (HANYA MUNCUL DI MODE GURU) */}
            {isTeacher && showTeacherAnswerKeys && (
              <div
                data-live-editor-ignore="true"
                className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-emerald-900 dark:text-emerald-200">
                    <Key className="w-4 h-4 text-emerald-600" />
                    Kunci Jawaban Guru — Rumusan Masalah Ideal
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setStudentProblemStatement(scenario.idealProblemAnswer)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold cursor-pointer"
                    >
                      Isi Rumusan Masalah Ideal (Demo Guru)
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditorModal('pbl')}
                      className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Edit PBL
                    </button>
                  </div>
                </div>
                <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
                  {scenario.idealProblemAnswer}
                </p>
              </div>
            )}

            {/* Bagian 3: Input Rumusan Masalah dengan Bantuan Awali Kalimat */}
            <div className="space-y-2.5 pt-1">
              <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white block">
                BAGIAN 3 · Tulis Masalah Utama yang Ditemukan Kelompokmu:
              </label>

              {/* Tombol Bantuan Awali Kalimat (Tanpa Bocoran Jawaban) */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Bantuan awali kalimat (klik salah satu):
                </span>
                {[
                  'Masalah utama dalam cerita ini adalah ',
                  'Bagaimana cara agar kita bisa mengatasi masalah ',
                  'Mengapa di dalam kasus tersebut bisa terjadi ',
                ].map((starter, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      appendSentenceStarter(
                        studentProblemStatement,
                        setStudentProblemStatement,
                        starter
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
                  >
                    + "{starter}..."
                  </button>
                ))}
              </div>

              <textarea
                value={studentProblemStatement}
                onChange={(e) => setStudentProblemStatement(e.target.value)}
                placeholder="Contoh cara mengisi: Masalah utama dalam cerita ini adalah ... sehingga kami perlu mencari cara agar ..."
                rows={3}
                className="w-full p-3.5 text-xs sm:text-sm rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              />
            </div>

            {/* Advance to Menu 2 Button */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">
                {isStep1Done
                  ? '✅ Hebat! Rumusan masalah kelompok sudah terisi.'
                  : '💡 Isi kotak di atas dulu, lalu lanjut ke Menu 2.'}
              </span>
              <button
                onClick={() => {
                  playClick();
                  setActivePhase(2);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Lanjut ke Menu 2: Bagi Tugas Tim</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MENU 2: BAGI TUGAS TIM & CEK KISI-KISI PENYELIDIKAN                       */}
      {/* ========================================================================= */}
      {activePhase === 2 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Kotak Panduan 3 Langkah Mudah Menu 2 */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
              <Hand className="w-4 h-4 text-sky-600" />
              <span>Cara Kerja Kelompok di Menu 2 (Ikuti 3 Langkah Mudah Ini):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Pilih peran/tugas</strong> dan tulis nama teman sekelompokmu.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Centang Fakta Awal</strong> yang sudah kita ketahui dari cerita tadi.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Baca 3 Kisi-Kisi Pertanyaan</strong> sebagai bekal membuka bukti di Menu 3!
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
            {/* Bagian 1: Pilih Peran & Nama Anggota */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white block">
                BAGIAN 1 · Pilih Peran Utama & Tulis Nama Anggota Kelompokmu:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {teamRoles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.title;
                  return (
                    <div
                      key={role.title}
                      onClick={() => {
                        playClick();
                        setSelectedRole(role.title);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/60 ring-2 ring-rose-500/40 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`p-2 rounded-xl ${
                            isSelected
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                      </div>
                      <div className="text-xs font-black text-slate-900 dark:text-white">
                        {role.title}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                        {role.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Input Nama Anggota Kelompok (Opsional & Mudah) */}
              <div className="pt-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Daftar Nama Anggota Kelompok (Boleh diisi nama panggilan teman-temanmu):
                </label>
                <input
                  type="text"
                  value={groupMemberNames}
                  onChange={(e) => setGroupMemberNames(e.target.value)}
                  placeholder="Contoh: Budi (Ketua), Siti (Detektif Bukti), Raka (Perancang Solusi), Lani (Penulis)"
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Bagian 2 & 3: Fakta Awal vs Kisi-Kisi Pertanyaan Penyelidikan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* What We Know */}
              <div className="p-4 rounded-2xl border-2 border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-sky-900 dark:text-sky-300 uppercase tracking-wider">
                  <BookmarkCheck className="w-4 h-4 text-sky-600" />
                  <span>BAGIAN 2 · APA YANG SUDAH KITA TAHU DARI CERITA?</span>
                </div>
                <p className="text-[11px] text-sky-800 dark:text-sky-300">
                  Klik/centang fakta kejadian awal yang sudah diceritakan di Menu 1 tadi:
                </p>
                <div className="space-y-2">
                  {scenario.whatWeKnow.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        playClick();
                        setCheckedKnownItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
                      }}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900/40 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5 cursor-pointer shadow-xs"
                    >
                      <CheckSquare
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          checkedKnownItems[idx]
                            ? 'text-sky-600'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What We Need to Learn (Kisi-kisi Penyelidikan) */}
              <div className="p-4 rounded-2xl border-2 border-amber-300 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>BAGIAN 3 · 3 KISI-KISI PERTANYAAN PENYELIDIKAN:</span>
                </div>
                <p className="text-[11px] text-amber-800 dark:text-amber-300">
                  Ini adalah <strong>3 Kisi-Kisi Arahan</strong> yang harus kelompokmu cari jawabannya saat membuka bukti di Menu 3 & menyusun solusi di Menu 4:
                </p>
                <div className="space-y-2">
                  {scenario.whatWeNeedToLearn.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5 shadow-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  playClick();
                  setActivePhase(1);
                }}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                &larr; Kembali ke Menu 1
              </button>
              <button
                onClick={() => {
                  playClick();
                  setActivePhase(3);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Lanjut ke Menu 3: Buka Bukti Kasus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MENU 3: BUKA PETUNJUK BUKTI & CARI PENYEBAB MASALAHNYA                    */}
      {/* ========================================================================= */}
      {activePhase === 3 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Kotak Panduan 3 Langkah Mudah Menu 3 */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
              <Hand className="w-4 h-4 text-sky-600" />
              <span>Cara Kerja Kelompok di Menu 3 (Ikuti 3 Langkah Mudah Ini):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Ketuk & buka semua Kartu Bukti</strong> di Bagian 1 untuk membaca petunjuk.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Centang faktor penyebab</strong> di Bagian 2 sesuai kisi-kisi.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Tulis kesimpulan penyebabnya</strong> dengan kalimatmu sendiri di Bagian 3!
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
            {/* Bagian 1: Kartu Bukti Lapangan */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  BAGIAN 1 · Ketuk Kartu Bukti di Bawah Ini untuk Membuka Petunjuk ({openedCluesCount}/{scenario.clues.length} Bukti Terbuka):
                </span>
                {openedCluesCount < scenario.clues.length && (
                  <button
                    type="button"
                    onClick={handleOpenAllClues}
                    className="px-3 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold hover:bg-indigo-200 cursor-pointer"
                  >
                    Buka Semua Kartu Bukti ({scenario.clues.length})
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scenario.clues.map((clue, idx) => {
                  const isOpen = inspectedClues[clue.id] || false;
                  return (
                    <div
                      key={clue.id}
                      onClick={() => handleToggleClue(clue.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                        isOpen
                          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/30'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                        <span>
                          🔍 Bukti #{idx + 1} · {clue.source}
                        </span>
                        <span
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            isOpen
                              ? 'bg-emerald-600 text-white'
                              : 'bg-indigo-600 text-white animate-pulse'
                          }`}
                        >
                          {isOpen ? '✓ Sudah Dibuka' : 'Ketuk untuk Buka Bukti'}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {clue.title}
                      </div>
                      {isOpen ? (
                        <div className="space-y-2 pt-1 animate-in fade-in">
                          <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900">
                            {clue.content}
                          </p>
                          {/* Pertanyaan Arahan untuk Siswa (Tidak membocorkan kesimpulan matang) */}
                          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
                            <strong>🧭 Pertanyaan Diskusi Bukti #{idx + 1}:</strong> Dari petunjuk di atas, kesalahan atau hal apa yang menyebabkan masalah pada kasus tadi?
                          </div>
                          {/* Kunci Kesimpulan Bukti (HANYA MUNCUL DI MODE GURU) */}
                          {isTeacher && showTeacherAnswerKeys && (
                            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-[11px] font-bold text-emerald-950 dark:text-emerald-200 border border-emerald-300">
                              🔑 Kunci Temuan Bukti (Mode Guru): {clue.highlight}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">
                          Kartu bukti masih tertutup. Klik kartu ini untuk melihat isi petunjuknya!
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bagian 2: KISI-KISI FAKTOR PENYEBAB (UNTUK SISWA SMP - TANPA BOCORAN JAWABAN) */}
            <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
                <Compass className="w-4 h-4 text-amber-600 shrink-0" />
                <span>BAGIAN 2 · PILIH FAKTOR PENYEBAB YANG DITEMUKAN KELOMPOKMU (BOLEH LEBIH DARI 1):</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {studentCauseAspectGuides.map((aspect) => {
                  const isSelected = selectedCauses.includes(aspect.label);
                  return (
                    <div
                      key={aspect.id}
                      onClick={() => handleToggleCause(aspect.label)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all space-y-1.5 ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/90 dark:bg-rose-950/50 shadow-sm'
                          : 'border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-rose-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          {aspect.label}
                        </span>
                        <div
                          className={`p-1 rounded-md shrink-0 ${
                            isSelected
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                        {aspect.guidingPrompt}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Kisi-kisi spesifik materi */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/70 text-xs space-y-1">
                <span className="font-black text-amber-900 dark:text-amber-300 block">
                  💡 Gunakan Kisi-Kisi Ini Saat Menulis Penyebab Masalah di Bawah:
                </span>
                <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                  {scenario.whatWeNeedToLearn.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* KUNCI JAWABAN AKAR PENYEBAB MASALAH (KHUSUS MODE GURU) */}
            {isTeacher && showTeacherAnswerKeys && (
              <div
                data-live-editor-ignore="true"
                className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-emerald-900 dark:text-emerald-200">
                    <Key className="w-4 h-4 text-emerald-600" />
                    Kunci Jawaban Guru — Akar Penyebab Masalah Sebenarnya (Disembunyikan dari Siswa)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      handleOpenAllClues();
                      const rootTexts = scenario.potentialCauses
                        .filter((c) => c.isRootCause)
                        .map((c) => c.text);
                      setSelectedCauses(rootTexts);
                      setInvestigationNotes(
                        scenario.potentialCauses
                          .filter((c) => c.isRootCause)
                          .map((c) => `${c.text} (${c.explanation})`)
                          .join(' | ')
                      );
                    }}
                    className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold cursor-pointer"
                  >
                    Buka Semua Bukti & Isi Kunci Penyebab (Demo Guru)
                  </button>
                </div>

                <div className="space-y-2">
                  {scenario.potentialCauses.map((cause) => (
                    <div
                      key={cause.id}
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        cause.isRootCause
                          ? 'border-emerald-400 bg-white dark:bg-slate-900'
                          : 'border-slate-200 bg-slate-100/70 dark:bg-slate-900/50 opacity-75'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {cause.text}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shrink-0 ${
                            cause.isRootCause
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-300 text-slate-800'
                          }`}
                        >
                          {cause.isRootCause ? '✓ Kunci Akar Masalah' : 'Pengecoh / Bukan Inti'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        <strong>Penjelasan Guru:</strong> {cause.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bagian 3: Investigation Notes Textarea + Sentence Starters */}
            <div className="space-y-2.5 pt-1">
              <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white block">
                BAGIAN 3 · Tulis Penyebab Masalah Menurut Hasil Penyelidikan Kelompokmu:
              </label>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Bantuan awali kalimat (klik salah satu):
                </span>
                {[
                  'Berdasarkan bukti yang kami buka, masalah ini terjadi karena ',
                  'Penyebab utama dari kejadian tersebut adalah ',
                  'Dari Bukti #1 dan #2 terlihat bahwa kesalahan terletak pada ',
                ].map((starter, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      appendSentenceStarter(
                        investigationNotes,
                        setInvestigationNotes,
                        starter
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
                  >
                    + "{starter}..."
                  </button>
                ))}
              </div>

              <textarea
                value={investigationNotes}
                onChange={(e) => setInvestigationNotes(e.target.value)}
                placeholder="Ceritakan dengan bahasamu sendiri: Mengapa masalah di cerita tadi bisa terjadi? Apa bukti yang kelompokmu temukan?"
                rows={4}
                className="w-full p-3.5 text-xs sm:text-sm rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  playClick();
                  setActivePhase(2);
                }}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                &larr; Kembali ke Menu 2
              </button>
              <button
                onClick={() => {
                  playClick();
                  setActivePhase(4);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Lanjut ke Menu 4: Rancang Solusi Kelompok</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MENU 4: RANCANG SOLUSI KELOMPOK BERDASARKAN KISI-KISI                     */}
      {/* (TANPA MEMBERIKAN JAWABAN/SOLUSI JADI KEPADA SISWA)                       */}
      {/* ========================================================================= */}
      {activePhase === 4 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Kotak Panduan 3 Langkah Mudah Menu 4 */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
              <Hand className="w-4 h-4 text-sky-600" />
              <span>Cara Kerja Kelompok di Menu 4 (Ikuti 3 Langkah Mudah Ini):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Isi Kotak Solusi 1, 2, dan 3</strong> sesuai kisi-kisi arahan di tiap kotak.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  Klik tombol <strong>"Gabungkan Otomatis ke Kesimpulan"</strong> di bawah.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  Lanjut ke <strong>Menu 5</strong> untuk melihat skor dan mencetak LKPD kelompok!
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
            {/* Target Karya Kelompok */}
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  🎯 Target Karya / Hasil Diskusi Kelompokmu:
                </span>
                <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white block">
                  {scenario.deliverableName}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Jawablah 3 kotak kisi-kisi di bawah ini dengan ide kelompokmu sendiri (tidak ada jawaban salah selama masuk akal dan sesuai bukti!).
                </p>
              </div>
              <FileText className="w-8 h-8 text-indigo-600 shrink-0 hidden sm:block" />
            </div>

            {/* 3 KOTAK KISI-KISI PERANCANGAN SOLUSI ANAK SMP */}
            <div className="grid grid-cols-1 gap-4">
              {/* Kotak Solusi 1: Langkah Cepat / Praktis */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-900/60 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-black text-emerald-800 dark:text-emerald-300">
                    KOTAK SOLUSI 1 · Langkah Cepat yang Harus Segera Dilakukan
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                    Tindakan Langsung
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300">
                  <strong>🧭 Kisi-Kisi Arahan 1:</strong> Ingat kembali{' '}
                  <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                    "{scenario.whatWeNeedToLearn[0] || topic.title}"
                  </span>
                  . Menurut kelompokmu, tindakan praktis pertama apa yang harus langsung dilakukan untuk membereskan masalah tadi?
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      appendSentenceStarter(
                        groupStep1Practical,
                        setGroupStep1Practical,
                        'Langkah pertama yang harus segera dilakukan adalah '
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 cursor-pointer"
                  >
                    + "Langkah pertama yang harus segera dilakukan adalah..."
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={groupStep1Practical}
                  onChange={(e) => setGroupStep1Practical(e.target.value)}
                  placeholder="Ketik usulan langkah cepat dari kelompokmu di sini..."
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-emerald-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Kotak Solusi 2: Aturan Bersama */}
              <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border-2 border-sky-200 dark:border-sky-900/60 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-black text-sky-800 dark:text-sky-300">
                    KOTAK SOLUSI 2 · Aturan Bersama Agar Masalah Tidak Terulang Lagi
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-600 text-white">
                    Kesepakatan Kelas/Sekolah
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 text-xs text-slate-700 dark:text-slate-300">
                  <strong>🧭 Kisi-Kisi Arahan 2:</strong> Berkaitan dengan{' '}
                  <span className="font-semibold text-sky-800 dark:text-sky-300">
                    "{scenario.whatWeNeedToLearn[1] || topic.title}"
                  </span>
                  , aturan atau kebiasaan disiplin apa yang harus disepakati bersama di{' '}
                  <strong>{scenario.location}</strong> supaya kejadian ini tidak terulang?
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      appendSentenceStarter(
                        groupStep2Rule,
                        setGroupStep2Rule,
                        'Agar masalah tidak terulang, kami menyepakati aturan yaitu '
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[11px] font-bold text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-700 cursor-pointer"
                  >
                    + "Agar masalah tidak terulang, kami menyepakati aturan yaitu..."
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={groupStep2Rule}
                  onChange={(e) => setGroupStep2Rule(e.target.value)}
                  placeholder="Ketik usulan aturan bersama hasil diskusi kelompokmu di sini..."
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-sky-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              {/* Kotak Solusi 3: Ide Karya & Edukasi */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-900/60 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-black text-purple-800 dark:text-purple-300">
                    KOTAK SOLUSI 3 · Ide Karya Kelompok ({scenario.deliverableName})
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-600 text-white">
                    Karya & Ajakan Kebaikan
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-xs text-slate-700 dark:text-slate-300">
                  <strong>🧭 Kisi-Kisi Arahan 3:</strong> Berkaitan dengan{' '}
                  <span className="font-semibold text-purple-800 dark:text-purple-300">
                    "{scenario.whatWeNeedToLearn[2] || topic.title}"
                  </span>
                  , pesan penting atau tips apa yang akan kelompokmu tuliskan di dalam karya{' '}
                  <strong>{scenario.deliverableName}</strong> agar teman-teman lain mudah paham?
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      appendSentenceStarter(
                        groupStep3Education,
                        setGroupStep3Education,
                        `Di dalam karya ${scenario.deliverableName}, kelompok kami akan menuliskan pesan yaitu `
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[11px] font-bold text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 cursor-pointer"
                  >
                    + "Di dalam karya ini, kelompok kami akan menuliskan pesan yaitu..."
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={groupStep3Education}
                  onChange={(e) => setGroupStep3Education(e.target.value)}
                  placeholder={`Ketik isi pesan atau ide karya "${scenario.deliverableName}" kelompokmu di sini...`}
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-purple-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>

            {/* KUNCI JAWABAN & SOLUSI IDEAL PBL (KHUSUS MODE GURU - TIDAK TAMPIL DI MODE SISWA) */}
            {isTeacher && showTeacherAnswerKeys && (
              <div
                data-live-editor-ignore="true"
                className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 space-y-4 shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-emerald-200 dark:border-emerald-800">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-emerald-900 dark:text-emerald-200">
                    <Key className="w-4 h-4 text-emerald-600" />
                    Kunci Jawaban & Referensi Solusi Ideal (Khusus Mode Guru)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedActionIds(scenario.recommendedActions.map((a) => a.id));
                        if (scenario.recommendedActions[0]) {
                          setGroupStep1Practical(
                            `${scenario.recommendedActions[0].title}: ${scenario.recommendedActions[0].desc}`
                          );
                        }
                        if (scenario.recommendedActions[1]) {
                          setGroupStep2Rule(
                            `${scenario.recommendedActions[1].title}: ${scenario.recommendedActions[1].desc}`
                          );
                        }
                        if (scenario.recommendedActions[2]) {
                          setGroupStep3Education(
                            `${scenario.recommendedActions[2].title}: ${scenario.recommendedActions[2].desc}`
                          );
                        }
                        setSolutionSummary(scenario.idealSolutionAnswer);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold cursor-pointer"
                    >
                      Isi Otomatis Contoh Solusi ke Form (Demo Guru)
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditorModal('pbl')}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Kunci Solusi
                    </button>
                  </div>
                </div>

                {/* Daftar Alternatif Tindakan Solutif (Kunci Guru) */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                    Referensi Langkah Aksi Solutif yang Diharapkan dari Kelompok Siswa:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {scenario.recommendedActions.map((action, idx) => {
                      const isChecked = selectedActionIds.includes(action.id);
                      return (
                        <div
                          key={action.id}
                          onClick={() => handleToggleAction(action.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isChecked
                              ? 'border-emerald-600 bg-emerald-100/70 dark:bg-emerald-900/50'
                              : 'border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900'
                          }`}
                        >
                          <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-black shrink-0 mt-0.5">
                            Solusi #{idx + 1}
                          </span>
                          <div className="space-y-0.5 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-xs font-black text-slate-900 dark:text-white">
                                {action.title}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                                {action.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                              {action.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 space-y-1">
                  <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 block">
                    Rangkuman Kunci Jawaban Solusi Ideal:
                  </span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                    {scenario.idealSolutionAnswer}
                  </p>
                </div>
              </div>
            )}

            {/* Kotak Kesimpulan Solusi + Tombol Gabungkan Otomatis */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  Rangkuman Solusi Kelompok (Bisa Diketik atau Klik Tombol Gabungkan Otomatis):
                </label>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    const combined = getCombinedSolutionText();
                    if (combined) {
                      setSolutionSummary(combined);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gabungkan Otomatis dari 3 Kotak di Atas</span>
                </button>
              </div>
              <textarea
                value={solutionSummary}
                onChange={(e) => setSolutionSummary(e.target.value)}
                placeholder="Klik tombol 'Gabungkan Otomatis dari 3 Kotak di Atas' atau tuliskan kesimpulan solusi kelompokmu di sini..."
                rows={3}
                className="w-full p-3.5 text-xs sm:text-sm rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  playClick();
                  setActivePhase(3);
                }}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                &larr; Kembali ke Menu 3
              </button>
              <button
                onClick={() => {
                  playClick();
                  setActivePhase(5);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Lanjut ke Menu 5: Cek Skor & Cetak LKPD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MENU 5: CEK KELENGKAPAN, SIMPAN NILAI & CETAK LKPD                        */}
      {/* ========================================================================= */}
      {activePhase === 5 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Kotak Panduan 3 Langkah Mudah Menu 5 */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
              <Hand className="w-4 h-4 text-sky-600" />
              <span>Langkah Terakhir di Menu 5 (Ikuti 3 Langkah Mudah Ini):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Cek tabel kelengkapan</strong> Menu 1 sampai Menu 4 di bawah.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <strong>Isi nama & kelasmu</strong> pada kotak identitas.
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  Klik <strong>"Simpan Hasil & Dapatkan Nilai"</strong> lalu cetak LKPD!
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
            {/* Bagian 1: Ceklis Kelengkapan Misi Kelompok */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white block">
                BAGIAN 1 · Ceklis Kelengkapan Hasil Diskusi Kelompokmu:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    stepNum: 1 as const,
                    label: 'Menu 1: Rumusan Masalah Kelompok',
                    points: '20 Poin',
                    done: isStep1Done,
                    summary: studentProblemStatement.trim()
                      ? studentProblemStatement
                      : 'Belum diisi (Klik untuk mengisi di Menu 1)',
                  },
                  {
                    stepNum: 2 as const,
                    label: 'Menu 2: Peran Tim & Fakta Awal',
                    points: '20 Poin',
                    done: isStep2Done,
                    summary: `Peran: ${selectedRole}${
                      groupMemberNames ? ` (${groupMemberNames})` : ''
                    }`,
                  },
                  {
                    stepNum: 3 as const,
                    label: 'Menu 3: Buka Bukti & Analisis Penyebab',
                    points: '20 Poin',
                    done: isStep3Done,
                    summary:
                      investigationNotes.trim() ||
                      (selectedCauses.length > 0
                        ? selectedCauses.join(', ')
                        : `Bukti dibuka: ${openedCluesCount}/${scenario.clues.length} (Klik untuk lengkapi)`),
                  },
                  {
                    stepNum: 4 as const,
                    label: 'Menu 4: Rencana Solusi Kelompok',
                    points: '40 Poin',
                    done: isStep4Done,
                    summary:
                      getCombinedSolutionText() ||
                      'Belum diisi (Klik untuk merancang solusi di Menu 4)',
                  },
                ].map((item) => (
                  <div
                    key={item.stepNum}
                    onClick={() => {
                      playClick();
                      setActivePhase(item.stepNum);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all space-y-1.5 ${
                      item.done
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className="text-slate-900 dark:text-white">{item.label}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                          item.done
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 text-white'
                        }`}
                      >
                        {item.done ? `✓ Terisi (${item.points})` : `Belum Lengkap (${item.points})`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ringkasan Lengkap Kunci Jawaban PBL untuk Guru di Menu 5 */}
            {isTeacher && showTeacherAnswerKeys && (
              <div
                data-live-editor-ignore="true"
                className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 space-y-2 text-xs"
              >
                <div className="flex items-center gap-1.5 font-black uppercase text-emerald-900 dark:text-emerald-200">
                  <Key className="w-4 h-4 text-emerald-600" />
                  <span>Pedoman Penilaian & Kunci Jawaban Guru (Evaluasi Kelompok)</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200">
                  <strong>1. Rumusan Masalah Ideal:</strong> {scenario.idealProblemAnswer}
                </p>
                <p className="text-slate-700 dark:text-slate-200">
                  <strong>2. Akar Penyebab Utama:</strong>{' '}
                  {scenario.potentialCauses
                    .filter((c) => c.isRootCause)
                    .map((c) => c.text)
                    .join('; ')}
                </p>
                <p className="text-slate-700 dark:text-slate-200">
                  <strong>3. Solusi Ideal Kelompok:</strong> {scenario.idealSolutionAnswer}
                </p>
              </div>
            )}

            {/* Bagian 2: Reflection Prompt Box */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1.5">
              <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>BAGIAN 2 · Renungan Sikap Baik Sehari-hari:</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic">
                "{scenario.reflectionPrompt}"
              </p>
            </div>

            {/* Bagian 3: Student Name & Class for Certificate & Worksheet */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white block">
                BAGIAN 3 · Identitas Siswa / Kelompok untuk Cetak Lembar Kerja (LKPD):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Nama Lengkap Siswa / Ketua Kelompok:
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      updateStudentProfile({ name: e.target.value });
                    }}
                    placeholder="Ketik nama lengkapmu atau nama kelompok..."
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Kelas (Contoh: {topic.grade}A / {topic.grade}B):
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    value={studentClass}
                    onChange={(e) => {
                      setStudentClass(e.target.value);
                      updateStudentProfile({ className: e.target.value });
                    }}
                    placeholder={`Contoh: Kelas ${topic.grade}A`}
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Result Badge & Complete Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleFinalizePbl}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-black shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Simpan Hasil Kelompok & Dapatkan Nilai</span>
                </button>

                <button
                  onClick={handlePrintWorksheet}
                  className="px-4 py-3 border-2 border-slate-300 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Lembar Kerja (LKPD)</span>
                </button>
              </div>

              {isCompleted && (
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/70 border-2 border-emerald-300 dark:border-emerald-800 px-4 py-2.5 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-black animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Nilai Kelompok: {calculatedScore}/100 Poin · Misi Kasus Selesai!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav Action */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={() => {
            playClick();
            onBackToDashboard();
          }}
          className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
        >
          Kembali ke Menu Materi
        </button>

        <button
          onClick={() => {
            playClick();
            onNext();
          }}
          className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-colors"
        >
          <span>Lanjut ke Modul 6: Mini Game Edukasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal Pratinjau & Cetak LKPD Resmi */}
      <LkpdPrintModal
        isOpen={isLkpdModalOpen}
        onClose={() => setIsLkpdModalOpen(false)}
        topic={topic}
        scenario={scenario}
        studentName={studentName}
        studentClass={studentClass}
        selectedRole={
          groupMemberNames.trim()
            ? `${selectedRole} (Anggota: ${groupMemberNames.trim()})`
            : selectedRole
        }
        studentProblemStatement={studentProblemStatement}
        inspectedClues={inspectedClues}
        selectedCauses={selectedCauses}
        investigationNotes={investigationNotes}
        selectedActionIds={
          getCustomActionStepsList().length > 0
            ? getCustomActionStepsList()
            : selectedActionIds
        }
        solutionSummary={getCombinedSolutionText() || solutionSummary}
        calculatedScore={calculatedScore}
      />
    </div>
  );
};
