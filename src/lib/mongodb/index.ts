import { env } from '@/lib/env';
import mongoose from 'mongoose';

interface Connection {
  isConnected: number;
}

const connection: Connection = { isConnected: 0 };

async function connect() {
  if (connection.isConnected === 1) {
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log('Conectado');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(env.MONGODB_URI);
  connection.isConnected = mongoose.connections[0].readyState;

  if (connection.isConnected === 1) {
    console.log('Conectado ao MongoDB');
  }
}

async function disconnect() {
  if (connection.isConnected === 1) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = 0;
    } else {
      console.log('Não desconectou no ambiente de desenvolvimento');
    }
  }
}

const db = { connect, disconnect };
export default db;
