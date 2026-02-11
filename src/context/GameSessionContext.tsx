import React, { createContext, useContext, useState, ReactNode } from 'react';

type SwipeDirection = 'left' | 'right';

interface GameSessionContextType {
  likedCards: string[];
  passedCards: string[];
  handleSwipe: (cardId: string, direction: SwipeDirection) => void;
  resetSession: () => void;
}

const GameSessionContext = createContext<GameSessionContextType | undefined>(undefined);

export const GameSessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [likedCards, setLikedCards] = useState<string[]>([]);
  const [passedCards, setPassedCards] = useState<string[]>([]);

  const handleSwipe = (cardId: string, direction: SwipeDirection) => {
    if (direction === 'right') {
      setLikedCards((prev) => [...prev, cardId]);
    } else {
      setPassedCards((prev) => [...prev, cardId]);
    }
  };

  const resetSession = () => {
    setLikedCards([]);
    setPassedCards([]);
  };

  return (
    <GameSessionContext.Provider value={{ likedCards, passedCards, handleSwipe, resetSession }}>
      {children}
    </GameSessionContext.Provider>
  );
};

export const useGameSession = () => {
  const context = useContext(GameSessionContext);
  if (context === undefined) {
    throw new Error('useGameSession must be used within a GameSessionProvider');
  }
  return context;
};
