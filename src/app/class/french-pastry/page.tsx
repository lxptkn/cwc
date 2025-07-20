import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ClassGallery } from "@/components/class-gallery"
import { ReviewCard } from "@/components/review-card"
import { MapPin, Clock, Users, ChefHat, Star } from "lucide-react"

export default function FrenchPastryPage() {
  const classData = {
    title: "French Pastry: The Art of Patisserie",
    price: "$150",
    difficulty: "Intermediate",
    duration: "6 weeks",
    location: "Downtown Culinary Studio",
    address: "123 Main Street, New York, NY 10001",
    rating: 4.9,
    reviewCount: 18,
    maxStudents: 10,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  const dishesToCook = [
    "Classic Croissants",
    "Pain au Chocolat",
    "Macarons (Various Flavors)",
    "Crème Brûlée",
    "Tarte Tatin",
    "Éclairs & Profiteroles",
    "Mille-feuille",
    "French Bread & Baguettes",
  ]

  const reviews = [
    {
      name: "Jennifer Walsh",
      rating: 5,
      comment:
        "Chef Marie's attention to detail is incredible. I never thought I could make croissants this good at home!",
      date: "1 week ago",
    },
    {
      name: "David Kim",
      rating: 5,
      comment: "The techniques I learned here have completely elevated my baking. Worth every penny!",
      date: "2 weeks ago",
    },
    {
      name: "Lisa Thompson",
      rating: 4,
      comment: "Challenging but rewarding. Chef Marie is patient and explains everything clearly.",
      date: "1 month ago",
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
                    Immerse yourself in the elegant world of French patisserie with this comprehensive intermediate
                    course. You'll master the precise techniques and artistry that define French baking, from laminated
                    doughs to delicate pastry creams.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This hands-on course emphasizes precision, timing, and the scientific principles behind French
                    baking. Each week builds upon fundamental skills, progressing from basic pastries to complex
                    multi-component desserts that showcase the pinnacle of patisserie artistry.
                  </p>
                </div>

                {/* What You'll Cook */}
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold mb-4">What You'll Create</h2>
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
                        <li>• Premium ingredients and specialized equipment</li>
                        <li>• Professional pastry tools to take home</li>
                        <li>• Detailed recipe booklet with techniques</li>
                        <li>• Beautiful packaging for your creations</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Prerequisites</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Basic baking experience recommended</li>
                        <li>• Comfort with measuring and mixing</li>
                        <li>• Patience for detailed work</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Special Notes</h3>
                      <p className="text-gray-600">
                        This class requires precision and attention to detail. Some techniques may take practice to
                        master. We provide ongoing support and practice sessions for enrolled students.
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
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="relative h-64 w-full md:h-80 md:w-80 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=320&width=320"
                  alt="Chef Marie Dubois"
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-bold mb-2">Chef Marie Dubois</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">20+ Years Experience</Badge>
                  <Badge variant="secondary">Le Cordon Bleu Graduate</Badge>
                  <Badge variant="secondary">Award-Winning Pastry Chef</Badge>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Chef Marie trained at Le Cordon Bleu in Paris and worked in prestigious patisseries across France
                  before bringing her expertise to New York. Her meticulous approach to French pastry techniques has
                  earned her recognition from culinary institutions worldwide.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Marie believes that French pastry is both an art and a science, requiring precision, patience, and
                  passion. Her teaching style emphasizes understanding the 'why' behind each technique, ensuring
                  students develop both skill and confidence.
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Specialties:</span>
                    <span className="text-gray-600 ml-2">Laminated Doughs, Chocolate Work, Sugar Art</span>
                  </div>
                  <div>
                    <span className="font-semibold">Languages:</span>
                    <span className="text-gray-600 ml-2">English, French</span>
                  </div>
                  <div>
                    <span className="font-semibold">Teaching Since:</span>
                    <span className="text-gray-600 ml-2">2012</span>
                  </div>
                </div>
              </div>
            </div>
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
