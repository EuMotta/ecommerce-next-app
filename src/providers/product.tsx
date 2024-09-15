'use client';

import { createContext, useContext, ReactNode } from 'react';

import { Product } from '@/interfaces/product';

interface ContextType {
  data: Product;
  related_products: Product[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

interface ProviderProps {
  data: Product;
  children: ReactNode;
  related_products: Product[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const ProductContext = createContext<ContextType | null>(null);

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

export function ProductProvider({
  children,
  data,
  related_products,
  isLoading,
  isError,
  error,
}: ProviderProps) {
  const contextValue: ContextType = {
    data,
    related_products: related_products || [],
    isLoading,
    isError,
    error,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
