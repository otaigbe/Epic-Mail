"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pgFormat = _interopRequireDefault(require("pg-format"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dbConnect = _interopRequireDefault(require("./dbConnect"));

var _messages = _interopRequireDefault(require("../fixtures/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

function createSchema() {
  return _createSchema.apply(this, arguments);
}

function _createSchema() {
  _createSchema = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var dropType, dropMessageType, createTypeStatus, createUserTable, createMessageTable, sent, inBox, group, groupMembers, salt, hashedPassword, addUserToUserTable, addMessagesToMessageTable;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dropType = 'DROP TYPE IF EXISTS messagestatus cascade';
            dropMessageType = 'DROP TYPE IF EXISTS messagetype cascade';
            createTypeStatus = 'CREATE TYPE messagestatus AS ENUM(\'read\', \'unread\', \'draft\', \'sent\')'; // const createTypeMessageType = 'CREATE TYPE messagetype AS ENUM(\'received\', \'sent\', \'draft\')';

            createUserTable = "CREATE TABLE IF NOT EXISTS users (\n        userid bigserial PRIMARY KEY UNIQUE NOT NULL,\n        firstname VARCHAR(200) NOT NULL,\n        lastname VARCHAR(200) NOT NULL,\n        username VARCHAR(200) UNIQUE NOT NULL,\n        password VARCHAR(500) NOT NULL,\n        email VARCHAR(200) UNIQUE NOT NULL,\n        alternateemail VARCHAR(500) NOT NULL\n    )";
            createMessageTable = "CREATE TABLE IF NOT EXISTS messages (\n        messageid bigserial PRIMARY KEY UNIQUE NOT NULL,\n        createdon TIMESTAMP DEFAULT NOW() NOT NULL,\n        subject text NOT NULL,\n        message TEXT NOT NULL,\n        parentmessageid BIGINT REFERENCES messages(messageid),\n        status messagestatus NOT NULL,\n        sender VARCHAR(200) REFERENCES users(email),\n        receiver VARCHAR(200) REFERENCES users(email)\n        )";
            sent = "CREATE TABLE IF NOT EXISTS sent (\n        messageid BIGINT REFERENCES messages(messageid),\n        createdon TIMESTAMP(8) DEFAULT now(),\n        sender VARCHAR(200) REFERENCES users(email)\n   )";
            inBox = "CREATE TABLE IF NOT EXISTS inbox (\n        messageid BIGINT REFERENCES messages(messageid),\n        createdon TIMESTAMP(8) DEFAULT now(),\n        status messagestatus NOT NULL,\n        receiverusername VARCHAR(200) REFERENCES users(email)\n   )";
            group = "CREATE TABLE IF NOT EXISTS groups (\n    groupid bigserial PRIMARY KEY UNIQUE NOT NULL,\n    groupname VARCHAR(200) NOT NULL,\n    createdon TIMESTAMP(8) DEFAULT now(),\n    creator VARCHAR(200) REFERENCES users(email)\n)";
            groupMembers = "CREATE TABLE IF NOT EXISTS groupmembers (\n  groupid bigserial PRIMARY KEY UNIQUE NOT NULL,\n  memberid BIGINT REFERENCES users(userid),\n  addedon TIMESTAMP(8) DEFAULT now()\n)";
            _context2.next = 11;
            return _bcrypt.default.genSalt(10);

          case 11:
            salt = _context2.sent;
            _context2.next = 14;
            return _bcrypt.default.hash('password', salt);

          case 14:
            hashedPassword = _context2.sent;
            addUserToUserTable = "INSERT into users (firstname, lastname, username, password, email, alternateemail) \n  VALUES ('otaigbe', 'okhueleigbe', 'otaigbe','".concat(hashedPassword, "', 'otaigbe@epicmail.com', 'otaigbe@gmail.com'),\n  ('osas', 'okhueleigbe', 'osas422','").concat(hashedPassword, "', 'osas422@epicmail.com', 'otaigbe@gmail.com'),\n  ('felicia', 'okhueleigbe', 'felicitas','").concat(hashedPassword, "', 'felicitas@epicmail.com', 'otaigbe@gmail.com')"); // let addMessagesToMessageTable = 'INSERT into messages () VALUES ';
            // for (let i = 0; i < messages.length; i++) {
            //   addMessagesToMessageTable += `('${messages[i].from}', '${messages[i].to}', '${messages[i].messageBody}', '${messages[i].subject}', '${messages[i].type}', '${messages[i].status}', '${messages[i].id}', '${messages[i].createdOn}')`;
            //   if (i < messages.length - 1) {
            //     addMessagesToMessageTable += ',';
            //   }
            //   if (i === messages.length - 1) {
            //     addMessagesToMessageTable += ';';
            //   }
            // }
            //   console.log(addMessagesToMessageTable);

            addMessagesToMessageTable = "INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver)\n  VALUES ('rdtrfr ffafrge f g r  gg g', 'e wre wt e rewer gwerere', null, 'draft', 'felicitas@epicmail.com', null),\n  ('sadasds sdsf f f dsf sgf etgf retg g gt', 'ewtwereb rgwerehgw reg rehrh ge trtrt gwrgewreg eg', null, 'sent', 'osas422@epicmail.com', 'felicitas@epicmail.com'),\n  ('ewtrwer w4rwr gere', 'qwrewrr wefrwr  rgrw rgwtrgw trgwrgwegrwtrg', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com')";

            _dbConnect.default.connect(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(err, client) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (err) console.log(err);
                        _context.prev = 1;
                        _context.next = 4;
                        return client.query('DROP TABLE IF EXISTS users, messages, sent, inbox, groups, groupmembers cascade');

                      case 4:
                        _context.next = 6;
                        return client.query(dropType);

                      case 6:
                        _context.next = 8;
                        return client.query(dropMessageType);

                      case 8:
                        _context.next = 10;
                        return client.query(createTypeStatus);

                      case 10:
                        _context.next = 12;
                        return client.query(createUserTable);

                      case 12:
                        _context.next = 14;
                        return client.query(createMessageTable);

                      case 14:
                        _context.next = 16;
                        return client.query(inBox);

                      case 16:
                        _context.next = 18;
                        return client.query(sent);

                      case 18:
                        _context.next = 20;
                        return client.query(group);

                      case 20:
                        _context.next = 22;
                        return client.query(groupMembers);

                      case 22:
                        _context.next = 24;
                        return client.query(addUserToUserTable);

                      case 24:
                        _context.next = 26;
                        return client.query(addMessagesToMessageTable);

                      case 26:
                        console.log('Tables created and Populated');
                        _context.next = 32;
                        break;

                      case 29:
                        _context.prev = 29;
                        _context.t0 = _context["catch"](1);
                        console.log(_context.t0);

                      case 32:
                        client.release();
                        process.exit();

                      case 34:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[1, 29]]);
              }));

              return function (_x, _x2) {
                return _ref.apply(this, arguments);
              };
            }());

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createSchema.apply(this, arguments);
}

createSchema();