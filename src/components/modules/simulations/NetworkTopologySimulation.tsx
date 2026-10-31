import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  Layers,
  Wifi,
  Monitor,
  Printer,
  Laptop,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Activity,
  Cable
} from 'lucide-react';

interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  type: 'pc' | 'laptop' | 'printer';
  connected: boolean;
}

export const NetworkTopologySimulation: React.FC = () => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();

  const [devices, setDevices] = useState<NetworkDevice[]>([
    { id: 'pc-1', name: 'PC Siswa 01', ip: '192.168.1.10', type: 'pc', connected: true },
    { id: 'pc-2', name: 'PC Siswa 02', ip: '192.168.1.11', type: 'pc', connected: true },
    { id: 'lap-1', name: 'Laptop Guru', ip: '192.168.1.15', type: 'laptop', connected: true },
    { id: 'pr-1', name: 'Printer Bersama Lab', ip: '192.168.1.20', type: 'printer', connected: true }
  ]);

  const [sourceId, setSourceId] = useState<string>('pc-1');
  const [targetId, setTargetId] = useState<string>('pr-1');
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingLogs, setPingLogs] = useState<string[]>([
    'Terminal PING ICMP siap.',
    'Pilih perangkat pengirim dan tujuan, lalu klik "Kirim Paket PING".'
  ]);
  const [pingStatus, setPingStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const toggleCable = (id: string) => {
    playClick();
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, connected: !d.connected } : d))
    );
  };

  const handleSendPing = () => {
    playClick();
    setIsPinging(true);
    setPingStatus('idle');

    const source = devices.find((d) => d.id === sourceId);
    const target = devices.find((d) => d.id === targetId);

    if (!source || !target) return;

    const sourceOk = source.connected;
    const targetOk = target.connected;

    setPingLogs([
      `PING ${target.ip} (${target.name}) dari ${source.ip} (${source.name}): 64 bytes data...`
    ]);

    setTimeout(() => {
      if (sourceOk && targetOk) {
        setPingLogs((prev) => [
          ...prev,
          `64 bytes from ${target.ip}: icmp_seq=1 ttl=64 time=1.8 ms (Paket Diterima Switch)`,
          `64 bytes from ${target.ip}: icmp_seq=2 ttl=64 time=2.1 ms (Paket Sampai ke ${target.name})`,
          `--- ${target.ip} ping statistics ---`,
          `2 packets transmitted, 2 received, 0% packet loss (KONEKSI LAN SUKSES 100%)`
        ]);
        setPingStatus('success');
        playFanfare();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } else {
        const errorReason = !sourceOk
          ? `Kabel pada ${source.name} terputus!`
          : `Kabel pada ${target.name} terputus!`;

        setPingLogs((prev) => [
          ...prev,
          `Request timed out. (TIDAK ADA RESPON)`,
          `Destination Host Unreachable.`,
          `--- ${target.ip} ping statistics ---`,
          `2 packets transmitted, 0 received, 100% packet loss. Penyebab: ${errorReason}`
        ]);
        setPingStatus('failed');
        playError();
      }
      setIsPinging(false);
    }, 1200);
  };

  const handleReset = () => {
    playClick();
    setDevices((prev) => prev.map((d) => ({ ...d, connected: true })));
    setPingLogs(['Terminal di-reset. Semua kabel perangkat telah dihubungkan kembali.']);
    setPingStatus('idle');
  };

  return (
    <div className="space-y-6">
      {/* Simulation Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-sky-600 to-indigo-700 text-white shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-200">
          <Layers className="w-4 h-4" />
          <span>Laboratorium Interaktif Jaringan & Topologi Komputer</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">
          Simulator Topologi Star & Uji Transmisi Paket PING LAN
        </h2>
        <p className="text-xs sm:text-sm text-sky-100 max-w-2xl leading-relaxed">
          Amati cara kerja topologi Star: semua perangkat komputer client terhubung ke Switch pusat.
          Coba putus salah satu kabel dan lihat apakah komputer lainnya tetap dapat saling berkomunikasi!
        </p>
      </div>

      {/* Network Visual Canvas */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500 animate-pulse" />
              <span>Diagram Topologi Bintang (Star Network Lab Komputer)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Ketuk tombol kabel untuk menghubungkan/memutuskan sambungan perangkat.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="self-start sm:self-auto px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sambungkan Semua Kabel</span>
          </button>
        </div>

        {/* Visual Topology Diagram */}
        <div className="relative py-8 bg-slate-50/80 dark:bg-slate-950/60 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[360px] overflow-hidden">
          {/* Center: Switch Hub Konsentrator */}
          <div className="z-10 p-5 rounded-3xl bg-linear-to-b from-slate-800 to-slate-950 text-white shadow-2xl border-2 border-sky-400 text-center space-y-1.5 max-w-[200px] ring-4 ring-sky-400/20">
            <div className="w-10 h-10 mx-auto rounded-2xl bg-sky-600 flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs font-black tracking-wide">SWITCH PUSAT LAB</div>
            <div className="text-[10px] font-mono text-sky-300">IP: 192.168.1.1</div>
            <div className="flex items-center justify-center gap-1 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[9px] text-emerald-400 font-bold uppercase">Konsentrator Aktif</span>
            </div>
          </div>

          {/* Surrounding Client Devices */}
          <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 px-4 z-10">
            {devices.map((d) => {
              const isSource = sourceId === d.id;
              const isTarget = targetId === d.id;

              return (
                <div
                  key={d.id}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 ${
                    !d.connected
                      ? 'border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 opacity-70'
                      : isSource
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/70 ring-4 ring-sky-500/20'
                      : isTarget
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 ring-4 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {d.type === 'pc' && <Monitor className="w-6 h-6 text-slate-700 dark:text-slate-200" />}
                    {d.type === 'laptop' && <Laptop className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
                    {d.type === 'printer' && <Printer className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate max-w-[120px]">
                      {d.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">{d.ip}</div>
                  </div>

                  {/* Cable Connection Toggle Button */}
                  <button
                    onClick={() => toggleCable(d.id)}
                    className={`w-full py-1 px-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
                      d.connected
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-rose-100 hover:text-rose-700'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 hover:bg-emerald-100 hover:text-emerald-700'
                    }`}
                  >
                    <Cable className="w-3 h-3" />
                    <span>{d.connected ? 'Kabel Terhubung' : 'Kabel Terputus'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ping Command Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Pengaturan Uji Transmisi PING (ICMP):
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-500 block mb-1 font-semibold">Pengirim (Source):</label>
                <select
                  value={sourceId}
                  onChange={(e) => setSourceId(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-semibold"
                >
                  {devices.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.ip})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-500 block mb-1 font-semibold">Tujuan (Destination):</label>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-semibold"
                >
                  {devices.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.ip})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSendPing}
              disabled={isPinging || sourceId === targetId}
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPinging ? 'Sedang Mengirim Paket...' : 'Kirim Paket PING Uji Koneksi'}</span>
            </button>
          </div>

          {/* Terminal Console Output */}
          <div className="md:col-span-6 p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] shadow-inner space-y-2 border border-slate-800">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-slate-400 text-[10px]">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                <span>Console PING Log (cmd.exe)</span>
              </span>
              <span className="text-slate-500">v2.4 LAN</span>
            </div>
            <div className="space-y-1 h-[110px] overflow-y-auto">
              {pingLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
