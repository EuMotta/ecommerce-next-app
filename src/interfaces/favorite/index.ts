import { Product } from '../product';

export interface Favorite {
  total_count: number;
  _id: string;
  data: DaumFavoriteItem[];
}

export interface DaumFavoriteItem {
  _id: string;
  product: Product;
}
