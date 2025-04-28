'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/table';
import { SimpleDatePicker } from '@/components/ui/simple-date-picker';
import { ResultBadge } from '@/components/ui/result-badge';
import Link from 'next/link';

// Typ für Picks
type PickData = {
  id: number;
  League: string;
  Date: string;
  Away: string;
  Home: string;
  Pick: string;
  Odds: number;
  Result: string;
  Stake: number;
  Writeup: string | null;
  Author: string;
  Slug: string;
  Summary: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

interface PicksTableProps {
  picks: PickData[] | PickData;
  pagination?: Pagination;
}

// Funktion zur Formatierung des Datums in amerikanischer Schreibweise (YYYY/MM/DD)
const formatAmericanDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// Funktion zur Umwandlung von Dezimalquoten in amerikanische Quoten
const formatAmericanOdds = (decimalOdds: number) => {
  if (!decimalOdds || isNaN(decimalOdds)) return '+100';

  if (decimalOdds >= 2.0) {
    const americanOdds = (decimalOdds - 1) * 100;
    return `+${Math.round(americanOdds)}`;
  } else {
    const americanOdds = -100 / (decimalOdds - 1);
    return Math.round(americanOdds).toString();
  }
};

export default function PicksTableWithFilters({ picks, pagination }: PicksTableProps) {
  // Ensure picks are valid objects
  const safePicksArray = Array.isArray(picks) 
    ? picks.filter(pick => pick && pick.League) 
    : (picks && picks.League) ? [picks] : [];
  
  const [currentPage, setCurrentPage] = useState<number>(pagination?.page || 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayedPicks, setDisplayedPicks] = useState<PickData[]>(safePicksArray);
  const [filteredPicks, setFilteredPicks] = useState<PickData[]>(safePicksArray);
  const [leagueFilter, setLeagueFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<{ from?: string, to?: string }>({});
  
  // Get unique leagues
  const leagues = safePicksArray.length > 0 
    ? [...new Set(safePicksArray
        .filter(pick => pick.League)
        .map(pick => pick.League))]
    : [];

  // Apply filters when they change
  useEffect(() => {
    let result = [...displayedPicks];
    
    // Apply league filter
    if (leagueFilter) {
      result = result.filter(pick => pick.League === leagueFilter);
    }
    
    // Apply date filter
    if (dateFilter.from) {
      result = result.filter(pick => new Date(pick.Date) >= new Date(dateFilter.from!));
    }
    if (dateFilter.to) {
      result = result.filter(pick => new Date(pick.Date) <= new Date(dateFilter.to!));
    }
    
    setFilteredPicks(result);
  }, [displayedPicks, leagueFilter, dateFilter]);

  const handleLeagueFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLeague = e.target.value;
    setLeagueFilter(selectedLeague);
    
    if (selectedLeague) {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/picks?sort=Date:desc&filters[League][$eq]=${selectedLeague}&populate=*&pagination[pageSize]=20&pagination[page]=1`);
        const data = await response.json();
        
        if (data.data && Array.isArray(data.data)) {
          setDisplayedPicks(data.data);
        }
      } catch (error) {
        console.error('Error loading league picks:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // If no league is selected, reset to the original data
      setDisplayedPicks(safePicksArray);
    }
  };

  const handleDateFilterChange = (dates: { from?: string, to?: string }) => {
    setDateFilter(dates);
  };

  const loadMorePicks = async () => {
    if (!pagination || currentPage >= pagination.pageCount || isLoading) return;
    
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      
      let url = `/api/picks?sort=Date:desc&populate=*&pagination[pageSize]=20&pagination[page]=${nextPage}`;
      
      // Add league filter if present
      if (leagueFilter) {
        url += `&filters[League][$eq]=${leagueFilter}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        setDisplayedPicks(prev => [...prev, ...data.data]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more picks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Profit berechnen
  const calculateProfit = (pick: PickData) => {
    if (!pick) return '0.00u';
    
    const { Result, Odds, Stake } = pick;
    
    if (!Result || !Odds || !Stake) return '0.00u';
    
    if (Result === 'Win') {
      const profit = Stake * (Odds - 1);
      return `+${profit.toFixed(2)}u`;
    } else if (Result === 'Loss') {
      return `${(-Stake).toFixed(2)}u`;
    } else if (Result === 'Push') {
      return '0.00u';
    } else {
      return '';
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      {displayedPicks.length === 0 && (
        <div className="text-center py-6 text-red-500 dark:text-red-400 font-bold">
          Keine Picks gefunden. Bitte überprüfen Sie die API-Verbindung.
        </div>
      )}
      
      {filteredPicks.length > 0 || isLoading ? (
        <>
          <div className="mb-6 w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                <select
                  value={leagueFilter}
                  onChange={handleLeagueFilterChange}
                  className="px-4 py-2 rounded-lg bg-slate-800/75 text-slate-300 border border-white/10 hover:border-white/20 shadow-sm focus:ring-2 focus:ring-sky-300 focus:outline-none text-sm md:min-w-[150px]"
                >
                  <option value="">Alle Ligen</option>
                  {leagues.map((league) => (
                    <option key={league} value={league}>
                      {league}
                    </option>
                  ))}
                </select>
                
                <SimpleDatePicker 
                  className="w-full md:w-auto" 
                  onChange={handleDateFilterChange}
                />
              </div>
              
              <Link 
                href="/picks" 
                className="inline-flex items-center text-sky-300 hover:text-indigo-300 underline text-sm whitespace-nowrap"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Zurück zur Statistik
              </Link>
            </div>
          </div>
          
          {isLoading && filteredPicks.length === 0 ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-300"></div>
              <p className="mt-2 text-slate-300">Lade Picks...</p>
            </div>
          ) : (
            <>
              {/* Desktop View: Standard Table */}
              <div className="hidden md:block">
                <Table className="table-auto border-none min-w-full">
                  <TableHead>
                    <TableRow className="border-b border-gray-700">
                      <TableHeader className="py-4 text-white">Liga</TableHeader>
                      <TableHeader className="text-white">Datum</TableHeader>
                      <TableHeader className="text-white">Spiel</TableHeader>
                      <TableHeader className="text-white">Pick</TableHeader>
                      <TableHeader className="text-white">Ergebnis</TableHeader>
                      <TableHeader className="text-white">Profit</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody className="divide-y divide-gray-700">
                    {filteredPicks.map((pick) => (
                      <TableRow 
                        key={pick.id} 
                        className="bg-transparent hover:bg-slate-800/30"
                      >
                        <TableCell className="text-gray-300">{pick.League}</TableCell>
                        <TableCell className="text-gray-300 whitespace-nowrap">{formatAmericanDate(pick.Date)}</TableCell>
                        <TableCell className="text-gray-300">{`${pick.Away} @ ${pick.Home}`}</TableCell>
                        <TableCell className="text-gray-300">{pick.Pick}</TableCell>
                        <TableCell>
                          <ResultBadge result={pick.Result} />
                        </TableCell>
                        <TableCell className={`font-medium ${pick.Result === 'Win' ? 'text-emerald-400' : pick.Result === 'Loss' ? 'text-red-400' : 'text-gray-300'}`}>
                          {pick.Result === 'Pending' ? '' : calculateProfit(pick)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Mobile View: Streamlined Layout */}
              <div className="md:hidden overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <tbody className="divide-y divide-gray-800">
                    {filteredPicks.map((pick) => (
                      <tr key={pick.id} className="hover:bg-slate-800/20">
                        <td className="py-3 pl-1 pr-3">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <p className="font-medium">{pick.Pick}</p>
                              <p className="text-xs text-gray-400">@{formatAmericanOdds(pick.Odds)}</p>
                            </div>
                            <p className="text-xs text-gray-400">{pick.League} - {formatAmericanDate(pick.Date)}</p>
                            <p className="text-xs text-gray-400">{`${pick.Away} @ ${pick.Home}`}</p>
                          </div>
                        </td>
                        <td className="py-3 pl-3 pr-1 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-3">
                            <span className={`text-sm font-medium ${pick.Result === 'Win' ? 'text-emerald-400' : pick.Result === 'Loss' ? 'text-red-400' : 'text-gray-400'}`}>
                              {pick.Result === 'Pending' ? '' : calculateProfit(pick)}
                            </span>
                            <ResultBadge result={pick.Result} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          
          {pagination && currentPage < pagination.pageCount && filteredPicks.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMorePicks}
                disabled={isLoading}
                className="px-4 py-2 bg-slate-800/75 text-slate-300 border border-white/10 hover:border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Lädt...' : 'Mehr Picks laden'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-6 text-gray-400">
          Keine Picks gefunden, die den Filterkriterien entsprechen.
        </div>
      )}
    </div>
  );
}