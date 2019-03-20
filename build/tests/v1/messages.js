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
    it('should save and send a message successfully',
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
              return _chai.default.request(_index.default).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                subject: 'oiiuyizsgrtfhtuyoiuo',
                message: 'Just created this test message',
                receiver: 'felicitas@epicmail.com'
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
    it('should save a message as draft',
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
              return _chai.default.request(_index.default).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                subject: 'oiiuyizsgrtfhtuyoiuo',
                message: 'Just created this message'
              });

            case 2:
              res = _context2.sent;

              _chai.default.expect(res).to.have.status(201);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should return a validation error',
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
              return _chai.default.request(_index.default).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                to: 'stanley@epicmail.com',
                subject: '',
                message: 'tthyth thn4thnbet thntrhnth t thynthne tne etyne tjne tjntetjnh tjnt eyn'
              });

            case 2:
              res = _context3.sent;

              _chai.default.expect(res).to.have.status(400);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('error');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should return a unauthorised access error',
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
              return _chai.default.request(_index.default).post('/api/v1/messages').type('form').send({
                subject: 'oiiuyizsgrtfhtuyoiuo',
                message: 'Just created this test message',
                receiver: 'osass@epicmail.com'
              });

            case 2:
              res = _context4.sent;

              _chai.default.expect(res).to.have.status(401); // chai.expect(res.body).to.have.property('status');
              // chai.expect(res.body).to.have.property('error');


            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe('Testing the get all received email Endpoint', function () {
    it('should get all emails where status is received',
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
              return _chai.default.request(_index.default).get('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context5.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data'); // chai.expect(res.body.data).to.have.property('message');


            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('Testing the get all unread emails Endpoint', function () {
    it('should get all emails where status is unread',
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
              return _chai.default.request(_index.default).get('/api/v1/messages/unread').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context6.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('Testing the get all sent emails Endpoint', function () {
    it('should get all emails where type is sent',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var res;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/messages/sent').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context7.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('should throw 401 error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/messages/sent');

            case 2:
              res = _context8.sent;

              _chai.default.expect(res).to.have.status(401);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('Testing the get specific users email by Id Endpoint', function () {
    it('should get a specific users email by Id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var res;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/messages/5').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context9.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('should return a message not found error message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/messages/19300').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context10.sent;

              _chai.default.expect(res).to.have.status(404);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('error');

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe('Testing the Delete email by Id Endpoint', function () {
    it('should delete a specific users email by Id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var res;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _chai.default.request(_index.default).delete('/api/v1/messages/5').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context11.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data'); // chai.expect(res.body.data).to.have.property('message');


            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('should return a message not found error and deletion incomplete message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/messages/19300').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context12.sent;

              _chai.default.expect(res).to.have.status(404);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('error'); // chai.expect(res.body.error).to.have.property('message');


            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
});