// GENERAL Category Cards - 500 Bilingual Couple Cards (Mixed Topics)

import { BilingualCard } from '../cardTypes';

const GENERAL_TEMPLATES = {
  truth: [
    { tr: { t: "Favori Anın", d: "Bugüne kadar yaşadığın en favori an hangisi?" }, en: { t: "Favorite Moment", d: "What's your favorite moment ever?" }, i: 1 },
    { tr: { t: "Gizli Yetenek", d: "Kimsenin bilmediği bir yeteneğin var mı?" }, en: { t: "Hidden Talent", d: "Do you have a talent nobody knows about?" }, i: 1 },
    { tr: { t: "Hayatın Değiştiren", d: "Hayatını değiştiren en önemli karar neydi?" }, en: { t: "Life Changing", d: "What was the most life-changing decision you made?" }, i: 2 },
    { tr: { t: "Mutluluk", d: "Seni gerçekten mutlu eden şey nedir?" }, en: { t: "Happiness", d: "What truly makes you happy?" }, i: 2 },
    { tr: { t: "Geçmiş", d: "Geçmişte değiştirmek istediğin bir şey var mı?" }, en: { t: "Past", d: "Is there something from your past you'd change?" }, i: 2 },
    { tr: { t: "Başarı", d: "En gurur duyduğun başarın nedir?" }, en: { t: "Achievement", d: "What achievement are you most proud of?" }, i: 2 },
  ],
  dare: [
    { tr: { t: "İlk Aklına Gelen", d: "Aklına gelen ilk şarkıyı söyle." }, en: { t: "First Thing", d: "Sing the first song that comes to mind." }, i: 1 },
    { tr: { t: "Taklit Et", d: "En sevdiğin ünlüyü taklit et." }, en: { t: "Imitate", d: "Imitate your favorite celebrity." }, i: 1 },
    { tr: { t: "Komik Hikaye", d: "Başından geçen en komik hikayeyi anlat." }, en: { t: "Funny Story", d: "Tell your funniest story." }, i: 1 },
    { tr: { t: "Şükret", d: "Hayatındaki 5 şey için şükret." }, en: { t: "Be Thankful", d: "Be thankful for 5 things in your life." }, i: 1 },
  ],
  question: [
    { tr: { t: "Hayat Felsefesi", d: "Hayat felsefeni özetleyecek bir cümle söyle." }, en: { t: "Life Philosophy", d: "Describe your life philosophy in one sentence." }, i: 2 },
    { tr: { t: "En Büyük Korku", d: "En büyük korkun nedir?" }, en: { t: "Biggest Fear", d: "What's your biggest fear?" }, i: 2 },
    { tr: { t: "Hayal", d: "Gerçekleştirmek istediğin en büyük hayal nedir?" }, en: { t: "Dream", d: "What's your biggest dream you want to achieve?" }, i: 2 },
    { tr: { t: "Tavsiye", d: "Genç haline bir tavsiye verecek olsan ne söylerdin?" }, en: { t: "Advice", d: "What advice would you give your younger self?" }, i: 2 },
  ],
  challenge: [
    { tr: { t: "Hızlı Düşün", d: "30 saniyede hayatınızla ilgili 10 şey söyleyin." }, en: { t: "Quick Think", d: "Say 10 things about your life in 30 seconds." }, i: 1 },
    { tr: { t: "Ortak Nokta", d: "1 dakikada birbirinizle 5 ortak nokta bulun." }, en: { t: "Common Ground", d: "Find 5 things you have in common in 1 minute." }, i: 1 },
    { tr: { t: "Teşekkür Et", d: "Sırayla birbirinize teşekkür edin." }, en: { t: "Thank Each Other", d: "Take turns thanking each other." }, i: 1 },
  ]
};

function generateGeneralCards(): BilingualCard[] {
  const cards: BilingualCard[] = [];
  const types: Array<"truth" | "dare" | "question" | "challenge"> = ["truth", "dare", "question", "challenge"];
  
  types.forEach((type, typeIndex) => {
    const templates = GENERAL_TEMPLATES[type];
    for (let i = 0; i < 125; i++) {
      const template = templates[i % templates.length];
      const variant = Math.floor(i / templates.length);
      cards.push({
        id: `general_${String(typeIndex * 125 + i + 1).padStart(3, '0')}`,
        type,
        category: "general",
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

export const GENERAL_CARDS: BilingualCard[] = generateGeneralCards();
