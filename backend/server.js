const strapi = require('@strapi/strapi');

strapi({
  dir: process.cwd(),
  distDir: './dist',  // Explizit den kompilierten Ordner laden
  serveAdminPanel: true,
  autoReload: false
}).start()
  .then(() => {
    console.log('✅ Strapi server started successfully');
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Database URL: ${process.env.DATABASE_URL ? 'Set' : 'Not set'}`);
    console.log(`Port: ${process.env.PORT || 1337}`);
    console.log(`Host: ${process.env.HOST || 'localhost'}`);
  })
  .catch((error) => {
    console.error('❌ Failed to start Strapi:', error);
    process.exit(1);
  });