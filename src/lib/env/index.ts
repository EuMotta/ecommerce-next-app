import zod from 'zod';

const envSchema = zod.object({
  FULL_URL: zod.string().min(1),
  MONGODB_URI: zod.string().min(1),
  NEXTAUTH_SECRET: zod.string().min(1),
  FULL_APIURL: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
