import {View, StyleSheet} from 'react-native';
import React from 'react';
import colors from '@styles/colors';
import Texts from './texts';

export default function EmptyList({message = 'No task found'}) {
  return (
    <View style={styles.container}>
      <Texts semiBold style={styles.message}>
        {message}
      </Texts>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  message: {
    color: colors.bordered,
  },
});
