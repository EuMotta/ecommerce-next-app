import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, associe o carrinho a um usuário'],
      unique: [true, 'este usuário já tem um carrinho'],
    },
    total: {
      type: Number,
      required: [true, 'Total necessário'],
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Favorite ||
  mongoose.model('Favorite', FavoriteSchema);
