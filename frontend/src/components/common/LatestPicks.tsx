'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ResultBadge } from '@/components/ui/result-badge';
import { Button } from '@/components/ui/button';
import { getAllPicks } from '@/lib/api';
import { getTeamLogoUrl } from '@/lib/teamLogos';

// Helper function to calculate profit
const calculateProfit = (result: string, odds: number, stake: number): number => {
  if (result === 'Win') {
    return stake * (odds - 1);
  } else if (result === 'Loss') {
    return -stake;
  }
  return 0; // Push or Pending
};

// Helper function to format decimal odds to American odds
const formatAmericanOdds = (decimalOdds: number): string => {
  if (!decimalOdds || isNaN(decimalOdds)) return '+100';
  
  if (decimalOdds >= 2) {
    const americanOdds = (decimalOdds - 1) * 100;
    return `+${Math.round(americanOdds)}`;
  } else {
    const americanOdds = -100 / (decimalOdds - 1);
    return `${Math.round(americanOdds)}`;
  }
};

// Helper function to format numbers
const formatNumber = (num: number, decimals: number = 2) => {
  return num.toFixed(decimals);
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Helper function to get background image based on league
const getBackgroundImage = (league: string | undefined) => {
  if (!league) return "https://placehold.co/1200x600/e2e8f0/1e293b?text=Game+Preview";
  
  const leagueLower = league.toLowerCase();
  
  if (leagueLower === 'nba') return `/images/backgrounds/nba_background.png`;
  if (leagueLower === 'nfl') return `/images/backgrounds/nfl_background.png`;
  if (leagueLower === 'mlb') return `/images/backgrounds/mlb_background.png`;
  if (leagueLower === 'nhl') return `/images/backgrounds/nhl_background.png`;
  if (leagueLower === 'ncaab') return `/images/backgrounds/ncaab_background.png`;
  if (leagueLower === 'ncaaf') return `/images/backgrounds/ncaaf_background.png`;
  if (leagueLower === 'wnba') return `/images/backgrounds/wnba_background.png`;
  
  return "https://placehold.co/1200x600/e2e8f0/1e293b?text=Game+Preview";
};

// Helper for Writeup length calculation
const getWriteupLength = (writeup: string | null | any): number => {
  if (!writeup) return 0;
  if (typeof writeup === 'string') return writeup.length;

  if (Array.isArray(writeup)) {
    return writeup
      .map((block: any) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          return block.children
            .map((child: any) => (child.type === 'text' && child.text ? child.text : ''))
            .join('');
        }
        return '';
      })
      .join('')
      .length;
  }

  return 0;
};

// Interface for pick data
interface PickItem {
  id: string | number;
  documentId: string;
  League: string;
  Date: string;
  Away: string;
  Home: string;
  Pick: string;
  Odds: number;
  Result: string;
  Stake: number;
  Summary: string;
  Writeup: any;
  Slug: string;
  Author: string;
}

export default function LatestPicks() {
  const [picks, setPicks] = useState<PickItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPicks() {
      try {
        setIsLoading(true);
        const response = await getAllPicks();
        
        if (response.data && Array.isArray(response.data)) {
          // Filter picks with sufficient writeup length and valid date
          const validPicks = response.data
            .filter(pick => getWriteupLength(pick.Writeup) >= 150 && pick.Date && pick.Slug)
            .slice(0, 3); // Get only the latest 3
            
          setPicks(validPicks);
        }
      } catch (error) {
        console.error('Error loading latest picks:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPicks();
  }, []);

  if (isLoading) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest Betting Insights</h2>
            <p className="mt-2 text-lg leading-8 text-gray-400">
              Expert predictions and detailed analysis updated daily
            </p>
          </div>
          <div className="flex justify-center mt-16">
            <div className="animate-pulse text-sky-300">Loading picks...</div>
          </div>
        </div>
      </div>
    );
  }

  if (picks.length === 0) {
    return null; // Don't show section if no picks available
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest Betting Insights</h2>
          <p className="mt-2 text-lg leading-8 text-gray-400">
            Expert predictions and detailed analysis updated daily
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {picks.map((pick) => (
            <PickCard key={pick.id} pick={pick} />
          ))}
        </div>
        
        <div className="mt-10 flex items-center justify-center">
          <Button
            href="/picks"
            size="lg"
            className="rounded-full"
          >
            View All Picks
          </Button>
        </div>
      </div>
    </div>
  );
}

function PickCard({ pick }: { pick: PickItem }) {
  return (
    <Link href={`/picks/${pick.Slug}`} className="group">
      <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm shadow-lg border border-white/10 ring-1 ring-white/10 h-full transition-all group-hover:shadow-xl group-hover:bg-slate-800/40">
        {/* Background image */}
        <img 
          src={getBackgroundImage(pick.League)} 
          alt={`${pick.League} Game Preview`}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30 transition-opacity group-hover:opacity-40"
          loading="lazy"
        />
        
        {/* Team logos */}
        {pick.League && pick.Away && getTeamLogoUrl(pick.League, pick.Away) && (
          <img
            alt={`${pick.Away} logo`}
            src={getTeamLogoUrl(pick.League, pick.Away) || '/images/logos/default.png'}
            className="absolute top-1/4 left-4 h-24 w-24 object-contain z-0 opacity-20 transition-opacity group-hover:opacity-30"
          />
        )}
        {pick.League && pick.Home && getTeamLogoUrl(pick.League, pick.Home) && (
          <img
            alt={`${pick.Home} logo`}
            src={getTeamLogoUrl(pick.League, pick.Home) || '/images/logos/default.png'}
            className="absolute top-1/4 right-4 h-24 w-24 object-contain z-0 opacity-20 transition-opacity group-hover:opacity-30"
          />
        )}
        
        {/* Content */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
        <div className="flex flex-1 flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-full bg-sky-300/80 px-2.5 py-0.5 text-xs font-medium text-slate-950 backdrop-blur-sm">
              {pick.League}
            </span>
            <ResultBadge result={pick.Result} />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-sky-300 transition-colors">
            {pick.Away} @ {pick.Home}
          </h3>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center">
              <div className="h-7 w-7 rounded-full bg-sky-300 flex items-center justify-center mr-2">
                <span className="text-slate-950 font-medium text-xs">
                  {pick.Author?.substring(0, 2).toUpperCase() || 'PO'}
                </span>
              </div>
              <span className="text-sm text-gray-300">{pick.Author || 'PicksOffice'}</span>
            </div>
            <span className="text-xs text-gray-400">
              {formatDate(pick.Date)}
            </span>
          </div>
          
          <div className="inline-block bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-semibold">
                  {pick.Pick}
                </span>
                <span className="ml-2 text-gray-400">
                  {formatAmericanOdds(pick.Odds)}
                </span>
              </div>
              {pick.Result !== 'Pending' && (
                <span className={`ml-4 font-medium ${pick.Result === 'Win' ? 'text-emerald-400' : pick.Result === 'Loss' ? 'text-red-400' : 'text-gray-400'}`}>
                  {pick.Result === 'Win' ? '+' : pick.Result === 'Loss' ? '' : ''}
                  {formatNumber(calculateProfit(pick.Result, pick.Odds, pick.Stake))}u
                </span>
              )}
            </div>
          </div>
          
          {pick.Summary && (
            <p className="mt-4 text-sm leading-6 text-gray-300 line-clamp-2">
              {pick.Summary}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}