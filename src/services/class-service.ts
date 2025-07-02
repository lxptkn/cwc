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