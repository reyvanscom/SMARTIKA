import React, { useState, useEffect } from 'react';
import { Topic } from '../../../types/curriculum';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  Sliders,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Activity,
  Terminal,
  Layers,
  Gauge,
  Lightbulb,
  Check,
  AlertTriangle,
  HelpCircle,
  Zap
} from 'lucide-react';

interface Props {
  topic: Topic;
}

export const DynamicTopicExperimentLab: React.FC<Props> = ({ topic }) => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();
  const sim = topic.simulasi;

  // Experiment Parameters
  const [speed, setSpeed] = useState<number>(2); // 1 = lambat, 2 = normal, 3 = cepat
  const [securityLevel, setSecurityLevel] = useState<'standar' | 'tinggi' | 'maksimal'>('tinggi');
  const [dataLoad, setDataLoad] = useState<'ringan' | 'sedang' | 'berat'>('sedang');
  const [autoVerify, setAutoVerify] = useState<boolean>(true);

  // Simulation Execution State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState<number>(0); // 0=idle, 1=input, 2=processing, 3=output, 4=complete
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [experimentResult, setExperimentResult] = useState<{
    success: boolean;
    efficiency: number;
    message: string;
  } | null>(null);

  // Question reflection state
  const [selectedReflection, setSelectedReflection] = useState<string | null>(null);
  const [reflectionAnswered, setReflectionAnswered] = useState<boolean>(false);

  const resetExperiment = () => {
    playClick();
    setIsRunning(false);
    setCurrentStage(0);
    setProgressPercent(0);
    setLogs([]);
    setExperimentResult(null);
    setReflectionAnswered(false);
    setSelectedReflection(null);
  };

  const startExperiment = async () => {
    playClick();
    setIsRunning(true);
    setCurrentStage(1);
    setProgressPercent(10);
    setLogs([
      `[00:00.0] Inisialisasi Laboratorium: ${topic.title}`,
      `[00:00.2] Mengonfigurasi parameter: Kecepatan x${speed}, Keamanan ${securityLevel.toUpperCase()}, Beban ${dataLoad.toUpperCase()}`
    ]);
    setExperimentResult(null);

    const delay = speed === 1 ? 1400 : speed === 2 ? 800 : 400;

    // Stage 1 -> 2
    await new Promise((r) => setTimeout(r, delay));
    setCurrentStage(2);
    setProgressPercent(45);
    setLogs((prev) => [
      ...prev,
      `[00:01.0] Tahap Masukan (Input) terverifikasi. Membaca struktur data dan variabel...`,
      `[00:01.4] Menjalankan modul pemrosesan logika & komputasi...`
    ]);

    // Stage 2 -> 3
    await new Promise((r) => setTimeout(r, delay));
    setCurrentStage(3);
    setProgressPercent(80);
    setLogs((prev) => [
      ...prev,
      `[00:02.1] Menerapkan filter keamanan (${securityLevel.toUpperCase()})... [OK]`,
      `[00:02.6] Memvalidasi integritas hasil eksperimen dengan protokol pembelajaran...`
    ]);

    // Stage 3 -> 4 (Complete)
    await new Promise((r) => setTimeout(r, delay));
    setCurrentStage(4);
    setProgressPercent(100);
    setIsRunning(false);

    // Calculate outcomes
    const isOptimal = securityLevel !== 'standar' && autoVerify;
    const efficiency = isOptimal ? 96 : securityLevel === 'standar' ? 70 : 85;

    setLogs((prev) => [
      ...prev,
      `[00:03.2] Eksperimen selesai dengan efisiensi ${efficiency}%. Seluruh parameter terekam.`
    ]);

    setExperimentResult({
      success: true,
      efficiency,
      message: isOptimal
        ? `Sangat optimal! Konfigurasi keamanan tinggi dan verifikasi otomatis menghasilkan proses yang stabil dan bebas galat.`
        : `Eksperimen berjalan, namun tingkat keamanan standar rentan terhadap anomali data saat beban bertambah.`
    });

    playFanfare();
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      {/* Banner Utama */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-teal-600 via-emerald-600 to-cyan-700 text-white shadow-xl space-y-2 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Laboratorium Eksperimen Interaktif Khusus: {topic.title}</span>
          </div>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-xl font-bold">
            Simulasi Variabel & Alur Proses
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">
          {sim.title || `Laboratorium Simulasi Praktik: ${topic.title}`}
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          {sim.scenario ||
            'Eksperimenkan langsung bagaimana parameter dan aturan pada materi ini berinteraksi secara dinamis. Ubah variabel di bawah dan amati respon alur sistemnya!'}
        </p>
      </div>

      {/* Instruksi Praktik */}
      {sim.instructions && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 dark:text-white block font-bold mb-0.5">
              Langkah Kerja Eksperimen:
            </strong>
            <span>{sim.instructions}</span>
          </div>
        </div>
      )}

      {/* PANEL PENGATURAN PARAMETER EKSPERIMEN */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Kontrol Parameter Eksperimen
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Status: {isRunning ? 'Berjalan...' : 'Siap'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Parameter 1: Kecepatan Alur */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Kecepatan Pemrosesan</span>
              <span className="font-mono text-emerald-600 font-bold">{speed}x</span>
            </label>
            <div className="flex gap-1">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  type="button"
                  disabled={isRunning}
                  onClick={() => {
                    playClick();
                    setSpeed(val);
                  }}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    speed === val
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
                  }`}
                >
                  {val === 1 ? 'Lambat' : val === 2 ? 'Normal' : 'Cepat'}
                </button>
              ))}
            </div>
          </div>

          {/* Parameter 2: Tingkat Keamanan / Presisi */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Tingkat Validasi & Keamanan</span>
              <span className="text-[10px] uppercase font-bold text-emerald-600">{securityLevel}</span>
            </label>
            <div className="flex gap-1">
              {(['standar', 'tinggi', 'maksimal'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  disabled={isRunning}
                  onClick={() => {
                    playClick();
                    setSecurityLevel(lvl);
                  }}
                  className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold capitalize transition-all ${
                    securityLevel === lvl
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Parameter 3: Kompleksitas Beban */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Beban Uji Kasus</span>
              <span className="text-[10px] uppercase font-bold text-emerald-600">{dataLoad}</span>
            </label>
            <div className="flex gap-1">
              {(['ringan', 'sedang', 'berat'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  disabled={isRunning}
                  onClick={() => {
                    playClick();
                    setDataLoad(b);
                  }}
                  className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold capitalize transition-all ${
                    dataLoad === b
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button: Jalankan Eksperimen */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoVerify"
              checked={autoVerify}
              disabled={isRunning}
              onChange={(e) => setAutoVerify(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded-sm"
            />
            <label htmlFor="autoVerify" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              Verifikasi Otomatis Siklus Proses
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetExperiment}
              disabled={isRunning || currentStage === 0}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-30 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={startExperiment}
              disabled={isRunning}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isRunning ? 'Eksperimen Sedang Berjalan...' : 'Mulai Eksperimen Simulasi ▶️'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PIPELINE / ALUR PROSES VISUAL */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">
            Diagram Alur Siklus Eksperimen:
          </h3>
          <span className="text-xs font-mono font-bold text-emerald-600">{progressPercent}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-linear-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
          />
        </div>

        {/* Pipeline Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Node 1 */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all space-y-1.5 ${
              currentStage === 1
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 ring-2 ring-emerald-400'
                : currentStage > 1
                ? 'border-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/20'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                Tahap 1
              </span>
              {currentStage > 1 && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
              Persiapan Input & Variabel
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Menerima data awal dan inisialisasi skenario kasus materi.
            </p>
          </div>

          {/* Node 2 */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all space-y-1.5 ${
              currentStage === 2
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 ring-2 ring-emerald-400'
                : currentStage > 2
                ? 'border-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/20'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                Tahap 2
              </span>
              {currentStage > 2 && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
              Pemrosesan Logika & Filter
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Mengolah variabel sesuai kaidah informatika dengan filter keamanan.
            </p>
          </div>

          {/* Node 3 */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all space-y-1.5 ${
              currentStage === 3
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 ring-2 ring-emerald-400'
                : currentStage >= 4
                ? 'border-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/20'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                Tahap 3
              </span>
              {currentStage >= 4 && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
              Validasi & Hasil Akhir
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Menghasilkan keluaran optimal yang dapat dievaluasi siswa.
            </p>
          </div>
        </div>

        {/* Live Terminal Logs */}
        {logs.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-emerald-400 space-y-1">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-slate-400 text-[10px]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                <span>Diagnostic Execution Log</span>
              </span>
              <span>Realtime Output</span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1 pt-1">
              {logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hasil Eksperimen Card */}
        {experimentResult && (
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-slate-800 dark:text-slate-100 flex items-start gap-3 animate-in zoom-in-95">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-emerald-700 dark:text-emerald-400">
                  Efisiensi Sistem: {experimentResult.efficiency}%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                  Eksperimen Berhasil
                </span>
              </div>
              <p className="leading-relaxed font-medium">{experimentResult.message}</p>
            </div>
          </div>
        )}
      </div>

      {/* PERTANYAAN REFLEKSI EKSPERIMEN */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Refleksi Pemahaman Konsep:
          </span>
          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
            Menurutmu, mengapa pengaturan keamanan dan validasi harus diutamakan dibanding hanya mengejar kecepatan proses semata?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            {
              id: 'a',
              text: 'Agar data terhindar dari galat, manipulasi, dan kebocoran informasi',
              correct: true
            },
            {
              id: 'b',
              text: 'Hanya agar komputer terlihat lebih lambat dan rumit',
              correct: false
            },
            {
              id: 'c',
              text: 'Tidak ada pengaruhnya sama sekali pada hasil akhir',
              correct: false
            }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playClick();
                setSelectedReflection(item.id);
                setReflectionAnswered(true);
                if (item.correct) playSuccess();
                else playError();
              }}
              className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all ${
                selectedReflection === item.id
                  ? item.correct
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200'
                    : 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200'
                  : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 text-slate-700 dark:text-slate-300'
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>

        {reflectionAnswered && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
            💡 <strong>Tepat sekali!</strong> Dalam sistem teknologi informasi dan komputasi, keandalan, keutuhan data (integritas), dan keamanan adalah fondasi utama sebelum mempercepat kinerja.
          </div>
        )}
      </div>
    </div>
  );
};
