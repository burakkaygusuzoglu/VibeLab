import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardType } from '../data/cards';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../theme/spacing';

interface TypeChipProps {
  type: CardType;
  small?: boolean;
}

export const TypeChip: React.FC<TypeChipProps> = ({ type, small = false }) => {
  const { theme } = useTheme();

  const typeIcons: Record<CardType, string> = {
    truth: '💭',
    dare: '⚡',
    question: '❓',
    challenge: '🎯',
  };

  return (
    <View style={[styles.chip, { borderColor: theme.border }, small && styles.chipSmall]}>
      <Text style={[styles.icon, small && styles.iconSmall]}>{typeIcons[type]}</Text>
      <Text style={[styles.text, { color: theme.text }, small && styles.textSmall]}>
        {type.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    gap: 4,
  },
  chipSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  icon: {
    fontSize: 14,
  },
  iconSmall: {
    fontSize: 10,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  textSmall: {
    fontSize: 9,
  },
});
