
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement search functionality
  };

  return (
    <div className="search-bar w-full mb-4">
      <form 
        onSubmit={handleSearch} 
        className="relative flex bg-white rounded-full shadow-lg border overflow-hidden w-full max-w-6xl mx-auto"
      >
        <Input
          type="text"
          placeholder="Search patients, doctors, or medical info..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-5 py-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none text-base"
        />
        <Button 
          type="submit" 
          className="bg-primary text-primary-foreground rounded-full absolute right-1 top-1 bottom-1 px-4"
        >
          <Search className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
