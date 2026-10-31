import React, { useState } from 'react';
import { Topic, StudentProgress } from '../../types/curriculum';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { useCurriculumOverrides } from '../../context/CurriculumOverridesContext';
import { TeacherModuleToolbar } from '../modals/LiveInlineEditorOverlay';
import {
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Edit3,
  Sparkles,
  Save,
  Smile,
  Meh,
  HelpCircle,
  Flame,
} from 'lucide-react';

interface RefleksiViewProps {
  topic: Topic;
  progress: StudentProgress;
  onSaveReflection: (reflection: {
    understood: string;
    mostInteresting: string;
    confusing: string;
    newLearned: string;
    actionPlan: string;
    feeling: string;
    savedAt: string;
  }) => void;
  onNext: () => void;
  onBackToDashboard: () => void;
}

export const RefleksiView: React.FC<RefleksiViewProps> = ({
  topic,
  progress,
  onSaveReflection,
  onNext,
  onBackToDashboard,
}) => {
  const { playClick, playSuccess } = useTheme();
  const { isTeacher, openEditorModal } = useUserRole();
  const { overrides } = useCurriculumOverrides();

  const customPrompts = overrides[topic.id]?.customRefleksiQuestions;
  const q1Label = customPrompts?.[0] || '1. Saya sudah memahami...';
  const q2Label = customPrompts?.[1] || '2. Hal yang paling menarik adalah...';
  const q3Label = customPrompts?.[2] || '3. Hal yang masih membingungkan adalah...';
  const q4Label = customPrompts?.[3] || '4. Hal baru yang saya pelajari hari ini adalah...';
  const q5Label = customPrompts?.[4] || '5. Rencana saya setelah belajar materi ini adalah...';

  const [feeling, setFeeling] = useState(progress.reflection?.feeling || 'Sangat Senang');
  const [understood, setUnderstood] = useState(
    progress.reflection?.understood ||
      'Saya sudah memahami konsep utama dan penerapannya dalam kehidupan nyata.'
  );
  const [mostInteresting, setMostInteresting] = useState(
    progress.reflection?.mostInteresting ||
      'Simulasi interaktif dan mini game edukasi sangat seru dimainkan.'
  );
  const [confusing, setConfusing] = useState(
    progress.reflection?.confusing ||
      'Beberapa istilah teknis masih memerlukan pembiasaan lebih sering.'
  );
  const [newLearned, setNewLearned] = useState(
    progress.reflection?.newLearned ||
      'Wawasan baru tentang pentingnya etika digital dan cara kerja sistem teknologi.'
  );
  const [actionPlan, setActionPlan] = useState(
    progress.reflection?.actionPlan ||
      'Menerapkan pengetahuan ini dalam tugas sekolah dan berbagi ilmu kepada teman sekelas.'
  );

  const [isSaved, setIsSaved] = useState(Boolean(progress.reflection));

  const feelings = [
    {
      label: 'Sangat Senang',
      icon: Flame,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50',
    },
    {
      label: 'Senang',
      icon: Smile,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      label: 'Biasa Saja',
      icon: Meh,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50',
    },
    {
      label: 'Masih Bingung',
      icon: HelpCircle,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50',
    },
    {
      label: 'Ingin Belajar Lanjut',
      icon: Sparkles,
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50',
    },
  ];

  const handleSave = () => {
    playSuccess();
    setIsSaved(true);
    const now = new Date();
    onSaveReflection({
      understood,
      mostInteresting,
      confusing,
      newLearned,
      actionPlan,
      feeling,
      savedAt: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      <TeacherModuleToolbar
        topicId={topic.id}
        moduleKey="refleksi"
        moduleTitle="Modul 9: Refleksi Pembelajaran"
        editorTab="refleksi-sertifikat"
      />

      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            playClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu Materi</span>
        </button>

        <div className="flex items-center gap-2">
          {isTeacher && (
            <button
              type="button"
              onClick={() => openEditorModal('refleksi-sertifikat')}
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold inline-flex items-center gap-1.5 border border-amber-300 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Pertanyaan Refleksi
            </button>
          )}
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
            Modul 9 dari 10 · Refleksi Pembelajaran
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4" />
          <span>Penilaian Diri & Rencana Perbaikan</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Refleksi Pembelajaran: {topic.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Refleksi tidak memiliki nilai benar atau salah. Luapkan perasaanmu dan rencanakan langkah belajarmu selanjutnya.
        </p>
      </div>

      {/* 1. Emoji / Perasaan Belajar Selector */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Bagaimana Perasaanmu Setelah Mengikuti Pembelajaran Hari Ini?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {feelings.map((f) => {
            const Icon = f.icon;
            const isSelected = feeling === f.label;

            return (
              <button
                key={f.label}
                onClick={() => {
                  playClick();
                  setFeeling(f.label);
                  setIsSaved(false);
                }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/50 ring-2 ring-teal-500/30 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div className={`p-2 rounded-xl ${f.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white text-center">
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Structured Reflection Questions Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Q1 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900 dark:text-white block">
            {q1Label}
          </label>
          <textarea
            rows={2}
            value={understood}
            onChange={(e) => {
              setUnderstood(e.target.value);
              setIsSaved(false);
            }}
            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Q2 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900 dark:text-white block">
            {q2Label}
          </label>
          <textarea
            rows={2}
            value={mostInteresting}
            onChange={(e) => {
              setMostInteresting(e.target.value);
              setIsSaved(false);
            }}
            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Q3 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900 dark:text-white block">
            {q3Label}
          </label>
          <textarea
            rows={2}
            value={confusing}
            onChange={(e) => {
              setConfusing(e.target.value);
              setIsSaved(false);
            }}
            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Q4 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900 dark:text-white block">
            {q4Label}
          </label>
          <textarea
            rows={2}
            value={newLearned}
            onChange={(e) => {
              setNewLearned(e.target.value);
              setIsSaved(false);
            }}
            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Q5 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900 dark:text-white block">
            {q5Label}
          </label>
          <textarea
            rows={2}
            value={actionPlan}
            onChange={(e) => {
              setActionPlan(e.target.value);
              setIsSaved(false);
            }}
            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            {isSaved && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Refleksi tersimpan rapi! Teruslah berani belajar dan mencoba hal baru.</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 self-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Refleksi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inspiring Teacher Note */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong>Pesan Guru Rif'ani:</strong> "Teruslah bertanya, berani mencoba, jangan takut salah, dan jadikan setiap kesalahan sebagai kesempatan untuk belajar menjadi lebih baik. Kamu hebat!"
      </div>

      {/* Footer Navigation: Lanjut ke Sertifikat */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={() => {
            playClick();
            onBackToDashboard();
          }}
          className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
        >
          Menu Materi
        </button>

        <button
          onClick={() => {
            playClick();
            onNext();
          }}
          className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <span>Buka Sertifikat Hasil Belajar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
