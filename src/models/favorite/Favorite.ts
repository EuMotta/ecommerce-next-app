import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, associe o favorito a um usuário'],
      unique: [true, 'este usuário já tem um favorito'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Favorite ||
  mongoose.model('Favorite', favoriteSchema);
