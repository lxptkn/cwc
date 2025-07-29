import { prisma } from '@/lib/prisma'
import { BookingStatus } from '@/types'

export async function createBooking(classId: number, userId: string) {
  try {
    // Check if user is already booked for this class (only CONFIRMED bookings)
    const existingConfirmedBooking = await prisma.booking.findFirst({
      where: {
          classId,
          userId,
        status: 'CONFIRMED',
      },
    })

    if (existingConfirmedBooking) {
      throw new Error('You are already booked for this class')
    }

    // Check if there's a cancelled booking we can reactivate
    const existingCancelledBooking = await prisma.booking.findFirst({
      where: {
        classId,
        userId,
        status: 'CANCELLED',
      },
    })

    // Check if class has available spots
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        bookings: {
          where: {
            status: 'CONFIRMED',
          },
        },
      },
    })

    if (!classData) {
      throw new Error('Class not found')
    }

    if (classData.bookings.length >= classData.maxStudents) {
      throw new Error('This class is full')
    }

    let booking

    if (existingCancelledBooking) {
      // Reactivate the cancelled booking
      booking = await prisma.booking.update({
        where: { id: existingCancelledBooking.id },
        data: { status: 'CONFIRMED' },
        include: {
          class: true,
          user: true,
        },
      })
    } else {
      // Create a new booking
      booking = await prisma.booking.create({
      data: {
        classId,
        userId,
        status: 'CONFIRMED',
      },
      include: {
        class: true,
        user: true,
      },
    })
    }

    return { booking }
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error
  }
}

export async function cancelBooking(bookingId: number, userId: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { class: true },
    })

    if (!booking) {
      throw new Error('Booking not found')
    }

    if (booking.userId !== userId) {
      throw new Error('You can only cancel your own bookings')
    }

    if (booking.status === 'CANCELLED') {
      throw new Error('Booking is already cancelled')
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
      include: {
        class: true,
        user: true,
      },
    })

    return { booking: updatedBooking }
  } catch (error) {
    console.error('Error cancelling booking:', error)
    throw error
  }
}

export async function getUserBookings(userId: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        class: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return { bookings }
  } catch (error) {
    console.error('Error fetching user bookings:', error)
    throw error
  }
}

export async function getClassBookings(classId: number) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { classId },
      include: {
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return { bookings }
  } catch (error) {
    console.error('Error fetching class bookings:', error)
    throw error
  }
}

export async function updateBookingStatus(bookingId: number, status: BookingStatus) {
  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        class: true,
        user: true,
      },
    })

    return { booking }
  } catch (error) {
    console.error('Error updating booking status:', error)
    throw error
  }
} 