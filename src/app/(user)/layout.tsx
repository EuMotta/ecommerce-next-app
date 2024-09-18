/* eslint-disable react/no-unknown-property */
import type { Metadata } from 'next';
import Link from 'next/link';

import UserButton from '@/components/auth/user-button';
import GlobalSearch from '@/components/filter/global-search';
import Logo from '@/components/logo';
import NavLink from '@/components/navbar/nav-link';
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
    <div className="grid max-h-screen min-h-screen w-full md:grid-cols-[210px_1fr] lg:grid-cols-[210px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
            <Logo size={120} type="alinhado" />
            <div className="flex gap-1">
              <ToggleNotifications />
              <ThemeToggle />
            </div>
          </div>
          <div className="flex-1">
            <NavLink />
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0" className="bg-secondary/50">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle className="text-base">Projeto acadêmico</CardTitle>
                <CardDescription className="text-xs">
                  Este ecommerce se trata de um projeto acadêmico, os produtos
                  não são reais.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  GitHub
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
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
          <GlobalSearch />
          <UserButton />
        </header>
        <main className="flex-1">
          <ScrollArea className="h-[calc(100vh-4rem)] px-4 lg:gap-6 lg:p-6">
            {children}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
