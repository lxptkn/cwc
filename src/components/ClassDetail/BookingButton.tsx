import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import type { CookingClass } from '@/types'

interface BookingButtonProps {
  cookingClass: CookingClass
}

export default function BookingButton({ cookingClass }: BookingButtonProps) {
  const { data: session, status } = useSession()
  const [isBooking, setIsBooking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBooked, setIsBooked] = useState(false)
  
  // Update isBooked state when session or booking data changes
  useEffect(() => {
    if (!session?.user?.id || !cookingClass.bookings) {
      setIsBooked(false)
      return
    }
    const userBooking = cookingClass.bookings.find(
      booking => booking.userId === session.user!.id && booking.status === 'CONFIRMED'
    )
    setIsBooked(!!userBooking)
  }, [session?.user?.id, cookingClass.bookings])

  const availableSpots = cookingClass.bookings
    ? Math.max(0, cookingClass.maxStudents - cookingClass.bookings.filter(b => b.status === 'CONFIRMED').length)
    : cookingClass.maxStudents

  const handleClick = async () => {
    if (!session?.user?.id) {
      signIn()
      return
    }
    if (isBooked || availableSpots <= 0) return
    setIsBooking(true)
    setError(null)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId: cookingClass.id }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to book class')
      setIsBooked(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book class')
    } finally {
      setIsBooking(false)
    }
  }

  let buttonText = 'Book This Class'
  if (isBooking) buttonText = 'Booking...'
  else if (!session?.user?.id) buttonText = 'Sign in to Book'
  else if (isBooked) buttonText = 'Already Booked'
  else if (availableSpots <= 0) buttonText = 'Class Full'

  const isDisabled = isBooking || isBooked || availableSpots <= 0

  return (
    <Button
      className="w-full mb-4 bg-gray-800 dark:bg-gray-300 dark:hover:bg-gray-300/80 hover:bg-gray-800/90"
      onClick={handleClick}
      disabled={isDisabled}
    >
      {buttonText}
    </Button>
  )
} 