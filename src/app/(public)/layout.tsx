import type { Metadata } from 'next';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar/navbar';
import { ScrollArea } from '@/components/ui/scroll-area';

export const metadata: Metadata = {
  title: 'Home',
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

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ScrollArea className="h-[calc(100vh-7.5rem)]">
          {children}
          <Footer />
        </ScrollArea>
      </main>
    </>
  );
}
