import express from 'express';
import conf from 'dotenv';
import '@babel/polyfill';
import endpoints from './routes/v1';
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
const server = app.listen(port, () => { console.log(`app running on ${port}...`); });
export default server;
