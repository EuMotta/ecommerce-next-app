import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { FavoriteServices } from '@/app/api/services/favorite';

const favorite = new FavoriteServices();
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }
    if (!params.id) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 400 },
      );
    }
    await favorite.deleteFavoriteItem(params.id);

    return NextResponse.json(
      { message: 'Produto removido do carrinho' },
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
