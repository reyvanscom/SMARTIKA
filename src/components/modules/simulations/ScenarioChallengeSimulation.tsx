import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useUserRole } from '../../../context/UserRoleContext';
import { useCurriculumOverrides } from '../../../context/CurriculumOverridesContext';
import { Topic } from '../../../types/curriculum';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  School,
  Lightbulb,
  Key,
  Edit3,
} from 'lucide-react';
import { shuffleScenarioItem } from '../../../utils/questionRandomizer';
import { getTopicSimulationData } from '../../../data/simulationScenariosData';

interface ScenarioChallengeProps {
  topic: Topic;
}

export const ScenarioChallengeSimulation: React.FC<ScenarioChallengeProps> = ({ topic }) => {
  const { playClick, playError, playFanfare } = useTheme();
  const { isTeacher, showTeacherAnswerKeys, openEditorModal } = useUserRole();
  const { overrides } = useCurriculumOverrides();

  const topicSimData = getTopicSimulationData(topic.id, topic.title);
  const customScenarios = overrides[topic.id]?.customScenarioChallenges;
  const rawScenarios =
    customScenarios && customScenarios.length > 0
      ? customScenarios
      : topicSimData.scenarios;
  const scenarios = rawScenarios.map((s) => shuffleScenarioItem(s as any, topic.id));

  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const currentScenario = scenarios[selectedScenarioIdx] || scenarios[0];
  const selectedOptionIdx = userAnswers[selectedScenarioIdx];
  const correctOptIdx = currentScenario.options.findIndex((o) => o.isCorrect);
  const correctOpt = currentScenario.options[correctOptIdx];

  const handleSelectOption = (idx: number) => {
    playClick();
    setUserAnswers((prev) => ({
      ...prev,
      [selectedScenarioIdx]: idx,
    }));

    if (currentScenario.options[idx].isCorrect) {
      playFanfare();
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } else {
      playError();
    }
  };

  const handleReset = () => {
    playClick();
    setUserAnswers({});
    setSelectedScenarioIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Banner */}
      <div
        className={`p-5 sm:p-6 rounded-3xl text-white shadow-xl space-y-2 transition-all ${topicSimData.bannerColor}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${topicSimData.badgeTextColor}`}
          >
            <School className="w-4 h-4 shrink-0" />
            <span>{topicSimData.badgeText}</span>
          </div>
          {isTeacher && (
            <button
              type="button"
              onClick={() => openEditorModal('simulasi')}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-extrabold inline-flex items-center gap-1.5 border border-white/30 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Studi Kasus Simulasi
            </button>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-black">{topicSimData.title}</h2>
        <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
          {topicSimData.description}
        </p>
      </div>

      {/* Ringkasan Kunci Jawaban Studi Kasus untuk Guru */}
      {isTeacher && showTeacherAnswerKeys && (
        <div
          data-live-editor-ignore="true"
          className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 space-y-2"
        >
          <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-900 dark:text-emerald-200">
            <Key className="w-4 h-4 text-emerald-600" />
            <span>
              Kunci Jawaban Seharusnya — Studi Kasus #{selectedScenarioIdx + 1}: {currentScenario.title}
            </span>
          </div>
          {correctOpt && (
            <div className="text-xs text-emerald-950 dark:text-emerald-100 space-y-1">
              <p className="font-bold">
                ✓ Tindakan yang Seharusnya Dipilih (Opsi {String.fromCharCode(65 + correctOptIdx)}):{' '}
                <span className="underline">{correctOpt.text}</span>
              </p>
              <p className="text-emerald-800 dark:text-emerald-300">
                <strong>Alasan / Pembahasan:</strong> {correctOpt.reason}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Scenario Selector */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {scenarios.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                playClick();
                setSelectedScenarioIdx(idx);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedScenarioIdx === idx
                  ? 'bg-emerald-600 text-white shadow-md scale-102 ring-2 ring-emerald-400'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
              }`}
            >
              Kasus #{idx + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Kasus</span>
        </button>
      </div>

      {/* Active Scenario Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Studi Kasus Kontekstual #{selectedScenarioIdx + 1}</span>
            </div>

            {'category' in currentScenario && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {(currentScenario as any).category}
              </span>
            )}
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {currentScenario.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            {currentScenario.story}
          </p>
        </div>

        {/* Question & Choices */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
            {currentScenario.question}
          </h4>

          <div className="space-y-2.5">
            {currentScenario.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;
              const isTeacherKey = isTeacher && showTeacherAnswerKeys && opt.isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all active:scale-98 space-y-1.5 ${
                    isSelected
                      ? opt.isCorrect
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-100 ring-4 ring-emerald-500/20'
                        : 'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-100 ring-4 ring-rose-500/20'
                      : isTeacherKey
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-400/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-emerald-400 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 text-xs sm:text-sm font-bold">
                    <span>
                      {String.fromCharCode(65 + idx)}. {opt.text}
                    </span>
                    {isSelected ? (
                      <span className="shrink-0 font-bold">
                        {opt.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-rose-600" />
                        )}
                      </span>
                    ) : isTeacherKey ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase shrink-0">
                        ✓ Kunci Jawaban Benar
                      </span>
                    ) : null}
                  </div>

                  {(isSelected || isTeacherKey) && (
                    <div
                      className={`text-xs p-2.5 rounded-xl ${
                        opt.isCorrect
                          ? 'bg-emerald-100/80 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                          : 'bg-rose-100/80 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200'
                      }`}
                    >
                      {opt.reason}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
