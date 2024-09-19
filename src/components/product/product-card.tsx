'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Product } from '@/interfaces/product';
import { Eye, Heart } from 'lucide-react';

import currencyConverter from '@/utils/Conversions/currencyConverter';

import StarRating from '../rating/star';
import { Button } from '../ui/button';

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  return (
    <div className="flex min-w-52 max-w-72 flex-col justify-between rounded border p-2 px-3 shadow-sm">
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex gap-1">
          <Link
            href={'/'}
            data-tooltip-target="tooltip-quick-look-2"
            className="rounded-lg p-1 text-muted-foreground"
          >
            <span className="sr-only"> Quick look </span>
            <Eye size={15} />
          </Link>
          <div
            id="tooltip-quick-look-2"
            role="tooltip"
            className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
            data-popper-placement="top"
          >
            Quick look
            <div className="tooltip-arrow" data-popper-arrow=""></div>
          </div>

          <Link
            href={'/'}
            data-tooltip-target="tooltip-add-to-favorites-2"
            className="rounded-lg p-1 text-muted-foreground"
          >
            <span className="sr-only"> Add to Favorites </span>
            <Heart size={15} />
          </Link>
          <div
            id="tooltip-add-to-favorites-2"
            role="tooltip"
            className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
            data-popper-placement="top"
          >
            Add to favorites
            <div className="tooltip-arrow" data-popper-arrow=""></div>
          </div>
        </div>
        <div className="flex items-center">
          <StarRating rating={product?.average_rating ?? 0} size={10} />
        </div>
        <p className="text-[10px] font-medium text-muted-foreground">
          ({product.total_ratings})
        </p>
      </div>
      <div className="h-32 w-full">
        <Link href={`/product/${product.code}`}>
          <Image
            className="mx-auto h-full w-full object-contain"
            height={928}
            width={928}
            src={product.image[0]}
            alt=""
          />
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between gap-4">
          {product.discount_amount && (
            <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 me-2 rounded px-2.5 py-0.5 text-xs font-medium">
              {product.discount_amount}%
            </span>
          )}
        </div>

        <Link
          href={`/product/${product.code}`}
          className="line-clamp-3 text-sm font-semibold leading-tight hover:underline"
        >
          {product.name}
        </Link>
        <Button size={'sm'} className="p-0" variant={'link'} asChild>
          <Link
            href={{
              pathname: '/products',
              query: { company: product.company.corporate_name },
            }}
          >
            {product.company.corporate_name}
          </Link>
        </Button>

        <div className="">
          {product.discount_amount && (
            <p className="text-sm font-extrabold leading-tight text-destructive line-through">
              {currencyConverter(product.price)}
            </p>
          )}
          <p className="text-xl font-extrabold leading-tight text-green-500">
            {currencyConverter(product.price_with_discount)}
          </p>
          <p className="text-[10px] text-muted-foreground">À vista no cartão</p>
        </div>
        <Button
          size={'sm'}
          className="w-full"
          onClick={() => router.push(`/product/${product.code}`)}
        >
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

/* import Link from 'next/link';
import React from 'react';

import { Product } from '@/interfaces/product';

import currencyConverter from '@/utils/Conversions/currencyConverter';

import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="h-[401px] w-64 overflow-hidden rounded-lg border shadow-lg">
      <Link href={`/product/${product.code}`}>
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
                className="h-32 w-full rounded-lg object-contain"
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
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex flex-col">
          <Button size={'sm'} variant={'link'} className="!p-0 text-gray-700">
            {product.company.corporate_name}
          </Button>
          <Button size={'sm'} variant={'link'} className="!p-0 text-gray-500">
            {product.sub_category.name}
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 line-through">
            {currencyConverter(product.price)}
          </p>
          <p className="text-lg font-semibold">
            {currencyConverter(product.price_with_discount)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
 */
