import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Appbar, Spinner, Texts} from '@components';
import func from '@utils/func';
import colors from '@styles/colors';
import {deleteTask} from '@services/task.controller';

export default function TaskDetails(props) {
  const [Item] = useState(props.route.params?.data);
  const [isLoading, setisLoading] = useState(false);

  const handlerDelete = () => {
    const Id = {id: Item.id};

    setisLoading(true);

    deleteTask(Id)
      .then(() => {
        setisLoading(false);
        props.route.params.fetchTask();
        props.navigation.goBack();
      })
      .catch(() => setisLoading(false));
  };
  return (
    <View style={styles.container}>
      <Appbar
        navigation={props.navigation}
        backable
        title={'My notes'}
        onRight={handlerDelete}
      />

      <View style={styles.content}>
        <Texts style={styles.date}>{func.validateDate(Item?.date)}</Texts>
        <Texts semiBold style={styles.title}>
          {Item?.title}
        </Texts>
        <Texts style={styles.subTitle}>
          {Item?.subTitle?.replace(/^(.)/, match => match?.toUpperCase())}
        </Texts>
      </View>

      <Spinner visible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  date: {
    color: colors.bordered,
  },
  title: {
    fontSize: 20,
    color: '#1b1a32',
    marginVertical: 10,
  },
  subTitle: {
    color: '#859eb6',
  },
});
