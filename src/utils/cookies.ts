'use server';
import { cookies } from 'next/headers';

interface Cookie {
  name: string;
  value: string;
}

interface Data {
  data: Cookie;
}
export const cookiesSet = async ({ data }: Data) => {
  cookies().set({
    name: data.name,
    value: data.value,
    httpOnly: true,
    path: '/',
  });
};
export const cookiesGet = async (data: string) => {
  const cookieData = cookies().get(data);
  return cookieData;
};
export const cookiesGetAll = async () => {
  const cookieData = cookies().getAll();
  return cookieData;
};
export const cookiesHas = async (data: string) => {
  const hasCookie = cookies().has(data);
  return hasCookie;
};
