import { NavigatorScreenParams } from '@react-navigation/native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { QuizQuestion } from '../data/cards';

export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  Settings: undefined;
  TruthOrDare: undefined;
  DailyChallenge: undefined;
  QuizArenaHome: undefined;
  QuizClassic: {
    questions: QuizQuestion[];
    category: string;
  };
  QuizResults: {
    score: number;
    totalQuestions: number;
    streak: number;
    category: string;
  };
};

export type OnboardingStackParamList = {
  RelationshipStage: undefined;
  MoodSelection: undefined;
  GoalsSelection: undefined;
  OnboardingComplete: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Cards: undefined;
  Favorites: undefined;
  Quiz: undefined;
  CoupleMatch: undefined;
  Settings: undefined;
};

export type QuizStackParamList = {
  QuizHome: undefined;
  QuizMode: { category: string };
  QuizPlay: { mode: string; category: string };
  QuizResult: undefined;
};
