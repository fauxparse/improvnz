import React, { ButtonHTMLAttributes } from 'react';
import './index.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<Props> = ({ type = 'button', children }) => (
  <button className="button" type={type}>
    {children}
  </button>
);

Button.displayName = 'Button';

export default Button;
