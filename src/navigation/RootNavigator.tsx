import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList, OnboardingStackParamList } from './types';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { CardsScreen } from '../screens/CardsScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { CoupleMatchQuizScreen } from '../screens/CoupleMatchQuizScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TruthOrDareScreen } from '../screens/TruthOrDareScreen';
import { DailyChallengeScreen } from '../screens/DailyChallengeScreen';
import { QuizArenaHomeScreen } from '../screens/QuizArenaHomeScreen';
import { QuizClassicScreen } from '../screens/QuizClassicScreen';
import { QuizResultsScreen } from '../screens/QuizResultsScreen';
import { RelationshipStageScreen } from '../screens/onboarding/RelationshipStageScreen';
import { MoodSelectionScreen } from '../screens/onboarding/MoodSelectionScreen';
import { GoalsSelectionScreen } from '../screens/onboarding/GoalsSelectionScreen';
import { OnboardingCompleteScreen } from '../screens/onboarding/OnboardingCompleteScreen';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/soundManager';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <MainTab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({ color }) => <TabIcon emoji="🏠" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          tabBarLabel: t('tabs.cards'),
          tabBarIcon: ({ color }) => <TabIcon emoji="🎴" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: t('tabs.favorites'),
          tabBarIcon: ({ color }) => <TabIcon emoji="❤️" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          tabBarLabel: t('tabs.quiz'),
          tabBarIcon: ({ color }) => <TabIcon emoji="🧠" color={color} />,
        }}
      />
      <MainTab.Screen
        name="CoupleMatch"
        component={CoupleMatchQuizScreen}
        options={{
          tabBarLabel: t('tabs.match'),
          tabBarIcon: ({ color }) => <TabIcon emoji="💕" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Settings"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('tabs.profile'),
          tabBarIcon: ({ color }) => <TabIcon emoji="👤" color={color} />,
        }}
      />
    </MainTab.Navigator>
  );
};

const TabIcon: React.FC<{ emoji: string; color: string }> = ({ emoji }) => {
  return <Text style={{ fontSize: 24 }}>{emoji}</Text>;
};

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <OnboardingStack.Screen name="RelationshipStage" component={RelationshipStageScreen} />
      <OnboardingStack.Screen name="MoodSelection" component={MoodSelectionScreen} />
      <OnboardingStack.Screen name="GoalsSelection" component={GoalsSelectionScreen} />
      <OnboardingStack.Screen name="OnboardingComplete" component={OnboardingCompleteScreen} />
    </OnboardingStack.Navigator>
  );
};

export const RootNavigator = () => {
  const { theme } = useTheme();
  const { backgroundMusicEnabled, backgroundMusicVolume, musicMood, soundEnabled, soundVolume } = useSettings();

  // Initialize and manage background music
  useEffect(() => {
    // Initialize sound system
    soundManager.initialize();
    soundManager.setEnabled(soundEnabled);
    soundManager.setVolume(soundVolume);

    // Start background music if enabled
    if (backgroundMusicEnabled) {
      soundManager.setBackgroundMusicEnabled(true);
      soundManager.setBackgroundMusicVolume(backgroundMusicVolume);
      soundManager.playBackgroundMusic(musicMood);
    }

    // Cleanup on unmount
    return () => {
      soundManager.stopBackgroundMusic();
      soundManager.unloadAll();
    };
  }, []);

  // Update background music when settings change
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
    soundManager.setVolume(soundVolume);
  }, [soundEnabled, soundVolume]);

  useEffect(() => {
    soundManager.setBackgroundMusicEnabled(backgroundMusicEnabled);
    
    if (backgroundMusicEnabled) {
      soundManager.playBackgroundMusic(musicMood);
    } else {
      soundManager.stopBackgroundMusic();
    }
  }, [backgroundMusicEnabled, musicMood]);

  useEffect(() => {
    soundManager.setBackgroundMusicVolume(backgroundMusicVolume);
  }, [backgroundMusicVolume]);

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: theme.primary,
          background: theme.background,
          card: theme.card,
          text: theme.text,
          border: theme.border,
          notification: theme.primary,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
      <RootStack.Navigator
        id={undefined}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <RootStack.Screen name="Welcome" component={WelcomeScreen} />
        <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        <RootStack.Screen name="Main" component={MainTabNavigator} />
        <RootStack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <RootStack.Screen 
          name="TruthOrDare" 
          component={TruthOrDareScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <RootStack.Screen 
          name="DailyChallenge" 
          component={DailyChallengeScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <RootStack.Screen 
          name="QuizArenaHome" 
          component={QuizArenaHomeScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <RootStack.Screen 
          name="QuizClassic" 
          component={QuizClassicScreen}
          options={{
            presentation: 'fullScreenModal',
            animation: 'fade',
          }}
        />
        <RootStack.Screen 
          name="QuizResults" 
          component={QuizResultsScreen}
          options={{
            presentation: 'fullScreenModal',
            animation: 'fade',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
