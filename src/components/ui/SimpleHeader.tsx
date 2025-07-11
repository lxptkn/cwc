"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Button from "@/components/ui/Button"
import { AuthModal } from "@/components/AuthModal/AuthModal"

export default function SimpleHeader() {
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
            <div className="flex-shrink-0">
              <Button
                onClick={handleAuthClick}
                className="bg-warm-orange hover:bg-warm-orange/90 text-black px-4 py-2"
              >
                {session ? 'Dashboard' : 'Sign In'}
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