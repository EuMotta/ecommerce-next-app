'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ChildrenProps } from '../../@Types/global';

const queryClient = new QueryClient();
const Providers = ({ children }: ChildrenProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
