import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUserById } from '@/services/user-service'
import UserDashboard from '@/components/Dashboard/UserDashboard'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/')
  }

  // Fetch complete user data including profile image and other fields
  const user = await getUserById(session.user.id)
  
  if (!user) {
    redirect('/')
  }

  return <UserDashboard user={user} />
} 