import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderDetails',
      required: [true, 'Por favor, associe o item a um pedido'],
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Por favor, associe o item a um produto'],
    },
    products_sku_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductSKU',
      required: [true, 'Por favor, associe o item a um Product SKU'],
    },
    quantity: {
      type: Number,
      required: [true, 'A quantidade do produto é necessária'],
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.OrderItem ||
  mongoose.model('OrderItem', orderItemSchema);
