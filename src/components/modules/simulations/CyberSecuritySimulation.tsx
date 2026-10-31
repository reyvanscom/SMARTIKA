import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  ShieldAlert,
  Key,
  Lock,
  Unlock,
  AlertOctagon,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';

export const CyberSecuritySimulation: React.FC = () => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();

  const [password, setPassword] = useState('Spenm@kr0_2026!');
  const [showPassword, setShowPassword] = useState(false);

  // Criteria evaluation
  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const criteriaCount = [hasMinLen, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  const strengthScore = Math.min(100, Math.round((criteriaCount / 5) * 100));

  const getEstimatedCrackTime = () => {
    if (password.length <= 4) return '0.0001 Detik (Seketika Tembus)';
    if (criteriaCount <= 2) return '2 Detik (Sangat Rentan Brute-force)';
    if (criteriaCount === 3) return '3 Jam (Bisa Dibobol Komputer Biasa)';
    if (criteriaCount === 4) return '5 Tahun (Cukup Kuat)';
    return '450 Juta Tahun (Benteng Pertahanan Super Kuat)';
  };

  const presets = [
    { label: 'Sandi Lemah', val: '123456' },
    { label: 'Sandi Tanggal Lahir', val: 'kroya170845' },
    { label: 'Sandi Sedang', val: 'Informatika2026' },
    { label: 'Sandi Kuat Pelajar', val: 'Spenm@kr0_Sm@rt2026!' }
  ];

  // Threat Firewall Scanner State
  const threats = [
    {
      id: 't-1',
      sender: 'Undangan_Pernikahan.apk (Nomor WA Asing)',
      desc: 'File instalasi berbahaya mengandung trojan pencuri SMS dan kode OTP.',
      isSafe: false,
      recommended: 'BLOKIR'
    },
    {
      id: 't-2',
      sender: 'https://smpn5kroya.sch.id (Portal Nilai Sekolah)',
      desc: 'Koneksi terenkripsi SSL dengan domain resmi institusi pendidikan.',
      isSafe: true,
      recommended: 'IZINKAN'
    },
    {
      id: 't-3',
      sender: 'smp5kroya-login.free-web.xyz (Email Palsu Phising)',
      desc: 'Halaman login tiruan untuk memancing kata sandi akun belajar siswa.',
      isSafe: false,
      recommended: 'BLOKIR'
    }
  ];

  const [firewallDecisions, setFirewallDecisions] = useState<Record<string, 'IZINKAN' | 'BLOKIR'>>({});

  const handleDecision = (id: string, action: 'IZINKAN' | 'BLOKIR') => {
    playClick();
    setFirewallDecisions((prev) => ({
      ...prev,
      [id]: action
    }));

    const threat = threats.find((t) => t.id === id);
    if (threat && threat.recommended === action) {
      playSuccess();
    } else {
      playError();
    }
  };

  return (
    <div className="space-y-6">
      {/* Simulation Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-red-600 via-rose-600 to-indigo-800 text-white shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Laboratorium Benteng Pertahanan Siber & Keamanan Akun</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">
          Simulator Penguji Ketahanan Kata Sandi & Firewall Siber
        </h2>
        <p className="text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
          Ketahui berapa lama robot peretas (hacker) membobol kata sandimu dan latih refleksmu memblokir paket malware jahat pada firewall sekolah!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tool 1: Password Strength Analyzer */}
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-rose-600" />
              <span>Penguji Ketahanan Kata Sandi (Password Entropy)</span>
            </h3>
            <span className="text-xs font-mono font-bold text-slate-500">
              Skor: {strengthScore}/100
            </span>
          </div>

          {/* Input Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Ketik atau Pilih Contoh Kata Sandi:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 pr-12 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm font-bold text-slate-900 dark:text-white focus:border-rose-500 outline-hidden"
                placeholder="Ketik kata sandi..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    playClick();
                    setPassword(p.val);
                  }}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Strength Meter Bar */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Estimasi Waktu Peretasan Kamus:</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">
                {getEstimatedCrackTime()}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  strengthScore >= 80
                    ? 'bg-emerald-500'
                    : strengthScore >= 60
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${strengthScore}%` }}
              />
            </div>
          </div>

          {/* 5 Security Checkpoints */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
              5 Kriteria Benteng Kata Sandi Kuat:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className={`flex items-center gap-2 p-2 rounded-xl border ${hasMinLen ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Minimal 8 Karakter</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded-xl border ${hasUpper ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Huruf Kapital (A-Z)</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded-xl border ${hasLower ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Huruf Kecil (a-z)</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded-xl border ${hasNumber ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Angka (0-9)</span>
              </div>
              <div className={`sm:col-span-2 flex items-center gap-2 p-2 rounded-xl border ${hasSpecial ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Karakter Khusus / Simbol Unik (!@#$%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tool 2: Threat Firewall Defense Scanner */}
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Firewall Jaringan: Filter Ancaman Masuk</span>
              </h3>
              <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300">
                Rule Defense Aktif
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Tentukan tindakan firewall untuk setiap paket data lalu lintas yang hendak masuk ke komputer lab sekolah:
            </p>

            {/* List of Threat Packets */}
            <div className="space-y-3">
              {threats.map((t) => {
                const decision = firewallDecisions[t.id];
                const isCorrect = decision === t.recommended;

                return (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                        <span className="truncate max-w-[240px] font-mono">{t.sender}</span>
                        {decision && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              isCorrect
                                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                                : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                            }`}
                          >
                            {isCorrect ? '✓ Tepat' : '✗ Bahaya!'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{t.desc}</p>
                    </div>

                    <div className="flex gap-2 pt-1 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => handleDecision(t.id, 'BLOKIR')}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                          decision === 'BLOKIR'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-rose-600 hover:bg-rose-50'
                        }`}
                      >
                        🚫 BLOKIR (Tolak Paket)
                      </button>

                      <button
                        onClick={() => handleDecision(t.id, 'IZINKAN')}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                          decision === 'IZINKAN'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        ✓ IZINKAN (Teruskan)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 italic text-center">
            💡 Ingat prinsip keamanan siber: Selalu blokir file instalasi tidak dikenal dan link phising mencurigakan!
          </div>
        </div>
      </div>
    </div>
  );
};
