import { getHomeProducts } from '@/app/api/data/products/get-home-products';
import { HookProduct } from '@/interfaces/product';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGetHomeProducts(): UseQueryResult<HookProduct, Error> {
  return useQuery({
    queryKey: ['get-home-product'],
    queryFn: () => getHomeProducts(),
  });
}
