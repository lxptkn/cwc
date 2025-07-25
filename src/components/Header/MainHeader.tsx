"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { AuthModal } from "@/components/AuthModal/AuthModal"
import { ThemeToggle } from "@/components/ThemeToggle/theme-toggle"

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
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl text-warm-orange font-serif cursor-pointer hover:text-warm-orange-light transition-colors" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                  Cooking with Class
                </h1>
              </Link>
            </div>

            {/* Auth Button */}
            <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
              {session && (
                <>
                  <Button
                    variant="ghost" size="sm"
                    onClick={() => window.location.href = '/dashboard'}
                    className="text-sm font-medium hover:underline bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost" size="sm"
                    onClick={() => window.location.href = '/create-class'}
                    className="text-sm font-medium hover:underline bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    Create Class
                  </Button>
                </>
              )}
              <Button
                variant="ghost" size="sm"
                onClick={handleAuthClick}
                className="text-sm font-medium hover:underline bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {session ? 'Sign Out' : 'Sign In'}
              </Button>
              <ThemeToggle />
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