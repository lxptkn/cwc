import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Check counts
    const userCount = await prisma.user.count()
    const classCount = await prisma.class.count()
    
    // Get sample data
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    })
    
    const classes = await prisma.class.findMany({
      select: { id: true, title: true, instructorName: true }
    })
    
    return NextResponse.json({
      userCount,
      classCount,
      users,
      classes,
      message: 'Database check completed'
    })
  } catch (error) {
    console.error('Database check error:', error)
    return NextResponse.json({ 
      error: 'Database check failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
