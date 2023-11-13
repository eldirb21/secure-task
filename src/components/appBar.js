import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons from './icons';
import Texts from './texts';
import Search from './search';
import StatusBars from './statusBars';
import colors from '@styles/colors';

export default function Appbar({
  title = 'Task',
  backable,
  navigation,
  container,
  onClose,
  icon = 'arrow-back-ios',
  isHome = false,
  search,
  onSearch,
  onRight,
}) {
  const onBack = () => {
    if (backable) {
      if (onClose) {
        onClose();
      } else {
        navigation.goBack();
      }
    }
  };

  return isHome ? (
    <>
      <StatusBars />
      <View style={styles.homeContainer}>
        <Texts bold style={styles.textTitle}>
          My Notes
        </Texts>
        <Icons type="Ionicons" color="#000" name="person-circle" size={50} />
      </View>
      <View style={styles.searchContent}>
        <Search search={search} onSearch={onSearch} />
      </View>
    </>
  ) : (
    <>
      <StatusBars />
      <View style={[styles.container, container]}>
        <View style={styles.items}>
          <TouchableOpacity onPress={onBack} testID="back-button">
            <Icons size={20} color="#000" name={backable ? icon : 'menu'} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemCenter}>
          <Texts semiBold style={styles.title}>
            {title}
          </Texts>
        </View>
        {onRight ? (
          <TouchableOpacity onPress={onRight} testID="right-button">
            <Icons name="delete" size={20} color={colors.danger} />
          </TouchableOpacity>
        ) : (
          <View style={styles.items} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: colors.backgroundCard,
    borderColor: colors.bordered,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    opacity: 1,
  },
  homeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchContent: {
    marginBottom: 20,
    // backgroundColor:'red'
  },
  items: {
    width: '7%',
  },
  itemCenter: {
    flex: 1,
  },
  title: {
    textTransform: 'capitalize',
  },
  textTitle: {
    fontSize: 25,
  },
});
