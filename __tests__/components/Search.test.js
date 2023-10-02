import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Search from '@components/search';

describe('Search component', () => {
  it('renders the Search component correctly', () => {
    const {getByPlaceholderText} = render(
      <Search search="" onSearch={() => {}} />,
    );

    const searchInput = getByPlaceholderText('Search notes');
    expect(searchInput).toBeTruthy();
  });

  it('calls the onSearch function when text is entered', () => {
    const onSearchMock = jest.fn();
    const {getByPlaceholderText} = render(
      <Search search="" onSearch={onSearchMock} />,
    );
    const searchInput = getByPlaceholderText('Search notes');

    fireEvent.changeText(searchInput, 'Test Input');
    expect(onSearchMock).toHaveBeenCalledWith('Test Input');
  });
});
