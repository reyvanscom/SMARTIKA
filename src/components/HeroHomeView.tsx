import React from 'react';
import { Grade, Topic } from '../types/curriculum';
import { getTopicsByGrade } from '../data/allTopics';
import { APP_ASSETS } from '../constants/assets';
import { useTheme } from '../context/ThemeContext';
import { useUserRole } from '../context/UserRoleContext';
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Network,
  Code2,
  ShieldCheck,
  FileSpreadsheet,
  Cpu,
  Globe,
  Binary,
  Layers,
  Zap,
  Check,
  User,
  Edit3,
  ImageIcon,
  Printer
} from 'lucide-react';

interface HeroHomeViewProps {
  selectedGrade: Grade;
  onSelectGrade: (grade: Grade) => void;
  selectedTopic: Topic;
  onSelectTopic: (topic: Topic) => void;
  onStartLearning: () => void;
  onOpenTopicLkpd?: (topic: Topic) => void;
  onNavigateGuide: () => void;
  onNavigateTeacher: () => void;
}

// 10 Distinct, Elegant Color Palettes for Topic Cards
const ELEGANT_PALETTES = [
  // 0. Tech Indigo
  {
    border: 'border-indigo-200 dark:border-indigo-800/80 hover:border-indigo-500 dark:hover:border-indigo-400',
    topBar: 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600',
    iconBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800',
    badge: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800',
    button: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25',
    activeGlow: 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/10 bg-indigo-50/30 dark:bg-indigo-950/20'
  },
  // 1. Emerald Jade
  {
    border: 'border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-500 dark:hover:border-emerald-400',
    topBar: 'bg-gradient-to-r from-emerald-500 via-teal-600 to-green-600',
    iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800',
    button: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25',
    activeGlow: 'ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/10 bg-emerald-50/30 dark:bg-emerald-950/20'
  },
  // 2. Warm Amber Gold
  {
    border: 'border-amber-200 dark:border-amber-800/80 hover:border-amber-500 dark:hover:border-amber-400',
    topBar: 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600',
    iconBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    badge: 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200/80 dark:border-amber-800',
    button: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/25',
    activeGlow: 'ring-2 ring-amber-500 shadow-lg shadow-amber-500/10 bg-amber-50/30 dark:bg-amber-950/20'
  },
  // 3. Ruby Crimson
  {
    border: 'border-rose-200 dark:border-rose-800/80 hover:border-rose-500 dark:hover:border-rose-400',
    topBar: 'bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600',
    iconBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200/80 dark:border-rose-800',
    button: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/25',
    activeGlow: 'ring-2 ring-rose-500 shadow-lg shadow-rose-500/10 bg-rose-50/30 dark:bg-rose-950/20'
  },
  // 4. Royal Amethyst
  {
    border: 'border-purple-200 dark:border-purple-800/80 hover:border-purple-500 dark:hover:border-purple-400',
    topBar: 'bg-gradient-to-r from-purple-500 via-purple-600 to-violet-600',
    iconBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
    badge: 'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200/80 dark:border-purple-800',
    button: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/25',
    activeGlow: 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/10 bg-purple-50/30 dark:bg-purple-950/20'
  },
  // 5. Deep Oceanic Cyan
  {
    border: 'border-cyan-200 dark:border-cyan-800/80 hover:border-cyan-500 dark:hover:border-cyan-400',
    topBar: 'bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600',
    iconBg: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800',
    badge: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-800',
    button: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/25',
    activeGlow: 'ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/10 bg-cyan-50/30 dark:bg-cyan-950/20'
  },
  // 6. Sky Azure
  {
    border: 'border-sky-200 dark:border-sky-800/80 hover:border-sky-500 dark:hover:border-sky-400',
    topBar: 'bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600',
    iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-200 dark:border-sky-800',
    badge: 'bg-sky-50 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300 border-sky-200/80 dark:border-sky-800',
    button: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/25',
    activeGlow: 'ring-2 ring-sky-500 shadow-lg shadow-sky-500/10 bg-sky-50/30 dark:bg-sky-950/20'
  },
  // 7. Coral Sunset
  {
    border: 'border-orange-200 dark:border-orange-800/80 hover:border-orange-500 dark:hover:border-orange-400',
    topBar: 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600',
    iconBg: 'bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-200 dark:border-orange-800',
    badge: 'bg-orange-50 text-orange-700 dark:bg-orange-950/70 dark:text-orange-300 border-orange-200/80 dark:border-orange-800',
    button: 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-500/25',
    activeGlow: 'ring-2 ring-orange-500 shadow-lg shadow-orange-500/10 bg-orange-50/30 dark:bg-orange-950/20'
  },
  // 8. Berry Fuchsia
  {
    border: 'border-fuchsia-200 dark:border-fuchsia-800/80 hover:border-fuchsia-500 dark:hover:border-fuchsia-400',
    topBar: 'bg-gradient-to-r from-fuchsia-500 via-fuchsia-600 to-purple-600',
    iconBg: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/80 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800',
    badge: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/70 dark:text-fuchsia-300 border-fuchsia-200/80 dark:border-fuchsia-800',
    button: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-fuchsia-500/25',
    activeGlow: 'ring-2 ring-fuchsia-500 shadow-lg shadow-fuchsia-500/10 bg-fuchsia-50/30 dark:bg-fuchsia-950/20'
  },
  // 9. Steel Teal
  {
    border: 'border-teal-200 dark:border-teal-800/80 hover:border-teal-500 dark:hover:border-teal-400',
    topBar: 'bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600',
    iconBg: 'bg-teal-100 text-teal-700 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-200 dark:border-teal-800',
    badge: 'bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border-teal-200/80 dark:border-teal-800',
    button: 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/25',
    activeGlow: 'ring-2 ring-teal-500 shadow-lg shadow-teal-500/10 bg-teal-50/30 dark:bg-teal-950/20'
  }
];

export const HeroHomeView: React.FC<HeroHomeViewProps> = ({
  selectedGrade,
  onSelectGrade,
  selectedTopic,
  onSelectTopic,
  onStartLearning,
  onOpenTopicLkpd,
  onNavigateGuide,
  onNavigateTeacher
}) => {
  const { playClick } = useTheme();
  const { role, isTeacher, studentProfile, updateStudentProfile, openRoleModal, openEditorModal } = useUserRole();
  const currentGradeTopics = getTopicsByGrade(selectedGrade);

  // Directly enter learning when clicking any card
  const handleEnterTopic = (topic: Topic) => {
    playClick();
    onSelectTopic(topic);
    onStartLearning();
  };

  // Helper to pick dynamic contextual icon for each topic
  const getTopicIcon = (topic: Topic, index: number) => {
    const t = topic.title.toLowerCase();
    const c = topic.category.toLowerCase();
    if (t.includes('jaringan') || t.includes('lan') || t.includes('nirkabel') || c.includes('jaringan')) return Network;
    if (t.includes('pemrograman') || t.includes('coding') || t.includes('algoritma') || c.includes('algoritma')) return Code2;
    if (t.includes('keamanan') || t.includes('siber') || t.includes('password') || t.includes('hoaks') || t.includes('rekam jejak') || t.includes('perundungan') || t.includes('toleransi')) return ShieldCheck;
    if (t.includes('excel') || t.includes('sheet') || t.includes('lembar kerja')) return FileSpreadsheet;
    if (t.includes('komputer') || t.includes('perangkat') || t.includes('hardware')) return Cpu;
    if (t.includes('browser') || t.includes('search') || t.includes('internet') || t.includes('bse')) return Globe;
    if (t.includes('data') || t.includes('analisis') || t.includes('himpunan')) return Binary;
    if (t.includes('komputasional') || t.includes('berpikir')) return Zap;
    const fallback = [BookOpen, Layers, Globe, Cpu, Sparkles];
    return fallback[index % fallback.length];
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Hero Header Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: School Identifier, Main Title, Subtitle, CTA */}
        <div className="lg:col-span-7 space-y-6">
          {/* School Identifier */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-semibold">
            <img
              src={APP_ASSETS.logo}
              alt="Logo Resmi SMPN 5 Kroya"
              className="w-4 h-4 object-contain"
            />
            <span>SMP NEGERI 5 KROYA · KABUPATEN CILACAP</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
              SMART INFORMATIKA
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
              Media Pembelajaran Interaktif (MPI) Informatika Kurikulum Merdeka untuk Peserta Didik SMP Kelas 7, 8, dan 9.
            </p>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                playClick();
                onStartLearning();
              }}
              className="flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>MULAI BELAJAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playClick();
                onNavigateGuide();
              }}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors shadow-xs"
            >
              <HelpCircle className="w-4 h-4 text-sky-500" />
              <span>PETUNJUK PENGGUNAAN</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onNavigateTeacher();
              }}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors shadow-xs"
            >
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>TENTANG GURU</span>
            </button>
          </div>

          {/* User Role & Student Identity Card on Dashboard */}
          <div className="p-4 rounded-2xl border transition-all shadow-xs flex flex-col gap-3.5 bg-slate-50 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  isTeacher
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700'
                    : role === 'student'
                    ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-800'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  {isTeacher ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : role === 'student' ? (
                    <GraduationCap className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md font-mono ${
                      isTeacher
                        ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200'
                        : role === 'student'
                        ? 'bg-sky-200 dark:bg-sky-900 text-sky-900 dark:text-sky-200'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {isTeacher ? 'Mode Guru Aktif (CMS)' : role === 'student' ? 'Peran Siswa' : 'Peran Tamu'}
                    </span>
                    {isTeacher && (
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Hak Edit Terbuka
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isTeacher
                      ? 'Akses Guru: Edit Materi & Ganti Media'
                      : role === 'student'
                      ? studentProfile.name
                        ? `${studentProfile.name}${studentProfile.className ? ` · Kelas ${studentProfile.className}` : ''}`
                        : 'Data Identitas Siswa'
                      : 'Masuk sebagai Siswa atau Guru'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isTeacher
                      ? 'Anda dapat mengubah teks materi, mengganti gambar modul, dan mengatur soal tebak gambar.'
                      : role === 'student'
                      ? 'Nama dan kelas otomatis tercetak pada LKPD dan Sertifikat Pembelajaran.'
                      : 'Pilih peran untuk mengaktifkan profil siswa atau alat pengedit materi untuk guru.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                {isTeacher && (
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      openEditorModal('materi');
                    }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editor Konten</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    openRoleModal();
                  }}
                  className="flex-1 sm:flex-initial px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  {isTeacher ? 'Ganti Peran' : role === 'student' ? 'Ganti Peran' : 'Pilih Peran Masuk'}
                </button>
              </div>
            </div>

            {role === 'student' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Nama Siswa:
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    value={studentProfile.name}
                    onChange={(e) => updateStudentProfile({ name: e.target.value })}
                    placeholder="Nama lengkap siswa"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kelas:
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    value={studentProfile.className}
                    onChange={(e) => updateStudentProfile({ className: e.target.value })}
                    placeholder="Kelas"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Teacher Badge & Tech Features Bar */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={() => {
                playClick();
                onNavigateTeacher();
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left group"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Guru Pengampu:</span>
              <span className="font-semibold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                {APP_ASSETS.teacherName}
              </span>
            </button>
            <span>·</span>
            <div>Mendukung Proyektor, IFP & Smartphone</div>
          </div>
        </div>

        {/* Right Column: Hero High-Fidelity Illustration */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 aspect-[16/10] group">
            <img
              src={APP_ASSETS.hero}
              alt="Siswa SMP Belajar Informatika dan Robotika di SMP Negeri 5 Kroya"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('/assets/images/hero_spenmakro_informatika_1791529497194.jpg')) {
                  target.src = '/assets/images/hero_spenmakro_informatika_1791529497194.jpg';
                }
              }}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kelas Pintar Informatika</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SIMPEL & ELEGAN: PILIHAN JENJANG KELAS & MATERI INFORMATIKA                */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        {/* Section Header with Simple Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Kurikulum Merdeka Fase D</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Pilihan Jenjang Kelas & Materi Informatika
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Klik salah satu kotak materi di bawah untuk <strong>langsung masuk ke ruang belajar interaktif</strong>.
            </p>
          </div>

          {/* Grade Selector Tabs (Kelas 7, Kelas 8, Kelas 9) */}
          <div className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0 self-start sm:self-center shadow-xs">
            {([7, 8, 9] as Grade[]).map((g) => {
              const count = getTopicsByGrade(g).length;
              const isGradeActive = selectedGrade === g;
              return (
                <button
                  key={g}
                  onClick={() => {
                    playClick();
                    onSelectGrade(g);
                    const firstOfGrade = getTopicsByGrade(g)[0];
                    if (firstOfGrade) onSelectTopic(firstOfGrade);
                  }}
                  className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-black rounded-xl transition-all flex items-center gap-2 ${
                    isGradeActive
                      ? 'bg-sky-600 text-white shadow-md scale-105'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>Kelas {g}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isGradeActive
                      ? 'bg-sky-500/40 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic & Distinct Elegant Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentGradeTopics.map((topic, index) => {
            const isSelected = selectedTopic.id === topic.id;
            const palette = ELEGANT_PALETTES[index % ELEGANT_PALETTES.length];
            const TopicIcon = getTopicIcon(topic, index);

            return (
              <div
                key={topic.id}
                onClick={() => handleEnterTopic(topic)}
                className={`group relative rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                  palette.border
                } ${isSelected ? palette.activeGlow : ''}`}
              >
                {/* Top Elegant Colored Gradient Accent Bar */}
                <div className={`h-2.5 w-full ${palette.topBar}`} />

                {/* Card Content Area */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Badge & Number */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${palette.badge}`}>
                      Materi {index + 1} · Kelas {topic.grade}
                    </span>

                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <Check className="w-3 h-3" />
                        <span>Terpilih</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                        Fase D
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform ${palette.iconBg}`}>
                      <TopicIcon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {topic.title}
                      </h3>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                        {topic.category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {topic.shortDesc}
                  </p>
                </div>

                {/* Bottom Interactive Direct Enter & LKPD Print Buttons */}
                <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnterTopic(topic);
                    }}
                    className={`flex-1 py-2.5 px-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${palette.button}`}
                  >
                    <span>Masuk Belajar</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {onOpenTopicLkpd && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                        onOpenTopicLkpd(topic);
                      }}
                      title="Buka & Cetak LKPD Tulis Tangan untuk materi ini"
                      className="py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 bg-teal-50 dark:bg-teal-950/70 hover:bg-teal-600 hover:text-white text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800 transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>LKPD Cetak</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
