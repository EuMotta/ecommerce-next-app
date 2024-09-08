import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, insira o nome do produto'],
      maxlength: [100, 'Nome pode ter no máximo 100 caracteres'],
    },
    description: {
      type: String,
      maxlength: [500, 'Descrição pode ter no máximo 500 caracteres'],
    },
    slug: {
      type: String,
      unique: true,
      maxlength: [100, 'Slug pode ter no máximo 500 caracteres'],
    },
    summary: {
      type: String,
      maxlength: [250, 'Resumo pode ter no máximo 250 caracteres'],
    },
    price: {
      type: Number,
      required: [true, 'Por favor, insira o preço do produto'],
      min: [0, 'O preço não pode ser negativo'],
    },
    cover: {
      type: String,
      maxlength: [
        255,
        'URL da imagem de capa pode ter no máximo 255 caracteres',
      ],
    },
    sku: {
      type: String,
      maxlength: [50, 'SKU pode ter no máximo 50 caracteres'],
    },
    image: [{ type: String }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Por favor, associe o produto a uma categoria'],
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);
