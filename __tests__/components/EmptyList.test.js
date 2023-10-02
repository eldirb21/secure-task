import React from 'react';
import {render} from '@testing-library/react-native';
import EmptyList from '@components/emptyList';
import colors from '@styles/colors';

describe('EmptyList Component', () => {
  test('renders with default props', () => {
    const {getByText} = render(<EmptyList />);
    const empties = getByText('No task found');

    expect(empties).toBeTruthy();
    expect(empties).toHaveStyle({
      color: colors.bordered,
    });
  });
});
