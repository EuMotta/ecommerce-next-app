import db from '@/lib/mongodb';
import Rating from '@/models/rating/Rating';

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
}
