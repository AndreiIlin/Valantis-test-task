import { Product } from '@/shared/types';

export type QueryStatus = 'loading' | 'success' | 'error';

export interface IProductsFilter {
  field: keyof Omit<Product, 'id'> | 'all';
  value: string | number | null;
}
