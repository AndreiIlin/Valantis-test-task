import type { IProductsFilter, QueryStatus } from '@/components/products-cards-section/model';
import type { GetIdsResponse, GetProductResponse } from '@/shared/api';
import { api } from '@/shared/api';
import { MAX_CARDS_ON_SCREEN, QUERY_IDS_LIMIT } from '@/shared/constants';
import type { Product } from '@/shared/types';
import { useEffect, useState } from 'react';

export const useGetProducts = ({ filter }: { filter: IProductsFilter }) => {
  const [queryStatus, setQueryStatus] = useState<QueryStatus>('loading');
  const [offset, setOffset] = useState(0);
  const [ids, setIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setOffset(0);
  }, [filter.field, filter.value]);

  useEffect(() => {
    setQueryStatus('loading');
    api.post<GetIdsResponse>('', filter.field === 'all' ? {
      action: 'get_ids',
      params: {
        offset,
        limit: QUERY_IDS_LIMIT,
      },
    } : {
      action: 'filter',
      params: {
        [filter.field]: filter.field === 'price' ? Number(filter.value) : filter.value,
      },
    })
      .then(response => {
        const filteredIds = response.data.result.reduce((acc: string[], id: string) => {
          if (!acc.includes(id)) {
            acc.push(id);
          }

          return acc;
        }, []);

        setIds(filteredIds);

        api.post<GetProductResponse>('', {
          action: 'get_items',
          params: {
            ids: filter.field === 'all' ?
              filteredIds.slice(0, MAX_CARDS_ON_SCREEN) : filteredIds.slice(offset, MAX_CARDS_ON_SCREEN + offset),
          },
        })
          .then(response => {
            const filteredProducts = response.data.result.reduce((acc: Product[], product: Product) => {
              if (!acc.find(filteredProduct => filteredProduct.id === product.id)) {
                acc.push(product);
              }

              return acc;
            }, []);

            setProducts(filteredProducts);
            setQueryStatus('success');
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(() => {
        setQueryStatus('error');
      });
  }, [offset, filter.field, filter.value]);

  const handleNextPage = () => {
    setOffset(prev => prev + MAX_CARDS_ON_SCREEN);
  };

  const handlePrevPage = () => {
    setOffset(prev => prev - MAX_CARDS_ON_SCREEN);
  };

  return {
    queryStatus,
    products,
    isNextPageAvailable: filter.field === 'all' ? ids.length > MAX_CARDS_ON_SCREEN : ids.length - offset > MAX_CARDS_ON_SCREEN,
    isPrevPageAvailable: offset > 0,
    handleNextPage,
    handlePrevPage,
  };
};
