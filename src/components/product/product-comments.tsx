import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Ratings } from '@/interfaces/rating';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

import StarRating from '../rating/star';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';
import ProductCommentStarRating from './product-comment-star-rating';

const schema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, 'Comentário não pode ser vazio'),
});

type FormData = z.infer<typeof schema>;

interface ProductCommentsProps {
  ratings: Ratings;
  slug: string;
  isLoadingRatings: boolean;
  isErrorRatings: boolean | null;
  errorRatings: Error;
  commentsSize: number;
  loadMoreComments: () => void;
  refetch: () => void;
}

const ProductComments = ({
  slug,
  ratings,
  isLoadingRatings,
  isErrorRatings,
  errorRatings,
  commentsSize,
  loadMoreComments,
  refetch,
}: ProductCommentsProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const { mutateAsync: sendComment, isPending: isPendingSendComment } =
    useMutation({
      mutationFn: async (data: FormData) => {
        try {
          const response = await axios.post('/api/data/ratings', {
            rating: data.rating,
            comment: data.comment,
            slug,
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
        toast.success('Comentário enviado com sucesso!');
        reset();
        refetch();
      },
    });

  const onSubmit = async (data: FormData) => {
    try {
      await sendComment(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="space-y-5">
      <ScrollArea className="h-96">
        <div className="space-y-2">
          {isLoadingRatings && 'carregando'}
          {isErrorRatings && (
            <div className="text-destructive">{errorRatings?.message}</div>
          )}
          {ratings &&
            ratings.ratings &&
            ratings.ratings.map((comment) => (
              <div key={comment._id}>
                <div
                  key={comment._id}
                  className={
                    'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                  }
                >
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">{comment.user.name}</div>
                      </div>
                      <div className={'ml-auto text-xs'}>
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                    <div className="text-xs font-medium">
                      <StarRating rating={comment.rating} />
                    </div>
                  </div>
                  <div className="line-clamp-2 text-xs text-muted-foreground">
                    {comment.comment}
                  </div>
                </div>
              </div>
            ))}
          {ratings && ratings.ratings && ratings.ratings.length > 0 && (
            <Button
              onClick={loadMoreComments}
              type="button"
              disabled={ratings?.total_ratings <= commentsSize}
              className="mt-4 w-full"
            >
              Carregar mais comentários
            </Button>
          )}
          {ratings && ratings.ratings && ratings.ratings.length < 1 && (
            <span className="text-destructive">Nenhum comentário ainda</span>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <ProductCommentStarRating
                rating={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.rating && (
            <span className="text-destructive">{errors.rating.message}</span>
          )}
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <Textarea
                className="p-4"
                placeholder="Seu comentário..."
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          {errors.comment && (
            <span className="text-destructive">{errors.comment.message}</span>
          )}
          <div className="flex items-center">
            <Button
              type="submit"
              size="sm"
              disabled={isPendingSendComment}
              className={`ml-auto ${isPendingSendComment ? 'disabled' : ''}`}
            >
              {isPendingSendComment && <Loader className="animate-spin" />}
              Enviar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductComments;
