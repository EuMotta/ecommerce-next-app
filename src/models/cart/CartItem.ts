import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
      required: [true, 'Por favor, associe o item a um carrinho'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Por favor, associe o item a um produto'],
    },
    product_sku: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductSKU',
      required: [true, 'Por favor, associe o item a um Product SKU'],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.CartItem ||
  mongoose.model('CartItem', cartItemSchema);
