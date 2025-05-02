// src/app/statistics/page.tsx
import React from 'react';
import { getAllPicks, StrapiResponse, Pick } from '@/lib/api';
import { ResultBadge } from '@/components/ui/result-badge';
import {
  ChartBarIcon,
  CalculatorIcon,
  ArrowTrendingUpIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const formatNumber = (num: number, decimals: number = 2) => {
  return num.toFixed(decimals);
};

const formatProfit = (profit: number) => {
  if (profit > 0) {
    return `+${formatNumber(profit)}u`;
  }
  return `${formatNumber(profit)}u`;
};

const formatAmericanOdds = (decimalOdds: number): string => {
  if (decimalOdds >= 2) {
    const americanOdds = (decimalOdds - 1) * 100;
    return `+${Math.round(americanOdds)}`;
  } else {
    const americanOdds = -100 / (decimalOdds - 1);
    return `${Math.round(americanOdds)}`;
  }
};

const calculateProfit = (pick: Pick): number => {
  if (pick.Result === 'Win') {
    return (pick.Odds - 1) * pick.Stake;
  } else if (pick.Result === 'Loss') {
    return -pick.Stake;
  }
  return 0;
};

const calculateOverallStats = (picks: Pick[]) => {
  const totalPicks = picks.length;
  const wins = picks.filter((pick) => pick.Result === 'Win').length;
  const losses = picks.filter((pick) => pick.Result === 'Loss').length;
  const pushes = picks.filter((pick) => pick.Result === 'Push').length;
  const decidedPicksForRoi = picks.filter((pick) => pick.Result === 'Win' || pick.Result === 'Loss');
  const profit = decidedPicksForRoi.reduce((acc, pick) => acc + calculateProfit(pick), 0);
  const totalDecidedStake = decidedPicksForRoi.reduce((acc, pick) => acc + pick.Stake, 0);
  const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
  const roi = totalDecidedStake > 0 ? (profit / totalDecidedStake) * 100 : 0;

  return {
    totalPicks,
    wins,
    losses,
    pushes,
    winRate: winRate.toFixed(2),
    profit,
    roi: roi.toFixed(2),
  };
};

const calculateSportsPerformance = (picks: Pick[]) => {
  const desiredOrder = ['NBA', 'NFL', 'MLB', 'NHL', 'NCAAB', 'NCAAF', 'WNBA'];
  const leagues = Array.from(new Set(picks.map((pick) => pick.League))).sort((a, b) => {
    const aIndex = desiredOrder.indexOf(a);
    const bIndex = desiredOrder.indexOf(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return leagues.map((league, index) => {
    const leaguePicks = picks.filter((pick) => pick.League === league);
    const picksCount = leaguePicks.length;
    const wins = leaguePicks.filter((pick) => pick.Result === 'Win').length;
    const losses = leaguePicks.filter((pick) => pick.Result === 'Loss').length;
    const pushes = leaguePicks.filter((pick) => pick.Result === 'Push').length;
    const decidedPicksForRoi = leaguePicks.filter((pick) => pick.Result === 'Win' || pick.Result === 'Loss');
    const profit = decidedPicksForRoi.reduce((acc, pick) => acc + calculateProfit(pick), 0);
    const totalDecidedStake = decidedPicksForRoi.reduce((acc, pick) => acc + pick.Stake, 0);
    const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
    const roi = totalDecidedStake > 0 ? (profit / totalDecidedStake) * 100 : 0;

    return {
      id: index + 1,
      name: league,
      picks: picksCount,
      wins,
      losses,
      pushes,
      winRate: winRate.toFixed(2),
      roi: roi.toFixed(2),
      profit,
    };
  });
};

export default async function StatisticsPage() {
  // Standardwerte für Statistiken
  let recentStats = { totalPicks: 0, wins: 0, losses: 0, pushes: 0, winRate: '0.00', profit: 0, roi: '0.00' };
  let sportsPerformance: { id: number; name: string; picks: number; wins: number; losses: number; pushes: number; winRate: string; roi: string; profit: number }[] = [];
  let recentBets: { id: string; bet: string; sport: string; date: string; result: string; odds: number; stake: number; profit: number }[] = [];

  try {
    // Verwende den neuen Endpunkt mit vorberechneten Statistiken
    console.log("Fetching pre-calculated statistics...");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 Sekunden Timeout

    try {
      // Verwende den mode=calculated Parameter, um vorberechnete Statistiken zu erhalten
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/picks/all-for-stats?mode=calculated`, 
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          cache: 'no-store',
          next: { revalidate: 0 }
        }
      );
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Received pre-calculated statistics:", data);
        
        if (data.overallStats && data.sportsPerformance && data.recentBets) {
          // Direkt die vorberechneten Statistiken verwenden
          recentStats = {
            totalPicks: data.overallStats.totalPicks || 0,
            wins: data.overallStats.wins || 0,
            losses: data.overallStats.losses || 0,
            pushes: data.overallStats.pushes || 0,
            winRate: data.overallStats.winRate || '0.00',
            profit: data.overallStats.profit || 0,
            roi: data.overallStats.roi || '0.00'
          };
          
          sportsPerformance = data.sportsPerformance || [];
          
          // Daten für die letzten Wetten formatieren
          recentBets = (data.recentBets || []).map((bet: any) => ({
            id: bet.id,
            bet: bet.bet,
            sport: bet.sport,
            date: new Date(bet.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            result: bet.result,
            odds: bet.odds,
            stake: bet.stake,
            profit: bet.profit
          }));
          
          console.log(`Successfully loaded statistics with ${recentStats.totalPicks} total picks`);
        } else {
          throw new Error("Invalid data structure from statistics endpoint");
        }
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error with pre-calculated statistics:", error);
      console.log("Falling back to regular getAllPicks method");
      
      // Fallback: Wir holen die Daten und berechnen sie selbst
      const rawData = await getAllPicks();
      const picks = rawData.data || [];
      
      console.log(`Fallback: Processing ${picks.length} total picks`);
      
      recentStats = calculateOverallStats(picks);
      console.log('Overall stats calculated:', recentStats);
      
      sportsPerformance = calculateSportsPerformance(picks);
      
      // Nur die 9 neuesten Picks für die "Last Bets" Anzeige verwenden
      recentBets = picks.slice(0, 9).map((pick) => ({
        id: pick.documentId || String(pick.id),
        bet: pick.Pick,
        sport: pick.League,
        date: new Date(pick.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        result: pick.Result,
        odds: pick.Odds,
        stake: pick.Stake,
        profit: calculateProfit(pick),
      }));
    }
  } catch (error) {
    console.error('Error fetching statistics:', error);
  }

  return (
    <div className="min-h-screen pb-20 relative isolate">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 -z-10 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1108/632] w-[40rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-15"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute right-[20%] bottom-[20%] -z-10 transform-gpu blur-3xl"
      >
        <div className="aspect-[1/1] w-[30rem] rounded-full bg-gradient-to-r from-[#4f46e5] to-[#80caff] opacity-15" />
      </div>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Statistics</h1>
          <p className="text-lg text-gray-400">Track your betting performance and results</p>
        </div>
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
            <div className="flex flex-col rounded-2xl bg-slate-800/30 backdrop-blur-sm p-5 sm:p-6 shadow-lg border border-white/10 ring-1 ring-white/10 hover:bg-slate-800/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <dt className="text-xs sm:text-sm font-semibold text-gray-300 whitespace-pre-line">Total Picks</dt>
                <div className="text-sky-300">
                  <CalculatorIcon className="w-6 h-6" />
                </div>
              </div>
              <dd className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                {formatNumber(recentStats.totalPicks, 0)}
              </dd>
            </div>
            <div className="flex flex-col rounded-2xl bg-slate-800/30 backdrop-blur-sm p-5 sm:p-6 shadow-lg border border-white/10 ring-1 ring-white/10 hover:bg-slate-800/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <dt className="text-xs sm:text-sm font-semibold text-gray-300 whitespace-pre-line">Win Rate</dt>
                <div className="text-sky-300">
                  <CheckBadgeIcon className="w-6 h-6" />
                </div>
              </div>
              <dd className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                {recentStats.winRate}%
              </dd>
            </div>
            <div className="flex flex-col rounded-2xl bg-slate-800/30 backdrop-blur-sm p-5 sm:p-6 shadow-lg border border-white/10 ring-1 ring-white/10 hover:bg-slate-800/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <dt className="text-xs sm:text-sm font-semibold text-gray-300 whitespace-pre-line">Profit</dt>
                <div className="text-sky-300">
                  <ArrowTrendingUpIcon className="w-6 h-6" />
                </div>
              </div>
              <dd className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-emerald-400">
                {formatProfit(recentStats.profit)}
              </dd>
            </div>
            <div className="flex flex-col rounded-2xl bg-slate-800/30 backdrop-blur-sm p-5 sm:p-6 shadow-lg border border-white/10 ring-1 ring-white/10 hover:bg-slate-800/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <dt className="text-xs sm:text-sm font-semibold text-gray-300 whitespace-pre-line">ROI</dt>
                <div className="text-sky-300">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
              </div>
              <dd className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                {recentStats.roi}%
              </dd>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm shadow-lg border border-white/10 ring-1 ring-white/10 p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-xl font-bold">Sports Performance</h2>
                <span className="text-sm font-medium text-gray-300 mt-1 md:mt-0">
                  Overall Record: {recentStats.wins}-{recentStats.losses}-{recentStats.pushes}
                </span>
              </div>
              <div className="space-y-6">
                {sportsPerformance.length > 0 ? (
                  sportsPerformance.map((sport) => (
                    <div key={sport.id} className="flex flex-col">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className="font-medium">{sport.name}</span>
                        </div>
                        <div className="font-medium text-emerald-400">{formatProfit(sport.profit)}</div>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full relative overflow-hidden">
                        <div
                          className="h-2 absolute top-0 left-0 rounded-full bg-sky-300"
                          style={{ width: `${Math.max(5, parseFloat(sport.winRate))}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-400">
                        <span>
                          {sport.wins}-{sport.losses}-{sport.pushes}
                        </span>
                        <span className="text-center">{sport.winRate}%</span>
                        <span>ROI: {sport.roi}%</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No sports performance data available.</p>
                )}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800/30 backdrop-blur-sm shadow-lg border border-white/10 ring-1 ring-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Last Bets</h2>
                <a href="/all-picks" className="inline-flex items-center text-sky-300 hover:text-indigo-300">
                  View All Picks
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <tbody className="divide-y divide-gray-800">
                    {recentBets.length > 0 ? (
                      recentBets.map((bet) => (
                        <tr key={bet.id} className="hover:bg-slate-800/20">
                          <td className="py-3 pl-1 pr-3">
                            <div>
                              <div className="flex items-baseline gap-2">
                                <p className="font-medium">{bet.bet}</p>
                                <p className="text-xs text-gray-400">{formatAmericanOdds(bet.odds)}</p>
                              </div>
                              <p className="text-xs text-gray-400">
                                {bet.sport} - {bet.date}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 pl-3 pr-1 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-3">
                              <span
                                className={`text-sm font-medium ${
                                  bet.profit > 0
                                    ? 'text-emerald-400'
                                    : bet.profit < 0
                                    ? 'text-red-400'
                                    : 'text-gray-400'
                                }`}
                              >
                                {bet.result === 'Pending'
                                  ? ''
                                  : (bet.profit > 0 ? '+' : '') + `${formatNumber(bet.profit)}u`}
                              </span>
                              <ResultBadge result={bet.result} />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-3 text-center text-gray-400">
                          No recent bets available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}