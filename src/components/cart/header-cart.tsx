import React from 'react';

import Logo from '@/components/logo';
import NavLink from '@/components/navbar/nav-link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
const HeaderCart = () => {
  return (
    <div className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="grid gap-2 text-lg font-medium">
            <Logo size={120} type="alinhado" />
            <NavLink />
          </div>

          <div className="mt-auto">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HeaderCart;
