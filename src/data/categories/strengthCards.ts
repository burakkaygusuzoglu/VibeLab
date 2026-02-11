// STRENGTH Category Cards - 500 Bilingual Couple Cards (Relationship Building & Trust)

import { BilingualCard } from '../cardTypes';

const STRENGTH_TEMPLATES = {
  truth: [
    { tr: { t: "En Zor An", d: "Birlikte yaşadığımız en zor an neydi ve nasıl atlattık?" }, en: { t: "Hardest Moment", d: "What was our hardest moment and how did we overcome it?" }, i: 3 },
    { tr: { t: "Güven", d: "Bana en çok güvendiğin konu nedir?" }, en: { t: "Trust", d: "What do you trust me with the most?" }, i: 2 },
    { tr: { t: "Destek", d: "Sana en çok destek olduğum an ne zaman?" }, en: { t: "Support", d: "When did I support you the most?" }, i: 2 },
    { tr: { t: "Birlikte Büyümek", d: "İlişkimiz seni nasıl geliştirdi?" }, en: { t: "Growing Together", d: "How has our relationship helped you grow?" }, i: 3 },
    { tr: { t: "Zayıf Anlar", d: "Zayıf olduğun anlarda benden ne bekliyorsun?" }, en: { t: "Vulnerable Moments", d: "What do you need from me when you're vulnerable?" }, i: 3 },
  ],
  dare: [
    { tr: { t: "Minnet İfadesi", d: "Bana minnetle karşı olduğun 3 şeyi söyle." }, en: { t: "Gratitude", d: "Tell me 3 things you're grateful for about me." }, i: 2 },
    { tr: { t: "Özür Dile", d: "Eğer bir özrün varsa, şimdi samimi bir şekilde söyle." }, en: { t: "Apologize", d: "If you have an apology, sincerely say it now." }, i: 3 },
    { tr: { t: "Açık Ol", d: "Bana söylemek isteyip de söyleyemediğin bir şeyi şimdi söyle." }, en: { t: "Be Open", d: "Tell me something you've wanted to say but haven't." }, i: 3 },
    { tr: { t: "Destek Sözü", d: "Bana her zaman yanımda olacağına dair söz ver." }, en: { t: "Promise Support", d: "Promise me you'll always be there for me." }, i: 2 },
  ],
  question: [
    { tr: { t: "İletişim", d: "İletişimimizi nasıl daha iyi hale getirebiliriz?" }, en: { t: "Communication", d: "How can we improve our communication?" }, i: 3 },
    { tr: { t: "Hedefler", d: "Birlikte ulaşmak istediğimiz en önemli hedef nedir?" }, en: { t: "Goals", d: "What's our most important goal together?" }, i: 2 },
    { tr: { t: "Anlaşılmak", d: "Seni en iyi ne zaman anladığımı hissediyorsun?" }, en: { t: "Being Understood", d: "When do you feel most understood by me?" }, i: 2 },
    { tr: { t: "Daha İyi İlişki", d: "İlişkimizi güçlendirmek için ne yapabiliriz?" }, en: { t: "Better Relationship", d: "What can we do to strengthen our relationship?" }, i: 3 },
  ],
  challenge: [
    { tr: { t: "Derin Konuşma", d: "5 dakika boyunca geleceğiniz hakkında derin bir konuşma yapın." }, en: { t: "Deep Talk", d: "Have a deep conversation about your future for 5 minutes." }, i: 3 },
    { tr: { t: "Birlikte Çözüm", d: "Küçük bir problemi birlikte çözün." }, en: { t: "Solve Together", d: "Solve a small problem together." }, i: 2 },
    { tr: { t: "Güven Alıştırması", d: "Gözlerini kapat, sana rehberlik edeceğim." }, en: { t: "Trust Exercise", d: "Close your eyes, I'll guide you." }, i: 2 },
  ]
};

function generateStrengthCards(): BilingualCard[] {
  const cards: BilingualCard[] = [];
  const types: Array<"truth" | "dare" | "question" | "challenge"> = ["truth", "dare", "question", "challenge"];
  
  types.forEach((type, typeIndex) => {
    const templates = STRENGTH_TEMPLATES[type];
    for (let i = 0; i < 125; i++) {
      const template = templates[i % templates.length];
      const variant = Math.floor(i / templates.length);
      cards.push({
        id: `strength_${String(typeIndex * 125 + i + 1).padStart(3, '0')}`,
        type,
        category: "strength",
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

export const STRENGTH_CARDS: BilingualCard[] = generateStrengthCards();
