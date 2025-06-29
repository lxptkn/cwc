'use client';

import { useState } from 'react';
import Header from '../components/Header/Header';
import ClassCard from '../components/ClassCard/ClassCard';
import ClassModal from '../components/ClassModal/ClassModal';
import { mockClasses } from '../data/mockClasses';
import { filterClasses } from '../utils/searchUtils';
import { CookingClass } from '../types';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<CookingClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredClasses = filterClasses(mockClasses, searchQuery);

  const handleClassClick = (cookingClass: CookingClass) => {
    setSelectedClass(cookingClass);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Cooking Classes
          </h2>
          <p className="text-gray-600">
            {filteredClasses.length} of {mockClasses.length} amazing classes available worldwide
          </p>
        </div>
        
        {/* Class Grid */}
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClasses.map((cookingClass) => (
              <ClassCard
                key={cookingClass.id}
                cookingClass={cookingClass}
                onClick={handleClassClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all available classes.
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
    </div>
  );
}
