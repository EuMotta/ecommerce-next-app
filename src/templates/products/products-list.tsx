import React from 'react';

import ProductCard from '@/components/product/product-card';
import { useProducts } from '@/providers/products';

const ProductList = () => {
  const { data: products, isLoading, isError, erro } = useProducts();
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products &&
        products.data?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
