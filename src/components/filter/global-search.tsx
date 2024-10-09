'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

import { Button } from '../ui/button';

interface SearchProps {
  path?: string;
}

const GlobalSearch = ({ path = '/products' }: SearchProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [updatedParams, setUpdatedParams] = useState<URLSearchParams>(
    new URLSearchParams(),
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setUpdatedParams(params);
    }
  }, []);

  const handleCategoryChange = (search: string) => {
    updatedParams.set('search', search);
    router.push(`${path}?${updatedParams.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCategoryChange(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    updatedParams.delete('search');
    router.push(`${path}?${updatedParams.toString()}`);
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
            className="w-full appearance-none bg-background pl-8 pr-10 shadow-none md:w-2/3 lg:w-2/3"
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

export default GlobalSearch;
