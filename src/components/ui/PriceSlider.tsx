'use client';

import { useState, useEffect, useRef } from 'react';

interface PriceSliderProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onPriceChange: (min: number, max: number) => void;
  className?: string;
}

export default function PriceSlider({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onPriceChange,
  className = ''
}: PriceSliderProps) {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Round max price to nearest hundred
  const roundedMaxPrice = Math.ceil(maxPrice / 100) * 100;

  const getPercentage = (value: number) => {
    return ((value - minPrice) / (roundedMaxPrice - minPrice)) * 100;
  };

  const getValueFromPercentage = (percentage: number) => {
    const value = (percentage / 100) * (roundedMaxPrice - minPrice) + minPrice;
    // Round to nearest $5 increment
    return Math.round(value / 5) * 5;
  };

  const handleMouseDown = (e: React.MouseEvent, thumb: 'min' | 'max') => {
    e.preventDefault();
    setIsDragging(thumb);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const value = getValueFromPercentage(percentage);

    if (isDragging === 'min') {
      const newMin = Math.min(value, currentMax - 10);
      onPriceChange(newMin, currentMax);
    } else {
      const newMax = Math.max(value, currentMin + 10);
      onPriceChange(currentMin, newMax);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, currentMin, currentMax]);

  const minPercentage = getPercentage(currentMin);
  const maxPercentage = getPercentage(currentMax);

  return (
    <div className={`max-w-md ${className}`}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white mb-2">
          Price Range
        </label>
        <div className="flex justify-between text-sm text-black dark:text-white">
          <span>${currentMin}</span>
          <span>${currentMax}</span>
        </div>
      </div>
      
      <div
        ref={sliderRef}
        className="relative h-2 bg-white dark:bg-gray-900 border border-black dark:border-white rounded-full cursor-pointer"
        onMouseDown={(e) => {
          const rect = sliderRef.current?.getBoundingClientRect();
          if (!rect) return;
          
          const percentage = ((e.clientX - rect.left) / rect.width) * 100;
          const value = getValueFromPercentage(percentage);
          
          if (Math.abs(value - currentMin) < Math.abs(value - currentMax)) {
            handleMouseDown(e, 'min');
          } else {
            handleMouseDown(e, 'max');
          }
        }}
      >
        {/* Track fill */}
        <div
          className="absolute h-full bg-black dark:bg-gray-600 rounded-full"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`
          }}
        />
        
        {/* Min thumb */}
        <div
          className={`absolute top-1/2 w-3 h-3 bg-white border-2 border-black rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md hover:shadow-lg transition-shadow ${
            isDragging === 'min' ? 'shadow-lg scale-110' : ''
          }`}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
        />
        
        {/* Max thumb */}
        <div
          className={`absolute top-1/2 w-3 h-3 bg-white border-2 border-black rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md hover:shadow-lg transition-shadow ${
            isDragging === 'max' ? 'shadow-lg scale-110' : ''
          }`}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'max')}
        />
      </div>
    </div>
  );
} 