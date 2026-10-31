import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  Globe,
  UserCheck,
  BookOpen,
  CheckCircle2,
  AlertOctagon,
  Search,
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';

interface CaseItem {
  id: string;
  title: string;
  url: string;
  author: string;
  date: string;
  excerpt: string;
  evidence: string;
  isCredible: boolean;
  score: number;
  protocol: 'https' | 'http';
  domainType: 'resmi' | 'bebas';
  reason: string;
}

export const CredibilityFactScanner: React.FC = () => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();

  const cases: CaseItem[] = [
    {
      id: 'case-1',
      title: 'Surat Edaran Resmi Kalender Pendidikan Semester Genap 2026',
      url: 'https://kemdikbud.go.id/pengumuman/kalender-akademik-2026',
      author: 'Biro Komunikasi dan Layanan Masyarakat Kemendikbudristek',
      date: '10 Januari 2026 (Terbaru)',
      excerpt: 'Jadwal penilaian sumatif akhir semester dan libur kenaikan kelas telah resmi diterbitkan untuk seluruh satuan pendidikan di Indonesia.',
      evidence: 'Dilengkapi nomor surat keputusan menteri resmi dan stempel digital terdaftar.',
      isCredible: true,
      score: 98,
      protocol: 'https',
      domainType: 'resmi',
      reason: 'Domain .go.id hanya dimiliki instansi pemerintah resmi Indonesia. Ada nama lembaga, tanggal baru, dan bukti SK menteri.'
    },
    {
      id: 'case-2',
      title: 'HEBOH! Makan Kulit Salak Rebus Bikin Siswa Langsung Juara Olimpiade Coding!',
      url: 'http://info-kroya-terheboh.blogspot.com/2026/01/kulit-salak-ajaib.html',
      author: 'Admin Rahasia (Anonim / Tanpa Identitas)',
      date: 'Tidak ada tanggal / masa lalu',
      excerpt: 'Penemuan menggemparkan dunia! Siapa saja yang meminum rebusan ini otaknya langsung berubah menjadi komputer super cerdas tanpa perlu belajar lagi.',
      evidence: 'Tidak ada dokter atau rujukan riset medis sama sekali. Banyak pop-up iklan obat peninggi badan.',
      isCredible: false,
      score: 12,
      protocol: 'http',
      domainType: 'bebas',
      reason: 'Judul clickbait heboh berlebihan, penulis anonim, tidak ada uji laboratorium BPOM, dan domain blog gratisan tanpa pengawasan resmi.'
    },
    {
      id: 'case-3',
      title: 'Jadwal Asesmen Sumatif & Peminjaman Laptop Lab Komputer SMPN 5 Kroya',
      url: 'https://smpn5kroya.sch.id/agenda/asesmen-lab-komputer',
      author: 'Bapak Rifani, S.Kom (Guru Informatika SMPN 5 Kroya)',
      date: '14 Februari 2026',
      excerpt: 'Siswa kelas 7 dan 8 dijadwalkan mengikuti praktikum simulasi interaktif di laboratorium komputer lantai 2 sesuai pembagian sesi kelas.',
      evidence: 'Dikelola resmi oleh tim pengajar sekolah dengan kontak telepon dan alamat fisik jelas di Kroya, Cilacap.',
      isCredible: true,
      score: 95,
      protocol: 'https',
      domainType: 'resmi',
      reason: 'Domain .sch.id berizin legal Kemdikbud. Penulis adalah guru bersangkutan, ada alamat sekolah nyata, dan informasi relevan langsung dengan kegiatan siswa.'
    },
    {
      id: 'case-4',
      title: 'Bagi-Bagi Kuota Internet Belajar 100GB Gratis! Sebarkan ke 15 Grup WhatsApp!',
      url: 'http://kuota-gratis-kemdikbud.xyz/klaim-sekarang',
      author: 'Tanpa Pengarang (Pesan Berantai WhatsApp)',
      date: 'Tanpa tanggal publikasi',
      excerpt: 'Pemerintah membagikan kuota 100GB gratis hari ini saja. Masukkan nomor HP dan sebarkan tautan ini ke 15 grup temanmu agar kode voucher keluar.',
      evidence: 'Trik phising untuk mencuri nomor HP dan nomor WhatsApp pengguna. Tidak pernah diumumkan di situs resmi Kemdikbud.',
      isCredible: false,
      score: 8,
      protocol: 'http',
      domainType: 'bebas',
      reason: 'Pesan ancaman berantai "sebarkan ke grup", domain mencurigakan .xyz, dan meminta data pribadi adalah tanda mutlak kejahatan penipuan siber.'
    }
  ];

  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [verdicts, setVerdicts] = useState<Record<number, boolean>>({});
  const [isScanning, setIsScanning] = useState(false);

  const currentCase = cases[activeCaseIdx];
  const answered = verdicts[activeCaseIdx] !== undefined;
  const isCorrect = verdicts[activeCaseIdx] === currentCase.isCredible;

  const handleSelectCase = (idx: number) => {
    playClick();
    setActiveCaseIdx(idx);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 300);
  };

  const handleGiveVerdict = (choiceCredible: boolean) => {
    playClick();
    setVerdicts((prev) => ({
      ...prev,
      [activeCaseIdx]: choiceCredible
    }));

    if (choiceCredible === currentCase.isCredible) {
      playFanfare();
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    } else {
      playError();
    }
  };

  const handleReset = () => {
    playClick();
    setVerdicts({});
    setActiveCaseIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-emerald-600 to-teal-800 text-white shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Laboratorium Forensik & Cek Kredibilitas Informasi Digital</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">
          Radar Detektif Kredibilitas & Pemindai Hoaks Digital
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          Uji kecakapan literasi digitalmu! Bedah alamat URL, cek sertifikat keamanan gembok SSL,
          periksa rekam jejak penulis, dan putuskan apakah artikel layak dijadikan sumber tugas atau harus dibuang.
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pilih Kasus yang Ingin Diselidiki:
          </span>
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Detektif</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {cases.map((c, idx) => {
            const isSelected = activeCaseIdx === idx;
            const hasAnswered = verdicts[idx] !== undefined;
            const answeredCorrect = verdicts[idx] === c.isCredible;

            return (
              <button
                key={c.id}
                onClick={() => handleSelectCase(idx)}
                className={`p-3 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 ring-2 ring-emerald-500/30 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-500">Kasus {idx + 1}</span>
                  {hasAnswered && (
                    <span>
                      {answeredCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertOctagon className="w-4 h-4 text-rose-600" />
                      )}
                    </span>
                  )}
                </div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                  {c.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Forensic Inspection Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Article Details & Address Bar */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-5">
          {/* Simulated Browser Address Bar */}
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-mono">
            {currentCase.protocol === 'https' ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-900 border">
                <Lock className="w-3.5 h-3.5" />
                <span>Aman (HTTPS)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-900 border">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Tidak Aman (HTTP)</span>
              </span>
            )}
            <span className="text-slate-800 dark:text-slate-200 truncate font-semibold">
              {currentCase.url}
            </span>
          </div>

          {/* Article Header & Body Excerpt */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {currentCase.title}
            </h3>

            <div className="flex flex-wrap gap-3 text-xs text-slate-500 border-y border-slate-100 dark:border-slate-800 py-2.5">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Penulis:</span> {currentCase.author}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Waktu:</span> {currentCase.date}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{currentCase.excerpt}"
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Hasil Pemeriksaan Bukti Pendukung:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {currentCase.evidence}
              </p>
            </div>
          </div>
        </div>

        {/* Credibility Radar & Verdict Panel */}
        <div className="lg:col-span-4 p-5 rounded-3xl border-2 border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Radar Skor Kredibilitas</span>
            </div>

            {/* Score Meter */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 shadow-sm text-center space-y-2">
              <span className="text-xs text-slate-500 block">Indeks Kepercayaan Sumber:</span>
              <div
                className={`text-3xl font-black font-mono ${
                  currentCase.score >= 80 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {currentCase.score}%
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    currentCase.score >= 80 ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${currentCase.score}%` }}
                />
              </div>
              <span
                className={`text-[11px] font-bold block pt-1 ${
                  currentCase.score >= 80 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {currentCase.score >= 80 ? 'Kategori: SANGAT KREDIBEL' : 'Kategori: MERAGUKAN / HOAKS'}
              </span>
            </div>

            {/* Verdict Action Buttons */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block text-center">
                Vonis Detektifmu untuk Kasus Ini:
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleGiveVerdict(true)}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all shadow-sm active:scale-95 ${
                    verdicts[activeCaseIdx] === true
                      ? currentCase.isCredible
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/30'
                        : 'bg-rose-600 text-white ring-4 ring-rose-400/30'
                      : 'border-2 border-emerald-500 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SUMBER KREDIBEL</span>
                </button>

                <button
                  onClick={() => handleGiveVerdict(false)}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all shadow-sm active:scale-95 ${
                    verdicts[activeCaseIdx] === false
                      ? !currentCase.isCredible
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/30'
                        : 'bg-rose-600 text-white ring-4 ring-rose-400/30'
                      : 'border-2 border-rose-500 bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 hover:bg-rose-50'
                  }`}
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>MERAGUKAN / HOAKS</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Explanation */}
          {answered && (
            <div
              className={`p-3.5 rounded-2xl border text-xs leading-relaxed animate-in fade-in ${
                isCorrect
                  ? 'bg-emerald-100/80 dark:bg-emerald-950/80 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-100/80 dark:bg-rose-950/80 border-rose-300 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="font-bold mb-1 flex items-center gap-1.5">
                {isCorrect ? (
                  <>
                    <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                    <span>Analisis Detektif Tepat!</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-700 dark:text-rose-300" />
                    <span>Analisis Kurang Tepat!</span>
                  </>
                )}
              </div>
              <p>{currentCase.reason}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
