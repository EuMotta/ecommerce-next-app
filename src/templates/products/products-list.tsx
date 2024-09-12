import { useSearchParams } from 'next/navigation';
import React from 'react';

import { PaginationWithLinks } from '@/components/pagination';
import ProductCard from '@/components/product/product-card';
import SkeletonCards from '@/components/skeleton/skeleton-cards';
import { useGetProducts } from '@/hooks/data-products/get-products';
import { z } from 'zod';

const ProductList = () => {
  const searchParams = useSearchParams();

  const per_page = z.coerce.number().parse(searchParams.get('per_page') ?? 5);
  const page = z.coerce.number().parse(searchParams.get('page') ?? 1);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProducts({
    page,
    per_page,
  });
  console.log(products);
  const pageSizeOptions = [5, 10, 15, 20];
  return (
    <>
      {isLoading && (
        <SkeletonCards
          height={401}
          width={256}
          quantity={5}
          className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        />
      )}
      {isError && <div className="text-destructive">{error?.message}</div>}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {products &&
          products.data?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <PaginationWithLinks
        page={page}
        pageSize={per_page}
        totalCount={products?.total_count ?? 0}
        pageSizeSelectOptions={{
          pageSizeOptions,
          pageSizeSearchParam: 'limit',
        }}
      />
    </>
  );
};

export default ProductList;
