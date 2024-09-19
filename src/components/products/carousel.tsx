import Image from 'next/image';
import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const images = [
  '/home/banner1.jpg',
  '/home/banner2.jpg',
  '/home/banner3.jpg',
  '/home/banner4.jpg',
];

export function CarouselProducts() {
  return (
    <Carousel className="mx-40">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="flex h-96 items-center justify-center p-1">
              <Image
                src={src}
                alt={`Product ${index + 1}`}
                width={800}
                height={800}
                className="rounded-md object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
