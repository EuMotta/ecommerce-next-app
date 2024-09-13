import { NextRequest, NextResponse } from 'next/server';

import { ProductsService } from '../../services/product';

const product = new ProductsService();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const slug = searchParams.get('slug') || 'no-slug';
  console.log(slug);
  try {
    const products = await product.getSingleProduct(slug);
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return new Response(String(error), { status: 400 });
  }
}
