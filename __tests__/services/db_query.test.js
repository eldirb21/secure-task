import db_query from '@services/db.query';

describe('db_query object', () => {
  it('should have a tbl_task property', () => {
    expect(db_query).toHaveProperty('tbl_task');
  });

  it('tbl_task should be an object with specific properties', () => {
    const {tbl_task} = db_query;

    expect(tbl_task).toBeInstanceOf(Object);
    expect(tbl_task).toHaveProperty('id', 'INTEGER PRIMARY KEY AUTOINCREMENT');
    expect(tbl_task).toHaveProperty('title', ' VARCHAR(150)');
    expect(tbl_task).toHaveProperty('subTitle', ' VARCHAR(150)');
    expect(tbl_task).toHaveProperty('date', 'DATETIME');
  });
});
