import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    logo: {
      type: String,
    },
    cnpj: {
      type: String,
      maxlength: [14, 'O CNPJ deve ter no máximo 14 caracteres'],
      min: [14, 'O CNPJ deve ter no mínimo 14 caracteres'],
      required: [true, 'insira o CNPJ'],
      unique: [true, 'O cnpj já está cadastrado'],
    },
    corporate_name: {
      type: String,
      maxlength: [100, 'A razão social deve ter no máximo 100 caracteres'],
      required: [true, 'insira a razão social'],
      unique: [true, 'Razão social já cadastrada'],
    },
    website: {
      type: String,
      maxlength: [1000, 'O website deve ter no máximo 1000 caracteres'],
      unique: [true, 'Website já cadastrado'],
    },
    social_media: {
      facebook: {
        type: String,
        maxlength: [100, 'O facebook deve ter no máximo 100 caracteres'],
        unique: [true, 'Facebook já cadastrado'],
      },
      instagram: {
        type: String,
        maxlength: [100, 'O instagram deve ter no máximo 100 caracteres'],
        unique: [true, 'Instagram já cadastrado'],
      },
    },
    company_scores: {
      avg_products_quality: {
        type: Number,
        default: 0,
      },
      avg_delivery_time: {
        type: Number,
        default: 0,
      },
      quantity: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Company ||
  mongoose.model('Company', companySchema);
