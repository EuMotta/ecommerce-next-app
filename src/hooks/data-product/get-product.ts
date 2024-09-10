import { getProduct } from '@/app/api/data/product/get/get-product';
import { ProductPage } from '@/interfaces/product';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGetProduct(
  slug: string,
): UseQueryResult<ProductPage, Error> {
  return useQuery({
    queryKey: ['get-product', slug],
    queryFn: () => getProduct(slug),
  });
}
