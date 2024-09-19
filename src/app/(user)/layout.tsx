/* eslint-disable react/no-unknown-property */
import type { Metadata } from 'next';
import Link from 'next/link';

import UserButton from '@/components/auth/user-button';
import CartButton from '@/components/cart/cart-button';
import Container from '@/components/common/container';
import GlobalSearch from '@/components/filter/global-search';
import Logo from '@/components/logo';
import NavLink from '@/components/navbar/nav-link';
import NavLinkHorizontal from '@/components/navbar/nav-link-horizontal';
import ToggleNotifications from '@/components/navbar/toggle-notifications';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-button';
import { Menu, Package2 } from 'lucide-react';

import { ChildrenProps } from '../../../@Types/global';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Motta',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/M.svg',
    },
  ],
};

export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';

export default function Dashboard({ children }: ChildrenProps) {
  return (
    <div className="grid max-h-screen min-h-screen w-full">
      <div className="flex flex-col">
        <Container>
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <NavLink />
                </nav>
                <div className="mt-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex h-14 items-center justify-between gap-5 border-b px-4 lg:h-[60px] lg:px-6">
              <div className="flex gap-1">
                <ToggleNotifications />
                <ThemeToggle />
              </div>
              <Logo size={120} type="alinhado" />
            </div>
            <GlobalSearch />
            <CartButton />
            <UserButton />
          </header>
        </Container>
        <NavLinkHorizontal />
        <main className="flex-1">
          <ScrollArea className="h-[calc(94.5vh-4rem)] px-4 lg:gap-6 lg:p-6">
            {children}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
