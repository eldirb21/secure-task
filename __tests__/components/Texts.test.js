import React from 'react';
import {render} from '@testing-library/react-native';
import Texts from '@components/texts';
import colors from '@styles/colors';

describe('Texts component', () => {
  it('renders the Texts component with default styles', () => {
    const {getByText} = render(<Texts>Hello, World!</Texts>);

    const text = getByText('Hello, World!');
    expect(text).toBeTruthy();
    expect(text).toHaveStyle({
      fontSize: 14,
      color: colors.black,
      fontFamily: 'Montserrat',
    });
  });

  it('renders the Texts component with medium style', () => {
    const {getByText} = render(<Texts medium>Hello, World!</Texts>);

    const text = getByText('Hello, World!');
    expect(text).toBeTruthy();
    expect(text).toHaveStyle({fontWeight: '800'});
  });

  it('renders the Texts component with bold style', () => {
    const {getByText} = render(<Texts bold>Hello, World!</Texts>);

    const text = getByText('Hello, World!');
    expect(text).toBeTruthy();
    expect(text).toHaveStyle({fontWeight: 'bold'});
  });
  it('renders the Texts component with semiBold style', () => {
    const {getByText} = render(<Texts semiBold>Hello, World!</Texts>);

    const text = getByText('Hello, World!');
    expect(text).toBeTruthy();
    expect(text).toHaveStyle({fontWeight: '500'});
  });
  it('renders the Texts component with regular style', () => {
    const {getByText} = render(<Texts regular>Hello, World!</Texts>);

    const text = getByText('Hello, World!');
    expect(text).toBeTruthy();
    expect(text).toHaveStyle({fontWeight: '400'});
  });
});
