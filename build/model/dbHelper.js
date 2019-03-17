"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dbConnect = _interopRequireDefault(require("./dbConnect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dbhelpers =
/*#__PURE__*/
function () {
  function Dbhelpers() {
    _classCallCheck(this, Dbhelpers);
  }

  _createClass(Dbhelpers, null, [{
    key: "performTransactionalQuery",
    value: function () {
      var _performTransactionalQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(myQuery, args) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                return _context2.abrupt("return", _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  var client, rows;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _dbConnect.default.connect();

                        case 2:
                          client = _context.sent;
                          _context.prev = 3;
                          _context.next = 6;
                          return client.query('BEGIN');

                        case 6:
                          _context.next = 8;
                          return client.query(myQuery, args);

                        case 8:
                          rows = _context.sent;
                          _context.next = 11;
                          return client.query('COMMIT');

                        case 11:
                          return _context.abrupt("return", rows);

                        case 14:
                          _context.prev = 14;
                          _context.t0 = _context["catch"](3);
                          _context.next = 18;
                          return client.query('ROLLBACK');

                        case 18:
                          throw _context.t0;

                        case 19:
                          _context.prev = 19;
                          client.release();
                          return _context.finish(19);

                        case 22:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[3, 14, 19, 22]]);
                }))());

              case 4:
                _context2.prev = 4;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", console.error(_context2.t0.stack));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 4]]);
      }));

      function performTransactionalQuery(_x, _x2) {
        return _performTransactionalQuery.apply(this, arguments);
      }

      return performTransactionalQuery;
    }()
  }]);

  return Dbhelpers;
}();

exports.default = Dbhelpers;