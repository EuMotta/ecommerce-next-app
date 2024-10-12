import type { Metadata } from 'next';

import HeaderCart from '@/components/cart/header-cart';

import { ChildrenProps } from '../../../../@Types/global';

export const metadata: Metadata = {
  title: 'Carrinho',
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
export default function CartLayout({ children }: ChildrenProps) {
  return (
    <div>
      <HeaderCart />
      <div>{children}</div>
    </div>
  );
}
