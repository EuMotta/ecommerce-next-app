'use client';
import Link from 'next/link';

import { useGetCart } from '@/hooks/data-cart/get-cart';
import { ShoppingCart } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';

const CartButton = () => {
  const { isLoading, data } = useGetCart();
  return (
    <Link href="/cart" className="flex items-center gap-2">
      <ShoppingCart className="h-4 w-4" />
      {isLoading ? (
        <Skeleton className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full" />
      ) : (
        <Badge
          variant={'outline'}
          className="left relative -top-3 right-2 ml-auto flex h-3 w-2 shrink-0 items-center justify-center rounded-full text-xs"
        >
          {data?.total_count}
        </Badge>
      )}
    </Link>
  );
};

export default CartButton;
