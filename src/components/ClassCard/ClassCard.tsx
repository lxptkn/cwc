'use client';

import Image from 'next/image';
import { CookingClass } from '../../types';

interface ClassCardProps {
  cookingClass: CookingClass;
  onClick: (classData: CookingClass) => void;
}

export default function ClassCard({ cookingClass, onClick }: ClassCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(cookingClass)}
    >
      {/* Image placeholder */}
      <div className="relative h-48 bg-gray-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Class Image</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {cookingClass.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{cookingClass.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
              {cookingClass.cuisineType}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {cookingClass.difficulty}
            </span>
          </div>
          <span className="text-lg font-bold text-orange-600">
            ${cookingClass.price}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{cookingClass.duration}</span>
          <span>{cookingClass.maxStudents} students max</span>
        </div>
      </div>
    </div>
  );
}
