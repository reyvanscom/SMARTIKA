import React, { useState, useEffect, useMemo } from 'react';
import { Grade, Topic, ModuleType, StudentProgress } from './types/curriculum';
import { ALL_TOPICS, getTopicsByGrade } from './data/allTopics';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { UserRoleProvider, useUserRole } from './context/UserRoleContext';
import { CurriculumOverridesProvider, useCurriculumOverrides } from './context/CurriculumOverridesContext';
import { TeacherProfileProvider } from './context/TeacherProfileContext';
import { Navbar } from './components/Navbar';
import { SettingsModal } from './components/SettingsModal';
import { RoleSelectionModal } from './components/modals/RoleSelectionModal';
import { TeacherContentEditorModal } from './components/modals/TeacherContentEditorModal';
import { LiveInlineEditorOverlay } from './components/modals/LiveInlineEditorOverlay';
import { StudentDatabaseModal } from './components/modals/StudentDatabaseModal';
import { QuestionBankExcelModal } from './components/modals/QuestionBankExcelModal';
import { saveStudentScoreToDatabase } from './utils/studentDatabase';
import { HeroHomeView } from './components/HeroHomeView';
import { TopicDashboardView } from './components/TopicDashboardView';
import { ApersepsiView } from './components/modules/ApersepsiView';
import { AsesmenAwalView } from './components/modules/AsesmenAwalView';
import { MateriView } from './components/modules/MateriView';
import { SimulasiView } from './components/modules/SimulasiView';
import { PblView } from './components/modules/PblView';
import { LkpdManualView } from './components/modules/LkpdManualView';
import { MiniGameView } from './components/modules/MiniGameView';
import { KuisView } from './components/modules/KuisView';
import { AsesmenAkhirView } from './components/modules/AsesmenAkhirView';
import { RefleksiView } from './components/modules/RefleksiView';
import { SertifikatView } from './components/modules/SertifikatView';
import { TentangGuruView } from './components/views/TentangGuruView';
import { PetunjukPenggunaanView } from './components/views/PetunjukPenggunaanView';
import {
  ShieldCheck,
  Edit3,
  Image as ImageIcon,
  Gamepad2,
  Sliders,
  LogOut,
  Video,
  Key,
  MousePointerClick,
  Database,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

function MainApp() {
  const { playClick } = useTheme();
  const {
    isTeacher,
    studentProfile,
    isRoleModalOpen,
    closeRoleModal,
    isEditorModalOpen,
    closeEditorModal,
    openEditorModal,
    logoutRole,
    showTeacherAnswerKeys,
    toggleTeacherAnswerKeys,
    isLiveEditMode,
    toggleLiveEditMode,
  } = useUserRole();
  const { getEffectiveTopic } = useCurriculumOverrides();

  // Navigation states
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'module' | 'teacher' | 'guide'>('home');
  const [selectedGrade, setSelectedGrade] = useState<Grade>(7);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(() => {
    return ALL_TOPICS[0];
  });
  const effectiveTopic = useMemo(
    () => getEffectiveTopic(selectedTopic),
    [getEffectiveTopic, selectedTopic]
  );
  const [activeModule, setActiveModule] = useState<ModuleType>('apersepsi');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStudentDbOpen, setIsStudentDbOpen] = useState(false);
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false);
  const [studentName, setStudentName] = useState(studentProfile.name || '');
  const [isGlobalFullscreen, setIsGlobalFullscreen] = useState(false);
  const [isTeacherBarMinimized, setIsTeacherBarMinimized] = useState(false);

  useEffect(() => {
    const onFsChange = () => {
      setIsGlobalFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleToggleGlobalFullscreen = () => {
    playClick();
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen?.()
        .then(() => setIsGlobalFullscreen(true))
        .catch(() => {
          setIsGlobalFullscreen((prev) => !prev);
        });
    } else {
      document
        .exitFullscreen?.()
        .then(() => setIsGlobalFullscreen(false))
        .catch(() => {
          setIsGlobalFullscreen(false);
        });
    }
  };

  useEffect(() => {
    setStudentName(studentProfile?.name || '');
  }, [studentProfile?.name]);

  // Multi-topic progress map stored in localStorage
  const [progressMap, setProgressMap] = useState<Record<string, StudentProgress>>(() => {
    try {
      const saved = localStorage.getItem('spenmakro_progress');
      const parsed = saved ? JSON.parse(saved) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  });

  // Save progress to local storage
  useEffect(() => {
    try {
      localStorage.setItem('spenmakro_progress', JSON.stringify(progressMap));
    } catch (e) {}
  }, [progressMap]);

  // Current topic progress
  const rawTopicProgress = progressMap[selectedTopic.id];
  const currentProgress: StudentProgress = {
    ...(rawTopicProgress || {}),
    topicId: selectedTopic.id,
    completedModules: Array.isArray(rawTopicProgress?.completedModules)
      ? rawTopicProgress.completedModules
      : [],
  };

  const markModuleCompleted = (mod: ModuleType) => {
    setProgressMap((prev) => {
      const rawExisting = prev[selectedTopic.id];
      const existing: StudentProgress = {
        ...(rawExisting || {}),
        topicId: selectedTopic.id,
        completedModules: Array.isArray(rawExisting?.completedModules)
          ? rawExisting.completedModules
          : [],
      };
      if (!existing.completedModules.includes(mod)) {
        return {
          ...prev,
          [selectedTopic.id]: {
            ...existing,
            completedModules: [...existing.completedModules, mod],
          },
        };
      }
      return prev;
    });
  };

  // Handlers
  const handleSelectGrade = (grade: Grade) => {
    setSelectedGrade(grade);
    const gradeTopics = getTopicsByGrade(grade);
    if (gradeTopics.length > 0) {
      setSelectedTopic(gradeTopics[0]);
    }
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedGrade(topic.grade);
  };

  const handleStartLearning = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModule = (mod: ModuleType) => {
    setActiveModule(mod);
    setCurrentView('module');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Module sequence advancement
  const moduleSequence: ModuleType[] = [
    'apersepsi',
    'asesmen-awal',
    'materi',
    'simulasi',
    'pbl',
    'lkpd',
    'mini-game',
    'kuis',
    'asesmen-akhir',
    'refleksi',
    'sertifikat',
  ];

  const handleNextModule = () => {
    markModuleCompleted(activeModule);
    const currIdx = moduleSequence.indexOf(activeModule);
    if (currIdx < moduleSequence.length - 1) {
      const nextMod = moduleSequence[currIdx + 1];
      setActiveModule(nextMod);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Universal Sticky Top Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          playClick();
          if (view === 'home') setCurrentView('home');
          else if (view === 'dashboard') setCurrentView('dashboard');
          else if (view === 'guide') setCurrentView('guide');
          else if (view === 'teacher') setCurrentView('teacher');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenQuestionBank={() => setIsQuestionBankOpen(true)}
        activeTopicTitle={currentView !== 'home' ? effectiveTopic.title : undefined}
        isFullscreen={isGlobalFullscreen}
        onToggleFullscreen={handleToggleGlobalFullscreen}
      />

      {/* Global Live Inline Click-to-Edit Overlay for Teachers */}
      <LiveInlineEditorOverlay
        topicId={selectedTopic.id}
        activeModule={currentView === 'module' ? activeModule : currentView}
      />

      {/* Main View Router */}
      <main className={`flex-1 ${isTeacher && !isTeacherBarMinimized ? 'pb-20' : ''}`}>
        {currentView === 'home' && (
          <HeroHomeView
            selectedGrade={selectedGrade}
            onSelectGrade={handleSelectGrade}
            selectedTopic={effectiveTopic}
            onSelectTopic={handleSelectTopic}
            onStartLearning={handleStartLearning}
            onOpenTopicLkpd={(topic) => {
              handleSelectTopic(topic);
              handleOpenModule('lkpd');
            }}
            onNavigateGuide={() => {
              setCurrentView('guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTeacher={() => {
              setCurrentView('teacher');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'dashboard' && (
          <TopicDashboardView
            topic={effectiveTopic}
            progress={currentProgress}
            onSelectModule={handleOpenModule}
            onNavigateHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateTeacher={() => {
              setCurrentView('teacher');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateGuide={() => {
              setCurrentView('guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'module' && (
          <>
            {activeModule === 'apersepsi' && (
              <ApersepsiView
                topic={effectiveTopic}
                progress={currentProgress}
                onSaveHypothesis={(text) => {
                  markModuleCompleted('apersepsi');
                  setProgressMap((prev) => ({
                    ...prev,
                    [selectedTopic.id]: {
                      ...(prev[selectedTopic.id] || { topicId: selectedTopic.id, completedModules: [] }),
                      apersepsiHypothesis: text,
                    },
                  }));
                }}
                onNext={handleNextModule}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {activeModule === 'asesmen-awal' && (
              <AsesmenAwalView
                topic={effectiveTopic}
                progress={currentProgress}
                onSaveResult={(res) => {
                  markModuleCompleted('asesmen-awal');
                  setProgressMap((prev) => ({
                    ...prev,
                    [selectedTopic.id]: {
                      ...(prev[selectedTopic.id] || { topicId: selectedTopic.id, completedModules: [] }),
                      diagnosticResults: res,
                    },
                  }));
                  saveStudentScoreToDatabase({
                    studentName: studentProfile.name || studentName || 'Siswa',
                    className: studentProfile.className || '',
                    studentNumber: studentProfile.studentNumber || '',
                    topicId: effectiveTopic.id,
                    topicTitle: effectiveTopic.title,
                    activityType: 'asesmen-awal',
                    activityName: 'Asesmen Awal (Diagnostik)',
                    score: res.score,
                    maxScore: 100,
                    mode: 'individu',
                    details: `Konsep dikuasai: ${res.masteredConcepts.length}`,
                  }).catch(() => {});
                }}
                onNext={handleNextModule}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {activeModule === 'materi' && (
              <MateriView
                topic={effectiveTopic}
                onNext={handleNextModule}
                onBackToDashboard={() => setCurrentView('dashboard')}
                onOpenLkpd={() => handleOpenModule('lkpd')}
              />
            )}

            {activeModule === 'simulasi' && (
              <SimulasiView
                topic={effectiveTopic}
                progress={currentProgress}
                onSaveResult={(simScore) => {
                  markModuleCompleted('simulasi');
                  setProgressMap((prev) => ({
                    ...prev,
                    [selectedTopic.id]: {
                      ...(prev[selectedTopic.id] || { topicId: selectedTopic.id, completedModules: [] }),
                      simulationCompleted: true,
                      simulationScore: simScore,
                    },
                  }));
                  saveStudentScoreToDatabase({
                    studentName: studentProfile.name || studentName || 'Siswa',
                    className: studentProfile.className || '',
                    studentNumber: studentProfile.studentNumber || '',
                    topicId: effectiveTopic.id,
                    topicTitle: effectiveTopic.title,
                    activityType: 'simulasi',
                    activityName: `Simulasi: ${effectiveTopic.simulasi.title}`,
                    score: simScore,
                    maxScore: 100,
                    mode: 'individu',
                    details: 'Menyelesaikan simulasi interaktif',
                  }).catch(() => {});
                }}
                onNext={handleNextModule}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {activeModule === 'pbl' && (
              <PblView
                topic={effectiveTopic}
                progress={currentProgress}
                onSaveResult={(pblRes) => {
                  markModuleCompleted('pbl');
                  setProgressMap((prev) => ({
                    ...prev,
                    [selectedTopic.id]: {
                      ...(prev[selectedTopic.id] || { topicId: selectedTopic.id, completedModules: [] }),
                      pblResult: pblRes,
                    },
                  }));
                  saveStudentScoreToDatabase({
                    studentName: pblRes.studentName || studentProfile.name || studentName || 'Siswa',
                    className: studentProfile.className || '',
                    studentNumber: studentProfile.studentNumber || '',
                    topicId: effectiveTopic.id,
                    topicTitle: effectiveTopic.title,
                    activityType: 'pbl',
                    activityName: `Studi Kasus PBL: ${pblRes.problemTitle}`,
                    score: pblRes.score,
                    maxScore: 100,
                    mode: 'individu',
                    details: `Predikat: ${pblRes.predicate}`,
                  }).catch(() => {});
                }}
                onNext={handleNextModule}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {activeModule === 'lkpd' && (
              <LkpdManualView
                topic={effectiveTopic}
                onNext={handleNextModule}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {activeModule === 'mini-game' && (
              <MiniGameView
                topic={effectiveTopic}
                onNext={handleNextModule}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {activeModule === 'kuis' && (
              <KuisView
                topic={effectiveTopic}
                progress={currentProgress}
                onSaveQuizScore={(qScore) => {
                  markModuleCompleted('kuis');
                  setProgressMap((prev) => ({
                    ...prev,
                    [selectedTopic.id]: {
                      ...(prev[selectedTopic.id] || { topicId: selectedTopic.id, completedModules: [] }),
                      quizScore: qScore,
                    },
                  }));
                  saveStudentScoreToDatabase({
                    studentName: studentProfile.name || studentName || 'Siswa',
                    className: studentProfile.className || '',
                    studentNumber: studentProfile.studentNumber || '',
                    topicId: effectiveTopic.id,
                    topicTitle: effectiveTopic.title,
                    activityType: 'kuis',
                    activityName: `Kuis Evaluasi: ${effectiveTopic.title}`,
                    score: qScore,
                    maxScore: 100,
                    mode: 'individu',
                    details: 'Menyelesaikan kuis pemahaman konsep',
                  }).catch(() => {});
                }}
                onNext={handleNextModule}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {activeModule === 'asesmen-akhir' && (
              <AsesmenAkhirView
                topic={effectiveTopic}
                progress={currentProgress}
                defaultStudentName={studentName}
                onSaveAssessment={(finalRes) => {
                  markModuleCompleted('asesmen-akhir');
                  setStudentName(finalRes.studentName);
                  setProgressMap((prev) => ({
                    ...prev,
                    [selectedTopic.id]: {
                      ...(prev[selectedTopic.id] || { topicId: selectedTopic.id, completedModules: [] }),
                      finalAssessment: finalRes,
                    },
                  }));
                  saveStudentScoreToDatabase({
                    studentName: finalRes.studentName || studentProfile.name || 'Siswa',
                    className: studentProfile.className || '',
                    studentNumber: studentProfile.studentNumber || '',
                    topicId: effectiveTopic.id,
                    topicTitle: effectiveTopic.title,
                    activityType: 'asesmen-akhir',
                    activityName: `Asesmen Akhir: ${effectiveTopic.title}`,
                    score: finalRes.score,
                    maxScore: 100,
                    mode: 'individu',
                    details: `Predikat: ${finalRes.predicate} (${finalRes.correctCount} benar)`,
                  }).catch(() => {});
                }}
                onGoToCertificate={() => {
                  setActiveModule('sertifikat');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {activeModule === 'refleksi' && (
              <RefleksiView
                topic={effectiveTopic}
                progress={currentProgress}
                onSaveReflection={(refl) => {
                  markModuleCompleted('refleksi');
                  setProgressMap((prev) => ({
                    ...prev,
                    [selectedTopic.id]: {
                      ...(prev[selectedTopic.id] || { topicId: selectedTopic.id, completedModules: [] }),
                      reflection: refl,
                    },
                  }));
                }}
                onNext={handleNextModule}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}

            {activeModule === 'sertifikat' && (
              <SertifikatView
                topic={effectiveTopic}
                progress={currentProgress}
                defaultStudentName={studentName}
                onBackToDashboard={() => setCurrentView('dashboard')}
                onBackToAssessment={() => setActiveModule('asesmen-akhir')}
              />
            )}
          </>
        )}

        {currentView === 'teacher' && (
          <TentangGuruView onBackToHome={() => setCurrentView('home')} />
        )}

        {currentView === 'guide' && (
          <PetunjukPenggunaanView onBackToHome={() => setCurrentView('home')} />
        )}
      </main>

      {/* Floating Teacher CMS Control Bar (Hidden inside full-screen MiniGameView which has its own top Teacher Bar) */}
      {isTeacher && !(currentView === 'module' && activeModule === 'mini-game') && (
        <div
          data-live-editor-ignore="true"
          className="print:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white border-2 border-amber-500 rounded-2xl px-3 py-2 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-[96vw] animate-in slide-in-from-bottom-3 duration-300"
        >
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsTeacherBarMinimized((prev) => !prev);
            }}
            className="flex items-center gap-1.5 text-xs font-black text-amber-400 hover:text-amber-300 shrink-0 cursor-pointer px-1.5 py-0.5 rounded-lg hover:bg-slate-800 transition-colors"
            title={isTeacherBarMinimized ? 'Buka Panel Mode Guru CMS' : 'Kecilkan Panel Mode Guru CMS agar tidak menutupi tombol bawah'}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Mode Guru CMS</span>
            {isTeacherBarMinimized ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {!isTeacherBarMinimized && (
            <>
              <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          {/* Toggle Kunci Jawaban Semua Soal, Studi Kasus & PBL */}
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleTeacherAnswerKeys();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95 cursor-pointer ${
              showTeacherAnswerKeys
                ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Tampilkan / Sembunyikan Jawaban Seharusnya (Kunci Jawaban) di Semua Modul"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{showTeacherAnswerKeys ? 'Kunci Jawaban: ON' : 'Kunci Jawaban: OFF'}</span>
          </button>

          {/* Toggle Klik & Edit Teks/Gambar Bagian Manapun */}
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleLiveEditMode();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95 cursor-pointer ${
              isLiveEditMode
                ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-200'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40'
            }`}
            title="Klik teks atau gambar bagian manapun di layar untuk langsung mengedit"
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>{isLiveEditMode ? 'Klik & Edit Layar: ON' : 'Klik & Edit Layar'}</span>
          </button>

          {/* Menu Bank Soal & Materi (Download & Upload Excel Realtime) */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsQuestionBankOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md ring-2 ring-emerald-300/60 active:scale-95 cursor-pointer"
            title="Buka Menu Bank Soal & Materi Setiap Bab (Download & Upload Excel Realtime)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Bank Soal & Materi (Excel)</span>
          </button>

          {/* Buka Panel CMS Lengkap (Apersepsi s/d Sertifikat + Soal & Jawaban) */}
          <button
            type="button"
            onClick={() => {
              playClick();
              openEditorModal('apersepsi');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Edit semua modul dari Apersepsi sampai Akhir, Soal & Kunci Jawaban"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Semua Modul & Soal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              openEditorModal('video');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Ganti dan simpan semua tautan YouTube (Khusus Guru)"
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden md:inline">YouTube</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              openEditorModal('gambar');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Ganti gambar infografis materi"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Gambar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              openEditorModal('tebak-gambar');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Edit soal dan jawaban Mini Game (Robot 3D, Balap Motor, Tebak Kata, Tebak Gambar)"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Soal Game</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              openEditorModal('simulasi');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Edit skenario simulasi & studi kasus"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Simulasi</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setIsStudentDbOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Lihat Daftar Nama Siswa & Riwayat Skor di Database"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Data & Skor Siswa</span>
          </button>

          <div className="h-4 w-px bg-slate-700" />
          <button
            type="button"
            onClick={() => {
              playClick();
              logoutRole();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-slate-800 text-xs transition-colors cursor-pointer"
            title="Keluar dari Mode Guru"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
            </>
          )}
        </div>
      )}

      {/* Universal Footer */}
      <footer className="print:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong>SMART INFORMATIKA</strong> · SMP Negeri 5 Kroya, Cilacap
          </div>
          <div>
            Guru Pengampu: <strong>Muhammad Rif'ani, S.Kom.</strong>
          </div>
          <div className="text-[11px] opacity-75">
            Kurikulum Merdeka Informatika SMP · Hak Cipta Dilindungi
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* User Role Selection Modal (Siswa / Guru / Tamu) */}
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onClose={closeRoleModal}
      />

      {/* Teacher Content Editor Modal (Apersepsi s/d Sertifikat, Soal & Kunci Jawaban) */}
      <TeacherContentEditorModal
        topic={effectiveTopic}
        isOpen={isEditorModalOpen}
        onClose={closeEditorModal}
        onOpenQuestionBankExcel={() => setIsQuestionBankOpen(true)}
      />

      {/* Bank Soal & Materi Terpadu (Download & Upload Excel Realtime) */}
      <QuestionBankExcelModal
        isOpen={isQuestionBankOpen}
        onClose={() => setIsQuestionBankOpen(false)}
        initialTopic={effectiveTopic}
      />

      {/* Student Name & Score Database Modal */}
      <StudentDatabaseModal
        isOpen={isStudentDbOpen}
        onClose={() => setIsStudentDbOpen(false)}
        topicId={effectiveTopic.id}
        topicTitle={effectiveTopic.title}
        currentMode="individu"
      />
    </div>
  );
}

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error?.message || 'Terjadi kesalahan tampilan' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl text-center space-y-4">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Memuat Ulang Halaman Aplikasi
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Data tampilan sedang disegarkan agar berjalan normal kembali.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, errorMsg: '' });
                }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold cursor-pointer"
              >
                Tampilkan Sekarang
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem('smart_info_teacher_overrides');
                  } catch {}
                  this.setState({ hasError: false, errorMsg: '' });
                  window.location.reload();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold cursor-pointer"
              >
                Reset & Muat Ulang
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <UserRoleProvider>
          <CurriculumOverridesProvider>
            <TeacherProfileProvider>
              <MainApp />
            </TeacherProfileProvider>
          </CurriculumOverridesProvider>
        </UserRoleProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}

