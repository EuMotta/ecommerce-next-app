import Link from 'next/link';
import React from 'react';

import { Product } from '@/interfaces/product';

import currencyConverter from '@/utils/Conversions/currencyConverter';

import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="h-[401px] w-64 overflow-hidden rounded-lg border shadow-lg">
      <Link href={`/product/${product.slug}`}>
        <div
          className="relative h-20 w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${product.cover})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
        </div>
        <CardContent className="p-4">
          <div className="mb-4">
            {product.image.length > 0 && (
              <img
                src={product.image[0]}
                alt={product.name}
                className="h-32 w-full rounded-lg object-cover"
              />
            )}
          </div>
          <div className="space-y-2">
            <h5 className="text-muted-foreground">{product.name}</h5>
            <p className="line-clamp-1 text-sm">{product.summary}</p>
            <p className="line-clamp-2 text-xs">{product.description}</p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between border-t p-4">
        <Button variant={'link'}>{product.category.name}</Button>
        <p>{currencyConverter(product.price)}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
