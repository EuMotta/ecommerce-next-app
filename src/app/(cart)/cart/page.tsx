'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useGetCart } from '@/hooks/data-cart/get-cart';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Heart, Minus, Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';

import currencyConverter from '@/utils/Conversions/currencyConverter';

const Page = () => {
  const { data: cartItems, refetch } = useGetCart();
  console.log(cartItems);
  const updateItemQuantity = async ({
    itemId,
    action,
  }: {
    itemId: string;
    action: 'add-quantity' | 'remove-quantity';
  }) => {
    try {
      const response = await axios.put(`/api/data/cart/cart-item/${itemId}`, {
        action,
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const {
    mutateAsync: updateQuantity,
    isPending,
    /* error, */
  } = useMutation({
    mutationFn: updateItemQuantity,
    onSuccess: (response) => {
      console.log('Quantidade atualizada com sucesso:', response);
      refetch();
    },
    onError: (error) => {
      console.error('Erro ao atualizar quantidade:', error.message);
    },
  });
  return (
    <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        {cartItems && (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems &&
                  cartItems.data.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <Link href="/" className="shrink-0 md:order-1">
                          <Image
                            src={item.product.image[0]}
                            width={100}
                            height={100}
                            alt="imac image"
                            className="object-cover"
                          />
                        </Link>

                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <Button
                              type="button"
                              size={'icon'}
                              disabled={isPending}
                              variant={'outline'}
                              onClick={() =>
                                updateQuantity({
                                  itemId: item._id,
                                  action: 'add-quantity',
                                })
                              }
                              className="h-5 w-5"
                            >
                              <Plus />
                            </Button>
                            <span className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium">
                              {item.quantity}
                            </span>

                            <Button
                              type="button"
                              size={'icon'}
                              variant={'outline'}
                              disabled={isPending}
                              onClick={() =>
                                updateQuantity({
                                  itemId: item._id,
                                  action: 'remove-quantity',
                                })
                              }
                              className="h-5 w-5"
                            >
                              <Minus />
                            </Button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            {item.total_value_with_discount !== null &&
                              item.total_value_with_discount <
                                item.total_value && (
                                <>
                                  <p className="text-sm font-extrabold leading-tight text-destructive line-through">
                                    {currencyConverter(item.total_value)}
                                  </p>
                                  <p className="text-xl font-extrabold leading-tight text-green-500">
                                    {currencyConverter(
                                      item.total_value_with_discount,
                                    )}
                                  </p>
                                </>
                              )}
                            {item.total_value_with_discount ===
                              item.total_value && (
                              <p className="text-xl font-extrabold leading-tight text-green-500">
                                {currencyConverter(item.total_value)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <Link
                            href="#"
                            className="line-clamp-3 text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            {item.product.name}
                          </Link>

                          <div className="flex items-center gap-4">
                            <Button type="button" variant={'link'}>
                              <Heart />
                              Adicionar aos favoritos
                            </Button>

                            <Button
                              type="button"
                              variant={'link'}
                              className="text-destructive"
                            >
                              <Trash />
                              Remover
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="hidden xl:mt-8 xl:block">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  People also bought
                </h3>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="6 min-w-9 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
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
