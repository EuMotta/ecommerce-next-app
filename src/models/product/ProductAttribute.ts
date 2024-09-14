import mongoose from 'mongoose';

const productAttributeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      maxlength: [255, 'O tipo deve ter no máximo 50 caracteres'],
      enum: ['cor', 'tamanho'],
    },
    value: {
      type: String,
      maxlength: [45, 'O valor deve ter no máximo 45 caracteres'],
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.ProductAttribute ||
  mongoose.model('ProductAttribute', productAttributeSchema);
