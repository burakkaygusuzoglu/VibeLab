// src/data/cards.ts

// --------- TYPES ---------

export type CardCategory =
  | "fun"
  | "romantic"
  | "crazy"
  | "adventurous"
  | "strength"
  | "general";

export type CardType = "truth" | "dare" | "question" | "challenge";

export interface GameCard {
  id: string;
  type: CardType;
  category: CardCategory;
  title: string;
  description: string;
  intensity: 1 | 2 | 3; // 1 = light, 2 = medium, 3 = deep/intense
}

export type QuizCategory =
  | "general_knowledge"
  | "fun_facts"
  | "relationship"
  | "pop_culture"
  | "this_or_that"
  | "speed_round";

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  difficulty: 1 | 2 | 3;
}

// --------- BASE GAME PROMPTS (50 HIGH-QUALITY COUPLE PROMPTS) ---------

interface BaseGamePrompt {
  type: CardType;
  category: CardCategory;
  baseTitle: string;
  baseDescription: string;
  intensity: 1 | 2 | 3;
}

/**
 * Each of these will be combined with 30 different "variations"
 * (Speed Mode, Both Answer, Whisper Mode, etc.) to create
 * 50 * 30 = 1500 unique, slightly twisted cards.
 */
const BASE_GAME_PROMPTS: BaseGamePrompt[] = [
  // ---- FUN ----
  {
    type: "truth",
    category: "fun",
    baseTitle: "Secret Snack Combo",
    baseDescription: "What is your weirdest snack combination that you secretly enjoy?",
    intensity: 1,
  },
  {
    type: "question",
    category: "fun",
    baseTitle: "Cartoon Couple",
    baseDescription: "If we were a cartoon couple, which show would we belong to and why?",
    intensity: 1,
  },
  {
    type: "dare",
    category: "fun",
    baseTitle: "Emoji Story",
    baseDescription: "Tell the story of our relationship using only emojis and then explain it.",
    intensity: 1,
  },
  {
    type: "challenge",
    category: "fun",
    baseTitle: "Laugh Lock",
    baseDescription: "Try to make your partner laugh in 30 seconds without touching them.",
    intensity: 2,
  },
  {
    type: "truth",
    category: "fun",
    baseTitle: "Guilty Pleasure Song",
    baseDescription: "What is your most embarrassing song that you still love listening to?",
    intensity: 1,
  },
  {
    type: "question",
    category: "fun",
    baseTitle: "Power-Up",
    baseDescription: "If you could give me one silly superpower, what would it be and why?",
    intensity: 1,
  },
  {
    type: "dare",
    category: "fun",
    baseTitle: "Meme Me",
    baseDescription: "Find or describe a meme that perfectly represents me.",
    intensity: 1,
  },
  {
    type: "challenge",
    category: "fun",
    baseTitle: "Imitation Game",
    baseDescription: "Imitate me for 30 seconds: my voice, my habits, my typical reactions.",
    intensity: 2,
  },
  {
    type: "question",
    category: "fun",
    baseTitle: "Perfect Game Night",
    baseDescription: "What would our perfect game night look like? Name at least three elements.",
    intensity: 1,
  },
  {
    type: "truth",
    category: "fun",
    baseTitle: "Hidden Talent",
    baseDescription: "What silly talent do you have that most people don't know about?",
    intensity: 1,
  },

  // ---- ROMANTIC ----
  {
    type: "truth",
    category: "romantic",
    baseTitle: "First Impression",
    baseDescription: "What was your very first impression of me when we met?",
    intensity: 1,
  },
  {
    type: "question",
    category: "romantic",
    baseTitle: "Favorite Detail",
    baseDescription: "What is one tiny detail about me that you absolutely love?",
    intensity: 2,
  },
  {
    type: "question",
    category: "romantic",
    baseTitle: "Love Language Check",
    baseDescription: "Which love language do you feel the most from me: words, time, gifts, touch, or help?",
    intensity: 2,
  },
  {
    type: "question",
    category: "romantic",
    baseTitle: "Dream Date",
    baseDescription: "If time and money didn't matter, what would our dream date look like?",
    intensity: 1,
  },
  {
    type: "dare",
    category: "romantic",
    baseTitle: "Future Letter",
    baseDescription: "Describe out loud a short 'letter' to our future selves about our relationship.",
    intensity: 2,
  },
  {
    type: "dare",
    category: "romantic",
    baseTitle: "Compliment Storm",
    baseDescription: "Give your partner five different genuine compliments without stopping.",
    intensity: 1,
  },
  {
    type: "challenge",
    category: "romantic",
    baseTitle: "Memory Match",
    baseDescription: "Each of you shares a favorite memory together; then pick one to recreate soon.",
    intensity: 2,
  },
  {
    type: "challenge",
    category: "romantic",
    baseTitle: "Couple Wishlist",
    baseDescription: "Create a mini wishlist of three things you want to experience as a couple this year.",
    intensity: 2,
  },
  {
    type: "truth",
    category: "romantic",
    baseTitle: "Safe Space",
    baseDescription: "When do you feel the safest and most loved with me?",
    intensity: 3,
  },
  {
    type: "truth",
    category: "romantic",
    baseTitle: "Love Fear",
    baseDescription: "What scares you the most about being in love, and how can I support you with that?",
    intensity: 3,
  },

  // ---- CRAZY ----
  {
    type: "dare",
    category: "crazy",
    baseTitle: "Silly Dance",
    baseDescription: "Do the silliest dance you can for 20 seconds while looking me in the eyes.",
    intensity: 1,
  },
  {
    type: "dare",
    category: "crazy",
    baseTitle: "Accent Mode",
    baseDescription: "Speak in a ridiculous accent for the next three turns.",
    intensity: 1,
  },
  {
    type: "question",
    category: "crazy",
    baseTitle: "Alternate Universe",
    baseDescription: "In a crazy alternate universe, what jobs would we have as a couple?",
    intensity: 1,
  },
  {
    type: "truth",
    category: "crazy",
    baseTitle: "Wild Idea",
    baseDescription: "What is the craziest idea you've had that you never told anyone?",
    intensity: 2,
  },
  {
    type: "challenge",
    category: "crazy",
    baseTitle: "Speed Story",
    baseDescription: "Create a five-sentence story together where each sentence gets more absurd.",
    intensity: 2,
  },
  {
    type: "dare",
    category: "crazy",
    baseTitle: "Face Remix",
    baseDescription: "Let your partner gently rearrange your hair and pose your face, then take a funny photo.",
    intensity: 1,
  },
  {
    type: "question",
    category: "crazy",
    baseTitle: "No Rules Day",
    baseDescription: "If tomorrow was a 'no rules' day for us, what would we do first?",
    intensity: 2,
  },
  {
    type: "truth",
    category: "crazy",
    baseTitle: "Most Spontaneous",
    baseDescription: "What is the most spontaneous thing you have done in your life so far?",
    intensity: 2,
  },

  // ---- ADVENTUROUS ----
  {
    type: "question",
    category: "adventurous",
    baseTitle: "Mini Adventure",
    baseDescription: "What is one small adventure you want us to do in the next seven days?",
    intensity: 2,
  },
  {
    type: "question",
    category: "adventurous",
    baseTitle: "Travel Dreams",
    baseDescription: "Name three places you want to visit with me and why.",
    intensity: 1,
  },
  {
    type: "dare",
    category: "adventurous",
    baseTitle: "Mystery Plan",
    baseDescription: "Quietly plan a tiny surprise for your partner that you will do within 48 hours.",
    intensity: 2,
  },
  {
    type: "truth",
    category: "adventurous",
    baseTitle: "Comfort Zone Edge",
    baseDescription: "What is one thing outside your comfort zone that you would try with me by your side?",
    intensity: 3,
  },
  {
    type: "challenge",
    category: "adventurous",
    baseTitle: "Bucket List Start",
    baseDescription: "Together, list five new activities you want to try as a couple this year.",
    intensity: 2,
  },
  {
    type: "dare",
    category: "adventurous",
    baseTitle: "Route Shuffle",
    baseDescription: "Next time you go out together, take a slightly different route and explore a new corner.",
    intensity: 1,
  },
  {
    type: "truth",
    category: "adventurous",
    baseTitle: "Brave Moment",
    baseDescription: "What is the bravest thing you have done so far, and what did it teach you?",
    intensity: 2,
  },
  {
    type: "truth",
    category: "adventurous",
    baseTitle: "Hidden Adventure Dream",
    baseDescription: "What is one life adventure you secretly dream about but rarely mention?",
    intensity: 3,
  },

  // ---- STRENGTH / EMOTIONAL POWER ----
  {
    type: "truth",
    category: "strength",
    baseTitle: "Personal Challenge",
    baseDescription: "What personal challenge are you currently facing that you haven't talked about much?",
    intensity: 3,
  },
  {
    type: "question",
    category: "strength",
    baseTitle: "Support Mode",
    baseDescription: "How can I support you better when you are stressed or overwhelmed?",
    intensity: 3,
  },
  {
    type: "challenge",
    category: "strength",
    baseTitle: "Honesty Minute",
    baseDescription: "For 60 seconds, both of you share honestly how you're really feeling this week.",
    intensity: 3,
  },
  {
    type: "truth",
    category: "strength",
    baseTitle: "Soft Spot",
    baseDescription: "What is one emotional soft spot you are still learning to protect?",
    intensity: 3,
  },
  {
    type: "question",
    category: "strength",
    baseTitle: "Team Superpower",
    baseDescription: "What do you think is our biggest strength as a team when we face problems?",
    intensity: 2,
  },
  {
    type: "dare",
    category: "strength",
    baseTitle: "Reassurance Drop",
    baseDescription: "Tell your partner three reasons why you believe in them and their future.",
    intensity: 2,
  },
  {
    type: "challenge",
    category: "strength",
    baseTitle: "Problem Solver",
    baseDescription: "Pick one small real-life problem and brainstorm solutions together for two minutes.",
    intensity: 2,
  },
  {
    type: "truth",
    category: "strength",
    baseTitle: "Hard Truth",
    baseDescription: "What truth about relationships took you a long time to accept?",
    intensity: 3,
  },

  // ---- GENERAL / LIFE ----
  {
    type: "question",
    category: "general",
    baseTitle: "Daily Joy",
    baseDescription: "What is one small daily habit that makes you feel good?",
    intensity: 1,
  },
  {
    type: "question",
    category: "general",
    baseTitle: "Childhood Dream",
    baseDescription: "What did you want to be as a child, and how do you feel about that dream now?",
    intensity: 1,
  },
  {
    type: "truth",
    category: "general",
    baseTitle: "Hidden Fear",
    baseDescription: "What is a fear that you don't usually talk about with anyone?",
    intensity: 2,
  },
  {
    type: "dare",
    category: "general",
    baseTitle: "Memory Photo",
    baseDescription: "Pick a photo from your phone and tell the full story behind it.",
    intensity: 1,
  },
  {
    type: "question",
    category: "general",
    baseTitle: "Perfect Lazy Day",
    baseDescription: "Describe your perfect lazy day from morning to night.",
    intensity: 1,
  },
  {
    type: "truth",
    category: "general",
    baseTitle: "Big Goal",
    baseDescription: "What is one big goal you are quietly working toward right now?",
    intensity: 2,
  },
  {
    type: "challenge",
    category: "general",
    baseTitle: "Future You",
    baseDescription: "Describe yourself in five years in one minute, then let your partner do the same.",
    intensity: 2,
  },
  {
    type: "dare",
    category: "general",
    baseTitle: "Positive Ping",
    baseDescription: "Send a short positive message to someone you care about right now.",
    intensity: 1,
  },
  {
    type: "question",
    category: "general",
    baseTitle: "Energy Charge",
    baseDescription: "What gives you energy when you feel low: people, music, food, games, or something else?",
    intensity: 1,
  },
  {
    type: "truth",
    category: "general",
    baseTitle: "One Change",
    baseDescription: "If you could change one small daily habit starting tomorrow, what would it be?",
    intensity: 2,
  },
];

// --------- VARIATIONS (30 TWISTS → 1500 TOTAL CARDS) ---------

interface Variation {
  label: string;
  extraInstruction: string;
}

/**
 * These variations are used to slightly change the title/description
 * so each card feels like a different "mode" or "challenge".
 * 50 base prompts * 30 variations = 1500 curated card variations.
 */
const VARIATIONS: Variation[] = [
  {
    label: "Classic Mode",
    extraInstruction: "Answer or perform it in a relaxed, classic way.",
  },
  {
    label: "Speed Mode",
    extraInstruction: "You have only 15 seconds to respond or start the action.",
  },
  {
    label: "Both Answer",
    extraInstruction: "Both of you must answer or react to this card.",
  },
  {
    label: "Guess First",
    extraInstruction: "Your partner must guess your answer before you reveal it.",
  },
  {
    label: "Whisper Mode",
    extraInstruction: "Answer this in a soft whisper directly to your partner.",
  },
  {
    label: "Eye Contact Only",
    extraInstruction: "Keep eye contact while answering or doing the dare.",
  },
  {
    label: "No Smiling",
    extraInstruction: "Try to do this without smiling; if you smile, repeat it.",
  },
  {
    label: "30-Second Timer",
    extraInstruction: "Set a 30-second timer and finish before it ends.",
  },
  {
    label: "Story Version",
    extraInstruction: "Turn your answer into a short story with a beginning and end.",
  },
  {
    label: "One Word Start",
    extraInstruction: "Begin your answer with a single word, then explain.",
  },
  {
    label: "Role Swap",
    extraInstruction: "Answer as if you were your partner speaking.",
  },
  {
    label: "Future Version",
    extraInstruction: "Answer from the perspective of your future self five years from now.",
  },
  {
    label: "Past Version",
    extraInstruction: "Answer from the perspective of your younger self.",
  },
  {
    label: "Three Options",
    extraInstruction: "Give three possible answers, then choose your favorite.",
  },
  {
    label: "Top 3",
    extraInstruction: "Turn your answer into a 'Top 3 list' instead of just one thing.",
  },
  {
    label: "Phone-Free",
    extraInstruction: "Do this card without touching your phone or any device.",
  },
  {
    label: "Silent Start",
    extraInstruction: "Act out your answer silently for 10 seconds before speaking.",
  },
  {
    label: "Question Back",
    extraInstruction: "After answering, you must ask your partner a related follow-up question.",
  },
  {
    label: "Compliment Add-On",
    extraInstruction: "Add one genuine compliment to your answer.",
  },
  {
    label: "Speed Debate",
    extraInstruction: "If you disagree, have a friendly 30-second mini debate.",
  },
  {
    label: "High Five",
    extraInstruction: "End this card with a high five or fist bump.",
  },
  {
    label: "Gratitude Twist",
    extraInstruction: "Include one thing you are grateful for in your answer.",
  },
  {
    label: "Short & Sweet",
    extraInstruction: "You must keep your answer under three sentences.",
  },
  {
    label: "Deep Dive",
    extraInstruction: "Take your time and give a deeper, more thoughtful answer.",
  },
  {
    label: "Coin Flip",
    extraInstruction: "Flip a coin; if heads, you answer normally; if tails, you must add a small dare for yourself.",
  },
  {
    label: "Note to Self",
    extraInstruction: "Pretend you are giving advice to yourself with this answer.",
  },
  {
    label: "Secret Edition",
    extraInstruction: "Share one extra tiny secret related to this card.",
  },
  {
    label: "Voice Note",
    extraInstruction: "Optionally, record your answer as a short voice note to listen to later.",
  },
  {
    label: "Plan It",
    extraInstruction: "End this card by agreeing on one tiny action you can do in real life.",
  },
  {
    label: "Replay Later",
    extraInstruction: "Mark this card as 'replay later' if it feels important for your relationship.",
  },
];

export const GAME_CARDS: GameCard[] = (() => {
  const result: GameCard[] = [];

  BASE_GAME_PROMPTS.forEach((base, baseIndex) => {
    VARIATIONS.forEach((variation, variationIndex) => {
      const id = `${base.category}-${base.type}-${baseIndex + 1}-${variationIndex + 1}`;

      result.push({
        id,
        type: base.type,
        category: base.category,
        title: `${base.baseTitle} – ${variation.label}`,
        description: `${base.baseDescription} ${variation.extraInstruction}`,
        intensity: base.intensity,
      });
    });
  });

  return result;
})();

// --------- QUIZ QUESTIONS (FOR KNOWLEDGE / BATTLE MODE) ---------

const BASE_QUIZ_QUESTIONS: QuizQuestion[] = [
  // GENERAL KNOWLEDGE
  {
    id: "quiz-gk-1",
    category: "general_knowledge",
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Mars"],
    correctIndex: 1,
    explanation: "Jupiter is the largest planet in our solar system.",
    difficulty: 1,
  },
  {
    id: "quiz-gk-2",
    category: "general_knowledge",
    question: "Which ocean is the deepest on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctIndex: 2,
    explanation: "The Pacific Ocean contains the Mariana Trench, the deepest known point.",
    difficulty: 2,
  },
  {
    id: "quiz-gk-3",
    category: "general_knowledge",
    question: "Which gas do plants primarily use for photosynthesis?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
    correctIndex: 1,
    explanation: "Plants take in carbon dioxide and release oxygen.",
    difficulty: 1,
  },
  {
    id: "quiz-gk-4",
    category: "general_knowledge",
    question: "Which continent has the most countries?",
    options: ["Asia", "Africa", "Europe", "South America"],
    correctIndex: 1,
    explanation: "Africa has the highest number of recognized countries.",
    difficulty: 2,
  },

  // FUN FACTS
  {
    id: "quiz-fun-1",
    category: "fun_facts",
    question: "Which animal is known for having a very good memory?",
    options: ["Elephant", "Goldfish", "Frog", "Penguin"],
    correctIndex: 0,
    explanation: "Elephants are famous for their strong memories.",
    difficulty: 1,
  },
  {
    id: "quiz-fun-2",
    category: "fun_facts",
    question: "Which fruit was historically called a 'love apple' in Europe?",
    options: ["Strawberry", "Tomato", "Cherry", "Peach"],
    correctIndex: 1,
    explanation: "Tomatoes were once called 'love apples' in some regions.",
    difficulty: 2,
  },
  {
    id: "quiz-fun-3",
    category: "fun_facts",
    question: "Which country is famous for inventing modern pizza?",
    options: ["France", "USA", "Italy", "Greece"],
    correctIndex: 2,
    explanation: "Italy, especially Naples, is known for modern pizza.",
    difficulty: 1,
  },
  {
    id: "quiz-fun-4",
    category: "fun_facts",
    question: "What color were many of the first oranges grown in Southeast Asia believed to be?",
    options: ["Green", "Purple", "Blue", "Yellow"],
    correctIndex: 0,
    explanation: "Many original orange varieties were green, not bright orange.",
    difficulty: 2,
  },

  // RELATIONSHIP
  {
    id: "quiz-rel-1",
    category: "relationship",
    question: "Which of these is NOT one of the classic 'love languages'?",
    options: ["Words of affirmation", "Acts of service", "Quality time", "Competition"],
    correctIndex: 3,
    explanation: "Competition is not one of the traditional five love languages.",
    difficulty: 1,
  },
  {
    id: "quiz-rel-2",
    category: "relationship",
    question: "Which habit is usually most helpful for a healthy relationship?",
    options: [
      "Avoiding all conflict",
      "Active listening and honest talks",
      "Ignoring problems and hoping they fade",
      "Always trying to 'win' arguments",
    ],
    correctIndex: 1,
    explanation: "Active listening and honest communication are key.",
    difficulty: 1,
  },
  {
    id: "quiz-rel-3",
    category: "relationship",
    question: "Which is often considered a healthy sign in a couple?",
    options: [
      "Never saying sorry",
      "Being able to apologize and forgive",
      "Keeping feelings secret",
      "Checking each other constantly",
    ],
    correctIndex: 1,
    explanation: "Being able to apologize and forgive shows maturity.",
    difficulty: 1,
  },
  {
    id: "quiz-rel-4",
    category: "relationship",
    question: "Why are regular 'check-in' talks helpful for couples?",
    options: [
      "To collect gossip",
      "To judge each other",
      "To share feelings and align expectations",
      "To avoid all serious topics",
    ],
    correctIndex: 2,
    explanation: "Check-ins help couples stay emotionally aligned.",
    difficulty: 2,
  },

  // POP CULTURE
  {
    id: "quiz-pop-1",
    category: "pop_culture",
    question: "Which streaming platform is known for the series 'Stranger Things'?",
    options: ["Netflix", "Spotify", "Twitch", "Disney+"],
    correctIndex: 0,
    explanation: "Stranger Things is a Netflix original series.",
    difficulty: 1,
  },
  {
    id: "quiz-pop-2",
    category: "pop_culture",
    question: "Which of these is a famous superhero team?",
    options: ["The Explorers", "The Avengers", "The Shadows", "The Travelers"],
    correctIndex: 1,
    explanation: "The Avengers is a popular superhero team.",
    difficulty: 1,
  },
  {
    id: "quiz-pop-3",
    category: "pop_culture",
    question: "Which medium is most associated with 'podcasts'?",
    options: ["Audio", "Painting", "Dance", "Photography"],
    correctIndex: 0,
    explanation: "Podcasts are mainly audio-based shows.",
    difficulty: 1,
  },
  {
    id: "quiz-pop-4",
    category: "pop_culture",
    question: "Which of these is a popular type of social media content?",
    options: ["Short-form video", "Stone carvings", "Paper telegrams", "Fax art"],
    correctIndex: 0,
    explanation: "Short-form videos are very popular today.",
    difficulty: 1,
  },

  // THIS OR THAT (DISCUSSION / PREFERENCE)
  {
    id: "quiz-this-1",
    category: "this_or_that",
    question: "Which would you BOTH pick for a cozy date night?",
    options: ["Movie at home", "Fancy restaurant", "Long walk outside", "Board game night"],
    correctIndex: 0,
    explanation: "There is no single correct answer; use this to talk.",
    difficulty: 1,
  },
  {
    id: "quiz-this-2",
    category: "this_or_that",
    question: "Which type of trip fits you more as a couple?",
    options: ["Beach vacation", "Mountain escape", "City adventure", "Staycation at home"],
    correctIndex: 0,
    explanation: "No strict correct answer; this is a conversation starter.",
    difficulty: 1,
  },

  // SPEED ROUND (OPEN PROMPTS)
  {
    id: "quiz-speed-1",
    category: "speed_round",
    question: "In 10 seconds, name five animals.",
    options: ["Prompt card", "Prompt card", "Prompt card", "Prompt card"],
    correctIndex: 0,
    explanation: "This is a speed challenge, not a scored quiz.",
    difficulty: 1,
  },
  {
    id: "quiz-speed-2",
    category: "speed_round",
    question: "In 10 seconds, say three things you like about your partner.",
    options: ["Prompt card", "Prompt card", "Prompt card", "Prompt card"],
    correctIndex: 0,
    explanation: "Use a timer to make it fun and intense.",
    difficulty: 1,
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = BASE_QUIZ_QUESTIONS;
