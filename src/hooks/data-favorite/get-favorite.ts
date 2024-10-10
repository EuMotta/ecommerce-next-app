import { getFavorite } from '@/app/api/data/favorite/get/get-favorite';
import { Favorite } from '@/interfaces/favorite';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGetFavorite(): UseQueryResult<Favorite, Error> {
  return useQuery({
    queryKey: ['get-favorite'],
    queryFn: () => getFavorite(),
  });
}
