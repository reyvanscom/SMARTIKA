import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  Tv,
  Laptop,
  Smartphone,
  BookOpen,
  Sparkles,
  Award
} from 'lucide-react';

interface PetunjukPenggunaanViewProps {
  onBackToHome: () => void;
}

export const PetunjukPenggunaanView: React.FC<PetunjukPenggunaanViewProps> = ({ onBackToHome }) => {
  const { playClick } = useTheme();

  const studentSteps = [
    { step: 1, title: 'Pilih Jenjang Kelas', desc: 'Tentukan jenjang kelasmu: Kelas 7, Kelas 8, atau Kelas 9 di halaman beranda.' },
    { step: 2, title: 'Pilih Materi Pembelajaran', desc: 'Klik salah satu topik materi yang ingin dipelajari secara interaktif.' },
    { step: 3, title: 'Baca Tujuan Pembelajaran', desc: 'Pahami kompetensi dan target capaian yang diharapkan dari materi tersebut.' },
    { step: 4, title: 'Ikuti Apersepsi & Asesmen Awal', desc: 'Tonton video pemantik, tulis pendapat awalmu, lalu jawab 5 soal diagnostik untuk memetakan pemahaman awal.' },
    { step: 5, title: 'Pelajari Materi Berurutan', desc: 'Buka materi penjelasan terstruktur, baca kotak Tahukah Kamu, Fakta Menarik, dan coba uji cepat formatif.' },
    { step: 6, title: 'Lakukan Simulasi Hands-On', desc: 'Lakukan eksperimen interaktif di laboratorium simulasi dan uji pemahaman konsep komputasi.' },
    { step: 7, title: 'Pecahkan Kasus Nyata (PBL)', desc: 'Pecahkan studi kasus nyata kehidupan anak SMP melalui 5 langkah mudah: kenali masalah, bagi tugas tim, cek bukti, buat solusi, dan evaluasi hasil.' },
    { step: 8, title: 'Mainkan Mini Game & Kuis', desc: 'Mainkan mini game edukasi (Mode Individu, Duel, atau Kelompok IFP) lalu selesaikan 10 soal kuis HOTS.' },
    { step: 9, title: 'Kerjakan Asesmen Akhir & Refleksi', desc: 'Jawab 10 soal evaluasi resmi (skor 0-100) dan isi refleksi diri serta tindak lanjut belajar.' },
    { step: 10, title: 'Buat & Cetak Sertifikat', desc: 'Dapatkan Sertifikat Resmi SMART INFORMATIKA bertanda tangan guru yang siap dicetak atau disimpan ke PDF!' }
  ];

  const teacherGuides = [
    {
      device: 'Proyektor Ruang Kelas',
      icon: Tv,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50',
      tips: [
        'Gunakan resolusi layar lebar 16:9 untuk proyeksi yang tajam dan nyaman dibaca dari baris belakang.',
        'Pilih Mode Terang (Light Mode) pada siang hari saat ruang kelas memiliki banyak jendela cahaya.',
        'Manfaatkan fitur Mode Kelompok pada Mini Game untuk kompetisi cerdas antartim meja.'
      ]
    },
    {
      device: 'Interactive Flat Panel (IFP)',
      icon: Tv,
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50',
      tips: [
        'Aplikasi mendukung input multi-touch sentuhan jari atau stylus pen langsung di layar IFP.',
        'Ajak perwakilan siswa maju ke depan layar sentuh untuk menarik kartu simulasi atau menekan opsi kuis.',
        'Gunakan papan skor duel 1 vs 1 untuk interaksi dinamis dua peserta didik di depan kelas.'
      ]
    },
    {
      device: 'Laptop & Komputer Lab',
      icon: Laptop,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50',
      tips: [
        'Sangat ideal untuk pembelajaran mandiri (Self-Paced Learning) di laboratorium komputer sekolah.',
        'Siswa dapat menuntaskan seluruh 9 modul secara runut dan langsung mencetak sertifikat via printer lab.',
        'Gunakan pintasan keyboard F11 untuk beralih ke mode layar penuh (Full Screen Browser).'
      ]
    },
    {
      device: 'Smartphone & Tablet Siswa',
      icon: Smartphone,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
      tips: [
        'Desain antarmuka 100% responsif dan nyaman digunakan dengan orientasi potret maupun lanskap.',
        'Dapat digunakan sebagai media belajar mandiri di rumah atau kegiatan pendalaman materi di luar kelas.',
        'Dilengkapi tombol Silent Mode agar siswa dapat belajar tenang di perpustakaan tanpa mengganggu orang lain.'
      ]
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-200">
      {/* Return button */}
      <div>
        <button
          onClick={() => {
            playClick();
            onBackToHome();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda Utama</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Buku Panduan Operasional</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Petunjuk Penggunaan Media Pembelajaran Interaktif
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Panduan langkah demi langkah bagi Peserta Didik dan Guru SMP Negeri 5 Kroya dalam mengoptimalkan seluruh fitur pembelajaran.
        </p>
      </div>

      {/* Section 1: Panduan Peserta Didik (10 Langkah Belajar) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            1. Panduan Alur Belajar Peserta Didik (10 Langkah Sukses)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {studentSteps.map((s) => (
            <div
              key={s.step}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3 shadow-2xs"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-xs shrink-0 mt-0.5">
                {s.step}
              </span>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Panduan Guru (Implementasi Multi-Device) */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            2. Panduan Guru: Implementasi di Kelas (Proyektor, IFP, Laptop & HP)
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          MPI ini dirancang fleksibel untuk berbagai model skenario pembelajaran: tatap muka di kelas, praktikum di laboratorium komputer, maupun blended learning mandiri.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teacherGuides.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${guide.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {guide.device}
                  </h4>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {guide.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Komitmen Kualitas & Transparansi Fungsional */}
      <div className="p-5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 text-xs text-sky-900 dark:text-sky-200 space-y-2 leading-relaxed">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
          <CheckCircle2 className="w-4 h-4" />
          <span>Integritas Pembelajaran & Keaslian Data</span>
        </div>
        <p>
          Seluruh skor pada aplikasi ini dihitung secara otomatis berdasarkan jawaban riil peserta didik, bukan skor rekayasa acak. Nilai pada sertifikat hasil belajar merefleksikan hasil Asesmen Akhir sebenarnya yang dikerjakan oleh siswa. Audio efek dan musik menggunakan teknologi Web Audio API bebas lisensi yang berjalan lancar secara mandiri di setiap peramban web modern.
        </p>
      </div>
    </div>
  );
};
