import { ProductsFilter } from '@/components';
import type { IProductsFilter, QueryStatus } from '@/components/products-cards-section/model';
import { Button } from '@/shared/ui';
import type { FC } from 'react';

interface ProductsCardsHeadProps {
  queryStatus: QueryStatus;
  isNextPageAvailable: boolean;
  isPrevPageAvailable: boolean;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleChangeFilter: (field: IProductsFilter['field'], value: IProductsFilter['value']) => void;
}

export const ProductsCardsHead: FC<ProductsCardsHeadProps> = ({
  queryStatus,
  handleNextPage,
  isNextPageAvailable,
  isPrevPageAvailable,
  handlePrevPage,
  handleChangeFilter,
}) => {

  return (
    <div className="flex flex-col xl:flex-row items-start gap-y-5 xl:items-center md:justify-between">
      <ProductsFilter handleChangeFilter={handleChangeFilter} queryStatus={queryStatus} />
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-10">
        <Button
          variant="outline"
          disabled={!isPrevPageAvailable || queryStatus === 'loading'}
          onClick={handlePrevPage}
        >Предыдущая страница</Button>
        <Button
          variant="outline"
          disabled={!isNextPageAvailable || queryStatus === 'loading'}
          onClick={handleNextPage}
        >Следующая страница</Button>
      </div>
    </div>
  );
};
