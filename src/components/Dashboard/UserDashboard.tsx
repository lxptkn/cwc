'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { User, Booking, CookingClass } from '@/types'
import Button from '@/components/ui/Button'

interface UserDashboardProps {
  user: User
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const { data: session } = useSession()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [createdClasses, setCreatedClasses] = useState<CookingClass[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'bookings' | 'classes'>('bookings')

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch user's bookings
      const bookingsResponse = await fetch('/api/bookings')
      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json()
        setBookings(bookingsData.bookings || [])
      }

      // Fetch classes created by the user
      const classesResponse = await fetch('/api/classes/instructor')
      if (classesResponse.ok) {
        const classesData = await classesResponse.json()
        setCreatedClasses(classesData.classes || [])
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setBookings(prev => prev.filter(booking => booking.id !== bookingId))
      }
    } catch (error) {
      console.error('Error cancelling booking:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'text-warm-green'
      case 'CANCELLED':
        return 'text-warm-orange'
      case 'COMPLETED':
        return 'text-warm-teal'
      default:
        return 'text-warm-fg-muted'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-warm-gray rounded mb-6"></div>
            <div className="h-64 bg-warm-gray rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-warm-fg mb-2">
            Welcome back, {user.name || 'Chef'}!
          </h1>
          <p className="text-warm-fg-muted">
            Manage your bookings and classes
          </p>
        </div>

        {/* Role Badge */}
        <div className="mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            user.role === 'INSTRUCTOR' 
              ? 'bg-warm-orange/20 text-warm-orange' 
              : 'bg-warm-teal/20 text-warm-teal'
          }`}>
            {user.role === 'INSTRUCTOR' ? 'Instructor' : 'Student'}
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-warm-bg-alt rounded-lg p-1">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'bookings'
                ? 'bg-white text-warm-fg shadow-sm'
                : 'text-warm-fg-muted hover:text-warm-fg'
            }`}
          >
            My Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'classes'
                ? 'bg-white text-warm-fg shadow-sm'
                : 'text-warm-fg-muted hover:text-warm-fg'
            }`}
          >
            My Classes ({createdClasses.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-warm-fg">My Bookings</h2>
              <Link href="/">
                <Button className="bg-warm-orange hover:bg-warm-orange/90 text-black">
                  Browse More Classes
                </Button>
              </Link>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍳</div>
                <h3 className="text-lg font-medium text-warm-fg mb-2">No bookings yet</h3>
                <p className="text-warm-fg-muted mb-4">
                  Start your culinary journey by booking your first cooking class!
                </p>
                <Link href="/">
                  <Button className="bg-warm-orange hover:bg-warm-orange/90 text-black">
                    Browse Classes
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-warm-fg mb-2">
                          {booking.class?.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-warm-fg-muted mb-3">
                          <span>{booking.class?.instructorName}</span>
                          <span>${booking.class?.price}</span>
                          <span className={getStatusColor(booking.status)}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-warm-fg-muted text-sm">
                          Booked on {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/class/${booking.classId}`}>
                          <Button className="bg-warm-teal hover:bg-warm-teal/90 text-black text-sm">
                            View Class
                          </Button>
                        </Link>
                        {booking.status === 'CONFIRMED' && (
                          <Button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="bg-warm-orange hover:bg-warm-orange/90 text-black text-sm"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-warm-fg">My Classes</h2>
              <Link href="/create-class">
                <Button className="bg-warm-orange hover:bg-warm-orange/90 text-black">
                  Create New Class
                </Button>
              </Link>
            </div>

            {createdClasses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👨‍🍳</div>
                <h3 className="text-lg font-medium text-warm-fg mb-2">No classes created yet</h3>
                <p className="text-warm-fg-muted mb-4">
                  Start sharing your culinary expertise by creating your first class!
                </p>
                <Link href="/create-class">
                  <Button className="bg-warm-orange hover:bg-warm-orange/90 text-black">
                    Create Your First Class
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {createdClasses.map((classItem) => (
                  <div key={classItem.id} className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-warm-fg mb-2">
                          {classItem.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-warm-fg-muted mb-3">
                          <span>${classItem.price}</span>
                          <span>{classItem.cuisineType}</span>
                          <span>{classItem.difficulty}</span>
                          <span>⭐ {classItem.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-warm-fg-muted text-sm">
                          Created on {new Date(classItem.createdAt).toLocaleDateString()}
                        </p>
                        {/* Attendees List */}
                        <div className="mt-4">
                          <h4 className="font-semibold text-warm-fg mb-2">Attendees ({classItem.bookings?.length || 0})</h4>
                          {classItem.bookings && classItem.bookings.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1">
                              {classItem.bookings.map((booking) => (
                                <li key={booking.id} className="text-warm-fg-muted text-sm">
                                  {booking.user?.name || booking.user?.email || 'Unknown'}
                                  {booking.status === 'CONFIRMED' ? '' : ` (${booking.status})`}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-warm-fg-muted text-sm">No attendees yet.</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/class/${classItem.id}`}>
                          <Button className="bg-warm-teal hover:bg-warm-teal/90 text-black text-sm">
                            View Class
                          </Button>
                        </Link>
                        <Link href={`/edit-class/${classItem.id}`}>
                          <Button className="bg-warm-orange hover:bg-warm-orange/90 text-black text-sm">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 