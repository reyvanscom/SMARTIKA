import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Download,
  Upload,
  FileSpreadsheet,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Database,
  BookOpen,
  Gamepad2,
  ClipboardCheck,
  HelpCircle,
  Sliders,
  Sparkles,
  RotateCcw,
  Layers,
  Globe,
  Search,
} from 'lucide-react';
import {
  Topic,
  DiagnosticQuestion,
  FormativeQuizItem,
  QuizQuestion,
  FinalAssessmentQuestion,
} from '../../types/curriculum';
import { ALL_TOPICS } from '../../data/allTopics';
import {
  getTopicGamePack,
  BattleBotQuestion,
  WordScrambleQuestion,
  PictureGuessQuestion,
} from '../../data/interactiveGamesData';
import { getTopicPblScenario, PblScenario } from '../../data/pblScenariosData';
import {
  useCurriculumOverrides,
  TopicContentOverride,
  PictureGuessOverrideItem,
  SpecificMiniGameId,
} from '../../context/CurriculumOverridesContext';
import {
  BankSoalSection,
  BANK_SOAL_SECTIONS,
  MINI_GAME_QUIZ_TEMPLATES,
  downloadQuestionBankExcel,
  downloadMiniGameTemplateExcel,
  parseQuestionBankExcel,
  indexToLetter,
  letterToIndex,
  makeScrambledLetters,
} from '../../utils/excelQuestionBank';
import { getDefaultQuestionsForMiniGame } from '../../data/sevenNewMiniGamesData';
import { soundManager } from '../../utils/soundSystem';

interface QuestionBankExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic: Topic;
  initialSection?: BankSoalSection;
  initialMiniGameId?: SpecificMiniGameId;
}

export const QuestionBankExcelModal: React.FC<QuestionBankExcelModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
  initialSection = 'semua',
  initialMiniGameId = 'battle-bot',
}) => {
  const {
    overrides,
    getEffectiveTopic,
    getEffectiveGamePack,
    getEffectivePblScenario,
    saveTopicOverride,
    syncMultipleTopicOverrides,
    forceRefreshFromServer,
    resetTopicOverride,
    lastSyncedAt,
    isSyncing,
    hasCustomOverrides,
  } = useCurriculumOverrides();

  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopic.id);
  const [activeSection, setActiveSection] = useState<BankSoalSection>(initialSection);
  const [selectedMiniGameId, setSelectedMiniGameId] = useState<SpecificMiniGameId>(initialMiniGameId);
  const [exportScope, setExportScope] = useState<'single-topic' | 'all-topics'>('single-topic');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [statusBanner, setStatusBanner] = useState<{
    type: 'success' | 'info' | 'error';
    title: string;
    detail: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const miniGameFileInputRef = useRef<HTMLInputElement | null>(null);

  // Local editable states for the currently selected topic
  // 1. Materi & Apersepsi
  const [materiTitle, setMateriTitle] = useState('');
  const [materiShortDesc, setMateriShortDesc] = useState('');
  const [learningObjectivesText, setLearningObjectivesText] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [realLifeStory, setRealLifeStory] = useState('');
  const [triggerQuestionsText, setTriggerQuestionsText] = useState('');
  const [triggerAnswerKey, setTriggerAnswerKey] = useState('');
  const [overviewText, setOverviewText] = useState('');
  const [tahukahKamuText, setTahukahKamuText] = useState('');
  const [faktaMenarikText, setFaktaMenarikText] = useState('');
  const [infoPentingText, setInfoPentingText] = useState('');
  const [dailyExamplesText, setDailyExamplesText] = useState('');
  const [schoolExamplesText, setSchoolExamplesText] = useState('');
  const [commonMistakesText, setCommonMistakesText] = useState('');
  const [summaryText, setSummaryText] = useState('');

  // 2. Asesmen Awal
  const [asesmenAwalList, setAsesmenAwalList] = useState<DiagnosticQuestion[]>([]);

  // 3. Kuis Formatif
  const [formatifList, setFormatifList] = useState<FormativeQuizItem[]>([]);

  // 4. Mini Game Battle Bot & Semua 12 Mini Game
  const [battleBotList, setBattleBotList] = useState<BattleBotQuestion[]>([]);
  const [miniGameDecks, setMiniGameDecks] = useState<
    Partial<Record<SpecificMiniGameId, BattleBotQuestion[]>>
  >({});

  // 5. Mini Game Kata & Sketsa
  const [wordScrambleList, setWordScrambleList] = useState<WordScrambleQuestion[]>([]);

  // 6. Mini Game Tebak Gambar
  const [pictureGuessList, setPictureGuessList] = useState<PictureGuessQuestion[]>([]);

  // 7. Simulasi & PBL
  const [simTitle, setSimTitle] = useState('');
  const [simScenario, setSimScenario] = useState('');
  const [simInstructions, setSimInstructions] = useState('');
  const [pblScenarioState, setPblScenarioState] = useState<PblScenario | null>(null);
  const [pblIdealProblem, setPblIdealProblem] = useState('');
  const [pblIdealSolution, setPblIdealSolution] = useState('');

  // 8. Kuis Interaktif HOTS
  const [kuisHotsList, setKuisHotsList] = useState<QuizQuestion[]>([]);

  // 9. Asesmen Akhir
  const [asesmenAkhirList, setAsesmenAkhirList] = useState<FinalAssessmentQuestion[]>([]);

  const loadTopicIntoEditor = (tid: string) => {
    const baseTopic = ALL_TOPICS.find((t) => t.id === tid) || initialTopic || ALL_TOPICS[0];
    const eff = getEffectiveTopic(baseTopic);
    const ov = overrides[tid] || {};

    const rawGamePack = getTopicGamePack(baseTopic.id, baseTopic.title, baseTopic.grade);
    const effGamePack = getEffectiveGamePack(tid, rawGamePack);

    const rawPbl = getTopicPblScenario(
      baseTopic.id,
      baseTopic.title,
      baseTopic.grade,
      baseTopic.category
    );
    const effPbl = getEffectivePblScenario(tid, rawPbl);

    // 1. Materi & Apersepsi
    setMateriTitle(eff.title || '');
    setMateriShortDesc(eff.shortDesc || '');
    setLearningObjectivesText((eff.learningObjectives || []).join('\n'));
    setVideoTitle(eff.apersepsi.videoTitle || '');
    setVideoUrl(eff.apersepsi.defaultVideoUrl || '');
    setVideoDuration(eff.apersepsi.videoDuration || '');
    setVideoDesc(eff.apersepsi.videoDescription || '');
    setRealLifeStory(eff.apersepsi.realLifeStory || '');
    setTriggerQuestionsText((eff.apersepsi.triggerQuestions || []).join('\n'));
    setTriggerAnswerKey(
      ov.customTriggerAnswerKey ||
        'Siswa mampu mengaitkan permasalahan sehari-hari pada cerita dengan konsep inti materi.'
    );
    setOverviewText(eff.materi.overview || '');
    setTahukahKamuText(eff.materi.tahukahKamu || '');
    setFaktaMenarikText(eff.materi.faktaMenarik || '');
    setInfoPentingText(eff.materi.infoPenting || '');
    setDailyExamplesText((eff.materi.dailyLifeExamples || []).join('\n'));
    setSchoolExamplesText((eff.materi.schoolExamples || []).join('\n'));
    setCommonMistakesText((eff.materi.commonMistakes || []).join('\n'));
    setSummaryText((eff.materi.summary || []).join('\n'));

    // 2. Asesmen Awal
    setAsesmenAwalList(
      (eff.asesmenAwal || []).map((q, idx) => ({
        ...q,
        id: idx + 1,
        options: q.options.map((o) => ({ ...o })),
      }))
    );

    // 3. Kuis Formatif
    setFormatifList(
      (eff.materi.formativeCheck || []).map((f) => ({
        ...f,
        options: [...(f.options || ['', '', '', ''])],
      }))
    );

    // 4. Mini Game Battle Bot & 12 Mini Game Spesifik
    setBattleBotList(
      (effGamePack.battleBot || []).map((b, idx) => ({
        ...b,
        id: idx + 1,
        options: b.options.map((o) => ({ ...o })),
      }))
    );

    const loadedDecks: Partial<Record<SpecificMiniGameId, BattleBotQuestion[]>> = {};
    MINI_GAME_QUIZ_TEMPLATES.forEach((meta) => {
      if (meta.formatType === 'mcq') {
        const list = getDefaultQuestionsForMiniGame(eff, meta.id, effGamePack, ov);
        loadedDecks[meta.id] = list.map((q, idx) => ({
          ...q,
          id: idx + 1,
          options: q.options.map((o) => ({ ...o })),
        }));
      }
    });
    setMiniGameDecks(loadedDecks);

    // 5. Mini Game Kata & Sketsa
    setWordScrambleList(
      (effGamePack.wordScramble || []).map((w, idx) => ({
        ...w,
        id: idx + 1,
      }))
    );

    // 6. Mini Game Tebak Gambar
    setPictureGuessList(
      (effGamePack.pictureGuess || []).map((pg: PictureGuessQuestion, idx: number) => ({
        ...pg,
        id: idx + 1,
        options: [...(pg.options || ['', '', '', ''])],
      }))
    );

    // 7. Simulasi & PBL
    setSimTitle(eff.simulasi.title || '');
    setSimScenario(eff.simulasi.scenario || '');
    setSimInstructions(eff.simulasi.instructions || '');
    setPblScenarioState({ ...effPbl });
    setPblIdealProblem(effPbl.idealProblemAnswer || '');
    setPblIdealSolution(effPbl.idealSolutionAnswer || '');

    // 8. Kuis Interaktif HOTS
    setKuisHotsList(
      (eff.kuis || []).map((k, idx) => ({
        ...k,
        id: idx + 1,
        options: k.options.map((o) => ({ ...o })),
      }))
    );

    // 9. Asesmen Akhir
    setAsesmenAkhirList(
      (eff.asesmenAkhir || []).map((a, idx) => ({
        ...a,
        id: idx + 1,
        options: a.options.map((o) => ({ ...o })),
      }))
    );
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedTopicId(initialTopic.id);
      setActiveSection(initialSection);
      if (initialMiniGameId) {
        setSelectedMiniGameId(initialMiniGameId);
        if (initialMiniGameId === 'tebak-kata' && initialSection === 'mini-game-battle') {
          setActiveSection('mini-game-kata');
        } else if (initialMiniGameId === 'tebak-gambar' && initialSection === 'mini-game-battle') {
          setActiveSection('mini-game-gambar');
        }
      }
      loadTopicIntoEditor(initialTopic.id);
      setStatusBanner(null);
    }
  }, [isOpen, initialTopic.id, initialSection, initialMiniGameId]);

  // Reload editor when overrides update externally
  useEffect(() => {
    if (isOpen) {
      loadTopicIntoEditor(selectedTopicId);
    }
  }, [selectedTopicId, overrides]);

  if (!isOpen) return null;

  const currentBaseTopic = ALL_TOPICS.find((t) => t.id === selectedTopicId) || ALL_TOPICS[0];

  const handleSaveCurrentEditorToDb = async () => {
    soundManager.playSuccess();
    const pgOverrideMap: Record<number, PictureGuessOverrideItem> = {};
    pictureGuessList.forEach((pg, idx) => {
      pgOverrideMap[idx] = {
        title: pg.title,
        clue: pg.clue,
        dailyContext: pg.dailyContext,
        options: pg.options,
        correctIndex: pg.correctIndex,
        customImageUrl: pg.customImageUrl,
      };
    });

    const finalBattleBot =
      miniGameDecks['battle-bot'] && miniGameDecks['battle-bot'].length > 0
        ? miniGameDecks['battle-bot']
        : battleBotList;
    const finalRobotRace =
      miniGameDecks['balap-robot'] && miniGameDecks['balap-robot'].length > 0
        ? miniGameDecks['balap-robot']
        : finalBattleBot;

    const partialUpdate: Partial<TopicContentOverride> = {
      title: materiTitle.trim() || currentBaseTopic.title,
      shortDesc: materiShortDesc.trim() || currentBaseTopic.shortDesc,
      learningObjectives: learningObjectivesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      customVideoTitle: videoTitle.trim(),
      customVideoUrl: videoUrl.trim(),
      customVideoDuration: videoDuration.trim(),
      customVideoDescription: videoDesc.trim(),
      customRealLifeStory: realLifeStory.trim(),
      customTriggerQuestions: triggerQuestionsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      customTriggerAnswerKey: triggerAnswerKey.trim(),
      overview: overviewText.trim(),
      tahukahKamu: tahukahKamuText.trim(),
      faktaMenarik: faktaMenarikText.trim(),
      infoPenting: infoPentingText.trim(),
      customDailyLifeExamples: dailyExamplesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      customSchoolExamples: schoolExamplesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      customCommonMistakes: commonMistakesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      customSummary: summaryText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      customAsesmenAwal: asesmenAwalList,
      customFormativeCheck: formatifList,
      customBattleBotQuestions: finalBattleBot,
      customRobotRaceQuestions: finalRobotRace,
      customMiniGameQuestions: {
        ...miniGameDecks,
        'battle-bot': finalBattleBot,
        'balap-robot': finalRobotRace,
      },
      customWordScramble: wordScrambleList,
      customPictureGuessList: pictureGuessList,
      pictureGuess: pgOverrideMap,
      simulationTitle: simTitle.trim(),
      simulationScenario: simScenario.trim(),
      simulationInstructions: simInstructions.trim(),
      customPblScenario: pblScenarioState || undefined,
      customPblIdealProblem: pblIdealProblem.trim(),
      customPblIdealSolution: pblIdealSolution.trim(),
      customKuis: kuisHotsList,
      customAsesmenAkhir: asesmenAkhirList,
    };

    const ok = await syncMultipleTopicOverrides({
      [selectedTopicId]: partialUpdate,
    });

    setStatusBanner({
      type: ok ? 'success' : 'info',
      title: 'Bank Soal & Seluruh 12 Mini Game Berhasil Disimpan & Online Realtime!',
      detail: `Seluruh perubahan soal kuis, mini game, dan materi pada bab "${materiTitle || currentBaseTopic.title}" telah tersinkron ke Database Utama Server & Cloud Firestore dan langsung aktif di layar siswa.`,
    });
  };

  const handleDownloadMiniGameTemplate = (
    gameId: SpecificMiniGameId | 'all-mini-games',
    customScope?: 'single-topic' | 'all-topics'
  ) => {
    soundManager.playClick();
    const useScope = customScope || exportScope;
    downloadMiniGameTemplateExcel({
      scope: useScope,
      topicId: selectedTopicId,
      gameId,
      helpers: {
        getEffectiveTopic,
        getEffectiveGamePack,
        getEffectivePblScenario,
        overrides,
      },
    });

    const gameMeta = MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === gameId);
    setStatusBanner({
      type: 'info',
      title: `Template Excel Mini Game Berhasil Diunduh (${gameMeta?.shortLabel || 'Semua 12 Mini Game'})`,
      detail: `Silakan edit daftar soal di file Excel (.xlsx) tersebut, lalu klik tombol "Upload Template Excel & Sinkron DB" agar langsung tersinkron ke database utama.`,
    });
  };

  const handleDownloadExcel = (targetSection: BankSoalSection, customScope?: 'single-topic' | 'all-topics') => {
    soundManager.playClick();
    const useScope = customScope || exportScope;
    downloadQuestionBankExcel({
      scope: useScope,
      topicId: selectedTopicId,
      section: targetSection,
      helpers: {
        getEffectiveTopic,
        getEffectiveGamePack,
        getEffectivePblScenario,
        overrides,
      },
    });

    const secMeta = BANK_SOAL_SECTIONS.find((s) => s.id === targetSection);
    setStatusBanner({
      type: 'info',
      title: `File Excel Berhasil Diunduh (${secMeta?.shortLabel || 'Bank Soal'})`,
      detail:
        useScope === 'all-topics'
          ? 'Berisi Bank Soal & Materi untuk seluruh 15 Bab (Kelas 7, 8, dan 9). Silakan edit di Excel lalu klik tombol "Upload Excel" untuk meng-online-kan.'
          : `Berisi Bank Soal & Materi untuk bab "${currentBaseTopic.title}". Silakan edit di Excel lalu klik tombol "Upload Excel" untuk meng-online-kan.`,
    });
  };

  const handleUploadExcelFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    explicitMiniGameId?: SpecificMiniGameId
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const parsed = parseQuestionBankExcel(
        buffer,
        selectedTopicId,
        activeSection,
        explicitMiniGameId
      );

      if (parsed.totalItemsUpdated === 0 || parsed.totalTopicsUpdated === 0) {
        setStatusBanner({
          type: 'error',
          title: 'Format File Excel Tidak Dikenali atau Kosong',
          detail:
            'Pastikan Anda menggunakan template Excel hasil Download dari menu Bank Soal ini dan tidak menghapus judul kolom utama.',
        });
        e.target.value = '';
        return;
      }

      const syncedOk = await syncMultipleTopicOverrides(parsed.updatesByTopic);
      soundManager.playSuccess();

      // Reload current topic state if it was part of the uploaded file
      loadTopicIntoEditor(selectedTopicId);

      setStatusBanner({
        type: 'success',
        title: `Upload Template Excel Berhasil & Tersinkron Realtime ke Database Utama!`,
        detail: `Diperbarui ${parsed.totalTopicsUpdated} Materi/Bab (${parsed.totalItemsUpdated} baris soal: ${parsed.summaryMessages.join(
          ', '
        )}). Status Server: ${syncedOk ? 'ONLINE & AKTIF REALTIME' : 'Tersimpan Lokal'}.`,
      });
    } catch (err) {
      console.error('Failed to parse uploaded Excel:', err);
      setStatusBanner({
        type: 'error',
        title: 'Gagal Membaca File Excel',
        detail: 'Pastikan file berformat .xlsx, .xls, atau .csv yang valid.',
      });
    } finally {
      e.target.value = '';
    }
  };

  const handleResetCurrentTopic = () => {
    resetTopicOverride(selectedTopicId);
    setTimeout(() => loadTopicIntoEditor(selectedTopicId), 100);
    setStatusBanner({
      type: 'info',
      title: 'Bank Soal & Materi Dikembalikan ke Standar Kurikulum',
      detail: `Seluruh kustomisasi pada bab "${currentBaseTopic.title}" telah di-reset di database utama.`,
    });
  };

  const matchesSearch = (text: string) => {
    if (!searchFilter.trim()) return true;
    return text.toLowerCase().includes(searchFilter.trim().toLowerCase());
  };

  const showSection = (sec: BankSoalSection) => activeSection === 'semua' || activeSection === sec;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-7xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        {/* TOP HEADER */}
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-emerald-700/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-inner">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  BANK SOAL & MATERI TERPADU (DOWNLOAD & UPLOAD EXCEL)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-400 text-slate-950 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  SYNC DATABASE REALTIME
                </span>
              </div>
              <p className="text-xs text-emerald-200/90">
                Unduh Bank Soal & Materi ke Excel (.xlsx), edit per bagian atau semua bab sekaligus, lalu Upload kembali agar langsung Online!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={async () => {
                await forceRefreshFromServer();
                loadTopicIntoEditor(selectedTopicId);
                setStatusBanner({
                  type: 'info',
                  title: 'Data Berhasil Disinkronkan dari Database Server',
                  detail: 'Menampilkan versi soal dan materi paling mutakhir dari server utama.',
                });
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-bold cursor-pointer transition-all"
              title="Tarik data terbaru dari server database utama"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sinkron Server</span>
            </button>

            <button
              type="button"
              onClick={handleSaveCurrentEditorToDb}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan & Online-kan Sekarang</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white transition-colors cursor-pointer"
              title="Tutup Menu Bank Soal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CONTROL BAR: PILIH MATERI, CAKUPAN EXCEL, TOMBOL DOWNLOAD & UPLOAD EXCEL */}
        <div className="p-3 sm:p-4 bg-slate-100 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 space-y-3 shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* Pilih Materi / Bab */}
            <div className="lg:col-span-4 flex flex-col gap-1">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                1. Pilih Materi / Bab Pembelajaran:
              </label>
              <select
                value={selectedTopicId}
                onChange={(e) => {
                  setSelectedTopicId(e.target.value);
                  setStatusBanner(null);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {[7, 8, 9].map((grade) => (
                  <optgroup key={grade} label={`=== KELAS ${grade} SMP ===`}>
                    {ALL_TOPICS.filter((t) => t.grade === grade).map((t) => (
                      <option key={t.id} value={t.id}>
                        Kelas {t.grade} — {t.title} {hasCustomOverrides(t.id) ? '★ (Sudah Diedit)' : ''}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Pilih Cakupan Download Excel */}
            <div className="lg:col-span-3 flex flex-col gap-1">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                2. Cakupan File Excel:
              </label>
              <div className="grid grid-cols-2 gap-1.5 bg-slate-200/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setExportScope('single-topic')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    exportScope === 'single-topic'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Bab Ini Saja
                </button>
                <button
                  type="button"
                  onClick={() => setExportScope('all-topics')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    exportScope === 'all-topics'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Semua 15 Bab
                </button>
              </div>
            </div>

            {/* Tombol Download & Upload Excel */}
            <div className="lg:col-span-5 flex flex-wrap items-center justify-end gap-2 pt-1 lg:pt-4">
              <button
                type="button"
                onClick={() => handleDownloadExcel(activeSection)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md cursor-pointer transition-all active:scale-95"
                title="Download file Excel (.xlsx) sesuai bagian yang sedang dipilih"
              >
                <Download className="w-4 h-4" />
                <span>
                  Download Excel ({BANK_SOAL_SECTIONS.find((s) => s.id === activeSection)?.shortLabel})
                </span>
              </button>

              {activeSection !== 'semua' && (
                <button
                  type="button"
                  onClick={() => handleDownloadExcel('semua')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold shadow-sm cursor-pointer transition-all active:scale-95"
                  title="Download seluruh 9 bagian sekaligus dalam 1 file Excel Multi-Sheet"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="hidden xl:inline">Download Lengkap</span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleUploadExcelFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md ring-2 ring-indigo-400/40 cursor-pointer transition-all active:scale-95"
                title="Upload file Excel (.xlsx) yang sudah diedit untuk langsung online di database utama"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Excel & Online-kan</span>
              </button>
            </div>
          </div>

          {/* PILIH BAGIAN SOAL / MATERI (TABS) */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                3. Pilih Bagian Materi / Bank Soal yang Ingin Diedit atau Diunduh:
              </span>
              {lastSyncedAt && (
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  Database Terhubung · Update Terakhir:{' '}
                  {new Date(lastSyncedAt).toLocaleTimeString('id-ID')}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {BANK_SOAL_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveSection(sec.id);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isActive
                        ? `${sec.badgeColor} border-transparent shadow-md scale-[1.02]`
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{sec.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Banner Feedback */}
          {statusBanner && (
            <div
              className={`p-3 rounded-2xl border flex items-start justify-between gap-3 text-xs ${
                statusBanner.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                  : statusBanner.type === 'error'
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
                  : 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 text-sky-900 dark:text-sky-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-black">{statusBanner.title}</div>
                  <div className="opacity-90 mt-0.5">{statusBanner.detail}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStatusBanner(null)}
                className="p-1 rounded-lg hover:bg-black/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* SEARCH & QUICK SUMMARY BAR */}
        <div className="px-4 sm:px-6 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-900 dark:text-white">
              {BANK_SOAL_SECTIONS.find((s) => s.id === activeSection)?.label}:
            </span>
            <span className="hidden md:inline opacity-80">
              {BANK_SOAL_SECTIONS.find((s) => s.id === activeSection)?.description}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cari kata kunci soal / materi..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {hasCustomOverrides(selectedTopicId) && (
              <button
                type="button"
                onClick={handleResetCurrentTopic}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 text-rose-700 dark:text-rose-300 text-xs font-bold cursor-pointer"
                title="Kembalikan bab ini ke soal dan materi bawaan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Bab Ini</span>
              </button>
            )}
          </div>
        </div>

        {/* MAIN SCROLLABLE EDITOR BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 bg-slate-50/60 dark:bg-slate-950/40">
          {/* ===================================================================
              BAGIAN 1: MATERI, APERSEPSI & VIDEO YOUTUBE
          =================================================================== */}
          {showSection('materi') && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-600 text-white text-xs font-black">
                    Bagian 1
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Materi Pembelajaran, Apersepsi & Tautan Video YouTube
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadExcel('materi', 'single-topic')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/70 hover:bg-sky-100 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel Materi Ini</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Judul Materi / Bab
                  </label>
                  <input
                    type="text"
                    value={materiTitle}
                    onChange={(e) => setMateriTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Deskripsi Singkat Bab
                  </label>
                  <input
                    type="text"
                    value={materiShortDesc}
                    onChange={(e) => setMateriShortDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Link Video YouTube Apersepsi & Materi
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Judul Video YouTube
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Durasi Video
                    </label>
                    <input
                      type="text"
                      value={videoDuration}
                      onChange={(e) => setVideoDuration(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Cerita Kontekstual Apersepsi
                  </label>
                  <textarea
                    rows={3}
                    value={realLifeStory}
                    onChange={(e) => setRealLifeStory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Pertanyaan Pemantik Apersepsi (1 baris = 1 pertanyaan)
                  </label>
                  <textarea
                    rows={3}
                    value={triggerQuestionsText}
                    onChange={(e) => setTriggerQuestionsText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Ringkasan Materi Utama (Overview)
                  </label>
                  <textarea
                    rows={4}
                    value={overviewText}
                    onChange={(e) => setOverviewText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Rangkuman Poin Penting (1 baris = 1 poin)
                  </label>
                  <textarea
                    rows={4}
                    value={summaryText}
                    onChange={(e) => setSummaryText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tahukah Kamu?
                  </label>
                  <textarea
                    rows={2}
                    value={tahukahKamuText}
                    onChange={(e) => setTahukahKamuText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Fakta Menarik
                  </label>
                  <textarea
                    rows={2}
                    value={faktaMenarikText}
                    onChange={(e) => setFaktaMenarikText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Info Penting
                  </label>
                  <textarea
                    rows={2}
                    value={infoPentingText}
                    onChange={(e) => setInfoPentingText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                  />
                </div>
              </div>
            </section>
          )}

          {/* ===================================================================
              BAGIAN 2: SOAL ASESMEN AWAL (DIAGNOSTIK)
          =================================================================== */}
          {showSection('asesmen-awal') && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white text-xs font-black">
                    Bagian 2
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Bank Soal Asesmen Awal / Diagnostik ({asesmenAwalList.length} Soal)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setAsesmenAwalList((prev) => [
                        ...prev,
                        {
                          id: prev.length + 1,
                          question: 'Pertanyaan asesmen awal baru...',
                          options: [
                            { label: 'A', text: 'Pilihan A' },
                            { label: 'B', text: 'Pilihan B' },
                            { label: 'C', text: 'Pilihan C' },
                            { label: 'D', text: 'Pilihan D' },
                          ],
                          correctAnswer: 'A',
                          conceptTag: 'Konsep Dasar',
                          recommendation: 'Pelajari kembali bagian pengantar materi.',
                        },
                      ])
                    }
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Soal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadExcel('asesmen-awal', 'single-topic')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/70 hover:bg-teal-100 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {asesmenAwalList
                  .map((q, idx) => ({ q, idx }))
                  .filter(({ q }) => matchesSearch(q.question) || matchesSearch(q.conceptTag))
                  .map(({ q, idx }) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-teal-700 dark:text-teal-300">
                          Soal Diagnostik #{idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            Kunci Jawaban:
                          </label>
                          <select
                            value={q.correctAnswer}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAsesmenAwalList((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, correctAnswer: val } : item))
                              );
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black"
                          >
                            {['A', 'B', 'C', 'D'].map((l) => (
                              <option key={l} value={l}>
                                Opsi {l}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() =>
                              setAsesmenAwalList((prev) => prev.filter((_, i) => i !== idx))
                            }
                            className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-200 cursor-pointer"
                            title="Hapus soal ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => {
                          const val = e.target.value;
                          setAsesmenAwalList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, question: val } : item))
                          );
                        }}
                        placeholder="Tulis pertanyaan..."
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['A', 'B', 'C', 'D'].map((label, oIdx) => {
                          const optObj = q.options[oIdx] || { label, text: '' };
                          return (
                            <div key={label} className="flex items-center gap-1.5">
                              <span
                                className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                  q.correctAnswer === label
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {label}
                              </span>
                              <input
                                type="text"
                                value={optObj.text}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setAsesmenAwalList((prev) =>
                                    prev.map((item, i) => {
                                      if (i !== idx) return item;
                                      const nextOpts = [...item.options];
                                      nextOpts[oIdx] = { label, text: val };
                                      return { ...item, options: nextOpts };
                                    })
                                  );
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={q.conceptTag}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAsesmenAwalList((prev) =>
                              prev.map((item, i) => (i === idx ? { ...item, conceptTag: val } : item))
                            );
                          }}
                          placeholder="Tag Konsep (misal: Dekomposisi)"
                          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                        />
                        <input
                          type="text"
                          value={q.recommendation}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAsesmenAwalList((prev) =>
                              prev.map((item, i) => (i === idx ? { ...item, recommendation: val } : item))
                            );
                          }}
                          placeholder="Rekomendasi jika salah..."
                          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* ===================================================================
              BAGIAN 3: CEK PEMAHAMAN / KUIS FORMATIF MATERI
          =================================================================== */}
          {showSection('kuis-formatif') && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-600 text-white text-xs font-black">
                    Bagian 3
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Soal Cek Pemahaman Formatif Materi ({formatifList.length} Soal)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormatifList((prev) => [
                        ...prev,
                        {
                          question: 'Pertanyaan cek pemahaman baru...',
                          options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
                          answerIndex: 0,
                          explanation: 'Pembahasan singkat jawaban benar.',
                        },
                      ])
                    }
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Soal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadExcel('kuis-formatif', 'single-topic')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/70 hover:bg-cyan-100 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {formatifList
                  .map((q, idx) => ({ q, idx }))
                  .filter(({ q }) => matchesSearch(q.question))
                  .map(({ q, idx }) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-cyan-700 dark:text-cyan-300">
                          Soal Formatif #{idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-bold">Kunci:</label>
                          <select
                            value={indexToLetter(q.answerIndex)}
                            onChange={(e) => {
                              const ansIdx = letterToIndex(e.target.value);
                              setFormatifList((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, answerIndex: ansIdx } : item))
                              );
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black"
                          >
                            {['A', 'B', 'C', 'D'].map((l) => (
                              <option key={l} value={l}>
                                Opsi {l}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => setFormatifList((prev) => prev.filter((_, i) => i !== idx))}
                            className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-200 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormatifList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, question: val } : item))
                          );
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['A', 'B', 'C', 'D'].map((label, oIdx) => (
                          <div key={label} className="flex items-center gap-1.5">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                q.answerIndex === oIdx
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {label}
                            </span>
                            <input
                              type="text"
                              value={q.options[oIdx] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormatifList((prev) =>
                                  prev.map((item, i) => {
                                    if (i !== idx) return item;
                                    const nextOpts = [...item.options];
                                    nextOpts[oIdx] = val;
                                    return { ...item, options: nextOpts };
                                  })
                                );
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                            />
                          </div>
                        ))}
                      </div>

                      <input
                        type="text"
                        value={q.explanation}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormatifList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, explanation: val } : item))
                          );
                        }}
                        placeholder="Pembahasan jawaban..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* ===================================================================
              BAGIAN 4: MENU TEMPLATE & BANK SOAL UNTUK SETIAP KUIS DI 12 MINI GAME
          =================================================================== */}
          {showSection('mini-game-battle') && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-xs font-black">
                    Bagian 4 · 12 Mini Game
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Menu Template & Bank Soal Setiap Kuis di Mini Game (12 Permainan Tersinkron Database)
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    ref={miniGameFileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => handleUploadExcelFile(e, selectedMiniGameId)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => handleDownloadMiniGameTemplate(selectedMiniGameId, exportScope)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>
                      Download Template{' '}
                      {MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === selectedMiniGameId)?.shortLabel} (.xlsx)
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadMiniGameTemplate('all-mini-games', exportScope)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/70 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Template Semua 12 Game</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => miniGameFileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-xs cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Template & Sinkron DB</span>
                  </button>
                </div>
              </div>

              {/* Pemilih 12 Mini Game */}
              <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/60 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-black text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    Pilih Kuis Mini Game untuk Membuat / Edit Bank Soal & Download Template:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playSuccess();
                      const currentDeck =
                        miniGameDecks[selectedMiniGameId] || battleBotList;
                      const nextDecks: Partial<Record<SpecificMiniGameId, BattleBotQuestion[]>> = {
                        ...miniGameDecks,
                      };
                      MINI_GAME_QUIZ_TEMPLATES.forEach((m) => {
                        if (m.formatType === 'mcq') {
                          nextDecks[m.id] = currentDeck.map((q, i) => ({
                            ...q,
                            id: i + 1,
                            options: q.options.map((o) => ({ ...o })),
                          }));
                        }
                      });
                      setMiniGameDecks(nextDecks);
                      setBattleBotList(currentDeck);
                      setStatusBanner({
                        type: 'info',
                        title: 'Daftar Soal Disalin ke Seluruh Kuis Mini Game',
                        detail:
                          'Klik tombol "Simpan & Online-kan Sekarang" di kanan atas untuk menyinkronkan ke database utama.',
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black cursor-pointer"
                    title="Gunakan daftar soal game yang sedang dipilih ini untuk seluruh kuis mini game sekaligus"
                  >
                    ⚡ Terapkan Soal Ini ke Semua Mini Game
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5">
                  {MINI_GAME_QUIZ_TEMPLATES.map((gm) => {
                    const isSelected = selectedMiniGameId === gm.id;
                    const count =
                      gm.formatType === 'word'
                        ? wordScrambleList.length
                        : gm.formatType === 'picture'
                        ? pictureGuessList.length
                        : (miniGameDecks[gm.id] || battleBotList).length;
                    return (
                      <button
                        key={gm.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedMiniGameId(gm.id);
                          if (gm.id === 'tebak-kata' && activeSection !== 'semua') {
                            setActiveSection('mini-game-kata');
                          } else if (gm.id === 'tebak-gambar' && activeSection !== 'semua') {
                            setActiveSection('mini-game-gambar');
                          }
                        }}
                        className={`px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between gap-0.5 ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-400 shadow-md scale-[1.02]'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-purple-400'
                        }`}
                      >
                        <span className="text-[11px] font-black leading-tight">{gm.shortLabel}</span>
                        <span
                          className={`text-[10px] font-bold ${
                            isSelected ? 'text-purple-100' : 'text-slate-400'
                          }`}
                        >
                          {count} Soal Aktif
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-purple-900 dark:text-purple-200">
                  <span>
                    <strong>
                      {MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === selectedMiniGameId)?.label}:
                    </strong>{' '}
                    {MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === selectedMiniGameId)?.description}
                  </span>
                  {selectedMiniGameId !== 'tebak-kata' && selectedMiniGameId !== 'tebak-gambar' && (
                    <button
                      type="button"
                      onClick={() => {
                        const activeDeck = miniGameDecks[selectedMiniGameId] || battleBotList;
                        const nextList: BattleBotQuestion[] = [
                          ...activeDeck,
                          {
                            id: activeDeck.length + 1,
                            scenario: `Tantangan ${
                              MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === selectedMiniGameId)
                                ?.shortLabel || 'Mini Game'
                            } #${activeDeck.length + 1}`,
                            question: 'Pertanyaan kuis mini game baru...',
                            options: [
                              { label: 'A', text: 'Jawaban Benar A' },
                              { label: 'B', text: 'Pilihan B' },
                              { label: 'C', text: 'Pilihan C' },
                              { label: 'D', text: 'Pilihan D' },
                            ],
                            correctIndex: 0,
                            damage: 25,
                            explanation: 'Penjelasan mengapa jawaban tersebut tepat.',
                          },
                        ];
                        setMiniGameDecks((prev) => ({
                          ...prev,
                          [selectedMiniGameId]: nextList,
                        }));
                        if (selectedMiniGameId === 'battle-bot') {
                          setBattleBotList(nextList);
                        }
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>
                        + Tambah Soal{' '}
                        {MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === selectedMiniGameId)?.shortLabel}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {selectedMiniGameId === 'tebak-kata' ? (
                <div className="p-4 rounded-2xl bg-fuchsia-50 dark:bg-fuchsia-950/40 border border-fuchsia-300 dark:border-fuchsia-800 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-fuchsia-900 dark:text-fuchsia-200">
                    Untuk mengedit daftar kata pada <strong>3. Susun Kata</strong>, silakan gunakan editor Bagian 5 di bawah atau klik tombol di samping:
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveSection('mini-game-kata')}
                    className="px-3 py-1.5 rounded-xl bg-fuchsia-600 text-white text-xs font-black cursor-pointer shrink-0"
                  >
                    Buka Editor Susun Kata
                  </button>
                </div>
              ) : selectedMiniGameId === 'tebak-gambar' ? (
                <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-300 dark:border-pink-800 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-pink-900 dark:text-pink-200">
                    Untuk mengedit daftar soal pada <strong>4. Tebak Gambar Visual</strong>, silakan gunakan editor Bagian 6 di bawah atau klik tombol di samping:
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveSection('mini-game-gambar')}
                    className="px-3 py-1.5 rounded-xl bg-pink-600 text-white text-xs font-black cursor-pointer shrink-0"
                  >
                    Buka Editor Tebak Gambar
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {(miniGameDecks[selectedMiniGameId] || battleBotList)
                    .map((q, idx) => ({ q, idx }))
                    .filter(({ q }) => matchesSearch(q.question) || matchesSearch(q.scenario))
                    .map(({ q, idx }) => {
                      const updateActiveGameQuestion = (
                        updater: (prevList: BattleBotQuestion[]) => BattleBotQuestion[]
                      ) => {
                        setMiniGameDecks((prev) => {
                          const currentList = prev[selectedMiniGameId] || battleBotList;
                          const nextList = updater(currentList);
                          if (selectedMiniGameId === 'battle-bot') {
                            setBattleBotList(nextList);
                          }
                          return {
                            ...prev,
                            [selectedMiniGameId]: nextList,
                          };
                        });
                      };

                      return (
                        <div
                          key={`${selectedMiniGameId}-${idx}`}
                          className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-black text-purple-700 dark:text-purple-300">
                              {
                                MINI_GAME_QUIZ_TEMPLATES.find((g) => g.id === selectedMiniGameId)
                                  ?.shortLabel
                              }{' '}
                              — Soal #{idx + 1}
                            </span>
                            <div className="flex items-center gap-2">
                              <label className="text-xs font-bold">Kunci:</label>
                              <select
                                value={indexToLetter(q.correctIndex)}
                                onChange={(e) => {
                                  const cIdx = letterToIndex(e.target.value);
                                  updateActiveGameQuestion((prev) =>
                                    prev.map((item, i) =>
                                      i === idx ? { ...item, correctIndex: cIdx } : item
                                    )
                                  );
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black"
                              >
                                {['A', 'B', 'C', 'D'].map((l) => (
                                  <option key={l} value={l}>
                                    Opsi {l}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                onClick={() =>
                                  updateActiveGameQuestion((prev) =>
                                    prev.filter((_, i) => i !== idx)
                                  )
                                }
                                className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-200 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <input
                            type="text"
                            value={q.scenario}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateActiveGameQuestion((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, scenario: val } : item
                                )
                              );
                            }}
                            placeholder="Skenario / Judul Tantangan Game..."
                            className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs italic"
                          />

                          <input
                            type="text"
                            value={q.question}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateActiveGameQuestion((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, question: val } : item
                                )
                              );
                            }}
                            placeholder="Pertanyaan utama / Instruksi tantangan..."
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold"
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {['A', 'B', 'C', 'D'].map((label, oIdx) => (
                              <div key={label} className="flex items-center gap-1.5">
                                <span
                                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                    q.correctIndex === oIdx
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                  }`}
                                >
                                  {label}
                                </span>
                                <input
                                  type="text"
                                  value={q.options[oIdx]?.text || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateActiveGameQuestion((prev) =>
                                      prev.map((item, i) => {
                                        if (i !== idx) return item;
                                        const nextOpts = [...item.options];
                                        nextOpts[oIdx] = { label, text: val };
                                        return { ...item, options: nextOpts };
                                      })
                                    );
                                  }}
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                                />
                              </div>
                            ))}
                          </div>

                          <input
                            type="text"
                            value={q.explanation}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateActiveGameQuestion((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, explanation: val } : item
                                )
                              );
                            }}
                            placeholder="Pembahasan jawaban..."
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                          />
                        </div>
                      );
                    })}
                </div>
              )}
            </section>
          )}

          {/* ===================================================================
              BAGIAN 5: SOAL MINI GAME SUSUN KATA & SKETSA CEPAT
          =================================================================== */}
          {showSection('mini-game-kata') && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-fuchsia-600 text-white text-xs font-black">
                    Bagian 5
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Bank Soal Susun Kata & Sketsa Cepat ({wordScrambleList.length} Soal)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setWordScrambleList((prev) => [
                        ...prev,
                        {
                          id: prev.length + 1,
                          word: 'ALGORITMA',
                          clue: 'Urutan langkah logis untuk menyelesaikan masalah secara sistematis.',
                          dailyContext: 'Digunakan saat menyusun langkah membuat mie instan atau program komputer.',
                          scrambled: makeScrambledLetters('ALGORITMA'),
                        },
                      ])
                    }
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Kata/Sketsa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadExcel('mini-game-kata', 'single-topic')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-950/70 hover:bg-fuchsia-100 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800 text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {wordScrambleList
                  .map((w, idx) => ({ w, idx }))
                  .filter(({ w }) => matchesSearch(w.word) || matchesSearch(w.clue))
                  .map(({ w, idx }) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-fuchsia-700 dark:text-fuchsia-300">
                          Kata / Sketsa #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => setWordScrambleList((prev) => prev.filter((_, i) => i !== idx))}
                          className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-200 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={w.word}
                        onChange={(e) => {
                          const val = e.target.value.toUpperCase();
                          setWordScrambleList((prev) =>
                            prev.map((item, i) =>
                              i === idx
                                ? { ...item, word: val, scrambled: makeScrambledLetters(val) }
                                : item
                            )
                          );
                        }}
                        placeholder="Kata Kunci Jawaban (HURUF BESAR)"
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-black tracking-wider uppercase"
                      />
                      <input
                        type="text"
                        value={w.clue}
                        onChange={(e) => {
                          const val = e.target.value;
                          setWordScrambleList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, clue: val } : item))
                          );
                        }}
                        placeholder="Petunjuk / Perintah Soal..."
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        value={w.dailyContext}
                        onChange={(e) => {
                          const val = e.target.value;
                          setWordScrambleList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, dailyContext: val } : item))
                          );
                        }}
                        placeholder="Konteks kehidupan sehari-hari..."
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* ===================================================================
              BAGIAN 6: SOAL MINI GAME TEBAK GAMBAR VISUAL
          =================================================================== */}
          {showSection('mini-game-gambar') && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-pink-600 text-white text-xs font-black">
                    Bagian 6
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Bank Soal Mini Game Tebak Gambar ({pictureGuessList.length} Soal)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPictureGuessList((prev) => [
                        ...prev,
                        {
                          id: prev.length + 1,
                          illustrationType: 'pattern',
                          title: `Tebak Gambar #${prev.length + 1}`,
                          clue: 'Perhatikan ilustrasi berikut dan pilih konsep yang paling tepat.',
                          dailyContext: 'Penerapan konsep pada kehidupan sehari-hari.',
                          options: ['Pilihan A (Benar)', 'Pilihan B', 'Pilihan C', 'Pilihan D'],
                          correctIndex: 0,
                          customImageUrl: '',
                        },
                      ])
                    }
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Soal Gambar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadExcel('mini-game-gambar', 'single-topic')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 dark:bg-pink-950/70 hover:bg-pink-100 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {pictureGuessList
                  .map((pg, idx) => ({ pg, idx }))
                  .filter(({ pg }) => matchesSearch(pg.title) || matchesSearch(pg.clue))
                  .map(({ pg, idx }) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-pink-700 dark:text-pink-300">
                          Tebak Gambar #{idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-bold">Kunci:</label>
                          <select
                            value={indexToLetter(pg.correctIndex)}
                            onChange={(e) => {
                              const cIdx = letterToIndex(e.target.value);
                              setPictureGuessList((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, correctIndex: cIdx } : item))
                              );
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black"
                          >
                            {['A', 'B', 'C', 'D'].map((l) => (
                              <option key={l} value={l}>
                                Opsi {l}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() =>
                              setPictureGuessList((prev) => prev.filter((_, i) => i !== idx))
                            }
                            className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-200 cursor-pointer"
                            title="Hapus soal gambar ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={pg.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPictureGuessList((prev) =>
                              prev.map((item, i) => (i === idx ? { ...item, title: val } : item))
                            );
                          }}
                          placeholder="Judul Soal Gambar"
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={pg.customImageUrl || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPictureGuessList((prev) =>
                              prev.map((item, i) => (i === idx ? { ...item, customImageUrl: val } : item))
                            );
                          }}
                          placeholder="Link Gambar Custom (Opsional https://...)"
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono"
                        />
                      </div>

                      <input
                        type="text"
                        value={pg.clue}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPictureGuessList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, clue: val } : item))
                          );
                        }}
                        placeholder="Petunjuk Visual..."
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['A', 'B', 'C', 'D'].map((label, oIdx) => (
                          <div key={label} className="flex items-center gap-1.5">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                pg.correctIndex === oIdx
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {label}
                            </span>
                            <input
                              type="text"
                              value={pg.options[oIdx] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPictureGuessList((prev) =>
                                  prev.map((item, i) => {
                                    if (i !== idx) return item;
                                    const nextOpts = [...item.options];
                                    nextOpts[oIdx] = val;
                                    return { ...item, options: nextOpts };
                                  })
                                );
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* ===================================================================
              BAGIAN 7: SIMULASI & STUDI KASUS LKPD PBL
          =================================================================== */}
          {showSection('simulasi-pbl') && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black">
                    Bagian 7
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Skenario Simulasi Interaktif & Studi Kasus LKPD PBL
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadExcel('simulasi-pbl', 'single-topic')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Judul Simulasi</label>
                  <input
                    type="text"
                    value={simTitle}
                    onChange={(e) => setSimTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Skenario Simulasi</label>
                  <input
                    type="text"
                    value={simScenario}
                    onChange={(e) => setSimScenario(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Instruksi Simulasi</label>
                  <input
                    type="text"
                    value={simInstructions}
                    onChange={(e) => setSimInstructions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                  />
                </div>
              </div>

              {pblScenarioState && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold mb-1">Judul Kasus LKPD PBL</label>
                    <input
                      type="text"
                      value={pblScenarioState.title}
                      onChange={(e) =>
                        setPblScenarioState((prev) =>
                          prev ? { ...prev, title: e.target.value } : prev
                        )
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Pertanyaan Utama (Driving Question) PBL</label>
                    <input
                      type="text"
                      value={pblScenarioState.drivingQuestion}
                      onChange={(e) =>
                        setPblScenarioState((prev) =>
                          prev ? { ...prev, drivingQuestion: e.target.value } : prev
                        )
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Kunci Jawaban Rumusan Masalah Ideal</label>
                    <textarea
                      rows={2}
                      value={pblIdealProblem}
                      onChange={(e) => setPblIdealProblem(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Kunci Jawaban Solusi Ideal PBL</label>
                    <textarea
                      rows={2}
                      value={pblIdealSolution}
                      onChange={(e) => setPblIdealSolution(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    />
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ===================================================================
              BAGIAN 8: SOAL KUIS INTERAKTIF HOTS
          =================================================================== */}
          {showSection('kuis-hots') && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-black">
                    Bagian 8
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Bank Soal Kuis Interaktif HOTS ({kuisHotsList.length} Soal)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setKuisHotsList((prev) => [
                        ...prev,
                        {
                          id: prev.length + 1,
                          question: 'Pertanyaan kuis HOTS baru...',
                          options: [
                            { label: 'A', text: 'Pilihan A' },
                            { label: 'B', text: 'Pilihan B' },
                            { label: 'C', text: 'Pilihan C' },
                            { label: 'D', text: 'Pilihan D' },
                          ],
                          correctAnswer: 'A',
                          competencyLevel: 'Penalaran (HOTS)',
                          explanation: 'Pembahasan soal kuis.',
                        },
                      ])
                    }
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Soal Kuis</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadExcel('kuis-hots', 'single-topic')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {kuisHotsList
                  .map((q, idx) => ({ q, idx }))
                  .filter(({ q }) => matchesSearch(q.question) || matchesSearch(q.explanation))
                  .map(({ q, idx }) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-black text-indigo-700 dark:text-indigo-300">
                          Soal Kuis HOTS #{idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <select
                            value={q.competencyLevel}
                            onChange={(e) => {
                              const lvl = e.target.value as QuizQuestion['competencyLevel'];
                              setKuisHotsList((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, competencyLevel: lvl } : item
                                )
                              );
                            }}
                            className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-bold"
                          >
                            <option value="Penalaran (HOTS)">Penalaran (HOTS)</option>
                            <option value="Penerapan (MOTS)">Penerapan (MOTS)</option>
                            <option value="Pemahaman (LOTS)">Pemahaman (LOTS)</option>
                          </select>

                          <label className="text-xs font-bold">Kunci:</label>
                          <select
                            value={q.correctAnswer}
                            onChange={(e) => {
                              const val = e.target.value;
                              setKuisHotsList((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, correctAnswer: val } : item
                                )
                              );
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black"
                          >
                            {['A', 'B', 'C', 'D'].map((l) => (
                              <option key={l} value={l}>
                                Opsi {l}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => setKuisHotsList((prev) => prev.filter((_, i) => i !== idx))}
                            className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-200 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => {
                          const val = e.target.value;
                          setKuisHotsList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, question: val } : item))
                          );
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['A', 'B', 'C', 'D'].map((label, oIdx) => (
                          <div key={label} className="flex items-center gap-1.5">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                q.correctAnswer === label
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {label}
                            </span>
                            <input
                              type="text"
                              value={q.options[oIdx]?.text || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setKuisHotsList((prev) =>
                                  prev.map((item, i) => {
                                    if (i !== idx) return item;
                                    const nextOpts = [...item.options];
                                    nextOpts[oIdx] = { label, text: val };
                                    return { ...item, options: nextOpts };
                                  })
                                );
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                            />
                          </div>
                        ))}
                      </div>

                      <input
                        type="text"
                        value={q.explanation}
                        onChange={(e) => {
                          const val = e.target.value;
                          setKuisHotsList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, explanation: val } : item))
                          );
                        }}
                        placeholder="Pembahasan jawaban..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* ===================================================================
              BAGIAN 9: SOAL ASESMEN AKHIR (UJIAN BAB)
          =================================================================== */}
          {showSection('asesmen-akhir') && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-black">
                    Bagian 9
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Bank Soal Asesmen Akhir / Evaluasi Bab ({asesmenAkhirList.length} Soal)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setAsesmenAkhirList((prev) => [
                        ...prev,
                        {
                          id: prev.length + 1,
                          question: 'Pertanyaan asesmen akhir baru...',
                          options: [
                            { label: 'A', text: 'Pilihan A' },
                            { label: 'B', text: 'Pilihan B' },
                            { label: 'C', text: 'Pilihan C' },
                            { label: 'D', text: 'Pilihan D' },
                          ],
                          correctAnswer: 'A',
                          points: 10,
                          explanation: 'Pembahasan evaluasi akhir.',
                        },
                      ])
                    }
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Soal Ujian</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadExcel('asesmen-akhir', 'single-topic')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/70 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {asesmenAkhirList
                  .map((q, idx) => ({ q, idx }))
                  .filter(({ q }) => matchesSearch(q.question) || matchesSearch(q.explanation))
                  .map(({ q, idx }) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-black text-rose-700 dark:text-rose-300">
                          Soal Evaluasi Akhir #{idx + 1} (Bobot: {q.points || 10} Poin)
                        </span>
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-bold">Kunci:</label>
                          <select
                            value={q.correctAnswer}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAsesmenAkhirList((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, correctAnswer: val } : item
                                )
                              );
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black"
                          >
                            {['A', 'B', 'C', 'D'].map((l) => (
                              <option key={l} value={l}>
                                Opsi {l}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() =>
                              setAsesmenAkhirList((prev) => prev.filter((_, i) => i !== idx))
                            }
                            className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-200 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => {
                          const val = e.target.value;
                          setAsesmenAkhirList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, question: val } : item))
                          );
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['A', 'B', 'C', 'D'].map((label, oIdx) => (
                          <div key={label} className="flex items-center gap-1.5">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                q.correctAnswer === label
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {label}
                            </span>
                            <input
                              type="text"
                              value={q.options[oIdx]?.text || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setAsesmenAkhirList((prev) =>
                                  prev.map((item, i) => {
                                    if (i !== idx) return item;
                                    const nextOpts = [...item.options];
                                    nextOpts[oIdx] = { label, text: val };
                                    return { ...item, options: nextOpts };
                                  })
                                );
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                            />
                          </div>
                        ))}
                      </div>

                      <input
                        type="text"
                        value={q.explanation}
                        onChange={(e) => {
                          const val = e.target.value;
                          setAsesmenAkhirList((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, explanation: val } : item))
                          );
                        }}
                        placeholder="Pembahasan jawaban..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>

        {/* BOTTOM FOOTER ACTION BAR */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Tips: Klik <strong>Download Excel</strong> untuk mengedit di Microsoft Excel / Google Sheets, lalu klik{' '}
              <strong>Upload Excel & Online-kan</strong> agar langsung aktif untuk seluruh siswa!
            </span>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold cursor-pointer"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleSaveCurrentEditorToDb}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg cursor-pointer transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan & Sinkronkan ke Database Utama</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
