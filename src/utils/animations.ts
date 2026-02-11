import { Animated, Easing } from 'react-native';

// Smooth entrance animations
export const fadeInUp = (
  animatedValue: Animated.Value,
  duration: number = 600,
  delay: number = 0
) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    delay,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });
};

export const fadeIn = (
  animatedValue: Animated.Value,
  duration: number = 400,
  delay: number = 0
) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    delay,
    easing: Easing.ease,
    useNativeDriver: true,
  });
};

// Spring animations for interactive elements
export const springPop = (
  animatedValue: Animated.Value,
  toValue: number = 1,
  tension: number = 100,
  friction: number = 8
) => {
  return Animated.spring(animatedValue, {
    toValue,
    tension,
    friction,
    useNativeDriver: true,
  });
};

// Smooth scale animation
export const scaleIn = (
  animatedValue: Animated.Value,
  duration: number = 300,
  delay: number = 0
) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    delay,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    useNativeDriver: true,
  });
};

// Bounce animation
export const bounce = (animatedValue: Animated.Value) => {
  return Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 1.1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }),
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }),
  ]);
};

// Shake animation for errors
export const shake = (animatedValue: Animated.Value) => {
  return Animated.sequence([
    Animated.timing(animatedValue, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(animatedValue, { toValue: -10, duration: 50, useNativeDriver: true }),
    Animated.timing(animatedValue, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(animatedValue, { toValue: 0, duration: 50, useNativeDriver: true }),
  ]);
};

// Pulse animation for attention
export const pulse = (animatedValue: Animated.Value, loop: boolean = true) => {
  const animation = Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 1.05,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
  ]);

  return loop ? Animated.loop(animation) : animation;
};

// Rotate animation
export const rotate = (animatedValue: Animated.Value, duration: number = 1000) => {
  return Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  );
};

// Shimmer animation for loading
export const shimmer = (animatedValue: Animated.Value) => {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])
  );
};

// Stagger animation for lists
export const staggerAnimation = (
  animatedValues: Animated.Value[],
  staggerDelay: number = 100
) => {
  return Animated.stagger(
    staggerDelay,
    animatedValues.map((value) =>
      Animated.timing(value, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    )
  );
};

// Slide in from directions
export const slideInFromLeft = (
  animatedValue: Animated.Value,
  duration: number = 400
) => {
  return Animated.timing(animatedValue, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });
};

export const slideInFromRight = (
  animatedValue: Animated.Value,
  duration: number = 400
) => {
  return Animated.timing(animatedValue, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });
};

// Combined fade + scale entrance
export const fadeInScale = (
  fadeValue: Animated.Value,
  scaleValue: Animated.Value,
  duration: number = 500,
  delay: number = 0
) => {
  return Animated.parallel([
    Animated.timing(fadeValue, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
    Animated.spring(scaleValue, {
      toValue: 1,
      tension: 80,
      friction: 8,
      delay,
      useNativeDriver: true,
    }),
  ]);
};

// Preset animation configs
export const AnimationPresets = {
  fast: { duration: 200, easing: Easing.ease },
  normal: { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
  slow: { duration: 500, easing: Easing.out(Easing.cubic) },
  spring: { tension: 100, friction: 8 },
  bouncySpring: { tension: 80, friction: 6 },
};
