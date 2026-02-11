import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/soundManager';
import { getCardsByLanguage } from '../data/bilingualCards';
import { CategoryChip } from '../components/CategoryChip';
import { TypeChip } from '../components/TypeChip';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

export const FavoritesScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, currentLanguage } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteCards = useMemo(() => {
    const cardsInLanguage = getCardsByLanguage(currentLanguage);
    return cardsInLanguage.filter((card) => favorites.has(card.id));
  }, [favorites, currentLanguage]);

  const renderItem = ({ item }: any) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.cardHeader}>
        <View style={styles.chips}>
          <CategoryChip category={item.category} small />
          <TypeChip type={item.type} small />
        </View>
        <TouchableOpacity onPress={() => {
          soundManager.play('heart-beat');
          toggleFavorite(item.id);
        }}>
          <Text style={styles.favoriteIcon}>❤️</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.cardDescription, { color: theme.textSecondary }]} numberOfLines={3}>
        {item.description}
      </Text>

      <View style={styles.intensity}>
        {[1, 2, 3].map((level) => (
          <View
            key={level}
            style={[
              styles.intensityDot,
              {
                backgroundColor:
                  level <= item.intensity ? theme.primary : theme.border,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );

  if (favoriteCards.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>{t('favorites.empty_heart')}</Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            {t('favorites.empty_message')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{t('favorites.title')}</Text>
        <Text style={[styles.count, { color: theme.textSecondary }]}>
          {t('favorites.count', { count: favoriteCards.length })}
        </Text>
      </View>
      
      <FlatList
        data={favoriteCards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  count: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  cardTitle: {
    ...typography.h3,
    fontSize: 18,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  intensity: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  intensityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyText: {
    ...typography.bodyLarge,
    textAlign: 'center',
  },
});
