'use client';
import Link from 'next/link';

import { useGetFavorite } from '@/hooks/data-favorite/get-favorite';
import { Heart } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';

const FavoriteButton = () => {
  const { isLoading, data } = useGetFavorite();

  return (
    <Link href="/favoritos" className="flex items-center gap-2">
      <Heart className="h-4 w-4" />
      {isLoading ? (
        <Skeleton className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full" />
      ) : (
        <Badge
          variant={'outline'}
          className="left relative -top-3 right-2 ml-auto flex h-3 w-2 shrink-0 items-center justify-center rounded-full text-xs"
        >
          {data?.total_count ?? 0}
        </Badge>
      )}
    </Link>
  );
};

export default FavoriteButton;
