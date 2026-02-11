// Shared types for bilingual card system

export type CardCategory =
  | "fun"
  | "romantic"
  | "crazy"
  | "adventurous"
  | "strength"
  | "general";

export type CardType = "truth" | "dare" | "question" | "challenge";

export interface BilingualCard {
  id: string;
  type: CardType;
  category: CardCategory;
  intensity: 1 | 2 | 3;
  content: {
    tr: {
      title: string;
      description: string;
    };
    en: {
      title: string;
      description: string;
    };
  };
}
