import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/mongodb';
import Product from '@/models/product/Product';
import Rating from '@/models/rating/Rating';
import User from '@/models/user/User';
import mongoose from 'mongoose';

import { authOptions } from '../../auth/[...nextauth]/authOptions';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || '';
  const sizeParam = searchParams.get('size');
  const size = sizeParam ? Number(sizeParam) : 5;

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response('Não autenticado', { status: 401 });
  }

  try {
    await db.connect();
    mongoose.model('user', User.schema);
    const product = await Product.findOne({ slug });

    if (!product) {
      await db.disconnect();
      return new Response('Produto não encontrado', { status: 404 });
    }

    const allRatings = await Rating.find({ product: product._id })
      .select('rating')
      .exec();

    if (allRatings.length === 0) {
      await db.disconnect();
      return NextResponse.json(
        {
          ratings: [],
          average_rating: 0,
          total_ratings: 0,
        },
        { status: 200 },
      );
    }
    const totalSum = allRatings.reduce((sum, rating) => sum + rating.rating, 0);
    const average_rating = totalSum / allRatings.length;

    const ratings = await Rating.find({ product: product._id })
      .limit(size)
      .populate({
        path: 'user',
        select: 'name last_name -_id',
      })
      .exec();

    return NextResponse.json(
      {
        ratings,
        average_rating,
        total_ratings: allRatings.length,
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
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new Response('Não autenticado', { status: 401 });
    }

    await db.connect();
    mongoose.model('user', User.schema);

    const { slug, rating, comment } = await request.json();

    if (!slug || !rating || rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ message: 'Dados inválidos' }), {
        status: 400,
      });
    }

    const product = await Product.findOne({ slug });
    if (!product) {
      await db.disconnect();
      return new Response(
        JSON.stringify({ message: 'Produto não encontrado' }),
        { status: 404 },
      );
    }

    const newRating = new Rating({
      product: product._id,
      user: session.user._id,
      rating,
      comment,
    });

    await newRating.save();

    await db.disconnect();

    return new Response(
      JSON.stringify({ message: 'Comentário adicionado com sucesso' }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 },
    );
  } finally {
    await db.disconnect();
  }
}
