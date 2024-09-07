import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, insira o ID do usuário'],
    },
    title: {
      type: String,
      required: [true, 'Por favor, insira um título'],
    },
    address_line_1: {
      type: String,
      required: [true, 'Por favor, insira a primeira linha do endereço'],
    },
    address_line_2: {
      type: String,
    },
    country: {
      type: String,
      required: [true, 'Por favor, insira o país'],
    },
    city: {
      type: String,
      required: [true, 'Por favor, insira a cidade'],
    },
    postal_code: {
      type: String,
      required: [true, 'Por favor, insira o código postal'],
    },
    landmark: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Address ||
  mongoose.model('Address', addressSchema);
