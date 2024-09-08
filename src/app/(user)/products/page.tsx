'use client';

import { useSearchParams } from 'next/navigation';

import { ProductsProvider } from '@/providers/products';
import ProductList from '@/templates/products/products-list';

const Page = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const per_page = searchParams.get('per_page') || '10';
  const search = searchParams.get('search') || '';

  return (
    <ProductsProvider page={page} per_page={per_page} search={search}>
      <ProductList />
    </ProductsProvider>
  );
};

export default Page;
