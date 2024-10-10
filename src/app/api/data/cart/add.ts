import { AddCartItem } from '@/interfaces/cart';
import axios, { AxiosError } from 'axios';

import { errorList } from '@/constants';

export async function addCartItem({
  productId,
  skuId,
}: AddCartItem): Promise<any> {
  try {
    const response = await axios.post('/api/data/cart', {
      productId,
      skuId,
    });
    return response.data;
  } catch (error) {
    const _error = error as AxiosError<{ message: string }>;

    if (_error.response) {
      const { status, data } = _error.response;

      const errorEntry = errorList.find((e) => e.statusCode === status);

      if (errorEntry) {
        throw new Error(data.message || errorEntry.message);
      }
    }
    throw new Error('Um erro inesperado aconteceu');
  }
}
