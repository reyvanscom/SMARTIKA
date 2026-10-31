import React, { useState, useEffect } from 'react';
import { Topic, StudentProgress } from '../../types/curriculum';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { useCurriculumOverrides } from '../../context/CurriculumOverridesContext';
import { TeacherModuleToolbar } from '../modals/LiveInlineEditorOverlay';
import {
  extractYouTubeId,
  fetchYouTubeOEmbedInfo,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
} from '../../utils/youtubeHelper';
import {
  Sparkles,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Target,
  Key,
  Edit3,
  Video,
  ExternalLink,
  Check,
} from 'lucide-react';

interface ApersepsiViewProps {
  topic: Topic;
  progress: StudentProgress;
  onSaveHypothesis: (text: string) => void;
  onNext: () => void;
  onBackToDashboard: () => void;
}

export const ApersepsiView: React.FC<ApersepsiViewProps> = ({
  topic,
  progress,
  onSaveHypothesis,
  onNext,
  onBackToDashboard,
}) => {
  const { playClick, playSuccess } = useTheme();
  const { isTeacher, showTeacherAnswerKeys, openEditorModal } = useUserRole();
  const { overrides, saveTopicOverride } = useCurriculumOverrides();

  const [hypothesis, setHypothesis] = useState(progress.apersepsiHypothesis || '');
  const [savedNotice, setSavedNotice] = useState(false);
  const [quickVideoInput, setQuickVideoInput] = useState(topic.apersepsi.defaultVideoUrl || '');
  const [quickVideoSaved, setQuickVideoSaved] = useState(false);
  const [quickVideoError, setQuickVideoError] = useState('');

  const ov = overrides[topic.id] || {};
  const customAnswerKey =
    ov.customTriggerAnswerKey ||
    `Jawaban yang seharusnya / diharapkan dari siswa: Siswa mampu mengaitkan fenomena pada cerita kontekstual di atas dengan konsep dasar "${topic.title}" (${topic.shortDesc}) secara kritis, sistematis, dan bertanggung jawab.`;

  const ytId = extractYouTubeId(topic.apersepsi.defaultVideoUrl);

  useEffect(() => {
    setQuickVideoInput(topic.apersepsi.defaultVideoUrl || '');
    setQuickVideoError('');
  }, [topic.apersepsi.defaultVideoUrl, topic.id]);

  const handleQuickSaveYoutube = async (rawUrl: string) => {
    const detectedId = extractYouTubeId(rawUrl);
    if (!detectedId) {
      setQuickVideoError('Tautan YouTube tidak valid. Pastikan memakai link youtube.com/watch?v=... atau youtu.be/...');
      return;
    }
    setQuickVideoError('');
    const cleanWatchUrl = getYouTubeWatchUrl(detectedId);
    setQuickVideoInput(cleanWatchUrl);
    saveTopicOverride(topic.id, {
      customVideoUrl: cleanWatchUrl,
    });
    playSuccess();
    setQuickVideoSaved(true);
    setTimeout(() => setQuickVideoSaved(false), 3500);

    const info = await fetchYouTubeOEmbedInfo(detectedId);
    if (info?.title) {
      saveTopicOverride(topic.id, {
        customVideoUrl: cleanWatchUrl,
        customVideoTitle: info.title,
        ...(info.authorName
          ? { customVideoDescription: `Video pembelajaran dari kanal YouTube ${info.authorName}` }
          : {}),
      });
    }
  };

  const handleSaveAndNext = () => {
    playSuccess();
    onSaveHypothesis(
      hypothesis.trim() || 'Telah menyimak apersepsi dan siap mempelajari materi.'
    );
    setSavedNotice(true);
    onNext();
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <TeacherModuleToolbar
        topicId={topic.id}
        moduleKey="apersepsi"
        moduleTitle="Modul 1: Apersepsi & Pengantar"
        editorTab="apersepsi"
      />

      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu Materi</span>
        </button>

        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
          Modul 1 dari 10 · Apersepsi & Pemantik
        </span>
      </div>

      {/* Header Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tahap 1: Apersepsi & Pengantar Topik</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {topic.title}
          </h1>
          <p className="text-indigo-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {topic.shortDesc}
          </p>
        </div>
      </div>

      {/* Tujuan Pembelajaran */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Tujuan Pembelajaran
              </h3>
              <p className="text-xs text-slate-500">
                Kompetensi yang akan dicapai pada materi ini
              </p>
            </div>
          </div>
          {isTeacher && (
            <button
              type="button"
              onClick={() => openEditorModal('apersepsi')}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Apersepsi
            </button>
          )}
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic.learningObjectives.map((obj, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Apersepsi */}
      <div
        data-live-editor-ignore="true"
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                {topic.apersepsi.videoTitle}
              </h3>
              <p className="text-xs text-slate-500">
                Durasi: {topic.apersepsi.videoDuration} • {topic.apersepsi.videoDescription}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {ytId && (
              <a
                href={getYouTubeWatchUrl(ytId)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Buka di YouTube
              </a>
            )}
            {isTeacher && (
              <button
                type="button"
                onClick={() => openEditorModal('video')}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Studio Video
              </button>
            )}
          </div>
        </div>

        {/* Input Cepat Ganti Link YouTube Khusus Mode Guru */}
        {isTeacher && (
          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/70 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-rose-800 dark:text-rose-200">
                Ganti Cepat Tautan Video YouTube Materi Ini (Otomatis Tersimpan ke Mode Siswa):
              </span>
              {quickVideoSaved && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold">
                  <Check className="w-3 h-3" /> Tersimpan &amp; Sinkron ke Mode Biasa!
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={quickVideoInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setQuickVideoInput(val);
                  if (extractYouTubeId(val)) {
                    handleQuickSaveYoutube(val);
                  }
                }}
                placeholder="Tempel link YouTube (https://www.youtube.com/watch?v=... atau https://youtu.be/...)"
                className="flex-1 px-3 py-2 rounded-xl border border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-800 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={() => handleQuickSaveYoutube(quickVideoInput)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shrink-0 cursor-pointer"
              >
                Simpan Link YouTube
              </button>
            </div>
            {quickVideoError && (
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400">{quickVideoError}</p>
            )}
          </div>
        )}

        {ytId ? (
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative shadow-md border border-slate-200 dark:border-slate-800">
            <iframe
              key={ytId}
              src={getYouTubeEmbedUrl(ytId)}
              title={topic.apersepsi.videoTitle}
              className="w-full h-full border-0"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-2">
            <p className="text-xs sm:text-sm font-bold text-amber-300">
              Video belum tersedia atau tautan YouTube belum sesuai format.
            </p>
            {isTeacher && (
              <p className="text-xs text-slate-300">
                Silakan tempelkan tautan YouTube yang valid pada kolom di atas.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Cerita Kontekstual */}
      <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>Kisah Nyata Sehari-hari</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
          {topic.apersepsi.realLifeStory}
        </p>
      </div>

      {/* Pertanyaan Pemantik & Kunci Jawaban Guru */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Pertanyaan Pemantik Diskusi Awal
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-white list-disc pl-4">
              {topic.apersepsi.triggerQuestions.map((tq, idx) => (
                <li key={idx}>{tq}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Kunci Jawaban Seharusnya untuk Guru */}
        {isTeacher && showTeacherAnswerKeys && (
          <div
            data-live-editor-ignore="true"
            className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 rounded-2xl p-4 space-y-2"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-emerald-900 dark:text-emerald-200">
                <Key className="w-4 h-4 text-emerald-600" />
                Kunci Jawaban / Arah Jawaban Seharusnya (Panduan Guru)
              </span>
              <button
                type="button"
                onClick={() => setHypothesis(customAnswerKey)}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold cursor-pointer"
              >
                Isi Contoh Jawaban Terbaik
              </button>
            </div>
            <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
              {customAnswerKey}
            </p>
          </div>
        )}

        <textarea
          rows={3}
          value={hypothesis}
          onChange={(e) => setHypothesis(e.target.value)}
          placeholder="Tuliskan pendapat awalmu atau jawaban hipotesismu di sini..."
          className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {savedNotice && (
          <p className="text-xs font-bold text-emerald-600">
            ✓ Pendapat awalmu telah disimpan!
          </p>
        )}

        <div className="flex items-center justify-end pt-2">
          <button
            type="button"
            onClick={handleSaveAndNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer"
          >
            <span>Simpan & Lanjut ke Asesmen Awal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
