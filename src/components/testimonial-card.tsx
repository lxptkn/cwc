interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <p className="font-serif text-gray-600">"{quote}"</p>
      <div className="mt-4">
        <p className="font-medium">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  )
}
