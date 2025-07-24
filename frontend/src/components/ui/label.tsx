'use client';

import * as LabelPrimitive from '@headlessui/react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Label = forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<'label'>>(
  ({ className, ...props }, ref) => (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Label.displayName = 'Label';

export { Label };
