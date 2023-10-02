import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import httpClient from './src/services/httpCLient';
import db_query from './src/services/db.query';
import AppStack from './src/nav/appStack';

const App: React.FC = () => {
  useEffect(() => {
    httpClient?.createTable('task', db_query.tbl_task);
  }, []);

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
