module.exports = ({ env }) => {
  // Fallback if env function is not available
  const getEnv = (key, defaultValue) => {
    if (typeof env === 'function') {
      return env(key, defaultValue);
    }
    return process.env[key] || defaultValue;
  };

  const databaseUrl = getEnv('DATABASE_URL');

  console.log('Environment variables:', typeof env === 'function' ? 'env function exists' : 'env function missing');
  console.log('DATABASE_URL:', databaseUrl ? 'Set' : 'Not set');

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
  }

  const config = {
    connection: {
      client: 'postgres',
      connection: {
        connectionString: databaseUrl,
        ssl: {
          rejectUnauthorized: false  // Für Render's self-signed Certs
        }
      },
      pool: {
        min: 0,
        max: 10,
        acquireTimeoutMillis: 60000,  // 60s Timeout
        createTimeoutMillis: 30000,
        destroyTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100
      }
    },
    debug: true  // Aktiviere für mehr DB-Logs
  };

  console.log('Database config loaded successfully');
  return config;
};