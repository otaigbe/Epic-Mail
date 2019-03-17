"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var queries = {};
queries.selectAllMessagesFromInbox = 'SELECT * FROM inbox';
queries.selectAllUnreadMessages = 'SELECT * FROM inbox WHERE status = $1';
queries.selectAllSentEmails = 'SELECT * FROM sent';
queries.selectEmailById = 'SELECT * FROM messages WHERE messageid = $1';
queries.deleteQueryById = 'DELETE FROM messages WHERE messageid = $1';
queries.checkForAlreadyExistentUser = 'SELECT * FROM users where username = $1';
queries.insertNewUser = 'INSERT into users (firstname, lastname, username, password, email, alternateemail) VALUES ($1, $2, $3, $4, $5, $6)';
queries.searchForEmail = 'SELECT email, password FROM users WHERE email = $1';
queries.insertIntoMessageInboxOutbox = "WITH insertres AS (\n    INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver)\n    VALUES ($1, $2, $3, $4, $5, $6)\n      RETURNING messageid\n   ), insertres2 AS (\n   insert into inbox (messageid, status, receiverusername) values ((SELECT messageid FROM insertres), 'unread', $6)\n   )\n   insert into sent (messageid, sender) values ((SELECT messageid FROM insertres), $5) returning messageid";
queries.insertMessageAsDraft = 'INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver) VALUES ($1, $2, $3, $4, $5, $6)';
var _default = queries;
exports.default = _default;