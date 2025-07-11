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
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  about: string;
  menu: string;
  schedule: string;
  highlights: string;
  additionalInformation: string;
  instructorId: string;
  instructor?: User;
  reviews?: Review[];
  bookings?: Booking[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  role: UserRole;
  image?: string;
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
}

export interface CreateReviewData {
  classId: number;
  content: string;
  rating: number;
}
