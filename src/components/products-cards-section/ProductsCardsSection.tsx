import { ProductsCardsHead, ProductsCardsList } from '@/components';
import { useGetProducts, useProductsFilter } from '@/components/products-cards-section/model';
import type { FC } from 'react';

export const ProductsCardsSection: FC = () => {

  const { filter, handleChangeFilter } = useProductsFilter();

  const {
    products,
    queryStatus,
    isNextPageAvailable,
    isPrevPageAvailable,
    handlePrevPage,
    handleNextPage,
  } = useGetProducts({ filter });

  return (
    <div className="flex flex-col gap-y-10">
      <ProductsCardsHead
        queryStatus={queryStatus}
        handleNextPage={handleNextPage}
        isNextPageAvailable={isNextPageAvailable}
        isPrevPageAvailable={isPrevPageAvailable}
        handlePrevPage={handlePrevPage}
        handleChangeFilter={handleChangeFilter}
      />
      <ProductsCardsList products={products} queryStatus={queryStatus} />
    </div>
  );
};
