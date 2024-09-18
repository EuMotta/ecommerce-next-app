import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useGetCart } from '@/hooks/data-cart/get-cart';
import { Daum } from '@/interfaces/cart';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Heart, Minus, Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';

import currencyConverter from '@/utils/Conversions/currencyConverter';

import { Button } from '../ui/button';

interface CartItemCard {
  item: Daum;
}
const CartItemCard = ({ item }: CartItemCard) => {
  const { refetch } = useGetCart();
  const updateItemQuantity = async ({
    itemId,
    action,
  }: {
    itemId: string;
    action: 'add-quantity' | 'remove-quantity' | 'delete-item';
  }) => {
    try {
      if (action === 'delete-item') {
        const response = await axios.delete(
          `/api/data/cart/cart-item/${itemId}`,
        );
        return response.data;
      } else {
        const response = await axios.put(`/api/data/cart/cart-item/${itemId}`, {
          action,
        });

        return response.data;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: updateQuantity,
    isPending,
    /* error, */
  } = useMutation({
    mutationFn: updateItemQuantity,
    onSuccess: (response) => {
      toast.success(response.message);
      refetch();
    },
    onError: (error) => {
      console.error('Erro ao atualizar quantidade:', error.message);
    },
  });
  return (
    <div
      key={item._id}
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
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

        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <Button
              type="button"
              size={'icon'}
              disabled={isPending}
              variant={'outline'}
              onClick={() =>
                updateQuantity({
                  itemId: item._id,
                  action: 'add-quantity',
                })
              }
              className="h-5 w-5"
            >
              <Plus />
            </Button>
            <span className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium">
              {item.quantity}
            </span>

            <Button
              type="button"
              size={'icon'}
              variant={'outline'}
              disabled={isPending}
              onClick={() =>
                updateQuantity({
                  itemId: item._id,
                  action: 'remove-quantity',
                })
              }
              className="h-5 w-5"
            >
              <Minus />
            </Button>
          </div>
          <div className="text-end md:order-4 md:w-48">
            {item.total_value_with_discount !== null &&
              item.total_value_with_discount < item.total_value && (
                <>
                  <p className="text-sm font-extrabold leading-tight text-destructive line-through">
                    {currencyConverter(item.total_value)}
                  </p>
                  <p className="text-xl font-extrabold leading-tight text-green-500">
                    {currencyConverter(item.total_value_with_discount)}
                  </p>
                </>
              )}
            {item.total_value_with_discount === item.total_value && (
              <p className="text-xl font-extrabold leading-tight text-green-500">
                {currencyConverter(item.total_value)}
              </p>
            )}
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Link
            href="#"
            className="line-clamp-3 text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {item.product.name}
          </Link>

          <div className="flex items-center gap-4">
            <Button type="button" variant={'link'}>
              <Heart />
            </Button>

            <Button
              type="button"
              variant={'link'}
              disabled={isPending}
              onClick={() =>
                updateQuantity({
                  itemId: item._id,
                  action: 'delete-item',
                })
              }
              className="text-destructive"
            >
              <Trash />
              Remover
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
