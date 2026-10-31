import React, { useState } from 'react';
import { Topic, StudentProgress } from '../../types/curriculum';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { TeacherModuleToolbar } from '../modals/LiveInlineEditorOverlay';
import {
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Compass,
  Key,
  Edit3,
} from 'lucide-react';

interface AsesmenAwalViewProps {
  topic: Topic;
  progress: StudentProgress;
  onSaveResult: (res: {
    score: number;
    answers: Record<number, string>;
    masteredConcepts: string[];
    reviewNeeded: string[];
  }) => void;
  onNext: () => void;
  onBackToDashboard: () => void;
}

export const AsesmenAwalView: React.FC<AsesmenAwalViewProps> = ({
  topic,
  progress,
  onSaveResult,
  onNext,
  onBackToDashboard,
}) => {
  const { playClick, playSuccess } = useTheme();
  const { isTeacher, showTeacherAnswerKeys, openEditorModal } = useUserRole();

  const questions = topic.asesmenAwal;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(
    progress.diagnosticResults?.answers || {}
  );
  const [isSubmitted, setIsSubmitted] = useState(Boolean(progress.diagnosticResults));
  const [calculatedScore, setCalculatedScore] = useState<number>(
    progress.diagnosticResults?.score ?? 0
  );

  const currentQuestion = questions[currentIdx] || questions[0];

  const handleSelectOption = (qId: number, label: string) => {
    if (isSubmitted) return;
    playClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: label,
    }));
  };

  const handleFinishDiagnostic = () => {
    playSuccess();
    let correct = 0;
    const masteredConcepts: string[] = [];
    const reviewNeeded: string[] = [];

    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
        masteredConcepts.push(q.conceptTag);
      } else {
        reviewNeeded.push(q.conceptTag);
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);
    setCalculatedScore(finalScore);
    setIsSubmitted(true);

    onSaveResult({
      score: finalScore,
      answers: selectedAnswers,
      masteredConcepts,
      reviewNeeded,
    });
  };

  const handleRetake = () => {
    playClick();
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <TeacherModuleToolbar
        topicId={topic.id}
        moduleKey="asesmen-awal"
        moduleTitle="Modul 2: Asesmen Awal (Diagnostik)"
        editorTab="asesmen-awal"
      />

      {/* Top Bar */}
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

        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
          Modul 2 dari 10 · Asesmen Awal Diagnostik
        </span>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Tahap 2: Pemetaan Kesiapan Belajar
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Asesmen Awal: {topic.title}
            </h1>
            <p className="text-xs text-slate-500">
              Jawab {questions.length} pertanyaan diagnostik untuk memetakan pemahaman awalmu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isTeacher && (
            <button
              type="button"
              onClick={() => openEditorModal('asesmen-awal')}
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold inline-flex items-center gap-1.5 border border-amber-300 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Soal & Kunci
            </button>
          )}
          {!isSubmitted && (
            <div className="bg-slate-100 dark:bg-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200">
              Soal {currentIdx + 1} / {questions.length}
            </div>
          )}
        </div>
      </div>

      {/* Ringkasan Kunci Jawaban Guru untuk Seluruh Soal Asesmen Awal */}
      {isTeacher && showTeacherAnswerKeys && (
        <div
          data-live-editor-ignore="true"
          className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 rounded-2xl p-5 space-y-3 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-200 font-black text-xs uppercase tracking-wider">
              <Key className="w-4 h-4 text-emerald-600" />
              <span>
                Kunci Jawaban Seharusnya — Seluruh Soal Asesmen Awal ({questions.length} Soal)
              </span>
            </div>
            {!isSubmitted && (
              <button
                type="button"
                onClick={() => {
                  const auto: Record<number, string> = {};
                  questions.forEach((q) => {
                    auto[q.id] = q.correctAnswer;
                  });
                  setSelectedAnswers(auto);
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold cursor-pointer"
              >
                Pilih Semua Jawaban Benar (Demo Guru)
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {questions.map((q, idx) => {
              const correctOpt = q.options.find((o) => o.label === q.correctAnswer);
              return (
                <div
                  key={q.id || idx}
                  onClick={() => !isSubmitted && setCurrentIdx(idx)}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1 cursor-pointer hover:border-emerald-400"
                >
                  <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-200">
                    <span>
                      Soal #{idx + 1} ({q.conceptTag})
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                      Kunci: {q.correctAnswer}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-1">
                    {q.question}
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300 font-bold">
                    ✓ Jawaban Seharusnya: {q.correctAnswer}. {correctOpt?.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isSubmitted ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Progress Dots */}
          <div className="flex items-center gap-2">
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIdx;
              return (
                <button
                  key={q.id || idx}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-2.5 flex-1 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-600 ring-4 ring-indigo-600/15'
                      : isAnswered
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800">
              <Compass className="w-3.5 h-3.5" />
              <span>Konsep: {currentQuestion.conceptTag}</span>
            </div>
            {isTeacher && showTeacherAnswerKeys && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1 rounded-lg border border-emerald-300">
                <Key className="w-3.5 h-3.5 text-emerald-700" />
                Jawaban Seharusnya: Opsi {currentQuestion.correctAnswer}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {currentIdx + 1}. {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedAnswers[currentQuestion.id] === opt.label;
              const isCorrectKey =
                isTeacher &&
                showTeacherAnswerKeys &&
                currentQuestion.correctAnswer === opt.label;

              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => handleSelectOption(currentQuestion.id, opt.label)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 ring-2 ring-indigo-600/20'
                      : isCorrectKey
                      ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-400/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : isCorrectKey
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </span>
                  <div className="flex-1 flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      {opt.text}
                    </span>
                    {isCorrectKey && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase shrink-0">
                        ✓ Kunci Benar
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {isTeacher && showTeacherAnswerKeys && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
              <strong>Fokus Penguatan Konsep:</strong> {currentQuestion.recommendation}
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              Sebelumnya
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => prev + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 cursor-pointer"
              >
                Soal Berikutnya
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishDiagnostic}
                disabled={!allAnswered}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40 shadow-md cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Lihat Hasil Pemetaan</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex flex-col items-center justify-center shrink-0 shadow-lg">
              <span className="text-[10px] uppercase font-bold text-indigo-200">
                Skor Awal
              </span>
              <span className="text-3xl font-extrabold">{calculatedScore}</span>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hasil Pemetaan Kesiapan Belajar</span>
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {calculatedScore >= 80
                  ? 'Kesiapan Tinggi! Kamu siap mengeksplorasi materi dan studi kasus mendalam.'
                  : 'Mari pelajari konsep dasar secara bertahap pada halaman Materi berikutnya.'}
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Rincian Konsep & Kunci Jawaban Seharusnya:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                const correctOpt = q.options.find((o) => o.label === q.correctAnswer);
                return (
                  <div
                    key={q.id || idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-white">
                        #{idx + 1} · {q.conceptTag}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isCorrect ? 'Sudah Tepat' : `Jawabanmu: ${userAns || '-'}`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {q.question}
                    </p>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      ✓ Jawaban Seharusnya: {q.correctAnswer}. {correctOpt?.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Asesmen Awal</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                onNext();
              }}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-md cursor-pointer"
            >
              <span>Lanjut ke Materi Utama</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
