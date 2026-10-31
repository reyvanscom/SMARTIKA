import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Smartphone,
  Share2,
  Trash2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Sliders,
  HelpCircle,
  KeyRound
} from 'lucide-react';

interface SecurityAction {
  id: string;
  category: 'media' | 'privasi' | 'keamanan';
  riskTitle: string;
  riskDesc: string;
  riskImpact: number; // percentage of danger
  fixedTitle: string;
  fixedDesc: string;
  applied: boolean;
  type: 'post' | 'geotag' | 'account' | 'auth' | 'app';
}

export const DigitalFootprintAuditSimulation: React.FC = () => {
  const { playClick, playSuccess, playFanfare } = useTheme();

  const INITIAL_ACTIONS: SecurityAction[] = [
    {
      id: 'act-wa-phone',
      category: 'privasi',
      riskTitle: 'Postingan Kartu Pelajar & No. WA Pribadi di Feed Publik',
      riskDesc: 'Budi mengunggah foto kartu pelajar baru yang memuat NISN, tanggal lahir, dan nomor WhatsApp secara terbuka untuk umum.',
      riskImpact: 25,
      fixedTitle: 'Hapus Postingan & Simpan Data Sensitif di Tempat Pribadi',
      fixedDesc: 'Foto kartu pelajar berhasil dihapus. Nomor telepon disembunyikan agar terhindar dari spam dan pinjaman bodong.',
      applied: false,
      type: 'post'
    },
    {
      id: 'act-geotag',
      category: 'media',
      riskTitle: 'Geotag Lokasi Rumah Nyala Otomatis Saat Foto Diupload',
      riskDesc: 'Setiap foto yang diunggah memuat koordinat GPS presisi pagar rumah tempat tinggal Budi di Kroya.',
      riskImpact: 20,
      fixedTitle: 'Matikan Izin Akses GPS Kamera & Geotag Medsos',
      fixedDesc: 'Metadata lokasi EXIF di kamera dimatikan sehingga orang asing tidak bisa melacak letak rumah Budi.',
      applied: false,
      type: 'geotag'
    },
    {
      id: 'act-account-privacy',
      category: 'privasi',
      riskTitle: 'Profil Medsos Terbuka untuk Publik (Semua Orang Bebas Melihat)',
      riskDesc: 'Orang yang tidak dikenal dapat melihat foto kegiatan harian, teman akrab, dan rutinitas sepulang sekolah.',
      riskImpact: 20,
      fixedTitle: 'Ubah Akun Menjadi Privat (Hanya Teman yang Disetujui)',
      fixedDesc: 'Akun dikunci. Hanya keluarga dan teman sekolah yang disetujui yang dapat melihat cerita dan foto.',
      applied: false,
      type: 'account'
    },
    {
      id: 'act-2fa',
      category: 'keamanan',
      riskTitle: 'Autentikasi 2 Langkah (2FA) Belum Aktif',
      riskDesc: 'Jika password Budi bocor atau ditebak teman, akun bisa langsung dibajak tanpa verifikasi SMS/Google Authenticator.',
      riskImpact: 20,
      fixedTitle: 'Aktifkan Verifikasi 2 Langkah (2FA)',
      fixedDesc: '2FA aktif! Percobaan login dari perangkat baru wajib menyertakan kode rahasia dari HP Budi.',
      applied: false,
      type: 'auth'
    },
    {
      id: 'act-third-party',
      category: 'keamanan',
      riskTitle: 'Memberi Izin Aplikasi Game & Kuis Tak Dikenal ke Akun Google',
      riskDesc: 'Aplikasi kuis "Tebak Wajah Masa Depan" memiliki akses membaca email dan kontak tanpa disadari.',
      riskImpact: 15,
      fixedTitle: 'Cabut Izin Akses Aplikasi Pihak Ketiga Mencurigakan',
      fixedDesc: 'Akses aplikasi kuis diputus total dari pengaturan keamanan akun Google.',
      applied: false,
      type: 'app'
    }
  ];

  const [actions, setActions] = useState<SecurityAction[]>(INITIAL_ACTIONS);

  // Hitung tingkat risiko privasi saat ini
  const currentRisk = actions.reduce((total, act) => {
    return act.applied ? total : total + act.riskImpact;
  }, 0);

  const toggleAction = (id: string) => {
    playClick();
    setActions((prev) => {
      const next = prev.map((act) => (act.id === id ? { ...act, applied: !act.applied } : act));
      const newRisk = next.reduce((tot, a) => (a.applied ? tot : tot + a.riskImpact), 0);
      if (newRisk === 0) {
        playFanfare();
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      } else {
        playSuccess();
      }
      return next;
    });
  };

  const resetAudit = () => {
    playClick();
    setActions(INITIAL_ACTIONS);
  };

  return (
    <div className="space-y-6">
      {/* Banner Utama */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-teal-600 via-emerald-600 to-cyan-700 text-white shadow-xl space-y-2 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-300" />
            <span>Laboratorium Audit Rekam Jejak Digital</span>
          </div>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-xl font-bold">
            Simulasi Keamanan Privasi Siswa
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">
          Digital Footprint Scanner & Privacy Hardening
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          Ambil peran sebagai Ahli Keamanan Digital! Periksa rekam jejak digital Budi di media sosial dan lakukan tindakan perbaikan agar identitasnya aman dari bahaya doxing dan kejahatan siber!
        </p>
      </div>

      {/* DASHBOARD STATUS RISIKO & METER */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Tingkat Risiko Rekam Jejak Digital:
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-4xl font-black font-mono ${
                  currentRisk > 50
                    ? 'text-rose-600'
                    : currentRisk > 20
                    ? 'text-amber-500'
                    : 'text-emerald-500'
                }`}
              >
                {currentRisk}%
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {currentRisk > 50
                  ? 'Sangat Rentan Bahaya Doxing & Pencurian Akun 🚨'
                  : currentRisk > 0
                  ? 'Cukup Waspada (Masih Ada Celah Bocor) ⚠️'
                  : 'Aman & Bersih! Rekam Jejak Terlindungi 🛡️'}
              </span>
            </div>
          </div>

          <button
            onClick={resetAudit}
            className="px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Skenario Audit</span>
          </button>
        </div>

        {/* Progress Bar Risiko */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden p-0.5 border">
          <div
            style={{ width: `${currentRisk}%` }}
            className={`h-full rounded-full transition-all duration-500 ${
              currentRisk > 50
                ? 'bg-rose-500'
                : currentRisk > 20
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
          />
        </div>
      </div>

      {/* FEED TEMUAN REKAM JEJAK & AKSI PERBAIKAN */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Temuan Rekam Jejak Digital Budi (Sentuh Tombol untuk Mengamankan):
          </h3>
          <span className="text-xs font-mono font-bold text-slate-500">
            {actions.filter((a) => a.applied).length} dari {actions.length} Tindakan Diterapkan
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {actions.map((act) => (
            <div
              key={act.id}
              className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                act.applied
                  ? 'border-emerald-500/70 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : 'border-rose-300 dark:border-rose-900/60 bg-white dark:bg-slate-900 shadow-sm'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      act.applied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                    }`}
                  >
                    {act.applied ? 'Sudah Diamankan ✓' : `Risiko +${act.riskImpact}% ⚠️`}
                  </span>
                  <span className="text-xs text-slate-400 capitalize">
                    Kategori: {act.category}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
                  {act.applied ? act.fixedTitle : act.riskTitle}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {act.applied ? act.fixedDesc : act.riskDesc}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => toggleAction(act.id)}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    act.applied
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white ring-2 ring-emerald-400/40'
                  }`}
                >
                  {act.applied ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Kembalikan Risiko</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Terapkan Solusi Aman</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sertifikat Kelulusan Audit Jika Risiko 0% */}
      {currentRisk === 0 && (
        <div className="p-6 rounded-3xl bg-linear-to-b from-white to-emerald-50 dark:from-slate-900 dark:to-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 shadow-xl text-center space-y-3 animate-in zoom-in-95">
          <div className="inline-flex p-3 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            🎉 Selamat! Profil Digital Budi Telah 100% Aman
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Kamu telah menerapkan seluruh prinsip perlindungan rekam jejak digital: menghapus data sensitif, mematikan geotag, mengatur akun privat, dan mengaktifkan verifikasi dua langkah.
          </p>
        </div>
      )}
    </div>
  );
};
