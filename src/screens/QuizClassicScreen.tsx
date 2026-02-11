// src/screens/QuizClassicScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { useGamification } from '../context/GamificationContext';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/soundManager';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const { width, height } = Dimensions.get('window');

const TIMER_DURATION = 20; // seconds

// Define QuizQuestion type locally
interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  difficulty: number;
}

interface QuizClassicParams {
  questions: QuizQuestion[];
  category: string;
}

type QuizClassicScreenProps = NativeStackScreenProps<any, 'QuizClassic'>;

export const QuizClassicScreen: React.FC<QuizClassicScreenProps> = ({ route, navigation }) => {
  const { questions, category } = route.params as QuizClassicParams;
  const { theme } = useTheme();
  const { addXP } = useGamification();
  const { soundEnabled, soundVolume, showQuizExplanations } = useSettings();
  const { t } = useLanguage();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const timerAnim = useRef(new Animated.Value(1)).current;

  const currentQuestion = questions[currentQuestionIndex];

  // Get category name translation
  const getCategoryName = () => {
    const categoryMap: Record<string, string> = {
      'mixed': t('quiz.category_mixed'),
      'general_knowledge': t('quiz.general_knowledge'),
      'fun_facts': t('quiz.fun_facts'),
      'relationship': t('quiz.relationship'),
      'pop_culture': t('quiz.pop_culture'),
      'this_or_that': t('quiz.this_or_that'),
      'speed_round': t('quiz.speed_round'),
    };
    return categoryMap[category] || category.replace('_', ' ').toUpperCase();
  };

  // Timer countdown
  useEffect(() => {
    if (isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        // Play warning sound at 5 seconds
        if (prev === 6) {
          soundManager.play('time-warning');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isAnswered]);

  // Timer animation
  useEffect(() => {
    Animated.timing(timerAnim, {
      toValue: timeLeft / TIMER_DURATION,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [timeLeft]);

  // Initialize sound on mount
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
    soundManager.setVolume(soundVolume);
    soundManager.initialize();
    soundManager.play('quiz-start'); // Professional quiz start sound

    return () => {
      soundManager.unloadAll();
    };
  }, [soundEnabled, soundVolume]);

  const handleTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setIsCorrect(false);
    setStreak(0);
    soundManager.play('wrong'); // Time's up sound
    
    // Shake animation
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleAnswerPress = (answerIndex: number) => {
    if (isAnswered) return;

    soundManager.play('click'); // Subtle button click
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const correct = answerIndex === currentQuestion.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      soundManager.play('correct'); // Quiz correct sound
      const points = Math.ceil((timeLeft / TIMER_DURATION) * 100);
      setScore(score + points);
      const newStreak = streak + 1;
      setStreak(newStreak);
      addXP(10 + streak * 2); // Bonus XP for streaks

      // Play streak bonus sound for 3+ streak
      if (newStreak >= 3 && newStreak % 3 === 0) {
        setTimeout(() => soundManager.play('streak-bonus'), 300);
      }

      // Scale animation for correct answer
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.1, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      ]).start();
    } else {
      soundManager.play('wrong'); // Quiz wrong sound
      setStreak(0);

      // Shake animation for wrong answer
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        // Move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(TIMER_DURATION);
        setIsCorrect(null);

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Quiz completed
      const accuracy = score / (questions.length * 100);
      
      // Play perfect score sound for 90%+ accuracy
      if (accuracy >= 0.9) {
        soundManager.play('perfect-score');
      } else {
        soundManager.play('quiz-end');
      }
      
      setTimeout(() => {
        navigation.replace('QuizResults', {
          score,
          totalQuestions: questions.length,
          streak,
          category,
        });
      }, 800); // Delay to let sound play
    }
  };

  const getAnswerStyle = (index: number) => {
    if (!isAnswered) return {};

    if (index === currentQuestion.correctIndex) {
      return { backgroundColor: '#4CAF50', borderColor: '#4CAF50' };
    }

    if (index === selectedAnswer && !isCorrect) {
      return { backgroundColor: '#F44336', borderColor: '#F44336' };
    }

    return {};
  };

  const timerColor = timeLeft > 10 ? '#4CAF50' : timeLeft > 5 ? '#FF9800' : '#F44336';

  return (
    <LinearGradient colors={['#1A1A2E', '#16213E']} style={styles.gradient}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.exitButton, { backgroundColor: theme.card }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.exitText, { color: theme.text }]}>✕</Text>
          </TouchableOpacity>

          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {t('quiz.question_number', { current: currentQuestionIndex + 1, total: questions.length })}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    backgroundColor: '#4CAF50',
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>🏆 {score}</Text>
            {streak > 1 && <Text style={styles.streakText}>🔥 {streak}</Text>}
          </View>
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <View style={[styles.timerBar, { backgroundColor: '#2C2C3E' }]}>
            <Animated.View
              style={[
                styles.timerFill,
                {
                  width: timerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                  backgroundColor: timerColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}s</Text>
        </View>

        {/* Question Card */}
        <Animated.View
          style={[
            styles.questionCard,
            {
              opacity: fadeAnim,
              transform: [{ translateX: shakeAnim }, { scale: isCorrect ? scaleAnim : 1 }],
            },
          ]}
        >
          <ScrollView contentContainerStyle={styles.questionScroll}>
            <Text style={styles.categoryTag}>
              {category === 'mixed' ? '🎲 ' : ''}{getCategoryName()}
            </Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            {/* Answers */}
            <View style={styles.answersContainer}>
              {currentQuestion.options.map((option: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.answerButton, getAnswerStyle(index)]}
                  onPress={() => handleAnswerPress(index)}
                  disabled={isAnswered}
                >
                  <Text
                    style={[
                      styles.answerText,
                      (isAnswered && index === currentQuestion.correctIndex) ||
                      (isAnswered && index === selectedAnswer && !isCorrect)
                        ? { color: '#FFFFFF' }
                        : {},
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Explanation (after answering) */}
            {isAnswered && showQuizExplanations && currentQuestion.explanation && (
              <View
                style={[
                  styles.explanationBox,
                  { backgroundColor: isCorrect ? '#4CAF5020' : '#F4433620' },
                ]}
              >
                <Text style={styles.explanationTitle}>
                  {isCorrect ? `✅ ${t('quiz.correct')}` : `❌ ${t('quiz.wrong')}`}
                </Text>
                <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
              </View>
            )}

            {/* Next Button */}
            {isAnswered && (
              <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: '#4CAF50' }]}
                onPress={handleNextQuestion}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestionIndex < questions.length - 1 ? t('quiz.next_question') : t('quiz.see_results')}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
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
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  exitButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2C2C3E',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  streakText: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timerContainer: {
    marginBottom: spacing.lg,
  },
  timerBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  timerFill: {
    height: '100%',
  },
  timerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionCard: {
    flex: 1,
    backgroundColor: '#242439',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  questionScroll: {
    flexGrow: 1,
  },
  categoryTag: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.xl,
    lineHeight: 28,
  },
  answersContainer: {
    gap: spacing.md,
  },
  answerButton: {
    backgroundColor: '#2C2C3E',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: '#2C2C3E',
  },
  answerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  explanationBox: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  explanationTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  explanationText: {
    color: '#DDDDDD',
    fontSize: 14,
    lineHeight: 20,
  },
  nextButton: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
