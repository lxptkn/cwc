'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { CookingClass } from '@/types'

interface InstructorControlsProps {
  cookingClass: CookingClass
}

export default function InstructorControls({ cookingClass }: InstructorControlsProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if current user is the instructor of this class
  const isInstructor = session?.user?.id === cookingClass.instructorId

  if (!isInstructor) {
    return null
  }

  const handleEdit = () => {
    router.push(`/edit-class/${cookingClass.id}`)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/classes/${cookingClass.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete class')
      }

      // Redirect to dashboard after successful deletion
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete class')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border mb-6">
      <h3 className="text-lg font-semibold text-warm-fg mb-4">Instructor Controls</h3>
      
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex space-x-3">
        <Button
          onClick={handleEdit}
          className="bg-warm-teal hover:bg-warm-teal/90 text-black px-4 py-2 rounded-lg"
        >
          Edit Class
        </Button>
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-warm-orange hover:bg-warm-orange/90 text-black px-4 py-2 rounded-lg"
        >
          {isDeleting ? 'Deleting...' : 'Delete Class'}
        </Button>
      </div>

      <p className="text-sm text-warm-fg-muted mt-3">
        As the instructor, you can edit or delete this class. Deleting will remove all bookings and reviews.
      </p>
    </div>
  )
} 