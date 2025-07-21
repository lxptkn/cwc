"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { AuthModal } from "@/components/AuthModal/AuthModal"

export default function MainHeader() {
  const { data: session } = useSession()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleAuthClick = () => {
    if (session) {
      signOut()
    } else {
      setIsAuthModalOpen(true)
    }
  }

  return (
    <>
    
    <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-semibold">
            Cooking with Class
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="#classes" className="text-sm font-medium hover:underline">
              Classes
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline">
              Testimonials
            </Link>
            <button
              type="button"
              className="text-sm font-medium hover:underline bg-transparent border-none p-0 m-0 cursor-pointer"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Sign In
            </button>
          </nav>
        </div>
    </header>
    <AuthModal 
      isOpen={isAuthModalOpen} 
      onClose={() => setIsAuthModalOpen(false)} 
    />
    </>
  )
} 