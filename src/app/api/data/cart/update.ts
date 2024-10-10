import axios, { AxiosError } from 'axios';

import { errorList } from '@/constants';

interface UpdateQuantityArgs {
  itemId: string;
  action: 'add-quantity' | 'remove-quantity' | 'delete-item';
}

export async function updateCartItemQuantity({
  itemId,
  action,
}: UpdateQuantityArgs): Promise<any> {
  try {
    if (action === 'delete-item') {
      const response = await axios.delete(`/api/data/cart/cart-item/${itemId}`);
      return response.data;
    } else {
      const response = await axios.put(`/api/data/cart/cart-item/${itemId}`, {
        action,
      });
      return response.data;
    }
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
