import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  return phone;
}

/** Encode public asset paths so spaces and special chars (e.g. ?) work on Vercel/CDN. */
export function encodePublicAssetPath(src: string): string {
  return src
    .split("/")
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(segment)))
    .join("/");
}
