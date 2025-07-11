'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Button from '@/components/ui/Button'
import { CookingClass, Review } from '@/types'

interface ReviewsSectionProps {
  cookingClass: CookingClass
}

export default function ReviewsSection({ cookingClass }: ReviewsSectionProps) {
  const { data: session, status } = useSession()
  const [reviews, setReviews] = useState<Review[]>(cookingClass.reviews || [])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    content: '',
    rating: 5,
  })

  const hasUserReviewed = reviews.some(
    review => review.userId === session?.user?.id
  )

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user?.id) {
      setError('Please sign in to leave a review')
      return
    }

    if (!formData.content.trim()) {
      setError('Please write a review')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classId: cookingClass.id,
          content: formData.content,
          rating: formData.rating,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review')
      }

      // Add the new review to the list
      setReviews(prev => [data.review, ...prev])
      setShowReviewForm(false)
      setFormData({ content: '', rating: 5 })
      
      // You could show a success message here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-warm-gray'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-warm-fg">Reviews</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {renderStars(Math.round(averageRating))}
            <span className="ml-2 text-sm text-warm-fg-muted">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {session?.user?.id && !hasUserReviewed && (
        <div className="mb-6">
          {!showReviewForm ? (
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-warm-orange hover:bg-warm-orange/90 text-black px-4 py-2 rounded-lg"
            >
              Write a Review
            </Button>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-fg mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-6 h-6 ${
                          star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-warm-gray'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-fg mb-2">
                  Review
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                  rows={4}
                  placeholder="Share your experience with this class..."
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-warm-orange hover:bg-warm-orange/90 text-black px-4 py-2 rounded-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false)
                    setFormData({ content: '', rating: 5 })
                    setError(null)
                  }}
                  className="bg-warm-gray hover:bg-warm-gray/80 text-warm-fg px-4 py-2 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-warm-fg-muted text-center py-8">
            No reviews yet. Be the first to review this class!
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-warm-border pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-warm-fg">{review.author}</span>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <span className="text-sm text-warm-fg-muted">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-warm-fg leading-relaxed">{review.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 