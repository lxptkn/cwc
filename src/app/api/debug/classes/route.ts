import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Check total count
    const totalClasses = await prisma.class.count()
    
    // Get all classes with basic info
    const classes = await prisma.class.findMany({
      select: {
        id: true,
        title: true,
        instructorName: true,
        instructorId: true,
        createdAt: true
      }
    })
    
    // Check if instructor users exist
    const totalUsers = await prisma.user.count()
    const instructors = await prisma.user.findMany({
      where: { role: 'INSTRUCTOR' },
      select: { id: true, name: true, email: true }
    })
    
    return NextResponse.json({
      totalClasses,
      totalUsers,
      instructors,
      classes,
      message: 'Debug info retrieved successfully'
    })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ 
      error: 'Debug failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
