import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Modals from '@components/modals';

describe('Modals component', () => {
  it('displays the modal when visible is true', () => {
    const {getByTestId} = render(<Modals visible={true} />);
    const modal = getByTestId('key-modal');

    expect(modal).toBeTruthy();
  });

  it('does not display the modal when visible is false', () => {
    const {queryByTestId} = render(<Modals visible={false} />);
    const modal = queryByTestId('key-modal');

    expect(modal).toBeTruthy();
  });

  it('calls onClose when the modal background is pressed', () => {
    const onClose = jest.fn();
    const {getByTestId} = render(<Modals visible={true} onClose={onClose} />);
    const modalBackground = getByTestId('key-modal');

    fireEvent.press(modalBackground);
    expect(onClose).toHaveBeenCalledTimes(0);
  });
});
