import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { deleteFavoriteItem } from '@/app/api/data/favorite/delete';
import { DaumFavoriteItem } from '@/interfaces/favorite';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

import currencyConverter from '@/utils/Conversions/currencyConverter';

import { Button } from '../ui/button';

interface FavoriteCard {
  item: DaumFavoriteItem;
}
const FavoriteItemCard = ({ item }: FavoriteCard) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteItem,
    isPending,
    /* error, */
  } = useMutation({
    mutationFn: deleteFavoriteItem,
    onSuccess: (response) => {
      toast.success(response.message || 'Produto removido com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['get-favorite'],
      });
    },
  });
  return (
    <div
      key={item.product._id}
      className="rounded-lg border p-4 shadow-sm md:p-6"
    >
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link href="/" className="shrink-0 md:order-1">
          <Image
            src={item.product.image[0]}
            width={100}
            height={100}
            alt="imac image"
            className="object-cover"
          />
        </Link>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="text-end md:order-4">
            {item.product.price_with_discount !== null &&
            item.product.price_with_discount < item.product.price ? (
              <>
                <p className="text-sm font-extrabold leading-tight text-destructive line-through">
                  {currencyConverter(item.product.price)}
                </p>
                <p className="text-xl font-extrabold leading-tight text-green-500">
                  {currencyConverter(item.product.price_with_discount)}
                </p>
              </>
            ) : (
              <p className="text-xl font-extrabold leading-tight text-green-500">
                {currencyConverter(item.product.price)}
              </p>
            )}
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-lg">
          <Link
            href="#"
            className="line-clamp-3 text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {item.product.name}
          </Link>

          <Button
            type="button"
            variant={'link'}
            disabled={isPending}
            onClick={() => deleteItem(item._id)}
            className="text-destructive"
          >
            <Trash />
            Remover favorito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItemCard;
