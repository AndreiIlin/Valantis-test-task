import { Product } from '@/shared/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui';
import type { FC } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {

  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency', currency: 'RUB',
  }).format(product.price);

  return (
    <Card className="grid grid-rows-[auto_1fr_auto]">
      <CardHeader>
        <CardTitle>{product.brand}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-semibold">Цена: </span>
          {formattedPrice}
        </p>
        <p className="mt-2">
          <span className="font-semibold">Наименование: </span>
          {product.product}
        </p>
      </CardContent>
      <CardFooter className="justify-self-end items-end">
        <p className="text-sm text-muted-foreground">id: {product.id}</p>
      </CardFooter>
    </Card>
  );
};
