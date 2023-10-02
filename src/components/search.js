import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Icons from './icons';
import colors from '@styles/colors';

export default function Search({search, onSearch}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconSearch}>
        <Icons name="search" size={20} color={colors.bordered} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search notes"
        placeholderTextColor={colors.bordered}
        value={search}
        onChangeText={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.bordered,
    borderRadius: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 45,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: colors.black,
    height: '100%',
  },
  iconSearch: {
    maxHeight: '100%',
    paddingTop: 2,
  },
});
