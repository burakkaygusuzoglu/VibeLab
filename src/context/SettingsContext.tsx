import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardCategory, CardType } from '../data/cards';

export type QuizDifficulty = 'easy' | 'medium' | 'hard' | 'mixed';
export type Language = 'tr' | 'en';
export type MusicMood = 'chill' | 'romantic' | 'playful';

interface SettingsContextValue {
  enabledCategories: Set<CardCategory>;
  enabledTypes: Set<CardType>;
  minIntensity: 1 | 2 | 3;
  maxIntensity: 1 | 2 | 3;
  toggleCategory: (category: CardCategory) => void;
  toggleType: (type: CardType) => void;
  setIntensityRange: (min: 1 | 2 | 3, max: 1 | 2 | 3) => void;
  resetToDefaults: () => void;
  
  // Sound Settings
  soundEnabled: boolean;
  soundVolume: number;
  backgroundMusicEnabled: boolean;
  backgroundMusicVolume: number;
  musicMood: MusicMood;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setBackgroundMusicEnabled: (enabled: boolean) => void;
  setBackgroundMusicVolume: (volume: number) => void;
  setMusicMood: (mood: MusicMood) => void;
  
  // Quiz Settings
  language: Language;
  defaultQuizDifficulty: QuizDifficulty;
  defaultQuizMode: string;
  showQuizExplanations: boolean;
  setLanguage: (lang: Language) => void;
  setDefaultQuizDifficulty: (difficulty: QuizDifficulty) => void;
  setDefaultQuizMode: (mode: string) => void;
  setShowQuizExplanations: (show: boolean) => void;
}

const defaultCategories: CardCategory[] = ['fun', 'romantic', 'crazy', 'adventurous', 'strength', 'general'];
const defaultTypes: CardType[] = ['truth', 'dare', 'question', 'challenge'];

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [enabledCategories, setEnabledCategories] = useState<Set<CardCategory>>(new Set(defaultCategories));
  const [enabledTypes, setEnabledTypes] = useState<Set<CardType>>(new Set(defaultTypes));
  const [minIntensity, setMinIntensity] = useState<1 | 2 | 3>(1);
  const [maxIntensity, setMaxIntensity] = useState<1 | 2 | 3>(3);

  // Quiz Settings State
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [soundVolume, setSoundVolumeState] = useState<number>(0.7);
  const [backgroundMusicEnabled, setBackgroundMusicEnabledState] = useState<boolean>(false);
  const [backgroundMusicVolume, setBackgroundMusicVolumeState] = useState<number>(0.2);
  const [musicMood, setMusicMoodState] = useState<MusicMood>('chill');
  const [language, setLanguageState] = useState<Language>('tr'); // Default: Turkish
  const [defaultQuizDifficulty, setDefaultQuizDifficultyState] = useState<QuizDifficulty>('mixed');
  const [defaultQuizMode, setDefaultQuizModeState] = useState<string>('chill');
  const [showQuizExplanations, setShowQuizExplanationsState] = useState<boolean>(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setEnabledCategories(new Set(parsed.categories || defaultCategories));
        setEnabledTypes(new Set(parsed.types || defaultTypes));
        setMinIntensity(parsed.minIntensity || 1);
        setMaxIntensity(parsed.maxIntensity || 3);
        
        // Load quiz settings
        setSoundEnabledState(parsed.soundEnabled ?? true);
        setSoundVolumeState(parsed.soundVolume ?? 0.7);
        setBackgroundMusicEnabledState(parsed.backgroundMusicEnabled ?? false);
        setBackgroundMusicVolumeState(parsed.backgroundMusicVolume ?? 0.2);
        setMusicMoodState(parsed.musicMood || 'chill');
        setLanguageState(parsed.language || 'tr'); // Default to Turkish
        setDefaultQuizDifficultyState(parsed.defaultQuizDifficulty || 'mixed');
        setDefaultQuizModeState(parsed.defaultQuizMode || 'chill');
        setShowQuizExplanationsState(parsed.showQuizExplanations ?? true);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async (settings: any) => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const getCurrentSettings = () => ({
    categories: [...enabledCategories],
    types: [...enabledTypes],
    minIntensity,
    maxIntensity,
    soundEnabled,
    soundVolume,
    backgroundMusicEnabled,
    backgroundMusicVolume,
    musicMood,
    language,
    defaultQuizDifficulty,
    defaultQuizMode,
    showQuizExplanations,
  });

  const toggleCategory = (category: CardCategory) => {
    setEnabledCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      saveSettings({
        ...getCurrentSettings(),
        categories: [...newSet],
      });
      return newSet;
    });
  };

  const toggleType = (type: CardType) => {
    setEnabledTypes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      saveSettings({
        ...getCurrentSettings(),
        types: [...newSet],
      });
      return newSet;
    });
  };

  const setIntensityRange = (min: 1 | 2 | 3, max: 1 | 2 | 3) => {
    setMinIntensity(min);
    setMaxIntensity(max);
    saveSettings({
      ...getCurrentSettings(),
      minIntensity: min,
      maxIntensity: max,
    });
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    saveSettings({ ...getCurrentSettings(), soundEnabled: enabled });
  };

  const setSoundVolume = (volume: number) => {
    setSoundVolumeState(volume);
    saveSettings({ ...getCurrentSettings(), soundVolume: volume });
  };

  const setBackgroundMusicEnabled = (enabled: boolean) => {
    setBackgroundMusicEnabledState(enabled);
    saveSettings({ ...getCurrentSettings(), backgroundMusicEnabled: enabled });
  };

  const setBackgroundMusicVolume = (volume: number) => {
    setBackgroundMusicVolumeState(volume);
    saveSettings({ ...getCurrentSettings(), backgroundMusicVolume: volume });
  };

  const setMusicMood = (mood: MusicMood) => {
    setMusicMoodState(mood);
    saveSettings({ ...getCurrentSettings(), musicMood: mood });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveSettings({ ...getCurrentSettings(), language: lang });
  };

  const setDefaultQuizDifficulty = (difficulty: QuizDifficulty) => {
    setDefaultQuizDifficultyState(difficulty);
    saveSettings({ ...getCurrentSettings(), defaultQuizDifficulty: difficulty });
  };

  const setDefaultQuizMode = (mode: string) => {
    setDefaultQuizModeState(mode);
    saveSettings({ ...getCurrentSettings(), defaultQuizMode: mode });
  };

  const setShowQuizExplanations = (show: boolean) => {
    setShowQuizExplanationsState(show);
    saveSettings({ ...getCurrentSettings(), showQuizExplanations: show });
  };

  const resetToDefaults = () => {
    const newSettings = {
      categories: defaultCategories,
      types: defaultTypes,
      minIntensity: 1,
      maxIntensity: 3,
      soundEnabled: true,
      soundVolume: 0.7,
      backgroundMusicEnabled: false,
      backgroundMusicVolume: 0.2,
      musicMood: 'chill' as MusicMood,
      language: 'en' as Language,
      defaultQuizDifficulty: 'mixed' as QuizDifficulty,
      defaultQuizMode: 'chill',
      showQuizExplanations: true,
    };
    setEnabledCategories(new Set(defaultCategories));
    setEnabledTypes(new Set(defaultTypes));
    setMinIntensity(1);
    setMaxIntensity(3);
    setSoundEnabledState(true);
    setSoundVolumeState(0.7);
    setBackgroundMusicEnabledState(false);
    setBackgroundMusicVolumeState(0.2);
    setMusicMoodState('chill');
    setLanguageState('en');
    setDefaultQuizDifficultyState('mixed');
    setDefaultQuizModeState('chill');
    setShowQuizExplanationsState(true);
    saveSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        enabledCategories,
        enabledTypes,
        minIntensity,
        maxIntensity,
        toggleCategory,
        toggleType,
        setIntensityRange,
        resetToDefaults,
        soundEnabled,
        soundVolume,
        backgroundMusicEnabled,
        backgroundMusicVolume,
        musicMood,
        language,
        defaultQuizDifficulty,
        defaultQuizMode,
        showQuizExplanations,
        setSoundEnabled,
        setSoundVolume,
        setBackgroundMusicEnabled,
        setBackgroundMusicVolume,
        setMusicMood,
        setLanguage,
        setDefaultQuizDifficulty,
        setDefaultQuizMode,
        setShowQuizExplanations,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
