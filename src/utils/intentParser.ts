// src/utils/intentParser.ts
import { ParsedIntent } from '../types';

export function parseUserIntent(message: string): ParsedIntent {
  const lower = message.toLowerCase().trim();

  // Help command
  if (lower.startsWith('/help') || lower === 'help') {
    return { type: 'help' };
  }

  // Learn command
  if (lower.startsWith('/learn')) {
    const topic = message.replace(/^\/learn\s*/i, '').trim();
    return { type: 'learn', topic: topic || 'JavaScript' };
  }

  // Challenge command
  if (lower.startsWith('/challenge')) {
    const match = lower.match(/\/(easy|medium|hard)/i);
    const difficulty = (match?.[1]?.toLowerCase() as 'easy' | 'medium' | 'hard') || 'medium';
    return { type: 'challenge', difficulty };
  }

  // Progress command
  if (lower.startsWith('/progress') || lower === 'progress') {
    return { type: 'progress' };
  }

  // General query
  return { type: 'general' };
}