import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  TextInput,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { useGameSession } from '../context/GameSessionContext';
import { getTruthOrDareCards } from '../data/truthOrDareData';
import { SwipeableCard } from '../components/SwipeableCard';
import { LevelUpModal } from '../components/LevelUpModal';
import { soundManager } from '../utils/soundManager';
import { spacing } from '../theme/spacing';

type RootStackParamList = {
  TruthOrDare: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TruthOrDare'>;
};

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = height * 0.55;

type CardType = 'truth' | 'dare';
type GameCategory = 'couple' | 'friends' | 'family' | 'party';

interface Card {
  type: CardType;
  text: string;
  level: 'normal' | 'spicy' | 'extreme';
  category: GameCategory;
}

// Cards are now loaded from src/data/truthOrDareData.ts

export const TruthOrDareScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t, currentLanguage } = useLanguage();
  const { completeCard, updateStreak, stats, showLevelUp, closeLevelUp } = useGamification();
  const { handleSwipe } = useGameSession();
  
  // Get cards based on current language
  const allCards = React.useMemo(() => getTruthOrDareCards(currentLanguage), [currentLanguage]);
  
  const [gameStarted, setGameStarted] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [editingNames, setEditingNames] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempName, setTempName] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const selectCategory = (category: GameCategory) => {
    setSelectedCategory(category);
    setCategorySelected(true);
  };

  const startGame = (count: number) => {
    setPlayerCount(count);
    const names = Array.from({ length: count }, (_, i) => `${t('player')} ${i + 1}`);
    setPlayerNames(names);
    
    // Filter cards by selected category
    const categoryCards = allCards.filter(card => card.category === selectedCategory);
    const shuffled = [...categoryCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setGameStarted(true);
    
    // Animate card entrance
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleShare = async () => {
    if (!currentCard) return;
    
    const message = `${currentCard.type === 'truth' ? '🔮 Truth' : '🎯 Dare'}: ${currentCard.text}\n\nPlay VibeQuest!`;
    
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
    soundManager.play('card-flip');
    await completeCard();
    await updateStreak();
    // Use index as ID since cards don't have unique IDs in this simple array
    handleSwipe(`tod-${currentCardIndex}`, 'right');
    nextTurn();
  };

  const onSwipeLeft = () => {
    soundManager.play('card-flip');
    handleSwipe(`tod-${currentCardIndex}`, 'left');
    nextTurn();
  };

  const nextTurn = () => {
    // Move to next player and card
    setCurrentPlayer((prev) => (prev >= playerCount! ? 1 : prev + 1));
    setCurrentCardIndex((prev) => (prev + 1) % shuffledCards.length);
  };

  const startEditingName = (index: number) => {
    setEditingIndex(index);
    setTempName(playerNames[index]);
  };

  const savePlayerName = () => {
    if (editingIndex !== null) {
      const newNames = [...playerNames];
      newNames[editingIndex] = tempName.trim() || `Oyuncu ${editingIndex + 1}`;
      setPlayerNames(newNames);
      setEditingIndex(null);
      setTempName('');
    }
  };

  const currentCard = shuffledCards[currentCardIndex];

  // Category Selection Screen
  if (!categorySelected) {
    return (
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53', '#FE6B8B'] as any}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.selectionContent} showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainEmoji}>🎭</Text>
              <Text style={styles.mainTitle}>Truth or Dare</Text>
              <Text style={styles.subtitle}>
                {t('truthOrDare.whoAreYouPlayingWith')}
              </Text>
            </View>

            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => selectCategory('couple')}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#FF6B9D', '#C06C84'] as any}
                  style={styles.categoryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.categoryEmoji}>💑</Text>
                  <Text style={styles.categoryTitle}>{t('truthOrDare.coupleMode')}</Text>
                  <Text style={styles.categoryDesc}>{t('truthOrDare.coupleModeDesc')}</Text>
                  <View style={styles.categoryTip}>
                    <Text style={styles.categoryTipText}>💡 {t('truthOrDare.coupleModeTip')}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => selectCategory('friends')}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#A770EF', '#CF8BF3'] as any}
                  style={styles.categoryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.categoryEmoji}>👯</Text>
                  <Text style={styles.categoryTitle}>{t('truthOrDare.friendsMode')}</Text>
                  <Text style={styles.categoryDesc}>{t('truthOrDare.friendsModeDesc')}</Text>
                  <View style={styles.categoryTip}>
                    <Text style={styles.categoryTipText}>💡 {t('truthOrDare.friendsModeTip')}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => selectCategory('family')}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#FFA751', '#FFE259'] as any}
                  style={styles.categoryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.categoryEmoji}>👨‍👩‍👧‍👦</Text>
                  <Text style={styles.categoryTitle}>{t('truthOrDare.familyMode')}</Text>
                  <Text style={styles.categoryDesc}>{t('truthOrDare.familyModeDesc')}</Text>
                  <View style={styles.categoryTip}>
                    <Text style={styles.categoryTipText}>💡 {t('truthOrDare.familyModeTip')}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => selectCategory('party')}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#FF6B6B', '#FFA06B'] as any}
                  style={styles.categoryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.categoryEmoji}>🎉</Text>
                  <Text style={styles.categoryTitle}>{t('truthOrDare.partyMode')}</Text>
                  <Text style={styles.categoryDesc}>{t('truthOrDare.partyModeDesc')}</Text>
                  <View style={styles.categoryTip}>
                    <Text style={styles.categoryTipText}>💡 {t('truthOrDare.partyModeTip')}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Player Selection Screen
  if (!gameStarted) {
    return (
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53', '#FE6B8B'] as any}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCategorySelected(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>←</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.selectionContent} showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainEmoji}>
                {selectedCategory === 'couple' ? '💑' : 
                 selectedCategory === 'friends' ? '👯' :
                 selectedCategory === 'family' ? '👨‍👩‍👧‍👦' : '🎉'}
              </Text>
              <Text style={styles.mainTitle}>
                {selectedCategory === 'couple' ? t('truthOrDare.coupleMode') : 
                 selectedCategory === 'friends' ? t('truthOrDare.friendsMode') :
                 selectedCategory === 'family' ? t('truthOrDare.familyMode') : t('truthOrDare.partyMode')}
              </Text>
              <Text style={styles.subtitle}>
                {t('truthOrDare.howManyPlayers')}
              </Text>
            </View>

            <View style={styles.playerSelectionContainer}>
              <Text style={styles.questionText}>{t('truthOrDare.playerCount')}</Text>
              
              <View style={styles.playerGrid}>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((count) => (
                  <TouchableOpacity
                    key={count}
                    style={[
                      styles.playerCountButton,
                      playerCount === count && styles.playerCountButtonSelected,
                    ]}
                    onPress={() => startGame(count)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.playerCountText,
                        playerCount === count && styles.playerCountTextSelected,
                      ]}
                    >
                      {count}
                    </Text>
                    <Text
                      style={[
                        styles.playerCountLabel,
                        playerCount === count && styles.playerCountLabelSelected,
                      ]}
                    >
                      {count === 2 ? t('truthOrDare.duo') : t('truthOrDare.player')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.featuresContainer}>
              <FeatureItem emoji="🎲" text={t('truthOrDare.randomTruthDare')} />
              <FeatureItem emoji="🔥" text={t('truthOrDare.allLevels')} />
              <FeatureItem emoji="👥" text={t('truthOrDare.upTo12Players')} />
              <FeatureItem emoji="✨" text={t('truthOrDare.turnBasedSystem')} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Game Screen
  const cardColor =
    currentCard?.type === 'truth'
      ? ['#667EEA', '#764BA2']
      : ['#F093FB', '#F5576C'];

  return (
    <LinearGradient
      colors={cardColor as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            setGameStarted(false);
            setCategorySelected(false);
            setSelectedCategory(null);
            setPlayerCount(null);
            setCurrentPlayer(1);
            setCurrentCardIndex(0);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.gameHeader}>
          <View style={styles.playerIndicator}>
            <Text style={styles.playerTurnLabel}>{t('truthOrDare.turn')}</Text>
            <TouchableOpacity
              onPress={() => setEditingNames(!editingNames)}
              activeOpacity={0.8}
            >
              <Text style={styles.playerTurnText}>
                {playerNames[currentPlayer - 1]} 👤
              </Text>
            </TouchableOpacity>
          </View>
          
          {editingNames && (
            <View style={styles.nameEditContainer}>
              <Text style={styles.nameEditTitle}>{t('truthOrDare.editNames')}</Text>
              <ScrollView style={styles.nameEditList} showsVerticalScrollIndicator={false}>
                {playerNames.map((name, index) => (
                  <View key={index} style={styles.nameEditRow}>
                    <Text style={styles.nameEditNumber}>{index + 1}.</Text>
                    {editingIndex === index ? (
                      <>
                        <TextInput
                          style={styles.nameEditInputField}
                          value={tempName}
                          onChangeText={setTempName}
                          placeholder={`${t('truthOrDare.player')} ${index + 1}`}
                          placeholderTextColor="#999"
                          autoFocus
                        />
                        <TouchableOpacity
                          style={styles.saveButton}
                          onPress={savePlayerName}
                        >
                          <Text style={styles.saveButtonText}>✓</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.nameEditInput}
                        onPress={() => startEditingName(index)}
                      >
                        <Text style={styles.nameEditText}>{name}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.nameEditClose}
                onPress={() => {
                  setEditingNames(false);
                  setEditingIndex(null);
                }}
              >
                <Text style={styles.nameEditCloseText}>{t('truthOrDare.close')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.gameArea}>
          <SwipeableCard
            onSwipeRight={onSwipeRight}
            onSwipeLeft={onSwipeLeft}
            style={styles.cardWrapper}
          >
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardType}>
                  {currentCard?.type === 'truth' ? `🔮 ${t('truthOrDare.truth')}` : `🎯 ${t('truthOrDare.dare')}`}
                </Text>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>
                    {currentCard?.level === 'normal'
                      ? `😊 ${t('truthOrDare.normal')}`
                      : currentCard?.level === 'spicy'
                      ? `🌶️ ${t('truthOrDare.spicy')}`
                      : `🔥 ${t('truthOrDare.extreme')}`}
                  </Text>
                </View>
              </View>

              <Text style={styles.cardText}>{currentCard?.text}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.instructionText}>
                  {t('truthOrDare.swipeOrPress')}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.shareButton}
                onPress={handleShare}
                activeOpacity={0.7}
              >
                <Text style={styles.shareIcon}>📤</Text>
              </TouchableOpacity>
            </View>
          </SwipeableCard>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.forfeitButton]}
            onPress={onSwipeLeft}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>✕ {t('truthOrDare.forfeit')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={onSwipeRight}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>✓ {t('truthOrDare.completed')}</Text>
          </TouchableOpacity>
        </View>
        
        <LevelUpModal
          visible={showLevelUp}
          level={stats.level}
          onClose={closeLevelUp}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const FeatureItem: React.FC<{ emoji: string; text: string }> = ({ emoji, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureEmoji}>{emoji}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  forfeitButton: {
    backgroundColor: '#FF6B6B',
  },
  completeButton: {
    backgroundColor: '#4ECDC4',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  selectionContent: {
    padding: spacing.lg,
    paddingTop: 80,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    fontWeight: '500',
  },
  playerSelectionContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  playerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  playerCountButton: {
    width: (width - spacing.lg * 2 - 12 * 2) / 3,
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  playerCountButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#FFFFFF',
  },
  playerCountText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  playerCountTextSelected: {
    color: '#FF6B6B',
  },
  playerCountLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  playerCountLabelSelected: {
    color: '#FF6B6B',
  },
  featuresContainer: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  featureEmoji: {
    fontSize: 28,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  categoryContainer: {
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  categoryGradient: {
    padding: 24,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  categoryEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  categoryDesc: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 12,
  },
  categoryTip: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryTipText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  gameHeader: {
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  playerIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  playerTurnLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: 4,
  },
  playerTurnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nameEditContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxHeight: 300,
  },
  nameEditTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  nameEditList: {
    maxHeight: 180,
  },
  nameEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  nameEditNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    width: 24,
  },
  nameEditInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 12,
  },
  nameEditInputField: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  nameEditText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameEditClose: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  nameEditCloseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 32,
    padding: 32,
    minHeight: height * 0.5,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cardType: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FF6B6B',
    marginBottom: 12,
    letterSpacing: 2,
  },
  levelBadge: {
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  cardText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    lineHeight: 38,
    flex: 1,
    paddingVertical: 20,
  },
  cardFooter: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#F0F0F0',
  },
  instructionText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  nextButton: {
    margin: spacing.lg,
    marginBottom: spacing.xl,
  },
  nextButtonGradient: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  shareButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareIcon: {
    fontSize: 20,
  },
});
