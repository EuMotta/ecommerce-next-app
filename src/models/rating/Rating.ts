import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'O usuário é obrigatório'],
      // unique: [true, 'Você já comentou esse produto.'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'O produto é obrigatório'],
    },
    rating: {
      type: Number,
      required: [true, 'A nota é obrigatória'],
      min: [1, 'A nota deve ser no mínimo 1'],
      max: [5, 'A nota deve ser no máximo 5'],
    },
    comment: {
      type: String,
      maxlength: [500, 'O comentário pode ter no máximo 500 caracteres'],
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
