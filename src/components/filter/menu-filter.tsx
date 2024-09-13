'use client';
import { useSearchParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Monitor } from 'lucide-react';

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCategoryChange = (category: string, subcategory?: string) => {
    if (subcategory) {
      const updatedParams = new URLSearchParams(
        searchParams as unknown as URLSearchParams,
      );
      updatedParams.delete('category');
      updatedParams.set('sub_category', subcategory);
      router.push(`?${updatedParams.toString()}`);
    } else {
      const updatedParams = new URLSearchParams(
        searchParams as unknown as URLSearchParams,
      );
      updatedParams.delete('sub_category');
      updatedParams.set('category', category);
      router.push(`?${updatedParams.toString()}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Categorias
          <ChevronDown className="-mr-1 ml-2 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categorias</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            onClick={() => handleCategoryChange('Electronicos')}
          >
            <Monitor className="mr-2 size-4" />
            <span>Eletrônicos</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() =>
                  handleCategoryChange('Electronicos', 'Smartphones')
                }
              >
                Celulares
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger onClick={() => handleCategoryChange('Tenis')}>
            <Monitor className="mr-2 size-4" />
            <span>Tenis</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => handleCategoryChange('Tenis', 'Corrida')}
              >
                Corrida
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            onClick={() => handleCategoryChange('Residencial')}
          >
            <Monitor className="mr-2 size-4" />
            <span>Residencial</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() =>
                  handleCategoryChange('Residencial', 'Refrigeradores')
                }
              >
                Refrigeradores
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
