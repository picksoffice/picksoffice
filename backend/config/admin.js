module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ein-fallback-secret-fuer-lokal'),  // Fallback für lokal
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'ein-generierter-fallback-salt'),  // Generiere mit crypto.randomBytes(16).toString('base64')
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'ein-weiterer-fallback-salt'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});