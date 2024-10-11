import mongoose from 'mongoose';

const orderDetailsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, associe o pedido a um usuário'],
    },
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentDetails',
      required: false,
    },
    total: {
      type: Number,
      required: [true, 'Total do pedido é necessário'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.OrderDetails ||
  mongoose.model('OrderDetails', orderDetailsSchema);
