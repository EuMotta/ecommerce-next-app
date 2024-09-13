import axios, { AxiosError } from 'axios';

import { errorList } from '@/constants';

export async function getProducts(
  filters: {
    page?: number;
    per_page?: number;
    category?: string;
    sub_category?: string;
  } = {},
) {
  try {
    const response = await axios.get('/api/data/products', {
      params: {
        page: filters.page,
        per_page: filters.per_page,
        category: filters.category,
        sub_category: filters.sub_category,
      },
    });
    return response.data;
  } catch (error) {
    {
      const _error = error as AxiosError<{ message: string }>;
      /* caso tenha mensagem de erro, entra no condicional */
      if (_error.response) {
        const { status, data } = _error.response;

        /* procura na lista de erros que vem de constants, 
          qual o codigo do erro, para retornar a mensagem*/
        const errorEntry = errorList.find((e) => e.statusCode === status);
        /* caso encontre o erro, retorna o codigo e a mensagem para ser tratado */
        if (errorEntry) {
          throw new Error(data.message || errorEntry.message);
        }
      }
      /* caso não encontre o erro, retorna uma mensagem de erro default */
      throw new Error('Um erro inesperado aconteceu');
    }
  }
}
