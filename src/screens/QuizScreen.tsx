import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useQuiz } from '../context/QuizContext';
import { useGamification } from '../context/GamificationContext';
import { getRandomQuestions, QuizCategory } from '../data/quizQuestions';
import { PrimaryButton } from '../components/PrimaryButton';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const { width, height } = Dimensions.get('window');

// Romantic background gradients
const ROMANTIC_BACKGROUNDS: readonly [string, string, ...string[]][] = [
  ['#FF6B6B', '#C92A2A'], // Deep red
  ['#FF1744', '#880E4F'], // Pink-red
  ['#1A1A1A', '#4A0E0E'], // Black-red
  ['#2D1B1B', '#FF6B6B'], // Dark to red
  ['#000000', '#8B0000'], // Pure black to dark red
  ['#4A0404', '#1A0000'], // Blood red to black
];

export const QuizScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, currentLanguage } = useLanguage();
  const { mode, category, currentIndex, questions, score, player1Score, player2Score, currentPlayer, answered, selectedAnswer, answerQuestion, nextQuestion, startQuiz, resetQuiz } = useQuiz();
  const { completeQuiz } = useGamification();
  const [selectedMode, setSelectedMode] = useState<'chill' | 'versus' | 'team' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | 'mixed' | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const backgroundIndex = useMemo(() => Math.floor(Math.random() * ROMANTIC_BACKGROUNDS.length), []);
  
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Award XP when quiz is completed
  useEffect(() => {
    if (currentIndex >= questions.length && questions.length > 0 && !quizCompleted) {
      completeQuiz();
      setQuizCompleted(true);
    }
  }, [currentIndex, questions.length, quizCompleted]);

  // Reset quiz completed flag when starting new quiz
  useEffect(() => {
    if (currentIndex === 0 && questions.length > 0) {
      setQuizCompleted(false);
    }
  }, [mode, category]);

  // Timer Logic for Versus Mode
  useEffect(() => {
    if (mode === 'versus' && !answered && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !answered && mode === 'versus') {
      answerQuestion(-1); // Timeout
    }
  }, [timeLeft, mode, answered]);

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(10);
    pulseAnim.setValue(0);
  }, [currentIndex]);

  // Pulse Animation Logic
  useEffect(() => {
    if (timeLeft <= 3 && !answered && mode === 'versus') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
          Animated.timing(pulseAnim, { toValue: 0, duration: 500, useNativeDriver: false }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(0);
    }
  }, [timeLeft, answered, mode]);

  const categories: (QuizCategory | 'mixed')[] = [
    'mixed',
    'general_knowledge',
    'fun_facts',
    'relationship',
    'pop_culture',
    'this_or_that',
    'speed_round',
  ];

  const handleStartQuiz = () => {
    if (!selectedMode || !selectedCategory) return;

    const category = selectedCategory === 'mixed' ? undefined : selectedCategory;
    const shuffled = getRandomQuestions(10, currentLanguage, category);
    
    startQuiz(selectedMode, selectedCategory, shuffled);
  };

  // Quiz not started - Selection screen
  if (!mode) {
    return (
      <LinearGradient
        colors={ROMANTIC_BACKGROUNDS[backgroundIndex] as any}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.container} edges={['top']}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
            <Text style={[styles.title, { color: '#FFFFFF' }]}>{t('quiz.title')}</Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>{t('quiz.select_category')}</Text>
            <View style={styles.modeGrid}>
              <ModeCard
                emoji="😌"
                title="Chill"
                description="Relax and answer together"
                selected={selectedMode === 'chill'}
                onPress={() => setSelectedMode('chill')}
                theme={theme}
              />
              <ModeCard
                emoji="⚔️"
                title="Versus"
                description="Battle for the highest score"
                selected={selectedMode === 'versus'}
                onPress={() => setSelectedMode('versus')}
                theme={theme}
              />
              <ModeCard
                emoji="🤝"
                title="Team"
                description="Work together as a team"
                selected={selectedMode === 'team'}
                onPress={() => setSelectedMode('team')}
                theme={theme}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Select Category</Text>
            <View style={styles.categoryGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: selectedCategory === cat ? theme.secondary : theme.card,
                    },
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      { color: selectedCategory === cat ? '#FFFFFF' : theme.text },
                    ]}
                  >
                    {cat.replace(/_/g, ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <PrimaryButton
            title={t('common.start')}
            onPress={handleStartQuiz}
            disabled={!selectedMode || !selectedCategory}
            fullWidth
          />
        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
    );
  }

  // Quiz finished - Results screen
  if (currentIndex >= questions.length) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>🎉</Text>
          <Text style={[styles.resultTitle, { color: theme.text }]}>Quiz Complete!</Text>

          {mode === 'versus' ? (
            <View style={styles.scoreBoard}>
              <View style={styles.playerScore}>
                <Text style={[styles.playerLabel, { color: theme.textSecondary }]}>Player 1</Text>
                <Text style={[styles.scoreValue, { color: theme.primary }]}>{player1Score}</Text>
              </View>
              <View style={styles.playerScore}>
                <Text style={[styles.playerLabel, { color: theme.textSecondary }]}>Player 2</Text>
                <Text style={[styles.scoreValue, { color: theme.secondary }]}>{player2Score}</Text>
              </View>
            </View>
          ) : (
            <Text style={[styles.scoreText, { color: theme.primary }]}>
              Score: {score} / {questions.length}
            </Text>
          )}

          <PrimaryButton title="Play Again" onPress={resetQuiz} fullWidth />
        </View>
      </SafeAreaView>
    );
  }

  // Quiz in progress - Question screen
  const currentQuestion = questions[currentIndex];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Pulse Animation Overlay */}
      {mode === 'versus' && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'red',
              opacity: pulseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3],
              }),
              zIndex: 0,
            },
          ]}
          pointerEvents="none"
        />
      )}

      <View style={styles.quizHeader}>
        <TouchableOpacity
          style={[styles.exitButton, { backgroundColor: theme.card }]}
          onPress={resetQuiz}
          activeOpacity={0.7}
        >
          <Text style={styles.exitButtonText}>✕</Text>
        </TouchableOpacity>
        
        {mode === 'versus' ? (
          <View style={styles.timerContainer}>
            <Text style={[styles.timerText, { color: timeLeft <= 3 ? '#FF6B6B' : theme.text }]}>
              ⏱️ {timeLeft}s
            </Text>
          </View>
        ) : (
          <Text style={[styles.questionCounter, { color: theme.textSecondary }]}>
            Question {currentIndex + 1} / {questions.length}
          </Text>
        )}

        {mode === 'versus' && (
          <Text style={[styles.currentPlayerText, { color: theme.text }]}>
            Player {currentPlayer}'s turn
          </Text>
        )}
      </View>

      <View style={styles.questionContainer}>
        <Text style={[styles.questionText, { color: theme.text }]}>
          {currentQuestion.question}
        </Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            let backgroundColor = theme.card;
            if (answered) {
              if (index === currentQuestion.correctIndex) {
                backgroundColor = theme.success;
              } else if (index === selectedAnswer) {
                backgroundColor = theme.error;
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={[styles.optionButton, { backgroundColor }]}
                onPress={() => answerQuestion(index)}
                disabled={answered}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: answered && (index === currentQuestion.correctIndex || index === selectedAnswer) ? '#FFFFFF' : theme.text },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {answered && currentQuestion.explanation && (
          <View style={[styles.explanation, { backgroundColor: theme.card }]}>
            <Text style={[styles.explanationText, { color: theme.textSecondary }]}>
              {currentQuestion.explanation}
            </Text>
          </View>
        )}
      </View>

      {answered && (
        <View style={styles.nextButtonContainer}>
          <PrimaryButton title="Next Question" onPress={nextQuestion} fullWidth />
        </View>
      )}
    </SafeAreaView>
  );
};

const ModeCard: React.FC<{
  emoji: string;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  theme: any;
}> = ({ emoji, title, description, selected, onPress, theme }) => (
  <TouchableOpacity
    style={[
      styles.modeCard,
      {
        backgroundColor: selected ? theme.primary : theme.card,
      },
    ]}
    onPress={onPress}
  >
    <Text style={styles.modeEmoji}>{emoji}</Text>
    <Text style={[styles.modeTitle, { color: selected ? '#FFFFFF' : theme.text }]}>
      {title}
    </Text>
    <Text style={[styles.modeDescription, { color: selected ? '#FFFFFF' : theme.textSecondary }]}>
      {description}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  modeGrid: {
    gap: spacing.md,
  },
  modeCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  modeEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  modeTitle: {
    ...typography.h3,
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  modeDescription: {
    ...typography.caption,
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  categoryText: {
    ...typography.button,
    fontSize: 13,
    textTransform: 'capitalize',
  },
  quizHeader: {
    padding: spacing.lg,
    alignItems: 'center',
    position: 'relative',
    minHeight: 80,
    justifyContent: 'center',
  },
  exitButton: {
    position: 'absolute',
    left: spacing.lg,
    top: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  exitButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  questionCounter: {
    ...typography.body,
  },
  timerContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerText: {
    ...typography.h3,
    fontWeight: 'bold',
  },
  currentPlayerText: {
    ...typography.h3,
    marginTop: spacing.xs,
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  questionText: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  optionButton: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  optionText: {
    ...typography.bodyLarge,
    textAlign: 'center',
  },
  explanation: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  explanationText: {
    ...typography.body,
    textAlign: 'center',
  },
  nextButtonContainer: {
    padding: spacing.lg,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  resultTitle: {
    ...typography.h1,
    marginBottom: spacing.xl,
  },
  scoreBoard: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing.xxl,
  },
  playerScore: {
    alignItems: 'center',
  },
  playerLabel: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  scoreValue: {
    ...typography.h1,
    fontSize: 48,
  },
  scoreText: {
    ...typography.h2,
    marginBottom: spacing.xxl,
  },
});
