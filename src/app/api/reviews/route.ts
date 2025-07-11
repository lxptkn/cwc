import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createReview, getClassReviews } from '@/services/review-service'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { classId, content, rating } = await request.json()
    
    if (!classId || !content || !rating) {
      return NextResponse.json(
        { error: 'Class ID, content, and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const result = await createReview({ classId, content, rating }, session.user.id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create review' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')
    
    if (!classId) {
      return NextResponse.json(
        { error: 'Class ID is required' },
        { status: 400 }
      )
    }

    const result = await getClassReviews(parseInt(classId))
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
} 