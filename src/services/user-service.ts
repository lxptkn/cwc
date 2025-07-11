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