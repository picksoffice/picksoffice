module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  encryption: {
    key: env('ENCRYPTION_KEY', 'ein-generierter-32-byte-key-in-base64'),  // Fallback; generiere neu
  },
});