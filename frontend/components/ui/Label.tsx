import { forwardRef, LabelHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={clsx(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';

export { Label };