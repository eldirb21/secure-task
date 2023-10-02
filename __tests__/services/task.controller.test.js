import {
  getTask,
  addTask,
  editTask,
  deleteTask,
} from '../../src/services/task.controller';
import httpClient from '../../src/services/httpCLient';

jest.mock('../../src/services/httpCLient', () => {
  return {
    ApiGet: jest.fn(),
    ApiPost: jest.fn(),
    ApiPut: jest.fn(),
    ApiDelete: jest.fn(),
  };
});

describe('Task API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET TASK', () => {
    test('getTask calls httpClient.ApiGet with correct endpoint', async () => {
      const responseData = {data: ['task1', 'task2']};
      httpClient.ApiGet.mockResolvedValue(responseData);

      const result = await getTask();

      expect(httpClient.ApiGet).toHaveBeenCalledWith('task');
      expect(result).toEqual(responseData.data);
    });
    test('getTask handles API error by rejecting the promise', async () => {
      const errorResponse = {message: 'API Error'};
      httpClient.ApiGet.mockRejectedValue(errorResponse);
      try {
        await getTask();
      } catch (error) {
        expect(httpClient.ApiGet).toHaveBeenCalledWith('task');
        expect(error).toEqual(errorResponse);
      }
    });
  });

  describe('ADD TASK', () => {
    test('addTask calls httpClient.ApiPost with correct endpoint and data', async () => {
      const taskData = {name: 'New Task'};

      httpClient.ApiPost.mockResolvedValue({
        message: 'Task added successfully',
      });

      const result = await addTask(taskData);

      expect(httpClient.ApiPost).toHaveBeenCalledWith('task', taskData);
      expect(result).toEqual({message: 'Task added successfully'});
    });

    test('addTask handles API error by rejecting the promise', async () => {
      const errorResponse = {message: 'API Error'};
      httpClient.ApiPost.mockRejectedValue(errorResponse);
      const taskData = {name: 'New Task'};

      try {
        await addTask(taskData);
      } catch (error) {
        expect(httpClient.ApiPost).toHaveBeenCalledWith('task', taskData);
        expect(error).toEqual(errorResponse);
      }
    });
  });

  describe('EDIT TASK', () => {
    test('editTask calls httpClient.ApiPut with correct endpoint, data, and key', async () => {
      const taskData = {id: 1, name: 'Updated Task'};

      httpClient.ApiPut.mockResolvedValue({
        message: 'Task updated successfully',
      });

      const result = await editTask(taskData);

      expect(httpClient.ApiPut).toHaveBeenCalledWith('task', taskData, 'id');
      expect(result).toEqual({message: 'Task updated successfully'});
    });
    test('editTask handles API error by rejecting the promise', async () => {
      const errorResponse = {message: 'API Error'};
      httpClient.ApiPut.mockRejectedValue(errorResponse);
      const taskData = {id: 1, name: 'Updated Task'};
      const key = 'id';

      try {
        await editTask(taskData, key);
      } catch (error) {
        expect(httpClient.ApiPut).toHaveBeenCalledWith('task', taskData, key);
        expect(error).toEqual(errorResponse);
      }
    });
  });

  describe('DELETE TASK', () => {
    test('deleteTask calls httpClient.ApiDelete with correct endpoint and data', async () => {
      const taskId = 1;

      httpClient.ApiDelete.mockResolvedValue({
        message: 'Task deleted successfully',
      });

      const result = await deleteTask(taskId);

      expect(httpClient.ApiDelete).toHaveBeenCalledWith('task', taskId);
      expect(result).toEqual({message: 'Task deleted successfully'});
    });

    test('deleteTask handles API error by rejecting the promise', async () => {
      const errorResponse = {message: 'API Error'};
      httpClient.ApiDelete.mockRejectedValue(errorResponse);
      const taskData = {id: 1};

      try {
        await deleteTask(taskData);
      } catch (error) {
        expect(httpClient.ApiDelete).toHaveBeenCalledWith('task', taskData);
        expect(error).toEqual(errorResponse);
      }
    });
  });
});
