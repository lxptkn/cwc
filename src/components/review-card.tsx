import { Star } from "lucide-react"

interface ReviewCardProps {
  name: string
  rating: number
  comment: string
  date: string
}

export function ReviewCard({ name, rating, comment, date }: ReviewCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          ))}
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="font-serif text-gray-600 mb-3">"{comment}"</p>
      <div>
        <p className="font-medium">{name}</p>
      </div>
    </div>
  )
}
