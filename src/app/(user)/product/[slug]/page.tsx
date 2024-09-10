'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Container from '@/components/common/container';
import CepInputForm from '@/components/input/cep-input-form';
import { ProductCarousel } from '@/components/product/product-carousel';
import StarRating from '@/components/rating/star';
import { SellerRatingChart } from '@/components/seller/rating-chart';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetProduct } from '@/hooks/data-product/get-product';
import { Sku } from '@/interfaces/sku';
import { HeartIcon, ShoppingBagIcon, Tag } from 'lucide-react';

import currencyConverter from '@/utils/Conversions/currencyConverter';

interface Params {
  params: {
    slug: string;
  };
}
const Page = ({ params }: Params) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProduct(params.slug);
  console.log(products);
  const product = products?.data;
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
      {isLoading && <Skeleton className="h-4 w-[250px]" />}
      {isError && <div className="text-destructive">{error?.message}</div>}
      {product && selectedSku && (
        <Container className="space-y-10">
          <h3>{product.name}</h3>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="mb-5 flex items-center justify-evenly space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/shopall-normal.svg"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div className="h-6 border-l border-muted" />
                <div className="flex items-center space-x-2">
                  <StarRating rating={2} />
                  <span className="text-xs text-orange-500">(27)</span>
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
                    <Link href={'/'} className="font-bold uppercase underline">
                      SAMSUNGA
                    </Link>
                  </span>
                  <h1 className="text-primary">
                    {currencyConverter(selectedSku?.price)}
                  </h1>
                  <span className="text-xs text-muted-foreground">
                    À vista no boleto
                  </span>
                  <br />
                  <span className="text-xs text-muted-foreground">
                    ou em até 10x de{' '}
                    <strong>
                      {currencyConverter(selectedSku?.price / 10)}
                    </strong>{' '}
                    no cartão
                  </span>
                  <br />
                  <span className="text-xs text-muted-foreground">
                    <Link href={'/'} className="underline">
                      Opções de pagamento
                    </Link>
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[150px] justify-start"
                      >
                        {selectedSku
                          ? `${selectedSku.size.value} - ${selectedSku.color.value}`
                          : 'Select SKU'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {product.skus.map((sku) => (
                        <DropdownMenuItem
                          key={sku.sku}
                          onSelect={() => handleSkuChange(sku)}
                        >
                          {`${sku.size.value} - ${sku.color.value}`}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <SellerRatingChart />
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
                        href={`/product/${product.slug}`}
                        key={product._id}
                        className="relative"
                      >
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          width={100}
                          height={100}
                        />
                        <div className="text-center text-xs text-primary">
                          {currencyConverter(product.price)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Button className="w-full">
                  <ShoppingBagIcon /> Comprar
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4 flex gap-2">
              {product.skus.map((sku, index) => (
                <Button
                  key={index}
                  variant={selectedSku === sku ? 'default' : 'outline'}
                  className={`border px-4 py-2`}
                  onClick={() => setSelectedSku(sku)}
                >
                  {sku.sku} - {sku.size.value} - {sku.color.value}
                </Button>
              ))}
            </div>

            <div>
              <h4 className="flex gap-2 uppercase">
                <Tag className="text-primary" size={26} />
                <strong>Descrição</strong>
              </h4>
              <div>
                {selectedSku &&
                  selectedSku.technicalSpecifications.specifications.map(
                    (spec) => (
                      <div key={spec._id} className="mb-4">
                        <h5 className="font-bold">{spec.title}</h5>
                        <ul className="list-inside list-disc">
                          {spec.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Page;
