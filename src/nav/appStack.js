import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet} from 'react-native';

import TaskList from '@pages/task-list';
import TaskDetails from '@pages/task-details';
import TaskForm from '@pages/task-form';
import Auth from '@pages/auth';
import colors from '@styles/colors';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        cardStyle: styles.cardStyle,
      }}>
      {/* <Stack.Screen name="Auth" component={Auth} /> */}
      <Stack.Screen name="Task" component={TaskList} />
      <Stack.Screen name="Detail" component={TaskDetails} />
      <Stack.Screen name="Form" component={TaskForm} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: colors.background,
  },
});

export default AppStack;
