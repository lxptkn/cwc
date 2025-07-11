"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import SearchBar from './SearchBar'
import Button from "@/components/ui/Button"
import { AuthModal } from "@/components/AuthModal/AuthModal"

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
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
              <h1 className="text-2xl font-bold text-warm-orange font-serif" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                Cooking with Class
              </h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md ml-8">
              <SearchBar 
                searchQuery={searchQuery} 
                onSearchChange={onSearchChange} 
              />
            </div>

            {/* Auth Button */}
            <div className="flex-shrink-0 ml-4">
              <Button
                onClick={handleAuthClick}
                className="bg-warm-orange hover:bg-warm-orange-dark text-black px-4 py-2"
              >
                {session ? `Sign Out (${session.user?.name || session.user?.email})` : "Sign In"}
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
  );
}
