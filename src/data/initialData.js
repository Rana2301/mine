import { DEFAULT_QUOTES } from './defaultQuotes';

const BASE = import.meta.env.BASE_URL || '/';
export const resolveAsset = (path) => {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${clean}`;
};

export const INITIAL_SETTINGS = {
  partnerName: "My Dearest Love",
  senderName: "Your Forever Love",
  nickname: "Jaanu / Cutie Pie",
  birthdayDate: "2026-08-26", // Her Birthday Date (Aug 26)
  firstMetDate: "2025-07-30", // July 30, 2025
  anniversaryDate: "2025-07-30", // July 30, 2025 (1+ Year Together)
  firstFriendBirthday: "2025-08-26", // Aug 26, 2025 (1st time celebrated as friends)
  adminPin: "1234",
  musicUrl: "https://www.youtube.com/watch?v=8pUq96pYjXM",
  heroTitle: "Happy 1st Birthday Together, My Forever Love! 🎂💖",
  heroSubtitle: "Exactly 1 year ago on August 26, 2025, I celebrated your birthday as a friend. Today, I hold your hand as the love of my life, celebrating our very 1st birthday together as soulmates.",
  specialLetter: `My Sweet Birthday Queen,\n\nHappy 1st Birthday Together, my love! Today is the most special and emotional day for me.\n\nLooking back at July 30, 2025, when I first saw you in Seminar Hall 3, my whole world shifted. I remember desperately searching for an excuse to talk to you, typing that famous Instagram DM asking for college notes ('me aeni pasethi notes mangela!').\n\nThen came August 26, 2025—the very first time I celebrated your birthday as a friend. I still remember looking at your radiant smile that day and quietly wishing in my heart that one day, I could call you mine.\n\nAnd today, on August 26, 2026, my dream is real. We are celebrating our very 1st official birthday together as a couple, completing 365+ days of laughter, cute fights, 3 AM deep talks, warm hugs, and pure magic.\n\nThank you for choosing me, for loving me, and for making this past year the most beautiful chapter of my life. This is our 1st birthday together, and I promise you a lifetime of holding your hand for every birthday to come. I love you endlessly! ❤️✨`
};

export const INITIAL_MILESTONES = [
  {
    id: "m-1",
    stage: "Chapter 1",
    title: "July 30, 2025: The Spark at Seminar Hall 3 🏛️👀",
    date: "July 30, 2025",
    location: "College Seminar Hall 3",
    tag: "Where It All Began",
    iconName: "Sparkles",
    story: "On July 30, 2025, amidst the crowded seminar hall, my eyes found yours. Out of everyone in college, you were the only one that completely captured my heart. That was day one of the best love story of my life.",
    highlightQuote: "July 30, 2025: The moment destiny brought my soulmate into my life.",
    image: resolveAsset('photos/seminar-hall-3.svg')
  },
  {
    id: "m-2",
    stage: "Chapter 2",
    title: "The Instagram DM: 'Can You Send Notes?' 📱📚",
    date: "August 2025",
    location: "Instagram DMs",
    tag: "The Sweetest Excuse",
    iconName: "MessageSquareHeart",
    story: "I had to find any reason to talk to you! So I opened Instagram and asked: 'Hey, do you have today's college notes?' (Me aeni pasethi notes mangela!). I didn't care about notes at all—I just wanted an excuse to talk to you. And that single conversation sparked the bond we share today!",
    highlightQuote: "Asking for college notes was the smartest decision I ever made.",
    image: resolveAsset('photos/instagram-notes-sketch.svg')
  },
  {
    id: "m-3",
    stage: "Chapter 3",
    title: "August 26, 2025: 1st Birthday Celebrated as Friends 🎂🎈",
    date: "August 26, 2025",
    location: "College Days",
    tag: "1st Birthday as Friends",
    iconName: "HeartHandshake",
    story: "On August 26, 2025, I celebrated your birthday for the very first time as a friend. Seeing your pure happiness and radiant smile that day made me realize how special you were, and I silently wished you would one day be mine.",
    highlightQuote: "August 26, 2025: Celebrating you as a friend, already falling deeply in love.",
    image: resolveAsset('photos/ghibli-birthday-celebration.svg')
  },
  {
    id: "m-4",
    stage: "Chapter 4",
    title: "First Navratri & College Viva Together 🌺📚",
    date: "Autumn 2025",
    location: "Her Place & College",
    tag: "Festivals & Exams in Love",
    iconName: "Sparkles",
    story: "From playing Garba at your place during Navratri to holding hands before our college viva exams, every ordinary day turned into an extraordinary celebration with you by my side.",
    highlightQuote: "Dressed in festive colors and facing college exams together—with you, every moment became unforgettable.",
    image: resolveAsset('photos/ghibli-viva-navratri.svg')
  },
  {
    id: "m-5",
    stage: "Chapter 5",
    title: "August 26, 2026: Our 1st Birthday Together as Lovers 💍🥂",
    date: "August 26, 2026 (Milestone)",
    location: "Together in Love",
    tag: "1st Birthday In Love",
    iconName: "Crown",
    story: "Today marks OUR VERY FIRST BIRTHDAY TOGETHER AS A COUPLE! Exactly 1 year since celebrating as friends, and over 1 year since meeting on July 30, 2025. Today, holding your hand as your boyfriend is the highest blessing in my life.",
    highlightQuote: "From friends celebrating on Aug 26, 2025 to celebrating our 1st birthday together in love today. Happy Birthday, my whole world!",
    image: resolveAsset('photos/first-birthday-together-lovers.svg')
  }
];

export const INITIAL_PHOTOS = [
  {
    id: "p-1",
    title: "In My Phone: Your 1st Photo 📱💖",
    date: "The Precious Beginning",
    tag: "1st Photo Ever",
    caption: "The very first picture of you saved in my phone gallery. I had no idea back then that this girl would become my entire universe and soulmate.",
    quote: "That day, my phone gallery saved a photo; my heart saved an eternity of birthdays with you.",
    imageUrl: resolveAsset('photos/in-my-phone-1st-pic.jpeg'),
    likes: 480
  },
  {
    id: "p-2",
    title: "Garba Night Before Us (Friendship Era) 🪔✨",
    date: "Before Relationship",
    tag: "Friends 1st Garba",
    caption: "Garba celebration together for the first time before we officially started dating. Two friends dancing under the stars, already destined for love.",
    quote: "We were just friends celebrating Garba, but our hearts were already writing the first chapter of our forever.",
    imageUrl: resolveAsset('photos/friend-1st-pic.jpg'),
    likes: 470
  },
  {
    id: "p-3",
    title: "The First Cute Face You Made 🥰📸",
    date: "Unforgettable Expression",
    tag: "1st Cute Face",
    caption: "The first time you showed me that irresistible cute face and I captured it instantly in my gallery forever.",
    quote: "One look at your cutest expression and my whole world paused. Happy 1st Birthday Together, my sweet jaan!",
    imageUrl: resolveAsset('photos/1st-cute-face.jpg'),
    likes: 510
  },
  {
    id: "p-4",
    title: "1st Navratri at Your Place 🌺💃",
    date: "Festive Night",
    tag: "1st Navratri",
    caption: "Playing Garba and celebrating Navratri at your place for the first time. The warmth of your smile was brighter than all the festive lights.",
    quote: "Dressed in festival colors with the rhythm of dhol, but the most sacred blessing I received was you.",
    imageUrl: resolveAsset('photos/1st-navratri.jpg'),
    likes: 430
  },
  {
    id: "p-5",
    title: "First College Viva in Love 📚🎓",
    date: "College Days",
    tag: "1st Viva Together",
    caption: "Our very first college viva exam after officially coming into a relationship. Nervous about the syllabus, but fearless because we held hands.",
    quote: "No matter how tough college viva was, one reassuring smile from you made every exam feel easy.",
    imageUrl: resolveAsset('photos/viva-day.jpeg'),
    likes: 395
  },
  {
    id: "p-6",
    title: "My Gallery's Cutest Treasure 🧸✨",
    date: "Pure Sweetness",
    tag: "Cutest Smile",
    caption: "The cute, candid picture that never fails to melt my heart whenever I look at it during a busy day.",
    quote: "Your cuteness is my daily therapy, my comfort place, and the sweetest reason I smile every morning.",
    imageUrl: resolveAsset('photos/cute.jpeg'),
    likes: 465
  },
  {
    id: "p-7",
    title: "Your All-Time Favorite Picture 👑💕",
    date: "Queen's Choice",
    tag: "Her Favorite",
    caption: "The photo you love the most, looking like pure royalty. Radiant, graceful, and stunningly beautiful in every single pixel.",
    quote: "You love this picture, but what I love is the angelic soul smiling right back at me. Happy 1st Birthday Together, my queen!",
    imageUrl: resolveAsset('photos/your-fav-one.jpeg'),
    likes: 540
  },
  {
    id: "p-8",
    title: "My Absolute Favorite Picture ❤️💫",
    date: "Boyfriend's Choice",
    tag: "My Favorite",
    caption: "If I had to choose one picture to keep in my wallet for the rest of my life, this is the one. Pure magic and endless love.",
    quote: "Out of billions of faces in the world, this single frame holds my entire heart, peace, and forever.",
    imageUrl: resolveAsset('photos/my-fav-one.jpeg'),
    likes: 620
  },
  {
    id: "p-9",
    title: "Made For Each Other (1 Year & Forever) 💍🥂",
    date: "Aug 26 Milestone",
    tag: "Together Each Other",
    caption: "Looking at this photo, anyone can see we are truly made for each other. 365+ days completed and an eternity of birthdays still to come.",
    quote: "Looking at us, I don't just see a picture; I see proof that destiny made us soulmates. Happy 1st Birthday Together, my whole world! 💖",
    imageUrl: resolveAsset('photos/together-each-other.jpg'),
    likes: 680
  }
];

export const INITIAL_LETTERS = [
  {
    id: "let-1",
    title: "Our 1st Birthday Together Morning 🌅🎂",
    badge: "1st Birthday Special",
    icon: "Sun",
    preview: "Wake up, my Birthday Queen! Celebrating our first birthday together in love...",
    content: "Good morning, my sweet birthday girl! Today is historic for us. Exactly 1 year ago on August 26, 2025, I celebrated your birthday as a friend. Today, I wake up holding your hand as the love of my life, celebrating our VERY FIRST BIRTHDAY TOGETHER IN LOVE! Happy Birthday, my whole universe! 💖"
  },
  {
    id: "let-2",
    title: "Open When You Miss Me 🥺💌",
    badge: "Whenever You Need Me",
    icon: "Heart",
    preview: "For the moments when miles or hours feel too long...",
    content: "Whenever you feel alone or miss me, close your eyes and place your hand over your heart. Hear that steady beat? That's me, holding you close from wherever I am. You are never alone because you carry my heart with you everywhere. Just one text away, always."
  },
  {
    id: "let-3",
    title: "Remembering July 30, 2025 🏛️✨",
    badge: "Seminar Hall 3 Memory",
    icon: "Sparkles",
    preview: "A reminder of July 30, 2025 and how asking for notes changed everything...",
    content: "Do you remember July 30, 2025 in Seminar Hall 3? And that Instagram DM where I asked you for college notes? (Me aeni pasethi notes mangela!). I was so nervous typing that message, but it turned out to be the best decision of my entire life. Look at us now celebrating our 1st birthday together!"
  },
  {
    id: "let-4",
    title: "Open for Our 1st Birthday Milestone 🥂💍",
    badge: "1st Birthday Together",
    icon: "Flame",
    preview: "Reflecting on 365+ days from friends on Aug 26, 2025 to soulmates today...",
    content: "Can you believe it's our first official birthday together as a couple? Looking back at our 365+ days journey, every laugh, every late night chat, and every hug has been the greatest gift. Happy 1st Birthday Together, my soulmate. Here's to a lifetime of birthdays together!"
  }
];

export const REASONS_I_LOVE_YOU = [
  "How you smiled at me on July 30, 2025 when we first met in Seminar Hall 3.",
  "How you kindly sent me college notes on Instagram even when I was obviously just looking for an excuse to talk to you!",
  "Remembering August 26, 2025 when we celebrated your birthday as friends for the first time.",
  "Because today, on August 26, 2026, we are celebrating our VERY FIRST BIRTHDAY TOGETHER as a couple!",
  "Your sweet, infectious laugh that cures all my stress instantly.",
  "How caring, patient, and deeply considerate you are with my heart.",
  "The way you look at me across a room and make me feel like the luckiest person alive.",
  "How cute you look when you're sleepy or excitedly explaining your thoughts.",
  "Our 3 AM late night deep talks about our future, dreams, and life.",
  "Because over this 1 year, you became my dream girl, my best friend, and my forever soulmate."
];
