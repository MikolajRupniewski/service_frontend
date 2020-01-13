import { Shop } from './shops.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  zipCode: string;
  city: string;
  streetName: string;
  houseNumber: string;
  apartmentNumber: string;
  username: string;
  password: string;
  enabled: boolean;
  shop: Shop;

}
