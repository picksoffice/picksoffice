'use strict';

module.exports = {
  async check(ctx) {
    try {
      // Check database connection
      const knex = strapi.db.connection;
      await knex.raw('SELECT 1');
      
      ctx.body = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: 'connected',
        node_version: process.version,
        strapi_version: strapi.config.info.strapi,
      };
    } catch (error) {
      ctx.status = 503;
      ctx.body = {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error.message,
      };
    }
  },
};