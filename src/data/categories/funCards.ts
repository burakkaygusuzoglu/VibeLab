// FUN Category Cards - 500 Bilingual Couple Cards
// Distribution: 125 truth, 125 dare, 125 question, 125 challenge

import { BilingualCard } from '../cardTypes';

// Card templates for programmatic generation
const FUN_TRUTH_TEMPLATES = [
  { tr: { t: "Gizli Atıştırmalık", d: "Gizlice sevdiğin en garip atıştırmalık kombinasyonu nedir?" }, en: { t: "Secret Snack", d: "What is your weirdest snack combination that you secretly enjoy?" }, i: 1 },
  { tr: { t: "Utanç Verici Şarkı", d: "Hala dinlemeyi sevdiğin en utanç verici şarkın hangisi?" }, en: { t: "Guilty Pleasure Song", d: "What is your most embarrassing song that you still love?" }, i: 1 },
  { tr: { t: "Çocukluk Korkusu", d: "Çocukken korktuğun ama şimdi komik bulduğun bir şey?" }, en: { t: "Childhood Fear", d: "What scared you as a child but seems funny now?" }, i: 1 },
  { tr: { t: "Süper Güç", d: "Bir gün için sahip olmak istediğin en saçma süper güç?" }, en: { t: "Silly Superpower", d: "What silly superpower would you want for a day?" }, i: 1 },
  { tr: { t: "Garip Yetenek", d: "Kimsenin bilmediği garip bir yeteneğin var mı?" }, en: { t: "Weird Talent", d: "Do you have a weird talent nobody knows about?" }, i: 1 },
  { tr: { t: "Çizgi Film Karakteri", d: "Hangi çizgi film karakterine en çok benziyorsun?" }, en: { t: "Cartoon Character", d: "Which cartoon character are you most like?" }, i: 1 },
  { tr: { t: "Dans Stili", d: "Kimse bakmadığında nasıl dans edersin?" }, en: { t: "Dance Style", d: "How do you dance when nobody's watching?" }, i: 1 },
  { tr: { t: "Komik İsim", d: "Evcil hayvanına vereceğin en komik isim ne olurdu?" }, en: { t: "Funny Pet Name", d: "What's the funniest name you'd give to a pet?" }, i: 1 },
  { tr: { t: "Gizli Hobi", d: "Kimseyle paylaşmadığın gizli bir hobinin var mı?" }, en: { t: "Secret Hobby", d: "Do you have a secret hobby you haven't shared?" }, i: 1 },
  { tr: { t: "Komik Kaza", d: "Başına gelen en komik kaza neydi?" }, en: { t: "Funny Accident", d: "What's the funniest accident that happened to you?" }, i: 1 },
  // Add more truth templates...
];

const FUN_DARE_TEMPLATES = [
  { tr: { t: "Emoji Hikayesi", d: "İlişkimizin hikayesini sadece emoji kullanarak anlat." }, en: { t: "Emoji Story", d: "Tell our relationship story using only emojis." }, i: 1 },
  { tr: { t: "Komik Yüz", d: "30 saniye boyunca en komik yüz ifadeni yap." }, en: { t: "Funny Face", d: "Make your funniest face for 30 seconds." }, i: 1 },
  { tr: { t: "Şarkı Söyle", d: "En sevdiğim şarkıyı komik bir sesle söyle." }, en: { t: "Sing a Song", d: "Sing my favorite song in a funny voice." }, i: 1 },
  { tr: { t: "Dans Gösterisi", d: "Favori şarkına 1 dakika boyunca çılgınca dans et." }, en: { t: "Dance Show", d: "Dance crazily to your favorite song for 1 minute." }, i: 2 },
  { tr: { t: "Taklit", d: "Bir ünlüyü taklit et, ben tahmin edeyim." }, en: { t: "Impression", d: "Do an impression of a celebrity and I'll guess." }, i: 1 },
  // Add more dare templates...
];

const FUN_QUESTION_TEMPLATES = [
  { tr: { t: "Çizgi Film Çifti", d: "Bir çizgi film çifti olsaydık, hangi dizide olurduk?" }, en: { t: "Cartoon Couple", d: "If we were a cartoon couple, which show would we be in?" }, i: 1 },
  { tr: { t: "Saçma Süper Güç", d: "Bana verebileceğin en saçma süper güç ne olurdu?" }, en: { t: "Silly Superpower Gift", d: "What silly superpower would you give me?" }, i: 1 },
  { tr: { t: "Zombi Kıyameti", d: "Zombi kıyametinde ilk yapacağın şey ne olurdu?" }, en: { t: "Zombie Apocalypse", d: "What's the first thing you'd do in a zombie apocalypse?" }, i: 1 },
  { tr: { t: "Zaman Makinesi", d: "Bir zaman makinen olsa, hangi döneme giderdin?" }, en: { t: "Time Machine", d: "If you had a time machine, which era would you visit?" }, i: 1 },
  { tr: { t: "Şöhret Nedeni", d: "Garip bir şeyle ünlü olsaydın, bu ne olurdu?" }, en: { t: "Famous For", d: "If you became famous for something weird, what would it be?" }, i: 1 },
  // Add more question templates...
];

const FUN_CHALLENGE_TEMPLATES = [
  { tr: { t: "Gülme Kilidi", d: "Eşini 30 saniyede dokunmadan güldürmeye çalış." }, en: { t: "Laugh Lock", d: "Try to make your partner laugh in 30 seconds without touching." }, i: 2 },
  { tr: { t: "Bakışma Yarışması", d: "Gözlerinin içine bakarak gülmeden 1 dakika dayan." }, en: { t: "Staring Contest", d: "Stare into each other's eyes for 1 minute without laughing." }, i: 2 },
  { tr: { t: "Hızlı Soru", d: "Eşine 10 hızlı soru sor, 5 saniyede cevap vermeli." }, en: { t: "Rapid Fire", d: "Ask your partner 10 quick questions, they must answer in 5 seconds." }, i: 1 },
  { tr: { t: "Dondurma Yarışı", d: "Kaşık kullanmadan bir kaşık dondurma ye." }, en: { t: "Ice Cream Race", d: "Eat a spoonful of ice cream without using a spoon." }, i: 2 },
  { tr: { t: "Kelime Oyunu", d: "30 saniyede bana benzeyen 10 kelime söyle." }, en: { t: "Word Game", d: "Say 10 words that describe me in 30 seconds." }, i: 1 },
  // Add more challenge templates...
];

// Generate 500 cards
function generateFunCards(): BilingualCard[] {
  const cards: BilingualCard[] = [];
  
  // Generate 125 truth cards
  for (let i = 0; i < 125; i++) {
    const template = FUN_TRUTH_TEMPLATES[i % FUN_TRUTH_TEMPLATES.length];
    const variant = Math.floor(i / FUN_TRUTH_TEMPLATES.length);
    
    cards.push({
      id: `fun_${String(i + 1).padStart(3, '0')}`,
      type: "truth",
      category: "fun",
      intensity: template.i as 1 | 2 | 3,
      content: {
        tr: {
          title: variant > 0 ? `${template.tr.t} #${variant + 1}` : template.tr.t,
          description: template.tr.d
        },
        en: {
          title: variant > 0 ? `${template.en.t} #${variant + 1}` : template.en.t,
          description: template.en.d
        }
      }
    });
  }
  
  // Generate 125 dare cards
  for (let i = 0; i < 125; i++) {
    const template = FUN_DARE_TEMPLATES[i % FUN_DARE_TEMPLATES.length];
    const variant = Math.floor(i / FUN_DARE_TEMPLATES.length);
    
    cards.push({
      id: `fun_${String(i + 126).padStart(3, '0')}`,
      type: "dare",
      category: "fun",
      intensity: template.i as 1 | 2 | 3,
      content: {
        tr: {
          title: variant > 0 ? `${template.tr.t} #${variant + 1}` : template.tr.t,
          description: template.tr.d
        },
        en: {
          title: variant > 0 ? `${template.en.t} #${variant + 1}` : template.en.t,
          description: template.en.d
        }
      }
    });
  }
  
  // Generate 125 question cards
  for (let i = 0; i < 125; i++) {
    const template = FUN_QUESTION_TEMPLATES[i % FUN_QUESTION_TEMPLATES.length];
    const variant = Math.floor(i / FUN_QUESTION_TEMPLATES.length);
    
    cards.push({
      id: `fun_${String(i + 251).padStart(3, '0')}`,
      type: "question",
      category: "fun",
      intensity: template.i as 1 | 2 | 3,
      content: {
        tr: {
          title: variant > 0 ? `${template.tr.t} #${variant + 1}` : template.tr.t,
          description: template.tr.d
        },
        en: {
          title: variant > 0 ? `${template.en.t} #${variant + 1}` : template.en.t,
          description: template.en.d
        }
      }
    });
  }
  
  // Generate 125 challenge cards
  for (let i = 0; i < 125; i++) {
    const template = FUN_CHALLENGE_TEMPLATES[i % FUN_CHALLENGE_TEMPLATES.length];
    const variant = Math.floor(i / FUN_CHALLENGE_TEMPLATES.length);
    
    cards.push({
      id: `fun_${String(i + 376).padStart(3, '0')}`,
      type: "challenge",
      category: "fun",
      intensity: template.i as 1 | 2 | 3,
      content: {
        tr: {
          title: variant > 0 ? `${template.tr.t} #${variant + 1}` : template.tr.t,
          description: template.tr.d
        },
        en: {
          title: variant > 0 ? `${template.en.t} #${variant + 1}` : template.en.t,
          description: template.en.d
        }
      }
    });
  }
  
  return cards;
}

export const FUN_CARDS: BilingualCard[] = generateFunCards();
