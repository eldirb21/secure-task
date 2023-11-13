import React from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from '@styles/colors';

export default function Texts({
  type = 'Poppins',
  medium = false,
  bold = false,
  semiBold = false,
  regular = false,
  ...props
}) {
  const defStyle = [
    styles.textDefault,
    {
      fontFamily:
        type === 'OpenSans'
          ? (medium && 'OpenSans-Medium') ||
            (bold && 'OpenSans-Bold') ||
            (semiBold && 'OpenSans-SemiBold') ||
            'OpenSans-Regular'
          : (medium && 'Poppins-Medium') ||
            (bold && 'Poppins-Bold') ||
            (semiBold && 'Poppins-SemiBold') ||
            'Poppins-Regular',
    },
  ];
  const incStyle = Array.isArray(props.style) ? props.style : [props.style];

  return <Text {...props} style={[...defStyle, ...incStyle]} />;
}

const styles = StyleSheet.create({
  textDefault: {
    fontSize: 14,
    color: colors.black,
  },
});
