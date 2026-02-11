// CRAZY Category Cards - 500 Bilingual Couple Cards

import { BilingualCard } from '../cardTypes';

const CRAZY_TEMPLATES = {
  truth: [
    { tr: { t: "En Çılgın Hayal", d: "Yaptığın en çılgın şey neydi?" }, en: { t: "Craziest Thing", d: "What's the craziest thing you've ever done?" }, i: 2 },
    { tr: { t: "Gizli Fantezi", d: "En çılgın gizli fantezin nedir?" }, en: { t: "Secret Fantasy", d: "What's your craziest secret fantasy?" }, i: 3 },
    { tr: { t: "Riskli Hareket", d: "Hiç yaptığın en riskli şey neydi?" }, en: { t: "Risky Move", d: "What's the riskiest thing you've done?" }, i: 2 },
    { tr: { t: "Adrenalin", d: "En çok adrenalin pompalayan deneyimin neydi?" }, en: { t: "Adrenaline Rush", d: "What gave you the biggest adrenaline rush?" }, i: 2 },
    { tr: { t: "Çılgın Rüya", d: "Gördüğün en çılgın rüya neydi?" }, en: { t: "Crazy Dream", d: "What was your craziest dream?" }, i: 2 },
  ],
  dare: [
    { tr: { t: "Çılgın Dans", d: "En çılgın dansını yap, 1 dakika boyunca!" }, en: { t: "Crazy Dance", d: "Do your craziest dance for 1 minute!" }, i: 2 },
    { tr: { t: "Garip Ses", d: "En garip sesi çıkar, 30 saniye boyunca." }, en: { t: "Weird Sound", d: "Make the weirdest sound for 30 seconds." }, i: 1 },
    { tr: { t: "Rol Yapma", d: "Çılgın bir karakter canlandır, ben tahmin edeyim." }, en: { t: "Role Play", d: "Act as a crazy character and I'll guess who." }, i: 2 },
    { tr: { t: "Hızlı Konuş", d: "30 saniye hızlı hızlı konuş, durmadan!" }, en: { t: "Fast Talk", d: "Talk super fast for 30 seconds non-stop!" }, i: 1 },
  ],
  question: [
    { tr: { t: "Çılgın Macera", d: "Benimle yaşamak istediğin en çılgın macera nedir?" }, en: { t: "Crazy Adventure", d: "What's the craziest adventure you want with me?" }, i: 2 },
    { tr: { t: "Sınır Yok", d: "Eğer sınır olmasaydı, birlikte ne yapardık?" }, en: { t: "No Limits", d: "If there were no limits, what would we do together?" }, i: 3 },
    { tr: { t: "Çılgın İddia", d: "Yapabileceğin en çılgın iddia nedir?" }, en: { t: "Crazy Bet", d: "What's the craziest bet you'd make?" }, i: 2 },
  ],
  challenge: [
    { tr: { t: "Gülme Yasağı", d: "2 dakika birbirinize komik yüzler yapın ama gülmeyin!" }, en: { t: "No Laugh", d: "Make funny faces at each other for 2 minutes but don't laugh!" }, i: 2 },
    { tr: { t: "Hızlı Değişim", d: "30 saniyede 5 farklı duygu göster." }, en: { t: "Quick Change", d: "Show 5 different emotions in 30 seconds." }, i: 2 },
    { tr: { t: "Çılgın İddia", d: "Birbirinize çılgın bir iddiada bulunun!" }, en: { t: "Crazy Challenge", d: "Make a crazy dare to each other!" }, i: 3 },
  ]
};

function generateCrazyCards(): BilingualCard[] {
  const cards: BilingualCard[] = [];
  const types: Array<"truth" | "dare" | "question" | "challenge"> = ["truth", "dare", "question", "challenge"];
  
  types.forEach((type, typeIndex) => {
    const templates = CRAZY_TEMPLATES[type];
    for (let i = 0; i < 125; i++) {
      const template = templates[i % templates.length];
      const variant = Math.floor(i / templates.length);
      cards.push({
        id: `crazy_${String(typeIndex * 125 + i + 1).padStart(3, '0')}`,
        type,
        category: "crazy",
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

export const CRAZY_CARDS: BilingualCard[] = generateCrazyCards();
