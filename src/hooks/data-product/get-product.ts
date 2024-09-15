import { getProduct } from '@/app/api/data/product/get/get-product';
import { ProductPage } from '@/interfaces/product';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGetProduct(
  code: string,
): UseQueryResult<ProductPage, Error> {
  return useQuery({
    queryKey: ['get-product', code],
    queryFn: () => getProduct(code),
  });
}
