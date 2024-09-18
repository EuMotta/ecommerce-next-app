import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { CartServices } from '../../services/cart';

const cart = new CartServices();

export async function GET() {
  try {
    const cartItems = await cart.getCart();
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { productId, skuId } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    if (!productId || !skuId) {
      return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 });
    }

    await cart.insertProduct(productId, skuId);

    return NextResponse.json(
      { message: 'Produto adicionado ao carrinho com sucesso' },
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
