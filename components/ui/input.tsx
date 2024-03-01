import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className='relative flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background'>
        <Image
          src={'/email.svg'}
          width={20}
          height={20}
          className='mr-2 p-0.5'
          alt='email'
        />
        <input
          type={type}
          className={cn(
            'flex w-full file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
