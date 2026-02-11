import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay, 
  withRepeat, 
  withSequence,
  Easing,
  cancelAnimation
} from 'react-native-reanimated';
import { PrimaryButton } from './PrimaryButton';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const { width, height } = Dimensions.get('window');

interface LevelUpModalProps {
  visible: boolean;
  level: number;
  onClose: () => void;
}

const ConfettiPiece = ({ delay, x }: { delay: number; x: number }) => {
  const translateY = useSharedValue(-50);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(height + 50, { duration: 2000 + Math.random() * 1000, easing: Easing.linear }),
        -1
      )
    );
    rotate.value = withDelay(
      delay,
      withRepeat(
        withTiming(360, { duration: 1000 + Math.random() * 1000 }),
        -1
      )
    );
    
    return () => {
      cancelAnimation(translateY);
      cancelAnimation(rotate);
    };
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` }
    ],
    left: x,
  }));

  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Animated.View
      style={[
        styles.confetti,
        style,
        { backgroundColor: color }
      ]}
    />
  );
};

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ visible, level, onClose }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSequence(
        withTiming(1.2, { duration: 300 }),
        withTiming(1, { duration: 200 })
      );
    } else {
      scale.value = 0;
    }
  }, [visible]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!visible) return null;

  const confettiCount = 30;
  const confetti = Array.from({ length: confettiCount }).map((_, i) => (
    <ConfettiPiece key={i} delay={Math.random() * 1000} x={Math.random() * width} />
  ));

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        {confetti}
        <Animated.View style={[styles.content, containerStyle]}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>LEVEL UP!</Text>
          <Text style={styles.levelText}>You reached Level {level}</Text>
          <Text style={styles.subtitle}>Keep playing to unlock more rewards!</Text>
          
          <PrimaryButton 
            title="Awesome!" 
            onPress={onClose}
            fullWidth
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
    width: width * 0.85,
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: '#FFD700',
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  levelText: {
    ...typography.h2,
    color: '#333',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: '#666',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  confetti: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    top: -20,
  },
});
