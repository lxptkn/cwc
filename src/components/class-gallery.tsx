"use client"

import { useState } from "react"
import Image from "next/image"

interface ClassGalleryProps {
  images: string[]
}

export function ClassGallery({ images }: ClassGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {/* Main Image */}
      <div className="md:col-span-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={images[selectedImage] || "/placeholder.svg"} alt="Class image" fill className="object-cover" />
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-2 md:grid-cols-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === index ? "border-gray-900" : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`Class image ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
