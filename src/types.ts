export type ChapterId = 
  | 'welcome'
  | 'message'
  | 'memories'
  | 'roommate'
  | 'journey'
  | 'mini-game'
  | 'big-surprise'
  | 'final-wishes';

export interface Chapter {
  id: ChapterId;
  number: string;
  title: string;
  icon: string;
  path: string;
  badge?: string;
}

export interface Milestone {
  id: string;
  dayLabel: string;
  title: string;
  emoji: string;
  description: string;
  icon: string;
  color: string;
  expandedDetails?: string;
  photoUrl?: string;
  hasSpecialCard?: boolean;
}

export interface RoommateMemory {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  date: string;
  image: string;
  tags: string[];
  likes: number;
}

export interface RoommateAward {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  badge: string;
  funStat: string;
}

export interface PersonalConfig {
  roommateName: string;
  yourName: string;
  dormNumber: string;
  collegeOrCity: string;
  birthdayDate: string;
}
