"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dbConnect = _interopRequireDefault(require("./dbConnect"));

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
    var dropType, dropMessageType, createTypeStatus, createUserTable, createMessageTable, sent, inBox, group, groupMembers, salt, hashedPassword, addUserToUserTable, addMessagesToMessageTable, insertIntoInbox, insertIntosent, insertIntoGroup, insertIntoGroupMembers;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dropType = 'DROP TYPE IF EXISTS messagestatus cascade';
            dropMessageType = 'DROP TYPE IF EXISTS messagetype cascade';
            createTypeStatus = 'CREATE TYPE messagestatus AS ENUM(\'read\', \'unread\', \'draft\', \'sent\')';
            createUserTable = "CREATE TABLE IF NOT EXISTS users (\n        userid bigserial PRIMARY KEY UNIQUE NOT NULL,\n        firstname VARCHAR(200) NOT NULL,\n        lastname VARCHAR(200) NOT NULL,\n        username VARCHAR(200) UNIQUE NOT NULL,\n        password VARCHAR(500) NOT NULL,\n        email VARCHAR(200) UNIQUE NOT NULL,\n        alternateemail VARCHAR(500) NOT NULL\n    )";
            createMessageTable = "CREATE TABLE IF NOT EXISTS messages (\n        messageid bigserial PRIMARY KEY UNIQUE NOT NULL,\n        createdon TIMESTAMP DEFAULT NOW() NOT NULL,\n        subject text NOT NULL,\n        message TEXT NOT NULL,\n        parentmessageid BIGINT,\n        status messagestatus NOT NULL,\n        sender VARCHAR(200) REFERENCES users(email) ON DELETE RESTRICT,\n        receiver VARCHAR(200) REFERENCES users(email) ON DELETE RESTRICT\n        )";
            sent = "CREATE TABLE IF NOT EXISTS sent (\n        messageid BIGINT REFERENCES messages(messageid) ON DELETE CASCADE,\n        createdon TIMESTAMP(8) DEFAULT now(),\n        sender VARCHAR(200) REFERENCES users(email),\n        senderid BIGINT REFERENCES users(userid)\n   )";
            inBox = "CREATE TABLE IF NOT EXISTS inbox (\n        messageid BIGINT REFERENCES messages(messageid) ON DELETE CASCADE,\n        createdon TIMESTAMP(8) DEFAULT now(),\n        status messagestatus NOT NULL,\n        receiverusername VARCHAR(200) REFERENCES users(email) ON DELETE RESTRICT,\n        receiverid BIGINT REFERENCES users(userid) ON DELETE RESTRICT\n   )";
            group = "CREATE TABLE IF NOT EXISTS groups (\n    groupid bigserial PRIMARY KEY UNIQUE NOT NULL,\n    groupname VARCHAR(200) NOT NULL,\n    createdon TIMESTAMP(8) DEFAULT now(),\n    creator VARCHAR(200) REFERENCES users(email)\n)";
            groupMembers = "CREATE TABLE IF NOT EXISTS groupmembers (\n  groupid bigserial REFERENCES groups(groupid) NOT NULL,\n  memberemail VARCHAR(200) REFERENCES users(email),\n  addedon TIMESTAMP(8) DEFAULT now()\n)";
            _context2.next = 11;
            return _bcrypt.default.genSalt(10);

          case 11:
            salt = _context2.sent;
            _context2.next = 14;
            return _bcrypt.default.hash('password', salt);

          case 14:
            hashedPassword = _context2.sent;
            addUserToUserTable = "INSERT into users (firstname, lastname, username, password, email, alternateemail) \n  VALUES ('otaigbe', 'okhueleigbe', 'otaigbe','".concat(hashedPassword, "', 'otaigbe@epicmail.com', 'otaigbe@gmail.com'),\n  ('osas', 'okhueleigbe', 'osas422','").concat(hashedPassword, "', 'osas422@epicmail.com', 'otaigbe@gmail.com'),\n  ('emmakhun', 'gearge', 'george','").concat(hashedPassword, "', 'george@epicmail.com', 'otaigbe@gmail.com'),\n  ('omo', 'osahon', 'osahon','").concat(hashedPassword, "', 'osahon@epicmail.com', 'otaigbe@gmail.com'),\n  ('ade', 'Ehi', 'ade','").concat(hashedPassword, "', 'ade@epicmail.com', 'otaigbe@gmail.com'),\n  ('fidelis', 'christmas', 'fidelis','").concat(hashedPassword, "', 'fidelis@epicmail.com', 'otaigbe@gmail.com'),\n  ('felicia', 'okhueleigbe', 'felicitas','").concat(hashedPassword, "', 'felicitas@epicmail.com', 'otaigbe@gmail.com')");
            addMessagesToMessageTable = "INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver)\n  VALUES \n  ('subject', 'messagebody', null, 'draft', 'felicitas@epicmail.com', null),\n  ('subject of mail', 'body of mail', null, 'sent', 'osas422@epicmail.com', 'felicitas@epicmail.com'),\n  ('another test subject', 'body of this email', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com'),\n  ('message for osas', 'Just created more and more ad more test message', null, 'sent', 'otaigbe@epicmail.com', 'osas422@epicmail.com'),\n  ('message for osas',  'Just created more and more and more test message', null, 'sent',  'otaigbe@epicmail.com',  'osas422@epicmail.com'),\n  ('message for osas',  'ths is the message body i am experimenting with', null, 'sent', 'otaigbe@epicmail.com', 'osas422@epicmail.com'),\n  ('message for osas',  'can you feel me', null, 'sent',  'otaigbe@epicmail.com',  'osas422@epicmail.com'),\n  ('message for osas',  'sucker free boss', null, 'sent',  'otaigbe@epicmail.com',  'osas422@epicmail.com'),\n  ('message for osas',  'sucker free boss',  null,  'sent', 'otaigbe@epicmail.com',  'osas422@epicmail.com'),\n  ('message for otaigbe',  'Are you there', null, 'sent',  'osas422@epicmail.com',  'otaigbe@epicmail.com'),\n  ('message for otaigbe', 'You dey there', null, 'sent', 'osas422@epicmail.com', 'otaigbe@epicmail.com'),\n  ('message for otaigbe', 'Whats up', null, 'sent', 'osas422@epicmail.com', 'otaigbe@epicmail.com'),\n  ('message for otaigbe', 'Whats up? Are you there', null, 'sent', 'osas422@epicmail.com', 'otaigbe@epicmail.com'),\n  ('message for otaigbe', 'Whats up? Are you there', null, 'sent', 'osas422@epicmail.com', 'otaigbe@epicmail.com'),\n  ('message for otaigbe', 'Just created message', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com'),\n  ('message for otaigbe', 'go home', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com'),\n  ('message for otaigbe', 'where are you', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com')";
            insertIntoInbox = "INSERT INTO inbox (messageid, status, receiverusername) VALUES \n(4,'unread', 'osas422@epicmail.com'),\n(5,'unread', 'osas422@epicmail.com'), \n(6,'unread', 'osas422@epicmail.com'), \n(7,'unread', 'osas422@epicmail.com'), \n(8,'unread', 'osas422@epicmail.com'), \n(9,'unread', 'otaigbe@epicmail.com'), \n(10,'unread', 'otaigbe@epicmail.com'), \n(11,'unread', 'otaigbe@epicmail.com'), \n(12,'unread', 'otaigbe@epicmail.com'), \n(13,'unread', 'otaigbe@epicmail.com'), \n(14,'unread', 'otaigbe@epicmail.com'), \n(15,'unread', 'otaigbe@epicmail.com'), \n(16,'unread', 'otaigbe@epicmail.com'), \n(17,'unread', 'otaigbe@epicmail.com')";
            insertIntosent = "INSERT INTO sent (messageid, sender, senderid) VALUES \n(4, 'otaigbe@epicmail.com', 1),\n(5, 'otaigbe@epicmail.com', 1),\n(6, 'otaigbe@epicmail.com', 1),\n(7, 'otaigbe@epicmail.com', 1),\n(8, 'otaigbe@epicmail.com', 1),\n(9, 'osas422@epicmail.com', 2),\n(10, 'osas422@epicmail.com', 2),\n(11, 'osas422@epicmail.com', 2),\n(12, 'osas422@epicmail.com', 2),\n(13, 'osas422@epicmail.com', 2),\n(14, 'felicitas@epicmail.com', 3),\n(15, 'felicitas@epicmail.com', 3),\n(16, 'felicitas@epicmail.com', 3),\n(17, 'felicitas@epicmail.com', 3)";
            insertIntoGroup = "INSERT into groups (groupname, creator) VALUES ('team', 'otaigbe@epicmail.com'),\n                                                                         ('pals', 'otaigbe@epicmail.com'), \n                                                                         ('acquaintances', 'otaigbe@epicmail.com')";
            insertIntoGroupMembers = "INSERT into groupmembers (groupid, memberemail) VALUES (2, 'felicitas@epicmail.com'), \n                                                                                         (2, 'osas422@epicmail.com')";

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
                        _context.next = 28;
                        return client.query(insertIntoInbox);

                      case 28:
                        _context.next = 30;
                        return client.query(insertIntosent);

                      case 30:
                        _context.next = 32;
                        return client.query(insertIntoGroup);

                      case 32:
                        _context.next = 34;
                        return client.query(insertIntoGroupMembers);

                      case 34:
                        console.log('Tables created and Populated');
                        _context.next = 40;
                        break;

                      case 37:
                        _context.prev = 37;
                        _context.t0 = _context["catch"](1);
                        console.log(_context.t0);

                      case 40:
                        client.release();
                        process.exit();

                      case 42:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[1, 37]]);
              }));

              return function (_x, _x2) {
                return _ref.apply(this, arguments);
              };
            }());

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createSchema.apply(this, arguments);
}

createSchema();