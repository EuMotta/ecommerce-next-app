'use client';
import { usePathname, useRouter } from 'next/navigation';

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

import LocalSearch from './local-search';

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const handleCategoryChange = (category: string, sub_category?: string) => {
    if (category && sub_category)
      router.push(`/products/${category}/${sub_category}`);
    if (category && !sub_category) router.push(`/products/${category}`);
  };
  return (
    <div className="m-5 flex gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Categorias
            <ChevronDown className="-mr-1 ml-2 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Todas</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              onClick={() => handleCategoryChange('eletronicos')}
            >
              <Monitor className="mr-2 size-4" />
              <span>Eletrônicos</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() =>
                    handleCategoryChange('eletronicos', 'smartphones')
                  }
                >
                  Smartphones
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleCategoryChange('eletronicos', 'teclados')
                  }
                >
                  Teclados
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              onClick={() => handleCategoryChange('tenis')}
            >
              <Monitor className="mr-2 size-4" />
              <span>Tenis</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() =>
                    handleCategoryChange('tenis', 'tenis-de-corrida')
                  }
                >
                  Corrida
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              onClick={() => handleCategoryChange('residencial')}
            >
              <Monitor className="mr-2 size-4" />
              <span>Residencial</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() =>
                    handleCategoryChange('residencial', 'refrigeradores')
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
      <LocalSearch path={pathname} />
    </div>
  );
}
