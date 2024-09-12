import { NextResponse } from 'next/server';

import { ProductsService } from '../../services/product';

const product = new ProductsService();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page')
      ? parseInt(searchParams.get('page')!, 10)
      : 1;
    const limit = searchParams.get('per_page')
      ? parseInt(searchParams.get('per_page')!, 10)
      : 10;

    const offset = (page - 1) * limit;

    const products = await product.getProducts({ limit, offset });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
