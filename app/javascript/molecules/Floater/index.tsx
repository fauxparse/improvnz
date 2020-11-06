import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'clsx';
import './index.scss';

export enum FloaterPosition {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

interface FloaterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  position: FloaterPosition;
}

const Floater = forwardRef<HTMLDivElement, FloaterProps>(
  ({ className, position = 'top', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('floater', `floater--${FloaterPosition[position]}`, className)}
        {...props}
      >
        <span className={classNames('floater__arrow', `floater__arrow--${position}`)} />
        {children}
      </div>
    );
  }
);

Floater.displayName = 'Floater';

export default Floater;
