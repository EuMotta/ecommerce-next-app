import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, associe a lista de desejos a um usuário'],
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Wishlist ||
  mongoose.model('Wishlist', wishlistSchema);
