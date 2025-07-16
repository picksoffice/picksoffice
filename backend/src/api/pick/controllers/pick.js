'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const cache = require('../../../config/cache');

module.exports = createCoreController('api::pick.pick', ({ strapi }) => ({
  // Override the default find method to add pagination and filtering
  async find(ctx) {
    // Extract query parameters
    const { page = 1, pageSize = 10, league, search, sort = 'Date:desc' } = ctx.query;
    
    // Build filters
    const filters = {};
    if (league && league !== 'all') {
      filters.League = league;
    }
    if (search) {
      filters.$or = [
        { Pick: { $containsi: search } },
        { Away: { $containsi: search } },
        { Home: { $containsi: search } },
      ];
    }
    
    // Parse sort parameter
    const [sortField, sortOrder] = sort.split(':');
    const orderBy = { [sortField]: sortOrder || 'desc' };
    
    try {
      // Calculate offset
      const offset = (parseInt(page) - 1) * parseInt(pageSize);
      
      // Get total count for pagination
      const total = await strapi.db.query('api::pick.pick').count({
        where: filters,
      });
      
      // Get paginated results
      const picks = await strapi.db.query('api::pick.pick').findMany({
        where: filters,
        orderBy,
        limit: parseInt(pageSize),
        offset,
      });
      
      // Calculate pagination metadata
      const pageCount = Math.ceil(total / parseInt(pageSize));
      
      return {
        data: picks,
        meta: {
          pagination: {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            pageCount,
            total,
          },
        },
      };
    } catch (error) {
      console.error('Error in paginated find:', error);
      ctx.throw(500, 'Error fetching picks');
    }
  },
  
  async stats(ctx) {
    try {
      // Check cache first
      const cacheKey = 'stats:overall';
      const cachedStats = cache.get(cacheKey);
      
      if (cachedStats) {
        console.log('Returning cached statistics');
        return cachedStats;
      }
      
      console.log('Fetching picks for statistics...');

      // Nur benötigte Felder laden
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

      // Gesamtstatistiken
      const totalPicks = picks.length;
      const wins = picks.filter(pick => pick.Result === 'Win').length;
      const losses = picks.filter(pick => pick.Result === 'Loss').length;
      const pushes = picks.filter(pick => pick.Result === 'Push').length;
      const decidedPicks = wins + losses;
      const winRate = decidedPicks > 0 ? (wins / decidedPicks) * 100 : 0;

      let totalProfit = 0;
      let totalStake = 0;
      picks.forEach(pick => {
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

      // Sportarten-Performance
      const leagues = [...new Set(picks.map(pick => pick.League))].sort();
      const sportsPerformance = leagues.map(league => {
        const leaguePicks = picks.filter(pick => pick.League === league);
        const picksCount = leaguePicks.length;
        const wins = leaguePicks.filter(pick => pick.Result === 'Win').length;
        const losses = leaguePicks.filter(pick => pick.Result === 'Loss').length;
        const pushes = leaguePicks.filter(pick => pick.Result === 'Push').length;
        const decidedPicksForRoi = leaguePicks.filter(pick => pick.Result === 'Win' || pick.Result === 'Loss');
        const profit = decidedPicksForRoi.reduce((acc, pick) => {
          if (pick.Result === 'Win') return acc + pick.Stake * (pick.Odds - 1);
          if (pick.Result === 'Loss') return acc - pick.Stake;
          return acc;
        }, 0);
        const totalDecidedStake = decidedPicksForRoi.reduce((acc, pick) => acc + pick.Stake, 0);
        const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
        const roi = totalDecidedStake > 0 ? (profit / totalDecidedStake) * 100 : 0;

        return {
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

      // Letzte 9 Wetten
      const lastBets = picks.slice(0, 9).map(pick => {
        const profit = pick.Result === 'Win' ? pick.Stake * (pick.Odds - 1) : pick.Result === 'Loss' ? -pick.Stake : 0;
        return {
          id: pick.id,
          bet: pick.Pick,
          sport: pick.League,
          date: new Date(pick.Date).toISOString(),
          result: pick.Result,
          odds: pick.Odds,
          stake: pick.Stake,
          profit: profit.toFixed(2),
        };
      });

      // Antwort
      const response = {
        totalPicks: totalPicks.toString(),
        winRate: winRate.toFixed(1),
        profit: totalProfit.toFixed(2),
        roi: roi.toFixed(1),
        sportsPerformance,
        lastBets,
      };
      
      // Cache the response
      cache.set(cacheKey, response);
      
      return response;
    } catch (error) {
      console.error('Error calculating stats:', error);
      ctx.throw(500, 'Error calculating stats');
    }
  },

  // Bestehende Endpunkte beibehalten
  async calculateStats(ctx) {
    try {
      return await this.stats(ctx);
    } catch (error) {
      console.error('Error in calculateStats:', error);
      ctx.throw(500, 'Error calculating stats');
    }
  },

  async getAllForStats(ctx) {
    try {
      // Implementiere einen neuen Ansatz mit zwei Optionen:
      // 1. Eine vereinfachte Version, die berechnete Statistiken zurückgibt
      // 2. Die Möglichkeit, alle rohen Daten zu bekommen
      
      // Prüfe, ob nur berechnete Stats angefordert werden
      const requestMode = ctx.query.mode || 'calculated';
      
      if (requestMode === 'calculated') {
        console.log('Returning pre-calculated statistics...');
        
        // Berechnung direkt im Backend durchführen für bessere Performance
        const stats = await this.calculateStatisticsDirectly();
        return stats;
      } else {
        console.log('Fetching all raw picks for statistics page...');
        
        // Hole alle Picks mit den notwendigen Feldern für die Statistikberechnung
        const picks = await strapi.db.query('api::pick.pick').findMany({
          select: [
            'id', 'documentId', 'League', 'Date', 'Away', 'Home', 'Pick', 
            'Stake', 'Odds', 'Result', 'Summary', 'Slug'
          ],
          orderBy: { id: 'asc' },
          limit: 10000,
        });
        
        console.log(`Successfully fetched ${picks.length} raw picks for statistics`);
        
        // Vereinfachte Datentransformation
        const formattedPicks = picks.map(pick => ({
          ...pick,
          documentId: pick.documentId || String(pick.id)
        }));
        
        return { data: formattedPicks };
      }
    } catch (error) {
      console.error('Error in statistics API:', error);
      ctx.throw(500, 'Error processing statistics');
    }
  },
  
  // Neue Hilfsmethode zur direkten Berechnung der Statistiken im Backend
  async calculateStatisticsDirectly() {
    // Check cache first
    const cacheKey = 'stats:calculated';
    const cachedStats = cache.get(cacheKey);
    
    if (cachedStats) {
      console.log('Returning cached calculated statistics');
      return cachedStats;
    }
    
    console.log('Calculating statistics directly in backend...');
    
    try {
      // Effizient nur die benötigten Felder laden
      const picks = await strapi.db.query('api::pick.pick').findMany({
        select: ['id', 'League', 'Result', 'Odds', 'Stake', 'Date', 'Pick', 'Away', 'Home'],
        orderBy: { Date: 'desc' }, // Nach Datum sortieren für neueste Picks zuerst
      });
      
      console.log(`Processing ${picks.length} picks for statistics`);
      
      // Gesamtstatistiken berechnen
      const totalPicks = picks.length;
      const wins = picks.filter(pick => pick.Result === 'Win').length;
      const losses = picks.filter(pick => pick.Result === 'Loss').length;
      const pushes = picks.filter(pick => pick.Result === 'Push').length;
      const pendingPicks = picks.filter(pick => pick.Result === 'Pending').length;
      const decidedPicks = wins + losses;
      const winRate = decidedPicks > 0 ? (wins / decidedPicks) * 100 : 0;
      
      // Profit berechnen
      let totalProfit = 0;
      let totalStake = 0;
      
      picks.forEach(pick => {
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
      
      // Statistiken nach Sportarten berechnen
      const desiredOrder = ['NBA', 'NFL', 'MLB', 'NHL', 'NCAAB', 'NCAAF', 'WNBA'];
      const leaguesSet = new Set(picks.map(pick => pick.League));
      const leagues = [...leaguesSet].sort((a, b) => {
        const aIndex = desiredOrder.indexOf(a);
        const bIndex = desiredOrder.indexOf(b);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
      
      const sportsPerformance = leagues.map((league, index) => {
        const leaguePicks = picks.filter(pick => pick.League === league);
        const leagueWins = leaguePicks.filter(pick => pick.Result === 'Win').length;
        const leagueLosses = leaguePicks.filter(pick => pick.Result === 'Loss').length;
        const leaguePushes = leaguePicks.filter(pick => pick.Result === 'Push').length;
        const leagueDecidedPicks = leaguePicks.filter(pick => pick.Result === 'Win' || pick.Result === 'Loss');
        
        let leagueProfit = 0;
        let leagueStake = 0;
        
        leagueDecidedPicks.forEach(pick => {
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
      
      // Letzte Wetten für die Anzeige
      const recentBets = picks.slice(0, 9).map((pick, index) => {
        const profit = pick.Result === 'Win' ? pick.Stake * (pick.Odds - 1) : 
                      pick.Result === 'Loss' ? -pick.Stake : 0;
                      
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
      
      // Gesamtstatistiken-Objekt
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
      
      // Finale Antwort
      const response = {
        overallStats,
        sportsPerformance,
        recentBets,
        pickCount: picks.length,
      };
      
      // Cache the response
      cache.set(cacheKey, response);
      
      return response;
    } catch (error) {
      console.error('Error calculating statistics directly:', error);
      throw error;
    }
  },
}));