module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'YexWm8EstTDVcIaySkYbWA=='),  // Fallback nur lokal; generiert mit crypto
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'qwN/iMd+NS5s6+IMuzlFwg=='),  // Fallback nur lokal; generiert mit crypto
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'ESIXHHZiKxINZEhACsOScA=='),  // Fallback nur lokal; generiert mit crypto
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});