import React from 'react';
import { useSelect } from 'react-cosmos/fixture';
import Button, { ButtonSize, ButtonFlavour, ButtonProps, ButtonStyle } from '..';
import Icon from '../../Icon';

const ButtonDemo: React.FC<ButtonProps> = ({ children, ...props }: ButtonProps) => {
  const [size] = useSelect('size', {
    options: Object.keys(ButtonSize),
    defaultValue: ButtonSize.medium,
  });

  const [style] = useSelect('style', {
    options: Object.keys(ButtonStyle),
    defaultValue: ButtonStyle.primary,
  });

  const [disabled] = useSelect('disabled', {
    options: ['no', 'yes'],
    defaultValue: 'no',
  });

  const [iconPosition] = useSelect('iconPosition', {
    options: ['left', 'right'],
    defaultValue: 'left',
  });

  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridAutoColumns: 'max-content',
      }}
    >
      {Object.keys(ButtonFlavour).map((flavour: ButtonFlavour) => (
        <Button
          key={flavour}
          disabled={disabled === 'yes'}
          iconPosition={iconPosition}
          {...props}
          {...{
            [ButtonStyle[style]]: true,
            [ButtonFlavour[flavour]]: true,
            [ButtonSize[size]]: true,
          }}
        >
          {children}
        </Button>
      ))}
    </div>
  );
};

export default {
  'Text only': <ButtonDemo text="Button" aria-pressed={false} disabled={false} />,
  'With icon': <ButtonDemo icon="home" text="Home" aria-pressed={false} disabled={false} />,
  'Icon only': <ButtonDemo icon="home" aria-pressed={false} disabled={false} />,
  'Two icons': (
    <ButtonDemo icon="home" text="Home" aria-pressed={false} disabled={false}>
      <Icon icon="chevron-down" />
    </ButtonDemo>
  ),
};
