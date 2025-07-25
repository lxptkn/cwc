"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/Button"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (isSignUp) {
        // Handle signup
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Signup failed")
        }

        // Auto signin after successful signup
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (result?.error) {
          throw new Error("Auto signin failed")
        }

        onClose()
      } else {
        // Handle signin
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (result?.error) {
          throw new Error("Invalid credentials")
        }

        onClose()
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-block p-6 w-full max-w-md mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-n64 text-gray-900">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-block text-gray-900 focus:outline-none focus:border-warm-orange focus:bg-white"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-block text-gray-900 focus:outline-none focus:border-warm-orange focus:bg-white"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-block text-gray-900 focus:outline-none focus:border-warm-orange focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-warm-orange hover:bg-warm-orange/90 text-black px-6 py-3 rounded-lg font-semibold"
          >
            {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-warm-orange hover:text-warm-orange-light text-sm"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  )
} 