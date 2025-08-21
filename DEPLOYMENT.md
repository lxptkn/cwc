# 🚀 Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Database**: Set up a PostgreSQL database (recommended: Supabase, Neon, or Railway)

## Step 1: Database Setup

### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your database connection string from Settings > Database
3. Run migrations: `npx prisma migrate deploy`

### Option B: Neon
1. Go to [neon.tech](https://neon.tech) and create a new project
2. Get your database connection string
3. Run migrations: `npx prisma migrate deploy`

## Step 2: Environment Variables

Set these in your Vercel project dashboard:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database_name

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app

# Database Seeding (Production)
ALLOW_PRODUCTION_SEEDING=false

# Optional: Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key

# Optional: Upload Secret
UPLOAD_SECRET=your-upload-secret
```

### **🔐 NextAuth Secret Generation**

Generate a secure secret using our script:

```bash
# Run locally
node scripts/generate-secret.js

# Copy the generated secret to Vercel environment variables
```

### **🌐 NextAuth URL Configuration**

**Important**: Set `NEXTAUTH_URL` to your exact Vercel domain:
- ✅ `https://your-app.vercel.app`
- ❌ `http://localhost:3000`
- ❌ `https://yourdomain.com` (unless you have a custom domain)

## NextAuth.js + Vercel Integration

### **✅ What Works Automatically:**
- **JWT Strategy**: No database sessions needed
- **API Routes**: `/api/auth/[...nextauth]` becomes a serverless function
- **User Management**: Stored in your Supabase database
- **Authentication Flow**: Email/password with bcrypt hashing

### **🔧 Production Optimizations Added:**
- **Secure Cookies**: `__Secure-` prefix in production
- **HTTPS Enforcement**: Secure cookies on production
- **Session Management**: 30-day session expiry
- **Error Handling**: Dedicated error page
- **Role-based Access**: User roles in JWT tokens

### **🚀 Authentication Flow:**
1. User signs up with email/password
2. Password is hashed with bcrypt
3. User logs in with credentials
4. NextAuth creates JWT token
5. Token stored in secure HTTP-only cookie
6. User stays logged in across sessions

## Step 3: Deploy to Vercel

1. **Connect Repository**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select the repository

2. **Configure Project**:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Environment Variables**:
   - Add all variables from Step 2
   - Make sure `DATABASE_URL` is set correctly

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

## Step 4: Post-Deployment

1. **Run Database Migrations**:
   ```bash
   npx prisma migrate deploy
   ```

2. **Seed Production Database** (Optional):
   
   **Option A: Via Vercel Build Hook**
   - Set `ALLOW_PRODUCTION_SEEDING=true` in Vercel environment variables
   - The seed script will run automatically after each deployment
   
   **Option B: Manual Seeding**
   ```bash
   # Via Vercel CLI
   vercel run scripts/seed-production.js
   
   # Or directly
   npx ts-node prisma/seed.ts
   ```
   
   **Option C: GitHub Actions**
   - Create a workflow that runs after deployment
   - Use the seed script in your CI/CD pipeline

3. **Verify Deployment**:
   - Check your domain
   - Test authentication
   - Verify database connections
   - Confirm seeded data is visible

## Database Seeding Strategy

### **What Gets Seeded:**
- ✅ 5 instructor profiles with full details
- ✅ Sample cooking classes with images
- ✅ Proper relationships between instructors and classes
- ✅ All images from your `public/images/` folder

### **Safety Features:**
- 🔒 Only seeds if `ALLOW_PRODUCTION_SEEDING=true`
- 🔒 Checks if data already exists (won't duplicate)
- 🔒 Production environment validation
- 🔒 Comprehensive error handling

### **Images and Assets:**
- 🖼️ All images in `public/images/` are automatically deployed
- 🖼️ SVG class images and instructor profile images included
- 🖼️ No additional upload needed - images are part of your codebase

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` format
   - Check database firewall settings
   - Ensure database is accessible from Vercel

3. **Authentication Issues**:
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain
   - Ensure API routes are working

### Performance Optimization

1. **Enable Edge Functions** for API routes
2. **Use Image Optimization** for better Core Web Vitals
3. **Enable Analytics** in Vercel dashboard

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Function Logs**: Check API route performance
- **Database Monitoring**: Use your database provider's tools

## Security Checklist

- [ ] Environment variables are set (not in code)
- [ ] Database connection uses SSL
- [ ] NextAuth secret is strong and unique
- [ ] API routes have proper validation
- [ ] CORS is configured if needed
- [ ] Rate limiting is implemented

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [prisma.io/docs](https://prisma.io/docs)
