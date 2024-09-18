import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { CartServices } from '@/app/api/services/cart';

const cart = new CartServices();
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { action } = await request.json();
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }
    if (!params.id || !action) {
      return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 });
    }
    console.log('chegou');
    await cart.updateCartItemQuantity(params.id, action);

    return NextResponse.json(
      { message: 'Produto atualizado' },
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
