import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Card from './card';
import func from '../utils/func';
import Texts from './texts';
import colors from '@styles/colors';

export default function TaskItemCard({
  onPress,
  onLongPress,
  title = '',
  subTitle = '',
  date = '',
}) {
  return (
    <Card border={func.randomColor()}>
      <TouchableOpacity
        testID="task-item-card"
        onLongPress={onLongPress}
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.cardContent}>
        <View style={styles.body}>
          <Texts bold>{title}</Texts>
          <Texts>{subTitle}</Texts>
        </View>
        <View>
          <Texts style={styles.date}>{func.validateDate(date, true)}</Texts>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 1,
  },
  date: {
    color: colors.bordered,
    textAlign: 'right',
  },
});
