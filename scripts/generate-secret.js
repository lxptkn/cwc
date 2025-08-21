#!/usr/bin/env node

/**
 * Generate NextAuth Secret
 * 
 * Run this script to generate a secure secret for NextAuth:
 * node scripts/generate-secret.js
 */

const crypto = require('crypto');

function generateSecret() {
  // Generate a random 32-byte secret
  const secret = crypto.randomBytes(32).toString('base64');
  
  console.log('🔐 Generated NextAuth Secret:');
  console.log('=====================================');
  console.log(secret);
  console.log('=====================================');
  console.log('');
  console.log('📝 Add this to your Vercel environment variables:');
  console.log('NEXTAUTH_SECRET=' + secret);
  console.log('');
  console.log('⚠️  Keep this secret secure and never commit it to version control!');
  
  return secret;
}

// Generate if run directly
if (require.main === module) {
  generateSecret();
}

module.exports = { generateSecret };
