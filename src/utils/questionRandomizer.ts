/**
 * Utility to deterministically shuffle question options so that the correct answer
 * is evenly distributed across A, B, C, D (or 0, 1, 2, 3) instead of always being 'A' / index 0.
 *
 * Deterministic PRNG based on string hashing guarantees:
 * 1. Consistent display and verification within the session.
 * 2. Proper calculation of score and review discussion.
 * 3. Authentic distribution across A, B, C, D for all assessments and games.
 */

import {
  Topic,
  DiagnosticQuestion,
  QuizQuestion,
  FinalAssessmentQuestion,
  FormativeQuizItem
} from '../types/curriculum';
import { TopicGamePack, BattleBotQuestion, PictureGuessQuestion } from '../data/interactiveGamesData';

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const res = [...items];
  for (let i = res.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = Math.floor((s / 2147483647) * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

const LABELS = ['A', 'B', 'C', 'D'];

type AnyStandardQuestion = DiagnosticQuestion | QuizQuestion | FinalAssessmentQuestion;

/**
 * Shuffles standard Assessment / Quiz Question options and updates correctAnswer label
 */
export function shuffleStandardQuestion<T extends AnyStandardQuestion>(
  q: T,
  topicId: string,
  prefix: string
): T {
  if (!q || !q.options || q.options.length < 2) return q;

  // Find the current correct option text
  const currentCorrectOpt = q.options.find((opt: { label: string; text: string }) => opt.label === q.correctAnswer);
  if (!currentCorrectOpt) return q;

  // Shuffle option texts deterministically
  const seed = hashString(`${topicId}-${prefix}-${q.id}-${q.question}`);
  const optionTexts = q.options.map((o: { label: string; text: string }) => o.text);
  const shuffledTexts = shuffleWithSeed(optionTexts, seed);

  // Re-assign labels A, B, C, D
  const newOptions = shuffledTexts.map((text, idx) => ({
    label: LABELS[idx] || String.fromCharCode(65 + idx),
    text
  }));

  // Find where the correct answer text landed
  const newCorrectIndex = shuffledTexts.indexOf(currentCorrectOpt.text);
  const newCorrectLabel = LABELS[newCorrectIndex] || 'A';

  return {
    ...q,
    options: newOptions,
    correctAnswer: newCorrectLabel
  };
}

/**
 * Shuffles formative questions in materi view
 */
export function shuffleFormativeQuestion(
  fq: FormativeQuizItem,
  topicId: string,
  idx: number
): FormativeQuizItem {
  if (!fq || !fq.options || fq.options.length < 2) return fq;

  const correctText = fq.options[fq.answerIndex];
  if (!correctText) return fq;

  const seed = hashString(`${topicId}-formative-${idx}-${fq.question}`);
  const shuffledOptions = shuffleWithSeed(fq.options, seed);
  const newAnswerIndex = shuffledOptions.indexOf(correctText);

  return {
    ...fq,
    options: shuffledOptions,
    answerIndex: newAnswerIndex !== -1 ? newAnswerIndex : 0
  };
}

/**
 * Shuffles Scenario Challenge simulation options
 */
export interface ScenarioOption {
  text: string;
  isCorrect: boolean;
  reason: string;
}

export interface ScenarioItem {
  id: number;
  category?: string;
  title: string;
  story: string;
  question: string;
  options: ScenarioOption[];
}

export function shuffleScenarioItem(item: ScenarioItem, topicId: string): ScenarioItem {
  if (!item || !item.options || item.options.length < 2) return item;
  const seed = hashString(`${topicId}-scenario-${item.id}-${item.question}`);
  const shuffled = shuffleWithSeed(item.options, seed);
  return {
    ...item,
    options: shuffled
  };
}

/**
 * Shuffles Battle Bot game questions
 */
export function shuffleBattleBotQuestion(
  bq: BattleBotQuestion,
  topicId: string
): BattleBotQuestion {
  if (!bq || !bq.options || bq.options.length < 2) return bq;

  const correctOpt = bq.options[bq.correctIndex];
  if (!correctOpt) return bq;

  const seed = hashString(`${topicId}-battlebot-${bq.id}-${bq.question}`);
  const texts = bq.options.map((o) => o.text);
  const shuffledTexts = shuffleWithSeed(texts, seed);

  const newOptions = shuffledTexts.map((text, idx) => ({
    label: LABELS[idx] || String.fromCharCode(65 + idx),
    text
  }));

  const newIndex = shuffledTexts.indexOf(correctOpt.text);

  return {
    ...bq,
    options: newOptions,
    correctIndex: newIndex !== -1 ? newIndex : 0
  };
}

/**
 * Shuffles Picture Guess game questions
 */
export function shufflePictureGuessQuestion(
  pq: PictureGuessQuestion,
  topicId: string
): PictureGuessQuestion {
  if (!pq || !pq.options || pq.options.length < 2) return pq;

  const correctText = pq.options[pq.correctIndex];
  if (!correctText) return pq;

  const seed = hashString(`${topicId}-picguess-${pq.id}-${pq.title}`);
  const shuffled = shuffleWithSeed(pq.options, seed);
  const newIndex = shuffled.indexOf(correctText);

  return {
    ...pq,
    options: shuffled,
    correctIndex: newIndex !== -1 ? newIndex : 0
  };
}

/**
 * Transforms an entire Topic object so that all assessments and formative questions
 * have randomized answer positions (A, B, C, D) across all modules.
 */
export function randomizeTopicQuestions(topic: Topic): Topic {
  return {
    ...topic,
    asesmenAwal: (topic.asesmenAwal || []).map((q) =>
      shuffleStandardQuestion(q, topic.id, 'awal')
    ),
    kuis: (topic.kuis || []).map((q) =>
      shuffleStandardQuestion(q, topic.id, 'kuis')
    ),
    asesmenAkhir: (topic.asesmenAkhir || []).map((q) =>
      shuffleStandardQuestion(q, topic.id, 'akhir')
    ),
    materi: topic.materi
      ? {
          ...topic.materi,
          formativeCheck: (topic.materi.formativeCheck || []).map((fc, idx) =>
            shuffleFormativeQuestion(fc, topic.id, idx)
          )
        }
      : topic.materi
  };
}

export function shuffleRobotRaceQuestion<
  T extends { id: number; question: string; options: { label: string; text: string }[]; correctIndex: number }
>(rq: T, topicId: string): T {
  if (!rq || !rq.options || rq.options.length < 2) return rq;

  const correctOpt = rq.options[rq.correctIndex];
  if (!correctOpt) return rq;

  const seed = hashString(`${topicId}-robotrace-${rq.id}-${rq.question}`);
  const texts = rq.options.map((o) => o.text);
  const shuffledTexts = shuffleWithSeed(texts, seed);

  const newOptions = shuffledTexts.map((text, idx) => ({
    label: LABELS[idx] || String.fromCharCode(65 + idx),
    text
  }));

  const newIndex = shuffledTexts.indexOf(correctOpt.text);

  return {
    ...rq,
    options: newOptions,
    correctIndex: newIndex !== -1 ? newIndex : 0
  };
}

/**
 * Transforms an entire TopicGamePack so that Battle Bot, Robot Race, and Picture Guess
 * have randomized answer choices and correct indices.
 */
export function randomizeTopicGamePack(gamePack: TopicGamePack, topicId: string): TopicGamePack {
  return {
    ...gamePack,
    battleBot: (gamePack.battleBot || []).map((bq) =>
      shuffleBattleBotQuestion(bq, topicId)
    ),
    robotRace: (gamePack.robotRace || []).map((rq) =>
      shuffleRobotRaceQuestion(rq, topicId)
    ),
    pictureGuess: (gamePack.pictureGuess || []).map((pq) =>
      shufflePictureGuessQuestion(pq, topicId)
    )
  };
}
