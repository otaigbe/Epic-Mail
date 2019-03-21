"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

describe('Testing the groups Endpoint', function () {
  describe('Testing the create and own group by user otaigbe Endpoint', function () {
    it('should successfully create a group',
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
              return _chai.default.request(_index.default).post('/api/v1/groups').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: 'friends'
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
    it('should successfully create a group buddies',
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
              return _chai.default.request(_index.default).post('/api/v1/groups').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: 'buddies'
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
    it('should successfully create a group called enemies',
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
              return _chai.default.request(_index.default).post('/api/v1/groups').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: 'enemies'
              });

            case 2:
              res = _context3.sent;

              _chai.default.expect(res).to.have.status(201);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should an invalid token error',
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
              return _chai.default.request(_index.default).post('/api/v1/groups').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBiuo;pY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: 'friends'
              });

            case 2:
              res = _context4.sent;

              _chai.default.expect(res).to.have.status(400);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should throw an unauthorised error message',
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
              return _chai.default.request(_index.default).post('/api/v1/groups').type('form').send({
                groupname: 'friends'
              });

            case 2:
              res = _context5.sent;

              _chai.default.expect(res).to.have.status(401);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should throw validation error',
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
              return _chai.default.request(_index.default).post('/api/v1/groups').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: '',
                creator: 'osas422@epicmail.com'
              });

            case 2:
              res = _context6.sent;

              _chai.default.expect(res).to.have.status(400);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))); // eslint-disable-next-line no-template-curly-in-string

    it('should return a "You Already have a group with name this group name! Chooose a different group name" message',
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
              return _chai.default.request(_index.default).post('/api/v1/groups').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: 'friends'
              });

            case 2:
              res = _context7.sent;

              _chai.default.expect(res).to.have.status(409);

              _chai.default.expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe('Testing the rename a group endpoint', function () {
    it('should rename a group successfully',
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
              return _chai.default.request(_index.default).patch('/api/v1/groups/1/name').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: 'classmates'
              });

            case 2:
              res = _context8.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('should throw a no token error',
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
              return _chai.default.request(_index.default).patch('/api/v1/groups/1/name').type('form').send({
                groupname: 'buddies'
              });

            case 2:
              res = _context9.sent;

              _chai.default.expect(res).to.have.status(401);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('should throw an error because buddies group already exists',
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
              return _chai.default.request(_index.default).patch('/api/v1/groups/1/name').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: 'buddies'
              });

            case 2:
              res = _context10.sent;

              _chai.default.expect(res).to.have.status(409);

              _chai.default.expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it('should throw validation error',
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
              return _chai.default.request(_index.default).patch('/api/v1/groups/1/name').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: 'e'
              });

            case 2:
              res = _context11.sent;

              _chai.default.expect(res).to.have.status(400);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('error');

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('should throw unfound error',
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
              return _chai.default.request(_index.default).patch('/api/v1/groups/798/name').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                groupname: 'enemies'
              });

            case 2:
              res = _context12.sent;

              _chai.default.expect(res).to.have.status(404);

              _chai.default.expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
  describe('Testing the group all groups created by a particular user endpoint', function () {
    it('should get all groups',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var res;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/groups').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context13.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

              _chai.default.expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
  describe('Testing the add User to group Endpoint', function () {
    it('should add a user successfully add to group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var res;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/2/users').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                useremail: 'ade@epicmail.com'
              });

            case 2:
              res = _context14.sent;

              _chai.default.expect(res).to.have.status(200);

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('should add a user successfully add to group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var res;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/2/users').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                useremail: 'felicitas@epicmail.com'
              });

            case 2:
              res = _context15.sent;

              _chai.default.expect(res).to.have.status(200);

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it('should add a user successfully add to group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var res;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/2/users').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                useremail: 'osas422@epicmail.com'
              });

            case 2:
              res = _context16.sent;

              _chai.default.expect(res).to.have.status(200);

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it('should add a user successfully add to group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var res;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/2/users').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                useremail: 'george@epicmail.com'
              });

            case 2:
              res = _context17.sent;

              _chai.default.expect(res).to.have.status(200);

            case 4:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    it('should add already a member of a group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18() {
      var res;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/2/users').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                useremail: 'ade@epicmail.com'
              });

            case 2:
              res = _context18.sent;

              _chai.default.expect(res).to.have.status(200);

            case 4:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
    it('should not find group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19() {
      var res;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/200/users').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                useremail: 'ade@epicmail.com'
              });

            case 2:
              res = _context19.sent;

              _chai.default.expect(res).to.have.status(404);

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    it('should throw a validation error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      var res;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/2/users').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                useremail: 1234
              });

            case 2:
              res = _context20.sent;

              _chai.default.expect(res).to.have.status(400);

            case 4:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
  });
  describe('Testing the send mail to all members in a group endpoint', function () {
    it('should send messages to all members in a group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee21() {
      var res;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/2/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                subject: 'oiiuyizsgrtfhtuyoiuo',
                message: 'Just created this test to be sent to multiple folks'
              });

            case 2:
              res = _context21.sent;

              _chai.default.expect(res).to.have.status(201);

              _chai.default.expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    })));
    it('shouldn\'t find message with supplied id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee22() {
      var res;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/70/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                subject: 'oiiuyizsgrtfhtuyoiuo',
                message: 'Just created this test to be sent to multiple folks'
              });

            case 2:
              res = _context22.sent;

              _chai.default.expect(res).to.have.status(404);

            case 4:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
    it('should return a not found error because no members in the group',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee23() {
      var res;
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/6/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                subject: 'oiiuyizsgrtfhtuyoiuo',
                message: 'Just created this test to be sent to multiple folks'
              });

            case 2:
              res = _context23.sent;

              _chai.default.expect(res).to.have.status(404);

            case 4:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    })));
    it('should return a validation error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee24() {
      var res;
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/groups/6/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form').send({
                subject: 'o',
                message: 'Ju'
              });

            case 2:
              res = _context24.sent;

              _chai.default.expect(res).to.have.status(400);

            case 4:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
  });
  describe('Testing the delete users from group endpoint', function () {
    it('should delete a group with provided id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee25() {
      var res;
      return regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return _chai.default.request(_index.default).delete('/api/v1/groups/2/users/5').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context25.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    })));
    it('should throw a validation error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee26() {
      var res;
      return regeneratorRuntime.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return _chai.default.request(_index.default).delete('/api/v1/groups/bad/users/5').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context26.sent;

              _chai.default.expect(res).to.have.status(400);

            case 4:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    })));
    it('shouldn\'t find message with supplied id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee27() {
      var res;
      return regeneratorRuntime.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return _chai.default.request(_index.default).delete('/api/v1/groups/18989898/users/5').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context27.sent;

              _chai.default.expect(res).to.have.status(404);

              _chai.default.expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27);
    })));
  });
  describe('Testing the delete group by id endpoint', function () {
    it('should delete a group with provided id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee28() {
      var res;
      return regeneratorRuntime.wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return _chai.default.request(_index.default).delete('/api/v1/groups/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context28.sent;

              _chai.default.expect(res).to.have.status(200);

              _chai.default.expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28);
    })));
    it('should throw a bad request error ',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee29() {
      var res;
      return regeneratorRuntime.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return _chai.default.request(_index.default).delete('/api/v1/groups/bar').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context29.sent;

              _chai.default.expect(res).to.have.status(400);

              _chai.default.expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context29.stop();
          }
        }
      }, _callee29);
    })));
    it('shouldn\'t find message with supplied id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee30() {
      var res;
      return regeneratorRuntime.wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              _context30.next = 2;
              return _chai.default.request(_index.default).delete('/api/v1/groups/1898').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');

            case 2:
              res = _context30.sent;

              _chai.default.expect(res).to.have.status(404);

              _chai.default.expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context30.stop();
          }
        }
      }, _callee30);
    })));
  });
});