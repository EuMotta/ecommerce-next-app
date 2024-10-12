import db from '@/lib/mongodb';
import Product from '@/models/product/Product';
import Review from '@/models/review/Review';
import mongoose from 'mongoose';

export class ReviewsService {
  async getReview(id: any = {}, limit: number) {
    try {
      await db.connect();
      const aggregationPipeline: Array<mongoose.PipelineStage> = [];

      aggregationPipeline.push({
        $match: { product: new mongoose.Types.ObjectId(id) },
      });

      aggregationPipeline.push({
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      });

      aggregationPipeline.push({
        $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
      });

      aggregationPipeline.push({
        $sort: { createdAt: -1 },
      });

      aggregationPipeline.push({
        $limit: limit,
      });

      aggregationPipeline.push({
        $group: {
          _id: null,
          average_rating: { $avg: '$rating' },
          reviews: { $push: '$$ROOT' },
          total_count: { $sum: 1 },
        },
      });

      const result = await Review.aggregate(aggregationPipeline).exec();

      if (result.length === 0) {
        return { reviews: [], total_count: 0, average_rating: 0 };
      }

      const { reviews, average_rating, total_count } = result[0];

      return { reviews, total_count, average_rating };
    } catch (error) {
      console.error('Erro ao efetuar o fetch em services:', error);
      return { reviews: [], total_count: 0, average_rating: 0 };
    } finally {
      await db.disconnect();
    }
  }

  async createReview(
    userId: string,
    code: string,
    rating: number,
    comment: string,
    delivery_time: string,
  ) {
    await db.connect();
    try {
      const product = await Product.findOne({ code });
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      /*       const alreadyRated = await Review.exists({
        user: userId,
        product: product._id,
      }); */

      /*       if (alreadyRated) {
        throw new Error('Você já avaliou este produto');
      } */
      const review = new Review({
        user: userId,
        product: product._id,
        rating,
        comment,
        delivery_time,
      });

      await review.save();
      await db.disconnect();
      return review;
    } catch (error) {
      console.error('Erro ao criar o review:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('erro desconhecido');
    } finally {
      await db.disconnect();
    }
  }
}
