'use client';

import { useState, useEffect } from 'react';
import MainHeader from '../components/Header/MainHeader';
import SearchBar from '../components/Header/SearchBar';
import ClassCard from '../components/ClassCard/ClassCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import SkeletonCard from '../components/ui/SkeletonCard';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import PriceSlider from '../components/ui/PriceSlider';
import { filterClasses, getPriceRange } from '../utils/searchUtils';
import { CookingClass } from '../types';
import Footer from '../components/ui/Footer';
import { TestimonialCard } from "../components/TestimonialCard/testimonial-card"


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<CookingClass[]>([]);

  // Price filter state
  const priceRange = getPriceRange(classes);
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  // Pagination state
  const [resultsToShow, setResultsToShow] = useState(16);

  // Fetch classes from API
  useEffect(() => {
    setIsLoading(true);
    fetch('/api/classes')
      .then(res => res.json())
      .then(data => {
        setClasses(data.classes || []);
        setIsLoading(false);
        // Reset price range to match fetched data
        const range = getPriceRange(data.classes || []);
        setMinPrice(range.min);
        setMaxPrice(range.max);
      })
      .catch(err => {
        setError('Failed to fetch classes');
        setIsLoading(false);
      });
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

  const filteredClasses = filterClasses(classes, searchQuery, minPrice, maxPrice);
  const visibleClasses = filteredClasses.slice(0, resultsToShow);
  const canLoadMore = resultsToShow < filteredClasses.length;

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
      <div className="min-h-screen bg-warm-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍳</div>
          <h2 className="text-2xl font-bold text-warm-fg mb-2">
            Something went wrong
          </h2>
          <p className="text-warm-fg-dim mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="bg-warm-orange text-black px-6 py-3 rounded-lg font-semibold hover:bg-warm-orange-light transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-warm-bg dark:bg-gray-800">
        <MainHeader />
        <section className="py-12 md:py-16 lg:py-20 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-gray-900 dark:text-white">
                Master the Art of Cooking
              </h1>
              <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-gray-600 dark:text-gray-300 md:text-xl">
                Join our expert-led cooking classes and transform your culinary skills from amateur to professional.
              </p>
              
            </div>
          </section>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Search Section */}
          <div className="mb-8">
            <div className="max-w-md mx-auto">
              <SearchBar 
                searchQuery={searchQuery} 
                onSearchChange={handleSearchChange} 
              />
            </div>
          </div>
          
          {/* Price Filter Section */}
          <div className="mb-8">
            <div className="max-w-md mx-auto">
              <PriceSlider
                minPrice={priceRange.min}
                maxPrice={priceRange.max}
                currentMin={minPrice}
                currentMax={maxPrice}
                onPriceChange={handlePriceChange}
              />
            </div>
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
                  />
                ))}
              </div>
              {canLoadMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setResultsToShow(r => r + 16)}
                    className="inline-flex px-20 py-3 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  >
                    Load More...
                  </button>
                </div>
              )}
              
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-warm-fg-muted mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-warm-fg mb-2">No classes found</h3>
              <p className="text-warm-fg-dim">
                Try adjusting your search terms or price range to find more classes.
              </p>
            </div>
          )}
          
        </main>
          <section id="testimonials" className="py-12 md:py-16 lg:py-20 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
                What Our Students Say
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <TestimonialCard
                  quote="The Italian cooking class completely transformed my home cooking. I now make pasta from scratch every weekend!"
                  author="Sarah Johnson"
                  role="Home Cook"
                />
                <TestimonialCard
                  quote="As a professional chef, I was impressed by the techniques taught in the French Pastry course. Truly exceptional."
                  author="Michael Chen"
                  role="Restaurant Owner"
                />
                <TestimonialCard
                  quote="The instructors are patient and knowledgeable. I went from burning water to making complex dishes in just weeks."
                  author="Emma Rodriguez"
                  role="Beginner Cook"
                />
              </div>
            </div>
          </section>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
