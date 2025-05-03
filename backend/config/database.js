console.log('Using simplified database.js version 5.0');
module.exports = ({ env }) => {
  console.log('Loading database configuration...');
  
  if (!env('DATABASE_URL')) {
    console.error('ERROR: DATABASE_URL is not defined');
  }
  
  return {
    connection: {
      client: env('DATABASE_CLIENT', 'postgres'),
      connection: env('DATABASE_URL')
        ? {
            connectionString: env('DATABASE_URL'),
            ssl: { rejectUnauthorized: true },
          }
        : {
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', 'strapi'),
            ssl: env.bool('DATABASE_SSL', false) && {
              rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
            },
          },
      pool: { min: 2, max: 10 },
    },
  };
};