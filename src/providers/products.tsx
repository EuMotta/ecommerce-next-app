'use client';
import { createContext, useContext } from 'react';

import { useGetProducts } from '@/hooks/data-products/get-products';
import { HTTP } from '@/interfaces/http';
import { HookProduct } from '@/interfaces/product';

import { ChildrenProps } from '../../@Types/global';

interface ContextType {
  data: HookProduct | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
interface Provider extends HTTP, ChildrenProps {}

const StatisticsContext = createContext<ContextType | null>(null);

export function useProducts() {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}

export function ProductsProvider({
  children,
  page,
  per_page,
  search,
}: Provider) {
  const { data, isLoading, isError, error } = useGetProducts({
    page,
    per_page,
    search,
  });

  const contextValue: ContextType = {
    data: data,
    isLoading,
    isError,
    error,
  };

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
}
