import express from 'express';
import conf from 'dotenv';
import winston from 'winston';
import '@babel/polyfill';
import endpoints from './routes/index';
import auth from './middleware/auth';

conf.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./UI'));

app.use('/', endpoints);

// app.use(error);
/* istanbul ignore next */
const port = process.env.PORT || 3000;
const server = app.listen(port, () => { winston.info(`app running on ${port}...`); });
export default server;
