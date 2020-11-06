import React from 'react';
import { useSelect } from 'react-cosmos/fixture';
import './stylesheets/application.scss';

export default ({ children }) => {
  const [theme] = useSelect('theme', { options: ['light', 'dark'], defaultValue: 'light' });

  return (
    <div
      data-theme={theme}
      style={{
        minWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};
