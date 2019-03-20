"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

describe('Testing the Epic mail app', function () {
  describe('Testing the user account creation/signup Endpoint', function () {
    it('should create a new account successfully',
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
              return _chai.default.request(_index.default).post('/api/v1/auth/signup/').type('form').send({
                username: 'stanley',
                firstName: 'stanley',
                lastName: 'okhueleigbe',
                password: 'piloting',
                alternateEmail: 'stanlex4400@gmail.com'
              });

            case 2:
              res = _context.sent;

              _chai.default.expect(res).to.have.status(201);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data');

            case 6:
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
              return _chai.default.request(_index.default).post('/api/v1/auth/signup/').type('form').send({
                username: Number(34564),
                firstName: 'otaigbe',
                lastName: 'okhueleigbe',
                password: '',
                alternateEmail: 'stanlex4400@gmail.com'
              });

            case 2:
              res = _context2.sent;

              _chai.default.expect(res).to.have.status(400);

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
    it('should return an already existent user message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/auth/signup/').type('form').send({
                username: 'otaigbe',
                firstName: 'otaigbe',
                lastName: 'okhueleigbe',
                password: 'piloting',
                alternateEmail: 'stanlex4400@gmail.com'
              });

            case 2:
              res = _context3.sent;

              _chai.default.expect(res).to.have.status(409);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('error');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('Testing the signin method', function () {
    it('should signin a user successfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/auth/signin/').type('form').send({
                email: 'otaigbe@epicmail.com',
                password: 'password'
              });

            case 2:
              res = _context4.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should return a validation error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/auth/signin/').type('form').send({
                email: 'otaigbe@epicmail.com',
                password: ''
              });

            case 2:
              res = _context5.sent;

              _chai.default.expect(res).to.have.status(400);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('error');

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should return an invalid username/password error message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/auth/signin/').type('form').send({
                email: 'otaigbe@epicmail.com',
                password: 'piloti'
              });

            case 2:
              res = _context6.sent;

              _chai.default.expect(res).to.have.status(400);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('error');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
});