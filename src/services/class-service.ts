import { prisma } from '@/lib/prisma'
import { CreateClassData } from '@/types'

export async function getAllClasses() {
  try {
    const classes = await prisma.class.findMany({
      include: { 
        reviews: true,
        instructor: true,
        bookings: {
          where: { status: 'CONFIRMED' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return { classes }
  } catch (error) {
    // Handle error as needed
    return { classes: [], error: 'Failed to fetch classes.' }
  }
}

export async function getClassById(id: number) {
  try {
    const cookingClass = await prisma.class.findUnique({
      where: { id },
      include: { 
        reviews: {
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        },
        instructor: true,
        bookings: {
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    })
    return cookingClass
  } catch (error) {
    console.error('Error fetching class by ID:', error)
    return null
  }
}

export async function createClass(classData: CreateClassData, instructorId: string) {
  try {
    const cookingClass = await prisma.class.create({
      data: {
        ...classData,
        instructorId,
        rating: 0, // New classes start with 0 rating
      },
      include: {
        instructor: true,
      },
    })
    return { class: cookingClass }
  } catch (error) {
    console.error('Error creating class:', error)
    throw error
  }
}

export async function updateClass(id: number, classData: Partial<CreateClassData>, instructorId: string) {
  try {
    // Check if user is the instructor of this class
    const existingClass = await prisma.class.findUnique({
      where: { id },
    })

    if (!existingClass) {
      throw new Error('Class not found')
    }

    if (existingClass.instructorId !== instructorId) {
      throw new Error('You can only edit your own classes')
    }

    const cookingClass = await prisma.class.update({
      where: { id },
      data: classData,
      include: {
        instructor: true,
        reviews: true,
      },
    })
    return { class: cookingClass }
  } catch (error) {
    console.error('Error updating class:', error)
    throw error
  }
}

export async function deleteClass(id: number, instructorId: string) {
  try {
    // Check if user is the instructor of this class
    const existingClass = await prisma.class.findUnique({
      where: { id },
    })

    if (!existingClass) {
      throw new Error('Class not found')
    }

    if (existingClass.instructorId !== instructorId) {
      throw new Error('You can only delete your own classes')
    }

    // Delete related bookings and reviews first
    await prisma.booking.deleteMany({
      where: { classId: id },
    })

    await prisma.review.deleteMany({
      where: { classId: id },
    })

    // Delete the class
    await prisma.class.delete({
      where: { id },
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting class:', error)
    throw error
  }
}

export async function getInstructorClasses(instructorId: string) {
  try {
    const classes = await prisma.class.findMany({
      where: { instructorId },
      include: {
        reviews: true,
        bookings: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return { classes }
  } catch (error) {
    console.error('Error fetching instructor classes:', error)
    throw error
  }
}

export async function getAvailableSpots(classId: number) {
  try {
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        bookings: {
          where: { status: 'CONFIRMED' },
        },
      },
    })

    if (!classData) {
      throw new Error('Class not found')
    }

    const bookedSpots = classData.bookings.length
    const availableSpots = classData.maxStudents - bookedSpots

    return { availableSpots, totalSpots: classData.maxStudents, bookedSpots }
  } catch (error) {
    console.error('Error calculating available spots:', error)
    throw error
  }
} 