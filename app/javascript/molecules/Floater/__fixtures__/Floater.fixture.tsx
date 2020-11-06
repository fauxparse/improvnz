import React from 'react';
import { useSelect } from 'react-cosmos/fixture';
import Floater, { FloaterPosition } from '../';

const FloaterDemo = () => {
  const [position] = useSelect('position', {
    options: Object.keys(FloaterPosition),
    defaultValue: 'top',
  });

  return (
    <Floater position={FloaterPosition[position]} style={{ padding: '0.5rem 1rem' }}>
      We all float down here, Georgie!
    </Floater>
  );
};

export default <FloaterDemo />;
