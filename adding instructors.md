Great idea! For an instructor profile section, you have a couple of options. Let me analyze your current schema and suggest the best approach.

Read file: prisma/schema.prisma
Perfect! I can see you already have a `User` model with an `INSTRUCTOR` role and a relationship to `Class`. Here are your options for adding instructor profile data:

## Option 1: Add Fields Directly to User Model (Recommended)

Since you already have the `instructorId` relationship in your `Class` model, the simplest approach is to add instructor-specific fields to the existing `User` model:

```prisma:prisma/schema.prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  password      String?
  emailVerified DateTime?
  image         String?
  role          UserRole  @default(STUDENT)
  
  // Instructor-specific fields
  profileImage  String?   // URL to profile image
  yearsExperience Int?    // Years of cooking experience
  awards        String[]  // Array of awards/achievements
  bio           String?   // Instructor description/bio
  specialties   String[]  // Array of cooking specialties
  languages     String[]  // Array of languages spoken
  
  accounts      Account[]
  sessions      Session[]
  reviews       Review[]
  createdClasses Class[]  @relation("ClassInstructor")
  bookings      Booking[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

## Option 2: Create a Separate InstructorProfile Model

For more complex instructor data, you could create a separate model:

```prisma:prisma/schema.prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  password      String?
  emailVerified DateTime?
  image         String?
  role          UserRole  @default(STUDENT)
  
  // One-to-one relationship with instructor profile
  instructorProfile InstructorProfile?
  
  accounts      Account[]
  sessions      Session[]
  reviews       Review[]
  createdClasses Class[]  @relation("ClassInstructor")
  bookings      Booking[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model InstructorProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  profileImage    String?  // URL to profile image
  yearsExperience Int?     // Years of cooking experience
  awards          String[] // Array of awards/achievements
  bio             String?  // Instructor description/bio
  specialties     String[] // Array of cooking specialties
  languages       String[] // Array of languages spoken
  
  // Additional fields you might want
  certifications  String[] // Cooking certifications
  education       String?  // Culinary education background
  socialMedia     Json?    // Social media links
  availability    String?  // General availability info
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

## My Recommendation: Option 1 (Add to User Model)

I recommend **Option 1** because:

1. **Simpler** - No additional model to manage
2. **Efficient** - Single query to get user + profile data
3. **Fits your current structure** - You already have `instructorId` in `Class`
4. **Sufficient** - The fields you mentioned fit well in the User model

## Implementation Steps:

### 1. Add the fields to your schema:

```prisma:prisma/schema.prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  password      String?
  emailVerified DateTime?
  image         String?
  role          UserRole  @default(STUDENT)
  
  // Instructor profile fields
  profileImage  String?
  yearsExperience Int?
  awards        String[]
  bio           String?
  specialties   String[]
  languages     String[]
  
  accounts      Account[]
  sessions      Session[]
  reviews       Review[]
  createdClasses Class[]  @relation("ClassInstructor")
  bookings      Booking[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 2. Generate and apply the migration:

```bash
npx prisma migrate dev --name add_instructor_profile_fields
```

### 3. Update your TypeScript types:

```typescript:src/types/index.ts
export interface User {
  id: string
  name?: string
  email?: string
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'
  image?: string
  
  // New instructor fields
  profileImage?: string
  yearsExperience?: number
  awards: string[]
  bio?: string
  specialties: string[]
  languages: string[]
  
  // ... other fields
}
```

### 4. Create an instructor profile form component:

```typescript:src/components/InstructorProfile/InstructorProfileForm.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface InstructorProfileFormProps {
  user: User
  onSubmit: (data: Partial<User>) => Promise<void>
}

export function InstructorProfileForm({ user, onSubmit }: InstructorProfileFormProps) {
  const [formData, setFormData] = useState({
    profileImage: user.profileImage || '',
    yearsExperience: user.yearsExperience || 0,
    awards: user.awards || [],
    bio: user.bio || '',
    specialties: user.specialties || [],
    languages: user.languages || []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructor Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields here */}
          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

This approach gives you all the instructor profile functionality you need while keeping your database structure clean and efficient!