#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Generate secure random strings
function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('base64');
}

// Generate multiple secrets
const secrets = {
  APP_KEYS: [generateSecret(), generateSecret(), generateSecret(), generateSecret()].join(','),
  API_TOKEN_SALT: generateSecret(),
  ADMIN_JWT_SECRET: generateSecret(),
  TRANSFER_TOKEN_SALT: generateSecret(),
  JWT_SECRET: generateSecret(48), // Longer for JWT
};

console.log('🔐 Generated Secure Secrets:\n');
console.log('Add these to your backend .env file:\n');

Object.entries(secrets).forEach(([key, value]) => {
  console.log(`${key}=${value}`);
});

console.log('\n✅ Copy these values to your .env file');
console.log('⚠️  NEVER commit these secrets to version control!');

// Optionally create a .env.local file
const envPath = path.join(__dirname, '../backend/.env.local');
if (!fs.existsSync(envPath)) {
  const envContent = Object.entries(secrets)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  fs.writeFileSync(envPath, envContent);
  console.log(`\n📄 Created ${envPath} with secure secrets`);
}