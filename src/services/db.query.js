const db_query = {
  tbl_task: {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    title: ' VARCHAR(150)',
    subTitle: ' VARCHAR(150)',
    date: 'DATETIME',
    checked: 'TEXT NOT NULL',
  },
};
export default db_query;
