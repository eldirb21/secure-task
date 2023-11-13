import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Card from './card';
import func from '../utils/func';
import Texts from './texts';
import colors from '@styles/colors';
import Checkboxs from './checkboxs';

export default function TaskItemCard({
  onPress,
  onLongPress,
  title = '',
  subTitle = '',
  date = '',
  onCheck,
  checked = false,
}) {
  let checkedStyle = checked ? styles.subTitle : {};
  let colorRandom = func.randomColor();
  return (
    <Card border={colorRandom}>
      <TouchableOpacity
        testID="task-item-card"
        // onLongPress={onLongPress}
        activeOpacity={0.9}
        // onPress={onPress}
        style={styles.cardContent}>
        <Checkboxs checked={checked} onCheck={onCheck} color={colorRandom} />
        <View style={styles.body}>
          <Texts bold style={[styles.title, checkedStyle]}>
            {title}
          </Texts>
          <Texts style={[checkedStyle]}>{subTitle}</Texts>
          <View>
            <Texts style={styles.date}>{func.validateDate(date, false)}</Texts>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  body: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    textTransform: 'capitalize',
  },
  subTitle: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  date: {
    color: colors.bordered,
    textAlign: 'right',
  },
});
