'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { User, Booking, CookingClass } from '@/types'
import { Button } from '@/components/ui/Button'
import MainHeader from '../Header/MainHeader'
import Footer from '@/components/ui/Footer';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash2 } from "lucide-react"

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
        // Update the booking status to CANCELLED instead of removing it
        setBookings(prev => prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'CANCELLED' }
            : booking
        ))
      }
    } catch (error) {
      console.error('Error cancelling booking:', error)
    }
  }

  const handleRemoveCancelledBooking = (bookingId: number) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId))
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
      <MainHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Working Area */}
        <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
            Welcome back, {user.name || 'Chef'}! Manage your cooking classes and track your culinary journey.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Booked Classes Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">My Booked Classes</h2>
                <Link href="/#classes">
                  <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-600 bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Book More
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0">
                          <img
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.class?.title}
                            className="rounded-lg object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                             <div>
                               <Link href={`/class/${booking.classId}`} className="block">
                                 <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-white truncate hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer">
                                   {booking.class?.title}
                                 </h3>
                               </Link>
                               <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                 with {booking.class?.instructorName}
                               </p>
                             </div>
                            <Badge
                              variant={booking.status === "Confirmed" ? "default" : "secondary"}
                              className={
                                booking.status === "Confirmed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
                             <div className="flex flex-wrap gap-4">
                               <div className="flex items-center gap-1">
                                 <MapPin className="h-4 w-4" />
                                 <span>{booking.class?.location}</span>
                               </div>
                             </div>
                             
                             <div className="flex space-x-2">
                               {booking.status === 'CONFIRMED' && (
                                 <Button
                                   onClick={() => handleCancelBooking(booking.id)}
                                   className="bg-warm-orange hover:bg-warm-orange/90 text-black text-sm cursor-pointer"
                                 >
                                   Cancel
                                 </Button>
                               )}
                               {booking.status === 'CANCELLED' && (
                                 <Button
                                   onClick={() => handleRemoveCancelledBooking(booking.id)}
                                   className="bg-warm-red hover:bg-warm-red/90 text-black dark:text-white text-sm cursor-pointer"
                                 >
                                   <Trash2 className="h-4 w-4 mr-1" /> Remove
                                 </Button>
                               )}
                             </div>
                             
                           </div>
                           <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <p className="text-warm-fg-muted text-sm">
                                Booked on {new Date(booking.createdAt).toLocaleDateString()} 
                              </p>
                            </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Created Classes Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">My Created Classes</h2>
                <Link href="/create-class">
                  <Button
                    size="sm"
                    className="bg-gray-900 hover:bg-gray-900/90 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {createdClasses.map((classItem) => (
                  <Card key={classItem.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0">
                          <img
                            src={classItem.image || "/placeholder.svg"}
                            alt={classItem.title}
                            className="rounded-lg object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Link href={`/class/${classItem.id}`} className="block">
                                <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-white">
                                  {classItem.title}
                                </h3>
                              </Link>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{classItem.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">

                            <Badge
                              variant={classItem.status === "Active" ? "default" : "secondary"}
                              className={
                                classItem.status === "Active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                              }
                            >
                              {classItem.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
        <Footer />
      </div>
    </div>
  )
} 