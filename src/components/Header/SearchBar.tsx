'use client';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search classes, locations, or cuisines..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 pl-10 pr-4 text-warm-fg dark:text-black bg-warm-bg dark:bg-white border border-warm-border rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange placeholder-warm-fg-muted"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="w-5 h-5 text-warm-fg-muted dark:text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
