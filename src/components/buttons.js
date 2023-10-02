import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import Texts from './texts';
import colors from '@styles/colors';

const Buttons = ({
  title = 'Save',
  disabled = false,
  style,
  styleText,
  loading = false,
  ...props
}) => {
  let styledBtn = [styles.button, disabled && styles.disabledBtn, style];
  let styledText = [
    styles.textBtn,
    disabled && styles.textDisabledBtn,
    styleText,
  ];
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={styledBtn}
      {...props}>
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.white}
          testID="loading-indicator"
        />
      ) : (
        <Texts semiBold style={styledText}>
          {title}
        </Texts>
      )}
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonColor,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
  },
  disabledBtn: {
    backgroundColor: colors.disabled,
  },
  textBtn: {
    color: colors.buttonText,
  },
});
