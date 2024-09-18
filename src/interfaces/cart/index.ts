import { Product } from '../product';

export interface Cart {
  total_count: number;
  total_value: number;
  total_value_with_discount: number;
  data: Daum[];
}

export interface Daum {
  _id: string;
  product: Product;
  quantity: number;
  company: Company;
  image: string[];
  total_value: number;
  total_value_with_discount: number;
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

export interface Company {
  corporate_name: string;
}
