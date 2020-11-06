import React, { forwardRef, ForwardRefExoticComponent, HTMLAttributes } from 'react';
import classNames from 'clsx';
import ToolbarButton from './ToolbarButton';
import ToolbarSeparator from './ToolbarSeparator';
import ToolbarGroup from './ToolbarGroup';
import './index.scss';

interface ToolbarProps {
  className?: string;
}

interface ToolbarComponent
  extends ForwardRefExoticComponent<ToolbarProps & HTMLAttributes<HTMLDivElement>> {
  Button?: typeof ToolbarButton;
  Separator?: typeof ToolbarSeparator;
  Group?: typeof ToolbarGroup;
}

const Toolbar: ToolbarComponent = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={classNames('toolbar', className)} role="toolbar" {...props}>
        {children}
      </div>
    );
  }
);

Toolbar.displayName = 'Toolbar';

Toolbar.displayName = 'Toolbar';
Toolbar.Button = ToolbarButton;
Toolbar.Separator = ToolbarSeparator;
Toolbar.Group = ToolbarGroup;

export default Toolbar;
