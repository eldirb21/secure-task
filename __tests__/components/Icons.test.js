import React from 'react';
import {render} from '@testing-library/react-native';
import Icons from '@components/icons';

describe('Icons component', () => {
  it('renders Icons Arrays', () => {
    const iconTypes = [
      'AntDesign',
      'Feather',
      'Entypo',
      'FontAwesome',
      'FontAwesome5Brands',
      'FontAwesome5',
      'fontawesome5pro',
      'Fontisto',
      'Foundation',
      'Octicons',
      'MaterialCommunityIcons',
      'Ionicons',
      'SimpleLineIcons',
      '',
    ];

    const renderedIcons = iconTypes.map((type, i) => (
      <Icons key={i} type={type} name="home" testID={`icon-${type}`} />
    ));

    const {getByTestId} = render(renderedIcons);
    iconTypes.forEach(type => {
      const icon = getByTestId(`icon-${type}`);
      expect(icon).toBeTruthy();
    });
  });
});
