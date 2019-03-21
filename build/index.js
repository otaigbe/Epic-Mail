"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("@babel/polyfill");

var _v = _interopRequireDefault(require("./routes/v1"));

var _auth = _interopRequireDefault(require("./middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)();
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use(_express.default.static('./UI'));
app.use('/', _v.default); // app.use(error);

/* istanbul ignore next */

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log("app running on ".concat(port, "..."));
});
var _default = server;
exports.default = _default;