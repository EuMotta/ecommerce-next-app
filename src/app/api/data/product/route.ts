import { NextRequest, NextResponse } from 'next/server';

import { ProductsService } from '../../services/product';

const product = new ProductsService();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code')
    ? parseInt(searchParams.get('code')!, 10)
    : 0;
  try {
    const products = await product.getSingleProduct(code);
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return new Response(String(error), { status: 400 });
  }
}
