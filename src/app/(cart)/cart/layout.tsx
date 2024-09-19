import HeaderCart from '@/components/cart/header-cart';

import { ChildrenProps } from '../../../../@Types/global';

export default function CartLayout({ children }: ChildrenProps) {
  return (
    <div>
      <HeaderCart />
      <div>{children}</div>
    </div>
  );
}
