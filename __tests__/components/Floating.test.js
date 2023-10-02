import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Floating from '@components/floating';
import colors from '@styles/colors';

jest.mock('@components/icons', () => {
  return {
    __esModule: true,
    default: ({name, size, color, type}) => {
      return (
        <mock-Icon
          name={name}
          size={size}
          color={color}
          testID="mock-icon"
          type={type}
        />
      );
    },
  };
});

describe('Floating Component', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<Floating />);
    const floatingButton = getByTestId('floating-button');

    expect(floatingButton).toBeTruthy();
    expect(floatingButton).toHaveStyle({
      backgroundColor: colors.floating,
      borderColor: colors.floating,
      shadowColor: colors.black,
    });
  });
  it('calls onPress function when clicked', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(<Floating onPress={onPressMock} />);
    const floatingButton = getByTestId('floating-button');

    fireEvent.press(floatingButton);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
  it('renders the Icons component with the correct props', () => {
    const {getByTestId} = render(<Floating />);
    const iconsComponent = getByTestId('mock-icon');

    expect(iconsComponent.props.type).toBe('Feather');
    expect(iconsComponent.props.name).toBe('plus');
    expect(iconsComponent.props.size).toBe(30);
    expect(iconsComponent.props.color).toBe(colors.white);
  });
});
