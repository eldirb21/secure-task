import React from 'react';
import {View, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import Texts from './texts';
import colors from '@styles/colors';

const Spinner = ({visible = false, message = 'Please wait...'}) => {
  return (
    <Modal
      testID="spinner-modal"
      animationType="none"
      visible={visible}
      transparent
      statusBarTranslucent>
      <View style={styles.container}>
        <View>
          <ActivityIndicator size={'large'} color={colors.white} />
          {message && <Texts style={styles.message}>{message}</Texts>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  message: {
    color: colors.white,
    fontSize: 12,
    marginTop: 12,
  },
});

export default Spinner;
