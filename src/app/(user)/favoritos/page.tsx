'use client';

import Image from 'next/image';

import Steps from '@/components/cart/steps';
import Container from '@/components/common/container';
import NoData from '@/components/common/no-data';
import Section from '@/components/common/section';
import FavoriteItemCard from '@/components/favorite/favorite-item-card';
import { useGetFavorite } from '@/hooks/data-favorite/get-favorite';

const Page = () => {
  const { isLoading, data: favoriteItems } = useGetFavorite();
  console.log(favoriteItems);
  return (
    <Section className="antialiased">
      <Container>
        <Steps />
        <div className="mx-auto px-4 2xl:px-0">
          {isLoading && (
            <Image
              src={'/stickers/loading.gif'}
              width={200}
              height={200}
              alt="loading"
            />
          )}
          {favoriteItems && favoriteItems.data && (
            <div className="space-y-2">
              <dl className="flex items-center justify-end gap-4">
                <dt className="text-base font-normal">Quantidade</dt>
                <dd className="text-base font-medium">
                  {favoriteItems.total_count}
                </dd>
              </dl>
            </div>
          )}
          {favoriteItems && favoriteItems.data && (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {favoriteItems.data.map((item) => (
                    <FavoriteItemCard item={item} key={item._id} />
                  ))}
                  {favoriteItems.data.length < 1 && (
                    <NoData
                      image="/stickers/carrinho-vazio.png"
                      title="Você não tem nenhum item no carrinho =("
                      subtitle="Não perca tempo, adicione agora"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default Page;
