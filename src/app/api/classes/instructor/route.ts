import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getInstructorClasses } from '@/services/class-service'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const result = await getInstructorClasses(session.user.id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching instructor classes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch instructor classes' },
      { status: 500 }
    )
  }
} 