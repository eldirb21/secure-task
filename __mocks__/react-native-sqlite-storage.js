export const openDatabase = jest.fn(() => ({
  transaction: callback => {
    callback({
      executeSql: (query, args, successCallback, errorCallback) => {
        // Simulate a successful database transaction
        successCallback({}, {rowsAffected: 1});
      },
    });
  },
}));
