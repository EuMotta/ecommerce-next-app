import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, insira um nome para a categoria'],
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

export default mongoose.models.Category ||
  mongoose.model('Category', categorySchema);
