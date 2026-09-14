import { Chapter, Milestone, RoommateMemory, RoommateAward, PersonalConfig } from '../types';

export const CAKE_BADGE_IMG = "https://lh3.googleusercontent.com/aida/AEtjO1X1Z6Xv0OWtnGgB0DVKlzytb5287rWgO9_HIK5qXxoZQaHRkisNDTS9vr8ACfsyvBYDb1C6K9ElstisHUg_1ciKhbaMC6lSUjjRLZ3HTl2LkaCwpdtMDYYn781Z_i-ra5On9Sy0mpax8q9wGexCGaHPHj1VLWEZ6R_r4xYjXzOT90nf6u1LjLkEEymrIcMienbq8tXsxXaBmuohU5AE32mKM2118CUE0BQ8-w6YmpuK8LAyPNA36MJdHBc";

export const DEFAULT_PERSONAL_CONFIG: PersonalConfig = {
  roommateName: "Alex",
  yourName: "Dipak",
  dormNumber: "Room 304",
  collegeOrCity: "Campus Dorms",
  birthdayDate: "September 14"
};

export const CHAPTERS: Chapter[] = [
  { id: 'welcome', number: '01', title: 'Welcome 🎂', icon: 'cake', path: 'welcome' },
  { id: 'message', number: '02', title: 'Message 💌', icon: 'mail', path: 'message' },
  { id: 'memories', number: '03', title: 'Memories 📸', icon: 'photo_library', path: 'memories' },
  { id: 'roommate', number: '04', title: 'Roommate 😂', icon: 'sentiment_very_satisfied', path: 'roommate' },
  { id: 'journey', number: '05', title: 'Journey 🛣️', icon: 'explore', path: 'journey', badge: 'Ch 05' },
  { id: 'mini-game', number: '06', title: 'Mini Game 🎮', icon: 'sports_esports', path: 'mini-game' },
  { id: 'big-surprise', number: '07', title: 'Big Surprise 🎁', icon: 'featured_seasonal_and_gifts', path: 'big-surprise' },
  { id: 'final-wishes', number: '08', title: 'Final Wishes 🌟', icon: 'auto_awesome', path: 'final-wishes' },
];

export const JOURNEY_MILESTONES: Milestone[] = [
  {
    id: 'day-1',
    dayLabel: 'DAY 1',
    title: 'First Meeting',
    emoji: '🎒',
    description: 'Awkward hellos, unpacking suitcases, wondering who gets which bed.',
    icon: 'hotel',
    color: '#a855f7',
    expandedDetails: 'We stared at each other for 3 minutes before asking "So... which desk do you want?". Fast forward a few months and we basically shared everything down to our favorite hoodies and snack stashes.',
    photoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'week-1',
    dayLabel: 'WEEK 1',
    title: 'Became Official Roommates',
    emoji: '🔑',
    description: 'Setting ground rules we broke within 48 hours.',
    icon: 'key',
    color: '#edc157',
    expandedDetails: '"Rule 1: Lights out by 11 PM." Rule broken on Tuesday night when we ended up binge-watching shows and discussing the multiverse till 4:30 AM.',
    photoUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'month-1',
    dayLabel: 'MONTH 1',
    title: 'First Hostel Memories',
    emoji: '🍲',
    description: 'The inaugural burnt kettle noodles and contraband snacks.',
    icon: 'ramen_dining',
    color: '#ff7597',
    expandedDetails: 'Attempting to boil eggs in an electric kettle without tripping the dorm circuit breaker was our first real engineering victory.',
    photoUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'month-3',
    dayLabel: 'MONTH 3',
    title: 'Late Night Conversations',
    emoji: '🌙',
    description: 'The first 3 AM talk about life, relationships, and the cosmos.',
    icon: 'bedtime',
    color: '#93c5fd',
    expandedDetails: 'From career anxieties and heartbreak to ridiculous hypotheticals like "could we survive a zombie apocalypse in the cafeteria?", those talks built a lifelong friendship.',
    photoUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'mid-year',
    dayLabel: 'MID YEAR',
    title: 'Crazy Random Moments',
    emoji: '😂',
    description: 'Unplanned midnight bike rides and laughing until we cried.',
    icon: 'sentiment_very_satisfied',
    color: '#34d399',
    expandedDetails: 'Heading out into the freezing night at 1:45 AM just to get ice cream, getting caught in rain, and returning soaking wet but happier than ever.',
    photoUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'finals-week',
    dayLabel: 'FINALS WEEK',
    title: 'Survived Exams Together',
    emoji: '📚',
    description: 'Surviving on caffeine and prayers during finals week.',
    icon: 'menu_book',
    color: '#f43f5e',
    expandedDetails: 'High-fives after submitting assignments at 11:59 PM with 14 seconds to spare. You quizzes me on flashcards while pacing around the room with instant coffee.',
    photoUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ongoing',
    dayLabel: 'ONGOING',
    title: 'Too Many Memories',
    emoji: '📸',
    description: 'Our inside jokes multiplying into our own language.',
    icon: 'photo_camera',
    color: '#a78bfa',
    expandedDetails: 'Nobody else on campus understands half the words or references we use. That is true roommate synergy.',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJeCZGVqrK5SM9IfGRELAytQwUzmOxl7xcnb-xJjnSWPfFuP3y5fPB723Y4eWR0DPa2xW1x-HHnp46klZzLWfRLbwR9FSf_nJ_24ndZpTyLKRBClbx0V6nXvidVcWbIfi8u6j2F7Ihen5a_rgLFdG_d1IqqK-r4BU1e8iogwMQ706MciXA7ZPG2MzI5ETjQATOn_l7qDyKPETUw1GrwK5N9K_kPZk4VWkM0NOUefDKjuCKEtJV4ML6'
  },
  {
    id: 'today',
    dayLabel: 'SPECIAL DAY',
    title: 'Today — Your Birthday!',
    emoji: '🎂',
    description: 'Celebrating the amazing human you are today.',
    icon: 'cake',
    color: '#ff7597',
    hasSpecialCard: true,
    photoUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop'
  }
];

export const ROOMMATE_MEMORIES: RoommateMemory[] = [
  {
    id: 'mem-1',
    title: 'Archive: 700+ Hours of Midnight Shenanigans',
    subtitle: 'Dorm Room 304 • Midnight Pizza Session',
    caption: 'When we ordered a large pepperoni pizza at 1:30 AM after failing to cook instant noodles. The best memories are never planned.',
    date: 'Oct 14',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJeCZGVqrK5SM9IfGRELAytQwUzmOxl7xcnb-xJjnSWPfFuP3y5fPB723Y4eWR0DPa2xW1x-HHnp46klZzLWfRLbwR9FSf_nJ_24ndZpTyLKRBClbx0V6nXvidVcWbIfi8u6j2F7Ihen5a_rgLFdG_d1IqqK-r4BU1e8iogwMQ706MciXA7ZPG2MzI5ETjQATOn_l7qDyKPETUw1GrwK5N9K_kPZk4VWkM0NOUefDKjuCKEtJV4ML6',
    tags: ['Pizza', 'Laughs', 'Hostel Life'],
    likes: 128
  },
  {
    id: 'mem-2',
    title: 'Cramming Before Finals',
    subtitle: 'Library Basement • 4:15 AM',
    caption: 'High on red bull, surrounded by 40 opened chrome tabs, promising each other we would study earlier next semester (we did not).',
    date: 'Dec 08',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    tags: ['Exams', 'Caffeine', 'Survival'],
    likes: 94
  },
  {
    id: 'mem-3',
    title: 'Spontaneous Weekend Getaway',
    subtitle: 'Highway Overpass • Sunset',
    caption: 'Packed a single backpack each on Friday afternoon with zero hotel reservations. Ended up finding the greatest diner in history.',
    date: 'Mar 22',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
    tags: ['Roadtrip', 'Sunset', 'Freedom'],
    likes: 156
  },
  {
    id: 'mem-4',
    title: 'The Great Dorm Room Makeover',
    subtitle: 'Room 304 • String Light Installation',
    caption: 'Spent 4 hours taping fairy lights in the exact geometric pattern, only for them to fall down 2 days later. We kept them anyway.',
    date: 'Nov 02',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop',
    tags: ['Fairy Lights', 'Aesthetic', 'Cozy'],
    likes: 112
  }
];

export const ROOMMATE_AWARDS: RoommateAward[] = [
  {
    id: 'award-1',
    title: 'Master of Snoozing 5 Alarms',
    category: 'Daily Routine',
    description: 'Capable of turning off high-decibel nuclear alarm sounds without opening a single eyelid.',
    icon: 'alarm_off',
    badge: '🏆 Golden Snooze',
    funStat: 'Avg 5.4 alarms/day'
  },
  {
    id: 'award-2',
    title: '3 AM Gourmet Chef',
    category: 'Culinary Mastery',
    description: 'Transforming cold leftover rice and chili oil into a 5-star Michelin midnight experience.',
    icon: 'skillet',
    badge: '🍳 Midnight Chef',
    funStat: '240+ Maggi bowls crafted'
  },
  {
    id: 'award-3',
    title: 'Chief Life Counselor',
    category: 'Wisdom & Empathy',
    description: 'Always listening when life gets overwhelming, with the best advice and warmest perspective.',
    icon: 'psychology',
    badge: '🧠 Zen Master',
    funStat: '100% Problem resolution'
  },
  {
    id: 'award-4',
    title: 'Aux Cord Monarch',
    category: 'Vibe Curator',
    description: 'Possessing a supernatural ability to pick the exact song needed to cure post-exam depression.',
    icon: 'headphones',
    badge: '🎵 Sonic Wizard',
    funStat: '12,000+ mins shared audio'
  }
];

export const SYNERGY_QUESTIONS = [
  {
    question: "When an alarm rings at 7:00 AM, what is the most likely reaction?",
    options: [
      "Wake up immediately and start meditating",
      "Hit snooze 4 times and wake up at 8:45 in panic",
      "Throw a pillow at the phone",
      "Pretend not to hear it and pull the blanket higher"
    ],
    correct: 1,
    commentary: "Spot on! That 8:45 AM mad sprint to class is legendary."
  },
  {
    question: "What is our undisputed emergency midnight comfort food?",
    options: [
      "Instant ramen / 2-minute kettle noodles",
      "Cold plain bread",
      "Vegetable salad with vinaigrette",
      "Fancy 5-course steak dinner"
    ],
    correct: 0,
    commentary: "Kettle noodles hold our entire academic career together!"
  },
  {
    question: "If we start talking about the universe at midnight, what time does the conversation end?",
    options: [
      "12:15 AM sharp",
      "Around 1:00 AM",
      "3:45 AM with existential revelations",
      "We never stopped talking"
    ],
    correct: 2,
    commentary: "Every single time! 3 AM is the official roommate philosophical hour."
  },
  {
    question: "What turns an assigned random dorm room into a true home?",
    options: [
      "Expensive designer furniture",
      "An awesome roommate who becomes a brother for life",
      "Strict cleaning schedules",
      "Air freshener"
    ],
    correct: 1,
    commentary: "100% Synergy! You made this place feel like home."
  }
];
