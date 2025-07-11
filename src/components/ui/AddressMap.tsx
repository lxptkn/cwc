'use client'

import { useState, useEffect } from 'react'
import GoogleMapComponent from './GoogleMap'
import LoadingSpinner from './LoadingSpinner'

interface AddressMapProps {
  address: string
  className?: string
}

export default function AddressMap({ address, className = '' }: AddressMapProps) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const encodedAddress = encodeURIComponent(address)
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        
        if (!apiKey) {
          setError('Google Maps API key not configured')
          setIsLoading(false)
          return
        }

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
        const response = await fetch(url)
        const data = await response.json()

        if (data.status === 'OK' && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location
          setCoords({ lat, lng })
        } else {
          setError('Could not find location for this address')
        }
      } catch (err) {
        console.error('Error geocoding address:', err)
        setError('Failed to load map')
      } finally {
        setIsLoading(false)
      }
    }

    if (address) {
      fetchCoords()
    }
  }, [address])

  if (isLoading) {
    return (
      <div className={`h-64 rounded-lg overflow-hidden bg-warm-gray flex items-center justify-center ${className}`}>
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`h-64 rounded-lg overflow-hidden bg-warm-gray flex items-center justify-center ${className}`}>
        <div className="text-center text-warm-fg-muted">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!coords) {
    return (
      <div className={`h-64 rounded-lg overflow-hidden bg-warm-gray flex items-center justify-center ${className}`}>
        <div className="text-center text-warm-fg-muted">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">Location not available</p>
        </div>
      </div>
    )
  }

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(address)
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
    window.open(directionsUrl, '_blank')
  }

  const handleViewOnGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(address)
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    window.open(mapsUrl, '_blank')
  }

  return (
    <div className={className}>
      <GoogleMapComponent 
        lat={coords.lat} 
        lng={coords.lng} 
        zoom={15}
        className="h-64 rounded-lg overflow-hidden"
      />
      <div className="mt-3 space-y-2">
        <button
          onClick={handleGetDirections}
          className="w-full bg-warm-teal text-black px-4 py-2 rounded-lg font-medium hover:bg-warm-teal/90 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
          </svg>
          Get Directions
        </button>
        <button
          onClick={handleViewOnGoogleMaps}
          className="w-full bg-warm-orange text-black px-4 py-2 rounded-lg font-medium hover:bg-warm-orange/90 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          View on Google Maps
        </button>
      </div>
    </div>
  )
} 