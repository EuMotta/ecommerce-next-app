import { ProductAttribute } from '../attribute';

export interface Sku {
  _id: string;
  product: string;
  size: ProductAttribute;
  color: ProductAttribute;
  sku: string;
  price: number;
  quantity: number;
  created_at: string;
}

export interface Size {
  value: string;
}

export interface Color {
  value: string;
}
