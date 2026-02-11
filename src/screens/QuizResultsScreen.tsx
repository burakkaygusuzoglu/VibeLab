// src/screens/QuizResultsScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const { width, height } = Dimensions.get('window');

type QuizResultsScreenProps = NativeStackScreenProps<any, 'QuizResults'>;

export const QuizResultsScreen: React.FC<QuizResultsScreenProps> = ({ route, navigation }) => {
  const { score = 0, totalQuestions = 10, streak = 0, category = 'mixed' } = route.params || {};
  const { theme } = useTheme();
  const { completeQuiz } = useGamification();
  const { t } = useLanguage();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const accuracy = Math.round((score / (totalQuestions * 100)) * 100);
  const totalPossibleScore = totalQuestions * 100;

  useEffect(() => {
    // Award XP
    completeQuiz();

    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start();
  }, []);

  const getRank = () => {
    if (accuracy >= 90) return { emoji: '🏆', title: t('quiz_results.legendary'), color: '#FFD700' };
    if (accuracy >= 75) return { emoji: '⭐', title: t('quiz_results.excellent'), color: '#4CAF50' };
    if (accuracy >= 60) return { emoji: '👍', title: t('quiz_results.good'), color: '#2196F3' };
    if (accuracy >= 40) return { emoji: '💪', title: t('quiz_results.keep_trying'), color: '#FF9800' };
    return { emoji: '📚', title: t('quiz_results.practice_more'), color: '#F44336' };
  };

  const rank = getRank();

  return (
    <LinearGradient colors={['#1A1A2E', '#16213E']} style={styles.gradient}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <Animated.View
          style={[
            styles.resultsCard,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={[styles.rankEmoji]}>{rank.emoji}</Text>
          <Text style={[styles.rankTitle, { color: rank.color }]}>{rank.title}</Text>

          <Text style={styles.scoreTitle}>{t('quiz_results.final_score')}</Text>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreSubtext}>{t('quiz_results.out_of', { total: totalPossibleScore })}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{accuracy}%</Text>
              <Text style={styles.statLabel}>{t('quiz_results.accuracy')}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{totalQuestions}</Text>
              <Text style={styles.statLabel}>{t('quiz_results.questions')}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: '#FF9800' }]}>{streak}</Text>
              <Text style={styles.statLabel}>{t('quiz_results.best_streak')}</Text>
            </View>
          </View>

          <View style={styles.categoryInfo}>
            <Text style={styles.categoryLabel}>{t('quiz_results.category')}:</Text>
            <Text style={styles.categoryValue}>
              {category === 'mixed' ? `🎲 ${t('quiz.category_mixed')}` : t(`quiz.${category}`)}
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#4CAF50' }]}
              onPress={() => navigation.navigate('QuizArenaHome')}
            >
              <Text style={styles.buttonText}>🎮 {t('quiz_results.play_again')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#2C2C3E' }]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>🏠 {t('quiz_results.home')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  resultsCard: {
    backgroundColor: '#242439',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  rankEmoji: {
    fontSize: 64,
    marginBottom: spacing.sm,
  },
  rankTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: spacing.xl,
  },
  scoreTitle: {
    color: '#AAAAAA',
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  scoreValue: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  scoreSubtext: {
    color: '#777777',
    fontSize: 14,
    marginBottom: spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
    width: '100%',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#2C2C3E',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  statValue: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  categoryLabel: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  categoryValue: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    gap: spacing.md,
    width: '100%',
  },
  button: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
