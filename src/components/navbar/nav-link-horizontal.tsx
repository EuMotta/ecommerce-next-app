'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Package, Monitor, ChevronDown } from 'lucide-react';

import Container from '../common/container';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const NavLinkHorizontal = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    /*  {
      href: '/dashboard',
      icon: <Home className="h-4 w-4" />,
      label: 'Dashboard',
    }, */
    {
      href: '/products',
      icon: <Package className="h-4 w-4" />,
      label: 'Produtos',
    },
    /*  {
      href: '/analytics',
      icon: <LineChart className="h-4 w-4" />,
      label: 'Analytics',
    }, */
  ];

  const categories = [
    {
      label: 'Eletrônicos',
      href: 'eletronicos',
      icon: <Monitor className="h-4 w-4" />,
      subcategories: [
        { label: 'Smartphones', href: 'smartphones' },
        { label: 'Teclados', href: 'teclados' },
      ],
    },
    {
      label: 'Tênis',
      href: 'tenis',
      icon: <Monitor className="h-4 w-4" />,
      subcategories: [{ label: 'Corrida', href: 'tenis-de-corrida' }],
    },
    {
      label: 'Residencial',
      href: 'residencial',
      icon: <Monitor className="h-4 w-4" />,
      subcategories: [{ label: 'Refrigeradores', href: 'refrigeradores' }],
    },
  ];

  const handleCategoryChange = (category: string, sub_category?: string) => {
    if (sub_category) {
      router.push(`/products/${category}/${sub_category}`);
    } else {
      router.push(`/products/${category}`);
    }
  };

  return (
    <nav className="bg-primary text-sm font-medium lg:px-4">
      <Container className="flex items-start">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center rounded-none text-muted"
          onClick={() => router.push('/products')}
        >
          Todos os produtos
        </Button>
        {links.map(({ href, icon, label }) => {
          const isActive = pathname === href;

          return (
            <div key={href} className="flex">
              <Button
                variant={isActive ? 'outline' : 'ghost'}
                size={'sm'}
                onClick={() => router.push(href)}
                className={`${
                  isActive ? '' : 'text-muted'
                } flex gap-2 rounded-none`}
              >
                {icon}
                {label}
              </Button>
              <Separator orientation="vertical" />
            </div>
          );
        })}

        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center rounded-none text-muted"
              >
                <Monitor className="mr-2 h-4 w-4" />
                Categorias
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Todas as Categorias</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {categories.map((category) => (
                <DropdownMenuSub key={category.href}>
                  <DropdownMenuSubTrigger
                    onClick={() => handleCategoryChange(category.href)}
                  >
                    {category.icon}
                    {category.label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {category.subcategories.map((subcategory) => (
                      <DropdownMenuItem
                        key={subcategory.href}
                        onClick={() =>
                          handleCategoryChange(category.href, subcategory.href)
                        }
                      >
                        {subcategory.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" />
        </div>
      </Container>
    </nav>
  );
};

export default NavLinkHorizontal;
