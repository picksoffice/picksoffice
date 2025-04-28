import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Moderne API für sichere Kontexte (HTTPS)
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback für ältere Browser
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Verberge das Textfeld
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      
      // Wähle den Text aus und kopiere ihn
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
};

export function getTeamLogoUrl(league: string, team: string): string | null {
  // Convert league to uppercase for consistency
  const normalizedLeague = league?.toUpperCase();
  
  // Format team name to match filenames by removing spaces and making lowercase
  const normalizedTeam = team?.toLowerCase().replace(/\s+/g, '');
  
  // If no league or team provided, return null
  if (!normalizedLeague || !normalizedTeam) {
    return null;
  }
  
  // Lookup table for team name corrections
  const teamCorrections: Record<string, string> = {
    // NBA corrections
    'timberwolves': 'timberwovles', // Fix for the misspelled filename
    'trailblazers': 'trail blazers', // Fix for Trail Blazers
    // Add other corrections as needed
  };
  
  // Get corrected team name if it exists
  const correctedTeam = teamCorrections[normalizedTeam] || normalizedTeam;
  
  // Return the URL for the team logo
  return `/images/logos/${normalizedLeague}/${correctedTeam}.png`;
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const getResultClass = (result: string | undefined): string => {
  if (!result) return 'bg-gray-500 text-white';
  
  switch (result.toLowerCase()) {
    case 'win':
      return 'bg-green-500 text-white';
    case 'loss':
      return 'bg-red-500 text-white';
    case 'push':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const stakeToStars = (stake: number | undefined): string => {
  if (!stake) return '★';
  
  const stakeNum = Number(stake);
  if (isNaN(stakeNum)) return '★';
  
  if (stakeNum <= 2) return '★';
  if (stakeNum <= 4) return '★★';
  if (stakeNum <= 6) return '★★★';
  if (stakeNum <= 8) return '★★★★';
  return '★★★★★';
};

export const formatAmericanOdds = (decimalOdds: number): string => {
  if (!decimalOdds || isNaN(decimalOdds)) return '+100';
  
  if (decimalOdds >= 2) {
    const americanOdds = (decimalOdds - 1) * 100;
    return `+${Math.round(americanOdds)}`;
  } else {
    const americanOdds = -100 / (decimalOdds - 1);
    return `${Math.round(americanOdds)}`;
  }
};

export const formatOdds = (odds: number | undefined): string => {
  if (!odds || isNaN(Number(odds))) return '';
  return Number(odds).toFixed(2);
};