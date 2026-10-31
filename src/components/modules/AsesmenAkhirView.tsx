import React, { useState } from 'react';
import { Topic, StudentProgress } from '../../types/curriculum';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { TeacherModuleToolbar } from '../modals/LiveInlineEditorOverlay';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileText,
  User,
  Key,
  Edit3,
} from 'lucide-react';

interface AsesmenAkhirViewProps {
  topic: Topic;
  progress: StudentProgress;
  defaultStudentName: string;
  onSaveAssessment: (result: {
    score: number;
    correctCount: number;
    incorrectCount: number;
    predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan';
    dateCompleted: string;
    studentName: string;
    answers: Record<number, string>;
  }) => void;
  onGoToCertificate: () => void;
  onBackToDashboard: () => void;
}

export const AsesmenAkhirView: React.FC<AsesmenAkhirViewProps> = ({
  topic,
  progress,
  defaultStudentName,
  onSaveAssessment,
  onGoToCertificate,
  onBackToDashboard,
}) => {
  const { playClick, playFanfare } = useTheme();
  const {
    studentProfile,
    updateStudentProfile,
    isTeacher,
    showTeacherAnswerKeys,
    openEditorModal,
  } = useUserRole();
  const questions = topic.asesmenAkhir;
  const totalQuestions = questions.length;

  const [studentName, setStudentName] = useState(
    progress.finalAssessment?.studentName || studentProfile.name || defaultStudentName || ''
  );
  const [studentClass, setStudentClass] = useState(studentProfile.className || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>(
    progress.finalAssessment?.answers || {}
  );
  const [isSubmitted, setIsSubmitted] = useState(Boolean(progress.finalAssessment));
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (qId: number, label: string) => {
    if (isSubmitted) return;
    playClick();
    setUserAnswers((prev) => ({ ...prev, [qId]: label }));
  };

  const handleSubmit = () => {
    if (answeredCount < totalQuestions) return;

    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const incorrectCount = totalQuestions - correctCount;
    const finalScore = Math.round((correctCount / Math.max(1, totalQuestions)) * 100);

    let predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan' = 'Perlu Bimbingan';
    if (finalScore >= 90) predicate = 'Sangat Baik';
    else if (finalScore >= 80) predicate = 'Baik';
    else if (finalScore >= 70) predicate = 'Cukup';

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    setIsSubmitted(true);
    playFanfare();

    if (finalScore >= 70) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    updateStudentProfile({
      name: studentName.trim() || 'Peserta Didik SMPN 5 Kroya',
      className: studentClass.trim() || `${topic.grade}`,
    });

    onSaveAssessment({
      score: finalScore,
      correctCount,
      incorrectCount,
      predicate,
      dateCompleted: dateFormatted,
      studentName: studentName.trim() || 'Peserta Didik SMPN 5 Kroya',
      answers: userAnswers,
    });
  };

  const handleConfirmReset = () => {
    playClick();
    setUserAnswers({});
    setIsSubmitted(false);
    setShowDiscussion(false);
    setShowConfirmReset(false);
    setCurrentIndex(0);
  };

  const finalData = progress.finalAssessment;

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      <TeacherModuleToolbar
        topicId={topic.id}
        moduleKey="asesmen-akhir"
        moduleTitle="Modul 8: Asesmen Akhir Sumatif"
        editorTab="asesmen-akhir"
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
              onClick={() => openEditorModal('asesmen-akhir')}
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold inline-flex items-center gap-1.5 border border-amber-300 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Soal & Kunci Asesmen Akhir
            </button>
          )}
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800">
            Modul 8 dari 10 · Asesmen Akhir Ketercapaian
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Penilaian Akhir Resmi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Asesmen Akhir: {topic.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Evaluasi ketercapaian tujuan pembelajaran. Setiap nomor bernilai 10 poin (Total 100 poin).
        </p>
      </div>

      {/* Ringkasan Kunci Jawaban Guru untuk Seluruh Soal Asesmen Akhir */}
      {isTeacher && showTeacherAnswerKeys && (
        <div
          data-live-editor-ignore="true"
          className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 rounded-2xl p-5 space-y-3 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-200 font-black text-xs uppercase tracking-wider">
              <Key className="w-4 h-4 text-emerald-600" />
              <span>
                Kunci Jawaban Seharusnya — Seluruh Soal Asesmen Akhir ({totalQuestions} Nomor)
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
                  onClick={() => !isSubmitted && setCurrentIndex(idx)}
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

      {/* Student Name & Class Input Banner */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-sky-500 shrink-0" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Nama Siswa:
            </span>
            {isSubmitted ? (
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {studentName}
              </span>
            ) : (
              <input
                type="text"
                maxLength={80}
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  updateStudentProfile({ name: e.target.value });
                }}
                placeholder="Nama lengkap siswa"
                className="px-3 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Kelas:
            </span>
            {isSubmitted ? (
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {studentClass}
              </span>
            ) : (
              <input
                type="text"
                maxLength={30}
                value={studentClass}
                onChange={(e) => {
                  setStudentClass(e.target.value);
                  updateStudentProfile({ className: e.target.value });
                }}
                placeholder="Kelas"
                className="w-28 px-3 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              />
            )}
          </div>
        </div>
        <span className="text-slate-500 dark:text-slate-400">
          SMP Negeri 5 Kroya
        </span>
      </div>

      {!isSubmitted ? (
        /* Examination Mode */
        <div className="space-y-6">
          {/* Progress Strip */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">
                Nomor Soal {currentIndex + 1} dari {totalQuestions}
              </span>
              <span className="font-bold text-rose-600 dark:text-rose-400">
                Terisi: {answeredCount} / {totalQuestions}
              </span>
            </div>

            {/* Jump Buttons */}
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
                        ? 'bg-rose-600 text-white shadow-xs'
                        : isAnswered
                        ? 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Bobot: 10 Poin
                </span>
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

            {/* Choices */}
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
                        ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-slate-900 dark:text-white ring-1 ring-rose-500'
                        : isCorrectKey
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-400/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'bg-rose-600 text-white shadow-xs'
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

            {/* Next / Previous and Submit */}
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
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-500 text-white"
                >
                  Berikutnya &rarr;
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={answeredCount < totalQuestions}
                  className="px-6 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md disabled:opacity-40"
                >
                  Kirim & Kunci Nilai Asesmen Akhir
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* OFFICIAL REPORT CARD */
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Laporan Hasil Belajar Mandiri
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {studentName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kelas {studentClass} · {topic.title} · SMP Negeri 5 Kroya
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Tanggal Asesmen:
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {finalData?.dateCompleted || 'Hari ini'}
                </span>
              </div>
            </div>

            {/* Score & Predicate Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 font-medium">Nilai Akhir</span>
                <div className="text-3xl font-black font-mono text-sky-600 dark:text-sky-400 mt-1">
                  {finalData?.score}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 font-medium">Predikat</span>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                  {finalData?.predicate}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 font-medium">Benar</span>
                <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
                  {finalData?.correctCount} / {totalQuestions}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 font-medium">Salah</span>
                <div className="text-2xl font-bold font-mono text-rose-600 mt-1">
                  {finalData?.incorrectCount} / {totalQuestions}
                </div>
              </div>
            </div>

            {/* Feedback & Recommendation Box */}
            <div className="p-5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Pesan Motivasi & Rekomendasi Belajar:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {finalData?.score && finalData.score >= 90
                  ? 'Istimewa! Kamu telah menguasai kompetensi materi ini dengan sangat mendalam. Pertahankan karakter pembelajar kritis dan bagikan ilmumu kepada teman sekelas.'
                  : finalData?.score && finalData.score >= 80
                  ? 'Bagus sekali! Pemahamanmu sudah sangat baik. Pelajari sedikit konsep yang masih keliru agar penguasaanmu semakin sempurna.'
                  : finalData?.score && finalData.score >= 70
                  ? 'Cukup baik! Kamu telah memenuhi kriteria tuntas minimal. Luangkan waktu untuk mengkaji kembali pembahasan soal dan materi utama.'
                  : 'Jangan berkecil hati. Jadikan hasil ini sebagai pemacu semangat belajar. Diskusikan konsep yang belum jelas dengan guru pengampu.'}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDiscussion(!showDiscussion)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  {showDiscussion ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan Lengkap'}
                </button>

                <button
                  onClick={() => setShowConfirmReset(true)}
                  className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-rose-600"
                >
                  Ulangi Asesmen
                </button>
              </div>

              <button
                onClick={() => {
                  playClick();
                  onGoToCertificate();
                }}
                className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4" />
                <span>Buat Sertifikat Hasil Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Discussion View */}
          {(showDiscussion || (isTeacher && showTeacherAnswerKeys)) && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Pembahasan Resmi Asesmen Akhir:
              </h3>
              <div className="space-y-3">
                {questions.map((q, idx) => {
                  const userChoice = userAnswers[q.id];
                  const isRight = userChoice === q.correctAnswer;
                  const correctOpt = q.options.find((o) => o.label === q.correctAnswer);
                  return (
                    <div
                      key={q.id || idx}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isRight
                          ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/20'
                          : 'border-rose-200 dark:border-rose-900 bg-rose-50/20 dark:bg-rose-950/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          #{idx + 1}. {q.question}
                        </span>
                        {isRight ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        Pilihanmu:{' '}
                        <strong className={isRight ? 'text-emerald-600' : 'text-rose-600'}>
                          {userChoice || '-'}
                        </strong>{' '}
                        | Kunci Benar:{' '}
                        <strong className="text-emerald-600">
                          {q.correctAnswer}. {correctOpt?.text}
                        </strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal to Retake Assessment */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Konfirmasi Ulangi Asesmen
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Apakah kamu yakin ingin mengulangi asesmen akhir? Jawaban dan nilai sebelumnya akan digantikan oleh percobaan barumu.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg"
              >
                Ya, Mulai Ulang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
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

        {isSubmitted && (
          <button
            onClick={() => {
              playClick();
              onGoToCertificate();
            }}
            className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md transition-all"
          >
            <span>Lanjut ke Sertifikat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
