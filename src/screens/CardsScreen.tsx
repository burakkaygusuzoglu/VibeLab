import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { useGamification } from '../context/GamificationContext';
import { useQuestionHistory } from '../context/QuestionHistoryContext';
import { useGameSession } from '../context/GameSessionContext';
import { soundManager } from '../utils/soundManager';
import { BILINGUAL_CARDS, getCardsByLanguage } from '../data/bilingualCards';
import { CategoryChip } from '../components/CategoryChip';
import { TypeChip } from '../components/TypeChip';
import { SwipeableCard } from '../components/SwipeableCard';
import { LevelUpModal } from '../components/LevelUpModal';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;

export const CardsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, currentLanguage } = useLanguage();
  const { enabledCategories, enabledTypes, minIntensity, maxIntensity } = useSettings();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { completeCard, updateStreak, stats, showLevelUp, closeLevelUp } = useGamification();
  const { incrementQuestionCount } = useQuestionHistory();
  const { handleSwipe } = useGameSession();
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Optimized card filtering and shuffling with useMemo
  const filteredCards = useMemo(() => {
    const cardsInLanguage = getCardsByLanguage(currentLanguage);
    const basicFilter = cardsInLanguage.filter((card) => {
      return (
        enabledCategories.has(card.category) &&
        enabledTypes.has(card.type) &&
        card.intensity >= minIntensity &&
        card.intensity <= maxIntensity
      );
    });
    
    // Fisher-Yates shuffle for better performance
    const shuffled = [...basicFilter];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentLanguage, enabledCategories, enabledTypes, minIntensity, maxIntensity]);

  // Reset index when filters change
  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredCards.length]);

  const currentCard = filteredCards[currentIndex];

  // Track card views
  useEffect(() => {
    if (currentCard) {
      incrementQuestionCount('cards', currentCard.id);
    }
  }, [currentCard?.id, incrementQuestionCount]);

  const handleShare = async () => {
    if (!currentCard) return;
    

    const message = `🔥 ${currentCard.title}\n\n${currentCard.description}\n\nPlay CoupleArena!`;
    
    try {
      await Share.share({
        message,
        title: 'CoupleArena Card',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSwipeRight = async () => {
    if (currentCard) {
      soundManager.play('card-flip');
      await completeCard();
      await updateStreak();
      handleSwipe(currentCard.id, 'right');
      nextCard();
    }
  };

  const onSwipeLeft = () => {
    if (currentCard) {
      soundManager.play('card-flip');
      handleSwipe(currentCard.id, 'left');
      nextCard();
    }
  };

  const nextCard = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // End of stack
      // Maybe show a "No more cards" view or reset
    }
  };

  const handleFavorite = () => {
    if (currentCard) {
      soundManager.play('heart-beat');
      toggleFavorite(currentCard.id);
    }
  };

  if (!currentCard) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            {t('cards.no_cards')}
          </Text>
          <Text style={[styles.emptyHint, { color: theme.textSecondary }]}>
            {t('cards.adjust_filters')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {t('cards.title')}
        </Text>
        <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>{isFavorite(currentCard.id) ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <SwipeableCard
          onSwipeRight={onSwipeRight}
          onSwipeLeft={onSwipeLeft}
          style={styles.cardWrapper}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <CategoryChip category={currentCard.category} />
              <TypeChip type={currentCard.type} />
            </View>

            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: '#FFFFFF' }]}>{currentCard.title}</Text>
              <Text style={[styles.cardDescription, { color: '#FFFFFF' }]}>
                {currentCard.description}
              </Text>
            </View>

            <View style={styles.intensity}>
              {[1, 2, 3].map((level) => (
                <View
                  key={level}
                  style={[
                    styles.intensityDot,
                    {
                      backgroundColor:
                        level <= currentCard.intensity ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                    },
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity 
              style={styles.shareButton}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <Text style={styles.shareIcon}>📤</Text>
            </TouchableOpacity>
          </LinearGradient>
        </SwipeableCard>

        <View style={styles.swipeHint}>
          <Text style={[styles.swipeHintText, { color: theme.textSecondary }]}>
            {t('cards.swipe_hint')}
          </Text>
        </View>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#FF6B6B' }]}
          onPress={onSwipeLeft}
        >
          <Text style={[styles.navButtonText, { color: '#FFFFFF' }]}>✕</Text>
        </TouchableOpacity>
        
        <View style={styles.progressIndicator}>
          <Text style={[styles.progressText, { color: theme.text }]}>
            {currentIndex + 1} / {filteredCards.length}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#4ECDC4' }]}
          onPress={onSwipeRight}
        >
          <Text style={[styles.navButtonText, { color: '#FFFFFF' }]}>✓</Text>
        </TouchableOpacity>
      </View>

      <LevelUpModal
        visible={showLevelUp}
        level={stats.level}
        onClose={closeLevelUp}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    fontSize: 24,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: spacing.sm,
    borderRadius: 20,
  },
  favoriteIcon: {
    fontSize: 32,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'absolute',
  },
  cardGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  cardTitle: {
    ...typography.h2,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardDescription: {
    ...typography.bodyLarge,
    fontSize: 19,
    textAlign: 'center',
    lineHeight: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  intensity: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  intensityDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  swipeHint: {
    position: 'absolute',
    bottom: -40,
  },
  swipeHintText: {
    ...typography.caption,
    fontStyle: 'italic',
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    alignItems: 'center',
  },
  navButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  navButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  progressIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    ...typography.body,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    ...typography.h3,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyHint: {
    ...typography.body,
    textAlign: 'center',
    opacity: 0.7,
  },
  shareButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  shareIcon: {
    fontSize: 20,
  },
});
