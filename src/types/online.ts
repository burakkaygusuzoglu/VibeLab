// Online multiplayer type definitions for Firebase/Firestore

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  avatar?: string;
  coupleId?: string; // Linked couple ID
  createdAt: Date;
  lastActive: Date;
  stats: UserStats;
}

export interface UserStats {
  totalGamesPlayed: number;
  quizWins: number;
  quizLosses: number;
  truthOrDareCompleted: number;
  favoriteCards: number;
  streakDays: number;
  longestStreak: number;
  achievements: string[]; // Achievement IDs
}

export interface CoupleProfile {
  id: string;
  player1Id: string;
  player2Id: string;
  coupleCode: string; // 6-digit code for joining
  relationshipStartDate?: Date;
  createdAt: Date;
  stats: CoupleStats;
  settings: CoupleSettings;
}

export interface CoupleStats {
  totalCardsPlayed: number;
  totalQuizzes: number;
  truthOrDareSessions: number;
  favoriteSharedCards: string[]; // Card IDs both favorited
  achievements: string[]; // Couple achievement IDs
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate?: Date;
}

export interface CoupleSettings {
  allowNotifications: boolean;
  dailyChallengeTime?: string; // HH:MM format
  intensityLevel: 1 | 2 | 3;
  enabledCategories: string[];
  enabledTypes: string[];
}

export interface GameSession {
  id: string;
  coupleId: string;
  gameType: 'cards' | 'quiz' | 'truthordare' | 'couplematch';
  createdAt: Date;
  completedAt?: Date;
  player1Id: string;
  player2Id: string;
  data: QuizSessionData | TruthOrDareSessionData | CoupleMatchSessionData;
}

export interface QuizSessionData {
  mode: 'chill' | 'versus' | 'team';
  category: string;
  questions: QuizQuestionResult[];
  player1Score: number;
  player2Score: number;
  winner?: string; // User ID
}

export interface QuizQuestionResult {
  questionId: string;
  question: string;
  correctAnswer: string;
  player1Answer?: string;
  player2Answer?: string;
  player1Correct: boolean;
  player2Correct: boolean;
  timeToAnswer: number; // milliseconds
}

export interface TruthOrDareSessionData {
  mode: 'truth' | 'dare' | 'mixed';
  cardsPlayed: TruthOrDareCard[];
  completedCount: number;
  skippedCount: number;
}

export interface TruthOrDareCard {
  cardId: string;
  type: 'truth' | 'dare';
  text: string;
  completed: boolean;
  playedBy: string; // User ID
  playedAt: Date;
}

export interface CoupleMatchSessionData {
  questions: CoupleMatchQuestion[];
  matchPercentage: number;
  matchingAnswers: number;
  totalQuestions: number;
}

export interface CoupleMatchQuestion {
  questionId: string;
  question: string;
  player1Answer: string;
  player2Answer: string;
  isMatch: boolean;
}

export interface DailyChallenge {
  id: string;
  date: string; // YYYY-MM-DD
  cardId: string;
  type: 'card' | 'quiz' | 'truthordare';
  title: string;
  description: string;
  points: number;
  completions: DailyChallengeCompletion[];
}

export interface DailyChallengeCompletion {
  coupleId: string;
  completedAt: Date;
  timeToComplete: number; // milliseconds
  earnedPoints: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji
  type: 'user' | 'couple';
  requirement: string;
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Leaderboard {
  id: string;
  type: 'global' | 'weekly' | 'monthly';
  period: string; // YYYY-MM-DD
  entries: LeaderboardEntry[];
  updatedAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  coupleId: string;
  player1Name: string;
  player2Name: string;
  score: number;
  streak: number;
  achievements: number;
}

// Real-time multiplayer session
export interface LiveSession {
  id: string;
  coupleId: string;
  player1Id: string;
  player2Id: string;
  player1Ready: boolean;
  player2Ready: boolean;
  gameType: 'quiz' | 'truthordare' | 'couplematch';
  status: 'waiting' | 'ready' | 'playing' | 'finished';
  currentTurn?: string; // User ID whose turn it is
  createdAt: Date;
  expiresAt: Date;
}

// Notifications
export interface Notification {
  id: string;
  userId: string;
  type: 'daily_challenge' | 'partner_played' | 'achievement' | 'streak_reminder' | 'couple_request';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

// Couple connection request
export interface CoupleRequest {
  id: string;
  fromUserId: string;
  fromUsername: string;
  toUserId: string;
  toUsername: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  respondedAt?: Date;
}
