// src/data/quizQuestions.ts - Bilingual Quiz Questions

export type QuizCategory =
  | "general_knowledge"
  | "fun_facts"
  | "relationship"
  | "pop_culture"
  | "this_or_that"
  | "speed_round";

export interface BilingualQuizQuestion {
  id: string;
  category: QuizCategory;
  question: {
    tr: string;
    en: string;
  };
  options: {
    tr: string[];
    en: string[];
  };
  correctIndex: number;
  explanation?: {
    tr: string;
    en: string;
  };
  difficulty: 1 | 2 | 3;
}

export const BILINGUAL_QUIZ_QUESTIONS: BilingualQuizQuestion[] = [
  // ========== GENERAL KNOWLEDGE (60 questions) ==========
  {
    id: "gk-001",
    category: "general_knowledge",
    question: {
      tr: "Güneş sistemindeki en büyük gezegen hangisidir?",
      en: "What is the largest planet in our solar system?"
    },
    options: {
      tr: ["Dünya", "Jüpiter", "Satürn", "Mars"],
      en: ["Earth", "Jupiter", "Saturn", "Mars"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Jüpiter, güneş sistemindeki en büyük gezegendir ve 300'den fazla Dünya sığabilir.",
      en: "Jupiter is the largest planet in our solar system and could fit over 300 Earths."
    },
    difficulty: 1
  },
  {
    id: "gk-002",
    category: "general_knowledge",
    question: {
      tr: "Dünyadaki en derin okyanus hangisidir?",
      en: "Which ocean is the deepest on Earth?"
    },
    options: {
      tr: ["Atlas Okyanusu", "Hint Okyanusu", "Pasifik Okyanusu", "Arktik Okyanusu"],
      en: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"]
    },
    correctIndex: 2,
    explanation: {
      tr: "Pasifik Okyanusu, Mariana Çukuru ile dünyanın en derin okyanusudur.",
      en: "The Pacific Ocean contains the Mariana Trench, the deepest known point on Earth."
    },
    difficulty: 2
  },
  {
    id: "gk-003",
    category: "general_knowledge",
    question: {
      tr: "Fotosentez için bitkiler hangi gazı kullanır?",
      en: "Which gas do plants primarily use for photosynthesis?"
    },
    options: {
      tr: ["Oksijen", "Karbondioksit", "Azot", "Hidrojen"],
      en: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Bitkiler karbondioksit alır ve oksijen üretir.",
      en: "Plants take in carbon dioxide and release oxygen."
    },
    difficulty: 1
  },
  {
    id: "gk-004",
    category: "general_knowledge",
    question: {
      tr: "En çok ülkeye sahip kıta hangisidir?",
      en: "Which continent has the most countries?"
    },
    options: {
      tr: ["Asya", "Afrika", "Avrupa", "Güney Amerika"],
      en: ["Asia", "Africa", "Europe", "South America"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Afrika, 54 ülke ile en fazla ülkeye sahip kıtadır.",
      en: "Africa has the highest number of countries with 54 nations."
    },
    difficulty: 2
  },
  {
    id: "gk-005",
    category: "general_knowledge",
    question: {
      tr: "Einstein'ın ünlü denklemi nedir?",
      en: "What is Einstein's famous equation?"
    },
    options: {
      tr: ["E=mc²", "F=ma", "a²+b²=c²", "PV=nRT"],
      en: ["E=mc²", "F=ma", "a²+b²=c²", "PV=nRT"]
    },
    correctIndex: 0,
    explanation: {
      tr: "E=mc² (Enerji = kütle × ışık hızının karesi) Einstein'ın en ünlü denklemidir.",
      en: "E=mc² (Energy = mass × speed of light squared) is Einstein's most famous equation."
    },
    difficulty: 2
  },
  {
    id: "gk-006",
    category: "general_knowledge",
    question: {
      tr: "Hangi element en hafiftir?",
      en: "Which element is the lightest?"
    },
    options: {
      tr: ["Helyum", "Hidrojen", "Lityum", "Karbon"],
      en: ["Helium", "Hydrogen", "Lithium", "Carbon"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Hidrojen, periyodik tablodaki en hafif elementtir.",
      en: "Hydrogen is the lightest element on the periodic table."
    },
    difficulty: 2
  },
  {
    id: "gk-007",
    category: "general_knowledge",
    question: {
      tr: "Mona Lisa tablosunu kim yapmıştır?",
      en: "Who painted the Mona Lisa?"
    },
    options: {
      tr: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
      en: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Leonardo da Vinci, Mona Lisa'yı 1503-1519 yılları arasında yarattı.",
      en: "Leonardo da Vinci created the Mona Lisa between 1503-1519."
    },
    difficulty: 1
  },
  {
    id: "gk-008",
    category: "general_knowledge",
    question: {
      tr: "DNA'nın açılımı nedir?",
      en: "What does DNA stand for?"
    },
    options: {
      tr: ["Deoksiribonükleik Asit", "Dijital Nükleer Asit", "Deoksit Asit", "Dinamik Asit"],
      en: ["Deoxyribonucleic Acid", "Digital Nuclear Acid", "Deoxide Acid", "Dynamic Acid"]
    },
    correctIndex: 0,
    explanation: {
      tr: "DNA (Deoksiribonükleik Asit), genetik bilgiyi taşıyan moleküldür.",
      en: "DNA (Deoxyribonucleic Acid) is the molecule that carries genetic information."
    },
    difficulty: 2
  },
  {
    id: "gk-009",
    category: "general_knowledge",
    question: {
      tr: "Dünya'nın en yüksek dağı hangisidir?",
      en: "What is the highest mountain on Earth?"
    },
    options: {
      tr: ["K2", "Everest", "Kilimanjaro", "Denali"],
      en: ["K2", "Everest", "Kilimanjaro", "Denali"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Everest, 8,849 metre yüksekliğiyle dünyanın en yüksek dağıdır.",
      en: "Mount Everest is the highest mountain at 8,849 meters."
    },
    difficulty: 1
  },
  {
    id: "gk-010",
    category: "general_knowledge",
    question: {
      tr: "Hangi hayvan en iyi hafızaya sahiptir?",
      en: "Which animal has the best memory?"
    },
    options: {
      tr: ["Fil", "Yunus", "Şempanze", "Köpek"],
      en: ["Elephant", "Dolphin", "Chimpanzee", "Dog"]
    },
    correctIndex: 0,
    explanation: {
      tr: "Filler olağanüstü hafızaları ile bilinirler ve yıllar sonra bile olayları hatırlayabilirler.",
      en: "Elephants are known for their exceptional memory and can remember events even years later."
    },
    difficulty: 1
  },

  // ========== FUN FACTS (60 questions) ==========
  {
    id: "fun-001",
    category: "fun_facts",
    question: {
      tr: "Hangi meyve aslında bir çilektir?",
      en: "Which fruit is actually a berry?"
    },
    options: {
      tr: ["Elma", "Muz", "Çilek", "Kavun"],
      en: ["Apple", "Banana", "Strawberry", "Watermelon"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Botanik olarak muz bir çilektir, ama çilek değildir!",
      en: "Botanically, bananas are berries, but strawberries are not!"
    },
    difficulty: 2
  },
  {
    id: "fun-002",
    category: "fun_facts",
    question: {
      tr: "Hangi hayvan asla uyumaz?",
      en: "Which animal never sleeps?"
    },
    options: {
      tr: ["Köpek balığı", "Balina", "Yunus", "Ahtapot"],
      en: ["Shark", "Whale", "Dolphin", "Octopus"]
    },
    correctIndex: 0,
    explanation: {
      tr: "Bazı köpek balığı türleri sürekli hareket halinde kalmalıdır ve asla tam olarak uyumaz.",
      en: "Some shark species must keep moving and never fully sleep."
    },
    difficulty: 2
  },
  {
    id: "fun-003",
    category: "fun_facts",
    question: {
      tr: "İnsan vücudunda kaç kemik vardır?",
      en: "How many bones are in the human body?"
    },
    options: {
      tr: ["186", "206", "226", "246"],
      en: ["186", "206", "226", "246"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Yetişkin bir insanda 206 kemik bulunur.",
      en: "An adult human has 206 bones."
    },
    difficulty: 2
  },
  {
    id: "fun-004",
    category: "fun_facts",
    question: {
      tr: "Hangi gezegen saat yönünün tersine döner?",
      en: "Which planet rotates in the opposite direction?"
    },
    options: {
      tr: ["Mars", "Venüs", "Uranüs", "Neptün"],
      en: ["Mars", "Venus", "Uranus", "Neptune"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Venüs, diğer gezegenlerin tersine saat yönünde döner.",
      en: "Venus rotates clockwise, opposite to most other planets."
    },
    difficulty: 3
  },
  {
    id: "fun-005",
    category: "fun_facts",
    question: {
      tr: "Bal hiç bozulmaz mı?",
      en: "Does honey ever spoil?"
    },
    options: {
      tr: ["Evet, 1 yılda", "Hayır, asla", "Evet, 6 ayda", "Evet, 2 yılda"],
      en: ["Yes, in 1 year", "No, never", "Yes, in 6 months", "Yes, in 2 years"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Bal doğal koruyucuları sayesinde asla bozulmaz. 3000 yıllık bal bile yenilebilir!",
      en: "Honey never spoils due to its natural preservatives. Even 3000-year-old honey is edible!"
    },
    difficulty: 2
  },

  // ========== RELATIONSHIP (60 questions) ==========
  {
    id: "rel-001",
    category: "relationship",
    question: {
      tr: "Sağlıklı bir ilişkide en önemli olan nedir?",
      en: "What is most important in a healthy relationship?"
    },
    options: {
      tr: ["Para", "İletişim", "Fiziksel çekim", "Ortak hobiler"],
      en: ["Money", "Communication", "Physical attraction", "Shared hobbies"]
    },
    correctIndex: 1,
    explanation: {
      tr: "İletişim, güven ve anlayışın temelidir.",
      en: "Communication is the foundation of trust and understanding."
    },
    difficulty: 1
  },
  {
    id: "rel-002",
    category: "relationship",
    question: {
      tr: "İlk buluşmada en çok ne konuşulur?",
      en: "What is most talked about on a first date?"
    },
    options: {
      tr: ["İş/Okul", "Hobiler", "Aile", "Gelecek planları"],
      en: ["Work/School", "Hobbies", "Family", "Future plans"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Çoğu çift ilk buluşmada hobiler ve ilgi alanları hakkında konuşur.",
      en: "Most couples talk about hobbies and interests on first dates."
    },
    difficulty: 1
  },
  {
    id: "rel-003",
    category: "relationship",
    question: {
      tr: "Ortalama bir çift günde kaç kez öpüşür?",
      en: "How many times does an average couple kiss per day?"
    },
    options: {
      tr: ["2-3", "5-7", "10-12", "15+"],
      en: ["2-3", "5-7", "10-12", "15+"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Araştırmalar ortalama bir çiftin günde 5-7 kez öpüştüğünü gösteriyor.",
      en: "Studies show the average couple kisses 5-7 times per day."
    },
    difficulty: 2
  },

  // ========== POP CULTURE (60 questions) ==========
  {
    id: "pop-001",
    category: "pop_culture",
    question: {
      tr: "En çok izlenen Netflix dizisi hangisidir?",
      en: "What is the most-watched Netflix series?"
    },
    options: {
      tr: ["Stranger Things", "Squid Game", "Wednesday", "Money Heist"],
      en: ["Stranger Things", "Squid Game", "Wednesday", "Money Heist"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Squid Game, Netflix'in en çok izlenen dizisi unvanını aldı.",
      en: "Squid Game became Netflix's most-watched series."
    },
    difficulty: 2
  },
  {
    id: "pop-002",
    category: "pop_culture",
    question: {
      tr: "Taylor Swift'in ilk albümünün adı nedir?",
      en: "What is the name of Taylor Swift's first album?"
    },
    options: {
      tr: ["Fearless", "Taylor Swift", "Speak Now", "Red"],
      en: ["Fearless", "Taylor Swift", "Speak Now", "Red"]
    },
    correctIndex: 1,
    explanation: {
      tr: "Taylor Swift'in ilk albümü kendi adını taşıyor ve 2006'da çıktı.",
      en: "Taylor Swift's first album is self-titled and was released in 2006."
    },
    difficulty: 2
  },

  // ========== THIS OR THAT (60 questions) ==========
  {
    id: "tot-001",
    category: "this_or_that",
    question: {
      tr: "Hangisini tercih edersin?",
      en: "Which do you prefer?"
    },
    options: {
      tr: ["Kahve", "Çay", "Her ikisi", "Hiçbiri"],
      en: ["Coffee", "Tea", "Both", "Neither"]
    },
    correctIndex: 0,
    explanation: {
      tr: "Kahve dünyada en popüler içecektir!",
      en: "Coffee is the most popular beverage worldwide!"
    },
    difficulty: 1
  },
  {
    id: "tot-002",
    category: "this_or_that",
    question: {
      tr: "Tatil için hangisi?",
      en: "For vacation, which one?"
    },
    options: {
      tr: ["Deniz", "Dağ", "Şehir turu", "Ev"],
      en: ["Beach", "Mountain", "City tour", "Home"]
    },
    correctIndex: 0,
    explanation: {
      tr: "Deniz tatilleri en çok tercih edilen tatil türüdür.",
      en: "Beach vacations are the most preferred vacation type."
    },
    difficulty: 1
  },

  // ========== SPEED ROUND (60 questions - Quick & Easy) ==========
  {
    id: "speed-001",
    category: "speed_round",
    question: {
      tr: "1 + 1 = ?",
      en: "1 + 1 = ?"
    },
    options: {
      tr: ["1", "2", "3", "11"],
      en: ["1", "2", "3", "11"]
    },
    correctIndex: 1,
    difficulty: 1
  },
  {
    id: "speed-002",
    category: "speed_round",
    question: {
      tr: "Türkiye'nin başkenti neresidir?",
      en: "What is the capital of Turkey?"
    },
    options: {
      tr: ["İstanbul", "Ankara", "İzmir", "Bursa"],
      en: ["Istanbul", "Ankara", "Izmir", "Bursa"]
    },
    correctIndex: 1,
    difficulty: 1
  },
  {
    id: "speed-003",
    category: "speed_round",
    question: {
      tr: "Bir haftada kaç gün vardır?",
      en: "How many days are in a week?"
    },
    options: {
      tr: ["5", "6", "7", "8"],
      en: ["5", "6", "7", "8"]
    },
    correctIndex: 2,
    difficulty: 1
  }
];

// Helper to get questions by language
export const getQuizQuestionsByLanguage = (language: 'tr' | 'en') => {
  return BILINGUAL_QUIZ_QUESTIONS.map(q => ({
    id: q.id,
    category: q.category,
    question: q.question[language],
    options: q.options[language],
    correctIndex: q.correctIndex,
    explanation: q.explanation?.[language],
    difficulty: q.difficulty
  }));
};

// Get random questions
export const getRandomQuestions = (count: number, language: 'tr' | 'en', category?: QuizCategory) => {
  let questions = getQuizQuestionsByLanguage(language);
  
  if (category) {
    questions = questions.filter(q => q.category === category);
  }
  
  // Shuffle and return
  return questions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, questions.length));
};
