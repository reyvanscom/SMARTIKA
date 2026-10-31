import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SoundThemeType } from '../types/curriculum';
import {
  Volume2,
  VolumeX,
  Volume1,
  Music,
  Sparkles,
  Gamepad2,
  Zap,
  Smile,
  Feather,
  Check,
  X,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface SoundSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundSettingsModal: React.FC<SoundSettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    soundState,
    setVolume,
    setSoundTheme,
    toggleSilent,
    toggleBgm,
    setBgmTrack,
    playClick,
    playSuccess,
    playError,
    playFanfare
  } = useTheme();

  if (!isOpen) return null;

  const soundThemes: {
    id: SoundThemeType;
    name: string;
    tagline: string;
    desc: string;
    icon: React.ElementType;
    badgeColor: string;
    bgColor: string;
    borderColor: string;
  }[] = [
    {
      id: 'retro-arcade',
      name: 'Retro Game 8-Bit',
      tagline: 'Klasik Arcade 80-an',
      desc: 'Efek suara game jadul, lompatan koin arcade, dan blip 8-bit bernostalgia.',
      icon: Gamepad2,
      badgeColor: 'bg-amber-500 text-slate-950',
      bgColor: 'hover:bg-amber-50/60 dark:hover:bg-amber-950/30',
      borderColor: 'border-amber-500'
    },
    {
      id: 'cyber-scifi',
      name: 'Futuristik Cyber Sci-Fi',
      tagline: 'Modern & Hi-Tech',
      desc: 'Pulsa laser digital, frekuensi elektronik canggih, dan dentang teknologi modern.',
      icon: Zap,
      badgeColor: 'bg-cyan-500 text-slate-950',
      bgColor: 'hover:bg-cyan-50/60 dark:hover:bg-cyan-950/30',
      borderColor: 'border-cyan-500'
    },
    {
      id: 'cartoon-fun',
      name: 'Ceria Kartun Pop',
      tagline: 'Riang & Menyenangkan',
      desc: 'Ketukan marimba renyah, lentingan kartun lucu, dan nada ceria bersahabat.',
      icon: Smile,
      badgeColor: 'bg-purple-500 text-white',
      bgColor: 'hover:bg-purple-50/60 dark:hover:bg-purple-950/30',
      borderColor: 'border-purple-500'
    },
    {
      id: 'soft-zen',
      name: 'Lembut Akustik (Zen)',
      tagline: 'Tenang & Ramah Telinga',
      desc: 'Tetesan air lembut, dentang bel relaksasi, dan nada damai yang tidak bikin kaget.',
      icon: Feather,
      badgeColor: 'bg-emerald-500 text-white',
      bgColor: 'hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30',
      borderColor: 'border-emerald-500'
    }
  ];

  const tracks = [
    { id: 0, title: 'Informatika Santai', desc: 'Melodi santai nada Am7 - Cmaj7 untuk menemani belajar' },
    { id: 1, title: 'Digital Quest', desc: 'Irama progresif bersemangat untuk memecahkan misi soal' },
    { id: 2, title: 'Cyber Focus', desc: 'Gelombang ambient lembut penenang pikiran agar fokus nalar' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Menu Pengaturan Suara & Audio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pilih tema suara tombol dan atur volume sesuai kenyamananmu
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* 1. KONTROL VOLUME UTAMA */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                {soundState.isSilent || soundState.volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-500" />
                ) : soundState.volume < 40 ? (
                  <Volume1 className="w-4 h-4 text-sky-500" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-500" />
                )}
                <span>Volume Suara Aplikasi</span>
              </span>

              <button
                onClick={toggleSilent}
                className={`text-xs px-3 py-1 rounded-full font-bold border transition-all flex items-center gap-1.5 ${
                  soundState.isSilent
                    ? 'bg-rose-100 border-rose-300 text-rose-800 dark:bg-rose-950 dark:border-rose-800 dark:text-rose-300'
                    : 'bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300'
                }`}
              >
                {soundState.isSilent ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Mode Hening: AKTIF</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Suara Menyala</span>
                  </>
                )}
              </button>
            </div>

            {/* Slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                <span>0% (Mati)</span>
                <span className="text-sm font-black text-sky-600 dark:text-sky-400">
                  {soundState.isSilent ? '0% (Hening)' : `${soundState.volume}%`}
                </span>
                <span>100% (Maksimal)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={soundState.isSilent ? 0 : soundState.volume}
                disabled={soundState.isSilent}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-40"
              />
            </div>
          </div>

          {/* 2. PILIHAN TEMA SUARA */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Pilihan Tema Suara (Sound Theme)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Gaya efek nada saat kamu menekan tombol dan menyelesaikan tantangan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {soundThemes.map((th) => {
                const Icon = th.icon;
                const isSelected = soundState.soundTheme === th.id;
                return (
                  <div
                    key={th.id}
                    onClick={() => setSoundTheme(th.id)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer space-y-1.5 ${th.bgColor} ${
                      isSelected
                        ? `${th.borderColor} bg-white dark:bg-slate-800 shadow-md ring-2 ring-sky-500/20`
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isSelected ? th.badgeColor : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          {th.name}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      {th.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. COBA TES SUARA LANGSUNG */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block">
              Uji Coba Suara Tema Aktif:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={playClick}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors shadow-2xs"
              >
                🔊 Tes Klik
              </button>
              <button
                onClick={playSuccess}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors shadow-2xs"
              >
                ✨ Tes Sukses
              </button>
              <button
                onClick={playError}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors shadow-2xs"
              >
                🔔 Tes Peringatan
              </button>
              <button
                onClick={playFanfare}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors shadow-2xs"
              >
                🎉 Tes Fanfare
              </button>
            </div>
          </div>

          {/* 4. MUSIK LATAR BELAJAR (BGM) */}
          <div className="space-y-3 p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500 text-white">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    Musik Latar Belajar (BGM Lo-Fi)
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Musik santai pengiring konsentrasi
                  </p>
                </div>
              </div>

              <button
                onClick={toggleBgm}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                  soundState.isBgmPlaying
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-purple-200'
                }`}
              >
                {soundState.isBgmPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Jeda Musik</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Putar Musik</span>
                  </>
                )}
              </button>
            </div>

            {/* Track Selector */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              {tracks.map((trk) => (
                <button
                  key={trk.id}
                  onClick={() => setBgmTrack(trk.id)}
                  className={`p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between ${
                    soundState.currentTrack === trk.id
                      ? 'bg-white dark:bg-slate-900 border-2 border-purple-500 text-purple-900 dark:text-purple-200 font-bold shadow-xs'
                      : 'bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs">{trk.title}</div>
                    <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                      {trk.desc}
                    </div>
                  </div>
                  {soundState.currentTrack === trk.id && (
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-xl transition-all shadow-md active:scale-95"
          >
            Tutup & Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
};
