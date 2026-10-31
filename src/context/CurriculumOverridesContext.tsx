import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  Topic,
  DiagnosticQuestion,
  KeyConcept,
  FormativeQuizItem,
  QuizQuestion,
  FinalAssessmentQuestion
} from '../types/curriculum';
import { PblScenario } from '../data/pblScenariosData';
import {
  TopicGamePack,
  BattleBotQuestion,
  WordScrambleQuestion,
  PictureGuessQuestion,
  VisualSimulationCard
} from '../data/interactiveGamesData';
import {
  syncTopicOverrideToFirestore,
  deleteTopicOverrideFromFirestore
} from '../firebase';
import { extractYouTubeId } from '../utils/youtubeHelper';

export type SpecificMiniGameId =
  | 'battle-bot'
  | 'balap-robot'
  | 'tebak-kata'
  | 'tebak-gambar'
  | 'tug-of-war'
  | 'bomb-defusal'
  | 'tower-defense'
  | 'whack-a-mole'
  | 'robo-maze'
  | 'spin-wheel'
  | 'cyber-detective'
  | 'sketsa-cepat';

export interface PictureGuessOverrideItem {
  title?: string;
  clue?: string;
  dailyContext?: string;
  customImageUrl?: string;
  options?: string[];
  correctIndex?: number;
}

export interface CustomSimScenarioItem {
  id: string;
  title: string;
  category?: string;
  story: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    reason: string;
  }[];
}

export interface TopicContentOverride {
  // 1. Umum & Materi
  title?: string;
  shortDesc?: string;
  learningObjectives?: string[];
  overview?: string;
  tahukahKamu?: string;
  faktaMenarik?: string;
  infoPenting?: string;
  customKeyConcepts?: KeyConcept[];
  customDailyLifeExamples?: string[];
  customSchoolExamples?: string[];
  customCommonMistakes?: string[];
  customSummary?: string[];
  customFormativeCheck?: FormativeQuizItem[];

  // 2. Apersepsi & Video
  customVideoUrl?: string;
  customVideoTitle?: string;
  customVideoDescription?: string;
  customVideoDuration?: string;
  customApersepsiImageUrl?: string;
  customRealLifeStory?: string;
  customTriggerQuestions?: string[];
  customTriggerAnswerKey?: string;

  // 3. Gambar Tiap Modul (Apersepsi s.d. Sertifikat)
  customMateriImageUrl?: string;
  customInfographicUrl?: string;
  customSimulasiImageUrl?: string;
  customAsesmenAwalImageUrl?: string;
  customPblImageUrl?: string;
  customKuisImageUrl?: string;
  customAsesmenAkhirImageUrl?: string;
  customRefleksiImageUrl?: string;
  customCertLogoUrl?: string;
  moduleBannerImages?: Record<string, string>;

  // 4. Asesmen Awal (5 Soal Diagnostik)
  customAsesmenAwal?: DiagnosticQuestion[];

  // 5. Simulasi & Studi Kasus Kontekstual
  simulationTitle?: string;
  simulationInstructions?: string;
  simulationScenario?: string;
  customVisualCards?: VisualSimulationCard[];
  customSimulationCategories?: string[];
  customScenarioChallenges?: CustomSimScenarioItem[];

  // 6. PBL (Problem-Based Learning) & Kunci Jawaban Ideal
  customPblScenario?: Partial<PblScenario>;
  customPblIdealProblem?: string;
  customPblIdealSolution?: string;

  // 7. Mini Game (Semua 12 Kuis Mini Game Tersinkron ke Database)
  pictureGuess?: Record<number, PictureGuessOverrideItem>;
  customPictureGuessList?: PictureGuessQuestion[];
  customBattleBotQuestions?: BattleBotQuestion[];
  customRobotRaceQuestions?: BattleBotQuestion[];
  customWordScramble?: WordScrambleQuestion[];
  customMiniGameQuestions?: Partial<Record<SpecificMiniGameId, BattleBotQuestion[]>>;

  // 8. Kuis Interaktif HOTS (10 Soal)
  customKuis?: QuizQuestion[];

  // 9. Asesmen Akhir (10 Soal)
  customAsesmenAkhir?: FinalAssessmentQuestion[];

  // 10. Refleksi & Sertifikat
  customRefleksiSubtitle?: string;
  customRefleksiQuestions?: string[];
  customRefleksiTeacherNote?: string;
  customCertSchoolName?: string;
  customCertLocation?: string;
  customCertTitle?: string;
  customCertStatement?: string;
  customCertTeacherName?: string;
  customCertTeacherNip?: string;

  // 11. Universal Inline Live Edit (Teks & Gambar Bagian Manapun di Layar)
  inlineTextMap?: Record<string, string>;
  inlineImageMap?: Record<string, string>;
}

interface CurriculumOverridesContextType {
  overrides: Record<string, TopicContentOverride>;
  getEffectiveTopic: (baseTopic: Topic) => Topic;
  getEffectivePictureGuess: (topicId: string, baseQuestions: any[]) => any[];
  getEffectiveGamePack: (topicId: string, basePack: TopicGamePack) => TopicGamePack;
  getEffectivePblScenario: (topicId: string, baseScenario: PblScenario) => PblScenario & {
    idealProblemAnswer: string;
    idealSolutionAnswer: string;
    customImageUrl?: string;
  };
  saveTopicOverride: (topicId: string, partial: Partial<TopicContentOverride>) => void;
  savePictureGuessItem: (topicId: string, qIndex: number, item: PictureGuessOverrideItem) => void;
  saveInlineText: (topicId: string, originalKey: string, newText: string) => void;
  saveInlineImage: (topicId: string, originalSrcKey: string, newImageUrl: string) => void;
  saveModuleBannerImage: (topicId: string, moduleKey: string, imageUrl: string) => void;
  importOverridesJson: (jsonData: Record<string, TopicContentOverride>) => void;
  syncMultipleTopicOverrides: (
    updatesByTopic: Record<string, Partial<TopicContentOverride>>
  ) => Promise<boolean>;
  forceRefreshFromServer: () => Promise<void>;
  lastSyncedAt: string | null;
  isSyncing: boolean;
  resetTopicOverride: (topicId: string) => void;
  resetAllOverrides: () => void;
  hasCustomOverrides: (topicId: string) => boolean;
}

const STORAGE_KEY = 'smart_info_teacher_overrides';
const REALTIME_CHANNEL_NAME = 'smart_info_realtime_cms_sync';

const CurriculumOverridesContext = createContext<CurriculumOverridesContextType | undefined>(undefined);

export const CurriculumOverridesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overrides, setOverrides] = useState<Record<string, TopicContentOverride>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const overridesRef = useRef<Record<string, TopicContentOverride>>(overrides);
  overridesRef.current = overrides;

  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const hasInitialMigrationRunRef = useRef(false);
  const lastLocalSaveTimestampRef = useRef<number>(0);

  const broadcastRealtimeUpdate = useCallback((updatedOverrides: Record<string, TopicContentOverride>) => {
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel(REALTIME_CHANNEL_NAME);
        bc.postMessage({ type: 'OVERRIDES_UPDATED', overrides: updatedOverrides, ts: Date.now() });
        bc.close();
      }
    } catch {}
  }, []);

  const persistSingleTopicToDatabase = useCallback((topicId: string, fullTopicOverride: TopicContentOverride) => {
    lastLocalSaveTimestampRef.current = Date.now();
    setIsSyncing(true);
    fetch('/api/cms/save-override', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, fullTopicOverride })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.updatedAt) setLastSyncedAt(data.updatedAt);
        else setLastSyncedAt(new Date().toISOString());
      })
      .catch(() => {})
      .finally(() => setIsSyncing(false));

    syncTopicOverrideToFirestore(topicId, {
      title: fullTopicOverride.title || topicId,
      customVideoUrl: fullTopicOverride.customVideoUrl || '',
      customVideoTitle: fullTopicOverride.customVideoTitle || '',
      customMateriImageUrl: fullTopicOverride.customMateriImageUrl || '',
      customInfographicUrl: fullTopicOverride.customInfographicUrl || ''
    }).catch(() => {});
  }, []);

  // Canonical JSON serializer (sorted keys, omits undefined and empty customMiniGameQuestions)
  // so 3.5s background polling never triggers false-positive state updates or mid-game reshuffles
  const canonicalizeOverrides = useCallback((obj: unknown): string => {
    const normalize = (val: unknown): unknown => {
      if (Array.isArray(val)) {
        return val.map(normalize);
      }
      if (val && typeof val === 'object') {
        const record = val as Record<string, unknown>;
        const sortedKeys = Object.keys(record).sort();
        const out: Record<string, unknown> = {};
        for (const k of sortedKeys) {
          const v = record[k];
          if (v === undefined) continue;
          if (
            k === 'customMiniGameQuestions' &&
            v &&
            typeof v === 'object' &&
            Object.keys(v as Record<string, unknown>).length === 0
          ) {
            continue;
          }
          out[k] = normalize(v);
        }
        return out;
      }
      return val;
    };
    try {
      return JSON.stringify(normalize(obj));
    } catch {
      return '';
    }
  }, []);

  // Load & synchronize overrides with the main server database without overwriting recent local edits
  const fetchOverridesFromMainDb = useCallback(async () => {
    // Jangan timpa state lokal jika Guru baru saja menyimpan perubahan dalam 8 detik terakhir
    if (Date.now() - lastLocalSaveTimestampRef.current < 8000) {
      return;
    }

    try {
      const res = await fetch('/api/cms/state');
      if (!res.ok) return;
      const data = await res.json();
      if (!data || !data.ok || typeof data.overrides !== 'object') return;

      // Cek kembali apakah ada penyimpanan lokal saat request sedang berjalan
      if (Date.now() - lastLocalSaveTimestampRef.current < 8000) {
        return;
      }

      const serverOverrides = data.overrides as Record<string, TopicContentOverride>;
      const serverKeys = Object.keys(serverOverrides);

      setOverrides((prevLocal) => {
        const localKeys = Object.keys(prevLocal);
        // Jika database server kosong tetapi di perangkat lokal ada editan Guru, kirim balik ke server agar tidak hilang
        if (serverKeys.length === 0 && localKeys.length > 0 && !hasInitialMigrationRunRef.current) {
          hasInitialMigrationRunRef.current = true;
          fetch('/api/cms/save-override', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ allOverrides: prevLocal })
          }).catch(() => {});
          overridesRef.current = prevLocal;
          return prevLocal;
        }

        hasInitialMigrationRunRef.current = true;

        // Deep-merge per topik antara data lokal dan server agar soal mini-game, materi, & video tidak pernah hilang
        const allTopicIds = new Set([...Object.keys(prevLocal), ...Object.keys(serverOverrides)]);
        const mergedOverrides: Record<string, TopicContentOverride> = {};
        allTopicIds.forEach((tid) => {
          const loc = prevLocal[tid] || {};
          const srv = serverOverrides[tid] || {};
          const mergedCustomMini = {
            ...(loc.customMiniGameQuestions || {}),
            ...(srv.customMiniGameQuestions || {})
          };
          const nextItem: TopicContentOverride = {
            ...loc,
            ...srv
          };
          if (Object.keys(mergedCustomMini).length > 0) {
            nextItem.customMiniGameQuestions = mergedCustomMini;
          } else {
            delete nextItem.customMiniGameQuestions;
          }
          mergedOverrides[tid] = nextItem;
        });

        try {
          Object.keys(mergedOverrides).forEach((tid) => {
            const ovItem = mergedOverrides[tid];
            const ytId = extractYouTubeId(ovItem?.customVideoUrl);
            if (ytId) {
              localStorage.setItem(`custom_video_${tid}`, `https://www.youtube.com/watch?v=${ytId}`);
            }
          });
        } catch {}

        // Hanya update state jika benar-benar ada perubahan isi materi/soal (mencegah re-render saat simpan skor siswa)
        if (canonicalizeOverrides(prevLocal) === canonicalizeOverrides(mergedOverrides)) {
          setLastSyncedAt((prev) => (prev === null && data.updatedAt ? data.updatedAt : prev));
          overridesRef.current = prevLocal;
          return prevLocal;
        }

        if (data.updatedAt) {
          setLastSyncedAt((prev) => (prev === data.updatedAt ? prev : data.updatedAt));
        }

        overridesRef.current = mergedOverrides;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedOverrides));
        } catch {}
        return mergedOverrides;
      });
    } catch {
      // Offline fallback uses existing state
    }
  }, [canonicalizeOverrides]);

  useEffect(() => {
    fetchOverridesFromMainDb();
    const interval = setInterval(fetchOverridesFromMainDb, 3500);
    const onFocus = () => fetchOverridesFromMainDb();
    window.addEventListener('focus', onFocus);

    let bc: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        bc = new BroadcastChannel(REALTIME_CHANNEL_NAME);
        bc.onmessage = (ev) => {
          if (ev?.data?.type === 'OVERRIDES_UPDATED' && ev.data.overrides) {
            let didChange = false;
            setOverrides((prev) => {
              const incoming = ev.data.overrides as Record<string, TopicContentOverride>;
              const allIds = new Set([...Object.keys(prev), ...Object.keys(incoming)]);
              const next: Record<string, TopicContentOverride> = {};
              allIds.forEach((tid) => {
                const mergedCustomMini = {
                  ...(prev[tid]?.customMiniGameQuestions || {}),
                  ...(incoming[tid]?.customMiniGameQuestions || {})
                };
                const item: TopicContentOverride = {
                  ...(prev[tid] || {}),
                  ...(incoming[tid] || {})
                };
                if (Object.keys(mergedCustomMini).length > 0) {
                  item.customMiniGameQuestions = mergedCustomMini;
                } else {
                  delete item.customMiniGameQuestions;
                }
                next[tid] = item;
              });
              if (canonicalizeOverrides(prev) === canonicalizeOverrides(next)) {
                return prev;
              }
              didChange = true;
              overridesRef.current = next;
              return next;
            });
            if (didChange) {
              setLastSyncedAt(new Date().toISOString());
            }
          }
        };
      }
    } catch {}

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
      if (bc) {
        try {
          bc.close();
        } catch {}
      }
    };
  }, [fetchOverridesFromMainDb, canonicalizeOverrides]);

  useEffect(() => {
    overridesRef.current = overrides;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {}
  }, [overrides]);

  // Apply overrides on top of base topic
  const getEffectiveTopic = useCallback((baseTopic: Topic): Topic => {
    const override = overrides[baseTopic.id];
    let legacySavedVideo = '';
    try {
      legacySavedVideo = localStorage.getItem(`custom_video_${baseTopic.id}`) || '';
    } catch {}

    const overrideYtId = extractYouTubeId(override?.customVideoUrl);
    const legacyYtId = extractYouTubeId(legacySavedVideo);
    const defaultYtId = extractYouTubeId(baseTopic.apersepsi.defaultVideoUrl);

    if (legacySavedVideo && !legacyYtId) {
      try {
        localStorage.removeItem(`custom_video_${baseTopic.id}`);
      } catch {}
      legacySavedVideo = '';
    }

    const effectiveVideoUrl = overrideYtId
      ? `https://www.youtube.com/watch?v=${overrideYtId}`
      : legacyYtId
      ? `https://www.youtube.com/watch?v=${legacyYtId}`
      : defaultYtId
      ? `https://www.youtube.com/watch?v=${defaultYtId}`
      : baseTopic.apersepsi.defaultVideoUrl;

    if (!override && !legacyYtId) return baseTopic;

    return {
      ...baseTopic,
      title: override?.title || baseTopic.title,
      shortDesc: override?.shortDesc || baseTopic.shortDesc,
      learningObjectives:
        override?.learningObjectives && override.learningObjectives.length > 0
          ? override.learningObjectives
          : baseTopic.learningObjectives,
      apersepsi: {
        ...baseTopic.apersepsi,
        defaultVideoUrl: effectiveVideoUrl,
        videoTitle: override?.customVideoTitle || baseTopic.apersepsi.videoTitle,
        videoDescription: override?.customVideoDescription || baseTopic.apersepsi.videoDescription,
        videoDuration: override?.customVideoDuration || baseTopic.apersepsi.videoDuration,
        videoThumbnail: override?.customApersepsiImageUrl || baseTopic.apersepsi.videoThumbnail,
        realLifeStory: override?.customRealLifeStory || baseTopic.apersepsi.realLifeStory,
        triggerQuestions:
          override?.customTriggerQuestions && override.customTriggerQuestions.length > 0
            ? override.customTriggerQuestions
            : baseTopic.apersepsi.triggerQuestions
      },
      asesmenAwal:
        override?.customAsesmenAwal && override.customAsesmenAwal.length > 0
          ? override.customAsesmenAwal
          : baseTopic.asesmenAwal,
      materi: {
        ...baseTopic.materi,
        overview: override?.overview || baseTopic.materi.overview,
        tahukahKamu: override?.tahukahKamu || baseTopic.materi.tahukahKamu,
        faktaMenarik: override?.faktaMenarik || baseTopic.materi.faktaMenarik,
        infoPenting: override?.infoPenting || baseTopic.materi.infoPenting,
        keyConcepts:
          override?.customKeyConcepts && override.customKeyConcepts.length > 0
            ? override.customKeyConcepts
            : baseTopic.materi.keyConcepts,
        dailyLifeExamples:
          override?.customDailyLifeExamples && override.customDailyLifeExamples.length > 0
            ? override.customDailyLifeExamples
            : baseTopic.materi.dailyLifeExamples,
        schoolExamples:
          override?.customSchoolExamples && override.customSchoolExamples.length > 0
            ? override.customSchoolExamples
            : baseTopic.materi.schoolExamples,
        commonMistakes:
          override?.customCommonMistakes && override.customCommonMistakes.length > 0
            ? override.customCommonMistakes
            : baseTopic.materi.commonMistakes,
        summary:
          override?.customSummary && override.customSummary.length > 0
            ? override.customSummary
            : baseTopic.materi.summary,
        formativeCheck:
          override?.customFormativeCheck && override.customFormativeCheck.length > 0
            ? override.customFormativeCheck
            : baseTopic.materi.formativeCheck
      },
      simulasi: {
        ...baseTopic.simulasi,
        title: override?.simulationTitle || baseTopic.simulasi?.title || '',
        instructions: override?.simulationInstructions || baseTopic.simulasi?.instructions || '',
        scenario: override?.simulationScenario || baseTopic.simulasi?.scenario || ''
      },
      kuis:
        override?.customKuis && override.customKuis.length > 0
          ? override.customKuis
          : baseTopic.kuis,
      asesmenAkhir:
        override?.customAsesmenAkhir && override.customAsesmenAkhir.length > 0
          ? override.customAsesmenAkhir
          : baseTopic.asesmenAkhir
    };
  }, [overrides]);

  // Apply picture guess questions overrides (supports both full customPictureGuessList and index-based pictureGuess map)
  const getEffectivePictureGuess = useCallback((topicId: string, baseQuestions: any[]): any[] => {
    const topicOv = overrides[topicId];
    if (!topicOv) return baseQuestions;

    if (Array.isArray(topicOv.customPictureGuessList) && topicOv.customPictureGuessList.length > 0) {
      return topicOv.customPictureGuessList.map((pg, idx) => {
        const baseItem = baseQuestions?.[idx] || baseQuestions?.[0] || {};
        return {
          ...baseItem,
          ...pg,
          id: idx + 1,
          illustrationType: pg.illustrationType || baseItem.illustrationType || 'pattern',
          title: pg.title || baseItem.title || `Tebak Gambar #${idx + 1}`,
          clue: pg.clue || baseItem.clue || '',
          dailyContext: pg.dailyContext || baseItem.dailyContext || '',
          customImageUrl: pg.customImageUrl ?? baseItem.customImageUrl ?? '',
          options:
            Array.isArray(pg.options) && pg.options.length > 0
              ? pg.options
              : baseItem.options || ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
          correctIndex: typeof pg.correctIndex === 'number' ? pg.correctIndex : baseItem.correctIndex || 0
        };
      });
    }

    const override = topicOv.pictureGuess;
    if (!override || !Array.isArray(baseQuestions)) return baseQuestions;

    const overrideIndices = Object.keys(override)
      .map((k) => Number(k))
      .filter((n) => !Number.isNaN(n));
    const maxIdx = Math.max(baseQuestions.length - 1, ...overrideIndices);

    const result: any[] = [];
    for (let idx = 0; idx <= maxIdx; idx++) {
      const q = baseQuestions[idx] ||
        baseQuestions[0] || {
          id: idx + 1,
          illustrationType: 'pattern',
          title: `Tebak Gambar #${idx + 1}`,
          clue: '',
          dailyContext: '',
          options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
          correctIndex: 0
        };
      const qOverride = override[idx];
      if (!qOverride) {
        if (idx < baseQuestions.length) result.push(q);
        continue;
      }
      result.push({
        ...q,
        id: idx + 1,
        title: qOverride.title || q.title,
        clue: qOverride.clue || q.clue,
        dailyContext: qOverride.dailyContext || q.dailyContext,
        customImageUrl: qOverride.customImageUrl || q.customImageUrl,
        options: qOverride.options && qOverride.options.length > 0 ? qOverride.options : q.options,
        correctIndex: qOverride.correctIndex !== undefined ? qOverride.correctIndex : q.correctIndex
      });
    }
    return result;
  }, [overrides]);

  // Apply full game pack overrides (BattleBot, RobotRace, WordScramble, PictureGuess, VisualSimulationCards)
  const getEffectiveGamePack = useCallback((topicId: string, basePack: TopicGamePack): TopicGamePack => {
    const ov = overrides[topicId];
    if (!ov) return basePack;

    const effectiveBattleBot =
      ov.customMiniGameQuestions?.['battle-bot'] && ov.customMiniGameQuestions['battle-bot'].length > 0
        ? ov.customMiniGameQuestions['battle-bot']
        : ov.customBattleBotQuestions && ov.customBattleBotQuestions.length > 0
        ? ov.customBattleBotQuestions
        : basePack.battleBot;

    const customRaceSource =
      ov.customMiniGameQuestions?.['balap-robot'] && ov.customMiniGameQuestions['balap-robot'].length > 0
        ? ov.customMiniGameQuestions['balap-robot']
        : ov.customRobotRaceQuestions && ov.customRobotRaceQuestions.length > 0
        ? ov.customRobotRaceQuestions
        : ov.customBattleBotQuestions && ov.customBattleBotQuestions.length > 0
        ? ov.customBattleBotQuestions
        : null;

    const effectiveRobotRace = customRaceSource
      ? customRaceSource.map((q, idx) => ({
          id: idx + 1,
          sectorName: `Sektor Sirkuit ${idx + 1}`,
          scenario: q.scenario || 'Sirkuit Balap Siber',
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          boostPower: q.damage || 25,
          explanation: q.explanation || ''
        }))
      : basePack.robotRace;

    return {
      ...basePack,
      battleBot: effectiveBattleBot,
      robotRace: effectiveRobotRace,
      wordScramble:
        ov.customWordScramble && ov.customWordScramble.length > 0
          ? ov.customWordScramble
          : basePack.wordScramble,
      pictureGuess: getEffectivePictureGuess(topicId, basePack.pictureGuess),
      visualSimulationCards:
        ov.customVisualCards && ov.customVisualCards.length > 0
          ? ov.customVisualCards
          : basePack.visualSimulationCards,
      simulationCategories:
        ov.customSimulationCategories && ov.customSimulationCategories.length > 0
          ? ov.customSimulationCategories
          : basePack.simulationCategories
    };
  }, [overrides, getEffectivePictureGuess]);

  // Apply PBL Scenario overrides + Ideal Answer Keys
  const getEffectivePblScenario = useCallback((topicId: string, baseScenario: PblScenario) => {
    const ov = overrides[topicId];
    const pblOv = ov?.customPblScenario || {};

    const merged: PblScenario = {
      ...baseScenario,
      title: pblOv.title || baseScenario.title,
      location: pblOv.location || baseScenario.location,
      urgencyLevel: pblOv.urgencyLevel || baseScenario.urgencyLevel,
      headline: pblOv.headline || baseScenario.headline,
      contextStory: pblOv.contextStory || baseScenario.contextStory,
      drivingQuestion: pblOv.drivingQuestion || baseScenario.drivingQuestion,
      deliverableName: pblOv.deliverableName || baseScenario.deliverableName,
      reflectionPrompt: pblOv.reflectionPrompt || baseScenario.reflectionPrompt,
      whatWeKnow:
        Array.isArray(pblOv.whatWeKnow) && pblOv.whatWeKnow.length > 0
          ? pblOv.whatWeKnow
          : baseScenario.whatWeKnow,
      whatWeNeedToLearn:
        Array.isArray(pblOv.whatWeNeedToLearn) && pblOv.whatWeNeedToLearn.length > 0
          ? pblOv.whatWeNeedToLearn
          : baseScenario.whatWeNeedToLearn,
      clues:
        Array.isArray(pblOv.clues) && pblOv.clues.length > 0
          ? pblOv.clues
          : baseScenario.clues,
      potentialCauses:
        Array.isArray(pblOv.potentialCauses) && pblOv.potentialCauses.length > 0
          ? pblOv.potentialCauses
          : baseScenario.potentialCauses,
      recommendedActions:
        Array.isArray(pblOv.recommendedActions) && pblOv.recommendedActions.length > 0
          ? pblOv.recommendedActions
          : baseScenario.recommendedActions
    };

    const rootCauseTexts = (merged.potentialCauses || [])
      .filter((c) => c && c.isRootCause)
      .map((c) => c.text)
      .join('; ');

    const recommendedActionTexts = (merged.recommendedActions || [])
      .map((a, i) => `${i + 1}. ${a?.title || ''} (${a?.desc || ''})`)
      .join(' ');

    const defaultIdealProblem = `Masalah utama pada kasus "${merged.title}" di ${merged.location} adalah: ${merged.drivingQuestion} Penyebab intinya meliputi: ${rootCauseTexts}.`;
    const defaultIdealSolution = `Solusi terpadu yang seharusnya dilakukan kelompok untuk menghasilkan "${merged.deliverableName}": ${recommendedActionTexts}`;

    return {
      ...merged,
      idealProblemAnswer: ov?.customPblIdealProblem || defaultIdealProblem,
      idealSolutionAnswer: ov?.customPblIdealSolution || defaultIdealSolution,
      customImageUrl: ov?.customPblImageUrl || ov?.moduleBannerImages?.['pbl']
    };
  }, [overrides]);

  const saveTopicOverride = (topicId: string, partial: Partial<TopicContentOverride>) => {
    const normalizedPartial = { ...partial };
    if (normalizedPartial.customVideoUrl !== undefined) {
      const rawUrl = normalizedPartial.customVideoUrl.trim();
      const cleanId = extractYouTubeId(rawUrl);
      const finalUrl = cleanId ? `https://www.youtube.com/watch?v=${cleanId}` : rawUrl;
      normalizedPartial.customVideoUrl = finalUrl;
      try {
        if (cleanId) {
          localStorage.setItem(`custom_video_${topicId}`, finalUrl);
        } else if (!rawUrl) {
          localStorage.removeItem(`custom_video_${topicId}`);
        }
      } catch {}
    }

    const prev = overridesRef.current;
    const prevTopic = prev[topicId] || {};
    const updatedTopic: TopicContentOverride = {
      ...prevTopic,
      ...normalizedPartial,
      customMiniGameQuestions: normalizedPartial.customMiniGameQuestions
        ? {
            ...(prevTopic.customMiniGameQuestions || {}),
            ...normalizedPartial.customMiniGameQuestions
          }
        : prevTopic.customMiniGameQuestions
    };
    const next = {
      ...prev,
      [topicId]: updatedTopic
    };

    overridesRef.current = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setOverrides(next);
    broadcastRealtimeUpdate(next);
    persistSingleTopicToDatabase(topicId, updatedTopic);
  };

  const savePictureGuessItem = (topicId: string, qIndex: number, item: PictureGuessOverrideItem) => {
    const prev = overridesRef.current;
    const currentTopic = prev[topicId] || {};
    const currentPg = currentTopic.pictureGuess || {};
    const updatedTopic: TopicContentOverride = {
      ...currentTopic,
      pictureGuess: {
        ...currentPg,
        [qIndex]: {
          ...(currentPg[qIndex] || {}),
          ...item
        }
      }
    };
    const next = {
      ...prev,
      [topicId]: updatedTopic
    };
    overridesRef.current = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setOverrides(next);
    broadcastRealtimeUpdate(next);
    persistSingleTopicToDatabase(topicId, updatedTopic);
  };

  const saveInlineText = (topicId: string, originalKey: string, newText: string) => {
    const prev = overridesRef.current;
    const currentTopic = prev[topicId] || {};
    const currentMap = currentTopic.inlineTextMap || {};
    const updatedTopic: TopicContentOverride = {
      ...currentTopic,
      inlineTextMap: {
        ...currentMap,
        [originalKey]: newText
      }
    };
    const next = {
      ...prev,
      [topicId]: updatedTopic
    };
    overridesRef.current = next;
    setOverrides(next);
    broadcastRealtimeUpdate(next);
    persistSingleTopicToDatabase(topicId, updatedTopic);
  };

  const saveInlineImage = (topicId: string, originalSrcKey: string, newImageUrl: string) => {
    const prev = overridesRef.current;
    const currentTopic = prev[topicId] || {};
    const currentMap = currentTopic.inlineImageMap || {};
    const updatedTopic: TopicContentOverride = {
      ...currentTopic,
      inlineImageMap: {
        ...currentMap,
        [originalSrcKey]: newImageUrl
      }
    };
    const next = {
      ...prev,
      [topicId]: updatedTopic
    };
    overridesRef.current = next;
    setOverrides(next);
    broadcastRealtimeUpdate(next);
    persistSingleTopicToDatabase(topicId, updatedTopic);
  };

  const saveModuleBannerImage = (topicId: string, moduleKey: string, imageUrl: string) => {
    const prev = overridesRef.current;
    const currentTopic = prev[topicId] || {};
    const currentBanners = currentTopic.moduleBannerImages || {};
    const updatedTopic: TopicContentOverride = {
      ...currentTopic,
      moduleBannerImages: {
        ...currentBanners,
        [moduleKey]: imageUrl
      }
    };
    const next = {
      ...prev,
      [topicId]: updatedTopic
    };
    overridesRef.current = next;
    setOverrides(next);
    broadcastRealtimeUpdate(next);
    persistSingleTopicToDatabase(topicId, updatedTopic);
  };

  const importOverridesJson = (jsonData: Record<string, TopicContentOverride>) => {
    if (!jsonData || typeof jsonData !== 'object') return;
    lastLocalSaveTimestampRef.current = Date.now();
    const prev = overridesRef.current;
    const next = {
      ...prev,
      ...jsonData
    };
    overridesRef.current = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setOverrides(next);
    broadcastRealtimeUpdate(next);
    fetch('/api/cms/save-override', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ allOverrides: next })
    })
      .then((res) => res.json())
      .then((d) => {
        if (d?.updatedAt) setLastSyncedAt(d.updatedAt);
      })
      .catch(() => {});
  };

  const syncMultipleTopicOverrides = async (
    updatesByTopic: Record<string, Partial<TopicContentOverride>>
  ): Promise<boolean> => {
    if (!updatesByTopic || typeof updatesByTopic !== 'object') return false;
    lastLocalSaveTimestampRef.current = Date.now();
    setIsSyncing(true);

    // Hitung state gabungan secara sinkron dari overridesRef.current agar tidak pernah kosong karena batching React
    const prev = overridesRef.current;
    const mergedGlobal: Record<string, TopicContentOverride> = { ...prev };

    Object.entries(updatesByTopic).forEach(([tid, partial]) => {
      const normalizedPartial = { ...partial };
      if (normalizedPartial.customVideoUrl !== undefined) {
        const rawUrl = normalizedPartial.customVideoUrl.trim();
        const cleanId = extractYouTubeId(rawUrl);
        const finalUrl = cleanId ? `https://www.youtube.com/watch?v=${cleanId}` : rawUrl;
        normalizedPartial.customVideoUrl = finalUrl;
        try {
          if (cleanId) {
            localStorage.setItem(`custom_video_${tid}`, finalUrl);
          } else if (!rawUrl) {
            localStorage.removeItem(`custom_video_${tid}`);
          }
        } catch {}
      }
      const existingTopic = mergedGlobal[tid] || {};
      mergedGlobal[tid] = {
        ...existingTopic,
        ...normalizedPartial,
        customMiniGameQuestions: normalizedPartial.customMiniGameQuestions
          ? {
              ...(existingTopic.customMiniGameQuestions || {}),
              ...normalizedPartial.customMiniGameQuestions
            }
          : existingTopic.customMiniGameQuestions
      };
    });

    overridesRef.current = mergedGlobal;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedGlobal));
    } catch {}
    setOverrides(mergedGlobal);
    broadcastRealtimeUpdate(mergedGlobal);

    try {
      const res = await fetch('/api/cms/save-override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allOverrides: mergedGlobal })
      });
      if (res.ok) {
        const data = await res.json();
        setLastSyncedAt(data?.updatedAt || new Date().toISOString());
      }

      // Sync each updated topic summary to Firestore
      Object.entries(updatesByTopic).forEach(([tid]) => {
        const fullOv = mergedGlobal[tid];
        if (fullOv) {
          syncTopicOverrideToFirestore(tid, {
            title: fullOv.title || tid,
            customVideoUrl: fullOv.customVideoUrl || '',
            customVideoTitle: fullOv.customVideoTitle || '',
            customMateriImageUrl: fullOv.customMateriImageUrl || '',
            customInfographicUrl: fullOv.customInfographicUrl || ''
          }).catch(() => {});
        }
      });
      setIsSyncing(false);
      return true;
    } catch {
      setIsSyncing(false);
      return false;
    }
  };

  const forceRefreshFromServer = async (): Promise<void> => {
    lastLocalSaveTimestampRef.current = 0;
    await fetchOverridesFromMainDb();
  };

  const resetTopicOverride = (topicId: string) => {
    try {
      localStorage.removeItem(`custom_video_${topicId}`);
    } catch {}
    lastLocalSaveTimestampRef.current = Date.now();
    const prev = overridesRef.current;
    const next = { ...prev };
    delete next[topicId];
    overridesRef.current = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setOverrides(next);
    broadcastRealtimeUpdate(next);
    fetch('/api/cms/reset-override', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId })
    }).catch(() => {});
    deleteTopicOverrideFromFirestore(topicId).catch(() => {});
  };

  const resetAllOverrides = () => {
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith('custom_video_')) {
          localStorage.removeItem(k);
        }
      });
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    lastLocalSaveTimestampRef.current = Date.now();
    overridesRef.current = {};
    setOverrides({});
    broadcastRealtimeUpdate({});
    fetch('/api/cms/reset-override', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetAll: true })
    }).catch(() => {});
  };

  const hasCustomOverrides = (topicId: string) => {
    let hasLegacyVideo = false;
    try {
      hasLegacyVideo = Boolean(localStorage.getItem(`custom_video_${topicId}`));
    } catch {}
    return hasLegacyVideo || Boolean(overrides[topicId] && Object.keys(overrides[topicId]).length > 0);
  };

  return (
    <CurriculumOverridesContext.Provider
      value={{
        overrides,
        getEffectiveTopic,
        getEffectivePictureGuess,
        getEffectiveGamePack,
        getEffectivePblScenario,
        saveTopicOverride,
        savePictureGuessItem,
        saveInlineText,
        saveInlineImage,
        saveModuleBannerImage,
        importOverridesJson,
        syncMultipleTopicOverrides,
        forceRefreshFromServer,
        lastSyncedAt,
        isSyncing,
        resetTopicOverride,
        resetAllOverrides,
        hasCustomOverrides
      }}
    >
      {children}
    </CurriculumOverridesContext.Provider>
  );
};

export const useCurriculumOverrides = (): CurriculumOverridesContextType => {
  const context = useContext(CurriculumOverridesContext);
  if (!context) {
    throw new Error('useCurriculumOverrides must be used within a CurriculumOverridesProvider');
  }
  return context;
};
