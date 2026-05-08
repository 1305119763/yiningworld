export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  nativeLanguage: string;
  learningLanguages: string[];
  currentLevel: Record<string, number>;
  totalXP: number;
  streak: number;
  joinedAt: string;
  achievements: string[];
}

export interface LearningProgress {
  userId: string;
  language: string;
  level: string;
  vocabulary: {
    learned: number;
    total: number;
    masteryRate: number;
  };
  grammar: {
    completed: number;
    total: number;
    accuracy: number;
  };
  speaking: {
    practiced: number;
    averageScore: number;
  };
  listening: {
    practiced: number;
    averageScore: number;
  };
  lastStudyDate: string;
  xp: number;
}

export interface Course {
  id: string;
  language: 'en' | 'ja' | 'ko';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  description: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  duration: number;
  xpReward: number;
}

export interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  audio?: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  examples: {
    sentence: string;
    translation: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'social' | 'mastery';
  requirement: {
    type: string;
    value: number;
  };
  xpReward: number;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  language: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  language: string;
  memberCount: number;
  image?: string;
}
