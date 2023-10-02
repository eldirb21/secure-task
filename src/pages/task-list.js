/* eslint-disable curly */
import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Floating, Spinner, EmptyList, TaskItemCard} from '@components';
import func from '@utils/func';
import {getTask} from '@services/task.controller';
export default function TaskList(props) {
  const [defaulttask, setdefaulttask] = useState([]);
  const [search, setSearch] = useState(null);
  const [tasks, settasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = () => {
    setisLoading(true);
    getTask()
      .then(res => {
        setisLoading(false);
        settasks(res);
        setdefaulttask(res);
      })
      .catch(() => setisLoading(false));
  };

  const handlerSearch = text => {
    setSearch(text);

    let newTask = [...defaulttask];

    let textLower = text?.toLowerCase();

    let findTask = newTask.filter(x =>
      x.title?.toLowerCase().includes(textLower),
    );

    if (text === '') settasks(defaulttask);
    else {
      if (findTask.length > 0) settasks(findTask);
      else settasks([]);
    }
  };

  const renderEmppty = () => (!isLoading ? <EmptyList /> : null);

  const renderItem = ({item, index}) => (
    <TaskItemCard
      key={index}
      onPress={() =>
        props.navigation.navigate('Detail', {fetchTask, data: item})
      }
      onLongPress={() =>
        props.navigation.navigate('Form', {
          fetchTask,
          isupdated: true,
          data: item,
        })
      }
      title={item.title}
      subTitle={item.subTitle}
      date={item.date}
    />
  );
  return (
    <View style={styles.container}>
      <Appbar isHome search={search} onSearch={handlerSearch} />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        data={func.Arrays(tasks)}
        renderItem={renderItem}
        ListEmptyComponent={renderEmppty}
      />

      <Floating
        onPress={() => props.navigation.navigate('Form', {fetchTask})}
      />

      <Spinner visible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
