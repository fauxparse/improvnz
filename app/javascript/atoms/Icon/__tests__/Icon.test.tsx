import React from 'react';
import { render } from '@testing-library/react';
import Icon from '../';

describe('Icon', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Icon icon="home" />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('with a small icon', () => {
    it('renders correctly', () => {
      const { asFragment } = render(<Icon icon="small/home" />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('has the correct size', () => {
      const { container } = render(<Icon icon="small/home" />);
      expect(container.querySelector('.icon')).toHaveAttribute('viewBox', '0 0 20 20');
    });
  });
});
