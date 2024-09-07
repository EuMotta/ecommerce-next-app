import { NextRequest } from 'next/server';

import db from '@/lib/mongodb';
import User from '@/models/user/User';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { name, username, email, last_name, birth_date, password } = data;

  try {
    await db.connect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      await db.disconnect();
      return new Response('Usuário já existe!', { status: 401 });
    }

    const newUser = new User({
      name,
      last_name,
      username,
      email,
      birth_date,
      password: bcryptjs.hashSync(password),
    });

    await newUser.save();
    await db.disconnect();
    return new Response('Usuário criado com sucesso!', { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new Response(error.message, { status: 500 });
    }
  }
}
