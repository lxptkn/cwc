'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { CreateClassData } from '@/types'
import MainHeader from '../Header/MainHeader'
import Footer from '@/components/ui/Footer';

export default function CreateClassForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<CreateClassData>({
    title: '',
    description: '',
    location: '',
    address: '',
    instructorName: '',
    duration: '',
    cuisineType: '',
    difficulty: 'Beginner',
    about: '',
    menu: '',
    schedule: '',
    highlights: '',
    additionalInformation: '',
    maxStudents: 10,
    price: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxStudents' || name === 'price' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user?.id) {
      setError('Please sign in to create a class')
      return
    }

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.price <= 0) {
      setError('Price must be greater than 0')
      return
    }

    if (formData.maxStudents <= 0) {
      setError('Maximum students must be greater than 0')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create class')
      }

      // Redirect to the new class page
      router.push(`/class/${data.class.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create class')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-bg dark:bg-gray-800">
      <MainHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-warm-fg mb-2">Create a New Class</h1>
          <p className="text-warm-fg-muted">
            Share your culinary expertise with students
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Class Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="e.g., Italian Pasta Making"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Cuisine Type *
                  </label>
                  <input
                    type="text"
                    name="cuisineType"
                    value={formData.cuisineType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="e.g., Italian, French, Asian"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="e.g., 2 hours"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Maximum Students *
                  </label>
                  <input
                    type="number"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="10"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-warm-fg mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                  rows={4}
                  placeholder="Describe what students will learn in this class..."
                  required
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">Location Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="e.g., Downtown Kitchen Studio"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="123 Main St, City, State 12345"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Instructor Name *
                  </label>
                  <input
                    type="text"
                    name="instructorName"
                    value={formData.instructorName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="Your name or chef name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Class Details */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">Class Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    About the Instructor
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    rows={3}
                    placeholder="Tell students about your culinary background and expertise..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    What You'll Cook
                  </label>
                  <textarea
                    name="menu"
                    value={formData.menu}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    rows={3}
                    placeholder="Describe the dishes or recipes students will learn to make..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Class Schedule
                  </label>
                  <textarea
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    rows={3}
                    placeholder="When does this class typically run? (e.g., Every Saturday at 2 PM)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Class Highlights
                  </label>
                  <textarea
                    name="highlights"
                    value={formData.highlights}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    rows={3}
                    placeholder="What makes this class special? Key learning points..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInformation"
                    value={formData.additionalInformation}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    rows={3}
                    placeholder="Any other important details students should know..."
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-4 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={() => router.back()}
                className="bg-warm-gray hover:bg-warm-gray/80 text-warm-fg px-6 py-3 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-warm-orange hover:bg-warm-orange/90 text-black dark:text-white px-6 py-3 rounded-lg"
              >
                {isSubmitting ? 'Creating...' : 'Create Class'}
              </Button>
            </div>
          </form>
          
        </div>
      </div>
      <Footer />
    </div>
  )
} 