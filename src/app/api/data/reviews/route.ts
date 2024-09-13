import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '../../auth/[...nextauth]/authOptions';
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

export async function POST(request: NextRequest) {
  try {
    const { slug, rating, comment } = await request.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    if (!slug || rating < 1 || rating > 5) {
      return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 });
    }

    await reviews.createReview(session.user._id, slug, rating, comment);
    return NextResponse.json(
      { message: 'Review criada com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: 'Erro desconhecido no servidor', error },
      { status: 500 },
    );
  }
}
