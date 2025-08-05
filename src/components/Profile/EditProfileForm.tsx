'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { User } from '@/types'
import MainHeader from '../Header/MainHeader'
import Footer from '@/components/ui/Footer'
import { Plus, X } from 'lucide-react'

interface EditProfileFormProps {
  user: User
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Dynamic fields state
  const [specialties, setSpecialties] = useState<string[]>([''])
  const [awards, setAwards] = useState<string[]>([''])
  const [languages, setLanguages] = useState<string[]>([''])
  
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    bio: user.bio || '',
    yearsExperience: user.yearsExperience || 0,
    profileImage: user.profileImage || '',
  })
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  // Initialize dynamic fields with existing data
  useEffect(() => {
    if (user.specialties && user.specialties.length > 0) {
      setSpecialties(user.specialties)
    }
    if (user.awards && user.awards.length > 0) {
      setAwards(user.awards)
    }
    if (user.languages && user.languages.length > 0) {
      setLanguages(user.languages)
    }
    if (user.profileImage) {
      setImagePreview(user.profileImage)
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'yearsExperience' ? parseInt(value) || 0 : value
    }))
  }

  // Dynamic field handlers
  const addSpecialty = () => {
    setSpecialties([...specialties, ''])
  }

  const removeSpecialty = (index: number) => {
    if (specialties.length > 1) {
      setSpecialties(specialties.filter((_, i) => i !== index))
    }
  }

  const updateSpecialty = (index: number, value: string) => {
    const newSpecialties = [...specialties]
    newSpecialties[index] = value
    setSpecialties(newSpecialties)
  }

  const addAward = () => {
    setAwards([...awards, ''])
  }

  const removeAward = (index: number) => {
    if (awards.length > 1) {
      setAwards(awards.filter((_, i) => i !== index))
    }
  }

  const updateAward = (index: number, value: string) => {
    const newAwards = [...awards]
    newAwards[index] = value
    setAwards(newAwards)
  }

  const addLanguage = () => {
    setLanguages([...languages, ''])
  }

  const removeLanguage = (index: number) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((_, i) => i !== index))
    }
  }

  const updateLanguage = (index: number, value: string) => {
    const newLanguages = [...languages]
    newLanguages[index] = value
    setLanguages(newLanguages)
  }

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'profile')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      setFormData(prev => ({
        ...prev,
        profileImage: data.url
      }))

      return data.url
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload image. Please try again.')
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user?.id) {
      setError('Please sign in to edit your profile')
      return
    }

    // Basic validation
    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const submitData = {
        ...formData,
        specialties: specialties.filter(specialty => specialty.trim()),
        awards: awards.filter(award => award.trim()),
        languages: languages.filter(language => language.trim()),
      }

      const response = await fetch(`/api/users/${session.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-bg dark:bg-gray-800">
      <MainHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Header and Form Container */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-warm-fg mb-2">Edit Profile</h1>
            <p className="text-warm-fg-muted">
              Update your profile information
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">Basic Information</h2>
              
              {/* Profile Image */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-warm-fg mb-2">
                  Profile Image
                </label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setSelectedImage(file)
                          setError(null)
                          
                          // Create preview
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            setImagePreview(e.target?.result as string)
                          }
                          reader.readAsDataURL(file)
                          
                          // Upload the file
                          const uploadedUrl = await handleImageUpload(file)
                          if (!uploadedUrl) {
                            setSelectedImage(null)
                            setImagePreview('')
                          }
                        }
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-warm-orange file:text-black hover:file:bg-warm-orange/90 cursor-pointer"
                    />
                  </div>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {formData.profileImage && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Image uploaded successfully
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a profile image (JPG, PNG, GIF up to 5MB)
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent bg-gray-100"
                    placeholder="your.email@example.com"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="0"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">About You</h2>
              <div>
                <label className="block text-sm font-medium text-warm-fg mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                  rows={4}
                  placeholder="Tell us about your culinary journey, experience, and what makes you unique as an instructor..."
                />
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">Specialties</h2>
              <div className="space-y-2">
                {specialties.map((specialty, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={specialty}
                      onChange={(e) => updateSpecialty(index, e.target.value)}
                      className="flex-1 p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                      placeholder="e.g., Italian Cuisine, Pastry, Sushi"
                    />
                    {specialties.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecialty(index)}
                        className="p-3 text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="flex items-center gap-2 text-warm-orange hover:text-warm-orange/80 cursor-pointer"
                >
                  <Plus size={16} />
                  Add another specialty
                </button>
              </div>
            </div>

            {/* Awards */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">Awards & Recognition</h2>
              <div className="space-y-2">
                {awards.map((award, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={award}
                      onChange={(e) => updateAward(index, e.target.value)}
                      className="flex-1 p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                      placeholder="e.g., Best Chef 2023, Michelin Star"
                    />
                    {awards.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAward(index)}
                        className="p-3 text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAward}
                  className="flex items-center gap-2 text-warm-orange hover:text-warm-orange/80 cursor-pointer"
                >
                  <Plus size={16} />
                  Add another award
                </button>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">Languages</h2>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => updateLanguage(index, e.target.value)}
                      className="flex-1 p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                      placeholder="e.g., English, Spanish, French"
                    />
                    {languages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="p-3 text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLanguage}
                  className="flex items-center gap-2 text-warm-orange hover:text-warm-orange/80 cursor-pointer"
                >
                  <Plus size={16} />
                  Add another language
                </button>
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
                className="bg-warm-gray hover:bg-warm-gray/80 text-warm-fg px-6 py-3 rounded-lg cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-warm-orange hover:bg-warm-orange/90 text-black dark:text-white px-6 py-3 rounded-lg cursor-pointer"
              >
                {isSubmitting ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
} 