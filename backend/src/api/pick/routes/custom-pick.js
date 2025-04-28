// src/api/pick/routes/custom-pick.js
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/picks/stats',
      handler: 'pick.calculateStats',
      config: {
        policies: [], // Öffentlicher Zugriff
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/picks/all-for-stats',
      handler: 'pick.getAllForStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};