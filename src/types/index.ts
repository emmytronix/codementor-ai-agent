export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
  example?: string;
  solution?: string;
}

export interface UserProgress {
  userId: string;
  topicsCompleted: string[];
  challengesSolved: string[];
  totalXP: number;
  currentStreak: number;
  lastActiveDate: string;
  achievements: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (progress: UserProgress) => boolean;
}

export type Intent = 'learn' | 'challenge' | 'progress' | 'help' | 'general';

export interface ParsedIntent {
  intent: Intent;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
