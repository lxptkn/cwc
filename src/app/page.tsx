'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import ClassCard from '../components/ClassCard/ClassCard';
import ClassModal from '../components/ClassModal/ClassModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import SkeletonCard from '../components/ui/SkeletonCard';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import PriceSlider from '../components/ui/PriceSlider';
import { mockClasses } from '../data/mockClasses';
import { filterClasses, getPriceRange } from '../utils/searchUtils';
import { CookingClass } from '../types';
import Footer from '../components/ui/Button';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<CookingClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Price filter state
  const priceRange = getPriceRange(mockClasses);
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  // Pagination state
  const [resultsToShow, setResultsToShow] = useState(16);

  // Simulate loading state on initial load
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Debounced search with loading state
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Reset pagination when filters/search change
  useEffect(() => {
    setResultsToShow(16);
  }, [searchQuery, minPrice, maxPrice]);

  const filteredClasses = filterClasses(mockClasses, searchQuery, minPrice, maxPrice);
  const visibleClasses = filteredClasses.slice(0, resultsToShow);
  const canLoadMore = resultsToShow < filteredClasses.length;

  const handleClassClick = (cookingClass: CookingClass) => {
    try {
      setSelectedClass(cookingClass);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to open class details');
      console.error('Error opening modal:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setError(null); // Clear any previous errors
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍳</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Discover Cooking Classes
            </h2>
            {isSearching ? (
              <div className="flex items-center text-gray-600">
                <LoadingSpinner size="sm" className="mr-2" />
                Searching...
              </div>
            ) : (
              <p className="text-gray-600">
                {filteredClasses.length} of {mockClasses.length} amazing classes available worldwide
              </p>
            )}
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            <PriceSlider
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
              currentMin={minPrice}
              currentMax={maxPrice}
              onPriceChange={handlePriceChange}
            />
          </div>
          
          {/* Class Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredClasses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleClasses.map((cookingClass) => (
                  <ClassCard
                    key={cookingClass.id}
                    cookingClass={cookingClass}
                    onClick={handleClassClick}
                  />
                ))}
              </div>
              {canLoadMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setResultsToShow(r => r + 16)}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-md"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or price range to find more classes.
              </p>
            </div>
          )}
        </main>

        {/* Modal */}
        <ClassModal
          cookingClass={selectedClass}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
