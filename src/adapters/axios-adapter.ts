/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosError } from 'axios';

import { errorList } from '@/constants';

type HTTPRequest = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: any;
  headers?: any;
};

export type HTTPClient<R = any> = {
  request: (data: HTTPRequest) => Promise<R>;
};

export const HTTPClientFactory = (): HTTPClient => new AxiosHttpClientAdapter();

export class AxiosHttpClientAdapter implements HTTPClient {
  async request(data: HTTPRequest) {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
      });
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>;
      /* caso tenha mensagem de erro, entra no condicional */
      if (_error.response) {
        const { status, data } = _error.response;

        /* procura na lista de erros que vem de constants, 
        qual o codigo do erro, para retornar a mensagem*/
        const errorEntry = errorList.find((e) => e.statusCode === status);
        if (errorEntry) {
          /* caso encontre o erro, retorna o codigo e a mensagem para ser tratado */
          return {
            statusCode: status,
            error: data.message || errorEntry.message,
          };
        }
      }
      /* caso não encontre o erro, retorna uma mensagem de erro default */
      return {
        /* verifica se existe um status para o erro, caso não, retorna 0. */
        statusCode: _error.response?.status || 0,
        error: 'Um erro inesperado aconteceu',
      };
    }
  }
}
