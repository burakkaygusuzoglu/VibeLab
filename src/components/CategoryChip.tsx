import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardCategory } from '../data/cards';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

interface CategoryChipProps {
  category: CardCategory;
  small?: boolean;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({ category, small = false }) => {
  const { theme } = useTheme();

  const categoryColors: Record<CardCategory, string> = {
    fun: theme.fun,
    romantic: theme.romantic,
    crazy: theme.crazy,
    adventurous: theme.adventurous,
    strength: theme.strength,
    general: theme.general,
  };

  const backgroundColor = categoryColors[category];

  return (
    <View style={[styles.chip, { backgroundColor }, small && styles.chipSmall]}>
      <Text style={[styles.text, small && styles.textSmall]}>
        {category.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  chipSmall: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  textSmall: {
    fontSize: 10,
  },
});
