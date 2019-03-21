import pool from './dbConnect';


export default class Dbhelpers {
  static async performTransactionalQuery(myQuery, args) {
    try {
      return (async () => {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const rows = await client.query(myQuery, args);
          await client.query('COMMIT');
          return rows;
        } catch (e) {
          /* istanbul ignore next */
          await client.query('ROLLBACK');
          /* istanbul ignore next */
          throw e;
        } finally {
          client.release();
        }
      })();
    } catch (error) {
      /* istanbul ignore next */
      return console.error(error.stack);
    }
  }
}
