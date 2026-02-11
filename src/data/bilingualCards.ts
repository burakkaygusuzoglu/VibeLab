// Bilingual Card System - Turkish & English Support
// NOTE: Due to file size constraints, this file contains a subset of cards.
// The full 3000-card database is distributed across category-specific files.

// Re-export types for convenience
export type { CardCategory, CardType, BilingualCard } from './cardTypes';

// Import all category cards
import { FUN_CARDS } from './categories/funCards';
import { ROMANTIC_CARDS } from './categories/romanticCards';
import { CRAZY_CARDS } from './categories/crazyCards';
import { ADVENTUROUS_CARDS } from './categories/adventurousCards';
import { STRENGTH_CARDS } from './categories/strengthCards';
import { GENERAL_CARDS } from './categories/generalCards';
import type { BilingualCard, CardCategory } from './cardTypes';

// Combine all cards (3000 total: 500 per category × 6 categories)
export const BILINGUAL_CARDS: BilingualCard[] = [
  ...FUN_CARDS,
  ...ROMANTIC_CARDS,
  ...CRAZY_CARDS,
  ...ADVENTUROUS_CARDS,
  ...STRENGTH_CARDS,
  ...GENERAL_CARDS,
];

// Helper function to get cards by language
export function getCardsByLanguage(language: 'tr' | 'en') {
  return BILINGUAL_CARDS.map(card => ({
    id: card.id,
    type: card.type,
    category: card.category,
    intensity: card.intensity,
    title: card.content[language].title,
    description: card.content[language].description,
  }));
}

// Helper to get cards by category and language
export function getCardsByCategory(category: CardCategory, language: 'tr' | 'en') {
  return BILINGUAL_CARDS
    .filter(card => card.category === category)
    .map(card => ({
      id: card.id,
      type: card.type,
      category: card.category,
      intensity: card.intensity,
      title: card.content[language].title,
      description: card.content[language].description,
    }));
}
