/* eslint-disable curly */
import {openDatabase} from 'react-native-sqlite-storage';

export const sqlite = openDatabase({
  name: 'SECURE_TASK_DB',
});

const httpClient = {
  createTable(table, obj) {
    const value = Object.keys(obj)
      .map(key => `${key} ${obj[key]}`)
      .join(', ');

    let query = `CREATE TABLE IF NOT EXISTS ${table} (${value})`;

    sqlite.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (sqlTxn, res) => {},
        err => console.log(`Table "${table}" creating error => ` + err.message),
      );
    });
  },

  ApiGet(table, orderBy) {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM ${table}`;

      if (orderBy) {
        query = `SELECT * FROM ${table} ORDER BY ${orderBy} DESC`;
      }

      sqlite.transaction(txn => {
        txn.executeSql(
          query,
          [],
          (sqlTxn, res) => {
            setTimeout(() => {
              let len = res.rows.length;
              if (len > 0) {
                let results = [];
                for (let i = 0; i < len; i++) {
                  let item = res.rows.item(i);
                  results.push(item);
                }
                resolve({length: len, data: results});
              } else resolve({length: 0, data: []});
            }, 1500);
          },
          err => setTimeout(() => reject(err), 1500),
        );
      });
    });
  },
  ApiPost(table, object) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(object);
      const values = keys.map(key => `${object[key]}`);

      let query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values
        .map(() => '?')
        .join(', ')})`;

      sqlite.transaction(txn => {
        txn.executeSql(
          query,
          values,
          (sqlTxn, res) => setTimeout(() => resolve(res), 1500),
          err => setTimeout(() => reject(err), 1500),
        );
      });
    });
  },
  ApiPut(table, object, keyField) {
    return new Promise((resolve, reject) => {
      const updateColumns = Object.keys(object)
        .filter(key => key !== keyField)
        .map(column => `${column} = ?`)
        .join(', ');

      let query = `UPDATE ${table} SET ${updateColumns} WHERE ${keyField} = ?`;

      sqlite.transaction(txn => {
        txn.executeSql(
          query,
          [
            ...Object.values(object).filter(
              value => value !== object[keyField],
            ),
            object[keyField],
          ],
          (sqlTxn, res) => {
            const rowsAffected = res.rowsAffected;
            setTimeout(() => resolve(rowsAffected), 1500);
          },
          err => setTimeout(() => reject(err), 1500),
        );
      });
    });
  },
  ApiDelete(table, object) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(object);
      const values = keys.map(key => object[key]);

      let query = `DELETE FROM ${table} WHERE ${keys} = ?`;

      sqlite.transaction(txn => {
        txn.executeSql(
          query,
          values,
          (sqlTxn, res) => setTimeout(() => resolve(res), 1500),
          err => setTimeout(() => reject(err), 1500),
        );
      });
    });
  },
};
export default httpClient;
