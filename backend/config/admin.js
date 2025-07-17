module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'n5p7r9t1v3x5z7b9d1f3h5j7l9n1p3r5'),  // Fallback nur lokal; neu generiert (32 chars)
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'a2c4e6g8i0k2m4o6q8s0u2w4y6a8c0e2'),  // Fallback nur lokal; neu generiert
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'b3d5f7h9j1l3n5p7r9t1v3x5z7b9d1f3'),  // Fallback nur lokal; neu generiert
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});