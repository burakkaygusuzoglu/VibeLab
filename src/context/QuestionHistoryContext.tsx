import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_STORAGE_KEY = '@vibequest_question_history';
const MAX_APPEARANCES = 2;

interface QuestionHistory {
  [questionId: string]: number; // questionId -> appearance count
}

interface ModeHistory {
  [modeName: string]: QuestionHistory;
}

interface QuestionHistoryContextType {
  getQuestionCount: (modeName: string, questionId: string) => number;
  incrementQuestionCount: (modeName: string, questionId: string) => Promise<void>;
  resetModeHistory: (modeName: string) => Promise<void>;
  resetAllHistory: () => Promise<void>;
  canShowQuestion: (modeName: string, questionId: string) => boolean;
  getAvailableQuestions: <T extends { id: string }>(
    modeName: string,
    questions: T[]
  ) => T[];
}

const QuestionHistoryContext = createContext<QuestionHistoryContextType | undefined>(undefined);

export const QuestionHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<ModeHistory>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from AsyncStorage on mount
  React.useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load question history:', error);
      setIsLoaded(true);
    }
  };

  const saveHistory = async (newHistory: ModeHistory) => {
    try {
      await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Failed to save question history:', error);
    }
  };

  const getQuestionCount = (modeName: string, questionId: string): number => {
    return history[modeName]?.[questionId] || 0;
  };

  const incrementQuestionCount = async (modeName: string, questionId: string) => {
    const newHistory = { ...history };
    if (!newHistory[modeName]) {
      newHistory[modeName] = {};
    }
    newHistory[modeName][questionId] = (newHistory[modeName][questionId] || 0) + 1;
    await saveHistory(newHistory);
  };

  const resetModeHistory = async (modeName: string) => {
    const newHistory = { ...history };
    delete newHistory[modeName];
    await saveHistory(newHistory);
  };

  const resetAllHistory = async () => {
    await saveHistory({});
  };

  const canShowQuestion = (modeName: string, questionId: string): boolean => {
    const count = getQuestionCount(modeName, questionId);
    return count < MAX_APPEARANCES;
  };

  const getAvailableQuestions = <T extends { id: string }>(
    modeName: string,
    questions: T[]
  ): T[] => {
    // Group questions by appearance count
    const neverShown: T[] = [];
    const shownOnce: T[] = [];
    const shownTwice: T[] = [];

    questions.forEach(q => {
      const count = getQuestionCount(modeName, q.id);
      if (count === 0) {
        neverShown.push(q);
      } else if (count === 1) {
        shownOnce.push(q);
      } else if (count >= MAX_APPEARANCES) {
        shownTwice.push(q);
      }
    });

    // Shuffle each group
    const shuffle = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Priority: never shown > shown once > shown twice (only if needed)
    const prioritized = [
      ...shuffle(neverShown),
      ...shuffle(shownOnce),
      // Only include twice-shown if we've exhausted other options
      ...(neverShown.length === 0 && shownOnce.length === 0 ? shuffle(shownTwice) : [])
    ];

    return prioritized;
  };

  if (!isLoaded) {
    return null; // or a loading indicator
  }

  return (
    <QuestionHistoryContext.Provider
      value={{
        getQuestionCount,
        incrementQuestionCount,
        resetModeHistory,
        resetAllHistory,
        canShowQuestion,
        getAvailableQuestions,
      }}
    >
      {children}
    </QuestionHistoryContext.Provider>
  );
};

export const useQuestionHistory = () => {
  const context = useContext(QuestionHistoryContext);
  if (!context) {
    throw new Error('useQuestionHistory must be used within QuestionHistoryProvider');
  }
  return context;
};
