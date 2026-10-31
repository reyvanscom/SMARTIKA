export type Grade = 7 | 8 | 9;

export type ModuleType =
  | 'apersepsi'
  | 'asesmen-awal'
  | 'materi'
  | 'simulasi'
  | 'pbl'
  | 'lkpd'
  | 'mini-game'
  | 'kuis'
  | 'asesmen-akhir'
  | 'refleksi'
  | 'sertifikat';

export interface DiagnosticQuestion {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  conceptTag: string;
  recommendation: string;
}

export interface KeyConcept {
  title: string;
  explanation: string;
  bulletPoints: string[];
  iconName?: string;
}

export interface FormativeQuizItem {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface TopicMateri {
  overview: string;
  keyConcepts: KeyConcept[];
  comparisonTable?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  flowDiagram?: {
    title: string;
    steps: { step: number; title: string; desc: string }[];
  };
  dailyLifeExamples: string[];
  schoolExamples: string[];
  tahukahKamu: string;
  faktaMenarik: string;
  infoPenting: string;
  commonMistakes: string[];
  summary: string[];
  formativeCheck: FormativeQuizItem[];
}

export interface SimulationActivity {
  type:
    | 'categorize' // Drag & Drop or click to categorize into 2-3 buckets
    | 'sequence' // Arrange steps into correct computational/logical order
    | 'formula-tester' // Interactive spreadsheet formula tester
    | 'network-connector' // Connect network nodes & test packet transmission
    | 'code-builder' // Visual block puzzle / pseudocode builder
    | 'fact-checker' // Interactive news article claim inspector
    | 'cyber-security'; // Password & malware firewall test
  title: string;
  scenario: string;
  instructions: string;
  data: any;
}

export interface GameQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  clue?: string;
  category?: string;
}

export interface TopicMiniGame {
  type: 'detective' | 'speed-match' | 'fact-or-hoax' | 'code-challenge' | 'flash-quiz';
  title: string;
  description: string;
  questions: GameQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation: string;
  competencyLevel: 'Penalaran (HOTS)' | 'Penerapan (MOTS)' | 'Pemahaman (LOTS)';
}

export interface FinalAssessmentQuestion {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation: string;
  points: number; // typically 10
}

export interface Topic {
  id: string;
  grade: Grade;
  title: string;
  category: string;
  shortDesc: string;
  learningObjectives: string[];
  apersepsi: {
    imagePromptDesc: string;
    videoTitle: string;
    videoDuration: string;
    videoThumbnail: string;
    videoDescription: string;
    defaultVideoUrl: string;
    realLifeStory: string;
    triggerQuestions: string[];
  };
  asesmenAwal: DiagnosticQuestion[];
  materi: TopicMateri;
  simulasi: SimulationActivity;
  miniGame: TopicMiniGame;
  kuis: QuizQuestion[];
  asesmenAkhir: FinalAssessmentQuestion[];
}

export interface PblResult {
  problemTitle: string;
  identifiedCauses: string[];
  investigationNotes: string;
  proposedSolution: string;
  teamRole?: string;
  actionSteps: string[];
  score: number; // 0 - 100
  predicate: string;
  dateCompleted: string;
  studentName?: string;
}

export interface StudentProgress {
  topicId: string;
  completedModules: ModuleType[];
  apersepsiHypothesis?: string;
  diagnosticResults?: {
    score: number;
    answers: Record<number, string>;
    masteredConcepts: string[];
    reviewNeeded: string[];
  };
  simulationCompleted?: boolean;
  simulationScore?: number;
  pblResult?: PblResult;
  quizScore?: number;
  finalAssessment?: {
    score: number; // 0 - 100
    correctCount: number;
    incorrectCount: number;
    predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan';
    dateCompleted: string;
    studentName: string;
    answers: Record<number, string>;
  };
  reflection?: {
    understood: string;
    mostInteresting: string;
    confusing: string;
    newLearned: string;
    actionPlan: string;
    feeling: string;
    savedAt: string;
  };
}

export type ThemeType = 'tech-blue' | 'cyber-purple' | 'nature-green';
export type DisplayMode = 'light' | 'dark';
export type SoundThemeType = 'retro-arcade' | 'cyber-scifi' | 'cartoon-fun' | 'soft-zen';
