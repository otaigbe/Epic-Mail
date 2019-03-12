"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

describe('Testing the messages Endpoint', function () {
  describe('Testing the save/send mail Endpoint', function () {
    it('should save a message successfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/messages').type('form').send({
                to: 'stanley@epicmail.com',
                subject: 'No subject',
                message: 'tthyth thn4thnbet thntrhnth t thynthne tne etyne tjne tjntetjnh tjnt eyn'
              });

            case 2:
              res = _context.sent;

              _chai.default.expect(res).to.have.status(201);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data');

              _chai.default.expect(res.body.data).to.have.property('message');

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should return a validation error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/messages').type('form').send({
                to: 'stanley@epicmail.com',
                subject: '',
                message: 'tthyth thn4thnbet thntrhnth t thynthne tne etyne tjne tjntetjnh tjnt eyn'
              });

            case 2:
              res = _context2.sent;

              _chai.default.expect(res).to.have.status(422);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('error');

              _chai.default.expect(res.body.error.message).to.eql('Something wrong with input!');

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
});