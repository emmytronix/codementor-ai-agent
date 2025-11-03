// src/services/progressTracker.ts
import { UserProgress } from '../types';

const userProgress = new Map<string, UserProgress>();

export async function trackProgress(
  userId: string,
  type: 'topic' | 'challenge',
  item: string
): Promise<void> {
  let progress = userProgress.get(userId) || {
    userId,
    topicsCompleted: [],
    challengesSolved: [],
    totalXP: 0,
    currentStreak: 0,
    lastActiveDate: new Date().toISOString(),
    achievements: []
  };

  if (type === 'topic') {
    if (!progress.topicsCompleted.includes(item)) {
      progress.topicsCompleted.push(item);
      progress.totalXP += 10;

      // Check achievements
      if (progress.topicsCompleted.length === 1) {
        progress.achievements.push('Ìæì First Steps!');
      }
      if (progress.topicsCompleted.length === 5) {
        progress.achievements.push('Ì≥ö Knowledge Seeker!');
      }
      if (progress.topicsCompleted.length === 10) {
        progress.achievements.push('Ìºü Learning Master!');
      }
    }
  }

  if (type === 'challenge') {
    if (!progress.challengesSolved.includes(item)) {
      progress.challengesSolved.push(item);

      // Award XP based on difficulty
      if (item.includes('easy')) {
        progress.totalXP += 25;
      } else if (item.includes('medium')) {
        progress.totalXP += 50;
      } else if (item.includes('hard')) {
        progress.totalXP += 100;
      }

      // Check achievements
      if (progress.challengesSolved.length === 1) {
        progress.achievements.push('Ì≤™ Problem Solver!');
      }
      if (progress.challengesSolved.length === 10) {
        progress.achievements.push('Ì¥• Challenge Champion!');
      }
    }
  }

  // XP achievement
  if (progress.totalXP >= 500 && !progress.achievements.includes('‚≠ê XP Master!')) {
    progress.achievements.push('‚≠ê XP Master!');
  }

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  const lastActive = progress.lastActiveDate.split('T')[0];
  
  if (today !== lastActive) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastActive === yesterdayStr) {
      progress.currentStreak++;
    } else {
      progress.currentStreak = 1;
    }

    progress.lastActiveDate = new Date().toISOString();

    if (progress.currentStreak === 7) {
      progress.achievements.push('Ì¥• Week Warrior!');
    }
  }

  userProgress.set(userId, progress);
}

export async function getProgress(userId: string): Promise<UserProgress> {
  return userProgress.get(userId) || {
    userId,
    topicsCompleted: [],
    challengesSolved: [],
    totalXP: 0,
    currentStreak: 0,
    lastActiveDate: new Date().toISOString(),
    achievements: []
  };
}

export function getLeaderboard() {
  return Array.from(userProgress.values())
    .sort((a, b) => b.totalXP - a.totalXP)
    .slice(0, 10);
}
