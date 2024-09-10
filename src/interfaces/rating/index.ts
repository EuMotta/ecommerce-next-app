import { User } from '../user';

export interface Ratings {
  ratings: Rating[];
  total_ratings: number;
  average_rating: number;
}

export interface Rating {
  _id: string;
  user: User;
  product: string;
  rating: number;
  comment: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
