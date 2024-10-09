'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';

const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading')
    return <Skeleton className="h-5 w-5 rounded-full" />;

  if (!session || !session.user) {
    return (
      <Button>
        <Link href={'/entrar'}>Entrar</Link>
      </Button>
    );
  }
  const getInitials = () => {
    if (session?.user?.name && session?.user?.last_name) {
      const firstNameInitial = session.user.name.charAt(0).toUpperCase();
      const lastNameInitial = session.user.last_name.charAt(0).toUpperCase();
      return `${firstNameInitial}${lastNameInitial}`;
    }
    return 'NA';
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            {session?.user?.image && <AvatarImage src={session.user.image} />}
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="line-clamp-1">
          {session?.user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/favoritos'}>Favoritos</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/entrar' })}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
