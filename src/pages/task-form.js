/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable dot-notation */
import {View, StyleSheet, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInputs, Buttons, Spinner, Appbar} from '@components';
import {addTask, editTask} from '@services/task.controller';

export default function TaskForm({isupdated, ...props}) {
  const [errors, seterrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [Inputs, setInputs] = useState({
    date: '',
    title: '',
    subTitle: '',
    checked: 0,
  });

  useEffect(() => {
    if (props.route?.params?.isupdated) {
      setInputs(props.route?.params?.data);
    }
  }, [props.route.params?.isupdated]);

  const handleChange = (key, value) => {
    let newInputs = {...Inputs};
    newInputs[key] = value;
    setInputs(newInputs);
  };

  const onSubmit = () => {
    if (Inputs.title === '') {
      seterrors({...errors, title: 'Title is required'});
    } else if (Inputs.subTitle === '') {
      seterrors({...errors, subTitle: 'Description is required'});
    } else {
      seterrors({...errors, subTitle: '', title: ''});
    }
    if (Inputs.title && Inputs.subTitle) {
      const date = new Date();
      const isoDateString = date.toISOString();

      Inputs['date'] = isoDateString;

      setisLoading(true);

      addTask(Inputs)
        .then(() => {
          setisLoading(false);
          props.route.params.fetchTask();
          props.navigation.goBack();
        })
        .catch(() => setisLoading(false));
    }
  };

  const handleEdit = () => {
    if (Inputs.title === '') {
      seterrors({...errors, title: 'Title is required'});
    } else if (Inputs.subTitle === '') {
      seterrors({...errors, subTitle: 'Description is required'});
    } else {
      seterrors({...errors, subTitle: '', title: ''});
    }
    if (Inputs.title && Inputs.subTitle) {
      const date = new Date();
      const isoDateString = date.toISOString();

      Inputs['date'] = isoDateString;

      setisLoading(true);

      editTask(Inputs)
        .then(() => {
          setisLoading(false);
          props.route.params.fetchTask();
          props.navigation.goBack();
        })
        .catch(() => setisLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <Appbar
        title={!props.route?.params?.isupdated ? 'Add task' : 'edit Task'}
        navigation={props.navigation}
        backable
      />
      <View style={styles.content}>
        <TextInputs
          placeholder="Enter title"
          error={errors.title}
          onChangeText={val => handleChange('title', val)}
          value={Inputs.title}
        />
        <TextInputs
          placeholder="Enter description"
          textAlignVertical="top"
          onChangeText={val => handleChange('subTitle', val)}
          istextarea
          multiline
          error={errors.subTitle}
          value={Inputs.subTitle}
          numberOfLines={Platform.OS === 'ios' ? null : 5}
          minHeight={Platform.OS === 'ios' && 5 ? 20 * 5 : null}
        />
      </View>

      <Buttons
        onPress={props.route?.params?.isupdated ? handleEdit : onSubmit}
      />

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
});
