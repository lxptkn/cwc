#!/usr/bin/env node

/**
 * Production Database Seeding Script
 * 
 * This script can be run:
 * 1. Via Vercel build hook after deployment
 * 2. Manually via Vercel CLI: vercel run scripts/seed-production.js
 * 3. As a GitHub Action after deployment
 */

const { execSync } = require('child_process');
const path = require('path');

async function seedProduction() {
  try {
    console.log('🌱 Starting production database seeding...');
    
    // Check if we're in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️  Not in production environment, skipping...');
      return;
    }

    // Check if seeding is allowed
    if (process.env.ALLOW_PRODUCTION_SEEDING !== 'true') {
      console.log('⚠️  Production seeding disabled. Set ALLOW_PRODUCTION_SEEDING=true to enable.');
      return;
    }

    console.log('✅ Production seeding enabled, proceeding...');

    // Run Prisma migrations first
    console.log('🔄 Running database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    // Generate Prisma client
    console.log('🔧 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    // Run the seed script
    console.log('🌱 Running seed script...');
    execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit' });

    console.log('✅ Production seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during production seeding:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedProduction();
}

module.exports = { seedProduction };
