'use client';

import { CookingClass } from '../../types';
import GoogleMapComponent from '../../components/ui/GoogleMap';
import { useState, useEffect } from 'react';

interface ClassModalProps {
  cookingClass: CookingClass | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ClassModal({ cookingClass, isOpen, onClose }: ClassModalProps) {
  if (!isOpen || !cookingClass) return null;

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !cookingClass) return;
    setCoords(null);
    setMapError(null);
    setMapLoading(true);
    // Geocode the address
    const fetchCoords = async () => {
      try {
        const address = encodeURIComponent(cookingClass.address);
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === 'OK' && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoords({ lat, lng });
        } else {
          setMapError('Could not find location.');
        }
      } catch (err) {
        setMapError('Failed to load map.');
      } finally {
        setMapLoading(false);
      }
    };
    fetchCoords();
  }, [isOpen, cookingClass]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in border border-black">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-black">
          <h2 className="text-2xl font-bold text-black">{cookingClass.title}</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-white transition-smooth p-1 rounded-full hover:bg-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image placeholder */}
          <div className="relative h-64 bg-white border border-black rounded-lg mb-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black">Class Image</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-black mb-6 leading-relaxed">
            {cookingClass.description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-black mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-black">{cookingClass.location}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-black mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-black">{cookingClass.instructorName}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-black mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-black">{cookingClass.duration}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-black mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-black">{cookingClass.cuisineType}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-black mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-black">{cookingClass.difficulty}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-black mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-black">Max {cookingClass.maxStudents} students</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-2">Location</h3>
            <p className="text-black">{cookingClass.address}</p>
          </div>

          {/* Map at the bottom */}
          <div className="mt-8">
            {mapLoading && <div className="flex justify-center"><span className="text-black">Loading map...</span></div>}
            {mapError && <div className="text-red-500 text-center">{mapError}</div>}
            {coords && (
              <GoogleMapComponent lat={coords.lat} lng={coords.lng} />
            )}
          </div>

          {/* Price and Booking */}
          <div className="flex items-center justify-between pt-6 border-t border-black mt-8">
            <div className="text-3xl font-bold text-black">
              ${cookingClass.price}
            </div>
            <button className="bg-[#0033A0] text-white px-6 py-3 rounded-lg font-semibold border-2 border-[#0033A0] hover:bg-[#00247A] transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
              Book This Class
            </button>
          </div>
        </div>
      </div>
      {/* Force Tailwind to generate custom green classes */}
      <div className="hidden bg-n64-green bg-n64-green-dark"></div>
    </div>
  );
}
