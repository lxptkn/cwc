'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { CreateClassData } from '@/types'
import MainHeader from '../Header/MainHeader'
import Footer from '@/components/ui/Footer'
import { Plus, X } from 'lucide-react'

export default function CreateClassForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Dynamic fields state
  const [dishes, setDishes] = useState<string[]>([''])
  const [whatToBring, setWhatToBring] = useState<string[]>([''])
  const [provided, setProvided] = useState<string[]>([''])
  
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
    image: '',
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxStudents' || name === 'price' ? parseFloat(value) || 0 : value
    }))
  }

  // Dynamic field handlers
  const addDish = () => {
    setDishes([...dishes, ''])
  }

  const removeDish = (index: number) => {
    if (dishes.length > 1) {
      setDishes(dishes.filter((_, i) => i !== index))
    }
  }

  const updateDish = (index: number, value: string) => {
    const newDishes = [...dishes]
    newDishes[index] = value
    setDishes(newDishes)
  }

  const addWhatToBring = () => {
    setWhatToBring([...whatToBring, ''])
  }

  const removeWhatToBring = (index: number) => {
    if (whatToBring.length > 1) {
      setWhatToBring(whatToBring.filter((_, i) => i !== index))
    }
  }

  const updateWhatToBring = (index: number, value: string) => {
    const newWhatToBring = [...whatToBring]
    newWhatToBring[index] = value
    setWhatToBring(newWhatToBring)
  }

  const addProvided = () => {
    setProvided([...provided, ''])
  }

  const removeProvided = (index: number) => {
    if (provided.length > 1) {
      setProvided(provided.filter((_, i) => i !== index))
    }
  }

  const updateProvided = (index: number, value: string) => {
    const newProvided = [...provided]
    newProvided[index] = value
    setProvided(newProvided)
  }

  const handleImageUpload = async (file: File) => {
    try {
      // Clear previous upload errors
      setUploadError(null)
      
      // Validate file size before upload
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB. Please choose a smaller image.')
        return null
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif']
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setUploadError('Only JPG, PNG, GIF, WebP, and HEIC image files are allowed.')
        return null
      }

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        // Provide specific error messages based on the API response
        let errorMessage = 'Failed to upload image. '
        if (data.error) {
          if (data.error.includes('10MB')) {
            errorMessage += 'File size must be less than 10MB.'
          } else if (data.error.includes('image files')) {
            errorMessage += 'Only JPG, PNG, GIF, WebP, and HEIC files are allowed.'
          } else {
            errorMessage += data.error
          }
        } else {
          errorMessage += 'Please try again.'
        }
        setUploadError(errorMessage)
        return null
      }

      setFormData(prev => ({
        ...prev,
        image: data.url
      }))

      return data.url
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Network error occurred. Please check your connection and try again.')
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user?.id) {
      setError('Please sign in to create a class')
      return
    }

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.duration.trim() || formData.maxStudents <= 0 || formData.price <= 0) {
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
      // Combine dynamic fields into comma-separated strings
      const menuString = dishes.filter(dish => dish.trim()).join(', ')
      const highlightsString = whatToBring.filter(item => item.trim()).join(', ')
      const additionalInfoString = provided.filter(item => item.trim()).join(', ')

             const submitData = {
         ...formData,
         menu: menuString,
         highlights: highlightsString,
         additionalInformation: additionalInfoString
       }

      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
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
         {/* Header and Form Container */}
         <div className="max-w-4xl mx-auto">
           {/* Header */}
           <div className="mb-8">
             <h1 className="text-3xl font-bold text-warm-fg mb-2">Create a New Class</h1>
             <p className="text-warm-fg-muted">
               Share your culinary expertise with students
             </p>
           </div>

           {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
                         {/* Basic Information */}
             <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
               <h2 className="text-xl font-semibold text-warm-fg mb-4">Basic Information</h2>
               
                               {/* Class Image */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Class Image
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setSelectedImage(file)
                            setError(null)
                            setUploadError(null)
                            
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
                            alt="Class preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {formData.image && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ Image uploaded successfully
                          </p>
                        )}
                      </div>
                    )}

                    {/* Upload Error Display */}
                    {uploadError && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700 font-medium">Upload Failed</p>
                        <p className="text-xs text-red-600 mt-1">{uploadError}</p>
                        <p className="text-xs text-red-500 mt-2">
                          Supported formats: JPG, PNG, GIF, WebP, HEIC (max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload an image for your class (JPG, PNG, GIF, WebP, HEIC up to 10MB)
                  </p>
                </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Class Name *
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
                    Class Duration *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                    <option value="3 hours">3 hours</option>
                    <option value="4 hours">4 hours</option>
                    <option value="5 hours">5 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Max Students *
                  </label>
                  <select
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    required
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'student' : 'students'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Difficulty *
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
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">Location Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="e.g., Downtown Kitchen, Home Studio, Community Center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>
              </div>
            </div>

            {/* Class Details */}
            <div className="bg-warm-bg-alt rounded-lg p-6 border border-warm-border">
              <h2 className="text-xl font-semibold text-warm-fg mb-4">Class Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    About This Class *
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

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Dishes
                  </label>
                  <div className="space-y-2">
                    {dishes.map((dish, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={dish}
                          onChange={(e) => updateDish(index, e.target.value)}
                          className="flex-1 p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                          placeholder="e.g., Homemade pasta, Marinara sauce"
                        />
                                                 {dishes.length > 1 && (
                           <button
                             type="button"
                             onClick={() => removeDish(index)}
                             className="p-3 text-red-500 hover:text-red-700 cursor-pointer"
                           >
                             <X size={20} />
                           </button>
                         )}
                      </div>
                    ))}
                                         <button
                       type="button"
                       onClick={addDish}
                       className="flex items-center gap-2 text-warm-orange hover:text-warm-orange/80 cursor-pointer"
                     >
                       <Plus size={16} />
                       Add another dish
                     </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    What to Bring
                  </label>
                  <div className="space-y-2">
                    {whatToBring.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateWhatToBring(index, e.target.value)}
                          className="flex-1 p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                          placeholder="e.g., Apron, Comfortable shoes"
                        />
                                                 {whatToBring.length > 1 && (
                           <button
                             type="button"
                             onClick={() => removeWhatToBring(index)}
                             className="p-3 text-red-500 hover:text-red-700 cursor-pointer"
                           >
                             <X size={20} />
                           </button>
                         )}
                      </div>
                    ))}
                                         <button
                       type="button"
                       onClick={addWhatToBring}
                       className="flex items-center gap-2 text-warm-orange hover:text-warm-orange/80 cursor-pointer"
                     >
                       <Plus size={16} />
                       Add another item
                     </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-fg mb-2">
                    Provided
                  </label>
                  <div className="space-y-2">
                    {provided.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateProvided(index, e.target.value)}
                          className="flex-1 p-3 border border-warm-border rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                          placeholder="e.g., All ingredients, Cooking equipment"
                        />
                                                 {provided.length > 1 && (
                           <button
                             type="button"
                             onClick={() => removeProvided(index)}
                             className="p-3 text-red-500 hover:text-red-700 cursor-pointer"
                           >
                             <X size={20} />
                           </button>
                         )}
                      </div>
                    ))}
                                         <button
                       type="button"
                       onClick={addProvided}
                       className="flex items-center gap-2 text-warm-orange hover:text-warm-orange/80 cursor-pointer"
                     >
                       <Plus size={16} />
                       Add another item
                     </button>
                  </div>
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
                 className="bg-warm-gray hover:bg-warm-gray/80 text-warm-fg px-6 py-3 rounded-lg cursor-pointer"
               >
                 Cancel
               </Button>
               <Button
                 type="submit"
                 disabled={isSubmitting}
                 className="bg-warm-orange hover:bg-warm-orange/90 text-black dark:text-white px-6 py-3 rounded-lg cursor-pointer"
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