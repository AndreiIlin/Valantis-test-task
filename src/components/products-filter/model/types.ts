import type { IProductsFilter } from '@/components/products-cards-section/model';

export interface FormValues {
  currentFilter: IProductsFilter['field'],
  inputs: {
    brand: string;
    product: string;
    price: number;
  }
}
