import { User } from '../user';

export interface Reviews {
  reviews: Review[];
  total_count: number;
  average_rating: number;
}

export interface Review {
  _id: string;
  user: User;
  product: string;
  rating: number;
  comment: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
