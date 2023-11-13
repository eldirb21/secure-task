import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Floating, Spinner, EmptyList, TaskItemCard} from '@components';
import func from '@utils/func';
import {getTask} from '@services/task.controller';
import {bgImg} from '../assets/images';
import Texts from '../components/texts';
import {editTask} from '../services/task.controller';
import Icons from '../components/icons';
import AgendaLists from '../components/agendaList';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
export default function TaskList(props) {
  const [defaulttask, setdefaulttask] = useState([]);
  const [search, setSearch] = useState(null);
  const [tasks, settasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isList, setisList] = useState(false);
  const [Items, setItems] = useState({});

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
        const transformedObject = res.reduce((result, item) => {
          const date = new Date(item.date).toISOString().split('T')[0];
          const key = moment(date).format('yyyy-MM-DD');
          if (!result[key]) {
            result[key] = [];
          }
          result[key].push(item);
          return result;
        }, {});
        setItems(transformedObject);
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

  const handleCheck = item => {
    let dta = {...item};
    dta['checked'] = dta['checked'] === '1' ? '0' : '1';
    editTask(dta)
      .then(res => {
        fetchTask();
      })
      .catch(err => {});
  };

  const renderEmpty = () => (!isLoading ? <EmptyList /> : null);
  const renderDate = item => {
    return <View style={{marginTop: 20}}>{renderItem({item})}</View>;
  };

  const renderItem = ({item, index}) => {
    return (
      <TaskItemCard
        onCheck={() => handleCheck(item)}
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
        checked={item.checked === '1' ? true : false}
      />
    );
  };

  const rowHasChanged = (r1, r2) => {
    console.log(`\n\n`, r1, `\n\n`, `\n\n `, r2, `\n\n`);
    return r1.name !== r2.name;
  };
  return (
    <ImageBackground source={bgImg} style={styles.bgContainer}>
      <View style={styles.container}>
        <Appbar isHome search={search} onSearch={handlerSearch} />

        <View style={styles.taskHeader}>
          <Texts bold>Task list</Texts>
          <View style={styles.headerFlex}>
            <TouchableOpacity
              onPress={() => setisList(false)}
              style={styles.headerBtn}>
              <Icons name="calendar" color="#000" size={15} type="AntDesign" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setisList(true)}
              style={styles.headerBtn}>
              <Icons name="format-list-bulleted" color="#000" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        {isList ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={func.Arrays(tasks)}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
          />
        ) : (
          <Agenda
            items={Items}
            selected={moment().format('yyyy-MM-DD')}
            handleCheck={handleCheck}
            renderItem={renderDate}
            loading={isLoading}
            renderEmptyDate={renderEmpty}
            rowHasChanged={rowHasChanged}
            onDayPress={day => {
              console.log(day);
            }}
            hideKnob={false}
          />
        )}

        <Floating
          onPress={() => props.navigation.navigate('Form', {fetchTask})}
        />

        <Spinner visible={isLoading} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    opacity: 0.7,
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
  item: {
    backgroundColor: '#8FBC8F',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
