import axios, { AxiosError } from 'axios';

interface AddReviewData {
  rating: number;
  comment: string;
  code: string;
  companyId: string;
  delivery_time: number;
}

export async function addReview({
  rating,
  comment,
  code,
  companyId,
  delivery_time,
}: AddReviewData): Promise<any> {
  try {
    const response = await axios.post('/api/data/reviews', {
      rating,
      comment,
      code,
      companyId,
      delivery_time,
    });

    return response.data;
  } catch (error) {
    const _error = error as AxiosError<{ message: string }>;
    if (_error.response && _error.response.data?.message) {
      throw new Error(_error.response.data.message);
    }
    throw new Error('Erro desconhecido ao enviar comentário');
  }
}
