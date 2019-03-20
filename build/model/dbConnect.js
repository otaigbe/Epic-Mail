"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-cond-assign */
_dotenv.default.config();

var config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE
}; // if (process.env.NODE_ENV === 'test') {
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

var pool = new _pg.default.Pool(config);
var _default = pool;
exports.default = _default;