'use client';

import { addFavoriteItem } from '@/app/api/data/favorite/add';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

const AddFavoriteButton = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateQuantity, isPending } = useMutation({
    mutationFn: addFavoriteItem,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ['get-favorite'],
      });
    },
    onError: (error: any) => {
      console.error('Erro ao adicionar aos favoritos:', error.message);
      toast.error(error.message || 'Erro ao adicionar aos favoritos');
    },
  });

  return (
    <Button
      variant={'link'}
      disabled={isPending}
      size={'icon'}
      onClick={() => updateQuantity({ productId })}
      className="flex items-center gap-2"
    >
      <Heart className="h-4 w-4" />
    </Button>
  );
};

export default AddFavoriteButton;
