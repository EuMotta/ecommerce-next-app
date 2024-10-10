import { useRouter } from 'next/navigation';
import React from 'react';

import { addCartItem } from '@/app/api/data/cart/add';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, ShoppingCartIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

interface AddToCart {
  productId: string;
  skuId: string;
}

export const AddToCart = ({ productId, skuId }: AddToCart) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: sendCartItem, isPending: isPendingSendCartItem } =
    useMutation({
      mutationFn: addCartItem,
      onSuccess: () => {
        toast.success('Produto adicionado ao carrinho!');
        queryClient.invalidateQueries({
          queryKey: ['get-cart'],
        });
      },
    });

  const handleAddToCartAndPush = async () => {
    try {
      await sendCartItem({ productId, skuId });
      router.push('/cart');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleAddToCart = async () => {
    try {
      await sendCartItem({ productId, skuId });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex gap-1">
      <Button
        className="w-full"
        onClick={handleAddToCartAndPush}
        disabled={isPendingSendCartItem}
      >
        <ShoppingCartIcon /> Comprar
      </Button>
      <Button
        size={'icon'}
        disabled={isPendingSendCartItem}
        onClick={handleAddToCart}
      >
        <Plus />
      </Button>
    </div>
  );
};
