import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getClassById } from '@/services/class-service'
import ClassDetailPage from '@/components/ClassDetail/ClassDetailPage'
import MainHeader from '@/components/Header/MainHeader'

interface ClassPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const cookingClass = await getClassById(parseInt(id))
    
    if (!cookingClass) {
      return {
        title: 'Class Not Found | Cooking with Class',
        description: 'The requested cooking class could not be found.'
      }
    }

    return {
      title: `${cookingClass.title} | Cooking with Class`,
      description: cookingClass.description || `Join ${cookingClass.instructorName} for an amazing ${cookingClass.cuisineType} cooking class in ${cookingClass.location}.`,
      openGraph: {
        title: cookingClass.title,
        description: cookingClass.description || `Learn ${cookingClass.cuisineType} cooking with ${cookingClass.instructorName}`,
        type: 'website',
        locale: 'en_US',
        siteName: 'Cooking with Class',
      },
      twitter: {
        card: 'summary_large_image',
        title: cookingClass.title,
        description: cookingClass.description || `Learn ${cookingClass.cuisineType} cooking with ${cookingClass.instructorName}`,
      }
    }
  } catch (error) {
    return {
      title: 'Class Not Found | Cooking with Class',
      description: 'The requested cooking class could not be found.'
    }
  }
}

export default async function ClassPage({ params }: ClassPageProps) {
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

    return (
      <>
        <MainHeader />
        <ClassDetailPage cookingClass={cookingClass} />
      </>
    )
  } catch (error) {
    console.error('Error fetching class:', error)
    notFound()
  }
} 