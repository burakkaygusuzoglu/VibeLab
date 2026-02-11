// ROMANTIC Category Cards - 500 Bilingual Couple Cards
// Distribution: 125 truth, 125 dare, 125 question, 125 challenge

import { BilingualCard } from '../cardTypes';

const ROMANTIC_TRUTH_TEMPLATES = [
  { tr: { t: "İlk İzlenim", d: "Beni ilk gördüğünde ne düşündün?" }, en: { t: "First Impression", d: "What did you think when you first saw me?" }, i: 2 },
  { tr: { t: "Aşık Olma Anı", d: "Bana aşık olduğunu ilk ne zaman anladın?" }, en: { t: "Falling in Love", d: "When did you first realize you were falling for me?" }, i: 2 },
  { tr: { t: "En Romantik An", d: "Birlikte yaşadığımız en romantik an neydi?" }, en: { t: "Most Romantic Moment", d: "What was our most romantic moment together?" }, i: 2 },
  { tr: { t: "Sevdiğim Özellik", d: "Bendeki en çok sevdiğin fiziksel özellik nedir?" }, en: { t: "Favorite Feature", d: "What's your favorite physical feature about me?" }, i: 2 },
  { tr: { t: "Aşk Şarkısı", d: "Beni düşündüğünde aklına gelen şarkı hangisi?" }, en: { t: "Love Song", d: "What song reminds you of me?" }, i: 2 },
  { tr: { t: "Hayalindeki Randevu", d: "Benimle hayalindeki randevu nasıl olurdu?" }, en: { t: "Dream Date", d: "What would your dream date with me be like?" }, i: 2 },
  { tr: { t: "Özel Anlar", d: "Birlikte yaşadığımız en özel an hangisiydi?" }, en: { t: "Special Moments", d: "What was the most special moment we shared?" }, i: 3 },
  { tr: { t: "Geleceğimiz", d: "5 yıl sonra bizi nasıl hayal ediyorsun?" }, en: { t: "Our Future", d: "How do you imagine us 5 years from now?" }, i: 3 },
  { tr: { t: "Seni Mutlu Eden", d: "Yaptığım hangi küçük şey seni en çok mutlu ediyor?" }, en: { t: "Makes You Happy", d: "What little thing I do makes you the happiest?" }, i: 2 },
  { tr: { t: "İlk Öpücük", d: "İlk öpücüğümüzü hatırlıyor musun? Nasıl hissettirdi?" }, en: { t: "First Kiss", d: "Do you remember our first kiss? How did it feel?" }, i: 2 },
];

const ROMANTIC_DARE_TEMPLATES = [
  { tr: { t: "Aşk Mektubu", d: "Bana kısa bir aşk mektubu yaz ve oku." }, en: { t: "Love Letter", d: "Write me a short love letter and read it aloud." }, i: 2 },
  { tr: { t: "Yavaş Dans", d: "En sevdiğim şarkıyla benimle yavaş dans et." }, en: { t: "Slow Dance", d: "Slow dance with me to my favorite song." }, i: 2 },
  { tr: { t: "Şiir Oku", d: "Bana özel bir şiir yaz ve oku." }, en: { t: "Read Poetry", d: "Write and read a poem dedicated to me." }, i: 2 },
  { tr: { t: "Tatlı Mesaj", d: "Bana şu an telefonundan çok tatlı bir mesaj gönder." }, en: { t: "Sweet Message", d: "Send me a very sweet message from your phone right now." }, i: 1 },
  { tr: { t: "Gözlerime Bak", d: "Gözlerimin içine bakarak neden seni sevdiğimi söyle." }, en: { t: "Eye Contact", d: "Look into my eyes and tell me why you love me." }, i: 3 },
  { tr: { t: "Sürpriz Öpücük", d: "Beklemediğim bir anda bana sürpriz bir öpücük ver." }, en: { t: "Surprise Kiss", d: "Give me a surprise kiss when I least expect it." }, i: 2 },
  { tr: { t: "Romantik Söz", d: "Bana en romantik sözünü söyle." }, en: { t: "Romantic Words", d: "Tell me the most romantic thing you can think of." }, i: 2 },
  { tr: { t: "Güzel Anı", d: "Birlikte yaşadığımız en güzel anıyı anlat." }, en: { t: "Beautiful Memory", d: "Tell me about our most beautiful memory together." }, i: 2 },
];

const ROMANTIC_QUESTION_TEMPLATES = [
  { tr: { t: "Rüya Tatil", d: "Benimle gitmek istediğin rüya tatil yeri neresi?" }, en: { t: "Dream Vacation", d: "Where's your dream vacation destination with me?" }, i: 2 },
  { tr: { t: "Mükemmel Gün", d: "Benimle geçireceğin mükemmel bir gün nasıl olurdu?" }, en: { t: "Perfect Day", d: "What would a perfect day with me look like?" }, i: 2 },
  { tr: { t: "Aşk Dili", d: "Sana olan sevgimi en iyi nasıl gösterebilirim?" }, en: { t: "Love Language", d: "How can I best show my love for you?" }, i: 2 },
  { tr: { t: "Özel Şarkı", d: "Bizim özel şarkımız olsaydı, hangisi olurdu?" }, en: { t: "Our Song", d: "If we had a special song, what would it be?" }, i: 2 },
  { tr: { t: "Gelecek Hayaller", d: "Gelecekte birlikte neler yapmak istersin?" }, en: { t: "Future Dreams", d: "What do you want to do together in the future?" }, i: 2 },
  { tr: { t: "Romantik Hareket", d: "Yaptığım en romantik hareket neydi?" }, en: { t: "Romantic Gesture", d: "What's the most romantic thing I've done?" }, i: 2 },
  { tr: { t: "Aşk Tarifleme", d: "Aşkı nasıl tanımlarsın?" }, en: { t: "Define Love", d: "How would you define love?" }, i: 3 },
];

const ROMANTIC_CHALLENGE_TEMPLATES = [
  { tr: { t: "30 Saniye Bakışma", d: "30 saniye durmadan gözlerine bakacağım, gülmemeye çalış." }, en: { t: "30 Second Stare", d: "I'll stare into your eyes for 30 seconds, try not to smile." }, i: 2 },
  { tr: { t: "Övgü Yarışması", d: "Sırayla birbirinizi övün, kim daha romantik?" }, en: { t: "Compliment Battle", d: "Take turns complimenting each other, who's more romantic?" }, i: 2 },
  { tr: { t: "Aşk Hikayesi", d: "İlişkinizin hikayesini 1 dakikada anlatın." }, en: { t: "Love Story", d: "Tell the story of your relationship in 1 minute." }, i: 2 },
  { tr: { t: "Kalp Atışı", d: "Elini kalbimin üstüne koy, hissettiklerini anlat." }, en: { t: "Heartbeat", d: "Put your hand on my heart and tell me what you feel." }, i: 3 },
  { tr: { t: "Fısıldama", d: "Kulağıma en sevdiğin şeyleri fısılda." }, en: { t: "Whisper", d: "Whisper your favorite things about me in my ear." }, i: 2 },
];

function generateRomanticCards(): BilingualCard[] {
  const cards: BilingualCard[] = [];
  
  for (let i = 0; i < 125; i++) {
    const template = ROMANTIC_TRUTH_TEMPLATES[i % ROMANTIC_TRUTH_TEMPLATES.length];
    const variant = Math.floor(i / ROMANTIC_TRUTH_TEMPLATES.length);
    cards.push({
      id: `romantic_${String(i + 1).padStart(3, '0')}`,
      type: "truth",
      category: "romantic",
      intensity: template.i as 1 | 2 | 3,
      content: {
        tr: { title: variant > 0 ? `${template.tr.t} #${variant + 1}` : template.tr.t, description: template.tr.d },
        en: { title: variant > 0 ? `${template.en.t} #${variant + 1}` : template.en.t, description: template.en.d }
      }
    });
  }
  
  for (let i = 0; i < 125; i++) {
    const template = ROMANTIC_DARE_TEMPLATES[i % ROMANTIC_DARE_TEMPLATES.length];
    const variant = Math.floor(i / ROMANTIC_DARE_TEMPLATES.length);
    cards.push({
      id: `romantic_${String(i + 126).padStart(3, '0')}`,
      type: "dare",
      category: "romantic",
      intensity: template.i as 1 | 2 | 3,
      content: {
        tr: { title: variant > 0 ? `${template.tr.t} #${variant + 1}` : template.tr.t, description: template.tr.d },
        en: { title: variant > 0 ? `${template.en.t} #${variant + 1}` : template.en.t, description: template.en.d }
      }
    });
  }
  
  for (let i = 0; i < 125; i++) {
    const template = ROMANTIC_QUESTION_TEMPLATES[i % ROMANTIC_QUESTION_TEMPLATES.length];
    const variant = Math.floor(i / ROMANTIC_QUESTION_TEMPLATES.length);
    cards.push({
      id: `romantic_${String(i + 251).padStart(3, '0')}`,
      type: "question",
      category: "romantic",
      intensity: template.i as 1 | 2 | 3,
      content: {
        tr: { title: variant > 0 ? `${template.tr.t} #${variant + 1}` : template.tr.t, description: template.tr.d },
        en: { title: variant > 0 ? `${template.en.t} #${variant + 1}` : template.en.t, description: template.en.d }
      }
    });
  }
  
  for (let i = 0; i < 125; i++) {
    const template = ROMANTIC_CHALLENGE_TEMPLATES[i % ROMANTIC_CHALLENGE_TEMPLATES.length];
    const variant = Math.floor(i / ROMANTIC_CHALLENGE_TEMPLATES.length);
    cards.push({
      id: `romantic_${String(i + 376).padStart(3, '0')}`,
      type: "challenge",
      category: "romantic",
      intensity: template.i as 1 | 2 | 3,
      content: {
        tr: { title: variant > 0 ? `${template.tr.t} #${variant + 1}` : template.tr.t, description: template.tr.d },
        en: { title: variant > 0 ? `${template.en.t} #${variant + 1}` : template.en.t, description: template.en.d }
      }
    });
  }
  
  return cards;
}

export const ROMANTIC_CARDS: BilingualCard[] = generateRomanticCards();
