import { ProductAttribute } from '../attribute';

export interface Sku {
  _id: string;
  product: string;
  size: ProductAttribute;
  color: ProductAttribute;
  sku: string;
  price: number;
  technicalSpecifications: TechnicalSpecifications;
  quantity: number;
  created_at: string;
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

export interface Size {
  value: string;
}

export interface Color {
  value: string;
}
