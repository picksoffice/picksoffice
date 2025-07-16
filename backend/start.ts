const { createStrapi } = require('@strapi/strapi');
console.log('Custom Strapi start...');
console.log('Node.js version:', process.version);
console.log('Strapi version:', require('@strapi/strapi/package.json').version);
console.log('Checking database configuration...');

// Prüfen, ob die NODE_ENV gesetzt ist
if (!process.env.NODE_ENV) {
  console.log('NODE_ENV not set, defaulting to production');
  process.env.NODE_ENV = 'production';
}

// Vorprüfung der Datenbankkonfiguration
try {
  const config = require('./config/database.ts')({ env: (key, defaultValue) => {
    return process.env[key] !== undefined ? process.env[key] : defaultValue;
  }});
  console.log('Database configuration loaded successfully');
} catch (error) {
  console.error('Error pre-loading database config:', error);
  console.error('This is just a pre-check, will continue anyway');
}

async function start() {
  try {
    console.log('Creating Strapi instance...');
    const appDir = process.cwd();
    console.log('App directory:', appDir);
    
    const instance = await createStrapi({
      dir: appDir,
      distDir: './dist',  // Wichtig: Lädt kompilierte TS-Configs (z. B. database.js) aus ./dist
      autoReload: false,
      serveAdminPanel: true,
    });
    
    console.log('Starting Strapi...');
    await instance.start();
    console.log('Strapi started successfully!');
  } catch (error) {
    console.error('Error starting Strapi:', error);
    process.exit(1);
  }
}

start().catch(error => {
  console.error('Failed to start Strapi:', error);
  process.exit(1);
});