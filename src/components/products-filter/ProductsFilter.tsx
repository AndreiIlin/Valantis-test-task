import type { IProductsFilter, QueryStatus } from '@/components/products-cards-section/model';
import { useProductsFilterForm } from '@/components/products-filter/model';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import type { FC } from 'react';

interface ProductsFilterProps {
  handleChangeFilter: (field: IProductsFilter['field'], value: IProductsFilter['value']) => void;
  queryStatus: QueryStatus;
}

export const ProductsFilter: FC<ProductsFilterProps> = ({ handleChangeFilter, queryStatus }) => {

  const { selectedFilter, onSubmit, form, handleReset } = useProductsFilterForm({ handleChangeFilter });

  return (
    <Form {...form}>
      <form className="flex flex-col md:flex-row  items-center gap-x-5 gap-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="currentFilter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-x-5">
              <FormLabel>Фильтр</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue="all">
                <FormControl className="!mt-0 w-36">
                  <SelectTrigger>
                    <SelectValue placeholder="Все" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="price">По цене</SelectItem>
                  <SelectItem value="brand">По бренду</SelectItem>
                  <SelectItem value="product">По названию</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {selectedFilter === 'brand' && (
          <FormField
            control={form.control}
            name="inputs.brand"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="w-60" required placeholder="Введите название бренда" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        {selectedFilter === 'product' && (
          <FormField
            control={form.control}
            name="inputs.product"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="w-60" required placeholder="Введите название продукта" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        {selectedFilter === 'price' && (
          <FormField
            control={form.control}
            name="inputs.price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="appearance-none w-60"
                    type="number"
                    required
                    placeholder="Введите цену"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <div className="flex flex-row items-center gap-x-5">
          <Button disabled={queryStatus === 'loading'} type="submit">Применить</Button>
          <Button
            disabled={queryStatus === 'loading'} variant="destructive" type="reset" onClick={handleReset}
          >Сбросить</Button>
        </div>
      </form>
    </Form>
  );
};
