/**
 * pick controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::pick.pick', ({ strapi }) => ({
  async calculateStats(ctx) {
    try {
      const picks = await strapi.entityService.findMany('api::pick.pick', {
        sort: { Date: 'desc' },
        fields: ['League', 'Result', 'Odds', 'Stake', 'Date'],
      });

      const totalPicks = picks.length;
      const wins = picks.filter((pick) => pick.Result === 'Win').length;
      const losses = picks.filter((pick) => pick.Result === 'Loss').length;
      const totalDecidedPicks = wins + losses;
      const winRate = totalDecidedPicks > 0 ? (wins / totalDecidedPicks) * 100 : 0;

      let totalProfit = 0;
      let totalStake = 0;

      picks.forEach((pick) => {
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

      return {
        totalPicks: totalPicks.toString(),
        winRate: winRate.toFixed(1),
        profit: totalProfit.toFixed(2),
        roi: roi.toFixed(1),
      };
    } catch (error) {
      console.error('Error calculating stats:', error);
      ctx.throw(500, 'Error calculating stats');
    }
  },
}));