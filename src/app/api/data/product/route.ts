import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/mongodb';
import Category from '@/models/category/Category';
import Product from '@/models/product/Product';
import ProductAttribute from '@/models/product/ProductAttribute';
import ProductSKU from '@/models/product/ProductSKU';
import mongoose from 'mongoose';

import { authOptions } from '../../auth/[...nextauth]/authOptions';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || '';

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response('Não autenticado', { status: 401 });
  }

  try {
    await db.connect();
    mongoose.model('category', Category.schema);
    mongoose.model('sku', ProductSKU.schema);
    mongoose.model('ProductAttribute', ProductAttribute.schema);

    const product = await Product.findOne({ slug: slug })
      .populate({
        path: 'category',
        select: 'name',
      })
      .populate({
        path: 'skus',
        select:
          'sku price technicalSpecifications size_attribute color_attribute quantity -_id',
        populate: [
          {
            path: 'size',
            select: 'value -_id',
          },
          {
            path: 'color',
            select: 'value -_id',
          },
        ],
      });

    if (!product) {
      await db.disconnect();
      throw new Error('Product not found');
    }
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category._id,
    })
      .populate({
        path: 'skus',
        select: 'sku price -_id',
      })
      .limit(4);

    return NextResponse.json(
      {
        data: product,
        related_products: relatedProducts,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(String(error), { status: 400 });
  } finally {
    await db.disconnect();
  }
}
