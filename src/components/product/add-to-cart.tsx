import { useRouter } from 'next/navigation';
import React from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Plus, ShoppingCartIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

interface AddToCart {
  productId: string;
  skuId: string;
}
export const AddToCart = ({ productId, skuId }: AddToCart) => {
  const router = useRouter();
  const { mutateAsync: sendCartItem, isPending: isPendingSendCartItem } =
    useMutation({
      mutationFn: async () => {
        try {
          const response = await axios.post('/api/data/cart', {
            productId,
            skuId,
          });
          return response.data;
        } catch (error: any) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            throw new Error(error.response.data.message);
          } else {
            throw new Error('Erro desconhecido ao enviar comentário');
          }
        }
      },
      onSuccess: () => {
        toast.success('Produto adicionado ao carrinho!');
      },
    });

  const handleAddToCartAndPush = async () => {
    try {
      await sendCartItem();
      router.push('/cart');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const handleAddToCart = async () => {
    try {
      await sendCartItem();
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
