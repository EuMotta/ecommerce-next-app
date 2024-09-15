import db from '@/lib/mongodb';
import Product from '@/models/product/Product';
import Rating from '@/models/review/Review';

export class ReviewsService {
  async getReview(id: any = {}, limit: number) {
    try {
      await db.connect();
      const reviews = await Rating.find({ product: id }).limit(limit).exec();

      const total_count = await Rating.countDocuments({ product: id }).exec();

      const average_rating =
        reviews.length > 0
          ? reviews.reduce((sum, rating) => sum + rating.rating, 0) /
            reviews.length
          : 0;

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
    try {
      await db.connect();

      const product = await Product.findOne({ code });
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      /*       const alreadyRated = await Rating.exists({
        user: userId,
        product: product._id,
      }); */

      /*       if (alreadyRated) {
        throw new Error('Você já avaliou este produto');
      } */
      const review = new Rating({
        user: userId,
        product: product._id,
        rating,
        comment,
        delivery_time,
      });

      await review.save();

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
