import mongoose from 'mongoose';

const paymentDetailsSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderDetails',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Valor do pagamento é necessário'],
    },
    provider: {
      type: String,
      required: [true, 'Provedor de pagamento é necessário'],
      enum: ['credit_card', 'paypal', 'pix', 'boleto', 'bank_transfer'],
    },
    status: {
      type: String,
      required: [true, 'Status do pagamento é necessário'],
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.PaymentDetails ||
  mongoose.model('PaymentDetails', paymentDetailsSchema);
