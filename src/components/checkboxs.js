/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

export default function Checkboxs({
  onCheck,
  checked = false,
  size = 20,
  color = 'grey',
  activeColor = 'green',
}) {
  return (
    <TouchableOpacity
      onPress={onCheck}
      style={{
        ...styles.circle,
        width: size,
        height: size,
        borderColor: checked ? activeColor : color,
      }}>
      <View
        style={{
          ...styles.dot,
          width: size - 8,
          height: size - 8,
          backgroundColor: checked ? activeColor : '#FFF',
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#FFF',
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 100,
  },
});
