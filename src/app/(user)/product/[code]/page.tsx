'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsCartXFill } from 'react-icons/bs';

import Container from '@/components/common/container';
import CepInputForm from '@/components/input/cep-input-form';
import { AddToCart } from '@/components/product/add-to-cart';
import { ProductCarousel } from '@/components/product/product-carousel';
import ProductComments from '@/components/product/product-comments';
import TechnicalSpecifications from '@/components/product/product-technicalSpecifications';
import StarRating from '@/components/rating/star';
import { SellerRatingChart } from '@/components/seller/rating-chart';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetProductRatings } from '@/hooks/data-product-ratings/get-product-ratings';
import { useGetProduct } from '@/hooks/data-product/get-product';
import { Sku } from '@/interfaces/sku';
import { ProductProvider } from '@/providers/product';
import { ChevronLeft, HeartIcon, Tag } from 'lucide-react';

import currencyConverter from '@/utils/Conversions/currencyConverter';

interface Params {
  params: {
    code: string;
  };
}
const Page = ({ params }: Params) => {
  const [commentsSize, setCommentsSize] = useState<number>(2);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProduct(params.code);
  const product = products?.product;
  const {
    data: reviews,
    isLoading: isLoadingRatings,
    isError: isErrorRatings,
    error: errorRatings,
    refetch: refetchRatings,
  } = useGetProductRatings({ id: product?._id, limit: commentsSize });
  const router = useRouter();
  const loadMoreComments = () => {
    setCommentsSize((prevSize) => prevSize + 5);
  };

  const [selectedSku, setSelectedSku] = useState<Sku | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedSku(product.skus[0]);
    }
  }, [product]);

  const handleSkuChange = (newSku: Sku) => {
    setSelectedSku(newSku);
  };

  return (
    <div className="p-2">
      <Button
        variant={'outline'}
        size={'icon'}
        onClick={() => router.back()}
        className="m-5"
      >
        <ChevronLeft />{' '}
      </Button>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Image
            src={'/stickers/loading.gif'}
            width={200}
            height={200}
            alt="loading"
          />
          <p>Carregando produto</p>
        </div>
      )}
      {isError && <div className="text-destructive">{error?.message}</div>}
      {product && selectedSku && (
        <ProductProvider
          data={product}
          error
          isError
          isLoading
          related_products={products.related_products}
        >
          <Container className="space-y-10">
            <h3>{product.name}</h3>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="mb-5 flex items-center justify-evenly space-x-4">
                  <div className="flex-shrink-0 rounded p-1 dark:bg-muted-foreground/50">
                    <Image
                      src={product.company.logo}
                      alt="Logo"
                      width={100}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                  <div className="h-6 border-l border-muted" />
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">
                      {reviews?.average_rating?.toFixed(1)}
                    </span>
                    <StarRating rating={reviews?.average_rating ?? 0} />

                    <span className="text-xs text-orange-500">
                      ({reviews?.total_count})
                    </span>
                  </div>
                  <div className="h-6 border-l border-muted" />
                  <div className="flex items-center space-x-2">
                    <HeartIcon />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ProductCarousel product={product} />
                </div>

                <div>
                  <p>
                    <strong>consultar prazo de entrega e frete</strong>
                  </p>
                  <CepInputForm />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="space-y-10">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Vendido e entregue por{' '}
                      <Link
                        href={'/'}
                        className="font-bold uppercase underline"
                      >
                        {product.company.corporate_name}
                      </Link>
                    </span>
                    <h1 className="text-primary">
                      {currencyConverter(product.price)}
                    </h1>
                    <span className="text-xs text-muted-foreground">
                      À vista no boleto
                    </span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                      ou em até 10x de{' '}
                      <strong>{currencyConverter(product.price / 10)}</strong>{' '}
                      no cartão
                    </span>
                    <br />{' '}
                    <Link href={'/'} className="underline">
                      <span className="text-xs text-muted-foreground">
                        Opções de pagamento
                      </span>
                    </Link>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[150px] justify-start"
                      >
                        {selectedSku ? selectedSku.sku : product.skus[0].sku}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {product.skus.map((sku) => (
                        <DropdownMenuItem
                          key={sku.sku}
                          onSelect={() => handleSkuChange(sku)}
                          disabled={sku.quantity < 1}
                          className="gap-2"
                        >
                          {sku.sku}{' '}
                          {sku.quantity < 1 && (
                            <BsCartXFill className="text-destructive" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <SellerRatingChart
                    quality={
                      product.company.company_scores.avg_products_quality
                    }
                    delivery_time={
                      product.company.company_scores.avg_delivery_time
                    }
                    quantity={product.company.company_scores.quantity}
                    company_name={product.company.corporate_name}
                  />
                  <div>
                    <p className="flex gap-2 uppercase">
                      <Tag className="text-primary" size={16} />
                      <strong>produtos relacionados</strong>
                    </p>
                    <div className="flex">
                      {products.related_products.length < 1 && (
                        <span className="p-5">nenhum produto encontrado</span>
                      )}
                      {products.related_products.map((product) => (
                        <Link
                          href={`/product/${product.code}`}
                          key={product._id}
                          className="relative block h-64 w-48"
                        >
                          <div className="flex h-20 w-20 items-center justify-center">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              width={400}
                              height={400}
                              className=""
                            />
                          </div>
                          <div className="mt-2 text-center text-xs text-primary">
                            {currencyConverter(product.price)}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <AddToCart productId={product._id} skuId={selectedSku._id} />
                </div>
              </div>
            </div>
            <TechnicalSpecifications
              specifications={product.technicalSpecifications.specifications}
              characteristics={product.technicalSpecifications.characteristics}
            />
            {reviews && (
              <ProductComments
                refetch={refetchRatings}
                code={params.code}
                companyId={product.company._id}
                reviews={reviews}
                errorRatings={errorRatings ?? new Error('Unknown error')}
                isErrorRatings={isErrorRatings}
                commentsSize={commentsSize}
                isLoadingRatings={isLoadingRatings}
                loadMoreComments={loadMoreComments}
              />
            )}
          </Container>
        </ProductProvider>
      )}
    </div>
  );
};

export default Page;
