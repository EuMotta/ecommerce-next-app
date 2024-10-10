import { getCart } from '@/app/api/data/cart/get/get-cart';
import { Cart } from '@/interfaces/cart';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface GetCart {
  count?: boolean;
}
export function useGetCart(): UseQueryResult<Cart, Error> {
  return useQuery({
    queryKey: ['get-cart'],
    queryFn: () => getCart(),
  });
}
