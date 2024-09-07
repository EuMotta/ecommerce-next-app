import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Por favor, insira um nome'],
      maxlength: [15, 'Nome pode ter no máximo 15 caracteres'],
    },
    last_name: {
      type: String,
      required: [true, 'Por favor, insira um sobrenome'],
      maxlength: [100, 'Sobrenome pode ter no máximo 15 caracteres'],
    },
    username: {
      type: String,
      required: [true, 'Por favor, insira um nome de usuário'],
      unique: [true, 'Nome de usuário já cadastrado'],
      maxlength: [15, 'Nome de usuário pode ter no máximo 15 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'Por favor, insira um email'],
      unique: [true, 'Email já cadastrado'],
      maxlength: [60, 'Email pode ter no máximo 60 caracteres'],
    },
    password: {
      type: String,
      required: [true, 'Por favor, insira uma senha'],
      maxlength: [60, 'Senha pode ter no máximo 60 caracteres'],
    },
    birth_date: {
      type: Date,
      required: [true, 'Por favor, insira uma data de nascimento'],
    },
    status: {
      isActive: {
        type: Boolean,
        default: true,
      },
      isBanned: {
        type: Boolean,
        default: false,
      },
      timeOut: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model('User', userSchema);
