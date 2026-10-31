import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Video,
  Image as ImageIcon,
  FileText,
  Sparkles,
  CheckCircle2,
  Upload,
  Lock,
  Gamepad2,
  KeyRound,
  HelpCircle,
  ClipboardCheck,
  Award,
  Cpu,
  Users,
  Download,
  FileSpreadsheet,
} from 'lucide-react';
import {
  Topic,
  DiagnosticQuestion,
  KeyConcept,
  FormativeQuizItem,
  QuizQuestion,
  FinalAssessmentQuestion,
} from '../../types/curriculum';
import { ALL_TOPICS } from '../../data/allTopics';
import { getTopicGamePack, BattleBotQuestion, WordScrambleQuestion, VisualSimulationCard } from '../../data/interactiveGamesData';
import { getTopicPblScenario, PblScenario } from '../../data/pblScenariosData';
import { getTopicSimulationData } from '../../data/simulationScenariosData';
import { useUserRole, EditorTabType } from '../../context/UserRoleContext';
import {
  useCurriculumOverrides,
  CustomSimScenarioItem,
  TopicContentOverride,
} from '../../context/CurriculumOverridesContext';
import {
  extractYouTubeId,
  fetchYouTubeOEmbedInfo,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
} from '../../utils/youtubeHelper';

interface TeacherContentEditorModalProps {
  topic: Topic;
  isOpen: boolean;
  onClose: () => void;
  onOpenQuestionBankExcel?: () => void;
}

export const TeacherContentEditorModal: React.FC<TeacherContentEditorModalProps> = ({
  topic,
  isOpen,
  onClose,
  onOpenQuestionBankExcel,
}) => {
  const {
    editorActiveTab,
    setEditorActiveTab,
    updateTeacherPin,
  } = useUserRole();

  const {
    overrides,
    saveTopicOverride,
    resetTopicOverride,
    getEffectiveTopic,
    getEffectiveGamePack,
    getEffectivePblScenario,
    importOverridesJson,
  } = useCurriculumOverrides();

  const [selectedTopicId, setSelectedTopicId] = useState<string>(topic.id);
  const [savedBanner, setSavedBanner] = useState(false);
  const [videoQuickSaved, setVideoQuickSaved] = useState(false);

  // 1. Apersepsi & Umum
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [learningObjectives, setLearningObjectives] = useState<string[]>([]);
  const [customRealLifeStory, setCustomRealLifeStory] = useState('');
  const [customTriggerQuestions, setCustomTriggerQuestions] = useState<string[]>([]);
  const [customTriggerAnswerKey, setCustomTriggerAnswerKey] = useState('');
  const [customApersepsiImageUrl, setCustomApersepsiImageUrl] = useState('');

  // 2. Asesmen Awal (5 Soal Diagnostik)
  const [customAsesmenAwal, setCustomAsesmenAwal] = useState<DiagnosticQuestion[]>([]);

  // 3. Materi & Kuis Formatif
  const [overview, setOverview] = useState('');
  const [tahukahKamu, setTahukahKamu] = useState('');
  const [faktaMenarik, setFaktaMenarik] = useState('');
  const [infoPenting, setInfoPenting] = useState('');
  const [customKeyConcepts, setCustomKeyConcepts] = useState<KeyConcept[]>([]);
  const [customSummary, setCustomSummary] = useState<string[]>([]);
  const [customFormativeCheck, setCustomFormativeCheck] = useState<FormativeQuizItem[]>([]);

  // 4. Video Pembelajaran
  const [customVideoTitle, setCustomVideoTitle] = useState('');
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [customVideoDuration, setCustomVideoDuration] = useState('');
  const [customVideoDescription, setCustomVideoDescription] = useState('');

  // 5. Gambar Tiap Modul (Apersepsi s/d Sertifikat)
  const [customMateriImageUrl, setCustomMateriImageUrl] = useState('');
  const [customInfographicUrl, setCustomInfographicUrl] = useState('');
  const [customSimulasiImageUrl, setCustomSimulasiImageUrl] = useState('');
  const [customPblImageUrl, setCustomPblImageUrl] = useState('');
  const [moduleBannerImages, setModuleBannerImages] = useState<Record<string, string>>({});

  // 6. Simulasi & Studi Kasus Kontekstual
  const [simulationTitle, setSimulationTitle] = useState('');
  const [simulationScenario, setSimulationScenario] = useState('');
  const [simulationInstructions, setSimulationInstructions] = useState('');
  const [customVisualCards, setCustomVisualCards] = useState<VisualSimulationCard[]>([]);
  const [customSimulationCategories, setCustomSimulationCategories] = useState<string[]>([]);
  const [customScenarioChallenges, setCustomScenarioChallenges] = useState<CustomSimScenarioItem[]>([]);

  // 7. Studi Kasus PBL & Kunci Jawaban Ideal
  const [pblState, setPblState] = useState<PblScenario | null>(null);
  const [customPblIdealProblem, setCustomPblIdealProblem] = useState('');
  const [customPblIdealSolution, setCustomPblIdealSolution] = useState('');

  // 8. Mini Game (Robot Tinju/Balap Motor, Tebak Kata, Tebak Gambar)
  const [customBattleBotQuestions, setCustomBattleBotQuestions] = useState<BattleBotQuestion[]>([]);
  const [customWordScramble, setCustomWordScramble] = useState<WordScrambleQuestion[]>([]);
  const [pictureGuessList, setPictureGuessList] = useState<any[]>([]);

  // 9. Kuis Interaktif HOTS (10 Soal)
  const [customKuis, setCustomKuis] = useState<QuizQuestion[]>([]);

  // 10. Asesmen Akhir (10 Soal)
  const [customAsesmenAkhir, setCustomAsesmenAkhir] = useState<FinalAssessmentQuestion[]>([]);

  // 11. Refleksi & Sertifikat
  const [customRefleksiQuestions, setCustomRefleksiQuestions] = useState<string[]>([]);
  const [customCertSchoolName, setCustomCertSchoolName] = useState('');
  const [customCertLocation, setCustomCertLocation] = useState('');
  const [customCertTitle, setCustomCertTitle] = useState('');
  const [customCertTeacherName, setCustomCertTeacherName] = useState('');
  const [customCertTeacherNip, setCustomCertTeacherNip] = useState('');

  // 12. Keamanan PIN
  const [oldPinInput, setOldPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [pinFeedback, setPinFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const loadTopicFormState = (targetTopicId: string) => {
    const targetBaseTopic =
      ALL_TOPICS.find((t) => t.id === targetTopicId) || topic || ALL_TOPICS[0];
    const effective = getEffectiveTopic(targetBaseTopic);
    const ov = overrides[targetTopicId] || {};

    const rawGamePack = getTopicGamePack(targetBaseTopic.id, targetBaseTopic.title, targetBaseTopic.grade);
    const effectiveGamePack = getEffectiveGamePack(targetTopicId, rawGamePack);

    const rawPbl = getTopicPblScenario(
      targetBaseTopic.id,
      targetBaseTopic.title,
      targetBaseTopic.grade,
      targetBaseTopic.category
    );
    const effectivePbl = getEffectivePblScenario(targetTopicId, rawPbl);

    const rawSimScenarios = getTopicSimulationData(targetBaseTopic.id, targetBaseTopic.title);

    // 1. Apersepsi
    setTitle(effective.title);
    setShortDesc(effective.shortDesc);
    setLearningObjectives([...effective.learningObjectives]);
    setCustomRealLifeStory(effective.apersepsi.realLifeStory);
    setCustomTriggerQuestions([...effective.apersepsi.triggerQuestions]);
    setCustomTriggerAnswerKey(
      ov.customTriggerAnswerKey ||
        `Siswa diharapkan mampu menjelaskan kaitan situasi cerita di atas dengan konsep inti ${effective.title} secara logis, kritis, dan bertanggung jawab.`
    );
    setCustomApersepsiImageUrl(ov.customApersepsiImageUrl || effective.apersepsi.videoThumbnail || '');

    // 2. Asesmen Awal
    setCustomAsesmenAwal(
      effective.asesmenAwal.map((q) => ({
        ...q,
        options: q.options.map((o) => ({ ...o })),
      }))
    );

    // 3. Materi & Kuis Formatif
    setOverview(effective.materi.overview);
    setTahukahKamu(effective.materi.tahukahKamu);
    setFaktaMenarik(effective.materi.faktaMenarik);
    setInfoPenting(effective.materi.infoPenting);
    setCustomKeyConcepts(
      effective.materi.keyConcepts.map((kc) => ({
        ...kc,
        bulletPoints: [...kc.bulletPoints],
      }))
    );
    setCustomSummary([...effective.materi.summary]);
    setCustomFormativeCheck(
      effective.materi.formativeCheck.map((fc) => ({
        ...fc,
        options: [...fc.options],
      }))
    );

    // 4. Video
    setCustomVideoTitle(effective.apersepsi.videoTitle);
    setCustomVideoUrl(effective.apersepsi.defaultVideoUrl);
    setCustomVideoDuration(effective.apersepsi.videoDuration);
    setCustomVideoDescription(effective.apersepsi.videoDescription);

    // 5. Gambar
    setCustomMateriImageUrl(ov.customMateriImageUrl || '');
    setCustomInfographicUrl(ov.customInfographicUrl || '');
    setCustomSimulasiImageUrl(ov.customSimulasiImageUrl || '');
    setCustomPblImageUrl(ov.customPblImageUrl || '');
    setModuleBannerImages(ov.moduleBannerImages ? { ...ov.moduleBannerImages } : {});

    // 6. Simulasi
    setSimulationTitle(effective.simulasi.title);
    setSimulationScenario(effective.simulasi.scenario);
    setSimulationInstructions(effective.simulasi.instructions);
    setCustomVisualCards(effectiveGamePack.visualSimulationCards.map((c) => ({ ...c })));
    setCustomSimulationCategories([...effectiveGamePack.simulationCategories]);
    setCustomScenarioChallenges(
      ov.customScenarioChallenges && ov.customScenarioChallenges.length > 0
        ? ov.customScenarioChallenges.map((s) => ({
            ...s,
            options: s.options.map((o) => ({ ...o })),
          }))
        : rawSimScenarios.scenarios.map((s) => ({
            id: String(s.id),
            title: s.title,
            category: (s as any).category || effective.title,
            story: s.story,
            question: s.question,
            options: s.options.map((o) => ({ ...o })),
          }))
    );

    // 7. PBL
    setPblState({
      ...effectivePbl,
      whatWeKnow: [...effectivePbl.whatWeKnow],
      whatWeNeedToLearn: [...effectivePbl.whatWeNeedToLearn],
      clues: effectivePbl.clues.map((c) => ({ ...c })),
      potentialCauses: effectivePbl.potentialCauses.map((pc) => ({ ...pc })),
      recommendedActions: effectivePbl.recommendedActions.map((ra) => ({ ...ra })),
    });
    setCustomPblIdealProblem(effectivePbl.idealProblemAnswer);
    setCustomPblIdealSolution(effectivePbl.idealSolutionAnswer);

    // 8. Mini Game
    setCustomBattleBotQuestions(
      effectiveGamePack.battleBot.map((b) => ({
        ...b,
        options: b.options.map((o) => ({ ...o })),
      }))
    );
    setCustomWordScramble(effectiveGamePack.wordScramble.map((w) => ({ ...w })));
    setPictureGuessList(
      effectiveGamePack.pictureGuess.map((pg: any) => ({
        ...pg,
        options: [...pg.options],
      }))
    );

    // 9. Kuis HOTS
    setCustomKuis(
      effective.kuis.map((q) => ({
        ...q,
        options: q.options.map((o) => ({ ...o })),
      }))
    );

    // 10. Asesmen Akhir
    setCustomAsesmenAkhir(
      effective.asesmenAkhir.map((q) => ({
        ...q,
        options: q.options.map((o) => ({ ...o })),
      }))
    );

    // 11. Refleksi & Sertifikat
    setCustomRefleksiQuestions(
      ov.customRefleksiQuestions && ov.customRefleksiQuestions.length > 0
        ? [...ov.customRefleksiQuestions]
        : [
            '1. Saya sudah memahami...',
            '2. Hal yang paling menarik adalah...',
            '3. Hal yang masih membingungkan adalah...',
            '4. Hal baru yang saya pelajari hari ini adalah...',
            '5. Rencana saya setelah belajar materi ini adalah...',
          ]
    );
    setCustomCertSchoolName(ov.customCertSchoolName || 'SMP NEGERI 5 KROYA');
    setCustomCertLocation(ov.customCertLocation || 'Kecamatan Kroya · Kabupaten Cilacap · Jawa Tengah');
    setCustomCertTitle(ov.customCertTitle || 'SERTIFIKAT HASIL BELAJAR');
    setCustomCertTeacherName(ov.customCertTeacherName || "Muhammad Rif'ani, S.Kom.");
    setCustomCertTeacherNip(ov.customCertTeacherNip || 'Guru Pengampu Informatika');
  };

  useEffect(() => {
    if (!isOpen) return;
    const targetId = topic?.id || selectedTopicId || ALL_TOPICS[0].id;
    setSelectedTopicId(targetId);
    loadTopicFormState(targetId);
  }, [isOpen, topic?.id]);

  if (!isOpen) return null;

  const handleSaveAll = () => {
    const pictureGuessOverrides: Record<number, any> = {};
    pictureGuessList.forEach((pg, idx) => {
      pictureGuessOverrides[idx] = {
        title: pg.title,
        clue: pg.clue,
        dailyContext: pg.dailyContext,
        customImageUrl: pg.customImageUrl || '',
        options: pg.options,
        correctIndex: pg.correctIndex,
      };
    });

    const payload: Partial<TopicContentOverride> = {
      title: title.trim(),
      shortDesc: shortDesc.trim(),
      learningObjectives: learningObjectives.filter(Boolean),
      customRealLifeStory: customRealLifeStory.trim(),
      customTriggerQuestions: customTriggerQuestions.filter(Boolean),
      customTriggerAnswerKey: customTriggerAnswerKey.trim(),
      customApersepsiImageUrl: customApersepsiImageUrl.trim(),
      customAsesmenAwal,
      overview: overview.trim(),
      tahukahKamu: tahukahKamu.trim(),
      faktaMenarik: faktaMenarik.trim(),
      infoPenting: infoPenting.trim(),
      customKeyConcepts,
      customSummary: customSummary.filter(Boolean),
      customFormativeCheck,
      customVideoTitle: customVideoTitle.trim(),
      customVideoUrl: (() => {
        const cleanId = extractYouTubeId(customVideoUrl);
        return cleanId ? `https://www.youtube.com/watch?v=${cleanId}` : customVideoUrl.trim();
      })(),
      customVideoDuration: customVideoDuration.trim(),
      customVideoDescription: customVideoDescription.trim(),
      customMateriImageUrl: customMateriImageUrl.trim(),
      customInfographicUrl: customInfographicUrl.trim(),
      customSimulasiImageUrl: customSimulasiImageUrl.trim(),
      customPblImageUrl: customPblImageUrl.trim(),
      moduleBannerImages,
      simulationTitle: simulationTitle.trim(),
      simulationScenario: simulationScenario.trim(),
      simulationInstructions: simulationInstructions.trim(),
      customVisualCards,
      customSimulationCategories,
      customScenarioChallenges,
      customPblScenario: pblState || undefined,
      customPblIdealProblem: customPblIdealProblem.trim(),
      customPblIdealSolution: customPblIdealSolution.trim(),
      pictureGuess: pictureGuessOverrides,
      customPictureGuessList: pictureGuessList.map((pg) => ({
        title: pg.title,
        clue: pg.clue,
        dailyContext: pg.dailyContext,
        customImageUrl: pg.customImageUrl || '',
        options: pg.options,
        correctIndex: pg.correctIndex,
      })),
      customBattleBotQuestions,
      customRobotRaceQuestions: customBattleBotQuestions,
      customMiniGameQuestions: {
        ...(overrides[selectedTopicId]?.customMiniGameQuestions || {}),
        'battle-bot': customBattleBotQuestions,
      },
      customWordScramble,
      customKuis,
      customAsesmenAkhir,
      customRefleksiQuestions,
      customCertSchoolName: customCertSchoolName.trim(),
      customCertLocation: customCertLocation.trim(),
      customCertTitle: customCertTitle.trim(),
      customCertTeacherName: customCertTeacherName.trim(),
      customCertTeacherNip: customCertTeacherNip.trim(),
    };

    saveTopicOverride(selectedTopicId, payload);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        cb(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(overrides, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute(
      'download',
      `backup_cms_guru_informatika_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (typeof reader.result === 'string') {
          const parsed = JSON.parse(reader.result);
          importOverridesJson(parsed);
          setSavedBanner(true);
          setTimeout(() => setSavedBanner(false), 3000);
        }
      } catch {}
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const tabs: { id: EditorTabType; label: string; icon: React.ReactNode }[] = [
    { id: 'apersepsi', label: '1. Apersepsi', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'asesmen-awal', label: '2. Asesmen Awal', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'materi', label: '3. Materi & Formatif', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'video', label: '4. Video YouTube', icon: <Video className="w-3.5 h-3.5" /> },
    { id: 'gambar', label: '5. Gambar Semua Modul', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'simulasi', label: '6. Simulasi & Kasus', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'pbl', label: '7. Kasus PBL & Kunci', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'tebak-gambar', label: '8. Soal Mini Game', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 'kuis', label: '9. Soal Kuis HOTS', icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
    { id: 'asesmen-akhir', label: '10. Soal Asesmen Akhir', icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
    { id: 'refleksi-sertifikat', label: '11. Refleksi & Sertifikat', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'keamanan', label: 'PIN & Backup', icon: <Lock className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      data-live-editor-ignore="true"
      className="fixed inset-0 z-[80] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:hidden"
    >
      <div className="bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              CMS
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Studio Editor Guru Lengkap (Apersepsi s/d Sertifikat)
              </h2>
              <p className="text-xs text-slate-300">
                Edit teks, gambar, soal, pilihan ganda, studi kasus, PBL, dan kunci jawaban di semua materi
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenQuestionBankExcel && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQuestionBankExcel();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-md transition-all cursor-pointer active:scale-95"
                title="Buka Menu Bank Soal & Materi (Download & Upload Excel Realtime)"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Bank Soal & Materi (Excel)</span>
              </button>
            )}

            <select
              value={selectedTopicId}
              onChange={(e) => {
                const nextId = e.target.value;
                setSelectedTopicId(nextId);
                loadTopicFormState(nextId);
              }}
              className="px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-600 text-xs font-bold focus:outline-none max-w-xs"
            >
              {([7, 8, 9] as const).map((gradeNum) => {
                const gradeTopics = ALL_TOPICS.filter((t) => t.grade === gradeNum);
                return (
                  <optgroup key={gradeNum} label={`Kelas ${gradeNum} SMP`}>
                    {gradeTopics.map((t, idx) => (
                      <option key={t.id} value={t.id}>
                        Kelas {t.grade} • Materi {idx + 1}: {t.title}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center gap-1.5 overflow-x-auto shrink-0">
          {tabs.map((t) => {
            const active = editorActiveTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setEditorActiveTab(t.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-900 dark:text-slate-100">
          {/* TAB 1: APERSEPSI */}
          {editorActiveTab === 'apersepsi' && (
            <div className="space-y-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <h4 className="font-black text-sm uppercase tracking-wider text-indigo-600">
                1. Edit Apersepsi, Tujuan Pembelajaran & Kunci Jawaban Pemantik
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Judul Materi / Bab:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Deskripsi Singkat Bab:</label>
                  <input
                    type="text"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Cerita Kontekstual Apersepsi:</label>
                <textarea
                  rows={4}
                  value={customRealLifeStory}
                  onChange={(e) => setCustomRealLifeStory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs leading-relaxed"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold">Pertanyaan Pemantik Diskusi:</label>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomTriggerQuestions([...customTriggerQuestions, 'Pertanyaan pemantik baru...'])
                    }
                    className="text-xs font-extrabold text-indigo-600 inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Pertanyaan
                  </button>
                </div>
                <div className="space-y-2">
                  {customTriggerQuestions.map((tq, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tq}
                        onChange={(e) => {
                          const next = [...customTriggerQuestions];
                          next[idx] = e.target.value;
                          setCustomTriggerQuestions(next);
                        }}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                      />
                      {customTriggerQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCustomTriggerQuestions(
                              customTriggerQuestions.filter((_, i) => i !== idx)
                            )
                          }
                          className="p-1.5 text-rose-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-700 mb-1">
                  Kunci Jawaban / Panduan Jawaban Seharusnya pada Apersepsi:
                </label>
                <textarea
                  rows={2}
                  value={customTriggerAnswerKey}
                  onChange={(e) => setCustomTriggerAnswerKey(e.target.value)}
                  className="w-full p-3 rounded-xl border border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/30 text-xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold">Daftar Tujuan Pembelajaran:</label>
                  <button
                    type="button"
                    onClick={() =>
                      setLearningObjectives([...learningObjectives, 'Tujuan pembelajaran baru...'])
                    }
                    className="text-xs font-extrabold text-indigo-600 inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Tujuan
                  </button>
                </div>
                <div className="space-y-2">
                  {learningObjectives.map((obj, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={obj}
                        onChange={(e) => {
                          const next = [...learningObjectives];
                          next[idx] = e.target.value;
                          setLearningObjectives(next);
                        }}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setLearningObjectives(learningObjectives.filter((_, i) => i !== idx))
                        }
                        className="p-1.5 text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ASESMEN AWAL */}
          {editorActiveTab === 'asesmen-awal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
                <div>
                  <h4 className="font-black text-sm">
                    Editor Soal & Kunci Jawaban Asesmen Awal (Diagnostik)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Ubah pertanyaan, pilihan A/B/C/D, pilih Kunci Jawaban Benar, dan rekomendasi konsep.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCustomAsesmenAwal([
                      ...customAsesmenAwal,
                      {
                        id: customAsesmenAwal.length + 1,
                        question: 'Pertanyaan diagnostik baru...',
                        options: [
                          { label: 'A', text: 'Pilihan A' },
                          { label: 'B', text: 'Pilihan B' },
                          { label: 'C', text: 'Pilihan C' },
                          { label: 'D', text: 'Pilihan D' },
                        ],
                        correctAnswer: 'A',
                        conceptTag: 'Konsep Dasar',
                        recommendation: 'Pelajari kembali bagian konsep utama.',
                      },
                    ])
                  }
                  className="px-3.5 py-2 rounded-xl bg-amber-600 text-white text-xs font-extrabold inline-flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Tambah Soal
                </button>
              </div>

              {customAsesmenAwal.map((q, qIdx) => (
                <div
                  key={q.id || qIdx}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-black text-xs">
                      Soal Diagnostik #{qIdx + 1} • Kunci Jawaban Benar: {q.correctAnswer}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={q.conceptTag}
                        onChange={(e) => {
                          const next = [...customAsesmenAwal];
                          next[qIdx] = { ...next[qIdx], conceptTag: e.target.value };
                          setCustomAsesmenAwal(next);
                        }}
                        placeholder="Tag Konsep"
                        className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                      />
                      {customAsesmenAwal.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCustomAsesmenAwal(customAsesmenAwal.filter((_, i) => i !== qIdx))
                          }
                          className="text-xs font-bold text-rose-600"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={q.question}
                    onChange={(e) => {
                      const next = [...customAsesmenAwal];
                      next[qIdx] = { ...next[qIdx], question: e.target.value };
                      setCustomAsesmenAwal(next);
                    }}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = q.correctAnswer === opt.label;
                      return (
                        <div
                          key={opt.label}
                          className={`p-3 rounded-xl border-2 ${
                            isCorrect
                              ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40'
                              : 'border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-black">Opsi {opt.label}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...customAsesmenAwal];
                                next[qIdx] = { ...next[qIdx], correctAnswer: opt.label };
                                setCustomAsesmenAwal(next);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {isCorrect ? '✓ Kunci Benar' : 'Jadikan Kunci'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => {
                              const next = [...customAsesmenAwal];
                              const opts = [...next[qIdx].options];
                              opts[oIdx] = { ...opts[oIdx], text: e.target.value };
                              next[qIdx] = { ...next[qIdx], options: opts };
                              setCustomAsesmenAwal(next);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-700 mb-1">
                      Rekomendasi / Penjelasan Konsep Soal Ini:
                    </label>
                    <input
                      type="text"
                      value={q.recommendation}
                      onChange={(e) => {
                        const next = [...customAsesmenAwal];
                        next[qIdx] = { ...next[qIdx], recommendation: e.target.value };
                        setCustomAsesmenAwal(next);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 bg-transparent text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MATERI & KUIS FORMATIF */}
          {editorActiveTab === 'materi' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm uppercase text-indigo-600">
                  Ringkasan Materi & Kotak Info Penting
                </h4>
                <div>
                  <label className="block text-xs font-bold mb-1">Pengantar Utama Materi:</label>
                  <textarea
                    rows={3}
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Tahukah Kamu?</label>
                    <textarea
                      rows={3}
                      value={tahukahKamu}
                      onChange={(e) => setTahukahKamu(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Fakta Menarik:</label>
                    <textarea
                      rows={3}
                      value={faktaMenarik}
                      onChange={(e) => setFaktaMenarik(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Info Penting Guru:</label>
                    <textarea
                      rows={3}
                      value={infoPenting}
                      onChange={(e) => setInfoPenting(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Konsep Kunci Sub-Materi */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm uppercase text-indigo-600">
                    Daftar Sub-Materi / Konsep Inti ({customKeyConcepts.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomKeyConcepts([
                        ...customKeyConcepts,
                        {
                          title: 'Sub-Materi Baru',
                          explanation: 'Penjelasan konsep...',
                          bulletPoints: ['Poin penting 1', 'Poin penting 2'],
                        },
                      ])
                    }
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-extrabold inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Sub-Materi
                  </button>
                </div>

                {customKeyConcepts.map((kc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-indigo-600">
                        Sub-Materi #{idx + 1}
                      </span>
                      {customKeyConcepts.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCustomKeyConcepts(customKeyConcepts.filter((_, i) => i !== idx))
                          }
                          className="text-xs font-bold text-rose-600"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={kc.title}
                      onChange={(e) => {
                        const next = [...customKeyConcepts];
                        next[idx] = { ...next[idx], title: e.target.value };
                        setCustomKeyConcepts(next);
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                    <textarea
                      rows={2}
                      value={kc.explanation}
                      onChange={(e) => {
                        const next = [...customKeyConcepts];
                        next[idx] = { ...next[idx], explanation: e.target.value };
                        setCustomKeyConcepts(next);
                      }}
                      className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                  </div>
                ))}
              </div>

              {/* Soal Kuis Formatif di Halaman Materi */}
              <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm uppercase text-emerald-800 dark:text-emerald-300">
                    Soal & Kunci Jawaban Uji Cepat Pemahaman (Kuis Formatif Materi)
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomFormativeCheck([
                        ...customFormativeCheck,
                        {
                          question: 'Pertanyaan formatif baru...',
                          options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
                          answerIndex: 0,
                          explanation: 'Pembahasan jawaban benar...',
                        },
                      ])
                    }
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Soal Formatif
                  </button>
                </div>

                {customFormativeCheck.map((fc, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-700">
                        Cek Formatif #{fIdx + 1} • Kunci: {String.fromCharCode(65 + fc.answerIndex)}
                      </span>
                      {customFormativeCheck.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCustomFormativeCheck(
                              customFormativeCheck.filter((_, i) => i !== fIdx)
                            )
                          }
                          className="text-xs font-bold text-rose-600"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={fc.question}
                      onChange={(e) => {
                        const next = [...customFormativeCheck];
                        next[fIdx] = { ...next[fIdx], question: e.target.value };
                        setCustomFormativeCheck(next);
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {fc.options.map((opt, oIdx) => {
                        const isCorrect = fc.answerIndex === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-lg border flex items-center gap-2 ${
                              isCorrect
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50'
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...customFormativeCheck];
                                next[fIdx] = { ...next[fIdx], answerIndex: oIdx };
                                setCustomFormativeCheck(next);
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-black ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </button>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const next = [...customFormativeCheck];
                                const opts = [...next[fIdx].options];
                                opts[oIdx] = e.target.value;
                                next[fIdx] = { ...next[fIdx], options: opts };
                                setCustomFormativeCheck(next);
                              }}
                              className="w-full text-xs bg-transparent focus:outline-none"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      value={fc.explanation}
                      onChange={(e) => {
                        const next = [...customFormativeCheck];
                        next[fIdx] = { ...next[fIdx], explanation: e.target.value };
                        setCustomFormativeCheck(next);
                      }}
                      placeholder="Pembahasan..."
                      className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 bg-transparent text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VIDEO YOUTUBE */}
          {editorActiveTab === 'video' && (
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-black text-sm uppercase text-rose-600">
                  4. Ganti Tautan Video Pembelajaran YouTube (Tampil di Apersepsi &amp; Materi)
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {videoQuickSaved && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-extrabold animate-in fade-in">
                      ✓ Video YouTube Tersimpan ke Mode Siswa &amp; Guru!
                    </span>
                  )}
                  {extractYouTubeId(customVideoUrl) && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold">
                      ✓ ID YouTube Terdeteksi: {extractYouTubeId(customVideoUrl)}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  1. Tempel Tautan YouTube Baru (Mendukung watch?v=, youtu.be/, shorts/, live/, atau embed):
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={customVideoUrl}
                    onChange={async (e) => {
                      const nextUrl = e.target.value;
                      setCustomVideoUrl(nextUrl);
                      const detectedId = extractYouTubeId(nextUrl);
                      if (detectedId) {
                        const cleanWatchUrl = getYouTubeWatchUrl(detectedId);
                        // Langsung simpan ke override agar jika guru menutup modal atau pindah ke Mode Biasa, video sudah tersimpan
                        saveTopicOverride(selectedTopicId, {
                          customVideoUrl: cleanWatchUrl,
                        });
                        setVideoQuickSaved(true);
                        setTimeout(() => setVideoQuickSaved(false), 3500);

                        const info = await fetchYouTubeOEmbedInfo(detectedId);
                        if (info?.title) {
                          setCustomVideoTitle(info.title);
                          const desc = info.authorName
                            ? `Video pembelajaran dari kanal YouTube ${info.authorName}`
                            : customVideoDescription;
                          if (info.authorName) {
                            setCustomVideoDescription(desc);
                          }
                          saveTopicOverride(selectedTopicId, {
                            customVideoUrl: cleanWatchUrl,
                            customVideoTitle: info.title,
                            ...(info.authorName ? { customVideoDescription: desc } : {}),
                          });
                        }
                      }
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 px-3 py-2 rounded-xl border-2 border-rose-300 dark:border-rose-800 bg-transparent text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      const detectedId = extractYouTubeId(customVideoUrl);
                      const info = await fetchYouTubeOEmbedInfo(customVideoUrl);
                      const nextTitle = info?.title || customVideoTitle;
                      const nextDesc = info?.authorName
                        ? `Video pembelajaran dari kanal YouTube ${info.authorName}`
                        : customVideoDescription;
                      if (info?.title) {
                        setCustomVideoTitle(info.title);
                        if (info.authorName) {
                          setCustomVideoDescription(nextDesc);
                        }
                      }
                      if (detectedId) {
                        saveTopicOverride(selectedTopicId, {
                          customVideoUrl: getYouTubeWatchUrl(detectedId),
                          customVideoTitle: nextTitle.trim(),
                          customVideoDuration: customVideoDuration.trim(),
                          customVideoDescription: nextDesc.trim(),
                        });
                        setVideoQuickSaved(true);
                        setTimeout(() => setVideoQuickSaved(false), 3500);
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shrink-0 cursor-pointer"
                  >
                    Ambil Judul &amp; Simpan Video
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const detectedId = extractYouTubeId(customVideoUrl);
                      const normalizedUrl = detectedId
                        ? getYouTubeWatchUrl(detectedId)
                        : customVideoUrl.trim();
                      setCustomVideoUrl(normalizedUrl);
                      saveTopicOverride(selectedTopicId, {
                        customVideoUrl: normalizedUrl,
                        customVideoTitle: customVideoTitle.trim(),
                        customVideoDuration: customVideoDuration.trim(),
                        customVideoDescription: customVideoDescription.trim(),
                      });
                      setVideoQuickSaved(true);
                      setSavedBanner(true);
                      setTimeout(() => {
                        setVideoQuickSaved(false);
                        setSavedBanner(false);
                      }, 3500);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shrink-0 inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Video</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  💡 Saat Anda menempelkan tautan YouTube baru, sistem otomatis mengekstrak ID video murni (mengabaikan playlist/mix), mengambil judul aslinya, dan langsung menyimpannya agar langsung terbaca di Mode Biasa (Siswa) maupun Mode Guru.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold mb-1">Judul Video:</label>
                  <input
                    type="text"
                    value={customVideoTitle}
                    onChange={(e) => setCustomVideoTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Durasi Video:</label>
                  <input
                    type="text"
                    value={customVideoDuration}
                    onChange={(e) => setCustomVideoDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Deskripsi Video:</label>
                <textarea
                  rows={2}
                  value={customVideoDescription}
                  onChange={(e) => setCustomVideoDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                />
              </div>

              {/* Pratinjau Langsung Video YouTube */}
              {extractYouTubeId(customVideoUrl) ? (
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-bold text-emerald-400">
                      ▶ Pratinjau Video yang Ditampilkan di Mode Siswa &amp; Mode Guru:
                    </div>
                    <a
                      href={getYouTubeWatchUrl(extractYouTubeId(customVideoUrl)!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-sky-400 hover:text-sky-300 underline"
                    >
                      Buka di Tab YouTube ↗
                    </a>
                  </div>
                  <div className="aspect-video max-h-60 mx-auto rounded-xl overflow-hidden bg-black">
                    <iframe
                      key={extractYouTubeId(customVideoUrl)}
                      src={getYouTubeEmbedUrl(extractYouTubeId(customVideoUrl)!)}
                      title={customVideoTitle || 'Preview YouTube'}
                      className="w-full h-full border-0"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-xs text-amber-800 dark:text-amber-200 font-bold">
                  ⚠ Tautan YouTube belum valid. Pastikan tautan mengandung ID video YouTube 11 karakter (contoh: https://www.youtube.com/watch?v=... atau https://youtu.be/...).
                </div>
              )}
            </div>
          )}

          {/* TAB 5: GAMBAR SEMUA MODUL */}
          {editorActiveTab === 'gambar' && (
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5">
              <h4 className="font-black text-sm uppercase text-sky-600">
                5. Edit / Unggah Gambar Ilustrasi di Semua Bagian (Apersepsi s/d Sertifikat)
              </h4>
              <p className="text-xs text-slate-500">
                Unggah gambar dari komputer/HP atau tempel URL gambar untuk ditampilkan pada masing-masing modul.
              </p>

              {[
                { key: 'apersepsi', label: 'Gambar Modul 1: Apersepsi' },
                { key: 'asesmen-awal', label: 'Gambar Modul 2: Asesmen Awal' },
                { key: 'materi', label: 'Gambar Modul 3: Materi Utama' },
                { key: 'simulasi', label: 'Gambar Modul 4: Simulasi Interaktif' },
                { key: 'pbl', label: 'Gambar Modul 5: Studi Kasus PBL' },
                { key: 'mini-game', label: 'Gambar Modul 6: Mini Game' },
                { key: 'kuis', label: 'Gambar Modul 7: Kuis Interaktif HOTS' },
                { key: 'asesmen-akhir', label: 'Gambar Modul 8: Asesmen Akhir' },
                { key: 'refleksi', label: 'Gambar Modul 9: Refleksi' },
                { key: 'sertifikat', label: 'Gambar Modul 10: Sertifikat' },
              ].map((m) => {
                const bannerKey = `${selectedTopicId}::${m.key}`;
                const currentVal =
                  moduleBannerImages[bannerKey] || moduleBannerImages[m.key] || '';
                return (
                  <div
                    key={m.key}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                  >
                    <span className="text-xs font-extrabold w-56 shrink-0">{m.label}</span>
                    <label className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                      <Upload className="w-3.5 h-3.5" /> Unggah Foto
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageFileUpload(e, (url) =>
                            setModuleBannerImages({
                              ...moduleBannerImages,
                              [bannerKey]: url,
                            })
                          )
                        }
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={currentVal}
                      onChange={(e) =>
                        setModuleBannerImages({
                          ...moduleBannerImages,
                          [bannerKey]: e.target.value,
                        })
                      }
                      placeholder="Atau tempel URL Gambar (https://...)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs w-full"
                    />
                    {currentVal && (
                      <button
                        type="button"
                        onClick={() =>
                          setModuleBannerImages({
                            ...moduleBannerImages,
                            [bannerKey]: '',
                          })
                        }
                        className="text-xs text-rose-600 font-bold"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 6: SIMULASI & STUDI KASUS */}
          {editorActiveTab === 'simulasi' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm uppercase text-emerald-600">
                  Instruksi Simulasi & Kartu Klasifikasi Visual
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Judul Simulasi:</label>
                    <input
                      type="text"
                      value={simulationTitle}
                      onChange={(e) => setSimulationTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Instruksi Pengerjaan:</label>
                    <input
                      type="text"
                      value={simulationInstructions}
                      onChange={(e) => setSimulationInstructions(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {customVisualCards.map((card, idx) => (
                    <div
                      key={card.id || idx}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <span className="text-xs font-black text-emerald-600">
                        Kartu Klasifikasi #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const next = [...customVisualCards];
                          next[idx] = { ...next[idx], title: e.target.value };
                          setCustomVisualCards(next);
                        }}
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={card.description}
                        onChange={(e) => {
                          const next = [...customVisualCards];
                          next[idx] = { ...next[idx], description: e.target.value };
                          setCustomVisualCards(next);
                        }}
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                      />
                      <div>
                        <label className="block text-[10px] font-black uppercase text-emerald-700">
                          Kunci Kategori Seharusnya:
                        </label>
                        <input
                          type="text"
                          value={card.correctCategory}
                          onChange={(e) => {
                            const next = [...customVisualCards];
                            next[idx] = { ...next[idx], correctCategory: e.target.value };
                            setCustomVisualCards(next);
                          }}
                          className="w-full px-2.5 py-1 rounded border border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/40 text-xs font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Studi Kasus Kontekstual pada Simulasi */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm uppercase text-amber-600">
                    Soal & Kunci Jawaban Studi Kasus Kontekstual (Di Tab Kasus Nyata Simulasi)
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomScenarioChallenges([
                        ...customScenarioChallenges,
                        {
                          id: `sc-${Date.now()}`,
                          title: 'Kasus Kontekstual Baru',
                          category: title,
                          story: 'Cerita situasi kasus di sekolah/rumah...',
                          question: 'Tindakan paling tepat yang harus diambil adalah...',
                          options: [
                            { text: 'Tindakan benar sesuai prosedur', isCorrect: true, reason: 'Alasan benar...' },
                            { text: 'Tindakan kurang tepat B', isCorrect: false, reason: 'Alasan kurang tepat...' },
                            { text: 'Tindakan kurang tepat C', isCorrect: false, reason: 'Alasan kurang tepat...' },
                          ],
                        },
                      ])
                    }
                    className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-extrabold inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Kasus
                  </button>
                </div>

                {customScenarioChallenges.map((sc, sIdx) => (
                  <div
                    key={sc.id || sIdx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-700">
                        Studi Kasus #{sIdx + 1}: {sc.title}
                      </span>
                      {customScenarioChallenges.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCustomScenarioChallenges(
                              customScenarioChallenges.filter((_, i) => i !== sIdx)
                            )
                          }
                          className="text-xs font-bold text-rose-600"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={sc.title}
                      onChange={(e) => {
                        const next = [...customScenarioChallenges];
                        next[sIdx] = { ...next[sIdx], title: e.target.value };
                        setCustomScenarioChallenges(next);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                    <textarea
                      rows={2}
                      value={sc.story}
                      onChange={(e) => {
                        const next = [...customScenarioChallenges];
                        next[sIdx] = { ...next[sIdx], story: e.target.value };
                        setCustomScenarioChallenges(next);
                      }}
                      className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                    <input
                      type="text"
                      value={sc.question}
                      onChange={(e) => {
                        const next = [...customScenarioChallenges];
                        next[sIdx] = { ...next[sIdx], question: e.target.value };
                        setCustomScenarioChallenges(next);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-semibold"
                    />
                    <div className="space-y-2">
                      {sc.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border ${
                            opt.isCorrect
                              ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40'
                              : 'border-slate-200 dark:border-slate-800'
                          } space-y-1.5`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) => {
                                const next = [...customScenarioChallenges];
                                const opts = [...next[sIdx].options];
                                opts[oIdx] = { ...opts[oIdx], text: e.target.value };
                                next[sIdx] = { ...next[sIdx], options: opts };
                                setCustomScenarioChallenges(next);
                              }}
                              className="flex-1 px-2.5 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...customScenarioChallenges];
                                const opts = next[sIdx].options.map((o, i) => ({
                                  ...o,
                                  isCorrect: i === oIdx,
                                }));
                                next[sIdx] = { ...next[sIdx], options: opts };
                                setCustomScenarioChallenges(next);
                              }}
                              className={`px-2.5 py-1 rounded text-[10px] font-black shrink-0 ${
                                opt.isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {opt.isCorrect ? '✓ Kunci Benar' : 'Jadikan Kunci'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={opt.reason}
                            onChange={(e) => {
                              const next = [...customScenarioChallenges];
                              const opts = [...next[sIdx].options];
                              opts[oIdx] = { ...opts[oIdx], reason: e.target.value };
                              next[sIdx] = { ...next[sIdx], options: opts };
                              setCustomScenarioChallenges(next);
                            }}
                            placeholder="Alasan / penjelasan pilihan ini..."
                            className="w-full px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-transparent text-[11px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: STUDI KASUS PBL & KUNCI */}
          {editorActiveTab === 'pbl' && pblState && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm uppercase text-rose-600">
                  7. Editor Studi Kasus PBL (Problem-Based Learning)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Judul Headline Kasus:</label>
                    <input
                      type="text"
                      value={pblState.headline}
                      onChange={(e) => setPblState({ ...pblState, headline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Lokasi Kejadian:</label>
                    <input
                      type="text"
                      value={pblState.location}
                      onChange={(e) => setPblState({ ...pblState, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Cerita Kasus Lengkap:</label>
                  <textarea
                    rows={3}
                    value={pblState.contextStory}
                    onChange={(e) => setPblState({ ...pblState, contextStory: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Pertanyaan Utama (Driving Question):</label>
                  <input
                    type="text"
                    value={pblState.drivingQuestion}
                    onChange={(e) => setPblState({ ...pblState, drivingQuestion: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                  />
                </div>
              </div>

              {/* Hipotesis Penyebab & Kunci Akar Masalah */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-sm text-emerald-900 dark:text-emerald-300">
                  Daftar Kemungkinan Penyebab & Kunci Penyebab Asli (Langkah 3 PBL)
                </h4>
                {pblState.potentialCauses.map((pc, idx) => (
                  <div
                    key={pc.id || idx}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center gap-2 ${
                      pc.isRootCause
                        ? 'bg-white dark:bg-slate-900 border-emerald-500'
                        : 'bg-white/60 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <input
                      type="text"
                      value={pc.text}
                      onChange={(e) => {
                        const next = [...pblState.potentialCauses];
                        next[idx] = { ...next[idx], text: e.target.value };
                        setPblState({ ...pblState, potentialCauses: next });
                      }}
                      className="flex-1 px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold w-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...pblState.potentialCauses];
                        next[idx] = { ...next[idx], isRootCause: !next[idx].isRootCause };
                        setPblState({ ...pblState, potentialCauses: next });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap ${
                        pc.isRootCause
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {pc.isRootCause ? '✓ KUNCI PENYEBAB ASLI' : 'Bukan Akar Masalah'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Kunci Jawaban Ideal Rumusan Masalah & Solusi PBL */}
              <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm text-amber-900 dark:text-amber-200">
                  Kunci Jawaban Seharusnya untuk Rumusan Masalah & Solusi Kelompok PBL
                </h4>
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Jawaban Seharusnya — Rumusan Masalah Utama (Langkah 1):
                  </label>
                  <textarea
                    rows={3}
                    value={customPblIdealProblem}
                    onChange={(e) => setCustomPblIdealProblem(e.target.value)}
                    className="w-full p-3 rounded-xl border border-amber-300 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Jawaban Seharusnya — Rencana Solusi Kelompok Ideal (Langkah 4):
                  </label>
                  <textarea
                    rows={3}
                    value={customPblIdealSolution}
                    onChange={(e) => setCustomPblIdealSolution(e.target.value)}
                    className="w-full p-3 rounded-xl border border-amber-300 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SOAL MINI GAME */}
          {editorActiveTab === 'tebak-gambar' && (
            <div className="space-y-6">
              {/* Robot Tinju 3D & Balap Motor 3D */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm uppercase text-indigo-600">
                    Soal & Kunci Jawaban Robot Tinju 3D & Balap Motor 3D
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomBattleBotQuestions([
                        ...customBattleBotQuestions,
                        {
                          id: customBattleBotQuestions.length + 1,
                          scenario: 'Skenario tantangan baru...',
                          question: 'Pertanyaan baru...',
                          options: [
                            { label: 'A', text: 'Opsi A' },
                            { label: 'B', text: 'Opsi B' },
                            { label: 'C', text: 'Opsi C' },
                            { label: 'D', text: 'Opsi D' },
                          ],
                          correctIndex: 0,
                          damage: 25,
                          explanation: 'Penjelasan jawaban benar...',
                        },
                      ])
                    }
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-extrabold inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Soal Arena
                  </button>
                </div>

                {customBattleBotQuestions.map((bb, idx) => (
                  <div
                    key={bb.id || idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-indigo-600">
                        Soal Arena #{idx + 1} • Kunci: {String.fromCharCode(65 + bb.correctIndex)}
                      </span>
                      {customBattleBotQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCustomBattleBotQuestions(
                              customBattleBotQuestions.filter((_, i) => i !== idx)
                            )
                          }
                          className="text-xs font-bold text-rose-600"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={bb.question}
                      onChange={(e) => {
                        const next = [...customBattleBotQuestions];
                        next[idx] = { ...next[idx], question: e.target.value };
                        setCustomBattleBotQuestions(next);
                      }}
                      className="w-full px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {bb.options.map((opt, oIdx) => {
                        const isCorrect = bb.correctIndex === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-lg border flex items-center gap-2 ${
                              isCorrect
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...customBattleBotQuestions];
                                next[idx] = { ...next[idx], correctIndex: oIdx };
                                setCustomBattleBotQuestions(next);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {opt.label}
                            </button>
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) => {
                                const next = [...customBattleBotQuestions];
                                const opts = [...next[idx].options];
                                opts[oIdx] = { ...opts[oIdx], text: e.target.value };
                                next[idx] = { ...next[idx], options: opts };
                                setCustomBattleBotQuestions(next);
                              }}
                              className="w-full text-xs bg-transparent focus:outline-none"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tebak Kata */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm uppercase text-emerald-600">
                  Soal & Kunci Kata Game Tebak Kata (Word Scramble)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {customWordScramble.map((ws, idx) => (
                    <div
                      key={ws.id || idx}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <span className="text-xs font-black text-emerald-600">
                        Kata Kunci #{idx + 1}: {ws.word}
                      </span>
                      <input
                        type="text"
                        value={ws.word}
                        onChange={(e) => {
                          const next = [...customWordScramble];
                          next[idx] = { ...next[idx], word: e.target.value.toUpperCase() };
                          setCustomWordScramble(next);
                        }}
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-black uppercase"
                      />
                      <input
                        type="text"
                        value={ws.clue}
                        onChange={(e) => {
                          const next = [...customWordScramble];
                          next[idx] = { ...next[idx], clue: e.target.value };
                          setCustomWordScramble(next);
                        }}
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tebak Gambar */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm uppercase text-purple-600">
                  Soal, Gambar & Kunci Jawaban Game Tebak Gambar
                </h4>
                {pictureGuessList.map((pg, idx) => (
                  <div
                    key={pg.id || idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <span className="text-xs font-black text-purple-600">
                      Tebak Gambar #{idx + 1} • Kunci: {String.fromCharCode(65 + pg.correctIndex)}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold cursor-pointer inline-flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" /> Unggah Gambar Soal
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageFileUpload(e, (url) => {
                              const next = [...pictureGuessList];
                              next[idx] = { ...next[idx], customImageUrl: url };
                              setPictureGuessList(next);
                            })
                          }
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={pg.customImageUrl || ''}
                        onChange={(e) => {
                          const next = [...pictureGuessList];
                          next[idx] = { ...next[idx], customImageUrl: e.target.value };
                          setPictureGuessList(next);
                        }}
                        placeholder="Atau URL Gambar Kustom..."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                      />
                    </div>
                    <input
                      type="text"
                      value={pg.clue}
                      onChange={(e) => {
                        const next = [...pictureGuessList];
                        next[idx] = { ...next[idx], clue: e.target.value };
                        setPictureGuessList(next);
                      }}
                      className="w-full px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pg.options.map((opt: string, oIdx: number) => {
                        const isCorrect = pg.correctIndex === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-lg border flex items-center gap-2 ${
                              isCorrect
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...pictureGuessList];
                                next[idx] = { ...next[idx], correctIndex: oIdx };
                                setPictureGuessList(next);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </button>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const next = [...pictureGuessList];
                                const opts = [...next[idx].options];
                                opts[oIdx] = e.target.value;
                                next[idx] = { ...next[idx], options: opts };
                                setPictureGuessList(next);
                              }}
                              className="w-full text-xs bg-transparent focus:outline-none"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: KUIS HOTS */}
          {editorActiveTab === 'kuis' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
                <div>
                  <h4 className="font-black text-sm">
                    9. Editor Soal & Kunci Jawaban Kuis Interaktif HOTS
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Edit pertanyaan, pilihan ganda A-D, pilih Kunci Jawaban Benar, dan pembahasan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCustomKuis([
                      ...customKuis,
                      {
                        id: customKuis.length + 1,
                        question: 'Pertanyaan kuis HOTS baru...',
                        options: [
                          { label: 'A', text: 'Pilihan A' },
                          { label: 'B', text: 'Pilihan B' },
                          { label: 'C', text: 'Pilihan C' },
                          { label: 'D', text: 'Pilihan D' },
                        ],
                        correctAnswer: 'A',
                        explanation: 'Pembahasan jawaban benar...',
                        competencyLevel: 'Penalaran (HOTS)',
                      },
                    ])
                  }
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-extrabold inline-flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Tambah Soal Kuis
                </button>
              </div>

              {customKuis.map((q, qIdx) => (
                <div
                  key={q.id || qIdx}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-900 font-black text-xs">
                      Soal Kuis #{qIdx + 1} • Kunci Jawaban Benar: {q.correctAnswer}
                    </span>
                    {customKuis.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setCustomKuis(customKuis.filter((_, i) => i !== qIdx))}
                        className="text-xs font-bold text-rose-600"
                      >
                        Hapus Soal
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    value={q.question}
                    onChange={(e) => {
                      const next = [...customKuis];
                      next[qIdx] = { ...next[qIdx], question: e.target.value };
                      setCustomKuis(next);
                    }}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = q.correctAnswer === opt.label;
                      return (
                        <div
                          key={opt.label}
                          className={`p-3 rounded-xl border-2 ${
                            isCorrect
                              ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40'
                              : 'border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-black">Opsi {opt.label}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...customKuis];
                                next[qIdx] = { ...next[qIdx], correctAnswer: opt.label };
                                setCustomKuis(next);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {isCorrect ? '✓ Kunci Benar' : 'Jadikan Kunci'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => {
                              const next = [...customKuis];
                              const opts = [...next[qIdx].options];
                              opts[oIdx] = { ...opts[oIdx], text: e.target.value };
                              next[qIdx] = { ...next[qIdx], options: opts };
                              setCustomKuis(next);
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    value={q.explanation}
                    onChange={(e) => {
                      const next = [...customKuis];
                      next[qIdx] = { ...next[qIdx], explanation: e.target.value };
                      setCustomKuis(next);
                    }}
                    placeholder="Pembahasan jawaban benar..."
                    className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 bg-transparent text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 10: ASESMEN AKHIR */}
          {editorActiveTab === 'asesmen-akhir' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl p-4">
                <div>
                  <h4 className="font-black text-sm">
                    10. Editor Soal & Kunci Jawaban Asesmen Akhir Sumatif
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Edit soal ujian akhir bab, pilihan jawaban A-D, kunci jawaban benar, dan pembahasannya.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCustomAsesmenAkhir([
                      ...customAsesmenAkhir,
                      {
                        id: customAsesmenAkhir.length + 1,
                        question: 'Pertanyaan asesmen akhir baru...',
                        options: [
                          { label: 'A', text: 'Pilihan A' },
                          { label: 'B', text: 'Pilihan B' },
                          { label: 'C', text: 'Pilihan C' },
                          { label: 'D', text: 'Pilihan D' },
                        ],
                        correctAnswer: 'A',
                        explanation: 'Pembahasan jawaban benar...',
                        points: 10,
                      },
                    ])
                  }
                  className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-extrabold inline-flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Tambah Soal Ujian
                </button>
              </div>

              {customAsesmenAkhir.map((q, qIdx) => (
                <div
                  key={q.id || qIdx}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-rose-100 text-rose-900 font-black text-xs">
                      Soal Asesmen Akhir #{qIdx + 1} • Kunci Jawaban Benar: {q.correctAnswer}
                    </span>
                    {customAsesmenAkhir.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setCustomAsesmenAkhir(customAsesmenAkhir.filter((_, i) => i !== qIdx))
                        }
                        className="text-xs font-bold text-rose-600"
                      >
                        Hapus Soal
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    value={q.question}
                    onChange={(e) => {
                      const next = [...customAsesmenAkhir];
                      next[qIdx] = { ...next[qIdx], question: e.target.value };
                      setCustomAsesmenAkhir(next);
                    }}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = q.correctAnswer === opt.label;
                      return (
                        <div
                          key={opt.label}
                          className={`p-3 rounded-xl border-2 ${
                            isCorrect
                              ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40'
                              : 'border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-black">Opsi {opt.label}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...customAsesmenAkhir];
                                next[qIdx] = { ...next[qIdx], correctAnswer: opt.label };
                                setCustomAsesmenAkhir(next);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {isCorrect ? '✓ Kunci Benar' : 'Jadikan Kunci'}
                            </button>
                          </div>
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => {
                              const next = [...customAsesmenAkhir];
                              const opts = [...next[qIdx].options];
                              opts[oIdx] = { ...opts[oIdx], text: e.target.value };
                              next[qIdx] = { ...next[qIdx], options: opts };
                              setCustomAsesmenAkhir(next);
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    value={q.explanation}
                    onChange={(e) => {
                      const next = [...customAsesmenAkhir];
                      next[qIdx] = { ...next[qIdx], explanation: e.target.value };
                      setCustomAsesmenAkhir(next);
                    }}
                    placeholder="Pembahasan jawaban benar..."
                    className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 bg-transparent text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 11: REFLEKSI & SERTIFIKAT */}
          {editorActiveTab === 'refleksi-sertifikat' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-sm uppercase text-teal-600">
                  11A. Edit Pertanyaan Refleksi Pembelajaran
                </h4>
                {customRefleksiQuestions.map((rq, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={rq}
                    onChange={(e) => {
                      const next = [...customRefleksiQuestions];
                      next[idx] = e.target.value;
                      setCustomRefleksiQuestions(next);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                  />
                ))}
              </div>

              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm uppercase text-amber-600">
                  11B. Edit Teks Sertifikat Hasil Belajar (Modul Akhir)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Nama Sekolah:</label>
                    <input
                      type="text"
                      value={customCertSchoolName}
                      onChange={(e) => setCustomCertSchoolName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Alamat / Lokasi Sekolah:</label>
                    <input
                      type="text"
                      value={customCertLocation}
                      onChange={(e) => setCustomCertLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Judul Sertifikat:</label>
                    <input
                      type="text"
                      value={customCertTitle}
                      onChange={(e) => setCustomCertTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Nama Guru Pengampu:</label>
                    <input
                      type="text"
                      value={customCertTeacherName}
                      onChange={(e) => setCustomCertTeacherName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: KEAMANAN & BACKUP */}
          {editorActiveTab === 'keamanan' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <div>
                  <h4 className="font-black text-sm flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-500" /> Ubah Password Akses Guru (Tersimpan di Database Utama)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Password baru akan langsung diperbarui secara menyeluruh di database utama aplikasi seperti halnya perubahan materi, link YouTube, dan gambar.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
                  <input
                    type="password"
                    value={oldPinInput}
                    onChange={(e) => setOldPinInput(e.target.value)}
                    placeholder="Password Saat Ini"
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                  />
                  <input
                    type="password"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="Password Baru (4-30 karakter)"
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const res = updateTeacherPin(oldPinInput, newPinInput);
                      setPinFeedback({ ok: res.success, msg: res.message });
                      if (res.success) {
                        setOldPinInput('');
                        setNewPinInput('');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold cursor-pointer"
                  >
                    Simpan Password Baru
                  </button>
                </div>
                {pinFeedback && (
                  <p
                    className={`text-xs font-bold ${
                      pinFeedback.ok ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {pinFeedback.msg}
                  </p>
                )}
              </div>

              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-sm">Backup & Restore Seluruh Editan Guru (.JSON)</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Ekspor Backup JSON
                  </button>
                  <label className="px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-extrabold inline-flex items-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" /> Impor Backup JSON
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                resetTopicOverride(selectedTopicId);
                setSavedBanner(true);
                setTimeout(() => setSavedBanner(false), 2500);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-extrabold border border-rose-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Materi Ini ke Default
            </button>
            {savedBanner && (
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" /> Tersimpan ke Database Utama! Seluruh perubahan langsung aktif.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
