import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function InstructorCard() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="relative h-64 w-full md:h-80 md:w-80 flex-shrink-0">
        <Image
          src="/placeholder.svg?height=320&width=320"
          alt="Chef Marco Rossi"
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-bold mb-2">Chef Marco Rossi</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">15+ Years Experience</Badge>
          <Badge variant="secondary">Certified Italian Chef</Badge>
          <Badge variant="secondary">James Beard Nominee</Badge>
        </div>
        <p className="text-gray-600 leading-relaxed mb-4">
          Born and raised in Tuscany, Chef Marco brings authentic Italian culinary traditions to every class. After
          training in some of Italy's most prestigious kitchens, he moved to New York to share his passion for
          traditional Italian cooking with home cooks of all levels.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Marco's teaching philosophy centers on understanding the 'why' behind each technique, ensuring students don't
          just follow recipes but truly understand the craft of Italian cooking. His patient, encouraging approach has
          helped hundreds of students discover their love for cooking.
        </p>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Specialties:</span>
            <span className="text-gray-600 ml-2">Fresh Pasta, Regional Italian Cuisine, Traditional Sauces</span>
          </div>
          <div>
            <span className="font-semibold">Languages:</span>
            <span className="text-gray-600 ml-2">English, Italian</span>
          </div>
          <div>
            <span className="font-semibold">Teaching Since:</span>
            <span className="text-gray-600 ml-2">2015</span>
          </div>
        </div>
      </div>
    </div>
  )
}
