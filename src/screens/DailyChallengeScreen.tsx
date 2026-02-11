import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useGamification } from '../context/GamificationContext';
import { usePersonalization } from '../context/PersonalizationContext';
import { getCardsByLanguage } from '../data/bilingualCards';
import { PrimaryButton } from '../components/PrimaryButton';
import { LevelUpModal } from '../components/LevelUpModal';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

export const DailyChallengeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { currentLanguage } = useLanguage();
  const { stats, updateStreak, addXP, showLevelUp, closeLevelUp } = useGamification();
  const { personalization } = usePersonalization();
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Get today's challenge (would come from Firebase in production)
    const today = new Date().toDateString();
    const cardsInLanguage = getCardsByLanguage(currentLanguage);
    
    // Filter based on mood if set
    let filteredCards = cardsInLanguage;
    if (personalization.currentMood) {
      const moodMap: Record<string, string[]> = {
        romantic: ['romantic'],
        playful: ['fun'],
        deep: ['strength', 'general'],
        adventurous: ['adventurous'],
        intimate: ['crazy', 'romantic'],
        chill: ['general', 'fun']
      };
      
      const targetCategories = moodMap[personalization.currentMood];
      if (targetCategories) {
        const moodCards = cardsInLanguage.filter(card => 
          targetCategories.includes(card.category)
        );
        if (moodCards.length > 0) {
          filteredCards = moodCards;
        }
      }
    }

    const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
    setCurrentChallenge(randomCard);
    
    // Update streak on load
    updateStreak();
  }, [currentLanguage, personalization.currentMood]);

  const handleComplete = async () => {
    setCompleted(true);
    await updateStreak();
    await addXP(50); // Bonus for daily challenge
  };

  if (!currentChallenge) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loading}>
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Loading today's challenge...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={['#F093FB', '#F5576C']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>⭐ Daily Challenge ⭐</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}</Text>
          </View>

          <View style={styles.streakCard}>
            <View style={styles.streakRow}>
              <View style={styles.streakItem}>
                <Text style={styles.streakEmoji}>🔥</Text>
                <Text style={styles.streakNumber}>{stats.currentStreak}</Text>
                <Text style={styles.streakLabel}>Day Streak</Text>
              </View>
              <View style={styles.streakItem}>
                <Text style={styles.streakEmoji}>🏆</Text>
                <Text style={styles.streakNumber}>+50</Text>
                <Text style={styles.streakLabel}>Points</Text>
              </View>
            </View>
          </View>

          {!completed ? (
            <>
              <View style={styles.challengeCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardType}>{currentChallenge.type.toUpperCase()}</Text>
                  <Text style={styles.cardCategory}>{currentChallenge.category}</Text>
                </View>
                
                <Text style={styles.cardTitle}>{currentChallenge.title}</Text>
                <Text style={styles.cardDescription}>{currentChallenge.description}</Text>

                <View style={styles.intensity}>
                  <Text style={styles.intensityLabel}>Intensity:</Text>
                  {[1, 2, 3].map((level) => (
                    <View
                      key={level}
                      style={[
                        styles.intensityDot,
                        {
                          backgroundColor:
                            level <= currentChallenge.intensity 
                              ? '#FF6B6B' 
                              : 'rgba(0,0,0,0.1)',
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.instructions}>
                <Text style={styles.instructionsTitle}>📋 How to Complete</Text>
                <Text style={styles.instructionsText}>
                  1. Read the challenge carefully{'\n'}
                  2. Complete it with your partner{'\n'}
                  3. Tap "Mark as Complete" when done{'\n'}
                  4. Come back tomorrow for a new one!
                </Text>
              </View>

              <PrimaryButton
                title="✅ Mark as Complete"
                onPress={handleComplete}
                fullWidth
              />
            </>
          ) : (
            <View style={styles.completedContainer}>
              <Text style={styles.completedEmoji}>🎉</Text>
              <Text style={styles.completedTitle}>Challenge Complete!</Text>
              <Text style={styles.completedMessage}>
                You earned 50 points and kept your {stats.currentStreak}-day streak alive!
              </Text>
              <Text style={styles.nextChallenge}>
                Come back tomorrow for a new challenge
              </Text>
              
              <View style={styles.shareContainer}>
                <Text style={styles.shareText}>Share your achievement:</Text>
                <View style={styles.shareButtons}>
                  <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>📱 Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>📸 Screenshot</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
            <Text style={styles.tipsText}>
              • Complete challenges daily to build your streak{'\n'}
              • Longer streaks unlock special rewards{'\n'}
              • Share challenges with friends to compete{'\n'}
              • Set a reminder to never miss a day!
            </Text>
          </View>
        </ScrollView>
        
        <LevelUpModal
          visible={showLevelUp}
          level={stats.level}
          onClose={closeLevelUp}
        />
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
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '900',
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  date: {
    ...typography.body,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  streakCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  streakItem: {
    alignItems: 'center',
  },
  streakEmoji: {
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  streakNumber: {
    ...typography.h1,
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  streakLabel: {
    ...typography.caption,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  cardType: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#666',
  },
  cardCategory: {
    ...typography.caption,
    fontSize: 12,
    color: '#999',
  },
  cardTitle: {
    ...typography.h2,
    fontSize: 24,
    marginBottom: spacing.sm,
    color: '#000',
  },
  cardDescription: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: spacing.lg,
  },
  intensity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  intensityLabel: {
    ...typography.caption,
    color: '#666',
    marginRight: spacing.xs,
  },
  intensityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  instructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  instructionsTitle: {
    ...typography.h3,
    color: '#FFFFFF',
    marginBottom: spacing.md,
  },
  instructionsText: {
    ...typography.body,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  completedContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  completedEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  completedTitle: {
    ...typography.h1,
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '900',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  completedMessage: {
    ...typography.bodyLarge,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  nextChallenge: {
    ...typography.body,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  shareContainer: {
    width: '100%',
    marginTop: spacing.xl,
  },
  shareText: {
    ...typography.h3,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
  shareButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  shareButtonText: {
    ...typography.button,
    color: '#FFFFFF',
  },
  tipsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  tipsTitle: {
    ...typography.h3,
    color: '#FFFFFF',
    marginBottom: spacing.md,
  },
  tipsText: {
    ...typography.body,
    color: '#FFFFFF',
    lineHeight: 24,
    opacity: 0.9,
  },
});
