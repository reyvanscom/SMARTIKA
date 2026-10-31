import React, { useState } from 'react';
import { Topic, StudentProgress } from '../../types/curriculum';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { TeacherModuleToolbar } from '../modals/LiveInlineEditorOverlay';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Key,
  Edit3,
} from 'lucide-react';

interface KuisViewProps {
  topic: Topic;
  progress: StudentProgress;
  onSaveQuizScore: (score: number) => void;
  onNext: () => void;
  onBackToDashboard: () => void;
}

export const KuisView: React.FC<KuisViewProps> = ({
  topic,
  progress,
  onSaveQuizScore,
  onNext,
  onBackToDashboard,
}) => {
  const { playClick, playSuccess } = useTheme();
  const { isTeacher, showTeacherAnswerKeys, openEditorModal } = useUserRole();
  const questions = topic.kuis;
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(progress.quizScore || 0);

  const currentQ = questions[currentIndex] || questions[0];
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (qId: number, label: string) => {
    if (isFinished) return;
    playClick();
    setUserAnswers((prev) => ({ ...prev, [qId]: label }));
  };

  const handleFinishQuiz = () => {
    if (answeredCount < totalQuestions) return;

    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    setScore(calculatedScore);
    setIsFinished(true);
    playSuccess();
    onSaveQuizScore(calculatedScore);
  };

  const handleRetry = () => {
    playClick();
    setUserAnswers({});
    setIsFinished(false);
    setCurrentIndex(0);
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      <TeacherModuleToolbar
        topicId={topic.id}
        moduleKey="kuis"
        moduleTitle="Modul 7: Kuis Interaktif HOTS"
        editorTab="kuis"
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
              onClick={() => openEditorModal('kuis')}
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold inline-flex items-center gap-1.5 border border-amber-300 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Soal & Kunci Kuis
            </button>
          )}
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Modul 7 dari 10 · Kuis Interaktif HOTS
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <CheckSquare className="w-4 h-4" />
          <span>Penguatan Pemahaman Soal Bernalar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Kuis Interaktif: {topic.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Selesaikan {totalQuestions} soal HOTS untuk menguji ketajaman analisismu sebelum masuk ke Asesmen Akhir.
        </p>
      </div>

      {/* Ringkasan Kunci Jawaban Guru untuk Seluruh Soal Kuis */}
      {isTeacher && showTeacherAnswerKeys && (
        <div
          data-live-editor-ignore="true"
          className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 rounded-2xl p-5 space-y-3 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-200 font-black text-xs uppercase tracking-wider">
              <Key className="w-4 h-4 text-emerald-600" />
              <span>
                Kunci Jawaban Seharusnya — Seluruh Soal Kuis HOTS ({totalQuestions} Nomor)
              </span>
            </div>
            {!isFinished && (
              <button
                type="button"
                onClick={() => {
                  const auto: Record<number, string> = {};
                  questions.forEach((q) => {
                    auto[q.id] = q.correctAnswer;
                  });
                  setUserAnswers(auto);
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold cursor-pointer"
              >
                Pilih Semua Jawaban Benar (Demo Guru)
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {questions.map((q, idx) => {
              const correctOpt = q.options.find((o) => o.label === q.correctAnswer);
              return (
                <div
                  key={q.id || idx}
                  onClick={() => !isFinished && setCurrentIndex(idx)}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1 cursor-pointer hover:border-emerald-400"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>Soal #{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                      Kunci: {q.correctAnswer}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-1">{q.question}</p>
                  <p className="text-emerald-700 dark:text-emerald-300 font-bold">
                    ✓ {q.correctAnswer}. {correctOpt?.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isFinished ? (
        /* Quiz Active Screen */
        <div className="space-y-6">
          {/* Progress & Question Numbers Strip */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">
                Soal {currentIndex + 1} dari {totalQuestions}
              </span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                Terjawab: {answeredCount} / {totalQuestions}
              </span>
            </div>

            {/* Quick jump tabs */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = userAnswers[q.id] !== undefined;

                return (
                  <button
                    key={q.id || idx}
                    onClick={() => {
                      playClick();
                      setCurrentIndex(idx);
                    }}
                    className={`py-1.5 rounded text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isAnswered
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-block text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-100 dark:border-blue-900">
                  Tingkat: {currentQ.competencyLevel}
                </div>
                {isTeacher && showTeacherAnswerKeys && (
                  <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1 rounded-lg border border-emerald-300">
                    <Key className="w-3.5 h-3.5 text-emerald-700" />
                    Jawaban Seharusnya: Opsi {currentQ.correctAnswer}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.label;
                const isCorrectKey =
                  isTeacher &&
                  showTeacherAnswerKeys &&
                  currentQ.correctAnswer === opt.label;

                return (
                  <div
                    key={opt.label}
                    onClick={() => handleSelectOption(currentQ.id, opt.label)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-slate-900 dark:text-white ring-1 ring-blue-500'
                        : isCorrectKey
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-400/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : isCorrectKey
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal pt-0.5">
                        {opt.text}
                      </span>
                      {isCorrectKey && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase shrink-0">
                          ✓ Kunci Benar
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {isTeacher && showTeacherAnswerKeys && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                <strong>Pembahasan Jawaban Benar ({currentQ.correctAnswer}):</strong>{' '}
                {currentQ.explanation}
              </div>
            )}

            {/* Navigation inside card */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  playClick();
                  setCurrentIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
              >
                &larr; Sebelumnya
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => {
                    playClick();
                    setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white"
                >
                  Berikutnya &rarr;
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  disabled={answeredCount < totalQuestions}
                  className="px-6 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm disabled:opacity-50"
                >
                  Kirim Jawaban Kuis
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Review & Results Screen */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">
                  Hasil Kuis Interaktif
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Skor: <span className="text-blue-600 font-mono">{score}</span> / 100
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {score >= 80
                    ? 'Luar biasa! Pemahaman konsep dan analisismu sangat tajam.'
                    : score >= 60
                    ? 'Bagus! Cermati pembahasan di bawah untuk memperbaiki konsep yang masih keliru.'
                    : 'Tetap semangat! Belajar adalah proses bertahap. Pelajari pembahasan di bawah ya!'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  onNext();
                }}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-md"
              >
                <span>Lanjut ke Asesmen Akhir</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Pembahasan Lengkap Soal Kuis ({totalQuestions} Nomor):
            </h3>

            <div className="space-y-4">
              {questions.map((q, qIdx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                const correctOpt = q.options.find((o) => o.label === q.correctAnswer);

                return (
                  <div
                    key={q.id || qIdx}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-xs text-slate-500 mt-0.5">
                          #{qIdx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {q.question}
                        </h4>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Kurang Tepat
                          </>
                        )}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="text-slate-600 dark:text-slate-300">
                        Jawaban Kamu: <strong>{userAns}</strong>
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-400 font-bold">
                        ✓ Jawaban Seharusnya: {q.correctAnswer}. {correctOpt?.text}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong className="text-slate-900 dark:text-white">Pembahasan: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
