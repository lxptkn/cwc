import { NextRequest, NextResponse } from "next/server"
import { createUser } from "@/services/user-service"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = await createUser({ email, password, name })

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong"
    return NextResponse.json(
      { error: message },
      { status: 400 }
    )
  }
} 