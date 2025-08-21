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

# NextAuth
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app

# Optional: Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key

# Optional: Upload Secret
UPLOAD_SECRET=your-upload-secret
```

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

2. **Verify Deployment**:
   - Check your domain
   - Test authentication
   - Verify database connections

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
