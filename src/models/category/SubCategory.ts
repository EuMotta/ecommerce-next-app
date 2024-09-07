import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Por favor, insira o ID da categoria pai'],
    },
    name: {
      type: String,
      required: [true, 'Por favor, insira um nome para a subcategoria'],
      maxlength: [50, 'Nome pode ter no máximo 50 caracteres'],
    },
    description: {
      type: String,
      maxlength: [250, 'Descrição pode ter no máximo 250 caracteres'],
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.SubCategory ||
  mongoose.model('SubCategory', subCategorySchema);
