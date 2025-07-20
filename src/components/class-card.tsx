import Image from "next/image"
import Link from "next/link"

interface ClassCardProps {
  title: string
  description: string
  image: string
  price: string
  duration: string
}

export function ClassCard({ title, description, image, price, duration }: ClassCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium">{price}</span>
          <span className="text-sm text-gray-500">{duration}</span>
        </div>
        <div className="mt-4">
          <Link
            href={`/class/${title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}`}
            className="inline-flex h-9 w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
