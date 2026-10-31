import {
  DiagnosticQuestion,
  QuizQuestion,
  FinalAssessmentQuestion,
  FormativeQuizItem,
  Topic
} from '../types/curriculum';

/**
 * Robust Mulberry32 pseudo-random number generator for uniform seeded distribution.
 */
export function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Computes a 32-bit integer hash from any string.
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return hash >>> 0;
}

/**
 * Shuffles an array deterministically given a seed using Fisher-Yates algorithm.
 */
export function seededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array];
  const rng = mulberry32(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffles a multiple choice question with options labeled A, B, C, D...
 * and updates correctAnswer to point to the new location of the original correct option.
 */
export function shuffleMultipleChoiceQuestion<T extends {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
}>(q: T, seedModifier = 0): T {
  if (!q.options || q.options.length <= 1) return q;

  // Locate original correct text using the original letter
  const correctOpt = q.options.find(
    (o) => o.label.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()
  );
  const correctText = correctOpt ? correctOpt.text : q.options[0]?.text;

  // Generate seed from question text, id, and modifier
  const baseSeed = (hashString(q.question) ^ (q.id * 2654435761)) + seedModifier * 7919;
  const shuffledItems = seededShuffle(q.options, baseSeed);

  // Reassign clean labels: A, B, C, D...
  const newOptions = shuffledItems.map((item, idx) => ({
    label: String.fromCharCode(65 + idx),
    text: item.text
  }));

  // Find the new letter for the correct text
  const newCorrectOpt = newOptions.find((o) => o.text === correctText);
  const newCorrectAnswer = newCorrectOpt ? newCorrectOpt.label : newOptions[0].label;

  return {
    ...q,
    options: newOptions,
    correctAnswer: newCorrectAnswer
  };
}

/**
 * Shuffles formative check questions (where options is string[] and answer is answerIndex).
 */
export function shuffleFormativeItem(fc: FormativeQuizItem, seedModifier = 0): FormativeQuizItem {
  if (!fc.options || fc.options.length <= 1) return fc;
  const correctText = fc.options[fc.answerIndex] ?? fc.options[0];
  const baseSeed = (hashString(fc.question) ^ 0x9e3779b9) + seedModifier * 3889;
  const shuffledOptions = seededShuffle(fc.options, baseSeed);
  const newAnswerIndex = shuffledOptions.indexOf(correctText);

  return {
    ...fc,
    options: shuffledOptions,
    answerIndex: newAnswerIndex >= 0 ? newAnswerIndex : 0
  };
}

/**
 * Shuffles options for simulation scenarios (where options has isCorrect: boolean).
 */
export function shuffleScenarioOptions<T extends {
  options: { text: string; isCorrect: boolean; reason: string }[];
}>(scenario: T, seedModifier = 0): T {
  if (!scenario.options || scenario.options.length <= 1) return scenario;
  const texts = scenario.options.map((o) => o.text).join('||');
  const baseSeed = (hashString(texts) ^ 0x85ebca6b) + seedModifier * 104729;
  const shuffled = seededShuffle(scenario.options, baseSeed);
  return {
    ...scenario,
    options: shuffled
  };
}

/**
 * Shuffles BattleBot questions in mini-games.
 */
export function shuffleBattleBotQuestion<T extends {
  id: number;
  question: string;
  scenario: string;
  options: { label: string; text: string }[];
  correctIndex: number;
}>(q: T, seedModifier = 0): T {
  if (!q.options || q.options.length <= 1) return q;
  const correctText = q.options[q.correctIndex]?.text ?? q.options[0]?.text;
  const baseSeed = (hashString(q.question + q.scenario) ^ (q.id * 3266489917)) + seedModifier * 1013;
  const shuffled = seededShuffle(q.options, baseSeed);
  const newCorrectIndex = shuffled.findIndex((o) => o.text === correctText);
  const newOptions = shuffled.map((item, idx) => ({
    label: String.fromCharCode(65 + idx),
    text: item.text
  }));

  return {
    ...q,
    options: newOptions,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0
  };
}

/**
 * Shuffles PictureGuess questions in mini-games.
 */
export function shufflePictureGuessQuestion<T extends {
  id: number;
  title: string;
  clue: string;
  options: string[];
  correctIndex: number;
}>(q: T, seedModifier = 0): T {
  if (!q.options || q.options.length <= 1) return q;
  const correctText = q.options[q.correctIndex] ?? q.options[0];
  const baseSeed = (hashString(q.title + q.clue) ^ (q.id * 2246822519)) + seedModifier * 701;
  const shuffled = seededShuffle(q.options, baseSeed);
  const newCorrectIndex = shuffled.indexOf(correctText);

  return {
    ...q,
    options: shuffled,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0
  };
}

/**
 * Randomizes questions across a whole Topic (asesmenAwal, kuis, asesmenAkhir, formativeCheck).
 */
export function randomizeTopicQuestions(topic: Topic, seedModifier = 0): Topic {
  return {
    ...topic,
    asesmenAwal: (topic.asesmenAwal || []).map((q) =>
      shuffleMultipleChoiceQuestion(q as DiagnosticQuestion, seedModifier)
    ),
    kuis: (topic.kuis || []).map((q) =>
      shuffleMultipleChoiceQuestion(q as QuizQuestion, seedModifier)
    ),
    asesmenAkhir: (topic.asesmenAkhir || []).map((q) =>
      shuffleMultipleChoiceQuestion(q as FinalAssessmentQuestion, seedModifier)
    ),
    materi: {
      ...topic.materi,
      formativeCheck: (topic.materi?.formativeCheck || []).map((fc) =>
        shuffleFormativeItem(fc, seedModifier)
      )
    }
  };
}
