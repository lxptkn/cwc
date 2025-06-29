import { CookingClass } from '../types';

export function filterClasses(classes: CookingClass[], searchQuery: string): CookingClass[] {
  if (!searchQuery.trim()) {
    return classes;
  }

  const query = searchQuery.toLowerCase().trim();
  
  return classes.filter((cookingClass) => {
    const searchableFields = [
      cookingClass.title,
      cookingClass.location,
      cookingClass.cuisineType,
      cookingClass.instructorName,
      cookingClass.description
    ];

    return searchableFields.some(field => 
      field.toLowerCase().includes(query)
    );
  });
}
