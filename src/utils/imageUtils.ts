// Utility functions for handling images

export function getPlaceholderImage(text: string, width: number = 400, height: number = 300): string {
  // Create a simple placeholder image using canvas
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) {
    return '/placeholder.svg'
  }
  
  canvas.width = width
  canvas.height = height
  
  // Background
  ctx.fillStyle = '#f3f4f6'
  ctx.fillRect(0, 0, width, height)
  
  // Text
  ctx.fillStyle = '#6b7280'
  ctx.font = '16px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  const lines = text.split(' ')
  let y = height / 2
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, y + (index * 20))
  })
  
  return canvas.toDataURL()
}

export function getClassImagePath(className: string): string {
  // Convert class name to slug for image path
  const slug = className
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  
  return `/images/classes/${slug}.jpg`
}

export function getInstructorImagePath(instructorName: string): string {
  // Convert instructor name to slug for image path
  const slug = instructorName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  
  return `/images/instructors/${slug}.jpg`
}

export function getProfileImagePath(userId: string): string {
  return `/images/profiles/user-${userId}.jpg`
}

// Fallback images for when actual images are not available
export const FALLBACK_IMAGES = {
  class: '/placeholder.svg',
  instructor: '/placeholder.svg',
  profile: '/placeholder.svg'
}

// Image dimensions for different contexts
export const IMAGE_DIMENSIONS = {
  classCard: { width: 400, height: 300 },
  classDetail: { width: 800, height: 600 },
  instructorProfile: { width: 400, height: 400 },
  userProfile: { width: 200, height: 200 }
} 