import Link from "next/link"
import { ClassCard } from "@/components/class-card"
import { SignUpForm } from "@/components/sign-up-form"
import { TestimonialCard } from "@/components/testimonial-card"
import { ClassGallery } from '@/components/class-gallery/ClassGallery'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-semibold">
            Cooking with Class
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="#classes" className="text-sm font-medium hover:underline">
              Classes
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline">
              Testimonials
            </Link>
            <Link href="#signup" className="text-sm font-medium hover:underline">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Master the Art of Cooking
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-gray-600 md:text-xl">
              Join our expert-led cooking classes and transform your culinary skills from amateur to professional.
            </p>
            <div className="mt-8">
              <Link
                href="#signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </section>
        <section id="classes" className="bg-gray-50 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">Our Classes</h2>
            <p className="mt-4 max-w-2xl font-serif text-gray-600">
              From basics to advanced techniques, our classes cater to all skill levels.
            </p>
            <div className="mt-8">
              <ClassGallery />
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">What Our Students Say</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="The Italian cooking class completely transformed my home cooking. I now make pasta from scratch every weekend!"
                author="Sarah Johnson"
                role="Home Cook"
              />
              <TestimonialCard
                quote="As a professional chef, I was impressed by the techniques taught in the French Pastry course. Truly exceptional."
                author="Michael Chen"
                role="Restaurant Owner"
              />
              <TestimonialCard
                quote="The instructors are patient and knowledgeable. I went from burning water to making complex dishes in just weeks."
                author="Emma Rodriguez"
                role="Beginner Cook"
              />
            </div>
          </div>
        </section>
        <section id="signup" className="bg-gray-50 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-md">
              <h2 className="text-center font-serif text-3xl font-bold tracking-tight md:text-4xl">
                Sign Up for Classes
              </h2>
              <p className="mt-4 text-center font-serif text-gray-600">
                Reserve your spot in our upcoming cooking classes.
              </p>
              <div className="mt-8">
                <SignUpForm />
              </div>
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
                  <Link href="#" className="text-gray-600 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:underline">
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
