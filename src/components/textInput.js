import React from 'react';
import {View, StyleSheet, TextInput, Text, Platform} from 'react-native';
import colors from '@styles/colors';
import Icons from './icons';

const TextInputs = ({
  isError = false,
  error = null,
  containerStyle,
  istextarea = false,
  value,
  ...props
}) => {
  let styled = {
    borderColor: isError ? colors.danger : colors.background,
    ...styles.content,
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styled}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={colors.bordered}
          {...props}
          value={typeof value !== 'string' ? value && value.toString() : value}
        />

        {isError && (
          <View style={[istextarea ? styles.textarea : styles.errorIcon]}>
            <Icons
              name="info-outline"
              size={20}
              color={colors.danger}
              testID="error-icon"
            />
          </View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error || null}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 11,
    backgroundColor: colors.white,
  },
  content: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.bordered,
    minHeight: 50,

    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 15,
    padding: Platform.OS === 'ios' ? 15 : 10,
  },
  errorIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textarea: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
  },
});

export default TextInputs;
