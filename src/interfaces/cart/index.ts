import { Product } from '../product';

export interface Cart {
  total_count: number;
  total_value: number;
  total_value_with_discount: number;
  data: CartItem[];
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  company: Company;
  image: string[];
  total_value: number;
  total_value_with_discount: number;
}

interface Company {
  corporate_name: string;
}

export interface AddCartItem {
  productId: string;
  skuId: string;
}
