import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, associe o carrinho a um usuário'],
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

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
