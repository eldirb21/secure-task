import React from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from '@styles/colors';

export default function Texts({
  medium = false,
  bold = false,
  semiBold = false,
  regular = false,
  ...props
}) {
  const defStyle = [
    styles.textDefault,
    medium && styles.textMedium,
    bold && styles.textBold,
    semiBold && styles.textSemiBold,
    regular && styles.textRegular,
  ];
  const incStyle = Array.isArray(props.style) ? props.style : [props.style];

  return <Text {...props} style={[...defStyle, ...incStyle]} />;
}

const styles = StyleSheet.create({
  textDefault: {
    fontSize: 14,
    color: colors.black,
    fontFamily: 'Montserrat',
  },
  textMedium: {
    fontWeight: '800',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textRegular: {
    fontWeight: '400',
  },
  textSemiBold: {
    fontWeight: '500',
  },
});
