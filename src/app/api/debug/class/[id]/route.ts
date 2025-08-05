import { NextRequest, NextResponse } from 'next/server'
import { getClassById } from '@/services/class-service'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid class ID' },
        { status: 400 }
      )
    }

    console.log(`Debug: Attempting to fetch class with ID: ${id}`)
    
    // Get session info
    const session = await auth()
    console.log(`Debug: Session:`, {
      hasSession: !!session,
      userId: session?.user?.id,
      userEmail: session?.user?.email
    })
    
    // Try direct Prisma query first
    const directClass = await prisma.class.findUnique({
      where: { id },
      include: { instructor: true }
    })
    console.log(`Debug: Direct Prisma query result:`, directClass)
    
    // Try service function
    const cookingClass = await getClassById(id)
    console.log(`Debug: Service function result:`, cookingClass)
    
    if (!cookingClass) {
      return NextResponse.json(
        { 
          error: 'Class not found', 
          id,
          session: {
            hasSession: !!session,
            userId: session?.user?.id
          },
          directQuery: directClass ? 'Found via direct query' : 'Not found via direct query'
        },
        { status: 404 }
      )
    }

    // Check if user is instructor
    const isInstructor = session?.user?.id === cookingClass.instructorId
    console.log(`Debug: Instructor check:`, {
      sessionUserId: session?.user?.id,
      classInstructorId: cookingClass.instructorId,
      isInstructor
    })

    return NextResponse.json({ 
      success: true, 
      class: cookingClass,
      id: id,
      session: {
        hasSession: !!session,
        userId: session?.user?.id,
        userEmail: session?.user?.email
      },
      instructorCheck: {
        sessionUserId: session?.user?.id,
        classInstructorId: cookingClass.instructorId,
        isInstructor
      }
    })
  } catch (error) {
    console.error('Debug: Error fetching class by ID:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 