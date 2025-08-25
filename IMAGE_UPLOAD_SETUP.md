# Image Upload Setup Guide

## Problem
The previous image upload system was trying to write files to the local filesystem, which doesn't work in production (especially on Vercel) because:
- Vercel has a read-only filesystem
- Files would be lost on server restarts
- Doesn't scale across multiple server instances

## Solution: Supabase Storage (Using Your Existing Database!)

Since you already have a Supabase database connected to your Vercel deployment, we can use the same project for file storage! This means:
- ✅ **No new project setup** - use your existing Supabase project
- ✅ **Same environment variables** - just add one more key
- ✅ **Persistent file storage** - files never get lost
- ✅ **CDN distribution** - fast image loading
- ✅ **Works in production** - including Vercel

## Setup Steps

### 1. Add Storage Buckets to Your Existing Supabase Project
In your existing Supabase dashboard:
1. Go to **Storage** (in the left sidebar)
2. Create two buckets:
   - `classes` (for class images)
   - `profiles` (for profile images)
3. Set both buckets to **public** (for public image access)

### 2. Get Your Service Role Key
You already have these environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` ✅
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅

You need to add one more:
- `SUPABASE_SERVICE_ROLE_KEY` (for server-side uploads)

**To get the service role key:**
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **service_role** key (not the anon key)
3. Add it to your `.env.local` file and Vercel environment variables

### 3. Update Environment Variables
Add this to your existing `.env.local` file:

```bash
# Add this line to your existing Supabase config
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important:** The service role key has admin privileges, so keep it secure and only use it server-side.

### 4. Storage Bucket Policies
In Supabase, set the following policies for each bucket:

**For `classes` bucket:**
```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'classes');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'classes' AND auth.role() = 'authenticated');
```

**For `profiles` bucket:**
```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'profiles');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profiles' AND auth.role() = 'authenticated');
```

### 5. Test the Connection
1. Visit `/api/upload/test` in your browser
2. You should see a success message with your bucket names
3. If there's an error, check the console for details

### 6. Test the Upload
1. Try uploading an image in the class creation or profile edit forms
2. Check the browser console for any errors
3. Verify images appear in your Supabase Storage dashboard

## What We've Done

1. **Updated Upload API** - Now uses your existing Supabase project
2. **Centralized Client** - Created `src/lib/supabase.ts` for reuse
3. **Better Error Handling** - Clear messages when something goes wrong
4. **Test Endpoint** - `/api/upload/test` to verify connection

## Troubleshooting

### Common Issues:

1. **"Supabase admin client not available"**
   - Check that `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
   - Restart your development server after adding the variable
   - Verify the key is correct (copy from Supabase dashboard)

2. **"Failed to upload file to storage"**
   - Check that storage buckets exist in your Supabase project
   - Verify bucket policies allow uploads
   - Check browser console for detailed error messages

3. **Images not displaying**
   - Verify buckets are set to public
   - Check the returned URL in browser console
   - Ensure bucket policies allow public read access

### Testing Locally:
1. Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
2. Run `npm run dev`
3. Visit `/api/upload/test` to verify connection
4. Try uploading a test image

### Production Deployment:
1. Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables
2. The other Supabase variables should already be there
3. Test uploads in production environment

## Why This Approach?

- **Reuses existing infrastructure** - No need for separate services
- **Same security model** - Uses your existing Supabase project
- **Easier maintenance** - One place to manage both database and storage
- **Cost effective** - Supabase storage is included with your database plan

Your image uploads should now work perfectly in both development and production! 🎉
