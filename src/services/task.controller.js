import httpClient from './httpCLient';

const getTask = () => {
  return new Promise((resolve, reject) => {
    httpClient
      .ApiGet('task')
      .then(res => resolve(res?.data))
      .catch(err => reject(err));
  });
};

const addTask = data => {
  return new Promise((resolve, reject) => {
    httpClient
      .ApiPost('task', data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
const editTask = (data, key = 'id') => {
  return new Promise((resolve, reject) => {
    httpClient
      .ApiPut('task', data, key)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
const deleteTask = data => {
  return new Promise((resolve, reject) => {
    httpClient
      .ApiDelete('task', data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export {getTask, addTask, editTask, deleteTask};
