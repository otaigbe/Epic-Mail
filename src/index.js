import express from 'express';
import conf from 'dotenv';
import '@babel/polyfill';
import endpoints from './routes/v1';
import error from './middleware/error';

conf.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./UI'));
app.use('/', endpoints);

// app.use(error);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => { console.log(`app running on ${port}...`); });
export default server;
