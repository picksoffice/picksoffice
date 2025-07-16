console.log('Using simplified database.js version 6.0');
module.exports = ({ env }) => {
  console.log('Loading database configuration...');
  
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
    console.error('ERROR: DATABASE_URL is not defined');
    throw new Error('DATABASE_URL is required');
  }
  
  const config = {
    connection: {
      client: 'postgres',
      connection: {
        connectionString: databaseUrl,
        ssl: { rejectUnauthorized: false },
      },
      pool: { min: 2, max: 10 },
    },
  };
  
  console.log('Database config loaded successfully');
  return config;
};