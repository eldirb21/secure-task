import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Appbar from '@components/appBar';

jest.mock('@components/icons', () => {
  return {
    __esModule: true,
    default: ({name, size, color, type}) => {
      return (
        <mock-Icon
          name={name}
          size={size}
          color={color}
          testID="mock-icon-appbar"
          type={type}
        />
      );
    },
  };
});

describe('Appbar component', () => {
  it('renders  title without home', () => {
    const {getByText, getByTestId} = render(<Appbar isHome={false} />);
    expect(getByText('Task')).toBeTruthy();
    const mockIcon = getByTestId('mock-icon-appbar');
    expect(mockIcon.props.name).toBe('menu');
    expect(mockIcon.props.size).toBe(20);
  });
  it('renders  title with home', () => {
    const {getByText} = render(<Appbar isHome={true} />);
    const myNotesText = getByText('My Notes');

    expect(myNotesText).toBeTruthy();
  });

  describe('Appbar Button  BACK', () => {
    it('handles the back button click', () => {
      const mockNavigation = {
        goBack: jest.fn(),
      };

      const {getByTestId} = render(
        <Appbar backable navigation={mockNavigation} />,
      );
      const backButton = getByTestId('back-button');

      fireEvent.press(backButton);

      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });
  describe('Appbar Button Right', () => {
    it('calls onRight callback', () => {
      const onRightMock = jest.fn();

      const {getByTestId} = render(<Appbar onRight={onRightMock} />);
      const rightButton = getByTestId('right-button');

      fireEvent.press(rightButton);

      expect(onRightMock).toHaveBeenCalled();
    });

    it('does not call onRight callback', () => {
      const onRightMock = jest.fn();

      const {queryByTestId} = render(<Appbar />);
      const rightButton = queryByTestId('right-button');

      expect(rightButton).toBeNull();
      expect(onRightMock).not.toHaveBeenCalled();
    });
  });
});
