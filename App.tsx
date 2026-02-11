import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from './src/context/LanguageContext';
import { QuestionHistoryProvider } from './src/context/QuestionHistoryContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { QuizProvider } from './src/context/QuizContext';
import { PersonalizationProvider } from './src/context/PersonalizationContext';
import { GamificationProvider } from './src/context/GamificationContext';
import { GameSessionProvider } from './src/context/GameSessionContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <ThemeProvider>
            <PersonalizationProvider>
              <GamificationProvider>
                <QuestionHistoryProvider>
                  <SettingsProvider>
                    <FavoritesProvider>
                      <QuizProvider>
                        <GameSessionProvider>
                          <RootNavigator />
                          <StatusBar style="auto" />
                        </GameSessionProvider>
                      </QuizProvider>
                    </FavoritesProvider>
                  </SettingsProvider>
                </QuestionHistoryProvider>
              </GamificationProvider>
            </PersonalizationProvider>
          </ThemeProvider>
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
