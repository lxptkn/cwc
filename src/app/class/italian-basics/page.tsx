import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ClassGallery } from "@/components/class-gallery"
import { InstructorCard } from "@/components/instructor-card"
import { ReviewCard } from "@/components/review-card"
import { MapPin, Clock, Users, ChefHat, Star } from "lucide-react"

export default function ClassPage() {
  const classData = {
    title: "Italian Basics: From Pasta to Perfection",
    price: "$120",
    difficulty: "Beginner",
    duration: "4 weeks",
    location: "Downtown Culinary Studio",
    address: "123 Main Street, New York, NY 10001",
    rating: 4.8,
    reviewCount: 24,
    maxStudents: 12,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  const dishesToCook = [
    "Fresh Pasta (Fettuccine & Ravioli)",
    "Classic Marinara Sauce",
    "Creamy Alfredo Sauce",
    "Homemade Pesto",
    "Italian Meatballs",
    "Risotto Milanese",
    "Tiramisu",
    "Bruschetta Variations",
  ]

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Amazing class! Chef Marco made everything so easy to understand. I can now make restaurant-quality pasta at home.",
      date: "2 weeks ago",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "The hands-on approach was perfect. Loved learning the traditional techniques and the stories behind each dish.",
      date: "1 month ago",
    },
    {
      name: "Emma Rodriguez",
      rating: 4,
      comment:
        "Great class for beginners. The instructor was patient and the recipes were delicious. Highly recommend!",
      date: "3 weeks ago",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-semibold">
            Cooking with Class
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/#classes" className="text-sm font-medium hover:underline">
              Classes
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:underline">
              Testimonials
            </Link>
            <Link href="/#signup" className="text-sm font-medium hover:underline">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Gallery */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <ClassGallery images={classData.images} />
          </div>
        </section>

        {/* Class Info Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{classData.difficulty}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{classData.rating}</span>
                    <span className="text-sm text-gray-500">({classData.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl mb-4">{classData.title}</h1>

                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{classData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Max {classData.maxStudents} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{classData.location}</span>
                  </div>
                </div>

                {/* About Section */}
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold mb-4">About This Class</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Discover the authentic flavors of Italy in this comprehensive beginner-friendly course. You'll learn
                    the fundamental techniques that form the backbone of Italian cuisine, from making fresh pasta by
                    hand to creating the perfect balance of flavors in classic sauces.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our hands-on approach ensures you'll gain confidence in the kitchen while mastering time-honored
                    recipes passed down through generations. Each session builds upon the last, culminating in a
                    complete Italian meal that you'll be proud to serve to family and friends.
                  </p>
                </div>

                {/* What You'll Cook */}
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold mb-4">What You'll Cook</h2>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {dishesToCook.map((dish, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <ChefHat className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{dish}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold mb-4">Additional Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">What's Included</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• All ingredients and cooking equipment</li>
                        <li>• Recipe cards to take home</li>
                        <li>• Complimentary wine tasting</li>
                        <li>• Take-home containers for leftovers</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">What to Bring</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Apron (or we'll provide one)</li>
                        <li>• Notebook for personal notes</li>
                        <li>• Appetite for learning!</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Dietary Accommodations</h3>
                      <p className="text-gray-600">
                        We can accommodate most dietary restrictions with advance notice. Please contact us when booking
                        to discuss your needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold mb-2">{classData.price}</div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>

                    <Button className="w-full mb-4 bg-gray-900 hover:bg-gray-900/90">Book This Class</Button>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{classData.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className="font-medium">{classData.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Class Size:</span>
                        <span className="font-medium">Max {classData.maxStudents}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="text-sm">
                      <div className="font-medium mb-2">Location</div>
                      <div className="text-gray-600 mb-3">{classData.address}</div>

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

        {/* Instructor Section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold mb-8">Meet Your Instructor</h2>
            <InstructorCard />
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-3xl font-bold">Student Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium">{classData.rating}</span>
                <span className="text-gray-500">({classData.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="font-serif text-lg font-semibold">Cooking with Class</h3>
              <p className="mt-4 text-sm text-gray-600">Transforming home cooks into culinary artists since 2010.</p>
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold">Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#classes" className="text-gray-600 hover:underline">
                    Classes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold">Connect</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Cooking with Class. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
