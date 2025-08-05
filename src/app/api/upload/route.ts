import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type - check both MIME type and file extension
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    
    const fileExtensionForValidation = file.name.toLowerCase().split('.').pop()
    const hasValidExtension = allowedExtensions.includes(`.${fileExtensionForValidation}`)
    const hasValidMimeType = allowedTypes.includes(file.type.toLowerCase())
    
    if (!hasValidMimeType && !hasValidExtension) {
      return NextResponse.json(
        { error: 'Only image files (JPG, PNG, GIF, WebP) are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Create unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    
    // Check if this is a profile image upload (from the profile form)
    const isProfileImage = formData.get('type') === 'profile'
    const fileName = isProfileImage 
      ? `profile-${timestamp}.${fileExtension}`
      : `class-${timestamp}.${fileExtension}`
    
    // Determine the upload directory based on type
    const uploadDir = isProfileImage 
      ? join(process.cwd(), 'public', 'profiles')
      : join(process.cwd(), 'public', 'classes')
    
    // Ensure the directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Write file to the appropriate folder
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = join(uploadDir, fileName)
    
    await writeFile(filePath, buffer)

    // Return the public URL
    const publicUrl = isProfileImage 
      ? `/profiles/${fileName}`
      : `/classes/${fileName}`

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      fileName: fileName 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
} 