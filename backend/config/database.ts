module.exports = ({ env }) => {
  // Fallback if env function is not available
  const getEnv = (key, defaultValue) => {
    if (typeof env === 'function') {
      return env(key, defaultValue);
    }
    return process.env[key] || defaultValue;
  };

  const databaseUrl = getEnv('DATABASE_URL', '');  // Hinzugefügt: Default-Wert (z. B. '')

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
        keepAlive: true,  // Hinzugefügt: Verhindert Idle-Timeouts
        ssl: {
          rejectUnauthorized: false  // Für Render's self-signed Certs
        }
      },
      pool: {
        min: 0,
        max: 10,
        acquireTimeoutMillis: 120000,  // Erhöht: 120s Timeout
        createTimeoutMillis: 60000,  // Erhöht
        destroyTimeoutMillis: 10000,  // Erhöht
        idleTimeoutMillis: 60000,  // Erhöht
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200  // Erhöht
      }
    },
    debug: true  // Aktiviere für mehr DB-Logs
  };

  console.log('Database config loaded successfully');
  return config;
};