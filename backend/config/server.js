module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('RENDER_EXTERNAL_URL', 'https://picksoffice.onrender.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    url: '/dashboard',
  },
});