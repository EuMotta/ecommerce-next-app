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
    <Carousel className="mx-20">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div>
              <Image
                src={src}
                alt={`Product ${index + 1}`}
                width={1920}
                height={500}
                className="h-full w-full object-contain"
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
