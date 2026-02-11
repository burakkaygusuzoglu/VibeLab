import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { usePersonalization } from '../context/PersonalizationContext';
import { useLanguage } from '../context/LanguageContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { spacing } from '../theme/spacing';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { personalization } = usePersonalization();
  const { t } = useLanguage();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideUpAnim = useRef(new Animated.Value(100)).current;
  const heartAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 15,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Heart beat animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleGetStarted = () => {
    if (personalization.hasCompletedOnboarding) {
      navigation.replace('Main', { screen: 'Home' } as any);
    } else {
      navigation.navigate('Onboarding' as any);
    }
  };

  return (
    <View style={styles.container}>
      {/* Animated Gradient Background - Warmer, Modern Colors */}
      <LinearGradient
        colors={['#FF6B9D', '#FF8C69', '#FFA07A', '#FF69B4']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Overlay Pattern */}
        <View style={styles.overlay} />

        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          {/* Content Card */}
          <Animated.View
            style={[
              styles.contentCard,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateY: slideUpAnim },
                ],
              },
            ]}
          >
            {/* Glass Card Effect */}
            <View style={styles.glassCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.1)']}
                style={styles.glassGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                {/* Heart Icon with Animation */}
                <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
                  <View style={styles.iconContainer}>
                    <LinearGradient
                      colors={['#FF6B9D', '#C44569']}
                      style={styles.iconGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.heartIcon}>💕</Text>
                    </LinearGradient>
                  </View>
                </Animated.View>

                {/* Title */}
                <Text style={styles.title}>{t('auth.welcome_title')}</Text>
                
                {/* Survey Subtitle */}
                <Text style={styles.surveyText}>{t('auth.welcome_survey')}</Text>
                
                {/* Subtitle */}
                <Text style={styles.subtitle}>{t('auth.welcome_subtitle')}</Text>

                {/* Play With Section */}
                <View style={styles.playWithSection}>
                  <Text style={styles.playWithTitle}>{t('auth.play_with_title')}</Text>
                  <View style={styles.audienceContainer}>
                    <AudienceChip emoji="💑" text={t('auth.audience_lover')} />
                    <AudienceChip emoji="💍" text={t('auth.audience_spouse')} />
                    <AudienceChip emoji="👥" text={t('auth.audience_friend')} />
                    <AudienceChip emoji="👨‍👩‍👧‍👦" text={t('auth.audience_family')} />
                    <AudienceChip emoji="🎉" text={t('auth.audience_party')} />
                  </View>
                </View>

                {/* Feature Pills */}
                <View style={styles.featurePills}>
                  <FeaturePill emoji="🎴" text={t('auth.feature_cards')} />
                  <FeaturePill emoji="🎯" text={t('auth.feature_quiz')} />
                  <FeaturePill emoji="💑" text={t('auth.feature_couple')} />
                </View>

                {/* Premium Button */}
                <View style={styles.buttonWrapper}>
                  <LinearGradient
                    colors={['#FFD700', '#FFA500', '#FF6B6B']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <PrimaryButton
                      title={t('auth.login_button')}
                      onPress={handleGetStarted}
                      fullWidth
                    />
                  </LinearGradient>
                </View>

                {/* Decorative Elements */}
                <View style={styles.decorativeElements}>
                  <View style={[styles.floatingHeart, { top: 20, left: 20 }]}>
                    <Text style={styles.floatingEmoji}>❤️</Text>
                  </View>
                  <View style={[styles.floatingHeart, { top: 60, right: 30 }]}>
                    <Text style={styles.floatingEmoji}>💖</Text>
                  </View>
                  <View style={[styles.floatingHeart, { bottom: 100, left: 40 }]}>
                    <Text style={styles.floatingEmoji}>✨</Text>
                  </View>
                  <View style={[styles.floatingHeart, { bottom: 140, right: 20 }]}>
                    <Text style={styles.floatingEmoji}>💫</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Bottom Accent */}
          <View style={styles.bottomAccent}>
            <Text style={styles.bottomText}>{t('auth.bottom_text')}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const FeaturePill: React.FC<{ emoji: string; text: string }> = ({ emoji, text }) => (
  <View style={styles.pill}>
    <Text style={styles.pillEmoji}>{emoji}</Text>
    <Text style={styles.pillText}>{text}</Text>
  </View>
);

const AudienceChip: React.FC<{ emoji: string; text: string }> = ({ emoji, text }) => (
  <View style={styles.audienceChip}>
    <Text style={styles.audienceEmoji}>{emoji}</Text>
    <Text style={styles.audienceText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  contentCard: {
    width: '100%',
    maxWidth: 400,
  },
  glassCard: {
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },
  glassGradient: {
    padding: spacing.xxl,
    paddingTop: 40,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  heartIcon: {
    fontSize: 50,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  surveyText: {
    fontSize: 14,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontStyle: 'italic',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFE5E5',
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
    opacity: 0.95,
  },
  playWithSection: {
    marginBottom: spacing.lg,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  playWithTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: spacing.md,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  audienceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  audienceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  audienceEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  audienceText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  featurePills: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
    flexWrap: 'wrap',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  pillEmoji: {
    fontSize: 16,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  buttonWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonGradient: {
    padding: 2,
    borderRadius: 16,
  },
  decorativeElements: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  floatingHeart: {
    position: 'absolute',
  },
  floatingEmoji: {
    fontSize: 24,
    opacity: 0.3,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  bottomText: {
    fontSize: 13,
    color: '#FFE5E5',
    fontWeight: '600',
    opacity: 0.8,
    letterSpacing: 0.5,
  },
});
