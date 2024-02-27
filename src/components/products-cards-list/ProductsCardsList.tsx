import { ProductCard, SkeletonCard } from '@/components';
import type { QueryStatus } from '@/components/products-cards-section/model';
import { MAX_CARDS_ON_SCREEN } from '@/shared/constants';
import type { Product } from '@/shared/types';
import type { FC } from 'react';

interface ProductsCardsListProps {
  products: Product[];
  queryStatus: QueryStatus;
}

export const ProductsCardsList: FC<ProductsCardsListProps> = ({ products, queryStatus }) => {

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 p-5 bg-transparent rounded-lg border border-black"
    >
      {queryStatus === 'loading' && Array.from({ length: MAX_CARDS_ON_SCREEN }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
      {queryStatus === 'success' && (products.length ? products.map(product => (
        <ProductCard key={product.id} product={product} />
      )) : (
        <p>Список пуст</p>
      ))}
      {queryStatus === 'error' && (
        <p>Произошла ошибка! Перезагрузите страницу или попробуйте позже</p>
      )}
    </div>
  );
};
