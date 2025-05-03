/**
 * pick controller
 */

import { factories } from '@strapi/strapi';
import { Context } from 'koa';

interface Pick {
  id: number;
  documentId?: string;
  League: string;
  Result: string;
  Odds: number;
  Stake: number;
  Date: string;
  Pick: string;
  Away?: string;
  Home?: string;
}

interface SportsPerformance {
  id: number;
  name: string;
  picks: number;
  wins: number;
  losses: number;
  pushes: number;
  winRate: string;
  roi: string;
  profit: number;
}

interface RecentBet {
  id: string;
  bet: string;
  sport: string;
  date: string;
  result: string;
  odds: number;
  stake: number;
  profit: number;
}

interface StatsResponse {
  overallStats: {
    totalPicks: number;
    wins: number;
    losses: number;
    pushes: number;
    pendingPicks: number;
    winRate: string;
    profit: number;
    roi: string;
  };
  sportsPerformance: SportsPerformance[];
  recentBets: RecentBet[];
  pickCount: number;
}

// Hilfsmethode außerhalb des Controllers
async function calculateStatisticsDirectly(strapi: any): Promise<StatsResponse> {
  console.log('Calculating statistics directly in backend...');

  try {
    const picks = await strapi.db.query('api::pick.pick').findMany({
      select: ['id', 'documentId', 'League', 'Result', 'Odds', 'Stake', 'Date', 'Pick', 'Away', 'Home'],
      orderBy: { Date: 'desc' },
    });

    console.log(`Processing ${picks.length} picks for statistics`);

    const totalPicks = picks.length;
    const wins = picks.filter((pick: Pick) => pick.Result === 'Win').length;
    const losses = picks.filter((pick: Pick) => pick.Result === 'Loss').length;
    const pushes = picks.filter((pick: Pick) => pick.Result === 'Push').length;
    const pendingPicks = picks.filter((pick: Pick) => pick.Result === 'Pending').length;
    const decidedPicks = wins + losses;
    const winRate = decidedPicks > 0 ? (wins / decidedPicks) * 100 : 0;

    let totalProfit = 0;
    let totalStake = 0;

    picks.forEach((pick: Pick) => {
      if (!pick.Result || !pick.Odds || !pick.Stake) return;

      if (pick.Result === 'Win' || pick.Result === 'Loss') {
        totalStake += pick.Stake;
        if (pick.Result === 'Win') {
          totalProfit += pick.Stake * (pick.Odds - 1);
        } else if (pick.Result === 'Loss') {
          totalProfit -= pick.Stake;
        }
      }
    });

    const roi = totalStake > 0 ? (totalProfit / totalStake) * 100 : 0;

    const desiredOrder = ['NBA', 'NFL', 'MLB', 'NHL', 'NCAAB', 'NCAAF', 'WNBA'];
    const leaguesSet = new Set(picks.map((pick: Pick) => pick.League));
    const leagues = [...leaguesSet].sort((a: string, b: string) => {
      const aIndex = desiredOrder.indexOf(a);
      const bIndex = desiredOrder.indexOf(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    const sportsPerformance = leagues.map((league: string, index: number) => {
      const leaguePicks = picks.filter((pick: Pick) => pick.League === league);
      const leagueWins = leaguePicks.filter((pick: Pick) => pick.Result === 'Win').length;
      const leagueLosses = leaguePicks.filter((pick: Pick) => pick.Result === 'Loss').length;
      const leaguePushes = leaguePicks.filter((pick: Pick) => pick.Result === 'Push').length;
      const leagueDecidedPicks = leaguePicks.filter((pick: Pick) => pick.Result === 'Win' || pick.Result === 'Loss');

      let leagueProfit = 0;
      let leagueStake = 0;

      leagueDecidedPicks.forEach((pick: Pick) => {
        leagueStake += pick.Stake;
        if (pick.Result === 'Win') {
          leagueProfit += pick.Stake * (pick.Odds - 1);
        } else if (pick.Result === 'Loss') {
          leagueProfit -= pick.Stake;
        }
      });

      const leagueWinRate = leagueWins + leagueLosses > 0 ? (leagueWins / (leagueWins + leagueLosses)) * 100 : 0;
      const leagueRoi = leagueStake > 0 ? (leagueProfit / leagueStake) * 100 : 0;

      return {
        id: index + 1,
        name: league,
        picks: leaguePicks.length,
        wins: leagueWins,
        losses: leagueLosses,
        pushes: leaguePushes,
        winRate: leagueWinRate.toFixed(2),
        roi: leagueRoi.toFixed(2),
        profit: leagueProfit,
      };
    });

    const recentBets = picks.slice(0, 9).map((pick: Pick, index: number) => {
      const profit = pick.Result === 'Win' ? pick.Stake * (pick.Odds - 1) : pick.Result === 'Loss' ? -pick.Stake : 0;
      return {
        id: pick.documentId || String(pick.id),
        bet: pick.Pick,
        sport: pick.League,
        date: new Date(pick.Date).toISOString(),
        result: pick.Result,
        odds: pick.Odds,
        stake: pick.Stake,
        profit: profit,
      };
    });

    const overallStats = {
      totalPicks,
      wins,
      losses,
      pushes,
      pendingPicks,
      winRate: winRate.toFixed(2),
      profit: totalProfit,
      roi: roi.toFixed(2),
    };

    return {
      overallStats,
      sportsPerformance,
      recentBets,
      pickCount: picks.length,
    };
  } catch (error) {
    console.error('Error calculating statistics directly:', error);
    throw error;
  }
}

export default factories.createCoreController('api::pick.pick', ({ strapi }) => ({
  async calculateStats(ctx: Context, next: () => Promise<void>) {
    try {
      return await this.stats(ctx, next);
    } catch (error) {
      console.error('Error in calculateStats:', error);
      ctx.throw(500, 'Error calculating stats');
    }
  },

  async stats(ctx: Context, next: () => Promise<void>) {
    try {
      console.log('Fetching picks for statistics...');

      const picks = await strapi.db.query('api::pick.pick').findMany({
        select: ['id', 'League', 'Result', 'Odds', 'Stake', 'Date', 'Pick'],
        orderBy: { Date: 'desc' },
      });

      console.log(`Found ${picks.length} picks`);

      if (picks.length === 0) {
        console.warn('No picks found');
        return {
          totalPicks: '0',
          winRate: '0.0',
          profit: '0.00',
          roi: '0.0',
          sportsPerformance: [],
          lastBets: [],
        };
      }

      const totalPicks = picks.length;
      const wins = picks.filter((pick: Pick) => pick.Result === 'Win').length;
      const losses = picks.filter((pick: Pick) => pick.Result === 'Loss').length;
      const pushes = picks.filter((pick: Pick) => pick.Result === 'Push').length;
      const decidedPicks = wins + losses;
      const winRate = decidedPicks > 0 ? (wins / decidedPicks) * 100 : 0;

      let totalProfit = 0;
      let totalStake = 0;
      picks.forEach((pick: Pick) => {
        const { Result, Odds, Stake } = pick;
        if (!Result || !Odds || !Stake) return;

        totalStake += Stake;
        if (Result === 'Win') {
          totalProfit += Stake * (Odds - 1);
        } else if (Result === 'Loss') {
          totalProfit -= Stake;
        }
      });
      const roi = totalStake > 0 ? (totalProfit / totalStake) * 100 : 0;

      const leagues = [...new Set(picks.map((pick: Pick) => pick.League))].sort();
      const sportsPerformance = leagues.map((league: string, index: number) => {
        const leaguePicks = picks.filter((pick: Pick) => pick.League === league);
        const picksCount = leaguePicks.length;
        const wins = leaguePicks.filter((pick: Pick) => pick.Result === 'Win').length;
        const losses = leaguePicks.filter((pick: Pick) => pick.Result === 'Loss').length;
        const pushes = leaguePicks.filter((pick: Pick) => pick.Result === 'Push').length;
        const decidedPicksForRoi = leaguePicks.filter((pick: Pick) => pick.Result === 'Win' || pick.Result === 'Loss');
        const profit = decidedPicksForRoi.reduce((acc: number, pick: Pick) => {
          if (pick.Result === 'Win') return acc + pick.Stake * (pick.Odds - 1);
          if (pick.Result === 'Loss') return acc - pick.Stake;
          return acc;
        }, 0);
        const totalDecidedStake = decidedPicksForRoi.reduce((acc: number, pick: Pick) => acc + pick.Stake, 0);
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
          profit: profit.toFixed(2),
          roi: roi.toFixed(2),
        };
      });

      const lastBets = picks.slice(0, 9).map((pick: Pick) => {
        const profit = pick.Result === 'Win' ? pick.Stake * (pick.Odds - 1) : pick.Result === 'Loss' ? -pick.Stake : 0;
        return {
          id: pick.id.toString(),
          bet: pick.Pick,
          sport: pick.League,
          date: new Date(pick.Date).toISOString(),
          result: pick.Result,
          odds: pick.Odds,
          stake: pick.Stake,
          profit: profit.toFixed(2),
        };
      });

      return {
        totalPicks: totalPicks.toString(),
        winRate: winRate.toFixed(1),
        profit: totalProfit.toFixed(2),
        roi: roi.toFixed(1),
        sportsPerformance,
        lastBets,
      };
    } catch (error) {
      console.error('Error calculating stats:', error);
      ctx.throw(500, 'Error calculating stats');
    }
  },

  async getAllForStats(ctx: Context, next: () => Promise<void>) {
    try {
      const requestMode = ctx.query.mode || 'calculated';

      if (requestMode === 'calculated') {
        console.log('Returning pre-calculated statistics...');
        const stats = await calculateStatisticsDirectly(strapi);
        return stats;
      } else {
        console.log('Fetching all raw picks for statistics page...');
        const picks = await strapi.db.query('api::pick.pick').findMany({
          select: ['id', 'documentId', 'League', 'Date', 'Away', 'Home', 'Pick', 'Stake', 'Odds', 'Result', 'Summary', 'Slug'],
          orderBy: { id: 'asc' },
          limit: 10000,
        });

        console.log(`Successfully fetched ${picks.length} raw picks for statistics`);
        const formattedPicks = picks.map((pick: Pick) => ({
          ...pick,
          documentId: pick.documentId || String(pick.id),
        }));

        return { data: formattedPicks };
      }
    } catch (error) {
      console.error('Error in statistics API:', error);
      ctx.throw(500, 'Error processing statistics');
    }
  },
}));