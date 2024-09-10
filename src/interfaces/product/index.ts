import { Category } from '../category';
import { HTTP } from '../http';
import { Timestamps } from '../mongodb';
import { Sku } from '../sku';

export interface Product extends Timestamps {
  _id: string;
  name: string;
  description: string;
  image: string[];
  summary: string;
  slug: string;
  price: number;
  category: Category;
  skus: Sku[];
  cover: string;
  category_id: string;
}

export interface HookProduct extends HTTP {
  data: Product[];
}

export interface ProductPage {
  data: Product;
  related_products: Product[];
}
