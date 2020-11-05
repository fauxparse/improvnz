import React, { HTMLAttributes } from 'react';

const ToolbarGroup: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <div className="toolbar__group" {...props} />
);

ToolbarGroup.displayName = 'Toolbar.Group';

export default ToolbarGroup;
