import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getClassById, updateClass, deleteClass } from '@/services/class-service'
import { CreateClassData } from '@/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const classId = parseInt(id)
    
    if (isNaN(classId)) {
      return NextResponse.json(
        { error: 'Invalid class ID' },
        { status: 400 }
      )
    }

    const cookingClass = await getClassById(classId)
    
    if (!cookingClass) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(cookingClass)
  } catch (error) {
    console.error('Error fetching class by ID:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const classId = parseInt(id)
    
    if (isNaN(classId)) {
      return NextResponse.json(
        { error: 'Invalid class ID' },
        { status: 400 }
      )
    }

    const classData: Partial<CreateClassData> = await request.json()
    
    const result = await updateClass(classId, classData, session.user.id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating class:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update class' },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const classId = parseInt(id)
    
    if (isNaN(classId)) {
      return NextResponse.json(
        { error: 'Invalid class ID' },
        { status: 400 }
      )
    }

    const result = await deleteClass(classId, session.user.id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error deleting class:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete class' },
      { status: 400 }
    )
  }
} 