import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Volume2, Music, Moon, Sun, Palette, Sparkles, Check, Share2, Copy } from 'lucide-react';
import { ThemeType } from '../types/curriculum';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    theme,
    setTheme,
    displayMode,
    setDisplayMode,
    soundState,
    setVolume,
    setSoundTheme,
    toggleSilent,
    toggleBgm,
    setBgmTrack,
    playClick
  } = useTheme();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const publicShareUrl =
    typeof window !== 'undefined'
      ? window.location.origin.replace('ais-dev-', 'ais-pre-')
      : 'https://ais-pre-eryyrkcx4qltdl5yx32zw6-489998690009.asia-east1.run.app';

  const handleCopyShareLink = () => {
    playClick();
    navigator.clipboard.writeText(publicShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const themes: { id: ThemeType; name: string; desc: string; color: string; badge: string }[] = [
    {
      id: 'tech-blue',
      name: 'Tech Blue',
      desc: 'Biru, putih, dan cyan dengan nuansa teknologi cerdas',
      color: 'bg-sky-500',
      badge: 'border-sky-500 text-sky-600'
    },
    {
      id: 'cyber-purple',
      name: 'Cyber Purple',
      desc: 'Ungu futuristik, biru neon, dan nuansa siber modern',
      color: 'bg-purple-600',
      badge: 'border-purple-500 text-purple-600'
    },
    {
      id: 'nature-green',
      name: 'Nature Green',
      desc: 'Hijau segar, putih, dan warna alami nyaman di mata',
      color: 'bg-emerald-600',
      badge: 'border-emerald-500 text-emerald-600'
    }
  ];

  const tracks = [
    { id: 0, title: 'Informatika Santai', desc: 'Melodi Lo-Fi tenang untuk belajar fokus' },
    { id: 1, title: 'Digital Quest', desc: 'Irama ritmis optimis dan ceria' },
    { id: 2, title: 'Cyber Focus', desc: 'Pad ambient lembut konsentrasi mendalam' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Pengaturan Tampilan & Audio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sesuaikan tema warna, mode gelap, dan musik pembelajaran
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* 1. Theme Selection */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              Pilihan Tema Warna
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    theme === t.id
                      ? 'border-slate-900 dark:border-white ring-2 ring-slate-900/10 dark:ring-white/20 bg-slate-50 dark:bg-slate-800/80 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-4 h-4 rounded-full ${t.color}`} />
                    {theme === t.id && (
                      <Check className="w-4 h-4 text-slate-900 dark:text-white" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {t.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Light / Dark Mode */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              Mode Pencahayaan Layar
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  playClick();
                  setDisplayMode('light');
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-medium transition-all ${
                  displayMode === 'light'
                    ? 'border-sky-500 bg-sky-50/70 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Mode Terang (Light)</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setDisplayMode('dark');
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-medium transition-all ${
                  displayMode === 'dark'
                    ? 'border-sky-400 bg-slate-800 text-sky-400 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Moon className="w-4 h-4 text-sky-400" />
                <span>Mode Gelap (Dark)</span>
              </button>
            </div>
          </div>

          {/* 3. Audio & Volume Controls */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pengaturan Suara & Audio
              </label>
              <button
                onClick={toggleSilent}
                className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                  soundState.isSilent
                    ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                {soundState.isSilent ? 'Silent Mode Aktif' : 'Silent Mode: Nonaktif'}
              </button>
            </div>

            {/* Volume slider */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Volume Efek Suara</span>
                </span>
                <span className="font-mono">{soundState.volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={soundState.isSilent ? 0 : soundState.volume}
                disabled={soundState.isSilent}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Pilihan Tema Suara */}
            <div className="space-y-2 mb-4">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Tema Nada Suara (Sound Theme):
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'retro-arcade', name: '🕹️ Retro 8-Bit', desc: 'Game jadul klasik' },
                  { id: 'cyber-scifi', name: '⚡ Cyber Sci-Fi', desc: 'Modern hi-tech' },
                  { id: 'cartoon-fun', name: '🎨 Ceria Kartun', desc: 'Marimba & riang' },
                  { id: 'soft-zen', name: '🍃 Lembut Akustik', desc: 'Tenang & ramah telinga' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setSoundTheme(th.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      soundState.soundTheme === th.id
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs">{th.name}</div>
                    <div className="text-[10px] opacity-75 font-normal">{th.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Background Music Lo-Fi Player */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-slate-900 dark:text-white">
                      Musik Latar Pembelajaran
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Synthesizer Web Audio (Ringan & Legal)
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleBgm}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    soundState.isBgmPlaying
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                      : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {soundState.isBgmPlaying ? 'Pause Musik' : 'Putar Musik'}
                </button>
              </div>

              {/* Track Chooser */}
              <div className="grid grid-cols-1 gap-1.5 mt-2">
                {tracks.map((trk) => (
                  <button
                    key={trk.id}
                    onClick={() => setBgmTrack(trk.id)}
                    className={`px-3 py-2 rounded-lg text-left text-xs transition-colors flex items-center justify-between ${
                      soundState.currentTrack === trk.id
                        ? 'bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 font-medium'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{trk.title}</div>
                      <div className="text-[11px] opacity-75">{trk.desc}</div>
                    </div>
                    {soundState.currentTrack === trk.id && (
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Bagikan Aplikasi ke Siswa / Orang Lain */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2.5">
              <Share2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Bagikan Aplikasi ke Siswa / Orang Lain</span>
            </label>
            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/70 space-y-2.5">
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                Gunakan tautan publik di bawah ini (atau klik tombol <strong>Share / Deploy</strong> di pojok kanan atas) agar siswa dan guru lain dapat mengakses aplikasi ini dari HP, laptop, maupun layar IFP kelas:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={publicShareUrl}
                  className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-200 select-all focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Tersalin!' : 'Salin Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-lg transition-colors"
          >
            Selesai & Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
