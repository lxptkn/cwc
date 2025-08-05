import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getUserById } from '@/services/user-service'
import EditProfileForm from '@/components/Profile/EditProfileForm'

export default async function EditProfilePage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    notFound()
  }

  try {
    const user = await getUserById(session.user.id)
    
    if (!user) {
      notFound()
    }

    return <EditProfileForm user={user} />
  } catch (error) {
    console.error('Error fetching user:', error)
    notFound()
  }
} 