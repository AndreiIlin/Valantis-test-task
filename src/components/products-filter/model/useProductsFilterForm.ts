import type { IProductsFilter } from '@/components/products-cards-section/model';
import type { FormValues } from '@/components/products-filter/model';
import { useForm } from 'react-hook-form';

export const useProductsFilterForm = ({ handleChangeFilter }:
  { handleChangeFilter: (field: IProductsFilter['field'], value: IProductsFilter['value']) => void }) => {

  const form = useForm<FormValues>({
    defaultValues: {
      currentFilter: 'all',
      inputs: {
        brand: '',
        price: 0,
        product: '',
      },
    },
  });

  const selectedFilter = form.watch('currentFilter');

  const onSubmit = (data: FormValues) => {
    if (data.currentFilter === 'all') {
      handleChangeFilter('all', null);
    } else {
      handleChangeFilter(data.currentFilter, data.inputs[data.currentFilter]);
    }
  };

  const handleReset = () => {
    handleChangeFilter('all', null);
    form.reset();
  };

  return {
    form,
    selectedFilter,
    onSubmit,
    handleReset,
  };
};
