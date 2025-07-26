import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Beispiel-Implementierung für formatDate (passt an reale Logik an, z.B. mit Date-FNS oder Intl)
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Beispiel-Implementierung für formatAmericanOdds (passt an reale Logik an)
export function formatAmericanOdds(odds: number): string {
  if (odds > 0) {
    return `+${odds}`;
  } else {
    return odds.toString();
  }
}

// Weitere Utils-Funktionen, falls vorhanden, bleiben unverändert und werden exportiert, wenn benötigt