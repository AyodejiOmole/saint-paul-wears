import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple concatenation with capitalization
export const concatenateArray = (arr: string[]): string => {
  return arr
    .map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
    .join(', ');
};