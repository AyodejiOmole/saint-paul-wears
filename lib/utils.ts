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

export function mapFirebaseAuthError(error: any): string {
  if (!error.code) return "An unexpected error occurred. Please try again.";

  switch (error.code) {
    case "auth/invalid-credential":
    case 400:
    case "auth/wrong-password":
      return "The email or password is incorrect.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/weak-password":
      return "Your password is too weak. Please choose a stronger one.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    default:
      return "Something went wrong. Please try again later.";
  }
}
