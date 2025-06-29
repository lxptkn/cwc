export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        
        {/* Location skeleton */}
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-gray-300 rounded mr-1"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        
        {/* Tags and price skeleton */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex space-x-2">
            <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-16 h-6 bg-gray-300 rounded"></div>
        </div>
        
        {/* Bottom info skeleton */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
} 