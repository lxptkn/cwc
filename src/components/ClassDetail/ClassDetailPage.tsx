'use client'

import { CookingClass } from '@/types'
import { useSession } from 'next-auth/react'
import AddressMap from '@/components/ui/AddressMap'
import BookingCard from './BookingCard'
import ReviewsSection from './ReviewsSection'
import InstructorControls from './InstructorControls'
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, Users, ChefHat } from "lucide-react"
import { Button } from '../ui/Button'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Footer from '@/components/ui/Footer';
import BookingButton from './BookingButton'

interface ClassDetailPageProps {
  cookingClass: CookingClass
}

export default function ClassDetailPage({ cookingClass }: ClassDetailPageProps) {
  // Parse the menu string into dishes - moved inside the component
  const dishesToCook = cookingClass.menu 
    ? cookingClass.menu.split(',').map((dish: string) => dish.trim())
    : [];

  return (
    <div className="min-h-screen bg-warm-bg dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 ml-4">
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

        {/* Instructor Controls */}
        <InstructorControls cookingClass={cookingClass} />

        {/* Main Content */}
        

        <main className="flex-1">
          <section className="py-8">
            <div className="container mx-auto px-4">
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
                  <h2 className="font-serif text-2xl font-bold mb-4">Additional Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">What to Bring</h3>
                      <p className="text-warm-fg leading-relaxed">{cookingClass.highlights}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">What is Included</h3>
                      <p className="text-warm-fg leading-relaxed">{cookingClass.additionalInformation}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Dietary Accommodations</h3>
                      <p className="text-gray-600">
                      We can accommodate most dietary restrictions with advance notice. Please contact us when booking to discuss your needs.
                      </p>
                    </div>
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
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-8">Meet Your Instructor</h2>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative h-64 w-full md:h-80 md:w-80 flex-shrink-0">
              <img
                src="/placeholder.svg?height=320&width=320"
                alt="Chef Kenji Tanaka"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-2xl font-bold mb-2">Chef Kenji Tanaka</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">18+ Years Experience</Badge>
                <Badge variant="secondary">Michelin Star Experience</Badge>
                <Badge variant="secondary">Fusion Pioneer</Badge>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Chef Kenji brings a unique perspective to Asian fusion, having trained in traditional Japanese cuisine
                before working in innovative kitchens across Asia and America. His approach respects traditional
                techniques while embracing creative fusion possibilities.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Known for his ability to explain complex flavor profiles and techniques in simple terms, Kenji helps
                students understand not just how to cook Asian fusion, but why certain combinations work and how to
                create their own innovative dishes.
              </p>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Specialties:</span>
                  <span className="text-gray-600 ml-2">Japanese, Korean, Thai Fusion, Modern Asian Techniques</span>
                </div>
                <div>
                  <span className="font-semibold">Languages:</span>
                  <span className="text-gray-600 ml-2">English, Japanese, Korean</span>
                </div>
                <div>
                  <span className="font-semibold">Teaching Since:</span>
                  <span className="text-gray-600 ml-2">2018</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
} 