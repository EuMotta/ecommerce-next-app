import { NextRequest, NextResponse } from 'next/server';

import { ProductsService } from '../../services/product';

const product = new ProductsService();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page')!, 10)
    : 1;
  const category = searchParams.get('category') || '';
  const sub_category = searchParams.get('sub_category') || '';
  const limit = searchParams.get('per_page')
    ? parseInt(searchParams.get('per_page')!, 10)
    : 10;

  try {
    const offset = (page - 1) * limit;

    const products = await product.getProducts({
      limit,
      offset,
      category,
      sub_category,
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
