// src/services/progressTracker.ts
import { UserProgress } from '../types';

export class UserProgressManager {
  private progress: Map<string, UserProgress> = new Map();

  getProgress(userId: string): UserProgress {
    if (!this.progress.has(userId)) {
      this.progress.set(userId, {
        userId,
        topicsCompleted: 0,
        challengesSolved: 0,
        streak: 0,
        xp: 0,
        achievements: [],
        lastActive: new Date(),
      });
    }
    return this.progress.get(userId)!;
  }

  addTopic(userId: string): void {
    const p = this.getProgress(userId);
    p.topicsCompleted++;
    p.xp += 10;
    p.lastActive = new Date();
    
    if (p.topicsCompleted === 1) {
      p.achievements.push('🎓 First Steps!');
    }
    if (p.topicsCompleted === 5) {
      p.achievements.push('📚 Knowledge Seeker!');
    }
    if (p.topicsCompleted === 10) {
      p.achievements.push('🌟 Learning Master!');
    }
  }

  addChallenge(userId: string, difficulty: string): void {
    const p = this.getProgress(userId);
    p.challengesSolved++;
    p.lastActive = new Date();
    
    // Award XP based on difficulty
    if (difficulty === 'easy') {
      p.xp += 25;
    } else if (difficulty === 'medium') {
      p.xp += 50;
    } else {
      p.xp += 100;
    }

    // Unlock achievements
    if (p.challengesSolved === 1) {
      p.achievements.push('💪 Problem Solver!');
    }
    if (p.challengesSolved === 10) {
      p.achievements.push('🔥 Challenge Champion!');
    }
    if (p.xp >= 500) {
      p.achievements.push('⭐ XP Master!');
    }
  }

  updateStreak(userId: string): void {
    const p = this.getProgress(userId);
    const now = new Date();
    const lastActive = new Date(p.lastActive);
    const hoursSinceActive = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

    if (hoursSinceActive < 24) {
      p.streak++;
    } else if (hoursSinceActive < 48) {
      // Streak continues if within 48 hours
    } else {
      p.streak = 0;
    }

    p.lastActive = now;

    if (p.streak === 7) {
      p.achievements.push('🔥 Week Warrior!');
    }
  }

  getLeaderboard(limit: number = 10): UserProgress[] {
    return Array.from(this.progress.values())
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit);
  }
}