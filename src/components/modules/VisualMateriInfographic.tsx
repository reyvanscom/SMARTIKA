import React, { useState } from 'react';
import { Topic } from '../../types/curriculum';
import { APP_ASSETS } from '../../constants/assets';
import {
  FileText,
  Image as ImageIcon,
  Headphones,
  Video,
  ShieldCheck,
  AlertTriangle,
  Search,
  CheckCircle,
  Sparkles,
  Maximize2,
  X,
  Split,
  Repeat,
  MapPin,
  GitBranch,
  Cpu,
  Monitor,
  HardDrive,
  Wifi,
  Lock,
  Code,
  Table,
  Check,
  Database,
  BookOpen,
  Bookmark,
  Layers,
  Share2,
  Key,
  Bluetooth,
  Radio,
  FileSpreadsheet,
  Presentation,
  Glasses,
  MessageSquare,
  Smartphone,
  Network,
  ShieldAlert,
  Globe,
  BarChart3,
  HelpCircle,
  Filter,
  CheckCheck,
  Server,
  Zap,
  MousePointer2
} from 'lucide-react';

import { useCurriculumOverrides } from '../../context/CurriculumOverridesContext';
import { useUserRole } from '../../context/UserRoleContext';
import { Edit3 } from 'lucide-react';

interface VisualMateriInfographicProps {
  topic: Topic;
}

export const VisualMateriInfographic: React.FC<VisualMateriInfographicProps> = ({ topic }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [showFullImageModal, setShowFullImageModal] = useState<string | null>(null);
  const { overrides } = useCurriculumOverrides();
  const { isTeacher, openEditorModal } = useUserRole();

  const tid = topic.id;
  const isComputerOrNetwork =
    tid.includes('komputer') || tid.includes('jaringan') || tid.includes('koneksi') || tid.includes('pemrograman');

  const customImg = overrides[topic.id]?.customMateriImageUrl;
  const activeHeroImg = customImg || (isComputerOrNetwork ? APP_ASSETS.infographicHardware : APP_ASSETS.infographicDigital);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. HERO VISUAL INFOGRAPHIC BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950 group">
        <div className="aspect-[16/9] max-h-[360px] w-full relative overflow-hidden bg-slate-900">
          <img
            src={activeHeroImg}
            alt={`Infografis Visual Edukasi - ${topic.title}`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              const fallback = isComputerOrNetwork ? APP_ASSETS.infographicHardware : APP_ASSETS.infographicDigital;
              if (target.src !== fallback) {
                target.src = fallback;
              }
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay Gradient & Badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/30 backdrop-blur-md border border-sky-400/40 text-sky-200 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{customImg ? 'Gambar Kustom Pilihan Guru' : 'Infografis Visual Siswa SMP'}</span>
                </span>
                <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white drop-shadow-md">
                  Peta Visual: {topic.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {isTeacher && (
                  <button
                    type="button"
                    onClick={() => openEditorModal('gambar')}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-600/90 hover:bg-amber-500 backdrop-blur-md border border-amber-300 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                    title="Ganti Gambar Infografis Ini"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Ganti Gambar Ini</span>
                  </button>
                )}

                <button
                  onClick={() => setShowFullImageModal(activeHeroImg)}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                  title="Perbesar Gambar Infografis"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Perbesar Gambar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DEDICATED VISUAL DIAGRAM PER TOPIK */}

      {/* ========================================================= */}
      {/* 1. TOPIK: k7-idk (Pengantar Informasi Digital) */}
      {/* ========================================================= */}
      {tid === 'k7-idk' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
              Galeri Visual Jenis Informasi Digital
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Kenali 4 Format Informasi Digital Sehari-Hari
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl border-2 border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">1. Teks Digital</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tulisan digital yang mudah dibaca, disalin, dan dicari kata kuncinya.
              </p>
              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
                .PDF · .DOCX · .TXT
              </div>
            </div>

            <div className="p-5 rounded-3xl border-2 border-sky-400 bg-sky-50/60 dark:bg-sky-950/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">2. Gambar & Foto</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Grafik visual, poster pengumuman, dan foto tugas untuk memperjelas pesan.
              </p>
              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border text-[11px] font-mono text-sky-700 dark:text-sky-300">
                .PNG · .JPG · .SVG
              </div>
            </div>

            <div className="p-5 rounded-3xl border-2 border-amber-400 bg-amber-50/60 dark:bg-amber-950/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">3. Audio Digital</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Rekaman suara guru, podcast sains, dan musik pengiring presentasi.
              </p>
              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border text-[11px] font-mono text-amber-700 dark:text-amber-300">
                .MP3 · .WAV · .M4A
              </div>
            </div>

            <div className="p-5 rounded-3xl border-2 border-purple-400 bg-purple-50/60 dark:bg-purple-950/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">4. Video Edukasi</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Gabungan gambar bergerak dan suara untuk tutorial praktikum komputer.
              </p>
              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border text-[11px] font-mono text-purple-700 dark:text-purple-300">
                .MP4 · .WEBM · .MKV
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. TOPIK: k7-bk (Berpikir Komputasional) */}
      {/* ========================================================= */}
      {tid === 'k7-bk' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
              Peta Visual 4 Pilar Nalar Komputasi
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              4 Pilar Berpikir Komputasional dalam Keseharian Siswa SMP
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl border-2 border-sky-400 bg-sky-50/50 dark:bg-sky-950/40 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                <Split className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">1. Dekomposisi</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Memecah masalah besar menjadi bagian-bagian kecil yang mudah dikerjakan.
              </p>
              <div className="text-[11px] font-bold text-sky-700 dark:text-sky-300 pt-1 border-t border-sky-200 dark:border-sky-800">
                Contoh: Membagi tugas piket: menyapu, pel lantai, hapus papan.
              </div>
            </div>

            <div className="p-5 rounded-3xl border-2 border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <Repeat className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">2. Pengenalan Pola</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Melihat kesamaan atau pola teratur yang selalu berulang dari waktu ke waktu.
              </p>
              <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 pt-1 border-t border-emerald-200 dark:border-emerald-800">
                Contoh: Jadwal jam masuk sekolah dan bel istirahat yang teratur.
              </div>
            </div>

            <div className="p-5 rounded-3xl border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-950/40 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">3. Abstraksi</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Fokus hanya pada informasi penting dan mengabaikan detail yang tidak perlu.
              </p>
              <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 pt-1 border-t border-amber-200 dark:border-amber-800">
                Contoh: Peta denah sekolah hanya menggambar ruangan utama.
              </div>
            </div>

            <div className="p-5 rounded-3xl border-2 border-purple-400 bg-purple-50/50 dark:bg-purple-950/40 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center shadow-md">
                <GitBranch className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">4. Algoritma</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Menyusun urutan langkah-langkah logis dari awal hingga masalah tuntas.
              </p>
              <div className="text-[11px] font-bold text-purple-700 dark:text-purple-300 pt-1 border-t border-purple-200 dark:border-purple-800">
                Contoh: Langkah menyalakan komputer lab: colok kabel &rarr; tekan tombol CPU &rarr; monitor.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. TOPIK: k7-hd (Himpunan Data & Analisis Data) */}
      {/* ========================================================= */}
      {tid === 'k7-hd' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
              Alur Pengolahan Data
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Siklus 4 Tahap Mengubah Data Mentah Menjadi Informasi Berguna
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 dark:border-sky-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white mx-auto flex items-center justify-center font-bold">1</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Pengumpulan Data</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Mengisi kuesioner ekskul, daftar absensi, atau catatan peminjaman perpustakaan.</p>
            </div>
            <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-300 dark:border-indigo-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white mx-auto flex items-center justify-center font-bold">2</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Pembersihan & Sortir</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Menghapus data ganda (duplikat), memperbaiki nama salah ketik, dan mengurutkan A-Z.</p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white mx-auto flex items-center justify-center font-bold">3</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Penyaringan (Filter)</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Menampilkan siswa yang memilih ekskul Robotik saja atau kelas 7-A saja.</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white mx-auto flex items-center justify-center font-bold">4</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Grafik Visual</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Membuat diagram batang atau lingkaran agar kepala sekolah langsung paham persentase peminat.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. TOPIK: k7-komputer (Hardware & Perangkat Keras) */}
      {/* ========================================================= */}
      {tid === 'k7-komputer' && (
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Siklus I-P-O Komputer (Input - Process - Output - Storage)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 dark:border-sky-800 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white mx-auto flex items-center justify-center font-bold">1</div>
              <h5 className="font-bold text-xs mt-2">Input Device (Masukan)</h5>
              <p className="text-[11px] text-slate-500">Keyboard, Mouse, Touchscreen IFP, Mikrofon</p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-300 dark:border-indigo-800 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white mx-auto flex items-center justify-center font-bold">2</div>
              <h5 className="font-bold text-xs mt-2">Processing (CPU & RAM)</h5>
              <p className="text-[11px] text-slate-500">Otak processor dan memori sementara sistem</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white mx-auto flex items-center justify-center font-bold">3</div>
              <h5 className="font-bold text-xs mt-2">Output Device (Keluaran)</h5>
              <p className="text-[11px] text-slate-500">Layar Monitor, Proyektor, Speaker, Printer</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white mx-auto flex items-center justify-center font-bold">4</div>
              <h5 className="font-bold text-xs mt-2">Storage (Penyimpanan)</h5>
              <p className="text-[11px] text-slate-500">SSD NVMe, Harddisk, Flashdisk, Google Drive</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. TOPIK: k7-bse (Buku Sekolah Elektronik & Sumber Digital) */}
      {/* ========================================================= */}
      {tid === 'k7-bse' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
              Ekosistem Belajar Modern
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Buku Cetak vs Buku Sekolah Elektronik (BSE Kemendikbud)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl border-2 border-sky-400 bg-sky-50/50 dark:bg-sky-950/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">1. Ringan & Gratis di HP</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tas sekolah tidak berat membawa puluhan buku tebal. 1 file PDF memuat seluruh materi 1 semester.
              </p>
            </div>

            <div className="p-5 rounded-3xl border-2 border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">2. Pencarian Cepat (Ctrl+F)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Cukup ketik kata kunci seperti "algoritma", seketika melompat ke halaman yang tepat tanpa membalik ratusan lembar.
              </p>
            </div>

            <div className="p-5 rounded-3xl border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-950/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                <Bookmark className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">3. Bookmark & Stabilo Digital</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tandai paragraf penting dengan warna stabilo digital tanpa merusak atau mencoret buku fisik perpustakaan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. TOPIK: k7-gdoc (Google Dokumen) */}
      {/* ========================================================= */}
      {tid === 'k7-gdoc' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
              Peta Fitur Kolaborasi Dokumen
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Anatomi Fitur Utama Google Dokumen untuk Tugas Kelompok
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-300 dark:border-blue-800 space-y-1">
              <div className="font-mono text-xs font-bold text-blue-600">H1, H2, H3</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Gaya Judul (Headings)</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Otomatis membuat daftar isi rapi tanpa mengetik nomor halaman secara manual.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-1">
              <div className="text-xs font-bold text-emerald-600">👥 Kolaborasi</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Mengetik Bersama</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Kursor warna-warni tiap anggota regu mengetik bagian masing-masing secara bersamaan.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 space-y-1">
              <div className="text-xs font-bold text-amber-600">✏️ Suggesting</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Mode Saran Revisi</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Memberikan masukan perbaikan tanpa langsung menghapus kalimat asli buatan teman.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border-2 border-purple-300 dark:border-purple-800 space-y-1">
              <div className="text-xs font-bold text-purple-600">🕒 History</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Riwayat Versi</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Jika tulisan tidak sengaja terhapus, bisa dikembalikan ke versi menit sebelumnya.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. TOPIK: k7-gsheet (Google Spreadsheet Dasar) */}
      {/* ========================================================= */}
      {tid === 'k7-gsheet' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
              Struktur Tabel Lembar Kerja
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Memahami Baris, Kolom, Sel, dan Rumus Penjumlahan Otomatis
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl border-2 border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 space-y-2">
              <div className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-300">Kolom (A, B, C) & Baris (1, 2, 3)</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Alamat Sel (Cell Address)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Pertemuan kolom C dan baris 5 disebut sel <strong>C5</strong>. Tempat kita mengisi angka atau teks.</p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-sky-400 bg-sky-50/50 dark:bg-sky-950/40 space-y-2">
              <div className="font-mono text-sm font-bold text-sky-700 dark:text-sky-300">=SUM(C2:C10)</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Rumus Penjumlahan Kilat</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Menjumlahkan ratusan baris harga kantin hanya dalam 1 detik tanpa perlu kalkulator manual.</p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-950/40 space-y-2">
              <div className="font-mono text-sm font-bold text-amber-700 dark:text-amber-300">=AVERAGE(D2:D35)</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Rata-Rata Nilai Siswa</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Mencari nilai rata-rata ulangan kelas secara otomatis begitu guru memasukkan nilai.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. TOPIK: k7-gslide (Google Slide Presentasi) */}
      {/* ========================================================= */}
      {tid === 'k7-gslide' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Prinsip Presentasi Menarik
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Aturan 6x6 dan Desain Slide yang Memikat Penonton
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-950/40 space-y-2">
              <div className="text-sm font-bold text-amber-600">📏 Aturan Emas 6x6</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bukan Memindahkan Buku</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Maksimal 6 baris per slide dan 6 kata per baris. Slide adalah pengingat poin utama, bukan naskah koran.</p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-sky-400 bg-sky-50/50 dark:bg-sky-950/40 space-y-2">
              <div className="text-sm font-bold text-sky-600">🎨 Kontras Warna Jelas</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Mudah Dibaca dari Jauh</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Gunakan background gelap dengan tulisan putih, atau background putih dengan tulisan gelap agar terbaca siswa di baris belakang.</p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 space-y-2">
              <div className="text-sm font-bold text-emerald-600">🖼️ Gambar Relevan</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">1 Gambar Bermakna 1000 Kata</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Sertakan foto atau ikon yang berhubungan langsung dengan pembahasan agar kelas tidak jenuh dan mengantuk.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. TOPIK: k8-koneksi (Koneksi Nirkabel & Bluetooth) */}
      {/* ========================================================= */}
      {tid === 'k8-koneksi' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
              Perbandingan Jalur Koneksi
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Bluetooth vs Wi-Fi vs Kabel USB-C: Kapan Harus Dipakai?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl border-2 border-blue-400 bg-blue-50/50 dark:bg-blue-950/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Bluetooth className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bluetooth (WPAN)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Jarak:</strong> ~10 meter.<br />
                <strong>Karakter:</strong> Hemat baterai, pairing cepat.<br />
                <strong>Cocok untuk:</strong> Earphone TWS, mouse wireless, smartwatch.
              </p>
            </div>

            <div className="p-5 rounded-3xl border-2 border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Wifi className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Wi-Fi (WLAN)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Jarak:</strong> ~50-100 meter.<br />
                <strong>Karakter:</strong> Kecepatan tinggi, banyak perangkat.<br />
                <strong>Cocok untuk:</strong> Ujian ANBK, nonton YouTube edukasi, internet lab.
              </p>
            </div>

            <div className="p-5 rounded-3xl border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-950/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Kabel USB-C / LAN</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Jarak:</strong> Terhubung fisik.<br />
                <strong>Karakter:</strong> Super stabil, anti-gangguan sinyal.<br />
                <strong>Cocok untuk:</strong> Salin video tugas besar 2 GB, cetak ke printer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. TOPIK: k8-fakta-hoaks (Analisis Fakta vs Hoaks) */}
      {/* ========================================================= */}
      {tid === 'k8-fakta-hoaks' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
              Langkah Detektif Fakta
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Piramida 4 Langkah Membongkar Berita Hoaks di WhatsApp / TikTok
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700 space-y-1">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white mx-auto flex items-center justify-center font-bold">1</div>
              <h5 className="font-bold text-xs mt-2">Cek Judul Sensasional</h5>
              <p className="text-[11px] text-slate-500">Waspada judul dengan HURUF KAPITAL SEMUA dan memicu kepanikan berlebihan.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700 space-y-1">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white mx-auto flex items-center justify-center font-bold">2</div>
              <h5 className="font-bold text-xs mt-2">Periksa Domain URL</h5>
              <p className="text-[11px] text-slate-500">Situs resmi berakhiran .go.id atau .sch.id, bukan blogspot gratisan.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700 space-y-1">
              <div className="w-9 h-9 rounded-xl bg-sky-600 text-white mx-auto flex items-center justify-center font-bold">3</div>
              <h5 className="font-bold text-xs mt-2">Telusuri Foto Asli</h5>
              <p className="text-[11px] text-slate-500">Gunakan Google Lens untuk mengecek apakah foto itu foto lama tahun 2018 yang dipakai lagi.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700 space-y-1">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">4</div>
              <h5 className="font-bold text-xs mt-2">Buka Situs CekFakta</h5>
              <p className="text-[11px] text-slate-500">Buka TurnBackHoax.id atau Kominfo untuk verifikasi stempel valid.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. TOPIK: k8-jaringan (Jaringan Komputer & Topologi) */}
      {/* ========================================================= */}
      {tid === 'k8-jaringan' && (
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
              Skema Jaringan Komputer Lab
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Mengapa Laboratorium SMPN 5 Kroya Memakai Topologi Bintang (Star)?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border space-y-2">
              <div className="text-xs font-bold text-sky-600">🔀 Switch Konsentrator</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Pusat Pembagi Sinyal</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Semua kabel LAN dari 32 PC siswa bermuara ke 1 alat Switch utama di rak server.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border space-y-2">
              <div className="text-xs font-bold text-emerald-600">🛡️ Anti Mati Masal</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">1 Rusak, Lainnya Tetap Nyala</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Jika kabel PC nomor 5 putus terinjak, 31 komputer lainnya tetap lancar ujian ANBK.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border space-y-2">
              <div className="text-xs font-bold text-amber-600">🌐 Internet Gateway (Router)</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Pintu Gerbang Dunia Luar</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Router menghubungkan jaringan lokal lab ke provider internet Telkom/Indihome.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. TOPIK: k8-excel (Spreadsheet Rumus Lanjutan) */}
      {/* ========================================================= */}
      {tid === 'k8-excel' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
              4 Formula Wajib Siswa SMP
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Kuasai 4 Rumus Sakti Pengolah Nilai & Keuangan
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-1">
              <div className="font-mono text-xs font-bold text-emerald-600">=SUM(D2:D30)</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Total Penjualan</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Menjumlahkan seluruh total uang kas kelas tanpa salah hitung.</p>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 dark:border-sky-800 space-y-1">
              <div className="font-mono text-xs font-bold text-sky-600">=AVERAGE(C2:C35)</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Rata-Rata Rapor</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Menghitung nilai rata-rata tiap siswa untuk menentukan ranking kelas.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 space-y-1">
              <div className="font-mono text-xs font-bold text-amber-600">=IF(E2&gt;=75;"LULUS";"REMIDI")</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Logika KKM Otomatis</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Komputer otomatis menulis status kelulusan berdasarkan nilai KKM 75.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border-2 border-purple-300 dark:border-purple-800 space-y-1">
              <div className="font-mono text-xs font-bold text-purple-600">=VLOOKUP(A2;Tabel;2;0)</div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Cari Data Vertikal</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">Ketik NISN siswa, seketika muncul nama lengkap dan kelas secara otomatis.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 13. TOPIK: k8-digital-etika (Etika Komunikasi Digital / Netiket) */}
      {/* ========================================================= */}
      {tid === 'k8-digital-etika' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">
              Prinsip Netiket Remaja
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Saringan T-H-I-N-K Sebelum Mengetik Chat atau Posting
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border space-y-1">
              <div className="font-black text-lg text-sky-600">T</div>
              <h5 className="font-bold text-xs">True?</h5>
              <p className="text-[11px] text-slate-500">Apakah info ini benar atau cuma kabar angin burung?</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border space-y-1">
              <div className="font-black text-lg text-emerald-600">H</div>
              <h5 className="font-bold text-xs">Helpful?</h5>
              <p className="text-[11px] text-slate-500">Apakah bermanfaat bagi teman sekelas atau cuma spam?</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border space-y-1">
              <div className="font-black text-lg text-amber-600">I</div>
              <h5 className="font-bold text-xs">Inspiring?</h5>
              <p className="text-[11px] text-slate-500">Apakah memberi semangat positif atau merendahkan?</p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border space-y-1">
              <div className="font-black text-lg text-indigo-600">N</div>
              <h5 className="font-bold text-xs">Necessary?</h5>
              <p className="text-[11px] text-slate-500">Apakah memang perlu dikirim sekarang di grup kelas?</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border space-y-1">
              <div className="font-black text-lg text-rose-600">K</div>
              <h5 className="font-bold text-xs">Kind?</h5>
              <p className="text-[11px] text-slate-500">Apakah bahasanya sopan dan tidak menyakiti hati teman?</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 14. TOPIK: k9-pemrograman (Pemrograman Visual & Algoritma) */}
      {/* ========================================================= */}
      {tid === 'k9-pemrograman' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
              3 Struktur Logika Program
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Fondasi Pemrograman: Urutan, Percabangan, dan Perulangan
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl border-2 border-sky-400 bg-sky-50/50 dark:bg-sky-950/40 space-y-2">
              <div className="text-xs font-bold text-sky-600">1. Urutan (Sequence)</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Langkah Maju Bertahap</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Instruksi dijalankan dari baris atas ke baris bawah secara berurutan persis resep memasak.
              </p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-950/40 space-y-2">
              <div className="text-xs font-bold text-amber-600">2. Percabangan (IF-ELSE)</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Pilihan Berdasarkan Kondisi</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                JIKA ada tembok di depan, MAKA belok kanan; JIKA TIDAK, MAKA terus jalan lurus.
              </p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 space-y-2">
              <div className="text-xs font-bold text-emerald-600">3. Perulangan (Looping)</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Ulangi Tanpa Capek</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Ulangi perintah 'Maju 1 Langkah' sebanyak 10 kali sampai robot mencapai garis finish.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 15. TOPIK: k9-keamanan-digital (Keamanan Siber & 2FA) */}
      {/* ========================================================= */}
      {tid === 'k9-keamanan-digital' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
              Benteng Pertahanan Siber
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              4 Lapis Perlindungan Akun Media Sosial & Google Belajar.id
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 dark:border-sky-800 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white mx-auto flex items-center justify-center font-bold">1</div>
              <h5 className="font-bold text-xs mt-2">Password 12+ Karakter</h5>
              <p className="text-[11px] text-slate-500">Gabungan huruf besar, kecil, angka, dan simbol unik (bukan tanggal lahir).</p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-300 dark:border-indigo-800 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white mx-auto flex items-center justify-center font-bold">2</div>
              <h5 className="font-bold text-xs mt-2">Verifikasi 2 Langkah (2FA)</h5>
              <p className="text-[11px] text-slate-500">Meskipun sandi ditebak orang, peretas tetap tidak bisa masuk tanpa kode OTP HP-mu.</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white mx-auto flex items-center justify-center font-bold">3</div>
              <h5 className="font-bold text-xs mt-2">Anti Phishing / APK Palsu</h5>
              <p className="text-[11px] text-slate-500">Jangan pernah mengklik file .APK mencurigakan seperti "Foto_Paket.apk" di WhatsApp.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">4</div>
              <h5 className="font-bold text-xs mt-2">Update Sistem Berkala</h5>
              <p className="text-[11px] text-slate-500">Selalu perbarui OS ponsel dan browser untuk menutup celah keamanan virus.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 16. TOPIK: k9-pers-digital (Perspektif Digital & VR/AR) */}
      {/* ========================================================= */}
      {tid === 'k9-pers-digital' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block">
              Teknologi Masa Depan
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Perbedaan Virtual Reality (VR), Augmented Reality (AR), dan Cloud
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl border-2 border-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/40 space-y-2">
              <div className="text-xs font-bold text-cyan-600">🥽 Virtual Reality (VR)</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Dunia Maya 100% Imersif</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Memakai kacamata headset tertutup. Seluruh pandangan mata masuk ke simulasi lab sains 3D atau tur planet Mars.
              </p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-purple-400 bg-purple-50/50 dark:bg-purple-950/40 space-y-2">
              <div className="text-xs font-bold text-purple-600">📱 Augmented Reality (AR)</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Menempelkan Objek ke Nyata</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Mengarahkan kamera HP ke meja belajar, lalu muncul animasi 3D organ jantung berdetak di atas buku mejamu.
              </p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 space-y-2">
              <div className="text-xs font-bold text-emerald-600">☁️ Cloud Computing</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Penyimpanan Tanpa Batas</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Menyimpan data di internet sehingga tugas bisa dibuka kapan saja dari HP teman tanpa takut flashdisk ketinggalan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 17. TOPIK: k9-ruang-publik-virtual (Ruang Publik & Jejak Digital) */}
      {/* ========================================================= */}
      {tid === 'k9-ruang-publik-virtual' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">
              Jejak Digital Remaja
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Mengapa Jejak Digital Dikatakan Bersifat Abadi?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl border-2 border-rose-400 bg-rose-50/50 dark:bg-rose-950/40 space-y-2">
              <div className="text-xs font-bold text-rose-600">📸 Tangkapan Layar (Screenshot)</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Cepat Menyebar</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Meskipun postingan ejekan sudah dihapus 5 detik kemudian, orang lain mungkin sudah mengambil screenshot dan menyimpannya.
              </p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-950/40 space-y-2">
              <div className="text-xs font-bold text-amber-600">💾 Server Medsos Abadi</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Data Log Tersimpan</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Penyedia aplikasi menyimpan arsip pesan dan komentar. Data dapat diminta pihak berwajib jika terjadi pelanggaran hukum ITE.
              </p>
            </div>
            <div className="p-5 rounded-3xl border-2 border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 space-y-2">
              <div className="text-xs font-bold text-emerald-600">🎓 Reputasi Masa Depan</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Jejak Prestasi Siswa</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Gunakan medsos untuk memamerkan karya coding, piala olahraga, dan tulisan ilmiah yang membanggakan sekolah.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {showFullImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl p-4 border border-slate-700 shadow-2xl">
            <button
              onClick={() => setShowFullImageModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={showFullImageModal}
                alt="Visual Infografis Layar Penuh"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3 text-center text-xs text-slate-300">
              Infografis Visual Pembelajaran Informatika · SMP Negeri 5 Kroya
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
