module.exports = ({ env }) => {
  // Fallback if env function is not available
  const getEnv = (key, defaultValue) => {
    if (typeof env === 'function') {
      return env(key, defaultValue);
    }
    return process.env[key] || defaultValue;
  };

  const databaseUrl = getEnv('DATABASE_URL', '');

  console.log('Environment variables:', typeof env === 'function' ? 'env function exists' : 'env function missing');
  console.log('DATABASE_URL:', databaseUrl ? 'Set' : 'Not set');

  if (!databaseUrl && process.env.NODE_ENV === 'production') {
    throw new Error('DATABASE_URL is required in production');
  }

  // Fallback für lokale Development (z. B. SQLite, um Builds zu erlauben)
  if (!databaseUrl) {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: '.tmp/data.db'  // Lokale SQLite-DB für Tests
        },
        useNullAsDefault: true,
        debug: true
      }
    };
  }

  // Production-Config (Postgres auf Render)
  const config = {
    connection: {
      client: 'postgres',
      connection: {
        connectionString: databaseUrl,
        keepAlive: true,  // Verhindert Idle-Timeouts
        ssl: {
          rejectUnauthorized: false  // Erlaubt self-signed Certs
        }
      },
      pool: {
        min: 0,  // Erlaubt Pool-Leerung
        max: 10,
        acquireTimeoutMillis: 120000,  // 120s Timeout
        createTimeoutMillis: 60000,
        destroyTimeoutMillis: 10000,
        idleTimeoutMillis: 60000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200
      }
    },
    debug: true  // Mehr DB-Logs
  };

  console.log('Database config loaded successfully');
  return config;
};