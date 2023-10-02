import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TaskItemCard from '@components/task-item-card';
import colors from '@styles/colors';
jest.mock('@utils/func', () => ({
  randomColor: jest.fn(() => '#ff0000'),
  validateDate: jest.fn(() => '2023-10-02'),
}));

describe('TaskItemCard', () => {
  it('passes the correct border color to Card', () => {
    const {getByTestId} = render(
      <TaskItemCard title="Test Title" onPress={() => {}} />,
    );

    const cardElement = getByTestId('task-item-card');
    const cardBorderProp = cardElement.props.border;

    expect(cardBorderProp).toBeUndefined();
  });
  it('renders the date with the correct style', () => {
    const {getByText} = render(
      <TaskItemCard title="Test Title" onPress={() => {}} date="2021-01-15" />,
    );

    const dateTextElement = getByText('2023-10-02');

    expect(dateTextElement).toHaveStyle({
      color: colors.bordered,
      textAlign: 'right',
    });
  });

  it('renders correctly with provided props', () => {
    const {getByText} = render(
      <TaskItemCard
        title="Test Title"
        subTitle="Test Subtitle"
        date="2023-10-02"
      />,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Subtitle')).toBeTruthy();
    expect(getByText('2023-10-02')).toBeTruthy();
  });

  it('calls the onPress function when card is pressed', () => {
    const onPressMock = jest.fn();

    const {getByTestId} = render(
      <TaskItemCard title="Test Title" onPress={onPressMock} />,
    );
    fireEvent.press(getByTestId('task-item-card'));

    expect(onPressMock).toHaveBeenCalled();
  });

  it('calls the onLongPress function when card is long-pressed', () => {
    const onLongPressMock = jest.fn();

    const {getByTestId} = render(
      <TaskItemCard title="Test Title" onLongPress={onLongPressMock} />,
    );
    fireEvent(getByTestId('task-item-card'), 'longPress');

    expect(onLongPressMock).toHaveBeenCalled();
  });
});
