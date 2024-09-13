/* eslint-disable react/no-unknown-property */
import type { Metadata } from 'next';

import Basic from '@/components/filter/menu-filter';

import { ChildrenProps } from '../../../../@Types/global';

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'ShoPALL',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/M.svg',
    },
  ],
};

export default function Dashboard({ children }: ChildrenProps) {
  return (
    <div className="flex flex-col">
      <Basic />
      {children}
    </div>
  );
}
