import React from 'react';
import { Topic, ModuleType, StudentProgress } from '../types/curriculum';
import { useTheme } from '../context/ThemeContext';
import { useUserRole } from '../context/UserRoleContext';
import { useCurriculumOverrides } from '../context/CurriculumOverridesContext';
import { APP_ASSETS } from '../constants/assets';
import {
  Lightbulb,
  FileQuestion,
  BookOpen,
  Sliders,
  Gamepad2,
  CheckSquare,
  Award,
  HeartHandshake,
  FileText,
  User,
  HelpCircle,
  Home,
  CheckCircle2,
  ArrowRight,
  Target,
  ShieldCheck,
  Edit3,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Video,
  Printer,
  ClipboardList
} from 'lucide-react';

interface TopicDashboardViewProps {
  topic: Topic;
  progress: StudentProgress;
  onSelectModule: (module: ModuleType) => void;
  onNavigateHome: () => void;
  onNavigateTeacher: () => void;
  onNavigateGuide: () => void;
}

export const TopicDashboardView: React.FC<TopicDashboardViewProps> = ({
  topic,
  progress,
  onSelectModule,
  onNavigateHome,
  onNavigateTeacher,
  onNavigateGuide
}) => {
  const { playClick } = useTheme();
  const { isTeacher, openEditorModal } = useUserRole();
  const { hasCustomOverrides, resetTopicOverride } = useCurriculumOverrides();
  const isOverridden = hasCustomOverrides(topic.id);

  // Core curriculum modules for progress tracking (10 main stages including LKPD Cetak)
  const coreModules: {
    id: ModuleType;
    title: string;
    subtitle: string;
    desc: string;
    icon: React.ElementType;
    color: string;
  }[] = [
    {
      id: 'apersepsi',
      title: '1. Apersepsi',
      subtitle: 'Rasa Ingin Tahu',
      desc: 'Pertanyaan pemantik, cerita masalah nyata, dan tebakan awal rasa ingin tahu.',
      icon: Lightbulb,
      color: 'bg-amber-500'
    },
    {
      id: 'asesmen-awal',
      title: '2. Asesmen Awal',
      subtitle: 'Diagnostik 5 Soal',
      desc: 'Tes diagnostik untuk memetakan pemahaman konsep awal dan rekomendasi belajar.',
      icon: FileQuestion,
      color: 'bg-sky-500'
    },
    {
      id: 'materi',
      title: '3. Materi Pembelajaran',
      subtitle: 'Konsep & Fakta Unik',
      desc: 'Penjelasan terstruktur, infografis, tabel komparasi, Tahukah Kamu?, dan mini formatif.',
      icon: BookOpen,
      color: 'bg-indigo-500'
    },
    {
      id: 'simulasi',
      title: '4. Simulasi dan Aktivitas',
      subtitle: 'Praktik Interaktif',
      desc: 'Aktivitas eksplorasi hands-on, klasifikasi drag-and-drop, dan simulasi komputasi.',
      icon: Sliders,
      color: 'bg-emerald-500'
    },
    {
      id: 'pbl',
      title: '5. Pecahkan Kasus Nyata (PBL)',
      subtitle: 'Problem-Based Learning',
      desc: 'Pecahkan kasus nyata seputar HP, medsos, tugas sekolah, dan komputer lab bareng teman sekelompokmu.',
      icon: Target,
      color: 'bg-rose-500'
    },
    {
      id: 'lkpd',
      title: '6. Lembar Kerja (LKPD)',
      subtitle: 'Versi Cetak & Diisi di Aplikasi',
      desc: 'Lembar Kerja Peserta Didik (Individu & Kelompok): Tersedia Versi Cetak (A4 tulis tangan) dan Versi Digital yang bisa diisi langsung di aplikasi & disimpan.',
      icon: ClipboardList,
      color: 'bg-teal-600'
    },
    {
      id: 'mini-game',
      title: '7. Mini Game Edukasi',
      subtitle: '3 Mode Seru',
      desc: 'Tantangan bermain: Mode Individu, Mode Duel (2 Pemain), dan Mode Kelompok (IFP).',
      icon: Gamepad2,
      color: 'bg-purple-500'
    },
    {
      id: 'kuis',
      title: '8. Kuis Interaktif',
      subtitle: '10 Soal HOTS',
      desc: 'Uji pemahaman bernalar dengan pembahasan tuntas setiap nomor soal.',
      icon: CheckSquare,
      color: 'bg-blue-600'
    },
    {
      id: 'asesmen-akhir',
      title: '9. Asesmen Akhir',
      subtitle: 'Penilaian Ketercapaian',
      desc: '10 soal evaluasi resmi (skor 0-100, predikat belajar, dan syarat sertifikat).',
      icon: Award,
      color: 'bg-amber-500'
    },
    {
      id: 'refleksi',
      title: '10. Refleksi Pembelajaran',
      subtitle: 'Penilaian Diri',
      desc: 'Ungkapkan perasaan belajar, hal yang dipahami, dan rencana tindak lanjut mandiri.',
      icon: HeartHandshake,
      color: 'bg-teal-500'
    }
  ];

  // Secondary modules
  const extraModules: {
    id: string;
    title: string;
    subtitle: string;
    desc: string;
    icon: React.ElementType;
    action: () => void;
  }[] = [
    {
      id: 'sertifikat',
      title: 'Sertifikat Hasil Belajar',
      subtitle: 'Sertifikat Resmi Cetak & PDF',
      desc: 'Dapatkan sertifikat resmi belajar SMPN 5 Kroya setelah menuntaskan asesmen akhir.',
      icon: FileText,
      action: () => onSelectModule('sertifikat')
    },
    {
      id: 'guru',
      title: 'Tentang Guru',
      subtitle: "Muhammad Rif'ani, S.Kom.",
      desc: 'Profil guru pengampu Informatika, motivasi belajar, dan identitas sekolah.',
      icon: User,
      action: onNavigateTeacher
    },
    {
      id: 'petunjuk',
      title: 'Petunjuk Penggunaan',
      subtitle: 'Panduan Siswa & Guru',
      desc: 'Tata cara belajar mandiri dan panduan mengajar via Proyektor / IFP di kelas.',
      icon: HelpCircle,
      action: onNavigateGuide
    }
  ];

  // Calculate completed count
  const completedCount = coreModules.filter((m) => progress.completedModules.includes(m.id)).length;
  const progressPercent = Math.round((completedCount / coreModules.length) * 100);

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Return to Home Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
            <span>Kelas {topic.grade}</span>
            <span>·</span>
            <span>{topic.category}</span>
            <span>·</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800 normal-case">
              ✨ Pembelajaran Mendalam · 8 Dimensi Profil Lulusan (Kemendikdasmen)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {topic.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            {topic.shortDesc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center shrink-0">
          <button
            onClick={() => {
              playClick();
              onSelectModule('lkpd');
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak LKPD (Tulis Tangan)</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onNavigateHome();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Home className="w-4 h-4 text-sky-500" />
            <span>Ganti Materi / Beranda</span>
          </button>
        </div>
      </div>

      {/* Teacher Mode Control Banner */}
      {isTeacher && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-mono">
                  Mode Guru CMS
                </span>
                {isOverridden && (
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Materi Telah Dikustomisasi
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Kustomisasi Materi: {topic.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pilih bagian yang ingin Anda edit, ubah tautan YouTube, atau ganti gambarnya untuk pembelajaran di kelas.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                playClick();
                openEditorModal('materi');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Materi</span>
            </button>
            <button
              onClick={() => {
                playClick();
                openEditorModal('video');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Ganti YouTube</span>
            </button>
            <button
              onClick={() => {
                playClick();
                openEditorModal('gambar');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Ganti Gambar</span>
            </button>
            <button
              onClick={() => {
                playClick();
                openEditorModal('tebak-gambar');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Tebak Gambar</span>
            </button>
            <button
              onClick={() => {
                playClick();
                openEditorModal('simulasi');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulasi</span>
            </button>
            {isOverridden && (
              <button
                onClick={() => {
                  playClick();
                  if (window.confirm('Kembalikan materi topik ini ke konten bawaan Kurikulum Merdeka?')) {
                    resetTopicOverride(topic.id);
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-100/50 rounded-xl text-xs font-semibold transition-colors"
                title="Reset materi ke bawaan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Learning Progress Indicator Banner */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Kemajuan Belajar Peserta Didik
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {completedCount} dari {coreModules.length} modul pembelajaran selesai ({progressPercent}%)
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-100 dark:border-sky-800 self-start sm:self-auto">
            <span>Status:</span>
            <span>
              {progressPercent === 100
                ? 'Selesai Sempurna! 🎉'
                : progressPercent > 50
                ? 'Berjalan Baik 👍'
                : 'Mulai Belajar 🚀'}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 8 Core Learning Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Alur Aktivitas Pembelajaran Interaktif</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreModules.map((mod) => {
            const Icon = mod.icon;
            const isCompleted = progress.completedModules.includes(mod.id);

            return (
              <div
                key={mod.id}
                onClick={() => {
                  playClick();
                  onSelectModule(mod.id);
                }}
                className={`group p-5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between hover:shadow-md ${
                  isCompleted
                    ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-300 dark:hover:border-sky-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl text-white shadow-xs ${mod.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selesai</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 group-hover:text-sky-500 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1">
                    {mod.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    {mod.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 font-medium">
                    Buka Aktivitas
                  </span>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Mulai &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secondary Quick Action Cards (Certificate, Teacher, Guide) */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
          Layanan & Fitur Pendukung Pembelajaran
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {extraModules.map((ext) => {
            const Icon = ext.icon;
            const isCert = ext.id === 'sertifikat';
            const canPrintCert = Boolean(progress.finalAssessment);

            return (
              <div
                key={ext.id}
                onClick={() => {
                  playClick();
                  ext.action();
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                  isCert
                    ? 'border-amber-300 dark:border-amber-700 bg-amber-50/30 dark:bg-amber-950/20 hover:border-amber-400'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg shrink-0 overflow-hidden ${
                    isCert
                      ? 'bg-amber-500 text-white'
                      : ext.id === 'guru'
                      ? 'p-0 w-10 h-10 rounded-xl border border-sky-400/60 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {ext.id === 'guru' ? (
                    <img
                      src={APP_ASSETS.teacherPhotoReal}
                      alt="Foto Guru"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {ext.title}
                  </h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {ext.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {ext.desc}
                  </p>
                  {isCert && (
                    <span className="inline-block mt-2 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                      {canPrintCert
                        ? '★ Siap Dicetak & Diunduh'
                        : '○ Tuntaskan Asesmen Akhir Terlebih Dahulu'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
