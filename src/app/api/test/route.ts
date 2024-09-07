import db from '@/lib/mongodb';
import User from '@/models/user/User';

export async function GET() {
  await db.connect();
  await User.find();
  await db.disconnect();
  return new Response('test');
}
