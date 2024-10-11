import type { Metadata } from 'next';

import Navbar from '@/components/navbar/navbar';

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

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navbar>{children}</Navbar>;
}
