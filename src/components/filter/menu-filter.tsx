'use client';
import { usePathname } from 'next/navigation';

import LocalSearch from './local-search';

export default function CategoryFilter() {
  const pathname = usePathname();

  return (
    <div className="m-5 flex gap-5">
      <LocalSearch path={pathname} />
    </div>
  );
}
