const { createStrapi } = require('@strapi/strapi');
console.log('Custom Strapi start...');
console.log('Node.js version:', process.version);
console.log('Strapi version:', require('@strapi/strapi/package.json').version);
console.log('Checking database configuration...');
try {
  const config = require('./config/database.js')({ env: () => process.env });
  console.log('Loaded database config:', JSON.stringify(config, null, 2));
} catch (error) {
  console.error('Error loading database config:', error);
}
async function start() {
  const strapi = await createStrapi({ dir: '.' });
  await strapi.start();
}
start().catch(error => {
  console.error('Failed to start Strapi:', error);
  process.exit(1);
});