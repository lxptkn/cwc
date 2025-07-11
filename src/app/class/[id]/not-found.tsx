import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🍳</div>
        <h1 className="text-3xl font-bold text-warm-fg mb-4">
          Class Not Found
        </h1>
        <p className="text-warm-fg-dim mb-8">
          Sorry, the cooking class you're looking for doesn't exist or has been removed.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-warm-orange text-warm-bg px-6 py-3 rounded-lg font-semibold hover:bg-warm-orange-light transition-colors"
          >
            Browse All Classes
          </Link>
          <div className="text-sm text-warm-fg-muted">
            <Link href="/contact" className="hover:text-warm-orange transition-colors">
              Contact us
            </Link>
            {' '}if you need help finding a specific class.
          </div>
        </div>
      </div>
    </div>
  )
} 