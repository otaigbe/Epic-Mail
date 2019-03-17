"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST
};
var pool = new _pg.default.Pool(config);
var _default = pool;
exports.default = _default;