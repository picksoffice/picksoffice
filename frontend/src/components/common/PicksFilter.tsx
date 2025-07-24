'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

const LEAGUES = ['All', 'NBA', 'NFL', 'MLB', 'NHL', 'NCAAB', 'NCAAF'];

export interface PicksFilterProps {
  className?: string;
}

export default function PicksFilter({ className }: PicksFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLeague = searchParams.get('league') || 'All';

  const handleLeagueChange = (league: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (league === 'All') {
      params.delete('league');
    } else {
      params.set('league', league);
    }

    // Reset to page 1 when changing filters
    if (params.has('page')) {
      params.set('page', '1');
    }

    router.push(`/picks?${params.toString()}`);
  };

  return (
    <div className={`${className || ''} py-6 mb-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/40 rounded-xl shadow-md p-6 border border-slate-700/30">
          <h3 className="text-lg font-semibold mb-4 text-white">Filter by League</h3>
          <div className="flex flex-wrap gap-3">
            {LEAGUES.map(league => (
              <button
                key={league}
                onClick={() => handleLeagueChange(league)}
                className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  currentLeague === league
                    ? 'bg-sky-300 text-slate-950'
                    : 'bg-slate-700/40 text-gray-300 hover:bg-slate-700/70'
                }`}
              >
                {league}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
