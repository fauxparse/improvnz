import React from 'react';
import classNames from 'clsx';
import ToolbarButton from './ToolbarButton';
import ToolbarSeparator from './ToolbarSeparator';
import ToolbarGroup from './ToolbarGroup';
import './index.scss';

interface ToolbarProps {
  className?: string;
}

interface ToolbarComponent extends React.FC<ToolbarProps> {
  Button?: typeof ToolbarButton;
  Separator?: typeof ToolbarSeparator;
  Group?: typeof ToolbarGroup;
}

const Toolbar: ToolbarComponent = ({ className, children, ...props }) => {
  return (
    <div className={classNames('toolbar', className)} role="toolbar" {...props}>
      {children}
    </div>
  );
};

Toolbar.displayName = 'Toolbar';
Toolbar.Button = ToolbarButton;
Toolbar.Separator = ToolbarSeparator;
Toolbar.Group = ToolbarGroup;

export default Toolbar;
