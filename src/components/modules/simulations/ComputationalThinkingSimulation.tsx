import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  Brain,
  Split,
  Eye,
  Filter,
  ListOrdered,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
  Lightbulb,
  Check,
  X,
  Sliders,
  HelpCircle
} from 'lucide-react';

type CtPillar = 'dekomposisi' | 'pola' | 'abstraksi' | 'algoritma';

export const ComputationalThinkingSimulation: React.FC = () => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();

  // Tab 4 Pilar BK
  const [activePillar, setActivePillar] = useState<CtPillar>('dekomposisi');

  // =========================================================================
  // PILAR 1: DEKOMPOSISI (MEMECAH MASALAH BESAR JADI SUB-MODUL)
  // Masalah: Mengatur Antrean Kantin SMPN 5 Kroya yang Selalu Ricuh
  // =========================================================================
  const [selectedSubProblems, setSelectedSubProblems] = useState<string[]>([]);
  const [isDecompositionDone, setIsDecompositionDone] = useState(false);

  const DECOMPOSITION_OPTIONS = [
    {
      id: 'sub-order',
      title: 'Pemisahan Jalur Pesanan & Jalur Ambil Makanan',
      desc: 'Membuat dua loket terpisah agar siswa yang sudah bayar tidak menghalangi siswa yang baru datang.',
      isCorrect: true
    },
    {
      id: 'sub-menu',
      title: 'Papan Menu & Daftar Harga Besar di Luar',
      desc: 'Siswa sudah tahu harga dan memilih menu sejak masih di antrean, mempercepat transaksi kasir.',
      isCorrect: true
    },
    {
      id: 'sub-payment',
      title: 'Uang Pas atau Pembayaran Non-Tunai / Kupon Istirahat',
      desc: 'Menghilangkan waktu lama mencari uang kembalian receh saat jam istirahat yang sempit.',
      isCorrect: true
    },
    {
      id: 'sub-blame',
      title: 'Menyalahkan Siswa dan Menutup Kantin Sekolah',
      desc: 'Bukan solusi dekomposisi karena tidak menyelesaikan akar masalah logistik antrean.',
      isCorrect: false
    },
    {
      id: 'sub-unrelated',
      title: 'Mengecat Ulang Tembok Kantin dengan Warna Merah',
      desc: 'Faktor estetika yang sama sekali tidak berhubungan dengan kecepatan aliran antrean.',
      isCorrect: false
    }
  ];

  const toggleSubProblem = (id: string) => {
    playClick();
    setSelectedSubProblems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const checkDecomposition = () => {
    const correctIds = DECOMPOSITION_OPTIONS.filter((d) => d.isCorrect).map((d) => d.id);
    const chosenCorrect = selectedSubProblems.filter((id) => correctIds.includes(id));
    const chosenWrong = selectedSubProblems.filter((id) => !correctIds.includes(id));

    if (chosenCorrect.length === 3 && chosenWrong.length === 0) {
      playFanfare();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setIsDecompositionDone(true);
    } else {
      playError();
      setIsDecompositionDone(true);
    }
  };

  // =========================================================================
  // PILAR 2: PENGENALAN POLA (PATTERN RECOGNITION)
  // Menemukan pola lonjakan pengunjung lab komputer berdasarkan hari & jam
  // =========================================================================
  const [selectedPatternDay, setSelectedPatternDay] = useState<string | null>(null);
  const [patternAnswered, setPatternAnswered] = useState(false);

  const WEEK_DATA = [
    { day: 'Senin', count: 95, reason: 'Tugas rangkuman awal pekan serentak', peak: true },
    { day: 'Selasa', count: 42, reason: 'Jadwal pelajaran olahraga luar ruangan', peak: false },
    { day: 'Rabu', count: 38, reason: 'Praktek seni budaya di sanggar', peak: false },
    { day: 'Kamis', count: 88, reason: 'Pengumpulan berkas proyek informatika', peak: true },
    { day: 'Jumat', count: 30, reason: 'Waktu sekolah pendek sholat Jumat', peak: false }
  ];

  const handleSelectPattern = (day: string) => {
    playClick();
    setSelectedPatternDay(day);
    setPatternAnswered(true);
    if (day === 'Senin & Kamis') {
      playSuccess();
    } else {
      playError();
    }
  };

  // =========================================================================
  // PILAR 3: ABSTRAKSI (MEMILAH INFORMASI PENTING VS DIABAIKAN)
  // Kasus: Merancang Kartu Pelajar Digital untuk Presensi Otomatis
  // =========================================================================
  const [keptFields, setKeptFields] = useState<string[]>(['nisn', 'nama', 'kelas', 'qr']);

  const ALL_FIELDS = [
    { id: 'nisn', name: 'Nomor Induk Siswa Nasional (NISN)', vital: true },
    { id: 'nama', name: 'Nama Lengkap Siswa', vital: true },
    { id: 'kelas', name: 'Kelas & Rombel', vital: true },
    { id: 'qr', name: 'Kode QR Unik Presensi', vital: true },
    { id: 'warna_sepatu', name: 'Warna Sepatu Siswa', vital: false },
    { id: 'makanan_fav', name: 'Makanan Favorit di Kantin', vital: false },
    { id: 'zodiak', name: 'Zodiak & Shio', vital: false },
    { id: 'nama_kucing', name: 'Nama Hewan Peliharaan di Rumah', vital: false }
  ];

  const toggleField = (id: string) => {
    playClick();
    setKeptFields((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isAbstractionClean =
    keptFields.includes('nisn') &&
    keptFields.includes('nama') &&
    keptFields.includes('kelas') &&
    keptFields.includes('qr') &&
    !keptFields.includes('warna_sepatu') &&
    !keptFields.includes('makanan_fav') &&
    !keptFields.includes('zodiak') &&
    !keptFields.includes('nama_kucing');

  // =========================================================================
  // PILAR 4: ALGORITMA (MENYUSUN LANGKAH TERURUT & SIMULASI JALANKAN)
  // Kasus: Algoritma Robot Pengantar Buku Perpus ke Meja Siswa
  // =========================================================================
  const INITIAL_STEPS = [
    { id: 's3', text: '3. Scan barcode buku yang dipinjam', order: 3 },
    { id: 's1', text: '1. Nyalakan sensor navigasi robot', order: 1 },
    { id: 's4', text: '4. Berjalan menyusuri garis sensor menuju meja siswa', order: 4 },
    { id: 's2', text: '2. Ambil buku dari rak penyimpanan', order: 2 },
    { id: 's5', text: '5. Letakkan buku di meja dan bunyikan nada "Selesai"', order: 5 }
  ];

  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [isRunningAlgorithm, setIsRunningAlgorithm] = useState(false);
  const [currentStepRun, setCurrentStepRun] = useState<number | null>(null);
  const [algoLog, setAlgoLog] = useState<string[]>([]);
  const [algoSuccess, setAlgoSuccess] = useState<boolean | null>(null);

  const moveStep = (index: number, direction: 'up' | 'down') => {
    playClick();
    const newSteps = [...steps];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSteps.length) return;

    [newSteps[index], newSteps[targetIdx]] = [newSteps[targetIdx], newSteps[index]];
    setSteps(newSteps);
    setAlgoSuccess(null);
  };

  const runAlgorithm = async () => {
    playClick();
    setIsRunningAlgorithm(true);
    setAlgoLog([]);
    setAlgoSuccess(null);

    // Cek urutan
    const isSorted = steps.every((s, i) => s.order === i + 1);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepRun(i);
      setAlgoLog((prev) => [...prev, `▶️ Menjalankan: ${steps[i].text}`]);
      await new Promise((r) => setTimeout(r, 600));
    }

    setCurrentStepRun(null);
    setIsRunningAlgorithm(false);

    if (isSorted) {
      playFanfare();
      confetti({ particleCount: 70, spread: 60 });
      setAlgoSuccess(true);
      setAlgoLog((prev) => [...prev, '✅ Robot berhasil mengantar buku dengan urutan sempurna!']);
    } else {
      playError();
      setAlgoSuccess(false);
      setAlgoLog((prev) => [
        ...prev,
        '❌ Terjadi kesalahan logika! Robot tidak bisa mengantar sebelum buku diambil atau barcode discan.'
      ]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Laboratorium Berpikir Komputasional */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl space-y-2 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
            <Brain className="w-4 h-4 text-amber-300" />
            <span>Laboratorium Eksperimen 4 Pilar BK</span>
          </div>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-xl font-bold">
            Simulasi Interaktif Tanpa Koding Rumit
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">
          Workbench Berpikir Komputasional (Computational Thinking)
        </h2>
        <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
          Uji langsung kekuatan 4 pilar BK untuk memecahkan masalah sekolah: Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma!
        </p>
      </div>

      {/* Selector 4 Pilar BK */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => {
            playClick();
            setActivePillar('dekomposisi');
          }}
          className={`py-3 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
            activePillar === 'dekomposisi'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <Split className="w-4 h-4 shrink-0" />
          <span>1. Dekomposisi</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActivePillar('pola');
          }}
          className={`py-3 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
            activePillar === 'pola'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <Eye className="w-4 h-4 shrink-0" />
          <span>2. Pengenalan Pola</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActivePillar('abstraksi');
          }}
          className={`py-3 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
            activePillar === 'abstraksi'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <Filter className="w-4 h-4 shrink-0" />
          <span>3. Abstraksi</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActivePillar('algoritma');
          }}
          className={`py-3 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
            activePillar === 'algoritma'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <ListOrdered className="w-4 h-4 shrink-0" />
          <span>4. Algoritma</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. KONTEN DEKOMPOSISI                                                     */}
      {/* ========================================================================= */}
      {activePillar === 'dekomposisi' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5 animate-in fade-in">
          <div className="space-y-1">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Tantangan Dekomposisi Kasus Sekolah:
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Masalah Besar: Antrean Kantin SMPN 5 Kroya Sangat Ricuh & Siswa Kehabisan Waktu
            </h3>
            <p className="text-xs text-slate-500">
              Pilih 3 sub-masalah logis yang memecah masalah besar ini menjadi bagian-bagian yang bisa diselesaikan secara mandiri:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DECOMPOSITION_OPTIONS.map((item) => {
              const isSelected = selectedSubProblems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSubProblem(item.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 ring-2 ring-purple-400/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono font-bold text-slate-500">
              {selectedSubProblems.length} dari 3 Sub-Masalah Terpilih
            </span>
            <button
              onClick={checkDecomposition}
              disabled={selectedSubProblems.length === 0}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Uji Solusi Dekomposisi</span>
            </button>
          </div>

          {isDecompositionDone && (
            <div
              className={`p-4 rounded-2xl text-xs font-medium ${
                selectedSubProblems.length === 3 &&
                DECOMPOSITION_OPTIONS.filter((d) => d.isCorrect).every((d) =>
                  selectedSubProblems.includes(d.id)
                )
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-300 text-rose-800 dark:text-rose-200'
              }`}
            >
              {selectedSubProblems.length === 3 &&
              DECOMPOSITION_OPTIONS.filter((d) => d.isCorrect).every((d) =>
                selectedSubProblems.includes(d.id)
              ) ? (
                <span>
                  🎉 <strong>Dekomposisi Sempurna!</strong> Kamu berhasil membedah masalah antrean menjadi 3 bagian inti: pemisahan alur pesanan, kejelasan informasi harga di awal, dan efisiensi pembayaran!
                </span>
              ) : (
                <span>
                  ⚠️ <strong>Pilihan Belum Tepat.</strong> Pastikan kamu memilih tindakan logis yang langsung menyelesaikan hambatan antrean (hindari menyalahkan orang atau mengecat tembok yang tidak relevan).
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. KONTEN PENGENALAN POLA                                                 */}
      {/* ========================================================================= */}
      {activePillar === 'pola' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5 animate-in fade-in">
          <div className="space-y-1">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Tantangan Pengenalan Pola:
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Data Pengunjung Lab Komputer SMPN 5 Kroya Selama 1 Pekan
            </h3>
            <p className="text-xs text-slate-500">
              Amati data grafik batang pengunjung di bawah ini, temukan pola keteraturan lonjakan penggunaan komputer:
            </p>
          </div>

          {/* Bar Chart Sederhana */}
          <div className="grid grid-cols-5 gap-3 pt-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            {WEEK_DATA.map((item) => (
              <div key={item.day} className="flex flex-col items-center gap-2">
                <span className="text-xs font-black font-mono text-purple-600">{item.count}</span>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl h-36 flex items-end p-1.5">
                  <div
                    style={{ height: `${(item.count / 100) * 100}%` }}
                    className={`w-full rounded-lg transition-all duration-500 ${
                      item.peak ? 'bg-purple-600 shadow-md' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {item.day}
                </span>
                <p className="text-[10px] text-slate-400 text-center leading-tight">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>

          {/* Pertanyaan Pola */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Berdasarkan pola di atas, hari apa saja sekolah perlu menugaskan 2 guru piket lab tambahan?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {['Senin & Kamis', 'Selasa & Rabu', 'Jumat Saja'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectPattern(opt)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                    selectedPatternDay === opt
                      ? opt === 'Senin & Kamis'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200'
                        : 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200'
                      : 'border-slate-200 dark:border-slate-700 hover:border-purple-400'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {patternAnswered && (
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-xs text-purple-900 dark:text-purple-200">
                💡 <strong>Analisis Pola:</strong> Setiap Senin (95 siswa) dan Kamis (88 siswa) terjadi lonjakan puncak karena tenggat waktu tugas. Mengetahui pola ini memungkinkan sekolah mengantisipasi kebutuhan tanpa harus panik mendadak.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. KONTEN ABSTRAKSI                                                       */}
      {/* ========================================================================= */}
      {activePillar === 'abstraksi' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5 animate-in fade-in">
          <div className="space-y-1">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Tantangan Abstraksi (Menyaring Informasi Inti):
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Desain Kartu Pelajar Digital Presensi Masuk Sekolah
            </h3>
            <p className="text-xs text-slate-500">
              Aktifkan hanya informasi yang <strong>BENAR-BENAR DIBUTUHKAN</strong> mesin scanner presensi dan matikan informasi yang tidak relevan (detail pengganggu):
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ALL_FIELDS.map((field) => {
              const isKept = keptFields.includes(field.id);
              return (
                <div
                  key={field.id}
                  onClick={() => toggleField(field.id)}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    isKept
                      ? 'border-purple-600 bg-purple-50/60 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                  }`}
                >
                  <span className="text-xs font-bold">{field.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                      isKept ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600'
                    }`}
                  >
                    {isKept ? 'Ditampilkan' : 'Diabaikan'}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className={`p-4 rounded-2xl text-xs font-medium ${
              isAbstractionClean
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/60 border border-amber-300 text-amber-800 dark:text-amber-200'
            }`}
          >
            {isAbstractionClean ? (
              <span>
                🎉 <strong>Abstraksi Berhasil!</strong> Kamu hanya mempertahankan NISN, Nama, Kelas, dan QR Code. Data yang tidak penting seperti warna sepatu, zodiak, dan makanan favorit berhasil disingkirkan agar kartu fokus dan efisien.
              </span>
            ) : (
              <span>
                👉 <strong>Perhatian:</strong> Masih ada data tidak penting yang tersertakan atau data penting yang terhapus. Sesuaikan tombol di atas agar kartu presensi menjadi simpel dan akurat.
              </span>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. KONTEN ALGORITMA                                                       */}
      {/* ========================================================================= */}
      {activePillar === 'algoritma' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5 animate-in fade-in">
          <div className="space-y-1">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Tantangan Algoritma Runtut:
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Menyusun Instruksi Robot Pengantar Buku Perpustakaan
            </h3>
            <p className="text-xs text-slate-500">
              Gunakan tombol naik/turun (▲ / ▼) untuk menyusun langkah instruksi agar berurutan logis dari 1 hingga 5, lalu tekan "Jalankan Algoritma":
            </p>
          </div>

          <div className="space-y-2">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                  currentStepRun === idx
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 ring-2 ring-amber-400'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    {step.text}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0 || isRunningAlgorithm}
                    onClick={() => moveStep(idx, 'up')}
                    className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 disabled:opacity-30 text-xs font-bold"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === steps.length - 1 || isRunningAlgorithm}
                    onClick={() => moveStep(idx, 'down')}
                    className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 disabled:opacity-30 text-xs font-bold"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                playClick();
                setSteps(INITIAL_STEPS);
                setAlgoLog([]);
                setAlgoSuccess(null);
              }}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Acak Ulang Urutan</span>
            </button>

            <button
              onClick={runAlgorithm}
              disabled={isRunningAlgorithm}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isRunningAlgorithm ? 'Robot Sedang Bergerak...' : 'Jalankan Algoritma ▶️'}</span>
            </button>
          </div>

          {algoLog.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs space-y-1">
              <span className="text-slate-400 text-[10px] block border-b border-slate-800 pb-1">
                Terminal Eksekusi Instruksi Robot:
              </span>
              {algoLog.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
