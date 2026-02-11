import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { getCardsByLanguage } from '../data/bilingualCards';
import { CategoryChip } from '../components/CategoryChip';
import { TypeChip } from '../components/TypeChip';
import { GlassmorphismCard, Pulse } from '../components/PremiumUI';
import { fadeInUp, springPop } from '../utils/animations';
import { spacing, borderRadius } from '../theme/spacing';
import { CardCategory, CardType } from '../data/cards';

const { width } = Dimensions.get('window');

type ViewMode = 'grid' | 'list';
type SortOption = 'recent' | 'category' | 'intensity' | 'type';

export const EnhancedFavoritesScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, currentLanguage } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [selectedCategory, setSelectedCategory] = useState<CardCategory | 'all'>('all');
  const [selectedType, setSelectedType] = useState<CardType | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const filterHeight = useRef(new Animated.Value(0)).current;

  const favoriteCards = useMemo(() => {
    const cardsInLanguage = getCardsByLanguage(currentLanguage);
    let cards = cardsInLanguage.filter((card) => favorites.has(card.id));

    // Search filter
    if (searchQuery) {
      cards = cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      cards = cards.filter((card) => card.category === selectedCategory);
    }

    // Type filter
    if (selectedType !== 'all') {
      cards = cards.filter((card) => card.type === selectedType);
    }

    // Sorting
    switch (sortBy) {
      case 'category':
        cards.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'intensity':
        cards.sort((a, b) => b.intensity - a.intensity);
        break;
      case 'type':
        cards.sort((a, b) => a.type.localeCompare(b.type));
        break;
      // 'recent' is default order
    }

    return cards;
  }, [favorites, searchQuery, selectedCategory, selectedType, sortBy]);

  const categories: (CardCategory | 'all')[] = ['all', 'fun', 'romantic', 'crazy', 'adventurous', 'strength', 'general'];
  const types: (CardType | 'all')[] = ['all', 'truth', 'dare', 'question', 'challenge'];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    Animated.timing(filterHeight, {
      toValue: showFilters ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const shareCard = async (card: any) => {
    try {
      await Share.share({
        message: `${card.title}\n\n${card.description}\n\n💕 From Couple Arena`,
      });
    } catch (error) {
      // Sharing error handled gracefully
    }
  };

  const renderCard = ({ item, index }: any) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      fadeInUp(animatedValue, 400, index * 50).start();
    }, []);

    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={[
          viewMode === 'grid' ? styles.gridCard : styles.listCard,
          {
            opacity: animatedValue,
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
              { scale },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <LinearGradient
            colors={[
              theme[item.category as keyof typeof theme] as string,
              (theme[item.category as keyof typeof theme] as string) + 'DD'
            ] as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.cardGradient,
              viewMode === 'grid' && styles.gridCardGradient,
            ]}
          >
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={styles.chips}>
                <CategoryChip category={item.category} small />
                {viewMode === 'list' && <TypeChip type={item.type} small />}
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  onPress={() => shareCard(item)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionIcon}>📤</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleFavorite(item.id)}
                  style={styles.actionButton}
                >
                  <Pulse scale={1.2} duration={800}>
                    <Text style={styles.favoriteIcon}>❤️</Text>
                  </Pulse>
                </TouchableOpacity>
              </View>
            </View>

            {/* Content */}
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text
              style={styles.cardDescription}
              numberOfLines={viewMode === 'grid' ? 2 : 3}
            >
              {item.description}
            </Text>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <View style={styles.intensity}>
                {[1, 2, 3].map((level) => (
                  <View
                    key={level}
                    style={[
                      styles.intensityDot,
                      {
                        backgroundColor:
                          level <= item.intensity
                            ? 'rgba(255, 255, 255, 0.9)'
                            : 'rgba(255, 255, 255, 0.3)',
                      },
                    ]}
                  />
                ))}
              </View>
              {viewMode === 'list' && (
                <Text style={styles.cardType}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </Text>
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Title & Stats */}
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53'] as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statsCard}
      >
        <Text style={styles.statsTitle}>{t('favorites.my_favorites')}</Text>
        <Text style={styles.statsCount}>
          {favoriteCards.length} {t('favorites.cards_saved', { count: favoriteCards.length })}
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {favoriteCards.filter((c) => c.type === 'truth').length}
            </Text>
            <Text style={styles.statLabel}>Truths</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {favoriteCards.filter((c) => c.type === 'dare').length}
            </Text>
            <Text style={styles.statLabel}>Dares</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {favoriteCards.filter((c) => c.type === 'question').length}
            </Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={t('favorites.search_placeholder')}
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: theme.card }]}
          onPress={toggleFilters}
        >
          <Text style={styles.controlIcon}>🔧</Text>
          <Text style={[styles.controlText, { color: theme.text }]}>Filters</Text>
          <Text style={[styles.controlArrow, { color: theme.textSecondary }]}>
            {showFilters ? '▼' : '▶'}
          </Text>
        </TouchableOpacity>

        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.viewButton,
              {
                backgroundColor: viewMode === 'list' ? theme.primary : theme.card,
              },
            ]}
            onPress={() => setViewMode('list')}
          >
            <Text style={viewMode === 'list' ? styles.viewIconActive : styles.viewIcon}>
              ☰
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewButton,
              {
                backgroundColor: viewMode === 'grid' ? theme.primary : theme.card,
              },
            ]}
            onPress={() => setViewMode('grid')}
          >
            <Text style={viewMode === 'grid' ? styles.viewIconActive : styles.viewIcon}>
              ▦
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <Animated.View
          style={[
            styles.filtersPanel,
            { backgroundColor: theme.card },
            {
              maxHeight: filterHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 400],
              }),
            },
          ]}
        >
          {/* Sort */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: theme.text }]}>Sort By</Text>
            <View style={styles.filterOptions}>
              {[
                { value: 'recent', label: 'Recent', icon: '🕐' },
                { value: 'category', label: 'Category', icon: '📁' },
                { value: 'intensity', label: 'Intensity', icon: '🔥' },
                { value: 'type', label: 'Type', icon: '🎯' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor:
                        sortBy === option.value ? theme.primary : theme.background,
                    },
                  ]}
                  onPress={() => setSortBy(option.value as SortOption)}
                >
                  <Text style={styles.filterIcon}>{option.icon}</Text>
                  <Text
                    style={[
                      styles.filterLabel,
                      {
                        color: sortBy === option.value ? '#FFFFFF' : theme.text,
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: theme.text }]}>Category</Text>
            <View style={styles.filterOptions}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor:
                        selectedCategory === cat
                          ? cat === 'all'
                            ? theme.primary
                            : theme[cat as CardCategory]
                          : theme.background,
                    },
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.filterLabel,
                      {
                        color: selectedCategory === cat ? '#FFFFFF' : theme.text,
                      },
                    ]}
                  >
                    {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Type Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: theme.text }]}>Type</Text>
            <View style={styles.filterOptions}>
              {types.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor:
                        selectedType === type ? theme.primary : theme.background,
                    },
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text
                    style={[
                      styles.filterLabel,
                      {
                        color: selectedType === type ? '#FFFFFF' : theme.text,
                      },
                    ]}
                  >
                    {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );

  if (favoriteCards.length === 0 && !searchQuery) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
        edges={['top']}
      >
        <View style={styles.emptyContainer}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53'] as any}
            style={styles.emptyGradient}
          >
            <Text style={styles.emptyEmoji}>💝</Text>
            <Text style={styles.emptyTitle}>{t('favorites.no_favorites')}</Text>
            <Text style={styles.emptyText}>
              {t('favorites.no_favorites_desc')}
            </Text>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['top']}
    >
      <Animated.FlatList
        data={favoriteCards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        key={viewMode} // Force re-render on view mode change
        numColumns={viewMode === 'grid' ? 2 : 1}
        contentContainerStyle={[
          styles.list,
          viewMode === 'grid' && styles.gridList,
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingBottom: spacing.md,
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.xl,
    borderRadius: 24,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  statsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statsCount: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearIcon: {
    fontSize: 20,
    color: '#999',
    paddingHorizontal: spacing.sm,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 12,
    flex: 1,
    marginRight: spacing.sm,
  },
  controlIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  controlText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  controlArrow: {
    fontSize: 12,
  },
  viewToggle: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  viewButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon: {
    fontSize: 20,
    color: '#999',
  },
  viewIconActive: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  filtersPanel: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
  },
  filterSection: {
    marginBottom: spacing.lg,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  gridList: {
    paddingHorizontal: spacing.md,
  },
  listCard: {
    marginBottom: spacing.md,
  },
  gridCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.md,
    maxWidth: (width - spacing.lg * 2) / 2 - spacing.xs,
  },
  cardGradient: {
    borderRadius: 20,
    padding: spacing.lg,
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  gridCardGradient: {
    minHeight: 220,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.xs,
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  actionIcon: {
    fontSize: 14,
  },
  favoriteIcon: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  intensity: {
    flexDirection: 'row',
    gap: 6,
  },
  intensityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cardType: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyGradient: {
    width: '100%',
    padding: spacing.xxl,
    borderRadius: 24,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
});
