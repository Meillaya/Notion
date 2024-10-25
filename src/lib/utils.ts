import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCaretCoordinates(): { x: number; y: number } | null {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  
  // Ensure coordinates are within viewport
  const x = Math.min(rect.left, window.innerWidth - 400); // 400px is command menu width
  const y = Math.min(rect.top, window.innerHeight - 300); // 300px is approximate max height

  return {
    x,
    y,
  };
}