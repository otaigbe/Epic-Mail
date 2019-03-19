/* eslint-disable no-cond-assign */
import pg from 'pg';
import conf from 'dotenv';

conf.config();
const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
};


// if (process.env.NODE_ENV === 'test') {
//   config.database = process.env.PGDATABASE_TEST;
// }
// if (process.env.NODE_ENV === 'development') {
//   config.database = process.env.PGDATABASE_DEVELOPMENT;
// }
// // console.log(config);

// if (process.env.NODE_ENV === 'production') {
//   config.database = process.env.PGDATABASE_PRODUCTION;
// }

// // console.log(process.env.PGDATABASE_DEVELOPMENT);
const pool = new pg.Pool(config);

export default pool;
