import Link from 'next/link';

import { Separator } from '../ui/separator';

const HomeSeparator = () => {
  return (
    <div className="grid grid-cols-7 items-center p-5 py-10">
      <Separator orientation="horizontal" className="col-span-3" />
      <div className="text-center">
        <h4>Novos produtos</h4>
        <Link href={'/'} className="underline">
          Ver mais
        </Link>
      </div>
      <Separator orientation="horizontal" className="col-span-3" />
    </div>
  );
};

export default HomeSeparator;
