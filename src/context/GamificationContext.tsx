import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserTitle =
  | 'Curious Duo'
  | 'Playful Partners'
  | 'Deep Connectors'
  | 'Soul Explorers'
  | 'Synchronized Souls'
  | 'Eternal Flames';

export type BadgeId =
  | 'streak_7'
  | 'streak_30'
  | 'cards_50'
  | 'cards_100'
  | 'cards_500'
  | 'chemistry_pro'
  | 'deep_talker'
  | 'adventure_duo'
  | 'quiz_master'
  | 'custom_creator'
  | 'ldr_champion'
  | 'intimate_explorer';

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  emoji: string;
  unlockedAt?: Date;
}

export interface GamificationStats {
  totalXP: number;
  level: number;
  currentTitle: UserTitle;
  cardsCompleted: number;
  quizzesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate?: Date;
  badges: BadgeId[];
  customCardsCreated: number;
}

interface GamificationContextType {
  stats: GamificationStats;
  addXP: (amount: number) => Promise<void>;
  completeCard: () => Promise<void>;
  completeQuiz: () => Promise<void>;
  updateStreak: () => Promise<void>;
  unlockBadge: (badgeId: BadgeId) => Promise<void>;
  incrementCustomCards: () => Promise<void>;
  getAvailableBadges: () => Badge[];
  getNextLevelXP: () => number;
  resetStats: () => Promise<void>;
  showLevelUp: boolean;
  closeLevelUp: () => void;
}

const BADGES: Badge[] = [
  {
    id: 'streak_7',
    name: '7-Day Streak',
    description: 'Played 7 days in a row',
    emoji: '🔥',
  },
  {
    id: 'streak_30',
    name: '30-Day Champion',
    description: 'Played 30 days in a row',
    emoji: '👑',
  },
  {
    id: 'cards_50',
    name: 'Card Explorer',
    description: 'Completed 50 cards',
    emoji: '🎴',
  },
  {
    id: 'cards_100',
    name: 'Card Master',
    description: 'Completed 100 cards',
    emoji: '⭐',
  },
  {
    id: 'cards_500',
    name: 'Card Legend',
    description: 'Completed 500 cards',
    emoji: '🏆',
  },
  {
    id: 'chemistry_pro',
    name: 'Chemistry Pro',
    description: 'Completed 25 Intimate & Flirty cards',
    emoji: '💕',
  },
  {
    id: 'deep_talker',
    name: 'Deep Talker',
    description: 'Completed 50 Deep Talk cards',
    emoji: '🧠',
  },
  {
    id: 'adventure_duo',
    name: 'Adventure Duo',
    description: 'Completed 30 Adventurous cards',
    emoji: '🎯',
  },
  {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Completed 20 quizzes',
    emoji: '📚',
  },
  {
    id: 'custom_creator',
    name: 'Custom Creator',
    description: 'Created 10 custom cards',
    emoji: '✨',
  },
  {
    id: 'ldr_champion',
    name: 'LDR Champion',
    description: 'Completed 20 LDR cards',
    emoji: '🌍',
  },
  {
    id: 'intimate_explorer',
    name: 'Intimate Explorer',
    description: 'Completed 15 Intimate sessions',
    emoji: '🌹',
  },
];

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000];

const TITLE_PROGRESSION: UserTitle[] = [
  'Curious Duo',
  'Playful Partners',
  'Deep Connectors',
  'Soul Explorers',
  'Synchronized Souls',
  'Eternal Flames',
];

const defaultStats: GamificationStats = {
  totalXP: 0,
  level: 1,
  currentTitle: 'Curious Duo',
  cardsCompleted: 0,
  quizzesCompleted: 0,
  currentStreak: 0,
  longestStreak: 0,
  badges: [],
  customCardsCreated: 0,
};

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<GamificationStats>(defaultStats);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const loadStats = async () => {
    try {
      const stored = await AsyncStorage.getItem('@gamification_stats');
      if (stored) {
        const parsed = JSON.parse(stored);
        setStats({
          ...parsed,
          lastPlayedDate: parsed.lastPlayedDate ? new Date(parsed.lastPlayedDate) : undefined,
        });
      }
    } catch (error) {
      console.error('Failed to load gamification stats:', error);
    }
  };

  const saveStats = async (data: GamificationStats) => {
    try {
      await AsyncStorage.setItem('@gamification_stats', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save gamification stats:', error);
    }
  };

  const calculateLevel = (xp: number): number => {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
        return i + 1;
      }
    }
    return 1;
  };

  const getTitle = (level: number): UserTitle => {
    const index = Math.min(Math.floor((level - 1) / 2), TITLE_PROGRESSION.length - 1);
    return TITLE_PROGRESSION[index];
  };

  const addXP = async (amount: number) => {
    const newXP = stats.totalXP + amount;
    const newLevel = calculateLevel(newXP);
    const newTitle = getTitle(newLevel);

    // Check for level up
    if (newLevel > stats.level) {
      setShowLevelUp(true);
    }

    const updated = {
      ...stats,
      totalXP: newXP,
      level: newLevel,
      currentTitle: newTitle,
    };
    setStats(updated);
    await saveStats(updated);
  };

  const completeCard = async () => {
    const updated = {
      ...stats,
      cardsCompleted: stats.cardsCompleted + 1,
    };
    setStats(updated);
    await saveStats(updated);
    await addXP(10);
  };

  const completeQuiz = async () => {
    const updated = {
      ...stats,
      quizzesCompleted: stats.quizzesCompleted + 1,
    };
    setStats(updated);
    await saveStats(updated);
    await addXP(25);
  };

  const updateStreak = async () => {
    const today = new Date().toDateString();
    const lastPlayed = stats.lastPlayedDate ? new Date(stats.lastPlayedDate).toDateString() : null;

    // If already played today, do nothing
    if (lastPlayed === today) return;

    let newStreak = stats.currentStreak;

    if (lastPlayed) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastPlayed === yesterday.toDateString()) {
        newStreak = stats.currentStreak + 1;
      } else {
        newStreak = 1; // Reset streak if missed a day
      }
    } else {
      newStreak = 1; // First time playing
    }

    // Check for 7-day streak badge
    let newBadges = [...stats.badges];
    if (newStreak >= 7 && !newBadges.includes('streak_7')) {
      newBadges.push('streak_7');
      // We can also trigger a badge unlock modal here if we had one
    }
    if (newStreak >= 30 && !newBadges.includes('streak_30')) {
      newBadges.push('streak_30');
    }

    const updated = {
      ...stats,
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, stats.longestStreak),
      lastPlayedDate: new Date(),
      badges: newBadges,
    };
    setStats(updated);
    await saveStats(updated);
    
    // Add XP for streak milestones if badge was just added
    if (newBadges.length > stats.badges.length) {
       await addXP(100); // Bonus for badge
    }
  };

  const unlockBadge = async (badgeId: BadgeId) => {
    if (!stats.badges.includes(badgeId)) {
      const updated = {
        ...stats,
        badges: [...stats.badges, badgeId],
      };
      setStats(updated);
      await saveStats(updated);
      await addXP(50); // Bonus XP for unlocking badge
    }
  };

  const incrementCustomCards = async () => {
    const updated = {
      ...stats,
      customCardsCreated: stats.customCardsCreated + 1,
    };
    setStats(updated);
    await saveStats(updated);
  };

  const getAvailableBadges = (): Badge[] => {
    return BADGES.map(badge => ({
      ...badge,
      unlockedAt: stats.badges.includes(badge.id) ? new Date() : undefined,
    }));
  };

  const getNextLevelXP = (): number => {
    const currentLevel = stats.level;
    if (currentLevel >= LEVEL_THRESHOLDS.length) {
      return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    }
    return LEVEL_THRESHOLDS[currentLevel];
  };

  const resetStats = async () => {
    setStats(defaultStats);
    await AsyncStorage.removeItem('@gamification_stats');
  };

  const closeLevelUp = () => setShowLevelUp(false);

  React.useEffect(() => {
    loadStats();
  }, []);

  return (
    <GamificationContext.Provider
      value={{
        stats,
        addXP,
        completeCard,
        completeQuiz,
        updateStreak,
        unlockBadge,
        incrementCustomCards,
        getAvailableBadges,
        getNextLevelXP,
        resetStats,
        showLevelUp,
        closeLevelUp,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
};
