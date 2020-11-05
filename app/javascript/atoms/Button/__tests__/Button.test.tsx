import React from 'react';
import { render } from '@testing-library/react';
import Button from '../';

describe('Button', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Button text="Hello" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('contains the correct text', () => {
    const { container } = render(<Button text="Hello" />);
    expect(container).toHaveTextContent('Hello');
  });

  it('has text', () => {
    const { container } = render(<Button text="Hello" />);
    expect(container.querySelector('.button__text')).toHaveTextContent('Hello');
  });

  it('has no icon', () => {
    const { container } = render(<Button text="Hello" />);
    expect(container.querySelector('.button__icon')).toBe(null);
  });

  describe('with an icon', () => {
    it('renders correctly', () => {
      const { asFragment } = render(<Button icon="home" />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders the icon', () => {
      const { container } = render(<Button icon="home" />);
      expect(container.querySelector('.button__icon').getAttribute('data-icon')).toBe('home');
    });

    it('does not render button text', () => {
      const { container } = render(<Button icon="home" />);
      expect(container.querySelector('.button__text')).toBe(null);
    });
  });

  describe('with additional children', () => {
    it('renders correctly', () => {
      const { asFragment } = render(<Button>Hello</Button>);
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders extra children', () => {
      const { container } = render(<Button>Hello</Button>);
      expect(container).toHaveTextContent('Hello');
    });
  });
});
