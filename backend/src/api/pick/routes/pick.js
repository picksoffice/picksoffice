'use strict';

/**
 * pick router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// Route mit öffentlichen Berechtigungen
const defaultRouter = createCoreRouter('api::pick.pick', {
  config: {
    find: {
      policies: [],
      middlewares: [],
    },
    findOne: {
      policies: [],
      middlewares: [],
    },
    count: {
      policies: [],
      middlewares: [],
    },
  }
});

module.exports = defaultRouter;