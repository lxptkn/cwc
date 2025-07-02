import SearchBar from './SearchBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-warm-bg-alt border-b border-warm-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-warm-orange font-serif" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Cooking with Class
            </h1>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md ml-8">
            <SearchBar 
              searchQuery={searchQuery} 
              onSearchChange={onSearchChange} 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
