import React from 'react';
import renderer from 'react-test-renderer';

import StatusBars from '@components/statusBars';

describe('StatusBars component', () => {
  it('renders StatusBars component correctly', () => {
    const backgroundColor = 'blue';
    const tree = renderer
      .create(
        <StatusBars backgroundColor={backgroundColor} translucent={true} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
