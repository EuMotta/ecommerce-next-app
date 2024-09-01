import { HTTPClient } from '@/adapters/axios-adapter';
import { env } from '@/env';

export const getData = (httpClient: HTTPClient) => {
  return {
    loadAll: async (apiUrl: string) => {
      let url = apiUrl;
      if (apiUrl.startsWith('/')) {
        url = `${env.FULL_URL}${apiUrl}`;
      } else {
        url = apiUrl;
      }

      const response = await httpClient.request({
        url: url,
        method: 'get',
      });

      return {
        data: response.body,
        status: response.statusCode,
        error: response.error,
      };
    },
  };
};
