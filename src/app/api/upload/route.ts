import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received')
    
    // Check if we have admin access
    if (!supabaseAdmin) {
      console.error('Supabase admin client not available - missing service role key')
      return NextResponse.json(
        { error: 'Storage service not configured properly' },
        { status: 500 }
      )
    }
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      console.error('No file in request')
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    console.log('File received:', {
      name: file.name,
      size: file.size,
      type: file.type
    })

    // Validate file type - check both MIME type and file extension
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif']
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.heif']
    
    const fileExtensionForValidation = file.name.toLowerCase().split('.').pop()
    const hasValidExtension = allowedExtensions.includes(`.${fileExtensionForValidation}`)
    const hasValidMimeType = allowedTypes.includes(file.type.toLowerCase())
    
    console.log('File validation:', {
      extension: fileExtensionForValidation,
      hasValidExtension,
      hasValidMimeType,
      mimeType: file.type
    })
    
    if (!hasValidMimeType && !hasValidExtension) {
      console.error('Invalid file type:', file.type)
      return NextResponse.json(
        { error: 'Only image files (JPG, PNG, GIF, WebP, HEIC) are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.size)
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Create unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    
    // Check if this is a profile image upload
    const isProfileImage = formData.get('type') === 'profile'
    const fileName = isProfileImage 
      ? `profile-${timestamp}.${fileExtension}`
      : `class-${timestamp}.${fileExtension}`
    
    // Determine the bucket based on type
    const bucketName = isProfileImage ? 'profiles' : 'classes'
    
    console.log('Uploading to bucket:', bucketName, 'with filename:', fileName)
    
    // Convert File to Buffer for Supabase
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json(
        { error: `Failed to upload file to storage: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('File uploaded successfully:', data)

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    console.log('Public URL generated:', urlData.publicUrl)

    return NextResponse.json({ 
      success: true, 
      url: urlData.publicUrl,
      fileName: fileName 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
} 