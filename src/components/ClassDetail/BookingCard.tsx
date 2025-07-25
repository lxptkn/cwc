'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { CookingClass } from '@/types'

interface BookingCardProps {
  cookingClass: CookingClass
}

export default function BookingCard({ cookingClass }: BookingCardProps) {
  const { data: session, status } = useSession()
  const [isBooking, setIsBooking] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [availableSpots, setAvailableSpots] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already booked for this class
  useEffect(() => {
    if (session?.user?.id && cookingClass.bookings) {
      const userBooking = cookingClass.bookings.find(
        booking => booking.userId === session.user!.id && booking.status === 'CONFIRMED'
      )
      setIsBooked(!!userBooking)
    }
  }, [session, cookingClass.bookings])

  // Calculate available spots
  useEffect(() => {
    if (cookingClass.bookings) {
      const confirmedBookings = cookingClass.bookings.filter(
        booking => booking.status === 'CONFIRMED'
      )
      const spots = cookingClass.maxStudents - confirmedBookings.length
      setAvailableSpots(Math.max(0, spots))
    }
  }, [cookingClass])

  const handleBooking = async () => {
    if (!session?.user?.id) {
      setError('Please sign in to book this class')
      return
    }

    if (availableSpots <= 0) {
      setError('This class is full')
      return
    }

    setIsBooking(true)
    setError(null)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classId: cookingClass.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book class')
      }

      setIsBooked(true)
      setAvailableSpots(prev => Math.max(0, prev - 1))
      // You could show a success message here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book class')
    } finally {
      setIsBooking(false)
    }
  }

  const handleCancelBooking = async () => {
    if (!session?.user?.id) return

    setIsBooking(true)
    setError(null)

    try {
      const userBooking = cookingClass.bookings?.find(
        booking => booking.userId === session.user!.id && booking.status === 'CONFIRMED'
      )

      if (!userBooking) {
        throw new Error('Booking not found')
      }

      const response = await fetch(`/api/bookings/${userBooking.id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel booking')
      }

      setIsBooked(false)
      setAvailableSpots(prev => prev + 1)
      // You could show a success message here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking')
    } finally {
      setIsBooking(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border sticky top-6">
        <div className="animate-pulse">
          <div className="h-6 bg-warm-gray rounded mb-4"></div>
          <div className="h-8 bg-warm-gray rounded mb-4"></div>
          <div className="h-4 bg-warm-gray rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border sticky top-6">
      <h3 className="text-xl font-semibold text-warm-fg mb-4">Book This Class</h3>
      
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-3xl font-bold text-warm-green">${cookingClass.price}</span>
          <span className="text-warm-fg-muted ml-2">per person</span>
        </div>

        {/* Availability Info */}
        <div className="text-center text-sm">
          <span className={`font-medium ${availableSpots > 0 ? 'text-warm-green' : 'text-warm-orange'}`}>
            {availableSpots > 0 ? `${availableSpots} spots available` : 'Class is full'}
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* Booking Button */}
        {!isBooked ? (
          <Button 
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-smooth ${
              availableSpots > 0 && session?.user?.id
                ? 'bg-warm-orange hover:bg-warm-orange/90 text-black'
                : 'bg-warm-gray text-warm-fg-muted cursor-not-allowed'
            }`}
            onClick={handleBooking}
            disabled={isBooking || availableSpots <= 0 || !session?.user?.id}
          >
            {isBooking ? 'Booking...' : 
             !session?.user?.id ? 'Sign in to Book' :
             availableSpots <= 0 ? 'Class Full' : 'Book Now'}
          </Button>
        ) : (
          <Button 
            className="w-full bg-warm-teal hover:bg-warm-teal/90 text-black font-semibold py-3 px-6 rounded-lg transition-smooth"
            onClick={handleCancelBooking}
            disabled={isBooking}
          >
            {isBooking ? 'Cancelling...' : 'Cancel Booking'}
          </Button>
        )}
        
        <div className="text-center text-sm text-warm-fg-muted">
          <p>Secure booking • Free cancellation</p>
          <p>Instant confirmation</p>
        </div>

        {/* Sign in prompt */}
        {!session?.user?.id && (
          <div className="text-center text-sm text-warm-fg-muted">
            <p>Please sign in to book this class</p>
          </div>
        )}
      </div>
    </div>
  )
} 