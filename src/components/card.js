/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../styles/colors';

export default function Card({children, border, style}) {
  return (
    <View
      testID="default-card"
      style={[
        style,
        styles.card,
        styles.shadow,
        {
          borderColor: border ? border : colors.bordered,
          shadowColor: border ? border : 'green',
        },
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 10,
    borderWidth: 0.4,
    marginRight: 2,
    padding: 15,
    marginVertical: 3,
    borderLeftWidth: 5,
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.26,
    shadowRadius: 2,

    // elevation: 2,
  },
});
