import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'O produto é obrigatório'],
    },
    name: {
      type: String,
      required: [true, 'O nome do desconto é obrigatório'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    discount_amount: {
      type: Number,
      required: [true, 'O valor do desconto é obrigatório'],
      min: [0, 'O desconto não pode ser negativo'],
    },
    discount_type: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: [true, 'O tipo de desconto é obrigatório'],
    },
    valid_from: {
      type: Date,
      required: [true, 'A data de início da validade é obrigatória'],
    },
    valid_to: {
      type: Date,
      required: [true, 'A data de término da validade é obrigatória'],
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Deal || mongoose.model('Deal', dealSchema);
