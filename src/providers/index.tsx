'use client';
import { SessionProvider } from 'next-auth/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ChildrenProps } from '../../@Types/global';

const queryClient = new QueryClient();
const Providers = ({ children }: ChildrenProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
