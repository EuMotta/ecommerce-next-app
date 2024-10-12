/* eslint-disable react/no-unknown-property */
import type { Metadata } from 'next';

import Basic from '@/components/filter/menu-filter';
import { CarouselProducts } from '@/components/products/carousel';

import { ChildrenProps } from '../../../../@Types/global';

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'ShopAll',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/shopall-imagem-dark.svg',
    },
  ],
};

export default function Dashboard({ children }: ChildrenProps) {
  return (
    <div>
      <CarouselProducts />
      <Basic />
      {children}
    </div>
  );
}
