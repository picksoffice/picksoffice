module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false) // False für Render's self-signed Certs
      }
    },
    // Erhöhe Pool-Settings, um Timeouts zu vermeiden
    pool: {
      min: 0,
      max: 10, // Erhöhe bei vielen Collections
      acquireTimeoutMillis: 60000, // 60s Timeout
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
    debug: false
  }
});