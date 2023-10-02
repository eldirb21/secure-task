import React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icons from './icons';
import colors from '@styles/colors';

const Floating = ({onPress, ...props}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="floating-button"
        activeOpacity={0.8}
        style={styles.floating}
        onPress={onPress}
        {...props}>
        <Icons type="Feather" name="plus" size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    backgroundColor: 'transparent',
    borderRadius: 100,
    padding: 1,
  },
  floating: {
    backgroundColor: colors.floating,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.floating,
    padding: Platform.OS === 'ios' ? 10 : 11,

    shadowColor: colors.black,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Floating;
