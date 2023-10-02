import React from 'react';
import {render} from '@testing-library/react-native';
import Card from '@components/card';
import colors from '@styles/colors';
describe('Card component', () => {
  it('renders correctly with default props', () => {
    const {getByTestId} = render(<Card />);
    const card = getByTestId('default-card');

    expect(card).toBeTruthy();
    expect(card).toHaveStyle({
      backgroundColor: colors.backgroundCard,
      borderColor: colors.bordered,
      shadowColor: 'green',
    });
  });

  it('renders with custom border color', () => {
    const {getByTestId} = render(<Card border={colors.danger} />);
    const card = getByTestId('default-card');

    expect(card).toBeTruthy();
    expect(card).toHaveStyle({
      borderColor: colors.danger,
      shadowColor: colors.danger,
    });
  });
});
