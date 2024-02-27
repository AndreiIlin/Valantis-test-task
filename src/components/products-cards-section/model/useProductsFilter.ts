import type { IProductsFilter } from '@/components/products-cards-section/model';
import { useState } from 'react';

export const useProductsFilter = () => {
  const [filter, setFilter] = useState<IProductsFilter>({
    field: 'all',
    value: null,
  });

  const handleChangeFilter = (field: IProductsFilter['field'], value: IProductsFilter['value']) => {
    setFilter({ field, value });
  };

  return {
    filter,
    handleChangeFilter,
  };
};
