// src/services/challengeManager.ts
import { Challenge } from '../types';

const challenges: Challenge[] = [
  // EASY CHALLENGES
  {
    id: 'easy-1',
    title: 'Reverse a String',
    description: 'Write a function that takes a string and returns it reversed.',
    difficulty: 'easy',
    hint: 'You can use array methods or a loop',
    example: 'Input: "hello"\nOutput: "olleh"'
  },
  {
    id: 'easy-2',
    title: 'Find the Largest Number',
    description: 'Write a function that finds the largest number in an array.',
    difficulty: 'easy',
    hint: 'Use Math.max() or loop through the array',
    example: 'Input: [1, 5, 3, 9, 2]\nOutput: 9'
  },
  {
    id: 'easy-3',
    title: 'Count Vowels',
    description: 'Write a function that counts the number of vowels in a string.',
    difficulty: 'easy',
    hint: 'Use a loop and check if each character is a vowel',
    example: 'Input: "hello world"\nOutput: 3'
  },

  // MEDIUM CHALLENGES
  {
    id: 'medium-1',
    title: 'FizzBuzz',
    description: 'Print numbers 1-100. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for both print "FizzBuzz".',
    difficulty: 'medium',
    hint: 'Use modulo operator (%) to check divisibility',
    example: '1, 2, Fizz, 4, Buzz, Fizz, 7, ...'
  },
  {
    id: 'medium-2',
    title: 'Palindrome Checker',
    description: 'Write a function that checks if a string is a palindrome (reads same forwards and backwards).',
    difficulty: 'medium',
    hint: 'Compare the string with its reverse',
    example: 'Input: "racecar"\nOutput: true'
  },
  {
    id: 'medium-3',
    title: 'Fibonacci Sequence',
    description: 'Write a function that returns the nth number in the Fibonacci sequence.',
    difficulty: 'medium',
    hint: 'Each number is the sum of the two preceding ones',
    example: 'Input: 7\nOutput: 13 (0,1,1,2,3,5,8,13)'
  },

  // HARD CHALLENGES
  {
    id: 'hard-1',
    title: 'Implement debounce',
    description: 'Create a debounce function that delays invoking a function until after a specified delay.',
    difficulty: 'hard',
    hint: 'Use setTimeout and clearTimeout',
    example: 'debounce(fn, 300) - waits 300ms before executing'
  },
  {
    id: 'hard-2',
    title: 'Binary Search',
    description: 'Implement binary search algorithm to find an element in a sorted array.',
    difficulty: 'hard',
    hint: 'Divide the array in half each iteration',
    example: 'Input: [1,3,5,7,9], target: 7\nOutput: index 3'
  },
  {
    id: 'hard-3',
    title: 'Deep Clone Object',
    description: 'Write a function that creates a deep clone of an object (handles nested objects and arrays).',
    difficulty: 'hard',
    hint: 'Use recursion to handle nested structures',
    example: 'Clone all nested properties without reference'
  }
];

export function getRandomChallenge(difficulty: 'easy' | 'medium' | 'hard' = 'easy'): Challenge {
  const filtered = challenges.filter(c => c.difficulty === difficulty);
  const random = Math.floor(Math.random() * filtered.length);
  return filtered[random];
}

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find(c => c.id === id);
}
