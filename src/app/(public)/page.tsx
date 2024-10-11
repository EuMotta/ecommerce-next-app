import HomeSeparator from '@/components/separator/home-separator';
import { Hero, Offer, Halo, HomeProductList } from '@/templates/home';

const Page = () => {
  return (
    <div>
      <Hero />
      <Offer />
      <HomeSeparator />
      <HomeProductList />
      <Halo />
    </div>
  );
};

export default Page;
