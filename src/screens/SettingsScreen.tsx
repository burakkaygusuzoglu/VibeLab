import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { usePersonalization, CurrentMood } from '../context/PersonalizationContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { personalization, updatePersonalization } = usePersonalization();

  const handleLanguageChange = async (lang: 'tr' | 'en') => {
    await setLanguage(lang);
  };

  const handleMoodChange = async (mood: CurrentMood) => {
    await updatePersonalization({ currentMood: mood });
  };

  const moods: { id: CurrentMood; emoji: string; label: string }[] = [
    { id: 'romantic', emoji: '🌹', label: 'Romantic' },
    { id: 'playful', emoji: '🎉', label: 'Playful' },
    { id: 'deep', emoji: '🧠', label: 'Deep' },
    { id: 'adventurous', emoji: '🔥', label: 'Adventurous' },
    { id: 'intimate', emoji: '💕', label: 'Intimate' },
    { id: 'chill', emoji: '😌', label: 'Chill' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={[theme.primary, theme.secondary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t('settings.title')}</Text>
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Language Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('settings.language_title')}
          </Text>
          
          <View style={styles.languageCards}>
            {/* English Option */}
            <TouchableOpacity
              onPress={() => handleLanguageChange('en')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={language === 'en' 
                  ? [theme.primary, theme.secondary] 
                  : ['#2A2A2A', '#1A1A1A']}
                style={[
                  styles.languageCard,
                  language === 'en' && styles.selectedCard,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.languageContent}>
                  <View style={styles.flagContainer}>
                    <Text style={styles.flag}>🇬🇧</Text>
                  </View>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>English</Text>
                    <Text style={styles.languageNative}>İngilizce</Text>
                  </View>
                  {language === 'en' && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkIcon}>✓</Text>
                    </View>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Text style={[styles.languageNote, { color: theme.textSecondary }]}>
            {t('settings.language_note')}
          </Text>
        </View>

        {/* Current Mood Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Current Mood
          </Text>
          <View style={styles.moodGrid}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodCard,
                  { backgroundColor: theme.card },
                  personalization.currentMood === mood.id && {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                  },
                ]}
                onPress={() => handleMoodChange(mood.id)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text
                  style={[
                    styles.moodLabel,
                    { color: personalization.currentMood === mood.id ? '#FFFFFF' : theme.text },
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* More Settings Coming Soon */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('settings.theme_title')}
          </Text>
          <View style={[styles.comingSoon, { backgroundColor: theme.card }]}>
            <Text style={styles.comingSoonIcon}>🎨</Text>
            <Text style={[styles.comingSoonText, { color: theme.textSecondary }]}>
              {t('settings.coming_soon')}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('settings.sound_title')}
          </Text>
          <View style={[styles.comingSoon, { backgroundColor: theme.card }]}>
            <Text style={styles.comingSoonIcon}>🔊</Text>
            <Text style={[styles.comingSoonText, { color: theme.textSecondary }]}>
              {t('settings.coming_soon')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  languageCards: {
    gap: spacing.md,
  },
  languageCard: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedCard: {
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
  },
  flag: {
    fontSize: 32,
  },
  languageInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  languageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 14,
    color: '#E0E0E0',
    opacity: 0.8,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  languageNote: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  comingSoon: {
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
  },
  comingSoonIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  comingSoonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  moodCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
