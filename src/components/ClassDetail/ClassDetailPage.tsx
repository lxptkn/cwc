'use client'

import { CookingClass } from '@/types'
import AddressMap from '@/components/ui/AddressMap'
import Button from '@/components/ui/Button'

interface ClassDetailPageProps {
  cookingClass: CookingClass
}

export default function ClassDetailPage({ cookingClass }: ClassDetailPageProps) {
  return (
    <div className="min-h-screen bg-warm-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Class Details */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-warm-bg-alt rounded-lg p-6 mb-6 border border-warm-border">
              <h1 className="text-3xl font-bold text-warm-fg mb-4">
                {cookingClass.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-warm-orange/20 text-warm-orange text-sm font-medium rounded-full">
                  {cookingClass.cuisineType}
                </span>
                <span className="px-3 py-1 bg-warm-teal/20 text-warm-teal text-sm font-medium rounded-full">
                  {cookingClass.difficulty}
                </span>
                <span className="px-3 py-1 bg-warm-green/20 text-warm-green text-sm font-medium rounded-full">
                  ${cookingClass.price}
                </span>
              </div>

              <div className="flex items-center text-warm-fg-dim mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{cookingClass.location}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-warm-fg-muted">
                <span>Duration: {cookingClass.duration}</span>
                <span>Max Students: {cookingClass.maxStudents}</span>
                <span>Rating: {cookingClass.rating}/5</span>
              </div>
            </div>

            {/* Description */}
            {cookingClass.description && (
              <div className="bg-warm-bg-alt rounded-lg p-6 mb-6 border border-warm-border">
                <h2 className="text-xl font-semibold text-warm-fg mb-4">About This Class</h2>
                <p className="text-warm-fg leading-relaxed">{cookingClass.description}</p>
              </div>
            )}

            {/* About Instructor */}
            {cookingClass.about && (
              <div className="bg-warm-bg-alt rounded-lg p-6 mb-6 border border-warm-border">
                <h2 className="text-xl font-semibold text-warm-fg mb-4">About Your Instructor</h2>
                <p className="text-warm-fg leading-relaxed">{cookingClass.about}</p>
              </div>
            )}

            {/* Menu */}
            {cookingClass.menu && (
              <div className="bg-warm-bg-alt rounded-lg p-6 mb-6 border border-warm-border">
                <h2 className="text-xl font-semibold text-warm-fg mb-4">What You'll Cook</h2>
                <p className="text-warm-fg leading-relaxed">{cookingClass.menu}</p>
              </div>
            )}

            {/* Schedule */}
            {cookingClass.schedule && (
              <div className="bg-warm-bg-alt rounded-lg p-6 mb-6 border border-warm-border">
                <h2 className="text-xl font-semibold text-warm-fg mb-4">Class Schedule</h2>
                <p className="text-warm-fg leading-relaxed">{cookingClass.schedule}</p>
              </div>
            )}

            {/* Highlights */}
            {cookingClass.highlights && (
              <div className="bg-warm-bg-alt rounded-lg p-6 mb-6 border border-warm-border">
                <h2 className="text-xl font-semibold text-warm-fg mb-4">Class Highlights</h2>
                <p className="text-warm-fg leading-relaxed">{cookingClass.highlights}</p>
              </div>
            )}

            {/* Additional Information */}
            {cookingClass.additionalInformation && (
              <div className="bg-warm-bg-alt rounded-lg p-6 mb-6 border border-warm-border">
                <h2 className="text-xl font-semibold text-warm-fg mb-4">Additional Information</h2>
                <p className="text-warm-fg leading-relaxed">{cookingClass.additionalInformation}</p>
              </div>
            )}
          </div>

          {/* Right Column - Booking & Map */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border sticky top-6">
              <h3 className="text-xl font-semibold text-warm-fg mb-4">Book This Class</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-warm-green">${cookingClass.price}</span>
                  <span className="text-warm-fg-muted ml-2">per person</span>
                </div>
                
                <Button 
                  className="w-full bg-warm-orange hover:bg-warm-orange/90 text-white font-semibold py-3 px-6 rounded-lg transition-smooth"
                  onClick={() => {
                    // TODO: Implement booking functionality
                    alert('Booking functionality coming soon!')
                  }}
                >
                  Book Now
                </Button>
                
                <div className="text-center text-sm text-warm-fg-muted">
                  <p>Secure booking • Free cancellation</p>
                  <p>Instant confirmation</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h3 className="text-xl font-semibold text-warm-fg mb-4">Location</h3>
              <AddressMap address={cookingClass.address} />
              <p className="text-sm text-warm-fg-muted mt-2">{cookingClass.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 