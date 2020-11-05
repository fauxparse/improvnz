import React from 'react';
import Button, { ButtonProps } from '../../atoms/Button';

const ToolbarButton: React.FC<ButtonProps> = (props) => <Button toolbar {...props} />;

ToolbarButton.displayName = 'Toolbar.Button';

export default ToolbarButton;
