export interface CookingClass {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string;
  price: number;
  instructorName: string;
  maxStudents: number;
  cuisineType: string;
  duration: string;
  difficulty: string;
  rating: number;
  about: string;
  menu: string;
  schedule: string;
  highlights: string;
  additionalInformation: string;
  image?: string;
  instructorId: string;
  instructor?: User;
  reviews?: Review[];
  bookings?: Booking[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  image?: string | null;
  profileImage?: string | null;
  yearsExperience?: number | null;
  awards: string[];
  bio?: string | null;
  specialties: string[];
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
  reviews?: Review[];
  createdClasses?: CookingClass[];
  bookings?: Booking[];
}

export interface Review {
  id: number;
  classId: number;
  author: string;
  content: string;
  rating: number;
  userId?: string;
  user?: User;
  createdAt: Date;
}

export interface Booking {
  id: number;
  classId: number;
  userId: string;
  status: BookingStatus;
  class?: CookingClass;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface CreateClassData {
  title: string;
  description: string;
  location: string;
  address: string;
  instructorName: string;
  duration: string;
  cuisineType: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  about: string;
  menu: string;
  schedule: string;
  highlights: string;
  additionalInformation: string;
  maxStudents: number;
  price: number;
  image?: string;
}

export interface CreateReviewData {
  classId: number;
  content: string;
  rating: number;
}
