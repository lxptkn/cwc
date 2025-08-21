import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getClassById } from '@/services/class-service'
import EditClassForm from '@/components/ClassCreation/EditClassForm'

interface EditClassPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditClassPage({ params }: EditClassPageProps) {
  const session = await auth()
  
  if (!session?.user?.id) {
    notFound()
  }

  try {
    const { id } = await params
    const classId = parseInt(id)
    
    if (isNaN(classId)) {
      notFound()
    }
    
    const cookingClass = await getClassById(classId)
    
    if (!cookingClass) {
      notFound()
    }

    // Check if the current user is the instructor of this class
    if (cookingClass.instructorId !== session.user.id) {
      notFound()
    }

    return <EditClassForm cookingClass={cookingClass} />
  } catch (error) {
    console.error('Error fetching class:', error)
    notFound()
  }
} 