import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TextInputs from '@components/textInput';

describe('TextInputs component', () => {
  it('renders the TextInputs component correctly', () => {
    const {getByPlaceholderText} = render(
      <TextInputs value="" placeholder="Enter text..." />,
    );

    const textInput = getByPlaceholderText('Enter text...');
    expect(textInput).toBeTruthy();
  });

  it('calls the onChangeText function when text is entered', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <TextInputs
        value=""
        onChangeText={onChangeTextMock}
        placeholder="Enter text..."
      />,
    );
    const textInput = getByPlaceholderText('Enter text...');
    fireEvent.changeText(textInput, 'Test Input');

    expect(onChangeTextMock).toHaveBeenCalledWith('Test Input');
  });

  it('renders an error icon and message when isError is true', () => {
    const {getByTestId, getByText} = render(
      <TextInputs value="" isError={true} error="This is an error" />,
    );

    const errorIcon = getByTestId('error-icon');
    const errorMessage = getByText('This is an error');

    expect(errorIcon).toBeTruthy();
    expect(errorMessage).toBeTruthy();
  });
});
