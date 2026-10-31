import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Settings, Moon, Sun, Home, BookOpen, HelpCircle, User, Sliders, GraduationCap, ShieldCheck, Maximize2, Minimize2, FileSpreadsheet } from 'lucide-react';
import { APP_ASSETS } from '../constants/assets';
import { useUserRole } from '../context/UserRoleContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSettings: () => void;
  onOpenQuestionBank?: () => void;
  activeTopicTitle?: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSettings,
  onOpenQuestionBank,
  activeTopicTitle,
  isFullscreen: propIsFullscreen,
  onToggleFullscreen
}) => {
  const { theme, setTheme, displayMode, setDisplayMode, playClick } = useTheme();
  const { role, isTeacher, studentProfile, openRoleModal } = useUserRole();
  const [localFullscreen, setLocalFullscreen] = useState(false);

  useEffect(() => {
    const onFsChange = () => {
      setLocalFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const isFs = propIsFullscreen ?? localFullscreen;

  const handleFullscreenToggle = () => {
    playClick();
    if (onToggleFullscreen) {
      onToggleFullscreen();
      return;
    }
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {
        setLocalFullscreen((prev) => !prev);
      });
    } else {
      document.exitFullscreen?.().catch(() => {
        setLocalFullscreen(false);
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors bg-white/90 border-slate-200 dark:bg-slate-950/90 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg group min-w-0"
        >
          <img
            src={APP_ASSETS.logo}
            alt="Logo Resmi SMPN 5 Kroya"
            referrerPolicy="no-referrer"
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-md group-hover:scale-105 transition-all duration-200 shrink-0 select-none"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white truncate">
              SMART INFORMATIKA
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
              SMP Negeri 5 Kroya
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'home'
                ? 'text-sky-600 dark:text-sky-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </button>

          {activeTopicTitle && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'dashboard'
                  ? 'text-sky-600 dark:text-sky-400 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Menu Materi</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('guide')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'guide'
                ? 'text-sky-600 dark:text-sky-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Petunjuk</span>
          </button>

          <button
            onClick={() => onNavigate('teacher')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'teacher'
                ? 'text-sky-600 dark:text-sky-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span>Tentang Guru</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action / Quick Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Tombol Peran: Siswa / Guru / Tamu */}
          <button
            onClick={() => {
              playClick();
              openRoleModal();
            }}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs cursor-pointer ${
              isTeacher
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:hover:bg-amber-900 dark:text-amber-200 dark:border-amber-700'
                : role === 'student'
                ? 'bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300 dark:bg-sky-950/80 dark:hover:bg-sky-900 dark:text-sky-200 dark:border-sky-800'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-200 dark:border-slate-700'
            }`}
            title="Klik untuk memilih peran Siswa atau Guru"
          >
            {isTeacher ? (
              <>
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">Mode Guru</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              </>
            ) : role === 'student' ? (
              <>
                <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="max-w-[75px] sm:max-w-[120px] truncate">{studentProfile.name ? studentProfile.name.split(' ')[0] : 'Siswa'}</span>
                {studentProfile.className && (
                  <span className="text-[10px] px-1 py-0.2 rounded bg-sky-200/70 dark:bg-sky-900 text-sky-800 dark:text-sky-300 font-mono hidden sm:inline">
                    {studentProfile.className}
                  </span>
                )}
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Pilih Peran</span>
                <span className="sm:hidden">Peran</span>
              </>
            )}
          </button>

          {isTeacher && onOpenQuestionBank && (
            <button
              type="button"
              onClick={() => {
                playClick();
                onOpenQuestionBank();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-xs transition-all cursor-pointer active:scale-95"
              title="Buka Menu Bank Soal & Materi (Download & Upload Excel Realtime)"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="hidden md:inline">Bank Soal (Excel)</span>
            </button>
          )}

          {/* Pilihan Tema Warna Cepat */}
          <div className="hidden xl:flex items-center gap-1 px-1.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80" title="Pilihan Tema Warna">
            <button
              onClick={() => {
                playClick();
                setTheme('tech-blue');
              }}
              title="Tema Tech Blue"
              aria-label="Tema Tech Blue"
              className={`w-5 h-5 rounded-full bg-sky-500 transition-all cursor-pointer ${
                theme === 'tech-blue' ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-110 shadow-xs' : 'opacity-60 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => {
                playClick();
                setTheme('cyber-purple');
              }}
              title="Tema Cyber Purple"
              aria-label="Tema Cyber Purple"
              className={`w-5 h-5 rounded-full bg-purple-600 transition-all cursor-pointer ${
                theme === 'cyber-purple' ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-110 shadow-xs' : 'opacity-60 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => {
                playClick();
                setTheme('nature-green');
              }}
              title="Tema Nature Green"
              aria-label="Tema Nature Green"
              className={`w-5 h-5 rounded-full bg-emerald-600 transition-all cursor-pointer ${
                theme === 'nature-green' ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-110 shadow-xs' : 'opacity-60 hover:opacity-100'
              }`}
            />
          </div>

          {/* Pilihan Tema Terang & Tema Gelap */}
          <div className="flex items-center p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-xs shadow-xs">
            <button
              onClick={() => {
                playClick();
                setDisplayMode('light');
              }}
              title="Aktifkan Tema Terang"
              aria-label="Mode Terang"
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                displayMode === 'light'
                  ? 'bg-white text-amber-600 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden lg:inline">Terang</span>
            </button>
            <button
              onClick={() => {
                playClick();
                setDisplayMode('dark');
              }}
              title="Aktifkan Tema Gelap"
              aria-label="Mode Gelap"
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                displayMode === 'dark'
                  ? 'bg-slate-800 text-sky-400 font-bold shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden lg:inline">Gelap</span>
            </button>
          </div>

          {/* Tombol Permanen Mode Full Screen Seluruh MPI */}
          <button
            type="button"
            onClick={handleFullscreenToggle}
            title={isFs ? 'Keluar dari Mode Layar Penuh (ESC)' : 'Aktifkan Mode Layar Penuh (Full Screen)'}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border shadow-xs cursor-pointer active:scale-95 whitespace-nowrap shrink-0 ${
              isFs
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 ring-2 ring-emerald-400/40'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500'
            }`}
          >
            {isFs ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar Full Screen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full Screen</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Pengaturan</span>
          </button>
        </div>
      </div>

      {/* Mobile Quick Navigation Bar (< md) */}
      <div className="md:hidden border-t border-slate-200/80 dark:border-slate-800/80 px-3 py-1.5 bg-slate-50/90 dark:bg-slate-900/90 flex items-center justify-around gap-1 overflow-x-auto no-scrollbar text-xs font-semibold text-slate-600 dark:text-slate-300">
        <button
          onClick={() => onNavigate('home')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 ${
            currentView === 'home'
              ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Beranda</span>
        </button>

        {activeTopicTitle && (
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 ${
              currentView === 'dashboard'
                ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Menu Materi</span>
          </button>
        )}

        <button
          onClick={() => onNavigate('guide')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 ${
            currentView === 'guide'
              ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Petunjuk</span>
        </button>

        <button
          onClick={() => onNavigate('teacher')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 ${
            currentView === 'teacher'
              ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
          <span>Tentang Guru</span>
        </button>
      </div>
    </header>
  );
};
