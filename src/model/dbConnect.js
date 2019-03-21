/* eslint-disable no-cond-assign */
import pg from 'pg';
import conf from 'dotenv';

conf.config();
let config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
};


const testconfig = {
  user: 'yfemhejp',
  password: 'XCAlRBzOjOzj5sj6u8_mEe2uLxN7o3_r',
  port: 5432,
  host: 'isilo.db.elephantsql.com',
  database: 'yfemhejp',
};


if (process.env.NODE_ENV === 'test') {
  config = testconfig;
}
if (process.env.NODE_ENV === 'development') {
  config.database = process.env.PGDATABASE_DEVELOPMENT;
}
// console.log(config);

if (process.env.NODE_ENV === 'production') {
  config.database = process.env.PGDATABASE_PRODUCTION;
}

// console.log(process.env.PGDATABASE_DEVELOPMENT);
const pool = new pg.Pool(config);

export default pool;
