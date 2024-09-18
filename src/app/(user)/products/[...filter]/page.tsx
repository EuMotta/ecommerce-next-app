import Container from '@/components/common/container';
import ProductListDynamic from '@/templates/products/products-list-dynamic';

const Page = ({ params }: { params: { filter: string[] } }) => {
  return (
    <Container>
      <ProductListDynamic filter={params} />
    </Container>
  );
};

export default Page;
