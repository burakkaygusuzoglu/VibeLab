import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { usePersonalization, RelationshipGoal } from '../../context/PersonalizationContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

type OnboardingStackParamList = {
  RelationshipStage: undefined;
  MoodSelection: undefined;
  GoalsSelection: undefined;
  OnboardingComplete: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'GoalsSelection'>;
};

const goals: Array<{
  value: RelationshipGoal;
  emoji: string;
  label: string;
  description: string;
}> = [
  {
    value: 'deeper_connection',
    emoji: '💞',
    label: 'Deeper Connection',
    description: 'Build emotional intimacy',
  },
  {
    value: 'more_fun',
    emoji: '🎊',
    label: 'More Fun',
    description: 'Laugh & enjoy together',
  },
  {
    value: 'better_communication',
    emoji: '💬',
    label: 'Better Communication',
    description: 'Understand each other',
  },
  {
    value: 'spice_things_up',
    emoji: '🔥',
    label: 'Spice Things Up',
    description: 'Add excitement & passion',
  },
  {
    value: 'learn_about_partner',
    emoji: '🔍',
    label: 'Learn About Partner',
    description: 'Discover new things',
  },
  {
    value: 'just_have_fun',
    emoji: '😄',
    label: 'Just Have Fun',
    description: 'Enjoy quality time',
  },
];

export const GoalsSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { updatePersonalization } = usePersonalization();
  const [selectedGoals, setSelectedGoals] = useState<RelationshipGoal[]>([]);

  const goals: Array<{
    value: RelationshipGoal;
    emoji: string;
  }> = [
    {
      value: 'deeper_connection',
      emoji: '💕',
    },
    {
      value: 'more_fun',
      emoji: '🎊',
    },
    {
      value: 'better_communication',
      emoji: '💬',
    },
    {
      value: 'spice_things_up',
      emoji: '🔥',
    },
    {
      value: 'learn_about_partner',
      emoji: '🔍',
    },
    {
      value: 'just_have_fun',
      emoji: '😄',
    },
  ];

  const toggleGoal = (goal: RelationshipGoal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const handleContinue = async () => {
    if (selectedGoals.length > 0) {
      await updatePersonalization({ goals: selectedGoals });
      navigation.navigate('OnboardingComplete');
    }
  };

  const isSelected = (goal: RelationshipGoal) => selectedGoals.includes(goal);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('onboarding.goals_selection_title')}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t('onboarding.goals_selection_subtitle')}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { backgroundColor: theme.primary, width: '75%' }]} />
          </View>
        </View>

        <View style={styles.goalsGrid}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.value}
              onPress={() => toggleGoal(goal.value)}
              style={styles.goalCardWrapper}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.goalCard,
                  { backgroundColor: theme.card },
                  isSelected(goal.value) && {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                  },
                ]}
              >
                <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                <Text
                  style={[
                    styles.goalLabel,
                    { color: theme.text },
                    isSelected(goal.value) && { color: '#FFFFFF' },
                  ]}
                >
                  {t(`onboarding.goal_${goal.value}`)}
                </Text>
                <Text
                  style={[
                    styles.goalDescription,
                    { color: theme.textSecondary },
                    isSelected(goal.value) && { color: 'rgba(255, 255, 255, 0.9)' },
                  ]}
                >
                  {t(`onboarding.goal_${goal.value}_desc`)}
                </Text>
                {isSelected(goal.value) && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
          style={[
            styles.continueButton,
            selectedGoals.length === 0 && styles.continueButtonDisabled,
          ]}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              selectedGoals.length > 0
                ? [theme.primary, theme.secondary]
                : ['#ccc', '#999']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueGradient}
          >
            <Text style={styles.continueButtonText}>
              {t('onboarding.continue_button', { count: selectedGoals.length })}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
  goalsGrid: {
    gap: 16,
    marginBottom: 24,
  },
  goalCardWrapper: {
    width: '100%',
  },
  goalCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  goalEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  goalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  goalDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    marginTop: 8,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
