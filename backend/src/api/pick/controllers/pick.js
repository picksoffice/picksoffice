'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pick.pick', ({ strapi }) => ({
  async stats(ctx) {
    try {
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
      console.log('Fetching all picks for statistics page...');
      
      // Hole alle Picks mit den notwendigen Feldern für die Statistikberechnung
      // Feste Limit-Parameter verwenden für konsistente Ergebnisse
      const picks = await strapi.db.query('api::pick.pick').findMany({
        select: [
          'id', 'documentId', 'League', 'Date', 'Away', 'Home', 'Pick', 
          'Stake', 'Odds', 'Result', 'Summary', 'Slug', 'createdAt', 
          'updatedAt', 'publishedAt', 'Author'
        ],
        orderBy: { id: 'asc' }, // Nach ID sortieren für konsistente Ergebnisse
        limit: 10000, // Hohes Limit setzen, um alle Picks zu erhalten
      });
      
      // Anzahl der geholten Picks ausgeben
      console.log(`Successfully fetched ${picks.length} picks for statistics`);
      
      // Picks für das Frontend-Format transformieren
      const formattedPicks = picks.map(pick => {
        return {
          ...pick,
          documentId: pick.documentId || String(pick.id) // DocumentID sicherstellen
        };
      });
      
      // Ergebnis zurückgeben
      return { data: formattedPicks };
    } catch (error) {
      console.error('Error fetching all picks for stats:', error);
      ctx.throw(500, 'Error fetching picks for statistics');
    }
  },
}));