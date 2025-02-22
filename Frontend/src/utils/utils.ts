// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return twMerge(clsx(classes));
}
