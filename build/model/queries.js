"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var queries = {};
queries.selectAllMessagesFromInbox = 'SELECT * FROM inbox';
queries.selectAllUnreadMessages = 'SELECT * FROM inbox WHERE status = $1';
queries.selectAllUnreadMessagesForAParticularUser = 'SELECT messages.messageid, inbox.status, inbox.receiverusername, messages.sender, messages.createdon, messages.subject, messages.message, messages.parentmessageid FROM inbox JOIN messages ON (messages.messageid = inbox.messageid) WHERE inbox.receiverusername = $1 AND inbox.status = $2';
queries.selectAllSentEmails = 'SELECT * FROM sent';
queries.selectAllSentEmailsForAParticularUser = 'SELECT sent.messageid, messages.status, messages.receiver, messages.sender, messages.createdon, messages.subject, messages.message, messages.parentmessageid FROM sent JOIN messages ON (messages.messageid = sent.messageid) WHERE sent.sender = $1;';
queries.checkIfUserAlreadyHasGroupWithGroupName = 'SELECT * FROM groups WHERE groupname = $1 AND creator = $2';
queries.checkIfUserOwnsTheGroupAboutToBeDeleted = 'SELECT * FROM groups WHERE groupid = $1 AND creator = $2';
queries.deleteGroupById = 'DELETE FROM groups WHERE groupid = $1 AND creator = $2';
queries.selectAllGroupsCreatedByAUser = 'SELECT * FROM groups WHERE creator = $1';
queries.renameGroup = 'UPDATE groups SET groupname = $1 WHERE groupid = $2 AND creator = $3';
queries.insertNewMembersIntoGroup = 'INSERT INTO groupmembers (groupid, memberemail) VALUES ($1,$2)';
queries.CheckIfUserIsAlreadyAMember = 'SELECT * FROM groupmembers WHERE groupid = $1 AND memberemail = $2';
queries.deleteUserFromASpecificGroup = 'Delete from groupmembers WHERE groupid = $1 AND memberemail = $2'; // queries.selectAllMembersOfAPraticularGroup = 'SELECT memberemail FROM groupmembers WHERE groupid = $1';
// queries.insertIntoMessageInboxOutboxForGroup = ``
// queries.retractEmail = ``;

queries.selectEmailById = 'SELECT * FROM messages WHERE messageid = $1';
queries.selectEmailByIdForParticularUser = 'SELECT * FROM messages WHERE messageid = $1 AND sender = $2';
queries.deleteQueryById = 'DELETE FROM messages WHERE messageid = $1';
queries.deleteQueryByIdForParticularUser = 'DELETE FROM messages WHERE messageid = $1 AND sender = $2';
queries.createGroup = 'INSERT INTO groups (groupname, creator) VALUES ($1, $2) returning groupid';
queries.checkForAlreadyExistentUser = 'SELECT * FROM users where username = $1';
queries.insertNewUser = 'INSERT into users (firstname, lastname, username, password, email, alternateemail) VALUES ($1, $2, $3, $4, $5, $6)';
queries.searchForEmail = 'SELECT * FROM users WHERE email = $1';
queries.insertIntoMessageInboxOutbox = "WITH insertres AS (\n    INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver)\n    VALUES ($1, $2, $3, $4, $5, $6)\n      RETURNING messageid\n   ), insertres2 AS (\n   insert into inbox (messageid, status, receiverusername) values ((SELECT messageid FROM insertres), 'unread', $6)\n   )\n   insert into sent (messageid, sender, senderid) values ((SELECT messageid FROM insertres), $5, $7) returning messageid";
queries.insertMessageAsDraft = 'INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver) VALUES ($1, $2, $3, $4, $5, $6)';
queries.selectAllMessagesFromInboxBelongingToAParticularUser = 'SELECT * FROM inbox JOIN messages ON (messages.messageid = inbox.messageid) WHERE inbox.receiverusername = $1';
var _default = queries;
exports.default = _default;