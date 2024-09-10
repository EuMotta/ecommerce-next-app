import Image from 'next/image';
import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Product } from '@/interfaces/product';

interface ProductCarousel {
  product: Product;
}
export function ProductCarousel({ product }: ProductCarousel) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: product.image.length }).map((_, index) => (
          <CarouselItem key={index}>
            <Image
              src={product.image[index]}
              width={850}
              height={850}
              alt="Product Image"
              className="h-64 w-64 object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
