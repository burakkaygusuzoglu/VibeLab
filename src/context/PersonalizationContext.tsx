import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RelationshipStage =
  | 'new' // Just started dating
  | 'dating' // Dating for a while
  | 'serious' // Serious relationship
  | 'engaged' // Engaged
  | 'married' // Married
  | 'ldr'; // Long distance

export type CurrentMood =
  | 'playful'
  | 'romantic'
  | 'adventurous'
  | 'deep'
  | 'intimate'
  | 'chill';

export type RelationshipGoal =
  | 'deeper_connection'
  | 'more_fun'
  | 'better_communication'
  | 'spice_things_up'
  | 'learn_about_partner'
  | 'just_have_fun';

export interface UserPersonalization {
  relationshipStage: RelationshipStage | null;
  currentMood: CurrentMood | null;
  goals: RelationshipGoal[];
  hasCompletedOnboarding: boolean;
  preferredIntensity: 1 | 2 | 3;
  favoriteCategories: string[];
  lastUpdated: Date;
}

interface PersonalizationContextType {
  personalization: UserPersonalization;
  updatePersonalization: (updates: Partial<UserPersonalization>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetPersonalization: () => Promise<void>;
}

const defaultPersonalization: UserPersonalization = {
  relationshipStage: null,
  currentMood: null,
  goals: [],
  hasCompletedOnboarding: false,
  preferredIntensity: 2,
  favoriteCategories: [],
  lastUpdated: new Date(),
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const PersonalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personalization, setPersonalization] = useState<UserPersonalization>(defaultPersonalization);

  const loadPersonalization = async () => {
    try {
      const stored = await AsyncStorage.getItem('@personalization');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPersonalization({
          ...parsed,
          lastUpdated: new Date(parsed.lastUpdated),
        });
      }
    } catch (error) {
      console.error('Failed to load personalization:', error);
    }
  };

  const savePersonalization = async (data: UserPersonalization) => {
    try {
      await AsyncStorage.setItem('@personalization', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save personalization:', error);
    }
  };

  const updatePersonalization = async (updates: Partial<UserPersonalization>) => {
    const updated = {
      ...personalization,
      ...updates,
      lastUpdated: new Date(),
    };
    setPersonalization(updated);
    await savePersonalization(updated);
  };

  const completeOnboarding = async () => {
    const completed = {
      ...personalization,
      hasCompletedOnboarding: true,
      lastUpdated: new Date(),
    };
    setPersonalization(completed);
    await savePersonalization(completed);
  };

  const resetPersonalization = async () => {
    setPersonalization(defaultPersonalization);
    await AsyncStorage.removeItem('@personalization');
  };

  React.useEffect(() => {
    loadPersonalization();
  }, []);

  return (
    <PersonalizationContext.Provider
      value={{
        personalization,
        updatePersonalization,
        completeOnboarding,
        resetPersonalization,
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
};
