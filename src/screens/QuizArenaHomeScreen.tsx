// src/screens/QuizArenaHomeScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { BILINGUAL_QUIZ_QUESTIONS, getRandomQuestions, QuizCategory } from '../data/quizQuestions';
import { soundManager } from '../utils/soundManager';

const { width, height } = Dimensions.get('window');

type QuizArenaHomeScreenProps = NativeStackScreenProps<any, 'QuizArenaHome'>;

interface ModeInfo {
  key: string;
  emoji: string;
  colors: readonly [string, string];
}

interface CategoryInfo {
  key: QuizCategory | 'mixed';
  emoji: string;
  colors: readonly [string, string];
}

// Modes with beautiful gradients
const getModes = (t: (key: string) => string): (ModeInfo & { name: string; description: string })[] => [
  {
    key: 'chill',
    name: t('quiz.mode_chill'),
    emoji: '😌',
    description: t('quiz.mode_chill_desc'),
    colors: ['#667eea', '#764ba2'] as const,
  },
  {
    key: 'versus',
    name: t('quiz.mode_versus'),
    emoji: '⚔️',
    description: t('quiz.mode_versus_desc'),
    colors: ['#f5576c', '#f093fb'] as const,
  },
  {
    key: 'team',
    name: t('quiz.mode_team'),
    emoji: '🤝',
    description: t('quiz.mode_team_desc'),
    colors: ['#4facfe', '#00f2fe'] as const,
  },
];

// Categories with beautiful gradients
const getCategories = (t: (key: string) => string): (CategoryInfo & { name: string })[] => [
  { key: 'mixed', name: t('quiz.mixed'), emoji: '🎲', colors: ['#a18cd1', '#fbc2eb'] as const },
  { key: 'general_knowledge', name: t('quiz.general_knowledge'), emoji: '🌍', colors: ['#11998e', '#38ef7d'] as const },
  { key: 'fun_facts', name: t('quiz.fun_facts'), emoji: '🎉', colors: ['#fc4a1a', '#f7b733'] as const },
  { key: 'relationship', name: t('quiz.relationship'), emoji: '💑', colors: ['#ee0979', '#ff6a00'] as const },
  { key: 'pop_culture', name: t('quiz.pop_culture'), emoji: '🎬', colors: ['#8e2de2', '#4a00e0'] as const },
  { key: 'this_or_that', name: t('quiz.this_or_that'), emoji: '⚖️', colors: ['#00c6ff', '#0072ff'] as const },
];

export const QuizArenaHomeScreen: React.FC<QuizArenaHomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { language: currentLanguage, t } = useLanguage();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | 'mixed' | null>(null);

  const MODES = getModes(t);
  const CATEGORIES = getCategories(t);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const modeAnims = useRef(MODES.map(() => new Animated.Value(1))).current;
  const categoryAnims = useRef(CATEGORIES.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(titleScale, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Glow animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation for button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleModePress = (mode: string, index: number) => {
    soundManager.play('click');
    
    Animated.sequence([
      Animated.timing(modeAnims[index], {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(modeAnims[index], {
        toValue: 1,
        tension: 400,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedMode(mode);
  };

  const handleCategoryPress = (category: QuizCategory | 'mixed', index: number) => {
    soundManager.play('click');

    Animated.sequence([
      Animated.timing(categoryAnims[index], {
        toValue: 0.9,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(categoryAnims[index], {
        toValue: 1,
        tension: 400,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedCategory(category);
  };

  const handlePlayPress = () => {
    if (!selectedCategory) return;
    soundManager.playClick();

    let questions;
    if (selectedCategory === 'mixed') {
      questions = getRandomQuestions(10, currentLanguage);
    } else {
      questions = getRandomQuestions(10, currentLanguage, selectedCategory as QuizCategory);
    }

    if (questions.length < 5) {
      questions = getRandomQuestions(10, currentLanguage);
    }

    navigation.navigate('QuizClassic', {
      questions,
      category: selectedCategory,
    });
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.5],
  });

  return (
    <View style={styles.container}>
      {/* Beautiful gradient background */}
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Animated glow orbs */}
      <Animated.View style={[styles.glowOrb, styles.glowOrb1, { opacity: glowOpacity }]} />
      <Animated.View style={[styles.glowOrb, styles.glowOrb2, { opacity: glowOpacity }]} />
      <Animated.View style={[styles.glowOrb, styles.glowOrb3, { opacity: glowOpacity }]} />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with animations */}
          <Animated.View style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: titleScale }
              ],
            }
          ]}>
            <Text style={styles.titleEmoji}>🎯</Text>
            <Text style={styles.title}>{t('quiz.arena_title')}</Text>
            <Text style={styles.subtitle}>{t('quiz.arena_subtitle')}</Text>
          </Animated.View>

          {/* Mode Selection */}
          {!selectedMode && (
            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionEmoji}>🎮</Text>
                <Text style={styles.sectionTitle}>{t('quiz.mode_selection_title')}</Text>
              </View>
              
              <View style={styles.modesContainer}>
                {MODES.map((mode, index) => (
                  <Animated.View
                    key={mode.key}
                    style={{ transform: [{ scale: modeAnims[index] }] }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => handleModePress(mode.key, index)}
                    >
                      <LinearGradient
                        colors={mode.colors}
                        style={styles.modeCard}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <View style={styles.modeIconBg}>
                          <Text style={styles.modeEmoji}>{mode.emoji}</Text>
                        </View>
                        <View style={styles.modeTextContainer}>
                          <Text style={styles.modeName}>{mode.name}</Text>
                          <Text style={styles.modeDescription}>{mode.description}</Text>
                        </View>
                        <View style={styles.modeArrowBg}>
                          <Text style={styles.modeArrow}>→</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </Animated.View>
          )}

          {/* Category Selection */}
          {selectedMode && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionEmoji}>📚</Text>
                <Text style={styles.sectionTitle}>{t('quiz.category_selection_title')}</Text>
              </View>
              
              <View style={styles.categoriesGrid}>
                {CATEGORIES.map((cat, index) => {
                  const isSelected = selectedCategory === cat.key;
                  return (
                    <Animated.View
                      key={cat.key}
                      style={[
                        styles.categoryWrapper,
                        { transform: [{ scale: categoryAnims[index] }] }
                      ]}
                    >
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => handleCategoryPress(cat.key, index)}
                      >
                        <LinearGradient
                          colors={isSelected ? cat.colors : ['#2a2a4a', '#1a1a3a']}
                          style={[
                            styles.categoryCard,
                            isSelected && styles.categoryCardSelected,
                          ]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        >
                          <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                          <Text style={[
                            styles.categoryName,
                            isSelected && styles.categoryNameSelected
                          ]}>
                            {cat.name}
                          </Text>
                          {isSelected && (
                            <View style={styles.checkBadge}>
                              <Text style={styles.checkText}>✓</Text>
                            </View>
                          )}
                        </LinearGradient>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </View>
            </Animated.View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            {selectedMode && !selectedCategory && (
              <TouchableOpacity
                onPress={() => setSelectedMode(null)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#3a3a5a', '#2a2a4a']}
                  style={styles.backButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.backButtonText}>← {t('navigation.back')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            {selectedCategory && (
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity onPress={handlePlayPress} activeOpacity={0.9}>
                  <LinearGradient
                    colors={['#00c6ff', '#0072ff']}
                    style={styles.playButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.playEmoji}>🚀</Text>
                    <Text style={styles.playText}>{t('quiz.start')}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            )}

            {!selectedMode && (
              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <Text style={styles.homeButtonText}>← {t('navigation.back')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },

  // Glow orbs
  glowOrb: {
    position: 'absolute',
    borderRadius: 999,
  },
  glowOrb1: {
    width: 350,
    height: 350,
    backgroundColor: '#667eea',
    top: -120,
    right: -120,
  },
  glowOrb2: {
    width: 250,
    height: 250,
    backgroundColor: '#f093fb',
    bottom: 150,
    left: -80,
  },
  glowOrb3: {
    width: 180,
    height: 180,
    backgroundColor: '#4facfe',
    top: height * 0.4,
    right: -50,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 20,
  },
  titleEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(102, 126, 234, 0.6)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.65)',
    marginTop: 10,
    letterSpacing: 0.5,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 4,
  },
  sectionEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Modes
  modesContainer: {
    gap: 16,
    marginBottom: 25,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  modeIconBg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  modeEmoji: {
    fontSize: 36,
  },
  modeTextContainer: {
    flex: 1,
  },
  modeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  modeDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  modeArrowBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeArrow: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Categories
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 25,
  },
  categoryWrapper: {
    width: (width - 54) / 2,
  },
  categoryCard: {
    borderRadius: 20,
    padding: 20,
    minHeight: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  categoryCardSelected: {
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowOpacity: 0.4,
  },
  categoryEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Action buttons
  actionContainer: {
    gap: 14,
    marginTop: 10,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    gap: 12,
    shadowColor: '#0072ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  playEmoji: {
    fontSize: 26,
  },
  playText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  backButton: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  homeButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '600',
  },
});
