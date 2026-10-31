import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  MessageSquare,
  Shield,
  ThumbsUp,
  AlertTriangle,
  Trash2,
  Flag,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Users,
  Heart,
  Smile,
  ShieldAlert,
  Send
} from 'lucide-react';

interface ForumPost {
  id: string;
  author: string;
  avatarColor: string;
  time: string;
  content: string;
  nature: 'positive' | 'toxic' | 'hoax' | 'spam';
  moderationStatus: 'pending' | 'pinned' | 'warned' | 'deleted' | 'reported';
  explanation: string;
}

export const VirtualPublicSpaceSimulation: React.FC = () => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();

  const INITIAL_POSTS: ForumPost[] = [
    {
      id: 'p1',
      author: 'Siti Rahma',
      avatarColor: 'bg-emerald-500',
      time: '10 menit lalu',
      content: 'Teman-teman, ini ringkasan rumus luas permukaan prisma yang diminta Bu Guru tadi, semoga bermanfaat ya!',
      nature: 'positive',
      moderationStatus: 'pending',
      explanation: 'Konten sangat positif, membantu teman kelas, dan menumbuhkan budaya kolaboratif.'
    },
    {
      id: 'p2',
      author: 'Anonim99',
      avatarColor: 'bg-rose-500',
      time: '7 menit lalu',
      content: 'Si Doni cupu banget main game tadi, gak guna di tim mending gak usah ikut sekolah!',
      nature: 'toxic',
      moderationStatus: 'pending',
      explanation: 'Ujaran kebencian & cyberbullying yang merendahkan teman di ruang publik kelas.'
    },
    {
      id: 'p3',
      author: 'Rian Pratama',
      avatarColor: 'bg-amber-500',
      time: '5 menit lalu',
      content: 'KLIK LINK INI! Ada pembagian pulsa 100 ribu gratis dari menteri pendidikan khusus hari ini: bit.ly/pulsa-gratis-2026',
      nature: 'hoax',
      moderationStatus: 'pending',
      explanation: 'Penyebaran tautan phishing/hoaks penipuan yang membahayakan akun siswa lain.'
    },
    {
      id: 'p4',
      author: 'Doni Saputra',
      avatarColor: 'bg-sky-500',
      time: '3 menit lalu',
      content: 'Permisi teman-teman, apakah ada yang punya rekaman audio listening bahasa Inggris unit 4? Kaset saya rusak.',
      nature: 'positive',
      moderationStatus: 'pending',
      explanation: 'Pertanyaan sopan dan relevan dengan kegiatan belajar mengajar di sekolah.'
    },
    {
      id: 'p5',
      author: 'Bot_Promo',
      avatarColor: 'bg-purple-500',
      time: '1 menit lalu',
      content: 'Jual follower Instagram murah terpercaya chat no WA 081234567890 promo hari ini saja!',
      nature: 'spam',
      moderationStatus: 'pending',
      explanation: 'Spam komersial yang mengganggu kenyamanan forum diskusi belajar.'
    }
  ];

  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);

  // Hitung Skor Iklim Sehat Ruang Publik
  const calculateClimateScore = () => {
    let score = 50; // base score
    posts.forEach((p) => {
      if (p.nature === 'positive') {
        if (p.moderationStatus === 'pinned') score += 15;
        else if (p.moderationStatus === 'deleted') score -= 20;
      } else if (p.nature === 'toxic') {
        if (p.moderationStatus === 'deleted' || p.moderationStatus === 'reported') score += 15;
        else if (p.moderationStatus === 'pending') score -= 10;
        else if (p.moderationStatus === 'pinned') score -= 25;
      } else if (p.nature === 'hoax' || p.nature === 'spam') {
        if (p.moderationStatus === 'deleted' || p.moderationStatus === 'reported') score += 10;
        else if (p.moderationStatus === 'pending') score -= 10;
      }
    });
    return Math.max(0, Math.min(100, score));
  };

  const climateScore = calculateClimateScore();

  const handleModerate = (id: string, action: 'pinned' | 'warned' | 'deleted' | 'reported') => {
    playClick();
    setPosts((prev) => {
      const updated = prev.map((post) => (post.id === id ? { ...post, moderationStatus: action } : post));
      const target = updated.find((p) => p.id === id);

      // Cek ketepatan aksi
      const isAppropriate =
        (target?.nature === 'positive' && action === 'pinned') ||
        (target?.nature === 'toxic' && (action === 'deleted' || action === 'reported')) ||
        (target?.nature === 'hoax' && (action === 'deleted' || action === 'reported')) ||
        (target?.nature === 'spam' && action === 'deleted');

      if (isAppropriate) {
        playSuccess();
      } else {
        playError();
      }

      // Cek apakah semua sudah dimoderasi dan skor 100
      const allDone = updated.every((p) => p.moderationStatus !== 'pending');
      if (allDone) {
        playFanfare();
        confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
      }

      return updated;
    });
  };

  const handleReset = () => {
    playClick();
    setPosts(INITIAL_POSTS);
  };

  return (
    <div className="space-y-6">
      {/* Banner Utama */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-violet-600 via-purple-600 to-indigo-700 text-white shadow-xl space-y-2 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
            <Users className="w-4 h-4 text-amber-300" />
            <span>Laboratorium Etika Ruang Publik Virtual</span>
          </div>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-xl font-bold">
            Simulasi Moderator Komunitas Digital
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">
          Community Netiquette & Forum Moderator Sandbox
        </h2>
        <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
          Kamu adalah <strong>Duta Netiket & Moderator Forum Kelas SMPN 5 Kroya</strong>! Kelola postingan masuk: apresiasi konten yang bermanfaat, hapus cyberbullying, dan tangkal hoaks agar ruang publik kelas kita sehat dan ramah!
        </p>
      </div>

      {/* INDIKATOR KESEHATAN IKLIM KOMUNITAS */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Indikator Kesehatan Iklim Ruang Publik:
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-4xl font-black font-mono ${
                  climateScore >= 80
                    ? 'text-emerald-500'
                    : climateScore >= 50
                    ? 'text-amber-500'
                    : 'text-rose-500'
                }`}
              >
                {climateScore}%
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {climateScore >= 80
                  ? '🌟 Sangat Sehat, Suportif, & Ramah untuk Semua Siswa'
                  : climateScore >= 50
                  ? '⚠️ Masih Ada Konten Mengganggu yang Belum Dimoderasi'
                  : '🚨 Toksik & Berbahaya! Butuh Tindakan Cepat Moderator'}
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Postingan</span>
          </button>
        </div>

        {/* Progress Bar Iklim Komunitas */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden p-0.5 border">
          <div
            style={{ width: `${climateScore}%` }}
            className={`h-full rounded-full transition-all duration-500 ${
              climateScore >= 80
                ? 'bg-emerald-500'
                : climateScore >= 50
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
          />
        </div>
      </div>

      {/* FEED FORUM POSTINGAN DISKUSI */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Postingan Masuk di Forum Kelas:</span>
          </h3>
          <span className="text-xs font-mono font-bold text-slate-500">
            {posts.filter((p) => p.moderationStatus !== 'pending').length} dari {posts.length} Telah Ditindak
          </span>
        </div>

        <div className="space-y-3.5">
          {posts.map((post) => {
            const isPending = post.moderationStatus === 'pending';

            return (
              <div
                key={post.id}
                className={`p-4 sm:p-5 rounded-3xl border-2 transition-all space-y-3 ${
                  post.moderationStatus === 'pinned'
                    ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : post.moderationStatus === 'deleted'
                    ? 'border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 opacity-75'
                    : post.moderationStatus === 'reported'
                    ? 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'
                }`}
              >
                {/* Header Postingan */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full ${post.avatarColor} text-white font-black text-xs flex items-center justify-center`}
                    >
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block">
                        {post.author}
                      </span>
                      <span className="text-[10px] text-slate-400">{post.time}</span>
                    </div>
                  </div>

                  {/* Status Moderasi Badge */}
                  <div>
                    {post.moderationStatus === 'pinned' && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-black">
                        🌟 Disematkan & Diberi Bintang
                      </span>
                    )}
                    {post.moderationStatus === 'deleted' && (
                      <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                        🚫 Konten Dihapus
                      </span>
                    )}
                    {post.moderationStatus === 'reported' && (
                      <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-xs font-black">
                        🛡️ Dilaporkan ke Guru Piket
                      </span>
                    )}
                    {isPending && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-[11px] font-bold animate-pulse">
                        Menunggu Tindakan Moderator
                      </span>
                    )}
                  </div>
                </div>

                {/* Konten Postingan */}
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed pl-10">
                  {post.content}
                </p>

                {/* Rationale jika sudah ditindak */}
                {!isPending && (
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[11px] text-slate-600 dark:text-slate-300 ml-10">
                    💡 <strong>Penjelasan Netiket:</strong> {post.explanation}
                  </div>
                )}

                {/* Toolbar Aksi Moderasi */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-end gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-auto">
                    Tindakan Moderator:
                  </span>

                  <button
                    onClick={() => handleModerate(post.id, 'pinned')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all active:scale-95 ${
                      post.moderationStatus === 'pinned'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Apresiasi (Pin)</span>
                  </button>

                  <button
                    onClick={() => handleModerate(post.id, 'deleted')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all active:scale-95 ${
                      post.moderationStatus === 'deleted'
                        ? 'bg-slate-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Konten</span>
                  </button>

                  <button
                    onClick={() => handleModerate(post.id, 'reported')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all active:scale-95 ${
                      post.moderationStatus === 'reported'
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-rose-700 dark:text-rose-400 hover:bg-rose-100'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Laporkan Pelanggaran</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
