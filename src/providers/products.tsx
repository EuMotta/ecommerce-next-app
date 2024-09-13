'use client';
import { createContext, useContext } from 'react';

import { HTTP } from '@/interfaces/http';
import { HookProduct } from '@/interfaces/product';

import { ChildrenProps } from '../../@Types/global';

interface ContextType {
  data: HookProduct | undefined;
}
interface Provider extends HTTP, ChildrenProps {
  data: HookProduct;
}

const StatisticsContext = createContext<ContextType | null>(null);

export function useProducts() {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}

export function ProductsProvider({ children, data }: Provider) {
  const contextValue: ContextType = {
    data: data,
  };

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
}
