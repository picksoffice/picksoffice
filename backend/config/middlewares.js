module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: (ctx) => {
        const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
          ? process.env.CORS_ALLOWED_ORIGINS.split(',')
          : ['http://localhost:3000', 'http://localhost:1337'];
        
        const origin = ctx.request.header.origin;
        if (allowedOrigins.includes(origin)) {
          return origin;
        }
        return allowedOrigins[0]; // Return first allowed origin as default
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      credentials: true, // Enable cookies for httpOnly JWT
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
