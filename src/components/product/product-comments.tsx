import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Reviews } from '@/interfaces/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

import NoData from '../common/no-data';
import StarRating from '../rating/star';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';
import ProductCommentStarRating from './product-comment-star-rating';

const schema = z.object({
  rating: z
    .number()
    .min(1, { message: 'Adicione uma nota' })
    .max(5, { message: 'A nota máxima é 5' }),
  delivery_time: z
    .number()
    .min(1, { message: 'Adicione uma nota para o tempo de entrega' })
    .max(5, { message: 'O valor máximo é 5' }),
  comment: z.string().min(1, { message: 'Comentário não pode ser vazio' }),
});

type FormData = z.infer<typeof schema>;

interface ProductCommentsProps {
  reviews: Reviews;
  code: string;
  companyId: string;
  isLoadingRatings: boolean;
  isErrorRatings: boolean | null;
  errorRatings: Error;
  commentsSize: number;
  loadMoreComments: () => void;
  refetch: () => void;
}

const ProductComments = ({
  code,
  companyId,
  reviews,
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
          const response = await axios.post('/api/data/reviews', {
            rating: data.rating,
            comment: data.comment,
            code,
            companyId,
            delivery_time: data.delivery_time,
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
          {reviews &&
            reviews.reviews &&
            reviews.reviews.map((comment) => (
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
          {reviews && reviews.reviews && reviews.reviews.length > 0 && (
            <Button
              onClick={loadMoreComments}
              type="button"
              disabled={reviews?.total_count <= commentsSize}
              className="mt-4 w-full"
            >
              Carregar mais comentários
            </Button>
          )}
          {reviews && reviews.reviews && reviews.reviews.length < 1 && (
            <NoData
              image="/stickers/feedback.png"
              title="Nenhum comentário até agora"
              subtitle="Seja o primeiro a comentar!"
            />
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="flex flex-col items-start justify-between gap-6 rounded-lg p-4 shadow md:flex-row md:items-center">
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
              <span className="font-medium">Qualidade do produto:</span>
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
                <span className="text-sm text-destructive">
                  {errors.rating.message}
                </span>
              )}
            </div>

            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
              <span className="font-medium">Tempo de entrega:</span>
              <Controller
                name="delivery_time"
                control={control}
                render={({ field }) => (
                  <ProductCommentStarRating
                    rating={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.delivery_time && (
                <span className="text-sm text-destructive">
                  {errors.delivery_time.message}
                </span>
              )}
            </div>
          </div>

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
