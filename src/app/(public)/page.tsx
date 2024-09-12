'use client';

import { useSearchParams } from 'next/navigation';

import { PaginationWithLinks } from '@/components/pagination';
import ProductCard from '@/components/product/product-card';
import { ThemeToggle } from '@/components/ui/theme-button';
import { useGetProducts } from '@/hooks/data-products/get-products';
import { z } from 'zod';

const Page = () => {
  const searchParams = useSearchParams();
  const per_page = z.coerce.number().parse(searchParams.get('per_page') ?? '2');
  const page = z.coerce.number().parse(searchParams.get('page') ?? '1');

  const { data, isLoading, isError, error } = useGetProducts({
    page,
    per_page,
  });
  const pageSizeOptions = [5, 10, 15, 20];
  return (
    <div>
      <ThemeToggle />
      {isLoading && <div>Carregando...</div>}
      {isError && <div>Erro: {error?.message}</div>}
      <div className="grid grid-cols-3 gap-5">
        {data &&
          data.data &&
          data.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <PaginationWithLinks
        page={page}
        pageSize={per_page}
        totalCount={data?.total_count ?? 0}
        pageSizeSelectOptions={{
          pageSizeOptions,
          pageSizeSearchParam: 'limit',
        }}
      />
    </div>
  );
};

export default Page;
