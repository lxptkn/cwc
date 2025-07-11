import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CreateClassForm from '@/components/ClassCreation/CreateClassForm'

export default async function CreateClassPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/')
  }

  // Check if user is an instructor (we'll need to fetch user role from database)
  // For now, we'll allow all authenticated users to create classes
  // In a real app, you'd check the user's role in the database

  return <CreateClassForm />
} 