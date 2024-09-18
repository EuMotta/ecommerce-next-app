'use client';

import { useRouter } from 'next/navigation';

import CartItemCard from '@/components/cart/cart-item-card';
import NoData from '@/components/common/no-data';
import { Button } from '@/components/ui/button';
import { useGetCart } from '@/hooks/data-cart/get-cart';
import { ChevronLeft } from 'lucide-react';

import currencyConverter from '@/utils/Conversions/currencyConverter';

const Page = () => {
  const { data: cartItems } = useGetCart();
  console.log(cartItems);
  const router = useRouter();
  return (
    <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto px-4 2xl:px-0">
        <Button size={'icon'} onClick={() => router.back()} variant={'outline'}>
          <ChevronLeft />
        </Button>

        {cartItems && (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.data.map((item) => (
                  <CartItemCard item={item} key={item._id} />
                ))}
                {cartItems.data.length < 1 && (
                  <NoData
                    image="/stickers/carrinho-vazio.png"
                    title="Você não tem nenhum item no carrinho =("
                    subtitle="Não perca tempo, adicione agora"
                  />
                )}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="6 min-w-9 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Resumo
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Preço original
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {currencyConverter(cartItems.total_value)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Com desconto
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        {currencyConverter(cartItems.total_value_with_discount)}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {currencyConverter(cartItems?.total_value_with_discount)}
                    </dd>
                  </dl>
                </div>

                <Button className="w-full">Comprar</Button>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {' '}
                    ou{' '}
                  </span>
                  <a
                    href="#"
                    title=""
                    className="text-primary-700 dark:text-primary-500 inline-flex items-center gap-2 text-sm font-medium underline hover:no-underline"
                  >
                    Continue procurando
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {' '}
                      Do you have a voucher or gift card?{' '}
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
