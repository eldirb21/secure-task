import React from 'react';
import {render} from '@testing-library/react-native';
import Spinner from '@components/spinner';

describe('Spinner component', () => {
  it('renders the modal when visible is true', () => {
    const {getByTestId} = render(<Spinner visible={true} />);
    const modal = getByTestId('spinner-modal');

    expect(modal).toBeTruthy();
  });

  it('does not render the modal when visible is false', () => {
    const {queryByTestId} = render(<Spinner visible={false} />);
    const modal = queryByTestId('spinner-modal');

    expect(modal).toBeTruthy();
  });

  it('displays the message when provided', () => {
    const message = 'Please wait...';
    const {getByText} = render(<Spinner visible={true} message={message} />);
    const messageText = getByText(message);

    expect(messageText).toBeTruthy();
  });

  it('does not display the message when not provided', () => {
    const {queryByText} = render(<Spinner visible={true} />);
    const messageText = queryByText('Please wait...');

    expect(messageText).toBeTruthy();
  });
});
