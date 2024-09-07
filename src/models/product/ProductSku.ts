import mongoose from 'mongoose';

const productSkuSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Por favor, associe o SKU a um produto'],
  },
  size_attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductAttribute',
    required: [true, 'Por favor, associe o SKU a um atributo de tamanho'],
  },
  color_attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductAttribute',
    required: [true, 'Por favor, associe o SKU a um atributo de cor'],
  },
  sku: {
    type: String,
    required: [true, 'Por favor, insira o SKU'],
    maxlength: [50, 'SKU pode ter no máximo 50 caracteres'],
  },
  price: {
    type: Number,
    required: [true, 'Por favor, insira o preço'],
  },
  quantity: {
    type: Number,
    required: [true, 'Por favor, insira a quantidade em estoque'],
  },
  deletedAt: {
    type: Date,
  },
});

export default mongoose.models.ProductSKU ||
  mongoose.model('ProductSKU', productSkuSchema);
