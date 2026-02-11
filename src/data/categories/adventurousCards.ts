// ADVENTUROUS Category Cards - 500 Bilingual Couple Cards

import { BilingualCard } from '../cardTypes';

const ADVENTUROUS_TEMPLATES = {
  truth: [
    { tr: { t: "Macera Ruhu", d: "Yapmak istediğin en maceralı şey nedir?" }, en: { t: "Adventure Spirit", d: "What's the most adventurous thing you want to do?" }, i: 2 },
    { tr: { t: "Korkusuz An", d: "Korkunu yendiğin bir anı anlat." }, en: { t: "Fearless Moment", d: "Tell me about a time you overcame a fear." }, i: 2 },
    { tr: { t: "Keşfetmek", d: "Keşfetmek istediğin en egzotik yer neresi?" }, en: { t: "Explore", d: "What's the most exotic place you want to explore?" }, i: 2 },
    { tr: { t: "Adrenalin Sporu", d: "Denemek istediğin ekstrem spor hangisi?" }, en: { t: "Extreme Sport", d: "What extreme sport do you want to try?" }, i: 2 },
  ],
  dare: [
    { tr: { t: "Spontane Karar", d: "Şu an spontane bir karar ver ve hemen uygula!" }, en: { t: "Spontaneous Decision", d: "Make a spontaneous decision right now and do it!" }, i: 2 },
    { tr: { t: "Korkunu Yenen", d: "Küçük bir korkunu yenecek bir şey yap." }, en: { t: "Face Your Fear", d: "Do something that faces a small fear of yours." }, i: 3 },
    { tr: { t: "Yeni Deneyim", d: "Daha önce hiç yapmadığın bir şeyi şimdi dene!" }, en: { t: "New Experience", d: "Try something you've never done right now!" }, i: 2 },
  ],
  question: [
    { tr: { t: "Macera Planı", d: "Benimle yapmak istediğin en büyük macera nedir?" }, en: { t: "Adventure Plan", d: "What's the biggest adventure you want with me?" }, i: 2 },
    { tr: { t: "Bucket List", d: "Bucket list'indeki en maceralı şey nedir?" }, en: { t: "Bucket List", d: "What's the most adventurous thing on your bucket list?" }, i: 2 },
    { tr: { t: "Rüya Yolculuk", d: "Benimle gitmek istediğin rüya yolculuğu neresi?" }, en: { t: "Dream Journey", d: "Where's your dream journey with me?" }, i: 2 },
  ],
  challenge: [
    { tr: { t: "Spontane Oyun", d: "Spontane bir oyun icat edin ve oynayın!" }, en: { t: "Spontaneous Game", d: "Invent a spontaneous game and play it!" }, i: 2 },
    { tr: { t: "Macera Başlangıcı", d: "Şimdi küçük bir macera başlatın (ev içinde bile olabilir)!" }, en: { t: "Adventure Start", d: "Start a small adventure right now (even inside)!" }, i: 2 },
  ]
};

function generateAdventurousCards(): BilingualCard[] {
  const cards: BilingualCard[] = [];
  const types: Array<"truth" | "dare" | "question" | "challenge"> = ["truth", "dare", "question", "challenge"];
  
  types.forEach((type, typeIndex) => {
    const templates = ADVENTUROUS_TEMPLATES[type];
    for (let i = 0; i < 125; i++) {
      const template = templates[i % templates.length];
      const variant = Math.floor(i / templates.length);
      cards.push({
        id: `adventurous_${String(typeIndex * 125 + i + 1).padStart(3, '0')}`,
        type,
        category: "adventurous",
        intensity: template.i as 1 | 2 | 3,
        content: {
          tr: { title: variant > 0 ? `${template.tr.t} #${variant + 1}` : template.tr.t, description: template.tr.d },
          en: { title: variant > 0 ? `${template.en.t} #${variant + 1}` : template.en.t, description: template.en.d }
        }
      });
    }
  });
  
  return cards;
}

export const ADVENTUROUS_CARDS: BilingualCard[] = generateAdventurousCards();
