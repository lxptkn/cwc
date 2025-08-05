import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function createUser({ email, password, name }: { 
  email: string
  password: string
  name?: string 
}) {
  if (!email || !password) {
    throw new Error("Email and password are required")
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })

  return {
    id: user.id,
    email: user.email,
    name: user.name
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    return null
  }
}

export async function updateUser(id: string, userData: {
  name?: string
  bio?: string
  yearsExperience?: number
  profileImage?: string
  specialties?: string[]
  awards?: string[]
  languages?: string[]
}) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: userData,
    })
    return { user }
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
} 