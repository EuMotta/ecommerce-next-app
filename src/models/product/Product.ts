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
    number: {
      type: Number,
      unique: [true, 'Número do produto já existente'],
      required: [true, 'Por favor, insira o número do produto'],
      min: [0, 'O número não pode ser negativo'],
    },
    warranty: {
      type: Number,
      required: [true, 'Por favor, insira o tempo de garantia'],
      maxlength: [100, 'Garantia pode ter no máximo 100 meses'],
      min: [3, 'Garantia mínima é três meses'],
    },
    weight: {
      type: Number,
      required: [true, 'Por favor, insira o peso do produto'],
      maxlength: [999999, 'Peso do produto pode ter no máximo 999999 gramas'],
      min: [0, 'O peso não pode ser negativo'],
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

    cover: {
      type: String,
      maxlength: [
        255,
        'URL da imagem de capa pode ter no máximo 255 caracteres',
      ],
    },
    skus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSKU',
        required: [true, 'Por favor, insira pelo menos um SKU'],
      },
    ],
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
