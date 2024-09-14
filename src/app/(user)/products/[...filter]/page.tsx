import Container from '@/components/common/container';
import ProductListDynamic from '@/templates/products/products-list-dynamic';

const Page = ({ params }: { params: { filter: string[] } }) => {
  console.log(params);
  return (
    <Container>
      <ProductListDynamic filter={params} />
    </Container>
  );
};

export default Page;
