"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Button from "@/components/ui/Button"
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
            <Link href="#signup" className="text-sm font-medium hover:underline">
              Sign Up
            </Link>
          </nav>
        </div>
    </header>
      <header className="bg-warm-bg-alt border-b border-warm-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-warm-orange font-serif cursor-pointer hover:text-warm-orange-light transition-colors" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                  Cooking with Class
                </h1>
              </Link>
            </div>

            {/* Auth Button */}
            <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
              {session && (
                <>
                  <Button
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-warm-teal hover:bg-warm-teal/90 text-black px-2 py-2 sm:px-4 text-sm sm:text-base"
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/create-class'}
                    className="bg-warm-orange hover:bg-warm-orange/90 text-black px-2 py-2 sm:px-4 text-sm sm:text-base"
                  >
                    Create Class
                  </Button>
                </>
              )}
              <Button
                onClick={handleAuthClick}
                className="bg-warm-orange hover:bg-warm-orange/90 text-black px-2 py-2 sm:px-4 text-sm sm:text-base"
              >
                {session ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
} 