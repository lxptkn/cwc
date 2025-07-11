import { prisma } from '@/lib/prisma'

export async function getAllClasses() {
  try {
    const classes = await prisma.class.findMany({
      include: { reviews: true },
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
      include: { reviews: true },
    })
    return cookingClass
  } catch (error) {
    console.error('Error fetching class by ID:', error)
    return null
  }
} 