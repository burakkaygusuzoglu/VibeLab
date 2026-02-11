import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/soundManager';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>{t('home.title')}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t('home.subtitle')}
          </Text>
        </View>

        {/* Daily Challenge Banner */}
        <TouchableOpacity
          style={[styles.dailyBanner, { backgroundColor: theme.primary }]}
          onPress={() => {
            soundManager.play('click');
            navigation.navigate('DailyChallenge' as any);
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#F093FB', '#F5576C']}
            style={styles.dailyGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.dailyContent}>
              <Text style={styles.dailyEmoji}>⭐</Text>
              <View style={styles.dailyText}>
                <Text style={styles.dailyTitle}>{t('home.daily_challenge')}</Text>
                <Text style={styles.dailySubtitle}>{t('home.daily_challenge_desc')}</Text>
              </View>
              <Text style={styles.dailyArrow}>→</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.cards}>
          <ModeCard
            emoji="🎴"
            title={t('home.couple_cards')}
            description={t('home.couple_cards_desc')}
            forLabel={t('home.couple_cards_for')}
            color={theme.primary}
            onPress={() => navigation.navigate('Cards')}
          />
          
          <ModeCard
            emoji="🎲"
            title={t('home.truth_or_dare')}
            description={t('home.truth_or_dare_desc')}
            forLabel={t('home.truth_or_dare_for')}
            color="#E53E3E"
            onPress={() => navigation.navigate('TruthOrDare')}
          />
          
          <ModeCard
            emoji="🧠"
            title={t('home.quiz_arena')}
            description={t('home.quiz_arena_desc')}
            forLabel={t('home.quiz_arena_for')}
            color={theme.secondary}
            onPress={() => navigation.navigate('QuizArenaHome')}
          />
          
          <ModeCard
            emoji="💕"
            title={t('home.couple_match')}
            description={t('home.couple_match_desc')}
            forLabel={t('home.couple_match_for')}
            color="#6B46C1"
            onPress={() => navigation.navigate('CoupleMatch')}
          />

          <ModeCard
            emoji="⭐"
            title={t('home.daily_challenge')}
            description={t('home.daily_challenge_desc')}
            forLabel={t('home.daily_challenge_for')}
            color="#F5576C"
            onPress={() => navigation.navigate('DailyChallenge' as any)}
          />
        </View>

        <View style={styles.stats}>
          <StatBox label={t('home.stat_cards')} value="1500" theme={theme} />
          <StatBox label={t('home.stat_modes')} value="5" theme={theme} />
          <StatBox label={t('home.stat_categories')} value="6" theme={theme} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ModeCard: React.FC<{
  emoji: string;
  title: string;
  description: string;
  forLabel: string;
  color: string;
  onPress: () => void;
}> = ({ emoji, title, description, forLabel, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.modeCard, { backgroundColor: color }]}
      onPress={() => {
        soundManager.play('click');
        onPress();
      }}
      activeOpacity={0.8}
    >
      <Text style={styles.modeEmoji}>{emoji}</Text>
      <Text style={styles.modeTitle}>{title}</Text>
      <Text style={styles.modeDescription}>{description}</Text>
      <Text style={styles.modeFor}>{forLabel}</Text>
    </TouchableOpacity>
  );
};

const StatBox: React.FC<{ label: string; value: string; theme: any }> = ({ label, value, theme }) => (
  <View style={[styles.statBox, { backgroundColor: theme.card }]}>
    <Text style={[styles.statValue, { color: theme.primary }]}>{value}</Text>
    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
  },
  cards: {
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  modeCard: {
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
  },
  modeEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  modeTitle: {
    ...typography.h2,
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  modeDescription: {
    ...typography.body,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  modeFor: {
    ...typography.caption,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.75,
    marginTop: spacing.xs,
    fontSize: 12,
    fontStyle: 'italic',
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statBox: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    fontSize: 28,
  },
  statLabel: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  dailyBanner: {
    height: 100,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dailyGradient: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  dailyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dailyEmoji: {
    fontSize: 40,
  },
  dailyText: {
    flex: 1,
  },
  dailyTitle: {
    ...typography.h3,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  dailySubtitle: {
    ...typography.body,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  dailyArrow: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});
