import httpClient, {sqlite} from '../../src/services/httpCLient';

describe('httpClient', () => {
  sqlite.transaction = jest.fn(callback => {
    const mockTxn = {
      executeSql: jest.fn(),
    };
    callback(mockTxn);
  });

  describe('createTable', () => {
    it('creates a table', () => {
      httpClient.createTable('TestTable', {id: 'INTEGER', name: 'TEXT'});
      expect(sqlite.transaction).toHaveBeenCalled();
    });
    it('creates a table toHaveBeenCalledWith', () => {
      const tableName = 'TestTable';
      const tableSchema = {id: 'INTEGER', name: 'TEXT'};
      const executeSqlMock = jest.fn(
        (query, params, successCallback, errorCallback) => {
          successCallback({}, {});
        },
      );
      sqlite.transaction.mockImplementation(callback => {
        const mockTxn = {
          executeSql: executeSqlMock,
        };
        callback(mockTxn);
      });
      httpClient.createTable(tableName, tableSchema);

      expect(sqlite.transaction).toHaveBeenCalled();
      expect(executeSqlMock).toHaveBeenCalledWith(
        `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER, name TEXT)`,
        [],
        expect.any(Function),
        expect.any(Function),
      );
    });
  });

  describe('ApiGet', () => {
    it('fetches data from a table', async () => {
      const mockData = [
        {id: 1, name: 'Item 1'},
        {id: 2, name: 'Item 2'},
      ];
      const executeSqlMock = jest.fn(
        (query, params, successCallback, errorCallback) => {
          successCallback(
            {},
            {rows: {length: mockData.length, item: index => mockData[index]}},
          );
        },
      );

      sqlite.transaction.mockImplementation(callback => {
        const mockTxn = {
          executeSql: executeSqlMock,
        };
        callback(mockTxn);
      });

      const result = await httpClient.ApiGet('TestTable');
      expect(result).toEqual({length: mockData.length, data: mockData});
    });

    it('fetches data from a table toHaveBeenCalledWith', async () => {
      const tableName = 'TestTable';
      const orderBy = 'name';
      const mockData = [
        {id: 1, name: 'Item 1'},
        {id: 2, name: 'Item 2'},
      ];
      const executeSqlMock = jest.fn(
        (query, params, successCallback, errorCallback) => {
          successCallback(
            {},
            {rows: {length: mockData.length, item: index => mockData[index]}},
          );
        },
      );
      sqlite.transaction.mockImplementation(callback => {
        const mockTxn = {
          executeSql: executeSqlMock,
        };
        callback(mockTxn);
      });
      const result = await httpClient.ApiGet(tableName, orderBy);

      expect(sqlite.transaction).toHaveBeenCalled();
      expect(executeSqlMock).toHaveBeenCalledWith(
        `SELECT * FROM ${tableName} ORDER BY ${orderBy} DESC`,
        [],
        expect.any(Function), // Success callback
        expect.any(Function), // Error callback
      );
      expect(result).toEqual({length: mockData.length, data: mockData});
    });
  });

  describe('ApiPost', () => {
    it('inserts data into a table', async () => {
      const tableName = 'TestTable';
      const dataToInsert = {id: 3, name: 'Item 3'};
      const executeSqlMock = jest.fn(
        (query, params, successCallback, errorCallback) => {
          successCallback({}, {rowsAffected: 1});
        },
      );

      sqlite.transaction.mockImplementation(callback => {
        const mockTxn = {
          executeSql: executeSqlMock,
        };
        callback(mockTxn);
      });

      const result = await httpClient.ApiPost(tableName, dataToInsert);
      expect(result).toEqual({rowsAffected: 1});
    });
    it('inserts data into a table toHaveBeenCalledWith', async () => {
      const tableName = 'TestTable';
      const dataToInsert = {id: 3, name: 'Item 3'};
      const executeSqlMock = jest.fn(
        (query, params, successCallback, errorCallback) => {
          successCallback({}, {rowsAffected: 1});
        },
      );
      sqlite.transaction.mockImplementation(callback => {
        const mockTxn = {
          executeSql: executeSqlMock,
        };
        callback(mockTxn);
      });
      const result = await httpClient.ApiPost(tableName, dataToInsert);

      expect(sqlite.transaction).toHaveBeenCalled();
      expect(executeSqlMock).toHaveBeenCalledWith(
        `INSERT INTO ${tableName} (id, name) VALUES (?, ?)`,
        [`${dataToInsert.id}`, dataToInsert.name],
        expect.any(Function),
        expect.any(Function),
      );
      expect(result.rowsAffected).toBe(1);
    });
  });

  describe('ApiPut', () => {
    it('updates data in a table', async () => {
      const tableName = 'TestTable';
      const dataToUpdate = {id: 1, name: 'Updated Item 1'};
      const keyField = 'id';
      const executeSqlMock = jest.fn(
        (query, params, successCallback, errorCallback) => {
          successCallback({}, {rowsAffected: 1});
        },
      );
      sqlite.transaction.mockImplementation(callback => {
        const mockTxn = {
          executeSql: executeSqlMock,
        };
        callback(mockTxn);
      });

      const result = await httpClient.ApiPut(tableName, dataToUpdate, keyField);

      expect(sqlite.transaction).toHaveBeenCalled();
      expect(executeSqlMock).toHaveBeenCalledWith(
        `UPDATE ${tableName} SET name = ? WHERE ${keyField} = ?`,
        [dataToUpdate.name, dataToUpdate.id],
        expect.any(Function), // Success callback
        expect.any(Function), // Error callback
      );
      expect(result).toEqual(1);
    });
  });

  describe('ApiDelete', () => {
    it('deletes data from a table', async () => {
      const tableName = 'TestTable';
      const dataToDelete = {id: 1};

      const executeSqlMock = jest.fn(
        (query, params, successCallback, errorCallback) => {
          successCallback({}, {rowsAffected: 1});
        },
      );
      sqlite.transaction.mockImplementation(callback => {
        const mockTxn = {
          executeSql: executeSqlMock,
        };
        callback(mockTxn);
      });
      const result = await httpClient.ApiDelete(tableName, dataToDelete);

      expect(sqlite.transaction).toHaveBeenCalled();
      expect(executeSqlMock).toHaveBeenCalledWith(
        `DELETE FROM ${tableName} WHERE id = ?`,
        [dataToDelete.id],
        expect.any(Function),
        expect.any(Function),
      );
      expect(result.rowsAffected).toBe(1);
    });
  });
});
