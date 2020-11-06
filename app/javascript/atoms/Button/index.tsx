import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'clsx';
import omit from 'lodash/omit';
import flatMap from 'lodash/flatMap';
import Icon, { NamedIcon } from '../Icon';
import './index.scss';

type OptionalProps<T extends string> = { [key in T]?: boolean };

export enum ButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum ButtonFlavour {
  default = 'default',
  special = 'special',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  toolbar = 'toolbar',
}

export enum ButtonStyle {
  primary = 'primary',
  secondary = 'secondary',
  outline = 'outline',
  clear = 'clear',
}

type ButtonIconPosition = 'left' | 'right';

interface ButtonVariants
  extends OptionalProps<ButtonSize>,
    OptionalProps<ButtonFlavour>,
    OptionalProps<ButtonStyle> {}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  className?: string;
  text?: string;
  icon?: NamedIcon;
  iconPosition?: ButtonIconPosition;
}

const extract = <T extends ButtonVariants>(kind, props: T, defaultValue) =>
  Object.keys(kind).find((prop) => props[kind[prop]]) || defaultValue;

const otherPropNames: [keyof ButtonVariants][] = flatMap(
  [ButtonSize, ButtonFlavour, ButtonSize],
  Object.values
);

const otherProps = <T extends ButtonVariants>(props: T) => omit(props, otherPropNames);

const Button: React.FC<ButtonProps> = ({
  className,
  type = 'button',
  icon,
  iconPosition = 'left',
  text,
  children,
  ...props
}) => (
  <button
    className={classNames(
      'button',
      `button--${extract(ButtonSize, props, ButtonSize.medium)}`,
      `button--${extract(ButtonFlavour, props, ButtonFlavour.default)}`,
      `button--${extract(ButtonStyle, props, ButtonStyle.secondary)}`,
      icon && `button--icon-${iconPosition}`,
      className
    )}
    type={type}
    {...otherProps(props)}
  >
    {icon && <Icon className="button__icon" icon={icon} />}
    {text && <span className="button__text">{text}</span>}
    {children}
  </button>
);

Button.displayName = 'Button';

export default Button;
