import { Category } from '../category';
import { Company } from '../company';
import { HTTP } from '../http';
import { Timestamps } from '../mongodb';
import { Sku } from '../sku';

export interface Product extends Timestamps {
  _id: string;
  name: string;
  description: string;
  image: string[];
  technicalSpecifications: TechnicalSpecifications;
  summary: string;
  slug: string;
  code: number;
  price: number;
  sub_category: Category;
  skus: Sku[];
  cover: string;
  company: Company;
  category_id: string;
  price_with_discount: number;
  average_rating: number;
  discount_amount: number;
  total_ratings: number;
}
export interface TechnicalSpecifications {
  characteristics: string;
  specifications: Specification[];
}
export interface Specification {
  title: string;
  description: string[];
  _id: string;
}
export interface HookProduct extends HTTP {
  data: Product[];
  total_count: number;
}

export interface ProductPage {
  product: Product;
  related_products: Product[];
}
