import { getProductRatings } from '@/app/api/data/reviews/get/get-product-ratings';
import { Reviews } from '@/interfaces/review';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface GetProductRatings {
  id?: string;
  limit: number;
}
export function useGetProductRatings({
  id,
  limit,
}: GetProductRatings): UseQueryResult<Reviews, Error> {
  return useQuery({
    queryKey: ['get-product-ratings', id, limit],
    queryFn: () => getProductRatings({ id, limit }),
  });
}
