import {View, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '@styles/colors';

export default function Modals({visible, onClose, children}) {
  return (
    <Modal
      testID="key-modal"
      animationType="slide"
      transparent
      statusBarTranslucent
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity onPress={onClose} style={styles.container} />
      <View style={styles.content}>
        <View style={styles.body}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: colors.overlay,
  },
  content: {
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    borderRadius: 0,
    position: 'absolute',
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
});
