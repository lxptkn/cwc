import { prisma } from '@/lib/prisma'
import { CreateReviewData } from '@/types'

export async function createReview(reviewData: CreateReviewData, userId: string) {
  try {
    // Check if user has already reviewed this class
    const existingReview = await prisma.review.findFirst({
      where: {
        classId: reviewData.classId,
        userId: userId,
      },
    })

    if (existingReview) {
      throw new Error('You have already reviewed this class')
    }

    // Get user name for the review
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    const review = await prisma.review.create({
      data: {
        classId: reviewData.classId,
        content: reviewData.content,
        rating: reviewData.rating,
        author: user?.name || 'Anonymous',
        userId: userId,
      },
      include: {
        user: true,
      },
    })

    // Update class average rating
    await updateClassRating(reviewData.classId)

    return { review }
  } catch (error) {
    console.error('Error creating review:', error)
    throw error
  }
}

export async function getClassReviews(classId: number) {
  try {
    const reviews = await prisma.review.findMany({
      where: { classId },
      include: {
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return { reviews }
  } catch (error) {
    console.error('Error fetching class reviews:', error)
    throw error
  }
}

export async function updateClassRating(classId: number) {
  try {
    const reviews = await prisma.review.findMany({
      where: { classId },
      select: { rating: true },
    })

    if (reviews.length === 0) {
      return
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

    await prisma.class.update({
      where: { id: classId },
      data: { rating: averageRating },
    })
  } catch (error) {
    console.error('Error updating class rating:', error)
    throw error
  }
}

export async function deleteReview(reviewId: number, userId: string) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    })

    if (!review) {
      throw new Error('Review not found')
    }

    if (review.userId !== userId) {
      throw new Error('You can only delete your own reviews')
    }

    await prisma.review.delete({
      where: { id: reviewId },
    })

    // Update class average rating after deletion
    await updateClassRating(review.classId)

    return { success: true }
  } catch (error) {
    console.error('Error deleting review:', error)
    throw error
  }
}

export async function updateReview(reviewId: number, content: string, rating: number, userId: string) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    })

    if (!review) {
      throw new Error('Review not found')
    }

    if (review.userId !== userId) {
      throw new Error('You can only update your own reviews')
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        content,
        rating,
      },
      include: {
        user: true,
      },
    })

    // Update class average rating
    await updateClassRating(review.classId)

    return { review: updatedReview }
  } catch (error) {
    console.error('Error updating review:', error)
    throw error
  }
} 