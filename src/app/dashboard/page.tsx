import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import UserDashboard from '@/components/Dashboard/UserDashboard'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/')
  }

  return <UserDashboard user={session.user} />
} 