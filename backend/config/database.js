console.log('Using simplified database.js version 5.1');
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
            ssl: { rejectUnauthorized: false }, // SSL-Zertifikatprüfung deaktiviert
          }
        : {
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', 'strapi'),
            ssl: env.bool('DATABASE_SSL', false) && {
              rejectUnauthorized: false, // SSL-Zertifikatprüfung deaktiviert
            },
          },
      pool: { min: 2, max: 10 },
    },
  };
};