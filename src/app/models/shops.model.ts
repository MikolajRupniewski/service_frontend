import { Category } from './category.model';
import { User } from './user.model';
import { GeoLocation } from './geolocation.model';
import { ServicePlace } from './ServicePlace';
import { Service } from './service.model';
import { Day } from './day.model';
import { Employee } from './employee.model';

export interface Shop {
  id: number;
  name: string;
  category: Category;
  users: User;
  geoLocation: GeoLocation;
  pictures: string[];
  servicePlace: ServicePlace;
  services: Service[];
  maxDistance: number;
  employees: Employee[];
}
