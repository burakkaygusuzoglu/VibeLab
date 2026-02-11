import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { usePersonalization, RelationshipStage } from '../../context/PersonalizationContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

type OnboardingStackParamList = {
  RelationshipStage: undefined;
  MoodSelection: undefined;
  GoalsSelection: undefined;
  OnboardingComplete: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'RelationshipStage'>;
};

const { width } = Dimensions.get('window');

export const RelationshipStageScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { updatePersonalization } = usePersonalization();

  const stages: Array<{
    value: RelationshipStage;
    emoji: string;
    gradient: string[];
  }> = [
    {
      value: 'new',
      emoji: '🌱',
      gradient: ['#48C6EF', '#6F86D6'],
    },
    {
      value: 'dating',
      emoji: '💑',
      gradient: ['#F093FB', '#F5576C'],
    },
    {
      value: 'serious',
      emoji: '💖',
      gradient: ['#FA709A', '#FEE140'],
    },
    {
      value: 'engaged',
      emoji: '💍',
      gradient: ['#A8EDEA', '#FED6E3'],
    },
    {
      value: 'married',
      emoji: '💏',
      gradient: ['#FFD89B', '#19547B'],
    },
    {
      value: 'ldr',
      emoji: '🌍',
      gradient: ['#C471F5', '#FA71CD'],
    },
  ];

  const handleSelect = async (stage: RelationshipStage) => {
    await updatePersonalization({ relationshipStage: stage });
    navigation.navigate('MoodSelection');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('onboarding.relationship_stage_title')}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t('onboarding.relationship_stage_subtitle')}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { backgroundColor: theme.primary, width: '25%' }]} />
          </View>
        </View>

        <View style={styles.stagesGrid}>
          {stages.map((stage) => (
            <TouchableOpacity
              key={stage.value}
              onPress={() => handleSelect(stage.value)}
              style={styles.stageCardWrapper}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={stage.gradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stageCard}
              >
                <Text style={styles.stageEmoji}>{stage.emoji}</Text>
                <Text style={styles.stageLabel}>{t(`onboarding.stage_${stage.value}`)}</Text>
                <Text style={styles.stageDescription}>{t(`onboarding.stage_${stage.value}_desc`)}</Text>
                <View style={styles.tipContainer}>
                  <Text style={styles.tipText}>💡 {t(`onboarding.stage_${stage.value}_tip`)}</Text>
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
  stagesGrid: {
    gap: 16,
  },
  stageCardWrapper: {
    width: '100%',
    marginBottom: 0,
  },
  stageCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  stageEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  stageLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  stageDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 10,
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
