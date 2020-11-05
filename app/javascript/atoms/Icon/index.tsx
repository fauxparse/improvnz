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
  bold: {
    style: 'outline',
    path: 'M6 4h8a4 4 0 0 1 0 8h-8h9a4 4 0 0 1 0 8h-9z',
  },
  'chevron-down': {
    style: 'outline',
    path: 'M19 9l-7 7-7-7',
  },
  code: {
    style: 'outline',
    path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  home: {
    style: 'outline',
    path:
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  image: {
    style: 'outline',
    path:
      'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  italic: {
    style: 'outline',
    path: 'M10 4h9M15 4l-6 16M5 20h9',
  },
  'justify-center': {
    style: 'outline',
    path: 'M4 6h16M8 12h8M5 18h14',
  },
  'justify-left': {
    style: 'outline',
    path: 'M4 6h16M4 12h8M4 18h16',
  },
  'justify-right': {
    style: 'outline',
    path: 'M20 6h-16M20 12h-8M 20 18h-14',
  },
  link: {
    style: 'outline',
    path:
      'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  },
  more: {
    style: 'outline',
    path:
      'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z',
  },
  'more-vertical': {
    style: 'outline',
    path:
      'M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z',
  },
  underline: {
    style: 'outline',
    path: 'M18 3v7a6 6 0 0 1-12 0v-7M4 21h16',
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
      data-icon={icon}
      {...props}
    >
      {definition && <path d={definition.path} />}
      {children}
    </svg>
  );
};

Icon.displayName = 'Icon';

export default Icon;
