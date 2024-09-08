import { getProducts } from '@/app/api/data/products/get/get-data';
import { HTTP } from '@/interfaces/http';
import { HookProduct } from '@/interfaces/product';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGetProducts({
  page,
  per_page,
  search,
}: HTTP): UseQueryResult<HookProduct, Error> {
  return useQuery({
    queryKey: ['get-products', page, per_page, search],
    queryFn: () => getProducts({ page, per_page, search }),
  });
}
