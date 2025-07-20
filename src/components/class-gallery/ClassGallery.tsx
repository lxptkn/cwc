import { useEffect, useState } from 'react'
import { ClassCard } from '@/components/class-card'
import PriceSlider from '@/components/ui/PriceSlider'
import { filterClasses } from '@/utils/searchUtils'
import type { CookingClass } from '@/types'

function ClassGallery() {
  const [classes, setClasses] = useState<CookingClass[]>([])
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500)
  const [currentMin, setCurrentMin] = useState(0)
  const [currentMax, setCurrentMax] = useState(500)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchClasses() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/classes')
        const data = await res.json()
        if (data.classes) {
          setClasses(data.classes)
          const prices = data.classes.map((c: CookingClass) => c.price)
          setMinPrice(Math.min(...prices))
          setMaxPrice(Math.max(...prices))
          setCurrentMin(Math.min(...prices))
          setCurrentMax(Math.max(...prices))
        } else setError('No classes found')
      } catch (e) {
        setError('Failed to load classes')
      } finally {
        setIsLoading(false)
      }
    }
    fetchClasses()
  }, [])

  function handlePriceChange(min: number, max: number) {
    setCurrentMin(min)
    setCurrentMax(max)
  }

  const filtered = filterClasses(classes, search, currentMin, currentMax)

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search classes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-black rounded-md px-3 py-2 text-black"
            aria-label="Search classes"
          />
        </div>
        <div className="w-full md:w-80">
          <PriceSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            currentMin={currentMin}
            currentMax={currentMax}
            onPriceChange={handlePriceChange}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center text-black">Loading classes...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-black">No classes found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(c => (
            <ClassCard
              key={c.id}
              title={c.title}
              description={c.description}
              image={(c as any).imageUrl || '/placeholder.svg'} // imageUrl is present in API/mock data
              price={`$${c.price}`}
              duration={c.duration}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { ClassGallery } 