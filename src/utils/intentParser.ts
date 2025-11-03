// src/utils/intentParser.ts
import { ParsedIntent, Intent } from '../types';

export function parseIntent(message: string): ParsedIntent {
  const lowerMessage = message.toLowerCase().trim();

  // Help command
  if (lowerMessage === '/help' || lowerMessage === 'help') {
    return { intent: 'help' };
  }

  // Learn command: /learn [topic]
  if (lowerMessage.startsWith('/learn')) {
    const topic = message.substring(6).trim();
    return { intent: 'learn', topic: topic || 'JavaScript' };
  }

  // Challenge command: /challenge [difficulty]
  if (lowerMessage.startsWith('/challenge')) {
    const parts = lowerMessage.split(' ');
    const difficulty = (parts[1] as 'easy' | 'medium' | 'hard') || 'easy';
    return { intent: 'challenge', difficulty };
  }

  // Progress command
  if (lowerMessage === '/progress' || lowerMessage === 'progress') {
    return { intent: 'progress' };
  }

  // Default to general question
  return { intent: 'general' };
}
