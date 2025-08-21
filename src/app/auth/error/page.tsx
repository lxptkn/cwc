import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface AuthErrorPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error } = await searchParams

  const getErrorMessage = (errorCode?: string) => {
    switch (errorCode) {
      case 'Configuration':
        return 'There is a problem with the server configuration.'
      case 'AccessDenied':
        return 'You do not have permission to sign in.'
      case 'Verification':
        return 'The verification link has expired or has already been used.'
      case 'Default':
      default:
        return 'An error occurred during authentication.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication Error
          </h1>
          <p className="text-gray-600 mb-8">
            {getErrorMessage(error)}
          </p>
          
          <div className="space-y-4">
            <Link href="/auth/signin">
              <Button className="w-full">
                Try Again
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                Return Home
              </Button>
            </Link>
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">
                Error Code: {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
