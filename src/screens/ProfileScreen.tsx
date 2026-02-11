import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { useGamification } from '../context/GamificationContext';
import { usePersonalization } from '../context/PersonalizationContext';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { CardCategory, CardType } from '../data/cards';
import { spacing } from '../theme/spacing';
import { LevelUpModal } from '../components/LevelUpModal';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme, themeMode, setThemeMode } = useTheme();
  const { stats, getAvailableBadges, getNextLevelXP, updateStreak, showLevelUp, closeLevelUp } = useGamification();
  const { personalization } = usePersonalization();
  const { t } = useLanguage();
  const {
    enabledCategories,
    enabledTypes,
    minIntensity,
    maxIntensity,
    toggleCategory,
    toggleType,
    setIntensityRange,
    soundEnabled,
    soundVolume,
    backgroundMusicEnabled,
    backgroundMusicVolume,
    musicMood,
    language,
    defaultQuizDifficulty,
    showQuizExplanations,
    setSoundEnabled,
    setSoundVolume,
    setBackgroundMusicEnabled,
    setBackgroundMusicVolume,
    setMusicMood,
    setLanguage,
    setDefaultQuizDifficulty,
    setShowQuizExplanations,
  } = useSettings();

  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [vibrateEnabled, setVibrateEnabled] = useState(true);

  React.useEffect(() => {
    updateStreak();
  }, []);

  const categories: CardCategory[] = ['fun', 'romantic', 'crazy', 'adventurous', 'strength', 'general'];
  const types: CardType[] = ['truth', 'dare', 'question', 'challenge'];

  const nextLevelXP = getNextLevelXP();
  const xpProgress = stats.totalXP / nextLevelXP;
  const allBadges = getAvailableBadges();
  const unlockedBadges = allBadges.filter((b) => b.unlockedAt);
  const lockedBadges = allBadges.filter((b) => !b.unlockedAt);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Settings Button at Top */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
        activeOpacity={0.7}
      >
        <View style={[styles.settingsButtonInner, { backgroundColor: theme.card }]}>
          <Text style={styles.settingsIcon}>⚙️</Text>
          <Text style={[styles.settingsButtonText, { color: theme.text }]}>
            {t('profile.settings_button')}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Header Card */}
      <LinearGradient
        colors={['#667EEA', '#764BA2'] as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>
            {personalization.relationshipStage === 'married'
              ? '💏'
              : personalization.relationshipStage === 'engaged'
              ? '💍'
              : personalization.relationshipStage === 'ldr'
              ? '🌍'
              : '💑'}
          </Text>
        </View>
        <Text style={styles.titleText}>{stats.currentTitle}</Text>
        <Text style={styles.levelText}>Level {stats.level}</Text>
        
        {/* Streak Badge */}
        <View style={styles.streakBadge}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>{stats.currentStreak} Day Streak</Text>
        </View>

        {/* XP Progress */}
        <View style={styles.xpContainer}>
          <View style={styles.xpBar}>
            <View style={[styles.xpFill, { width: `${xpProgress * 100}%` }]} />
          </View>
          <Text style={styles.xpText}>
            {t('profile.xp_progress', { current: stats.totalXP, total: nextLevelXP })}
          </Text>
        </View>
      </LinearGradient>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Text style={styles.statEmoji}>🎴</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {stats.cardsCompleted}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {t('profile.stats_cards')}
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Text style={styles.statEmoji}>🧠</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {stats.quizzesCompleted}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {t('profile.stats_quizzes')}
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {stats.currentStreak}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {t('profile.stats_streak')}
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Text style={styles.statEmoji}>🏆</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {unlockedBadges.length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {t('profile.stats_badges')}
          </Text>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('profile.achievements')}
        </Text>

        {/* Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <View style={styles.badgesContainer}>
            {unlockedBadges.map((badge) => (
              <View
                key={badge.id}
                style={[styles.badgeCard, { backgroundColor: theme.card }]}
              >
                <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                <Text style={[styles.badgeName, { color: theme.text }]}>
                  {badge.name}
                </Text>
                <Text
                  style={[styles.badgeDescription, { color: theme.textSecondary }]}
                >
                  {badge.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <>
            <Text
              style={[
                styles.subsectionTitle,
                { color: theme.textSecondary, marginTop: 24 },
              ]}
            >
              {t('profile.locked')}
            </Text>
            <View style={styles.badgesContainer}>
              {lockedBadges.slice(0, 6).map((badge) => (
                <View
                  key={badge.id}
                  style={[
                    styles.badgeCard,
                    styles.lockedBadge,
                    { backgroundColor: theme.card },
                  ]}
                >
                  <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                  <Text
                    style={[
                      styles.badgeName,
                      { color: theme.textSecondary, opacity: 0.6 },
                    ]}
                  >
                    {badge.name}
                  </Text>
                  <Text
                    style={[
                      styles.badgeDescription,
                      { color: theme.textSecondary, opacity: 0.5 },
                    ]}
                  >
                    {badge.description}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      {/* Personalization Info */}
      {personalization.hasCompletedOnboarding && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('profile.title')}
          </Text>
          <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Relationship:
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {personalization.relationshipStage === 'new'
                  ? 'Just Started 🌱'
                  : personalization.relationshipStage === 'dating'
                  ? 'Dating 💑'
                  : personalization.relationshipStage === 'serious'
                  ? 'Serious 💖'
                  : personalization.relationshipStage === 'engaged'
                  ? 'Engaged 💍'
                  : personalization.relationshipStage === 'married'
                  ? 'Married 💏'
                  : 'Long Distance 🌍'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Current Mood:
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {personalization.currentMood === 'playful'
                  ? 'Playful 🎉'
                  : personalization.currentMood === 'romantic'
                  ? 'Romantic 🌹'
                  : personalization.currentMood === 'adventurous'
                  ? 'Adventurous 🎯'
                  : personalization.currentMood === 'deep'
                  ? 'Deep 🧠'
                  : personalization.currentMood === 'intimate'
                  ? 'Intimate 💕'
                  : 'Chill 😌'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Goals:
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {personalization.goals.length} selected
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Milestones */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('profile.stats_title')}
        </Text>
        <View style={[styles.milestoneCard, { backgroundColor: theme.card }]}>
          <View style={styles.milestoneRow}>
            <Text style={styles.milestoneIcon}>🔥</Text>
            <View style={styles.milestoneInfo}>
              <Text style={[styles.milestoneTitle, { color: theme.text }]}>
                Longest Streak
              </Text>
              <Text
                style={[styles.milestoneValue, { color: theme.textSecondary }]}
              >
                {stats.longestStreak} days
              </Text>
            </View>
          </View>
          <View style={styles.milestoneRow}>
            <Text style={styles.milestoneIcon}>✨</Text>
            <View style={styles.milestoneInfo}>
              <Text style={[styles.milestoneTitle, { color: theme.text }]}>
                Custom Cards
              </Text>
              <Text
                style={[styles.milestoneValue, { color: theme.textSecondary }]}
              >
                {stats.customCardsCreated} created
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.settingsHeader}
          onPress={() => setSettingsExpanded(!settingsExpanded)}
        >
          <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 0 }]}>
            ⚙️ Settings
          </Text>
          <Text style={[styles.expandIcon, { color: theme.text }]}>
            {settingsExpanded ? '▼' : '▶'}
          </Text>
        </TouchableOpacity>

        {settingsExpanded && (
          <View style={styles.settingsContent}>
            {/* Theme */}
            <View style={styles.settingSection}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>🎨 Theme</Text>
              <View style={styles.optionsRow}>
                {(['light', 'dark', 'auto'] as const).map((mode) => (
                  <TouchableOpacity
                    key={mode}
                    style={[
                      styles.themeOption,
                      { backgroundColor: themeMode === mode ? theme.primary : theme.card },
                    ]}
                    onPress={() => setThemeMode(mode)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: themeMode === mode ? '#FFFFFF' : theme.text },
                      ]}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sound & Audio */}
            <View style={styles.settingSection}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>🔊 Sound & Audio</Text>
              
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingLabel, { color: theme.text }]}>Sound Effects</Text>
                  <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                    Button clicks, quiz feedback
                  </Text>
                </View>
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  trackColor={{ false: theme.border, true: theme.primary }}
                  thumbColor={'#FFFFFF'}
                />
              </View>

              {soundEnabled && (
                <View style={styles.volumeContainer}>
                  <Text style={[styles.volumeLabel, { color: theme.text }]}>
                    Effects Volume: {Math.round(soundVolume * 100)}%
                  </Text>
                  <View style={styles.volumeButtons}>
                    {[0.3, 0.5, 0.7, 1.0].map((vol) => (
                      <TouchableOpacity
                        key={vol}
                        style={[
                          styles.volumeButton,
                          {
                            backgroundColor: soundVolume === vol ? theme.primary : theme.card,
                            borderWidth: 2,
                            borderColor: soundVolume === vol ? theme.primary : theme.border,
                          },
                        ]}
                        onPress={() => setSoundVolume(vol)}
                      >
                        <Text style={[styles.volumePercentText, { color: soundVolume === vol ? '#FFFFFF' : theme.text }]}>
                          {Math.round(vol * 100)}%
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Background Music Section */}
            <View style={styles.settingSection}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>🎵 Background Music</Text>
              
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingLabel, { color: theme.text }]}>Enable Background Music</Text>
                  <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                    Ambient music while using app
                  </Text>
                </View>
                <Switch
                  value={backgroundMusicEnabled}
                  onValueChange={setBackgroundMusicEnabled}
                  trackColor={{ false: theme.border, true: theme.primary }}
                  thumbColor={'#FFFFFF'}
                />
              </View>

              {backgroundMusicEnabled && (
                <>
                  <View style={styles.volumeContainer}>
                    <Text style={[styles.volumeLabel, { color: theme.text }]}>
                      Music Volume: {Math.round(backgroundMusicVolume * 100)}%
                    </Text>
                    <View style={styles.volumeButtons}>
                      {[0.1, 0.15, 0.2, 0.25, 0.3].map((vol) => (
                        <TouchableOpacity
                          key={vol}
                          style={[
                            styles.musicVolumeButton,
                            {
                              backgroundColor: backgroundMusicVolume === vol ? theme.primary : theme.card,
                              borderWidth: 2,
                              borderColor: backgroundMusicVolume === vol ? theme.primary : theme.border,
                            },
                          ]}
                          onPress={() => setBackgroundMusicVolume(vol)}
                        >
                          <Text style={[styles.volumePercentText, { color: backgroundMusicVolume === vol ? '#FFFFFF' : theme.text }]}>
                            {Math.round(vol * 100)}%
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <Text style={[styles.settingSubtitle, { color: theme.textSecondary, marginTop: 12 }]}>
                    Music Mood
                  </Text>
                  <View style={styles.moodOptionsRow}>
                    {[
                      { mood: 'chill' as const, emoji: '😌', label: 'Chill', color: '#667EEA' },
                      { mood: 'romantic' as const, emoji: '💕', label: 'Romantic', color: '#F093FB' },
                      { mood: 'playful' as const, emoji: '🎉', label: 'Playful', color: '#4FACFE' },
                    ].map((option) => (
                      <TouchableOpacity
                        key={option.mood}
                        style={[
                          styles.moodOption,
                          {
                            backgroundColor: musicMood === option.mood ? option.color : theme.card,
                            borderWidth: 2,
                            borderColor: musicMood === option.mood ? option.color : theme.border,
                          },
                        ]}
                        onPress={() => setMusicMood(option.mood)}
                      >
                        <Text style={{ fontSize: 32, marginBottom: 4 }}>{option.emoji}</Text>
                        <Text
                          style={[
                            styles.moodText,
                            { color: musicMood === option.mood ? '#FFFFFF' : theme.text },
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingLabel, { color: theme.text }]}>Vibration</Text>
                  <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                    Haptic feedback
                  </Text>
                </View>
                <Switch
                  value={vibrateEnabled}
                  onValueChange={setVibrateEnabled}
                  trackColor={{ false: theme.border, true: theme.primary }}
                  thumbColor={'#FFFFFF'}
                />
              </View>
            </View>

            {/* Quiz Settings */}
            <View style={styles.settingSection}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>{t('settings.quiz_title')}</Text>
              
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                {t('settings.language_title')}
              </Text>
              <View style={styles.optionsRow}>
                {[
                  { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
                  { code: 'en', flag: '🇬🇧', name: 'English' },
                ].map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.langOption,
                      {
                        backgroundColor: language === lang.code ? theme.primary : theme.card,
                      },
                    ]}
                    onPress={() => setLanguage(lang.code as 'tr' | 'en')}
                  >
                    <Text style={{ fontSize: 24, marginBottom: 4 }}>{lang.flag}</Text>
                    <Text
                      style={[
                        styles.langText,
                        { color: language === lang.code ? '#FFFFFF' : theme.text },
                      ]}
                    >
                      {lang.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.settingSubtitle, { color: theme.textSecondary, marginTop: 16 }]}>
                {t('settings.default_difficulty')}
              </Text>
              <View style={styles.optionsRow}>
                {(['easy', 'medium', 'hard', 'mixed'] as const).map((diff) => (
                  <TouchableOpacity
                    key={diff}
                    style={[
                      styles.diffOption,
                      {
                        backgroundColor: defaultQuizDifficulty === diff ? theme.primary : theme.card,
                      },
                    ]}
                    onPress={() => setDefaultQuizDifficulty(diff)}
                  >
                    <Text
                      style={[
                        styles.diffText,
                        { color: defaultQuizDifficulty === diff ? '#FFFFFF' : theme.text },
                      ]}
                    >
                      {t(`settings.difficulty_${diff}`)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={[styles.settingRow, { marginTop: 16 }]}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingLabel, { color: theme.text }]}>{t('settings.show_explanations')}</Text>
                  <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                    {t('settings.show_explanations_desc')}
                  </Text>
                </View>
                <Switch
                  value={showQuizExplanations}
                  onValueChange={setShowQuizExplanations}
                  trackColor={{ false: theme.border, true: theme.primary }}
                  thumbColor={'#FFFFFF'}
                />
              </View>
            </View>

            {/* Card Preferences */}
            <View style={styles.settingSection}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>{t('settings.card_preferences')}</Text>
              
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                {t('settings.categories')}
              </Text>
              <View style={styles.categoriesGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor: enabledCategories.has(category)
                          ? theme[category]
                          : theme.card,
                      },
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        { color: enabledCategories.has(category) ? '#FFFFFF' : theme.text },
                      ]}
                    >
                      {t(`categories.${category}`)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.settingSubtitle, { color: theme.textSecondary, marginTop: 16 }]}>
                {t('settings.card_types')}
              </Text>
              <View style={styles.categoriesGrid}>
                {types.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor: enabledTypes.has(type) ? theme.primary : theme.card,
                      },
                    ]}
                    onPress={() => toggleType(type)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        { color: enabledTypes.has(type) ? '#FFFFFF' : theme.text },
                      ]}
                    >
                      {t(`card_types.${type}`)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.settingSubtitle, { color: theme.textSecondary, marginTop: 16 }]}>
                {t('settings.intensity', { min: minIntensity, max: maxIntensity })}
              </Text>
              <View style={styles.optionsRow}>
                {([1, 2, 3] as const).map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.intensityOption,
                      {
                        backgroundColor:
                          level >= minIntensity && level <= maxIntensity
                            ? theme.primary
                            : theme.card,
                      },
                    ]}
                    onPress={() => {
                      if (level >= minIntensity && level <= maxIntensity) {
                        if (level === minIntensity && level < maxIntensity) {
                          setIntensityRange((level + 1) as 1 | 2 | 3, maxIntensity);
                        } else if (level === maxIntensity && level > minIntensity) {
                          setIntensityRange(minIntensity, (level - 1) as 1 | 2 | 3);
                        }
                      } else {
                        setIntensityRange(
                          Math.min(level, minIntensity) as 1 | 2 | 3,
                          Math.max(level, maxIntensity) as 1 | 2 | 3
                        );
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.intensityText,
                        {
                          color:
                            level >= minIntensity && level <= maxIntensity
                              ? '#FFFFFF'
                              : theme.text,
                        },
                      ]}
                    >
                      Level {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  settingsButton: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  settingsButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsIcon: {
    fontSize: 16,
  },
  settingsButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerCard: {
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarEmoji: {
    fontSize: 50,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.md,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: spacing.lg,
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  streakText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  xpContainer: {
    width: '100%',
  },
  xpBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  xpText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    padding: spacing.lg,
    borderRadius: 20,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  badgeCard: {
    width: (width - spacing.lg * 2 - spacing.md * 2) / 3,
    padding: spacing.md,
    borderRadius: 16,
    alignItems: 'center',
  },
  lockedBadge: {
    opacity: 0.5,
  },
  badgeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 11,
    textAlign: 'center',
  },
  infoCard: {
    padding: spacing.lg,
    borderRadius: 20,
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 15,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  milestoneCard: {
    padding: spacing.lg,
    borderRadius: 20,
    gap: spacing.md,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  milestoneIcon: {
    fontSize: 32,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  milestoneValue: {
    fontSize: 14,
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  expandIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsContent: {
    gap: 24,
    marginTop: 16,
  },
  settingSection: {
    gap: 12,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 13,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  volumeContainer: {
    marginLeft: 16,
    gap: 8,
  },
  volumeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  volumeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  volumeButton: {
    width: 60,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicVolumeButton: {
    width: 55,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumePercentText: {
    fontSize: 13,
    fontWeight: '600',
  },
  moodOptionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  moodOption: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  moodText: {
    fontSize: 13,
    fontWeight: '600',
  },
  langOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
  },
  diffOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  diffText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  intensityOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  intensityText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
