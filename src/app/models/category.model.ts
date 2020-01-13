import { Shop } from './shops.model';

export interface Category {
  id: number;
  name: string;
  shops: Shop[];
}
