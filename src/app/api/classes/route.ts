import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllClasses, createClass } from '@/services/class-service';
import { CreateClassData } from '@/types';

export async function GET() {
  const { classes, error } = await getAllClasses();
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ classes });
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const classData: CreateClassData = await request.json()
    
    // Basic validation
    if (!classData.title || !classData.description || !classData.location) {
      return NextResponse.json(
        { error: 'Title, description, and location are required' },
        { status: 400 }
      )
    }

    if (classData.price <= 0) {
      return NextResponse.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      )
    }

    if (classData.maxStudents <= 0) {
      return NextResponse.json(
        { error: 'Maximum students must be greater than 0' },
        { status: 400 }
      )
    }

    const result = await createClass(classData, session.user.id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating class:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create class' },
      { status: 500 }
    )
  }
} 