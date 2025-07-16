'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/common/SearchBar';
import PicksFilter from '@/components/common/PicksFilter';

export default function PicksPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedLeague, setSelectedLeague] = useState(searchParams.get('league') || 'all');

  const handleSearch = useCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    
    // Reset to page 1 when searching
    params.delete('page');
    
    router.push(`/picks?${params.toString()}`);
  }, [router, searchParams]);

  const handleLeagueChange = useCallback((league: string) => {
    setSelectedLeague(league);
    
    const params = new URLSearchParams(searchParams);
    
    if (league && league !== 'all') {
      params.set('league', league);
    } else {
      params.delete('league');
    }
    
    // Reset to page 1 when filtering
    params.delete('page');
    
    router.push(`/picks?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search teams, picks, or matchups..."
          className="flex-1"
        />
        <PicksFilter 
          selectedLeague={selectedLeague}
          onLeagueChange={handleLeagueChange}
        />
      </div>
    </div>
  );
}