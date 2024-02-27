import { Card, CardContent, CardFooter, CardHeader, CardTitle, Skeleton } from '@/shared/ui';
import type { FC } from 'react';

export const SkeletonCard: FC = () => {

  return (
    <Card className="grid grid-rows-[auto_1fr_auto]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-full rounded-xl" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <Skeleton className="h-8 w-full rounded-xl" />
        </p>
        <p className="mt-2">
          <Skeleton className="h-8 w-full rounded-xl" />
        </p>
      </CardContent>
      <CardFooter className="justify-self-end w-full">
        <Skeleton className="h-6 w-full rounded-xl" />
      </CardFooter>
    </Card>
  );
};
