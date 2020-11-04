import React from 'react';
import Icon, { NamedIcon, ICONS } from '../';
import './fixtures.scss';

const IconCell: React.FC<{ icon: NamedIcon }> = ({ icon }) => (
  <div className="icon-cell" onClick={() => navigator.clipboard.writeText(String(icon))}>
    <Icon icon={icon} />
    <span className="icon-cell__name">{icon}</span>
  </div>
);

const IconDemo: React.FC = () => {
  return (
    <div className="icon-cells">
      {Object.keys(ICONS).map((icon: NamedIcon) => (
        <IconCell key={icon} icon={icon} />
      ))}
    </div>
  );
};

export default {
  all: <IconDemo />,
};
