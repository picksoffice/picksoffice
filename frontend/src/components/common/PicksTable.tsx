'use client';

import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@/components/ui/table';
import { formatDate, stakeToStars } from '@/lib/utils';
import { ResultBadge } from '@/components/ui/result-badge';
import Link from 'next/link';

// Typ für Picks (flaches Format, wie von der API geliefert)
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
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Monat 1-12, mit führender 0
  const day = String(date.getDate()).padStart(2, '0'); // Tag mit führender 0
  return `${year}/${month}/${day}`;
};

// Funktion zur Umwandlung von Dezimalquoten in amerikanische Quoten
const formatAmericanOdds = (decimalOdds: number) => {
  if (!decimalOdds || isNaN(decimalOdds)) return '+100'; // Fallback für ungültige Werte

  if (decimalOdds >= 2.0) {
    // Positive amerikanische Quote
    const americanOdds = (decimalOdds - 1) * 100;
    return `+${Math.round(americanOdds)}`;
  } else {
    // Negative amerikanische Quote
    const americanOdds = -100 / (decimalOdds - 1);
    return Math.round(americanOdds).toString();
  }
};

export default function PicksTable({ picks, pagination }: PicksTableProps) {
  // Ensure picks are valid objects
  const safePicksArray = Array.isArray(picks)
    ? picks.filter(pick => pick && pick.League)
    : picks && picks.League
      ? [picks]
      : [];

  const [currentPage, setCurrentPage] = useState<number>(pagination?.page || 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayedPicks, setDisplayedPicks] = useState<PickData[]>(safePicksArray);
  const [leagueFilter, setLeagueFilter] = useState('');

  console.log('PicksTable received data:', {
    picks,
    pagination,
    picksArrayLength: safePicksArray.length,
    picksData: safePicksArray.slice(0, 2),
  });

  // Get unique leagues for filter dropdown - safely
  const leagues =
    safePicksArray.length > 0
      ? [...new Set(safePicksArray.filter(pick => pick.League).map(pick => pick.League))]
      : [];

  const handleLeagueFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLeagueFilter(e.target.value);
  };

  const filteredPicks = displayedPicks.filter(pick => {
    // Only include picks that have a League property
    if (!pick || !pick.League) return false;

    // Then filter by league if a filter is selected
    const matchesLeague = leagueFilter === '' || pick.League === leagueFilter;
    return matchesLeague;
  });

  const loadMorePicks = async () => {
    if (!pagination || currentPage >= pagination.pageCount || isLoading) return;

    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;

      // Use the local API route instead of direct Strapi API
      const response = await fetch(
        `/api/picks?sort=Date:desc&populate=*&pagination[pageSize]=20&pagination[page]=${nextPage}`
      );
      const data = await response.json();

      console.log('loadMorePicks response:', data);

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

  // Profit berechnen basierend auf Stake und Odds (Dezimalquote intern)
  const calculateProfit = (pick: PickData) => {
    if (!pick) return '0.00u';

    const { Result, Odds, Stake } = pick;

    if (!Result || !Odds || !Stake) return '0.00u';

    if (Result === 'Win') {
      // Profit = Stake * (Odds - 1)
      const profit = Stake * (Odds - 1);
      return `+${profit.toFixed(2)}u`; // Mit + Zeichen und u für units
    } else if (Result === 'Loss') {
      // Profit = -Stake
      return `${(-Stake).toFixed(2)}u`; // Mit u für units, negative Zahlen haben bereits ein -
    } else if (Result === 'Push') {
      return '0.00u';
    } else {
      // Pending
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

      {filteredPicks.length > 0 ? (
        <>
          <div className="mb-4 w-full">
            <div className="flex items-center justify-between">
              <div className="md:hidden w-3/4">
                <select
                  value={leagueFilter}
                  onChange={handleLeagueFilterChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/75 backdrop-blur-xl text-slate-400 border border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-slate-500 shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none text-sm"
                >
                  <option value="">League</option>
                  {leagues.map(league => (
                    <option key={league} value={league}>
                      {league}
                    </option>
                  ))}
                </select>
              </div>
              <Link
                href="/picks"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-sky-300 dark:hover:text-indigo-300 underline"
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
                Stats
              </Link>
            </div>
          </div>

          {/* Desktop View: Standard Table */}
          <div className="hidden md:block">
            <Table className="table-auto border-none min-w-full">
              <TableHead>
                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                  <TableHeader className="py-4 text-gray-900 dark:text-white">
                    <select
                      value={leagueFilter}
                      onChange={handleLeagueFilterChange}
                      className="px-4 py-2 block w-full rounded-lg bg-slate-800/75 backdrop-blur-xl text-slate-400 border border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-slate-500 shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none sm:text-sm"
                    >
                      <option value="">League</option>
                      {leagues.map(league => (
                        <option key={league} value={league}>
                          {league}
                        </option>
                      ))}
                    </select>
                  </TableHeader>
                  <TableHeader className="text-gray-900 dark:text-white">Datum</TableHeader>
                  <TableHeader className="text-gray-900 dark:text-white">Spiel</TableHeader>
                  <TableHeader className="text-gray-900 dark:text-white">Pick</TableHeader>
                  <TableHeader className="text-gray-900 dark:text-white">Ergebnis</TableHeader>
                  <TableHeader className="text-gray-900 dark:text-white">Profit</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPicks.map(pick => (
                  <TableRow key={pick.id} className="bg-transparent">
                    <TableCell className="text-gray-700 dark:text-gray-300">
                      {pick.League}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {formatAmericanDate(pick.Date)}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{`${pick.Away} @ ${pick.Home}`}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{pick.Pick}</TableCell>
                    <TableCell>
                      <ResultBadge result={pick.Result} />
                    </TableCell>
                    <TableCell
                      className={`font-medium ${pick.Result === 'Win' ? 'text-emerald-400' : pick.Result === 'Loss' ? 'text-red-400' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      {pick.Result === 'Pending' ? '' : calculateProfit(pick)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile View: Streamlined Layout - similar to Last 10 Bets */}
          <div className="md:hidden overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <tbody className="divide-y divide-gray-800">
                {filteredPicks.map(pick => (
                  <tr key={pick.id} className="hover:bg-slate-800/20">
                    <td className="py-3 pl-1 pr-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <p className="font-medium">{pick.Pick}</p>
                          <p className="text-xs text-gray-400">@{formatAmericanOdds(pick.Odds)}</p>
                        </div>
                        <p className="text-xs text-gray-400">
                          {pick.League} - {formatAmericanDate(pick.Date)}
                        </p>
                        <p className="text-xs text-gray-400">{`${pick.Away} @ ${pick.Home}`}</p>
                      </div>
                    </td>
                    <td className="py-3 pl-3 pr-1 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3">
                        <span
                          className={`text-sm font-medium ${pick.Result === 'Win' ? 'text-emerald-400' : pick.Result === 'Loss' ? 'text-red-400' : 'text-gray-400'}`}
                        >
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

          {pagination && currentPage < pagination.pageCount && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMorePicks}
                disabled={isLoading}
                className="px-4 py-2 bg-slate-800/75 text-slate-400 border border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-slate-500 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Lädt...' : 'Mehr Picks laden'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          Keine Picks gefunden, die den Filterkriterien entsprechen.
        </div>
      )}
    </div>
  );
}
