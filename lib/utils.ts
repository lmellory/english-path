import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы Tailwind без конфликтов (bg-red-500 + bg-blue-500 -> bg-blue-500).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
