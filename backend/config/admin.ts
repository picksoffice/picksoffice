module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c2FsdGVkX1/6z8yq0RjP8W/5K9L7G4H3'),  // Fallback nur lokal; neu generiert
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'dGVzdFNhbHQxMjM0NTY3ODkwYWJjZGVm'),  // Fallback nur lokal; neu generiert
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'YW5vdGhlclNhbHQ5ODc2NTQzMjE=')  // Fallback nur lokal; neu generiert
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});