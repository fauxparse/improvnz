import React, { SVGProps } from 'react';
import classNames from 'clsx';
import './index.scss';

const DEFAULT_ICON_SIZE = 24;
const SMALL_ICON_SIZE = 24;

type IconDefinition = {
  style: 'outline' | 'filled';
  path: string;
  size?: number;
};

export const ICONS: { [key: string]: IconDefinition } = {
  'chevron-down': {
    style: 'outline',
    path: 'M19 9l-7 7-7-7',
  },
  home: {
    style: 'outline',
    path:
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  'small/home': {
    style: 'filled',
    path:
      'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
  },
} as const;

export type NamedIcon = keyof typeof ICONS;

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: NamedIcon;
  size?: number;
}

const defaultIconSize = (icon: NamedIcon) =>
  String(icon).match(/^small\//) ? SMALL_ICON_SIZE : DEFAULT_ICON_SIZE;

const Icon: React.FC<IconProps> = ({ className, icon, size: givenSize, children, ...props }) => {
  const definition = icon && ICONS[icon];
  const size = givenSize || definition.size || defaultIconSize(icon);

  return (
    <svg
      className={classNames('icon', definition && `icon--${definition.style}`, className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...props}
    >
      {definition && <path d={definition.path} />}
      {children}
    </svg>
  );
};

export default Icon;
