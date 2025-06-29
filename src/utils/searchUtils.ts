import { CookingClass } from '../types';

interface FilterOptions {
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function filterClasses(
  classes: CookingClass[], 
  searchQuery: string = '', 
  minPrice?: number, 
  maxPrice?: number
): CookingClass[] {
  return classes.filter((cookingClass) => {
    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const searchableFields = [
        cookingClass.title,
        cookingClass.location,
        cookingClass.cuisineType,
        cookingClass.instructorName,
        cookingClass.description
      ];

      const matchesSearch = searchableFields.some(field => 
        field.toLowerCase().includes(query)
      );

      if (!matchesSearch) {
        return false;
      }
    }

    // Price range filter
    if (minPrice !== undefined && cookingClass.price < minPrice) {
      return false;
    }

    if (maxPrice !== undefined && cookingClass.price > maxPrice) {
      return false;
    }

    return true;
  });
}

// Helper function to get price range from classes
export function getPriceRange(classes: CookingClass[]): { min: number; max: number } {
  if (classes.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = classes.map(c => c.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}
