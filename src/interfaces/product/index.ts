import { Category } from '../category';
import { HTTP } from '../http';
import { Timestamps } from '../mongodb';

export interface Product extends Timestamps {
  _id: string;
  name: string;
  description: string;
  image: string[];
  summary: string;
  slug: string;
  price: number;
  category: Category;
  cover: string;
  category_id: string;
}

export interface HookProduct extends HTTP {
  data: Product[];
}
