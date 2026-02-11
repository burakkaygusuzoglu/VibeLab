import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizQuestion, QuizCategory } from '../data/cards';

type QuizMode = 'chill' | 'versus' | 'team';

interface QuizState {
  mode: QuizMode | null;
  category: QuizCategory | 'mixed' | null;
  currentIndex: number;
  questions: QuizQuestion[];
  score: number;
  player1Score: number;
  player2Score: number;
  currentPlayer: 1 | 2;
  answered: boolean;
  selectedAnswer: number | null;
}

interface QuizContextValue extends QuizState {
  startQuiz: (mode: QuizMode, category: QuizCategory | 'mixed', questions: QuizQuestion[]) => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  mode: null,
  category: null,
  currentIndex: 0,
  questions: [],
  score: 0,
  player1Score: 0,
  player2Score: 0,
  currentPlayer: 1,
  answered: false,
  selectedAnswer: null,
};

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(initialState);

  const startQuiz = (mode: QuizMode, category: QuizCategory | 'mixed', questions: QuizQuestion[]) => {
    setState({
      ...initialState,
      mode,
      category,
      questions,
    });
  };

  const answerQuestion = (answerIndex: number) => {
    if (state.answered) return;

    const currentQuestion = state.questions[state.currentIndex];
    const isCorrect = answerIndex === currentQuestion.correctIndex;

    setState((prev) => {
      const newState = {
        ...prev,
        answered: true,
        selectedAnswer: answerIndex,
      };

      if (prev.mode === 'chill' || prev.mode === 'team') {
        if (isCorrect) {
          newState.score = prev.score + 1;
        }
      } else if (prev.mode === 'versus') {
        if (isCorrect) {
          if (prev.currentPlayer === 1) {
            newState.player1Score = prev.player1Score + 1;
          } else {
            newState.player2Score = prev.player2Score + 1;
          }
        }
      }

      return newState;
    });
  };

  const nextQuestion = () => {
    setState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
      answered: false,
      selectedAnswer: null,
      currentPlayer: prev.mode === 'versus' ? (prev.currentPlayer === 1 ? 2 : 1) : prev.currentPlayer,
    }));
  };

  const resetQuiz = () => {
    setState(initialState);
  };

  return (
    <QuizContext.Provider
      value={{
        ...state,
        startQuiz,
        answerQuestion,
        nextQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};
