import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add these exports
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatAmericanOdds(odds: number): string {
  if (odds >= 0) {
    return `+${odds}`;
  }
  return odds.toString();
}

// If there are more functions mentioned in warnings, add exports similarly
