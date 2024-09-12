import { NextResponse } from 'next/server';

import { ReviewsService } from '../../services/rating';

const reviews = new ReviewsService();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id') || '';

    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!, 10)
      : 10;

    const products = await reviews.getReview(id, limit);
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
