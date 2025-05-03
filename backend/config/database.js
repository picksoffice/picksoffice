module.exports = ({ env }) => {
  console.log('DATABASE_URL:', env('DATABASE_URL'));
  console.log('DATABASE_CLIENT:', env('DATABASE_CLIENT'));
  return {
    connection: {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'),
        ssl: { rejectUnauthorized: true },
      },
      pool: { min: 2, max: 10 },
    },
  };
};