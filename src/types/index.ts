export interface CookingClass {
  id: string;
  title: string;
  description: string;
  location: string;
  address: string;
  price: number;
  imageUrl: string;
  instructorName: string;
  classDate: string;
  maxStudents: number;
  cuisineType: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}
