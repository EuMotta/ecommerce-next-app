'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

import { Button } from '../ui/button';

interface SearchProps {
  path?: string;
}

const LocalSearch = ({ path = '/products' }: SearchProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateURLWithSearchTerm(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    updateURLWithSearchTerm('');
  };

  const updateURLWithSearchTerm = (term: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    router.push(`${path}?${params.toString()}`);
  };

  return (
    <div className="relative w-full flex-1">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Pesquisar por todos..."
            className="w-full appearance-none bg-background pl-8 pr-10 shadow-none md:w-2/3 lg:w-1/3"
          />
          {searchTerm && (
            <Button type="button" onClick={handleClear} variant={'link'}>
              Limpar filtros
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LocalSearch;
