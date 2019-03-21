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


const pool = new pg.Pool(config);

export default pool;
