// src/api/pick/controllers/pick.js
'use strict';

/**
 * pick controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pick.pick', ({ strapi }) => ({
  async calculateStats(ctx) {
    try {
      // Alle Picks abrufen (ohne Pagination, um alles auf einmal zu laden)
      const picks = await strapi.entityService.findMany('api::pick.pick', {
        sort: { Date: 'desc' },
        populate: '*',
      });

      // Total Picks
      const totalPicks = picks.length;

      // Win Rate: Wins / (Wins + Losses) * 100
      const wins = picks.filter(pick => pick.Result === 'Win').length;
      const losses = picks.filter(pick => pick.Result === 'Loss').length;
      const totalDecidedPicks = wins + losses;
      const winRate = totalDecidedPicks > 0 ? (wins / totalDecidedPicks) * 100 : 0;

      // Profit und Gesamteinsatz
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

      // ROI = (Gesamtprofit / Gesamteinsatz) * 100
      const roi = totalStake > 0 ? (totalProfit / totalStake) * 100 : 0;

      // Statistiken zurückgeben
      return {
        totalPicks: totalPicks.toString(),
        winRate: winRate.toFixed(1),
        profit: totalProfit.toFixed(2),
        roi: roi.toFixed(1),
      };
    } catch (error) {
      ctx.throw(500, 'Error calculating stats');
    }
  },
}));