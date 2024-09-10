import mongoose from 'mongoose';

const productSKUSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Por favor, associe o SKU a um produto'],
  },
  price: {
    type: Number,
    required: [true, 'Por favor, insira o preço do produto'],
    min: [0, 'O preço não pode ser negativo'],
  },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductAttribute',
    required: [true, 'Por favor, associe o SKU a um atributo de tamanho'],
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductAttribute',
    required: [true, 'Por favor, associe o SKU a um atributo de cor'],
  },
  technicalSpecifications: {
    characteristics: {
      type: String,
      maxlength: [100, 'caracteristicas pode ter no máximo 100 caracteres'],
      required: [true, 'Por favor, formeça as caracteristicas do produto'],
    },
    specifications: [
      {
        title: { type: String },
        description: [{ type: String }],
      },
    ],
  },
  sku: {
    type: String,
    required: [true, 'Por favor, insira o SKU'],
    unique: true,
    maxlength: [50, 'SKU pode ter no máximo 50 caracteres'],
  },
  quantity: {
    type: Number,
    required: [true, 'Por favor, insira a quantidade em estoque'],
    min: [0, 'A quantidade não pode ser negativa'],
  },
  deletedAt: {
    type: Date,
  },
});

export default mongoose.models.ProductSKU ||
  mongoose.model('ProductSKU', productSKUSchema);
