'use strict';

// src/api/pick/routes/custom-pick.js
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/picks/stats', 
      handler: 'api::pick.pick.stats',
      config: {
        policies: [], // Öffentlicher Zugriff
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/picks/all-for-stats',
      handler: 'api::pick.pick.getAllForStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};