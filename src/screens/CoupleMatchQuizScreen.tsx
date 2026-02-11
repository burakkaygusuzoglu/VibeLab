import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getRandomQuestions } from '../data/quizQuestions';
import { QuizQuestion } from '../data/cards';
import { PrimaryButton } from '../components/PrimaryButton';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import { soundManager } from '../utils/soundManager';

const { width } = Dimensions.get('window');

// Romantic backgrounds
const BACKGROUNDS: readonly [string, string, ...string[]][] = [
  ['#FF6B6B', '#C92A2A'],
  ['#FF1744', '#880E4F'],
  ['#1A1A1A', '#4A0E0E'],
  ['#2D1B1B', '#FF6B6B'],
  ['#000000', '#8B0000'],
  ['#4A0404', '#1A0000'],
];

type GamePhase = 'SETUP' | 'TRANSITION' | 'ANSWER' | 'RESULT' | 'SUMMARY';

interface PlayerAnswer {
  questionId: string;
  answer: string;
}

interface GameState {
  player1Name: string;
  player2Name: string;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  turn: 1 | 2;
  phase: GamePhase;
  player1Answers: PlayerAnswer[];
  player2Answers: PlayerAnswer[];
  matchScore: number;
}

export const CoupleMatchQuizScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, currentLanguage } = useLanguage();
  const [backgroundIndex] = useState(Math.floor(Math.random() * BACKGROUNDS.length));

  const [gameState, setGameState] = useState<GameState>({
    player1Name: '',
    player2Name: '',
    questions: [],
    currentQuestionIndex: 0,
    turn: 1,
    phase: 'SETUP',
    player1Answers: [],
    player2Answers: [],
    matchScore: 0,
  });

  const [currentAnswer, setCurrentAnswer] = useState('');
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleStartGame = () => {
    if (!gameState.player1Name || !gameState.player2Name) return;

    const shuffled = getRandomQuestions(10, currentLanguage);

    animateTransition(() => {
      setGameState({
        ...gameState,
        questions: shuffled,
        phase: 'TRANSITION',
        turn: 1,
      });
    });
  };

  const handleReady = () => {
    animateTransition(() => {
      setGameState({
        ...gameState,
        phase: 'ANSWER',
      });
    });
  };

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) return;

    const question = gameState.questions[gameState.currentQuestionIndex];
    const answer: PlayerAnswer = {
      questionId: question.id,
      answer: currentAnswer.trim(),
    };

    if (gameState.turn === 1) {
      // Player 1 finished, switch to Player 2
      animateTransition(() => {
        setGameState({
          ...gameState,
          player1Answers: [...gameState.player1Answers, answer],
          turn: 2,
          phase: 'TRANSITION',
        });
        setCurrentAnswer('');
      });
    } else {
      // Player 2 finished, show result
      const p1Answer = gameState.player1Answers[gameState.currentQuestionIndex].answer;
      const p2Answer = currentAnswer.trim();
      
      // Simple comparison logic (case-insensitive)
      const isMatch = p1Answer.toLowerCase() === p2Answer.toLowerCase();
      const newScore = isMatch ? gameState.matchScore + 1 : gameState.matchScore;

      if (isMatch) soundManager.play('success');
      else soundManager.play('error');

      animateTransition(() => {
        setGameState({
          ...gameState,
          player2Answers: [...gameState.player2Answers, answer],
          matchScore: newScore,
          phase: 'RESULT',
        });
        setCurrentAnswer('');
        
        // Trigger result animation
        resultAnim.setValue(0);
        Animated.spring(resultAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleNextQuestion = () => {
    if (gameState.currentQuestionIndex < gameState.questions.length - 1) {
      animateTransition(() => {
        setGameState({
          ...gameState,
          currentQuestionIndex: gameState.currentQuestionIndex + 1,
          turn: 1,
          phase: 'TRANSITION',
        });
      });
    } else {
      animateTransition(() => {
        setGameState({
          ...gameState,
          phase: 'SUMMARY',
        });
      });
    }
  };

  const handleRestart = () => {
    animateTransition(() => {
      setGameState({
        player1Name: '',
        player2Name: '',
        questions: [],
        currentQuestionIndex: 0,
        turn: 1,
        phase: 'SETUP',
        player1Answers: [],
        player2Answers: [],
        matchScore: 0,
      });
      setCurrentAnswer('');
    });
  };

  // --- RENDER FUNCTIONS ---

  const renderSetup = () => (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.title, typography.romantic]}>💕 Couple Match 💕</Text>
      <Text style={styles.subtitle}>
        {t('couple_match_game.instruction_3')}
      </Text>

      <View style={styles.inputSection}>
        <Text style={styles.label}>{t('couple_match_game.player1_label')}</Text>
        <TextInput
          style={styles.input}
          value={gameState.player1Name}
          onChangeText={(text) =>
            setGameState({ ...gameState, player1Name: text })
          }
          placeholder={t('couple_match_game.enter_name')}
          placeholderTextColor="rgba(255,255,255,0.5)"
        />

        <Text style={[styles.label, { marginTop: spacing.lg }]}>
          {t('couple_match_game.player2_label')}
        </Text>
        <TextInput
          style={styles.input}
          value={gameState.player2Name}
          onChangeText={(text) =>
            setGameState({ ...gameState, player2Name: text })
          }
          placeholder={t('couple_match_game.enter_name')}
          placeholderTextColor="rgba(255,255,255,0.5)"
        />
      </View>

      <PrimaryButton
        title={t('couple_match_game.start_game')}
        onPress={handleStartGame}
        disabled={!gameState.player1Name || !gameState.player2Name}
        fullWidth
      />

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          {t('couple_match_game.instruction_1')}
        </Text>
        <Text style={styles.instructionText}>
          {t('couple_match_game.instruction_2')}
        </Text>
      </View>
    </ScrollView>
  );

  const renderTransition = () => {
    const currentPlayerName = gameState.turn === 1 ? gameState.player1Name : gameState.player2Name;
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.questionPreview}>
          Q{gameState.currentQuestionIndex + 1}: {currentQuestion.question}
        </Text>
        
        <View style={styles.transitionCard}>
          <Text style={styles.transitionEmoji}>📱</Text>
          <Text style={styles.transitionTitle}>
            {t('couple_match_game.next_player')}
          </Text>
          <Text style={styles.transitionName}>{currentPlayerName}</Text>
        </View>

        <PrimaryButton
          title={`I am ${currentPlayerName}`}
          onPress={handleReady}
          fullWidth
        />
      </View>
    );
  };

  const renderAnswer = () => {
    const currentPlayerName = gameState.turn === 1 ? gameState.player1Name : gameState.player2Name;
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

    return (
      <View style={styles.quizContainer}>
        <View style={styles.header}>
          <Text style={styles.questionCounter}>
            Question {gameState.currentQuestionIndex + 1} / {gameState.questions.length}
          </Text>
          <Text style={styles.currentPlayerLabel}>
            {currentPlayerName}'s Turn
          </Text>
        </View>

        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.answerSection}>
          <TextInput
            style={styles.answerInput}
            value={currentAnswer}
            onChangeText={setCurrentAnswer}
            placeholder={t('couple_match_game.answer_placeholder')}
            placeholderTextColor="rgba(255,255,255,0.5)"
            multiline
            autoFocus
          />
        </View>

        <PrimaryButton
          title={t('couple_match_game.submit_answer')}
          onPress={handleSubmitAnswer}
          disabled={!currentAnswer.trim()}
          fullWidth
        />
      </View>
    );
  };

  const renderResult = () => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const p1Answer = gameState.player1Answers[gameState.currentQuestionIndex].answer;
    const p2Answer = gameState.player2Answers[gameState.currentQuestionIndex].answer;
    const isMatch = p1Answer.toLowerCase() === p2Answer.toLowerCase();

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.resultQuestionText}>{currentQuestion.question}</Text>
        
        <Animated.View style={[styles.matchResultContainer, { transform: [{ scale: resultAnim }] }]}>
          <Text style={styles.matchResultEmoji}>
            {isMatch ? '💖' : '💔'}
          </Text>
          <Text style={styles.matchResultTitle}>
            {isMatch ? t('couple_match_game.perfect_match') : t('couple_match_game.needs_work')}
          </Text>
        </Animated.View>

        <View style={styles.comparisonContainer}>
          <View style={[styles.answerBox, isMatch && styles.matchBox]}>
            <Text style={styles.playerName}>{gameState.player1Name}</Text>
            <Text style={styles.answerText}>{p1Answer}</Text>
          </View>
          
          <Text style={styles.vsText}>VS</Text>
          
          <View style={[styles.answerBox, isMatch && styles.matchBox]}>
            <Text style={styles.playerName}>{gameState.player2Name}</Text>
            <Text style={styles.answerText}>{p2Answer}</Text>
          </View>
        </View>

        <PrimaryButton
          title={t('common.next')}
          onPress={handleNextQuestion}
          fullWidth
        />
      </View>
    );
  };

  const renderSummary = () => {
    const percentage = Math.round((gameState.matchScore / gameState.questions.length) * 100);
    
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.resultsTitle}>{t('couple_match_game.results_title')}</Text>
        
        <View style={styles.scoreCard}>
          <Text style={styles.scoreEmoji}>
            {percentage >= 80 ? '💑' : percentage >= 50 ? '😊' : '🤔'}
          </Text>
          <Text style={styles.scoreText}>
            {t('couple_match_game.score', { score: percentage })}
          </Text>
          <Text style={styles.scoreSubtext}>
            {percentage >= 80 
              ? t('couple_match_game.perfect_match') 
              : percentage >= 50 
                ? t('couple_match_game.good_match') 
                : t('couple_match_game.needs_work')}
          </Text>
        </View>

        <View style={styles.historyContainer}>
          {gameState.questions.map((q, i) => {
            const p1 = gameState.player1Answers[i].answer;
            const p2 = gameState.player2Answers[i].answer;
            const match = p1.toLowerCase() === p2.toLowerCase();
            
            return (
              <View key={i} style={[styles.historyItem, match ? styles.historyMatch : styles.historyMismatch]}>
                <Text style={styles.historyQuestion}>{q.question}</Text>
                <View style={styles.historyAnswers}>
                  <Text style={styles.historyAnswerText}>
                    <Text style={{fontWeight: 'bold'}}>{gameState.player1Name}:</Text> {p1}
                  </Text>
                  <Text style={styles.historyAnswerText}>
                    <Text style={{fontWeight: 'bold'}}>{gameState.player2Name}:</Text> {p2}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <PrimaryButton
          title={t('couple_match_game.play_again')}
          onPress={handleRestart}
          fullWidth
        />
      </ScrollView>
    );
  };

  return (
    <LinearGradient
      colors={BACKGROUNDS[backgroundIndex]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          {gameState.phase === 'SETUP' && renderSetup()}
          {gameState.phase === 'TRANSITION' && renderTransition()}
          {gameState.phase === 'ANSWER' && renderAnswer()}
          {gameState.phase === 'RESULT' && renderResult()}
          {gameState.phase === 'SUMMARY' && renderSummary()}
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
  },
  content: {
    padding: spacing.xl,
  },
  centerContainer: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.xxl,
    opacity: 0.9,
  },
  inputSection: {
    marginBottom: spacing.xxl,
  },
  label: {
    ...typography.bodyBold,
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...typography.bodyLarge,
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  instructions: {
    marginTop: spacing.xxl,
    gap: spacing.sm,
  },
  instructionText: {
    ...typography.body,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  // Transition Styles
  questionPreview: {
    ...typography.h3,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  transitionCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: spacing.xxl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.xxl,
  },
  transitionEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  transitionTitle: {
    ...typography.h3,
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  transitionName: {
    ...typography.h1,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  // Quiz Styles
  quizContainer: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  questionCounter: {
    ...typography.caption,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  currentPlayerLabel: {
    ...typography.h2,
    color: '#FFFFFF',
    marginTop: spacing.xs,
  },
  questionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
  },
  questionText: {
    ...typography.h3,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
  },
  answerSection: {
    flex: 1,
    justifyContent: 'center',
  },
  answerInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...typography.bodyLarge,
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  // Result Styles
  resultQuestionText: {
    ...typography.h3,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  matchResultContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  matchResultEmoji: {
    fontSize: 80,
    marginBottom: spacing.sm,
  },
  matchResultTitle: {
    ...typography.h1,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  comparisonContainer: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  answerBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  matchBox: {
    borderColor: '#4ECDC4',
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
  },
  vsText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 'bold',
  },
  playerName: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.xs,
  },
  answerText: {
    ...typography.h3,
    color: '#FFFFFF',
  },
  // Summary Styles
  resultsTitle: {
    ...typography.h1,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  scoreCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
  },
  scoreEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  scoreText: {
    ...typography.h1,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  scoreSubtext: {
    ...typography.bodyLarge,
    color: 'rgba(255,255,255,0.8)',
  },
  historyContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  historyItem: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
  },
  historyMatch: {
    borderLeftColor: '#4ECDC4',
  },
  historyMismatch: {
    borderLeftColor: '#FF6B6B',
  },
  historyQuestion: {
    ...typography.bodyBold,
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  historyAnswers: {
    gap: 4,
  },
  historyAnswerText: {
    ...typography.body,
    color: 'rgba(255,255,255,0.9)',
  },
});
