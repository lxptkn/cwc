'use client'

import Image from 'next/image'
import { User } from '@/types'
import { Badge } from '@/components/ui/badge'
import { FALLBACK_IMAGES } from '@/utils/imageUtils'

interface InstructorProfileCardProps {
  instructor: User
  showFullProfile?: boolean
}

export function InstructorProfileCard({ instructor, showFullProfile = false }: InstructorProfileCardProps) {
  const profileImage = instructor.profileImage || FALLBACK_IMAGES.instructor

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Instructor Image - Left Side */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={profileImage}
              alt={`${instructor.name} profile`}
              width={384}
              height={384}
              className="rounded-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = FALLBACK_IMAGES.instructor
              }}
            />
          </div>
        </div>

        {/* Instructor Content - Right Side */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
            {instructor.yearsExperience && (
              <p className="text-lg text-gray-600 mb-4">
                {instructor.yearsExperience} years of culinary experience
              </p>
            )}
          </div>

          {instructor.bio && (
            <div>
              <p className="text-gray-700 leading-relaxed">{instructor.bio}</p>
            </div>
          )}

          {instructor.specialties && instructor.specialties.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {instructor.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {showFullProfile && instructor.awards && instructor.awards.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Awards & Recognition</h4>
              <ul className="text-gray-700 space-y-1">
                {instructor.awards.map((award, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-yellow-500 mr-2">🏆</span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showFullProfile && instructor.languages && instructor.languages.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {instructor.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 