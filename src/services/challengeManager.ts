// src/services/challengeManager.ts
import { Challenge } from '../types';

export class ChallengeManager {
  private challenges: Challenge[] = [
    // EASY CHALLENGES
    {
      id: 'easy-1',
      title: 'Reverse a String',
      description: 'Write a function that reverses a string.',
      difficulty: 'easy',
      example: {
        input: '"hello"',
        output: '"olleh"'
      },
      hints: [
        'Use .split(), .reverse(), .join()',
        'Or use a for loop backwards',
        'Convert string to array first'
      ],
      solution: 'function reverse(str) { return str.split("").reverse().join(""); }'
    },
    {
      id: 'easy-2',
      title: 'Find Maximum',
      description: 'Find the largest number in an array.',
      difficulty: 'easy',
      example: {
        input: '[3, 7, 2, 9, 1]',
        output: '9'
      },
      hints: [
        'Use Math.max(...array)',
        'Or loop through comparing values',
        'Start with first element as max'
      ]
    },
    {
      id: 'easy-3',
      title: 'Count Vowels',
      description: 'Count the number of vowels in a string.',
      difficulty: 'easy',
      example: {
        input: '"hello world"',
        output: '3'
      },
      hints: [
        'Vowels are a, e, i, o, u',
        'Use a loop and check each character',
        'Make it case-insensitive'
      ]
    },

    // MEDIUM CHALLENGES
    {
      id: 'medium-1',
      title: 'FizzBuzz',
      description: 'Print numbers 1-100. For multiples of 3 print "Fizz", for 5 print "Buzz", for both print "FizzBuzz".',
      difficulty: 'medium',
      example: {
        input: '15',
        output: 'FizzBuzz'
      },
      hints: [
        'Check divisibility by 15 first',
        'Use modulo operator %',
        'Order matters: check 15 before 3 or 5'
      ]
    },
    {
      id: 'medium-2',
      title: 'Palindrome Check',
      description: 'Check if a string reads the same forwards and backwards.',
      difficulty: 'medium',
      example: {
        input: '"racecar"',
        output: 'true'
      },
      hints: [
        'Compare string with its reverse',
        'Ignore spaces and punctuation',
        'Make it case-insensitive'
      ]
    },
    {
      id: 'medium-3',
      title: 'Anagram Checker',
      description: 'Check if two strings are anagrams of each other.',
      difficulty: 'medium',
      example: {
        input: '"listen", "silent"',
        output: 'true'
      },
      hints: [
        'Sort both strings and compare',
        'Or count character frequencies',
        'Ignore spaces and case'
      ]
    },

    // HARD CHALLENGES
    {
      id: 'hard-1',
      title: 'Two Sum',
      description: 'Find two numbers in an array that add up to a target sum.',
      difficulty: 'hard',
      example: {
        input: '[2, 7, 11, 15], target=9',
        output: '[0, 1]'
      },
      hints: [
        'Use a hash map for O(n) solution',
        'Store complements as you iterate',
        'Return indices, not values'
      ]
    },
    {
      id: 'hard-2',
      title: 'Longest Substring Without Repeating',
      description: 'Find the length of the longest substring without repeating characters.',
      difficulty: 'hard',
      example: {
        input: '"abcabcbb"',
        output: '3 (abc)'
      },
      hints: [
        'Use sliding window technique',
        'Track characters with a Set or Map',
        'Move start pointer when duplicate found'
      ]
    },
    {
      id: 'hard-3',
      title: 'Binary Search',
      description: 'Implement binary search on a sorted array.',
      difficulty: 'hard',
      example: {
        input: '[1, 3, 5, 7, 9], target=5',
        output: '2 (index)'
      },
      hints: [
        'Array must be sorted',
        'Compare with middle element',
        'Halve the search space each time'
      ]
    }
  ];

  getChallenge(difficulty: string): Challenge {
    const filtered = this.challenges.filter(c => c.difficulty === difficulty);
    if (filtered.length === 0) {
      return this.challenges[0]; // fallback to first challenge
    }
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  getChallengeById(id: string): Challenge | undefined {
    return this.challenges.find(c => c.id === id);
  }

  getDailyQuest(): Challenge {
    const today = new Date().getDate();
    return this.challenges[today % this.challenges.length];
  }

  getAllChallenges(): Challenge[] {
    return this.challenges;
  }

  getChallengesByDifficulty(difficulty: string): Challenge[] {
    return this.challenges.filter(c => c.difficulty === difficulty);
  }
}