// Deep relationship questions for emotional connection and intimacy
// Organized by relationship stage and depth level

export type DeepQuestionCategory = 
  | 'vulnerability' 
  | 'dreams' 
  | 'past' 
  | 'intimacy' 
  | 'future' 
  | 'values' 
  | 'fears' 
  | 'gratitude'
  | 'growth'
  | 'romance';

export interface DeepQuestion {
  id: string;
  question: string;
  category: DeepQuestionCategory;
  relationshipStages: ('new' | 'dating' | 'serious' | 'engaged' | 'married' | 'ldr')[];
  depthLevel: 1 | 2 | 3 | 4 | 5; // 1=light, 5=very deep
  followUp?: string; // Optional follow-up question
  emoji: string;
  tip?: string; // Guidance for answering
}

export const DEEP_QUESTIONS: DeepQuestion[] = [
  // VULNERABILITY (Level 3-5)
  {
    id: 'vuln_001',
    question: 'Hangi konularda en savunmasız hissediyorsun ve bunu benimle paylaşabilir misin?',
    category: 'vulnerability',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 4,
    followUp: 'Bu savunmasızlığı aşmak için ne yapabilirim?',
    emoji: '💭',
    tip: 'Dürüst ol ve dinlemeye hazır ol',
  },
  {
    id: 'vuln_002',
    question: 'Çocukluğunda yaşadığın ve bugünkü ilişkilerine yansıyan bir olay nedir?',
    category: 'vulnerability',
    relationshipStages: ['serious', 'engaged', 'married', 'ldr'],
    depthLevel: 5,
    emoji: '🌱',
  },
  {
    id: 'vuln_003',
    question: 'Benimle ilgili en çok korktuğun şey nedir ve neden?',
    category: 'vulnerability',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '😌',
  },
  {
    id: 'vuln_004',
    question: 'Son zamanlarda kendini yalnız hissettiğin bir an oldu mu? Neden?',
    category: 'vulnerability',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 3,
    followUp: 'O anda seni nasıl destekleyebilirdim?',
    emoji: '🤗',
  },
  {
    id: 'vuln_005',
    question: 'Kendinde değiştirmek istediğin ama korktuğun bir özellik var mı?',
    category: 'vulnerability',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '🦋',
  },

  // DREAMS & FUTURE (Level 2-4)
  {
    id: 'dream_001',
    question: '10 yıl sonra kendini nerede ve nasıl hayal ediyorsun? Ben bu hayalde var mıyım?',
    category: 'future',
    relationshipStages: ['serious', 'engaged', 'married', 'ldr'],
    depthLevel: 3,
    emoji: '🌟',
  },
  {
    id: 'dream_002',
    question: 'Gerçekleştirmek istediğin ama cesaret edemediğin bir hayalin var mı?',
    category: 'dreams',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    followUp: 'Bu hayali gerçekleştirmek için sana nasıl destek olabilirim?',
    emoji: '🎯',
  },
  {
    id: 'dream_003',
    question: 'Beraber yaşamak istediğin en çılgın macera nedir?',
    category: 'dreams',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 2,
    emoji: '🚀',
  },
  {
    id: 'dream_004',
    question: 'İdeal evimiz nasıl bir yer olurdu? Her detayı anlat.',
    category: 'future',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '🏡',
  },
  {
    id: 'dream_005',
    question: 'Eğer para hiç sorun olmasaydı, hayatını nasıl yaşardın?',
    category: 'dreams',
    relationshipStages: ['new', 'dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    emoji: '💫',
  },

  // INTIMACY & CONNECTION (Level 3-5)
  {
    id: 'intim_001',
    question: 'Seninle en derin bağlantıyı kurduğumu ne zaman hissediyorsun?',
    category: 'intimacy',
    relationshipStages: ['serious', 'engaged', 'married', 'ldr'],
    depthLevel: 4,
    emoji: '💞',
  },
  {
    id: 'intim_002',
    question: 'Fiziksel yakınlık dışında, seninle yakınlık hissetmemi sağlayan nedir?',
    category: 'intimacy',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '🫂',
  },
  {
    id: 'intim_003',
    question: 'İlişkimizde daha fazla neye ihtiyacın var ama söylemeye çekiniyorsun?',
    category: 'intimacy',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 5,
    emoji: '💭',
  },
  {
    id: 'intim_004',
    question: 'Benim sana dokunuş biçimlerimden hangisi seni en çok etkiliyor?',
    category: 'intimacy',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '✨',
  },
  {
    id: 'intim_005',
    question: 'Seninle cinselliğin ötesinde ne tür bir yakınlık kurmak isterim?',
    category: 'intimacy',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '💝',
  },

  // PAST & HEALING (Level 3-5)
  {
    id: 'past_001',
    question: 'Geçmiş bir ilişkiden öğrendiğin ve benimle paylaşmak istediğin bir ders var mı?',
    category: 'past',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '📖',
  },
  {
    id: 'past_002',
    question: 'Ailenle olan ilişkin bugünkü sevgi dilini nasıl şekillendirdi?',
    category: 'past',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '👨‍👩‍👧',
  },
  {
    id: 'past_003',
    question: 'Hala iyileşmemiş bir kalp kırıklığın var mı? Benimle paylaşır mısın?',
    category: 'past',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 5,
    emoji: '💔',
    tip: 'Yargılamadan dinle ve empati göster',
  },
  {
    id: 'past_004',
    question: 'Çocukluğunda sevgi nasıl ifade edilirdi ve bu seni nasıl etkiledi?',
    category: 'past',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '🌸',
  },
  {
    id: 'past_005',
    question: 'Pişman olduğun ama öğrendiğin bir karar nedir?',
    category: 'past',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '🍃',
  },

  // VALUES & BELIEFS (Level 2-4)
  {
    id: 'value_001',
    question: 'Hayatındaki en önemli üç değer nedir ve neden?',
    category: 'values',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    emoji: '⚖️',
  },
  {
    id: 'value_002',
    question: 'Bir ilişkide asla ödün veremeyeceğin şey nedir?',
    category: 'values',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 3,
    emoji: '🛡️',
  },
  {
    id: 'value_003',
    question: 'Başarıyı nasıl tanımlıyorsun? Bu tanım nasıl gelişti?',
    category: 'values',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    emoji: '🏆',
  },
  {
    id: 'value_004',
    question: 'Manevi inançların hayatını ve ilişkilerini nasıl etkiliyor?',
    category: 'values',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '🙏',
  },
  {
    id: 'value_005',
    question: 'Çocuklarımıza (veya gelecek nesillere) ne tür değerler aktarmak istersin?',
    category: 'values',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '🌱',
  },

  // FEARS & INSECURITIES (Level 4-5)
  {
    id: 'fear_001',
    question: 'İlişkimizle ilgili en derin korkun nedir?',
    category: 'fears',
    relationshipStages: ['serious', 'engaged', 'married', 'ldr'],
    depthLevel: 5,
    emoji: '🌊',
    tip: 'Güvenli alan yarat, yargılamadan dinle',
  },
  {
    id: 'fear_002',
    question: 'Seni en çok kaybetmekten korktuğun şey nedir (biri değil, bir şey)?',
    category: 'fears',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '🍂',
  },
  {
    id: 'fear_003',
    question: 'Yetersiz hissettiğin alanlar hangileri ve neden?',
    category: 'fears',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '🌑',
  },
  {
    id: 'fear_004',
    question: 'Gelecekle ilgili seni endişelendiren bir şey var mı?',
    category: 'fears',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 3,
    emoji: '🌫️',
  },
  {
    id: 'fear_005',
    question: 'Bana gösteremediğin bir zayıf yanın var mı? Neden saklıyorsun?',
    category: 'fears',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 5,
    emoji: '🎭',
  },

  // GRATITUDE & APPRECIATION (Level 1-3)
  {
    id: 'grat_001',
    question: 'Bende fark ettiğin ama belki ben bile farkında olmadığım bir özellik var mı?',
    category: 'gratitude',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 2,
    emoji: '🌺',
  },
  {
    id: 'grat_002',
    question: 'Birlikte yaşadığımız hangi an seni en mutlu etti ve neden?',
    category: 'gratitude',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 2,
    emoji: '✨',
  },
  {
    id: 'grat_003',
    question: 'Benim sana kattığım en değerli şey nedir?',
    category: 'gratitude',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    emoji: '💎',
  },
  {
    id: 'grat_004',
    question: 'Hayatımda olduğun için minnettar olduğum üç şey nedir? (Sen cevapla)',
    category: 'gratitude',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 1,
    emoji: '🙏',
  },
  {
    id: 'grat_005',
    question: 'Benim hakkımda arkadaşlarına övünerek anlattığın bir özelliğim var mı?',
    category: 'gratitude',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    emoji: '⭐',
  },

  // GROWTH & SELF-IMPROVEMENT (Level 2-4)
  {
    id: 'growth_001',
    question: 'Son bir yılda en çok nasıl değiştin/geliştin?',
    category: 'growth',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    emoji: '🌱',
  },
  {
    id: 'growth_002',
    question: 'Birlikte daha iyi insanlar olmak için ne yapabiliriz?',
    category: 'growth',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '🌳',
  },
  {
    id: 'growth_003',
    question: 'Benim sana olumlu katkım nedir ve sen bana ne katıyorsun?',
    category: 'growth',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 2,
    emoji: '🤝',
  },
  {
    id: 'growth_004',
    question: 'İlişkimizin seni nasıl daha iyi bir insan yaptığını düşünüyorsun?',
    category: 'growth',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '💪',
  },
  {
    id: 'growth_005',
    question: 'Üzerinde birlikte çalışmamız gereken bir ilişki alanı var mı?',
    category: 'growth',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 3,
    followUp: 'Bu konuda ilk adım olarak ne yapabiliriz?',
    emoji: '🔧',
  },

  // ROMANCE & LOVE LANGUAGE (Level 1-3)
  {
    id: 'rom_001',
    question: 'Sana romantik gelen ama klişe olmayan bir jest nedir?',
    category: 'romance',
    relationshipStages: ['new', 'dating', 'serious', 'engaged', 'married'],
    depthLevel: 1,
    emoji: '🌹',
  },
  {
    id: 'rom_002',
    question: 'Sevgiyi en çok ne zaman ve nasıl hissediyorsun?',
    category: 'romance',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 2,
    emoji: '💕',
  },
  {
    id: 'rom_003',
    question: 'Seninle yaşamak istediğim romantik bir an hayal et ve anlat.',
    category: 'romance',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    emoji: '🌙',
  },
  {
    id: 'rom_004',
    question: 'Benim sana olan sevgimi nasıl daha iyi gösterebilirim?',
    category: 'romance',
    relationshipStages: ['dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 2,
    emoji: '💝',
  },
  {
    id: 'rom_005',
    question: 'İdeal bir akşamımız nasıl olurdu? Baştan sona anlat.',
    category: 'romance',
    relationshipStages: ['new', 'dating', 'serious', 'engaged', 'married'],
    depthLevel: 1,
    emoji: '🕯️',
  },

  // Additional deep questions for variety
  {
    id: 'vuln_006',
    question: 'Kimseye söylemediğin bir sırrın var mı? Benimle paylaşır mısın?',
    category: 'vulnerability',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 5,
    emoji: '🤫',
    tip: 'Tam güven ortamı gerektirir',
  },
  {
    id: 'intim_006',
    question: 'Öpüşürken ne düşünüyorsun?',
    category: 'intimacy',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '💋',
  },
  {
    id: 'dream_006',
    question: 'Emekli olunca birlikte ne yapmak istersin?',
    category: 'future',
    relationshipStages: ['engaged', 'married'],
    depthLevel: 2,
    emoji: '🌅',
  },
  {
    id: 'fear_006',
    question: 'Beni hayal kırıklığına uğratmaktan korkuyor musun?',
    category: 'fears',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '😔',
  },
  {
    id: 'value_006',
    question: 'Annenin/babanın evliliğinden ne öğrendin?',
    category: 'values',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '👪',
  },
  {
    id: 'past_006',
    question: 'Hayatındaki en zor dönemi nasıl atlattın?',
    category: 'past',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 4,
    emoji: '⛈️',
  },
  {
    id: 'growth_006',
    question: '5 yıl önceki haline şimdi ne tavsiye verirdin?',
    category: 'growth',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    emoji: '💭',
  },
  {
    id: 'grat_007',
    question: 'Bugün beni düşündüğün bir an oldu mu? Ne düşündün?',
    category: 'gratitude',
    relationshipStages: ['new', 'dating', 'serious', 'engaged', 'married', 'ldr'],
    depthLevel: 1,
    emoji: '💫',
  },
  {
    id: 'rom_006',
    question: 'Sana aşık olduğum anı hatırlıyor musun? O an ne hissettin?',
    category: 'romance',
    relationshipStages: ['serious', 'engaged', 'married'],
    depthLevel: 3,
    emoji: '😍',
  },
  {
    id: 'intim_007',
    question: 'Bana en yakın hissettiğin aktivite nedir?',
    category: 'intimacy',
    relationshipStages: ['dating', 'serious', 'engaged', 'married'],
    depthLevel: 2,
    emoji: '🫶',
  },
];

// Helper functions
export const getQuestionsByStage = (stage: string): DeepQuestion[] => {
  return DEEP_QUESTIONS.filter(q => 
    q.relationshipStages.includes(stage as any)
  );
};

export const getQuestionsByDepth = (minDepth: number, maxDepth: number): DeepQuestion[] => {
  return DEEP_QUESTIONS.filter(q => 
    q.depthLevel >= minDepth && q.depthLevel <= maxDepth
  );
};

export const getQuestionsByCategory = (category: DeepQuestionCategory): DeepQuestion[] => {
  return DEEP_QUESTIONS.filter(q => q.category === category);
};

export const getRandomDeepQuestion = (
  stage?: string,
  category?: DeepQuestionCategory,
  maxDepth: number = 5
): DeepQuestion => {
  let filtered = DEEP_QUESTIONS;
  
  if (stage) {
    filtered = filtered.filter(q => q.relationshipStages.includes(stage as any));
  }
  
  if (category) {
    filtered = filtered.filter(q => q.category === category);
  }
  
  filtered = filtered.filter(q => q.depthLevel <= maxDepth);
  
  return filtered[Math.floor(Math.random() * filtered.length)];
};
