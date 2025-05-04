console.log('Using simplified database.js version 4.0');
module.exports = ({ env }) => {
  console.log('Loading database configuration...');
  console.log('Environment variables:', Object.keys(env()));
  console.log('DATABASE_URL:', env('DATABASE_URL'));
  console.log('DATABASE_CLIENT:', env('DATABASE_CLIENT'));
  if (!env('DATABASE_URL')) {
    console.error('ERROR: DATABASE_URL is not defined');
  }
  const config = {
    connection: {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'),
        ssl: { rejectUnauthorized: true },
      },
      pool: { min: 2, max: 10 },
    },
  };
  console.log('Database config:', JSON.stringify(config, null, 2));
  return config;
};