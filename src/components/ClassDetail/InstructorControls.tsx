'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { CookingClass } from '@/types'
import { Edit, Trash2 } from 'lucide-react'

interface InstructorControlsProps {
  cookingClass: CookingClass
}

export default function InstructorControls({ cookingClass }: InstructorControlsProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

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
      console.error('Error deleting class:', err)
      alert('Failed to delete class')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-black dark:text-white font-medium">Instructor Options:</span>
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 