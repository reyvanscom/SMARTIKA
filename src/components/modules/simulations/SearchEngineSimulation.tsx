import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  Search,
  Globe,
  Lock,
  FileText,
  Building2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const SearchEngineSimulation: React.FC = () => {
  const { playClick, playSuccess, playFanfare } = useTheme();

  const [activeUrlPart, setActiveUrlPart] = useState<'protocol' | 'subdomain' | 'domain' | 'path'>('domain');
  const [searchQuery, setSearchQuery] = useState('informatika kelas 7 filetype:pdf site:kemdikbud.go.id');
  const [hasSearched, setHasSearched] = useState(true);

  const urlBreakdown = {
    protocol: {
      name: 'Protokol Keamanan (https://)',
      desc: 'Hypertext Transfer Protocol Secure. Mengenkripsi komunikasi data antara browser siswa dan server web dengan sertifikat SSL/TLS agar aman dari penyadapan.',
      badge: 'Terenkripsi Aman'
    },
    subdomain: {
      name: 'Subdomain / Identitas Lembaga (smpn5kroya)',
      desc: 'Nama unik yang dipilih oleh sekolah SMP Negeri 5 Kroya untuk mengidentifikasi server dan portal pendidikannya.',
      badge: 'Nama Sekolah'
    },
    domain: {
      name: 'Top-Level Domain Resmi (.sch.id)',
      desc: 'Domain resmi khusus institusi sekolah di Indonesia. Pendaftarannya diawasi ketat oleh PANDI dan wajib melampirkan SK izin operasional resmi.',
      badge: 'Legalitas Resmi'
    },
    path: {
      name: 'Jalur Berkas / Halaman (/kurikulum/materi)',
      desc: 'Petunjuk struktur folder tempat file halaman web disimpan di server komputer sekolah.',
      badge: 'Alamat Halaman'
    }
  };

  const operatorPresets = [
    {
      label: 'Cari PDF Resmi Kemdikbud',
      query: 'buku informatika kelas 7 filetype:pdf site:kemdikbud.go.id',
      desc: 'Hanya menampilkan buku teks format PDF dari situs kemdikbud.go.id'
    },
    {
      label: 'Frasa Persis Tanda Petik ("...")',
      query: '"SMP Negeri 5 Kroya" prestasi',
      desc: 'Hanya mencari halaman yang memuat persis urutan kata "SMP Negeri 5 Kroya"'
    },
    {
      label: 'Pengecualian Kata Minus (-)',
      query: 'jadwal libur sekolah 2026 -hoaks',
      desc: 'Menyingkirkan halaman yang mengandung kata hoaks atau gosip palsu'
    }
  ];

  const handleSelectPreset = (q: string) => {
    playClick();
    setSearchQuery(q);
    setHasSearched(true);
    playSuccess();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setHasSearched(true);
    playFanfare();
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      {/* Simulation Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-teal-600 to-emerald-700 text-white shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-200">
          <Search className="w-4 h-4" />
          <span>Laboratorium Anatomi URL & Mesin Pencari Cerdas</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">
          Simulator Operator Mesin Pencari & Pembedah Anatomi URL Web
        </h2>
        <p className="text-xs sm:text-sm text-teal-100 max-w-2xl leading-relaxed">
          Sentuh segmen alamat web untuk membedah anatomi URL, lalu uji trik kata kunci pencarian
          menggunakan operator khusus (filetype:, site:, dan tanda petik) agar tugas sekolahmu cepat tuntas!
        </p>
      </div>

      {/* Part 1: Clickable URL Anatomy Inspector */}
      <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Pembedah Anatomi Alamat URL (Sentuh Segmen Warna-Warni)</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">Interactive Web Inspector</span>
        </div>

        {/* The Clickable Address Bar */}
        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-1 font-mono text-xs sm:text-sm shadow-inner">
          <button
            onClick={() => {
              playClick();
              setActiveUrlPart('protocol');
            }}
            className={`px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              activeUrlPart === 'protocol'
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400'
                : 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>https://</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveUrlPart('subdomain');
            }}
            className={`px-2.5 py-1.5 rounded-xl font-bold transition-all ${
              activeUrlPart === 'subdomain'
                ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-400'
                : 'bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 hover:bg-sky-200'
            }`}
          >
            smpn5kroya.
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveUrlPart('domain');
            }}
            className={`px-2.5 py-1.5 rounded-xl font-bold transition-all ${
              activeUrlPart === 'domain'
                ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400'
                : 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-200'
            }`}
          >
            sch.id
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveUrlPart('path');
            }}
            className={`px-2.5 py-1.5 rounded-xl font-bold transition-all ${
              activeUrlPart === 'path'
                ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400'
                : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 hover:bg-amber-200'
            }`}
          >
            /materi/informatika-kelas-7
          </button>
        </div>

        {/* Breakdown Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              {urlBreakdown[activeUrlPart].name}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
              {urlBreakdown[activeUrlPart].badge}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {urlBreakdown[activeUrlPart].desc}
          </p>
        </div>
      </div>

      {/* Part 2: Search Engine Operator Testing Bar */}
      <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-teal-600" />
            <span>Simulator Mesin Pencari & Operator Sintaks Cerdas</span>
          </h3>
          <span className="text-xs text-slate-500">Google Syntax Lab</span>
        </div>

        {/* Preset Buttons */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Coba Trik Operator Pencarian Cepat (Sentuh Preset):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {operatorPresets.map((p) => (
              <button
                key={p.label}
                onClick={() => handleSelectPreset(p.query)}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-teal-400 text-left transition-all active:scale-95 space-y-1"
              >
                <div className="text-xs font-extrabold text-teal-700 dark:text-teal-400">
                  {p.label}
                </div>
                <div className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                  {p.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3.5 pl-11 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:border-teal-500 outline-hidden"
              placeholder="Ketik kata kunci pencarian..."
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="px-6 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Cari</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Result Snippet Preview */}
        {hasSearched && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in">
            <div className="text-[11px] text-slate-500">
              Sekitar 4 hasil berkualitas ditemukan dalam 0.18 detik (Hasil Tersaring Presisi)
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                https://buku.kemdikbud.go.id &gt; kurikulum-merdeka &gt; informatika-7.pdf
              </span>
              <h4 className="text-sm font-extrabold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer">
                [PDF] Buku Guru dan Siswa Informatika Kelas VII - Kemendikbudristek
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Buku teks resmi kurikulum merdeka mata pelajaran Informatika untuk siswa SMP/MTs kelas 7. Memuat materi informasi digital, berpikir komputasional, perangkat keras, dan keamanan data.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
