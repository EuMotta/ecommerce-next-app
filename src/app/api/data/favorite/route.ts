import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { FavoriteServices } from '../../services/favorite';

const favorite = new FavoriteServices();

export async function GET() {
  try {
    const favoriteItems = await favorite.getFavorite();
    return NextResponse.json(favoriteItems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();
    console.log(productId);

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    if (!productId) {
      return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 });
    }

    await favorite.addFavoriteItem(productId);

    return NextResponse.json(
      { message: 'Produto adicionado aos Favoritos' },
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
