import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/mongodb';
import Category from '@/models/category/Category';
import Product from '@/models/product/Product';
import ProductSKU from '@/models/product/ProductSKU';
import mongoose from 'mongoose';

import { authOptions } from '../../auth/[...nextauth]/authOptions';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const per_page = parseInt(searchParams.get('per_page') || '10', 10);
  const skip = (page - 1) * per_page;

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response('Não autenticado', { status: 401 });
  }

  try {
    await db.connect();
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    mongoose.model('category', Category.schema);
    mongoose.model('ProductSKU', ProductSKU.schema);
    const total_products = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip(skip)
      .limit(per_page)
      .populate({
        path: 'category',
        select: 'name',
      })
      .populate({
        path: 'skus',
        select: 'sku price -_id',
      });

    await db.disconnect();

    return NextResponse.json(
      {
        data: products,
        total_pages: Math.ceil(total_products / per_page),
        current_page: page,
        total_products,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    await db.disconnect();
    return new Response(String(error), { status: 400 });
  }
}
