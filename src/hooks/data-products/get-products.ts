import { getProducts } from '@/app/api/data/products/get-products';
import { HookProduct } from '@/interfaces/product';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGetProducts(
  filters: {
    page?: number;
    per_page?: number;
    category?: string;
    search?: string;
    sub_category?: string;
    company?: string;
  } = {},
): UseQueryResult<HookProduct, Error> {
  return useQuery({
    queryKey: ['get-products', filters],
    queryFn: () => getProducts(filters),
  });
}
