import { NextRequest, NextResponse } from 'next/server'
import { getClassById } from '@/services/class-service'

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

    const cookingClass = await getClassById(id)
    
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