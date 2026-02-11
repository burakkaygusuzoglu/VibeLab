import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { usePersonalization, CurrentMood } from '../../context/PersonalizationContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

type OnboardingStackParamList = {
  RelationshipStage: undefined;
  MoodSelection: undefined;
  GoalsSelection: undefined;
  OnboardingComplete: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'MoodSelection'>;
};

export const MoodSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { updatePersonalization } = usePersonalization();

  const moods: Array<{
    value: CurrentMood;
    emoji: string;
    gradient: string[];
  }> = [
    {
      value: 'playful',
      emoji: '🎉',
      gradient: ['#FDEB71', '#F8D800'],
    },
    {
      value: 'romantic',
      emoji: '🌹',
      gradient: ['#FF6B9D', '#C06C84'],
    },
    {
      value: 'adventurous',
      emoji: '🎯',
      gradient: ['#F2994A', '#F2C94C'],
    },
    {
      value: 'deep',
      emoji: '🧠',
      gradient: ['#667EEA', '#764BA2'],
    },
    {
      value: 'intimate',
      emoji: '💕',
      gradient: ['#F093FB', '#F5576C'],
    },
    {
      value: 'chill',
      emoji: '😌',
      gradient: ['#A8EDEA', '#6DD5ED'],
    },
  ];

  const handleSelect = async (mood: CurrentMood) => {
    await updatePersonalization({ currentMood: mood });
    navigation.navigate('GoalsSelection');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('onboarding.mood_selection_title')}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t('onboarding.mood_selection_subtitle')}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { backgroundColor: theme.primary, width: '50%' }]} />
          </View>
        </View>

        <View style={styles.moodsGrid}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.value}
              onPress={() => handleSelect(mood.value)}
              style={styles.moodCardWrapper}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={mood.gradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.moodCard}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{t(`onboarding.mood_${mood.value}`)}</Text>
                <Text style={styles.moodDescription}>{t(`onboarding.mood_${mood.value}_desc`)}</Text>
                <View style={styles.tipContainer}>
                  <Text style={styles.tipText}>→ {t(`onboarding.mood_${mood.value}_tip`)}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  moodsGrid: {
    gap: 16,
  },
  moodCardWrapper: {
    width: '100%',
  },
  moodCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  moodLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  moodDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 8,
  },
  tipContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 4,
  },
  tipText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});
