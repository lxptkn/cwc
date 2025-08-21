import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { cancelBooking } from '@/services/booking-service'

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

    const bookingId = parseInt(id)
    
    if (isNaN(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      )
    }

    const result = await cancelBooking(bookingId, session.user.id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to cancel booking' },
      { status: 400 }
    )
  }
} 