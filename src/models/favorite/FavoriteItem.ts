import mongoose from 'mongoose';

const favoriteItemSchema = new mongoose.Schema(
  {
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Favorite',
      required: [true, 'Por favor, associe o item a um carrinho'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Por favor, associe o item a um produto'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.FavoriteItem ||
  mongoose.model('FavoriteItem', favoriteItemSchema);
