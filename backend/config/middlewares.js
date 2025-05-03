module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:3000', 'http://localhost:1337', '*'], // Vorübergehend alle Domains erlauben
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Erlaubte Methoden
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'], // Erlaubte Header
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
