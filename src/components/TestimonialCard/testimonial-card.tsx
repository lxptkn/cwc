interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-colors">
      <p className="font-serif text-gray-600 dark:text-gray-300">"{quote}"</p>
      <div className="mt-4">
        <p className="font-medium text-gray-900 dark:text-white">{author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  )
}
