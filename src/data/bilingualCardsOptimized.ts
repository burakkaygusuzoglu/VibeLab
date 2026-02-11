// Performance optimized bilingual cards with lazy loading
// This file provides memoized and lazy-loaded card access

import { BilingualCard, CardCategory } from './cardTypes';

// Lazy loading category imports
let funCardsCache: BilingualCard[] | null = null;
let romanticCardsCache: BilingualCard[] | null = null;
let crazyCardsCache: BilingualCard[] | null = null;
let adventurousCardsCache: BilingualCard[] | null = null;
let strengthCardsCache: BilingualCard[] | null = null;
let generalCardsCache: BilingualCard[] | null = null;

// Lazy load functions
const getFunCards = (): BilingualCard[] => {
  if (!funCardsCache) {
    const { FUN_CARDS } = require('./categories/funCards');
    funCardsCache = FUN_CARDS;
  }
  return funCardsCache!;
};

const getRomanticCards = (): BilingualCard[] => {
  if (!romanticCardsCache) {
    const { ROMANTIC_CARDS } = require('./categories/romanticCards');
    romanticCardsCache = ROMANTIC_CARDS;
  }
  return romanticCardsCache!;
};

const getCrazyCards = (): BilingualCard[] => {
  if (!crazyCardsCache) {
    const { CRAZY_CARDS } = require('./categories/crazyCards');
    crazyCardsCache = CRAZY_CARDS;
  }
  return crazyCardsCache!;
};

const getAdventurousCards = (): BilingualCard[] => {
  if (!adventurousCardsCache) {
    const { ADVENTUROUS_CARDS } = require('./categories/adventurousCards');
    adventurousCardsCache = ADVENTUROUS_CARDS;
  }
  return adventurousCardsCache!;
};

const getStrengthCards = (): BilingualCard[] => {
  if (!strengthCardsCache) {
    const { STRENGTH_CARDS } = require('./categories/strengthCards');
    strengthCardsCache = STRENGTH_CARDS;
  }
  return strengthCardsCache!;
};

const getGeneralCards = (): BilingualCard[] => {
  if (!generalCardsCache) {
    const { GENERAL_CARDS } = require('./categories/generalCards');
    generalCardsCache = GENERAL_CARDS;
  }
  return generalCardsCache!;
};

// Get all cards (lazy loaded)
export const getAllBilingualCards = (): BilingualCard[] => {
  return [
    ...getFunCards(),
    ...getRomanticCards(),
    ...getCrazyCards(),
    ...getAdventurousCards(),
    ...getStrengthCards(),
    ...getGeneralCards(),
  ];
};

// Get cards by category (optimized)
export const getCardsByCategory = (category: CardCategory): BilingualCard[] => {
  switch (category) {
    case 'fun':
      return getFunCards();
    case 'romantic':
      return getRomanticCards();
    case 'crazy':
      return getCrazyCards();
    case 'adventurous':
      return getAdventurousCards();
    case 'strength':
      return getStrengthCards();
    case 'general':
      return getGeneralCards();
    default:
      return [];
  }
};

// Get cards in specific language (memoized)
const languageCache: { [key: string]: any[] } = {};

export const getCardsByLanguage = (language: 'tr' | 'en'): any[] => {
  const cacheKey = language;
  
  if (languageCache[cacheKey]) {
    return languageCache[cacheKey];
  }
  
  const allCards = getAllBilingualCards();
  const result = allCards.map(card => ({
    id: card.id,
    type: card.type,
    category: card.category,
    intensity: card.intensity,
    title: card.content[language].title,
    description: card.content[language].description,
  }));
  
  languageCache[cacheKey] = result;
  return result;
};

// Clear cache when language changes
export const clearLanguageCache = () => {
  Object.keys(languageCache).forEach(key => delete languageCache[key]);
};
