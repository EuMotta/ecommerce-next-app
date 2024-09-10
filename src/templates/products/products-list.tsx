import React from 'react';

import ProductCard from '@/components/product/product-card';
import SkeletonCards from '@/components/skeleton/skeleton-cards';
import { useProducts } from '@/providers/products';

const ProductList = () => {
  const { data: products, isLoading, isError, error } = useProducts();
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
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products &&
          products.data?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default ProductList;
