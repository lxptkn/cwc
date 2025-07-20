import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ClassGallery } from "@/components/class-gallery"
import { ReviewCard } from "@/components/review-card"
import { MapPin, Clock, Users, ChefHat, Star } from "lucide-react"

export default function AsianFusionPage() {
  const classData = {
    title: "Asian Fusion: Modern Techniques, Traditional Flavors",
    price: "$135",
    difficulty: "Intermediate",
    duration: "5 weeks",
    location: "Downtown Culinary Studio",
    address: "123 Main Street, New York, NY 10001",
    rating: 4.7,
    reviewCount: 31,
    maxStudents: 14,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  const dishesToCook = [
    "Korean BBQ Tacos",
    "Ramen Burger",
    "Miso-Glazed Black Cod",
    "Thai Curry Risotto",
    "Sushi Pizza",
    "Vietnamese Pho Dumplings",
    "Matcha Crème Brûlée",
    "Five-Spice Duck Confit",
  ]

  const reviews = [
    {
      name: "Alex Chen",
      rating: 5,
      comment:
        "Chef Tanaka's fusion approach opened my eyes to new possibilities. The flavor combinations are incredible!",
      date: "3 days ago",
    },
    {
      name: "Maria Santos",
      rating: 4,
      comment: "Creative and delicious! I love how traditional techniques are applied to modern dishes.",
      date: "1 week ago",
    },
    {
      name: "James Wilson",
      rating: 5,
      comment: "The best cooking class I've taken. Every dish was a revelation. Can't wait for the next level!",
      date: "2 weeks ago",
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
                    Explore the exciting world of Asian fusion cuisine where traditional Asian flavors meet modern
                    culinary techniques. This innovative course teaches you to create dishes that honor authentic Asian
                    traditions while embracing contemporary presentation and fusion concepts.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    You'll learn to balance umami, sweet, sour, and spicy elements while mastering both traditional
                    Asian cooking methods and modern plating techniques. Each week focuses on a different Asian cuisine,
                    showing how to adapt and fuse flavors for today's palate.
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
                        <li>• Authentic Asian ingredients and specialty items</li>
                        <li>• Professional knife skills training</li>
                        <li>• Recipe cards with fusion variations</li>
                        <li>• Sake and tea pairings</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Skills You'll Learn</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Wok cooking techniques</li>
                        <li>• Dumpling making and folding</li>
                        <li>• Flavor balancing and umami development</li>
                        <li>• Modern plating and presentation</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Dietary Accommodations</h3>
                      <p className="text-gray-600">
                        We can accommodate vegetarian, vegan, and gluten-free diets. Many dishes can be adapted for
                        various dietary restrictions while maintaining authentic flavors.
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
