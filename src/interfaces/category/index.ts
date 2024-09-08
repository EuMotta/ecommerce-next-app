import { Timestamps } from '../mongodb';

export interface Category extends Timestamps {
  _id: string;
  name: string;
  description: string;
}
