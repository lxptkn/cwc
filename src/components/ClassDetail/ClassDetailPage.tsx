'use client'

import { CookingClass } from '@/types'
import { useSession } from 'next-auth/react'
import AddressMap from '@/components/ui/AddressMap'
import BookingCard from './BookingCard'
import ReviewsSection from './ReviewsSection'
import InstructorControls from './InstructorControls'
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, Users, ChefHat, ShoppingBasket, Salad } from "lucide-react"
import { Button } from '../ui/Button'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Footer from '@/components/ui/Footer';
import BookingButton from './BookingButton'
import Image from 'next/image'
import { FALLBACK_IMAGES } from '@/utils/imageUtils'
import { InstructorProfileCard } from '@/components/InstructorProfile/InstructorProfileCard'

interface ClassDetailPageProps {
  cookingClass: CookingClass
}

export default function ClassDetailPage({ cookingClass }: ClassDetailPageProps) {
  // Parse the menu string into dishes - moved inside the component
  const dishesToCook = cookingClass.menu 
    ? cookingClass.menu.split(',').map((dish: string) => dish.trim())
    : [];

  // Parse the highlights string into what to bring items
  const whatToBring = cookingClass.highlights 
    ? cookingClass.highlights.split(',').map((item: string) => item.trim())
    : [];

  // Parse the additional information string into provided items
  const providedItems = cookingClass.additionalInformation 
    ? cookingClass.additionalInformation.split('.').map((item: string) => item.trim()).filter(item => item && !item.includes('dietary restrictions'))
    : [];

  return (
    <div className="min-h-screen bg-warm-bg dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb and Instructor Controls */}
        <div className="flex items-center justify-between mb-6">
          <nav className="ml-4">
            <ol className="flex items-center space-x-2 text-sm text-warm-fg-muted">
              <li>
                <a href="/" className="hover:text-warm-orange transition-smooth">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="/#classes" className="hover:text-warm-orange transition-smooth">
                  Classes
                </a>
              </li>
              <li>/</li>
              <li className="text-warm-fg">{cookingClass.title}</li>
            </ol>
          </nav>

          {/* Instructor Controls - Right Aligned */}
          <InstructorControls cookingClass={cookingClass} />
        </div>

        {/* Main Content */}
        <main className="flex-1">
          <section className="py-8">
            <div className="container mx-auto px-4">
              {/* Class Image */}
              <div className="mb-8">
                <div className="relative h-96 w-full rounded-lg overflow-hidden">
                  <Image
                    src={cookingClass.image || FALLBACK_IMAGES.class}
                    alt={`${cookingClass.title} class`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = FALLBACK_IMAGES.class
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{cookingClass.difficulty}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{cookingClass.rating}</span>
                      <span className="text-sm text-gray-500">({cookingClass.reviews?.length || 0} reviews)</span>
                    </div>
                  </div>

                  <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl mb-4">{cookingClass.title}</h1>
                  
                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{cookingClass.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Max {cookingClass.maxStudents} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{cookingClass.location}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="font-serif text-2xl font-bold mb-4">About This Class</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {cookingClass.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h2 className="font-serif text-2xl font-bold mb-4">What You'll Create</h2>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {dishesToCook.map((dish: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <ChefHat className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{dish}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="font-serif text-2xl font-bold mb-4">What to Bring</h2>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {whatToBring.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <ShoppingBasket className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="font-serif text-2xl font-bold mb-4">What is Included</h2>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {providedItems.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Salad className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>


                  {/* Reviews Section */}
                  <div className="mb-8">
                    <ReviewsSection cookingClass={cookingClass} />
                  </div>
                </div>

                

                {/* Booking Card - Now properly positioned as right sidebar */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-8 bg-gray-100 dark:bg-gray-900">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold mb-2">${cookingClass.price}</div>
                        <div className="text-sm text-gray-500 pb-6">per person</div>
                      </div>

                      <BookingButton cookingClass={cookingClass} />

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{cookingClass.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Difficulty:</span>
                          <span className="font-medium">{cookingClass.difficulty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Class Size:</span>
                          <span className="font-medium">Max {cookingClass.maxStudents}</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="text-sm">
                        <div className="font-medium mb-2">Location</div>
                        <div className="text-gray-600 mb-3">{cookingClass.address}</div>

                        {/* Google Maps Embed */}
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-73.9876543!3d40.7589123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjEiTiA3M8KwNTknMTUuNiJX!5e0!3m2!1sen!2sus!4v1234567890123"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Class Location"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                </div>
                
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Instructor Section */}
      {cookingClass.instructor && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold mb-8">Meet Your Instructor</h2>
            <InstructorProfileCard instructor={cookingClass.instructor} showFullProfile={true} />
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
} 