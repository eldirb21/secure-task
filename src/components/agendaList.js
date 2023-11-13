/* eslint-disable react-hooks/exhaustive-deps */
import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import func from '../utils/func';

export default function AgendaLists({data, loading, renderItem, renderEmpty}) {
  const [items, setitems] = useState({});
  //   console.log(`\n\n`, data, 'data ========');
  useEffect(() => {
    let newData = [...data];
    // console.log(`\n\n`, newData, 'newData=========');
    if (newData && !loading) {
      const transformedObject = newData.reduce((result, item) => {
        const date = new Date(item.date).toISOString().split('T')[0];
        const key = moment(date).format('yyyy-MM-DD');
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(item);
        return result;
      }, {});
      console.log('presss me 2');
      setitems(transformedObject);
    }
  }, [data, loading]);

  const loadItems = day => {
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = func.timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          console.log(numItems);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      //   console.log(items);
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setitems(newItems);
    }, 1000);
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  //   console.log(`\n\n`, items, 'items=================');
  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={moment().format('yyyy-MM-DD')}
        renderItem={renderItem}
        renderEmptyDate={renderEmpty}
        rowHasChanged={rowHasChanged}
        onDayPress={day => {}}
        hideKnob={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    padding: 5,
    borderRadius: 100,
  },
  card: {
    marginTop: 20,
  },
  item: {
    flex: 1,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  title: {
    textTransform: 'capitalize',
  },
  subTitle: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
});
