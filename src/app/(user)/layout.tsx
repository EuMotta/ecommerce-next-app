/* eslint-disable react/no-unknown-property */
import type { Metadata } from 'next';

import Navbar from '@/components/navbar/navbar';

import { ChildrenProps } from '../../../@Types/global';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Motta',
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
    <div>
      <Navbar>{children}</Navbar>
    </div>
  );
}
