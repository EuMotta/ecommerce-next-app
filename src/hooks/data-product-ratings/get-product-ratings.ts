import { getProductRatings } from '@/app/api/data/ratings/get/get-product-ratings';
import { Ratings } from '@/interfaces/rating';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface GetProductRatings {
  slug: string;
  size: number;
}
export function useGetProductRatings({
  slug,
  size,
}: GetProductRatings): UseQueryResult<Ratings, Error> {
  return useQuery({
    queryKey: ['get-product-ratings', slug, size],
    queryFn: () => getProductRatings({ slug, size }),
  });
}
