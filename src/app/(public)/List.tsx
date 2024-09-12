import React from 'react';

import { ProductsService } from '@/app/api/services/product';

const UsersList: React.FC = async () => {
  const product = new ProductsService();
  const products = await product.getProducts({ name: 'aaa' });
  console.log(products);
  return <ul></ul>;
};

export default UsersList;
