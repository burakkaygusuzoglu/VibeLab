import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { usePersonalization } from '../../context/PersonalizationContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Main: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const OnboardingCompleteScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { completeOnboarding, personalization } = usePersonalization();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleComplete = async () => {
    await completeOnboarding();
    // @ts-ignore - navigation reset
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  const getRecommendation = () => {
    const { currentMood, goals } = personalization;
    
    if (currentMood === 'playful') {
      return t('onboarding.rec_playful');
    } else if (currentMood === 'romantic') {
      return t('onboarding.rec_romantic');
    } else if (currentMood === 'intimate') {
      return t('onboarding.rec_intimate');
    } else if (currentMood === 'deep') {
      return t('onboarding.rec_deep');
    } else if (goals?.includes('spice_things_up')) {
      return t('onboarding.rec_spice');
    } else if (goals?.includes('better_communication')) {
      return t('onboarding.rec_communication');
    }
    
    return t('onboarding.rec_default');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={['#667EEA', '#764BA2', '#F093FB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🎉</Text>
          </View>

          <Text style={styles.title}>{t('onboarding.complete_title')}</Text>
          <Text style={styles.subtitle}>
            {t('onboarding.complete_subtitle')}
          </Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>

          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationEmoji}>💡</Text>
            <Text style={styles.recommendationTitle}>{t('onboarding.complete_recommendation_title')}</Text>
            <Text style={styles.recommendationText}>{getRecommendation()}</Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>🎴</Text>
              <Text style={styles.featureText}>{t('onboarding.complete_features_cards')}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>🎯</Text>
              <Text style={styles.featureText}>{t('onboarding.complete_features_modes')}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>🏆</Text>
              <Text style={styles.featureText}>{t('onboarding.complete_features_achievements')}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>📊</Text>
              <Text style={styles.featureText}>{t('onboarding.complete_features_tracking')}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleComplete}
            style={styles.startButton}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F0F0F0']}
              style={styles.startGradient}
            >
              <Text style={styles.startButtonText}>{t('onboarding.complete_start_button')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: 24,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 32,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  recommendationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  recommendationEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  feature: {
    alignItems: 'center',
    width: '45%',
    marginBottom: 16,
  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  startButton: {
    width: '100%',
  },
  startGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667EEA',
  },
});
