'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CookingClass } from '../../types';

interface ClassCardProps {
  cookingClass: CookingClass;
}

export default function ClassCard({ cookingClass }: ClassCardProps) {
  return (
    <Link 
      href={`/class/${cookingClass.id}`}
      className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
    >
      {/* Image placeholder */}
      <div className="relative h-48 bg-warm-gray overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-smooth">
          <img 
            src="/placeholder.svg" 
            alt="Class placeholder" 
            width={1200} 
            height={1200}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-warm-fg mb-2 line-clamp-2 group-hover:text-warm-orange transition-smooth">
          {cookingClass.title}
        </h3>
        
        <div className="flex items-center text-warm-fg-dim mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{cookingClass.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-warm-orange/20 text-warm-orange text-xs font-medium rounded-full transition-smooth group-hover:bg-warm-orange/30">
              {cookingClass.cuisineType}
            </span>
            <span className="px-2 py-1 bg-warm-teal/20 text-warm-teal text-xs font-medium rounded-full transition-smooth group-hover:bg-warm-teal/30">
              {cookingClass.difficulty}
            </span>
          </div>
          <span className="text-lg font-bold text-warm-green group-hover:scale-110 transition-smooth">
            ${cookingClass.price}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-warm-fg-muted">
          <span>{cookingClass.duration}</span>
          <span>{cookingClass.maxStudents} students max</span>
        </div>
      </div>
    </Link>
  );
}
