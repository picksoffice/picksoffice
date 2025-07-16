module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS') // Parst das komma-separierte APP_KEYS als Array
  },
  // Proxy settings für Render
  proxy: true,
  url: env('PUBLIC_URL', 'https://picksoffice.onrender.com'), // Für CORS und URLs
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});