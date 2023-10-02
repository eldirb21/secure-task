import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Buttons from '@components/buttons';

describe('Buttons component', () => {
  it('renders correctly with default props', () => {
    const {getByText} = render(<Buttons />);
    const saveButton = getByText('Save');

    expect(saveButton).toBeTruthy();
    expect(saveButton).not.toBeDisabled();
  });

  it('renders with loading indicator true', () => {
    const {getByTestId} = render(<Buttons loading={true} />);
    const loadingIndicator = getByTestId('loading-indicator');

    expect(loadingIndicator).toBeTruthy();
  });

  it('disables the button when disabled prop is true', () => {
    const {getByText} = render(<Buttons disabled={true} />);
    const saveButton = getByText('Save');

    expect(saveButton).toBeDisabled();
  });

  it('calls onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const {getByText} = render(
      <Buttons title="Click Task" onPress={onClickMock} />,
    );
    const clickButton = getByText('Click Task');

    fireEvent.press(clickButton);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
