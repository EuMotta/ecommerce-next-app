import Link from 'next/link';
import React from 'react';

import UserButton from '@/components/auth/user-button';
import CartButton from '@/components/cart/cart-button';
import Container from '@/components/common/container';
import FavoriteButton from '@/components/favorite/favorite-button';
import GlobalSearch from '@/components/filter/global-search';
import Logo from '@/components/logo';
import NavLink from '@/components/navbar/nav-link';
import NavLinkHorizontal from '@/components/navbar/nav-link-horizontal';
import ToggleNotifications from '@/components/navbar/toggle-notifications';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-button';
import { Menu, Package2 } from 'lucide-react';

import { ChildrenProps } from '../../../@Types/global';

const Navbar = ({ children }: ChildrenProps) => {
  return (
    <div className="grid max-h-screen min-h-screen w-full">
      <div className="flex flex-col">
        <Container>
          <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-muted/40 p-12 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Botão de navegação</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">ShopAll</span>
                  </Link>
                  <NavLink />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex h-14 items-center justify-between gap-5 px-4 lg:h-[60px] lg:px-6">
              <div className="flex gap-1">
                <ToggleNotifications />
                <ThemeToggle />
              </div>
              <Logo size={200} type="alinhado" />
            </div>
            <GlobalSearch />
            <CartButton />
            <FavoriteButton />
            <UserButton />
          </header>
        </Container>
        <NavLinkHorizontal />
        <main className="flex-1">
          <ScrollArea className="h-[calc(100vh-9rem)]">{children}</ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default Navbar;
