// src/data/truthOrDareData.ts

export type CardType = 'truth' | 'dare';
export type GameCategory = 'couple' | 'friends' | 'family' | 'party';
export type GameLevel = 'normal' | 'spicy' | 'extreme';

export interface BilingualTruthOrDareCard {
  type: CardType;
  text: {
    tr: string;
    en: string;
  };
  level: GameLevel;
  category: GameCategory;
}

export const BILINGUAL_TRUTH_OR_DARE_CARDS: BilingualTruthOrDareCard[] = [
  // ==================== TRUTH CARDS ====================
  
  // --- COUPLE / NORMAL ---
  { type: 'truth', category: 'couple', level: 'normal', text: { tr: 'İlk buluşmamızda ne hissettin?', en: 'What did you feel on our first date?' } },
  { type: 'truth', category: 'couple', level: 'normal', text: { tr: 'Bende en çok neyi seviyorsun?', en: 'What do you love most about me?' } },
  { type: 'truth', category: 'couple', level: 'normal', text: { tr: 'Beraber yapmak istediğin çılgın bir şey var mı?', en: 'Is there something crazy you want to do together?' } },
  { type: 'truth', category: 'couple', level: 'normal', text: { tr: 'İlk ne zaman aşık olduğunu anladın?', en: 'When did you first realize you were in love?' } },
  { type: 'truth', category: 'couple', level: 'normal', text: { tr: 'En romantik anımız hangisiydi?', en: 'What was our most romantic moment?' } },
  
  // --- COUPLE / SPICY ---
  { type: 'truth', category: 'couple', level: 'spicy', text: { tr: 'Benimle ilgili gizli bir fantezin var mı?', en: 'Do you have a secret fantasy about me?' } },
  { type: 'truth', category: 'couple', level: 'spicy', text: { tr: 'Vücudumda en çok neyi beğeniyorsun?', en: 'What part of my body do you like the most?' } },
  { type: 'truth', category: 'couple', level: 'spicy', text: { tr: 'İlk öpüşmemizi hatırlıyor musun? Nasıldı?', en: 'Do you remember our first kiss? How was it?' } },
  { type: 'truth', category: 'couple', level: 'spicy', text: { tr: 'En seksi bulduğun anım hangisi?', en: 'What is my sexiest moment?' } },
  { type: 'truth', category: 'couple', level: 'spicy', text: { tr: 'Seni en çok ne tahrik ediyor?', en: 'What turns you on the most?' } },

  // --- COUPLE / EXTREME ---
  { type: 'truth', category: 'couple', level: 'extreme', text: { tr: 'En büyük cinsel fantezin nedir?', en: 'What is your biggest sexual fantasy?' } },
  { type: 'truth', category: 'couple', level: 'extreme', text: { tr: 'Yatak odasında denemek istediğin bir şey var mı?', en: 'Is there something you want to try in the bedroom?' } },
  { type: 'truth', category: 'couple', level: 'extreme', text: { tr: 'Birlikte en çok hangi pozisyonu seviyorsun?', en: 'Which position do you like the most together?' } },
  
  // --- FRIENDS / NORMAL ---
  { type: 'truth', category: 'friends', level: 'normal', text: { tr: 'Hayatında en mutlu olduğun an neydi?', en: 'What was the happiest moment of your life?' } },
  { type: 'truth', category: 'friends', level: 'normal', text: { tr: 'En büyük hayalin nedir?', en: 'What is your biggest dream?' } },
  { type: 'truth', category: 'friends', level: 'normal', text: { tr: 'Kimseye söylemediğin bir korkun var mı?', en: 'Do you have a fear you haven\'t told anyone?' } },

  // --- FRIENDS / SPICY ---
  { type: 'truth', category: 'friends', level: 'spicy', text: { tr: 'Gizlice aşık olduğun biri var mı? Kim?', en: 'Do you have a secret crush? Who?' } },
  { type: 'truth', category: 'friends', level: 'spicy', text: { tr: 'Kimseye söylemediğin bir sırrın var mı?', en: 'Do you have a secret you haven\'t told anyone?' } },
  { type: 'truth', category: 'friends', level: 'spicy', text: { tr: 'İlk öpücük deneyimin nasıldı?', en: 'How was your first kiss experience?' } },

  // --- FRIENDS / EXTREME ---
  { type: 'truth', category: 'friends', level: 'extreme', text: { tr: 'Bu odadaki birine çekiliyor musun? Kim?', en: 'Are you attracted to anyone in this room? Who?' } },
  { type: 'truth', category: 'friends', level: 'extreme', text: { tr: 'Bir gecelik ilişki yaşadın mı?', en: 'Have you ever had a one-night stand?' } },

  // --- FAMILY / NORMAL ---
  { type: 'truth', category: 'family', level: 'normal', text: { tr: 'Çocukken en çok hangi yaramazlığı yaptın?', en: 'What was the naughtiest thing you did as a child?' } },
  { type: 'truth', category: 'family', level: 'normal', text: { tr: 'En son ne zaman ağladın ve neden?', en: 'When was the last time you cried and why?' } },
  { type: 'truth', category: 'family', level: 'normal', text: { tr: 'Hayalindeki meslek ne?', en: 'What is your dream job?' } },

  // --- PARTY / NORMAL ---
  { type: 'truth', category: 'party', level: 'normal', text: { tr: 'En garip takma ismin neydi?', en: 'What was your weirdest nickname?' } },
  { type: 'truth', category: 'party', level: 'normal', text: { tr: 'Telefonunda silmek zorunda kaldığın utanç verici bir şey var mı?', en: 'Is there something embarrassing on your phone you had to delete?' } },

  // --- PARTY / SPICY ---
  { type: 'truth', category: 'party', level: 'spicy', text: { tr: 'Buraya gelirken iç çamaşırı giydin mü?', en: 'Did you wear underwear coming here?' } },
  { type: 'truth', category: 'party', level: 'spicy', text: { tr: 'Flört ederken kullandığın en garip yöntem neydi?', en: 'What was the weirdest flirting method you used?' } },

  // --- PARTY / EXTREME ---
  { type: 'truth', category: 'party', level: 'extreme', text: { tr: 'En çılgın cinsel deneyimin neydi?', en: 'What was your craziest sexual experience?' } },
  { type: 'truth', category: 'party', level: 'extreme', text: { tr: 'Partide bir gece macerası yaşadın mı?', en: 'Have you ever had a one-night stand at a party?' } },


  // ==================== DARE CARDS ====================

  // --- COUPLE / NORMAL ---
  { type: 'dare', category: 'couple', level: 'normal', text: { tr: 'Partnerinin eline 30 saniye romantik bir şekilde bak.', en: 'Look romantically at your partner\'s hand for 30 seconds.' } },
  { type: 'dare', category: 'couple', level: 'normal', text: { tr: 'En sevdiğin anını anlat ve canlandır.', en: 'Describe and act out your favorite moment.' } },
  { type: 'dare', category: 'couple', level: 'normal', text: { tr: 'Partnerine neden aşık olduğunu anlat.', en: 'Tell your partner why you fell in love.' } },

  // --- COUPLE / SPICY ---
  { type: 'dare', category: 'couple', level: 'spicy', text: { tr: 'Partnerinin boynunu öp.', en: 'Kiss your partner\'s neck.' } },
  { type: 'dare', category: 'couple', level: 'spicy', text: { tr: '30 saniye boyunca şehvetli bir şekilde bak.', en: 'Look sensually for 30 seconds.' } },
  { type: 'dare', category: 'couple', level: 'spicy', text: { tr: 'Yavaş bir dans edin.', en: 'Slow dance together.' } },

  // --- COUPLE / EXTREME ---
  { type: 'dare', category: 'couple', level: 'extreme', text: { tr: 'Partnerinle 7 saniye tutkuyla öpüş.', en: 'Kiss your partner passionately for 7 seconds.' } },
  { type: 'dare', category: 'couple', level: 'extreme', text: { tr: 'Partnerine vücudundan bir bölge göster, 10 saniye masaj yapsın.', en: 'Show a body part to your partner, let them massage it for 10 seconds.' } },

  // --- FRIENDS / NORMAL ---
  { type: 'dare', category: 'friends', level: 'normal', text: { tr: 'Sağındaki kişiye 10 saniye boyunca göz göze bak, gülme!', en: 'Stare at the person on your right for 10 seconds, don\'t laugh!' } },
  { type: 'dare', category: 'friends', level: 'normal', text: { tr: 'En son aldığın mesajı yüksek sesle oku.', en: 'Read the last message you received out loud.' } },

  // --- FRIENDS / SPICY ---
  { type: 'dare', category: 'friends', level: 'spicy', text: { tr: 'Grubun seçtiği biriyle yavaş dans et.', en: 'Slow dance with someone chosen by the group.' } },
  { type: 'dare', category: 'friends', level: 'spicy', text: { tr: 'Karşındaki kişiye sensiz olamam de ve neden olduğunu anlat.', en: 'Tell the person opposite you "I can\'t be without you" and explain why.' } },

  // --- FRIENDS / EXTREME ---
  { type: 'dare', category: 'friends', level: 'extreme', text: { tr: 'Solundaki kişinin kulağını 5 saniye em.', en: 'Suck the ear of the person on your left for 5 seconds.' } },
  { type: 'dare', category: 'friends', level: 'extreme', text: { tr: 'Grubun seçtiği biriyle 7 saniye öpüş.', en: 'Kiss someone chosen by the group for 7 seconds.' } },

  // --- FAMILY / NORMAL ---
  { type: 'dare', category: 'family', level: 'normal', text: { tr: 'Gruba komik bir hikaye anlat.', en: 'Tell a funny story to the group.' } },
  { type: 'dare', category: 'family', level: 'normal', text: { tr: 'En sevdiğin şarkıyı söyle.', en: 'Sing your favorite song.' } },

  // --- PARTY / NORMAL ---
  { type: 'dare', category: 'party', level: 'normal', text: { tr: 'Sosyal medya hesaplarından birinde eğlenceli bir şey paylaş.', en: 'Post something fun on one of your social media accounts.' } },
  { type: 'dare', category: 'party', level: 'normal', text: { tr: 'En sevdiğin şarkıyı söyle ama çok kötü söyle.', en: 'Sing your favorite song but sing it very badly.' } },

  // --- PARTY / SPICY ---
  { type: 'dare', category: 'party', level: 'spicy', text: { tr: 'Karşındaki kişiyle yer değiştir ama sadece sürünerek.', en: 'Switch places with the person opposite you but only by crawling.' } },
  { type: 'dare', category: 'party', level: 'spicy', text: { tr: 'Grubun seçtiği bir kişiye lapdance yap 30 saniye.', en: 'Give a lap dance to someone chosen by the group for 30 seconds.' } },

  // --- PARTY / EXTREME ---
  { type: 'dare', category: 'party', level: 'extreme', text: { tr: 'Çıkar üstündeki bir kıyafeti (makul olanı)', en: 'Take off one piece of clothing (something reasonable).' } },
  { type: 'dare', category: 'party', level: 'extreme', text: { tr: 'Şişe çevir, çıkan kişiyle french kiss yap.', en: 'Spin the bottle, french kiss the person it points to.' } },
];

export const getTruthOrDareCards = (language: 'tr' | 'en') => {
  return BILINGUAL_TRUTH_OR_DARE_CARDS.map(card => ({
    type: card.type,
    text: card.text[language],
    level: card.level,
    category: card.category,
  }));
};
