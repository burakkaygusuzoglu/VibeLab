// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tr } from '../i18n/tr';
import { en } from '../i18n/en';

type Language = 'tr' | 'en';
type Translations = typeof tr;

interface LanguageContextValue {
  language: Language;
  currentLanguage: Language; // Alias for convenience
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = '@couple_arena_language';

// Translation helper function
const getNestedValue = (obj: any, path: string): string => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return key if not found
    }
  }
  
  return typeof result === 'string' ? result : path;
};

// Replace placeholders like {{count}} with actual values
const replacePlaceholders = (text: string, params?: Record<string, string | number>): string => {
  if (!params) return text;
  
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match;
  });
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en'); // Default: English
  const [isLoading, setIsLoading] = useState(true);

  const translations: Record<Language, Translations> = {
    tr,
    en,
  };

  // Load saved language on mount
  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'tr' || saved === 'en') {
        setLanguageState(saved);
      } else {
        // Default to English
        setLanguageState('en');
      }
    } catch (error) {
      console.error('Failed to load language:', error);
      setLanguageState('en'); // Fallback to English
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    const currentTranslations = translations[language];
    const text = getNestedValue(currentTranslations, key);
    return replacePlaceholders(text, params);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage: language, // Alias for convenience
        setLanguage,
        t,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
