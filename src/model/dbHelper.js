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
          await client.query('ROLLBACK');
          throw e;
        } finally {
          client.release();
        }
      })();
    } catch (error) {
      return console.error(error.stack);
    }
  }
}
