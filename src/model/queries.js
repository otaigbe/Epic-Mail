// const queries = {};

// queries.selectAllMessagesFromInbox = 'SELECT * FROM inbox';
// queries.selectAllUnreadMessages = 'SELECT * FROM inbox WHERE status = $1';
// queries.selectAllUnreadMessagesForAParticularUser = 'SELECT messages.messageid, inbox.status, inbox.receiverusername, messages.sender, messages.createdon, messages.subject, messages.messagebody, messages.parentmessageid FROM inbox JOIN messages ON (messages.messageid = inbox.messageid) WHERE inbox.receiverusername = $1 AND inbox.status = $2';
// queries.selectAllSentEmails = 'SELECT * FROM sent';
// queries.selectAllSentEmailsForAParticularUser = 'SELECT sent.messageid, messages.status, messages.receiver, messages.sender, messages.createdon, messages.subject, messages.messagebody, messages.parentmessageid FROM sent JOIN messages ON (messages.messageid = sent.messageid) WHERE sent.sender = $1;';
// queries.checkIfUserAlreadyHasGroupWithGroupName = 'SELECT * FROM groups WHERE groupname = $1 AND creator = $2';
// queries.checkIfUserOwnsTheGroupAboutToBeDeleted = 'SELECT * FROM groups WHERE groupid = $1 AND creator = $2';
// queries.deleteGroupById = 'DELETE FROM groups WHERE groupid = $1 AND creator = $2';
// queries.selectAllGroupsCreatedByAUser = 'SELECT * FROM groups WHERE creator = $1';
// queries.renameGroup = 'UPDATE groups SET groupname = $1 WHERE groupid = $2 AND creator = $3';
// queries.insertNewMembersIntoGroup = `WITH selectres AS ( SELECT * FROM users WHERE email = $2)
// insert into groupmembers (groupid, memberemail, memberid) values ($1, $2, (SELECT userid FROM selectres))`;
// queries.CheckIfUserIsAlreadyAMember = 'SELECT * FROM groupmembers WHERE groupid = $1 AND memberemail = $2';
// queries.CheckIfUserIsAlreadyAMemberDel = 'SELECT * FROM groupmembers WHERE groupid = $1 AND memberid = $2';
// queries.deleteUserFromASpecificGroup = 'Delete from groupmembers WHERE groupid = $1 AND memberid = $2';
// queries.selectAllMembersOfAPraticularGroup = 'SELECT memberemail FROM groupmembers WHERE groupid = $1';
// queries.checkIfUserExists = 'SELECT * FROM users WHERE email = $1 and alternateemail = $2';
// queries.selectEmailById = 'SELECT * FROM messages WHERE messageid = $1';
// queries.selectEmailByIdForParticularUser = 'SELECT * FROM messages WHERE (messageid = $1 AND receiver = $2) OR (messageid = $1 AND sender = $2)';
// queries.deleteQueryById = 'DELETE FROM messages WHERE messageid = $1';
// queries.deleteQueryByIdForParticularUser = 'DELETE FROM messages WHERE messageid = $1 AND sender = $2';
// queries.createGroup = 'INSERT INTO groups (groupname, creator, creatorid) VALUES ($1, $2, $3) returning groupid';
// queries.checkForAlreadyExistentUser = 'SELECT * FROM users where username = $1';
// queries.insertNewUser = 'INSERT into users (firstname, lastname, username, password, email, alternateemail) VALUES ($1, $2, $3, $4, $5, $6) returning userid';
// queries.searchForEmail = 'SELECT * FROM users WHERE email = $1';
// queries.insertIntoMessageInboxOutbox = `WITH insertres AS (
//     INSERT INTO messages (subject, messagebody, parentmessageid, status, sender, receiver)
//     VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING messageid
//    ), insertres2 AS (
//    insert into inbox (messageid, status, receiverusername) values ((SELECT messageid FROM insertres), 'unread', $6)
//    )
//    insert into sent (messageid, sender, senderid) values ((SELECT messageid FROM insertres), $5, $7) returning messageid`;
// queries.insertMessageAsDraft = 'INSERT INTO messages (subject, messagebody, parentmessageid, status, sender, receiver) VALUES ($1, $2, $3, $4, $5, $6) returning messageid';
// queries.selectAllMessagesFromInboxBelongingToAParticularUser = 'SELECT * FROM inbox JOIN messages ON (messages.messageid = inbox.messageid) WHERE inbox.receiverusername = $1';
// queries.checkIfGroupExists = 'SELECT * FROM groups WHERE groupid = $1';
// queries.searchForUser = 'SELECT * FROM users WHERE email = $1';
// queries.updatePassword = 'UPDATE users SET password = $1 WHERE email = $2 AND userid = $3';
// queries.checkIfEmailExists = 'SELECT * FROM users WHERE email = $1';
// queries.checkIfMessageExists = 'SELECT * FROM messages WHERE messageid = $1';
// export default queries;

export default class Queries {
  static get insertIntoMessageInboxOutbox() {
    return `WITH insertres AS ( INSERT INTO messages (subject, messagebody, parentmessageid, status, sender, receiver)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING messageid ), insertres2 AS ( insert into inbox (messageid, status, receiverusername) values ((SELECT messageid FROM insertres), 'unread', $6)
         ) insert into sent (messageid, sender, senderid) values ((SELECT messageid FROM insertres), $5, $7) returning messageid`;
  }

  static get selectAllUnreadMessagesForAParticularUser() {
    return 'SELECT messages.messageid, inbox.status, inbox.receiverusername, messages.sender, messages.createdon, messages.subject, messages.messagebody, messages.parentmessageid FROM inbox JOIN messages ON (messages.messageid = inbox.messageid) WHERE inbox.receiverusername = $1 AND inbox.status = $2';
  }

  static get selectAllSentEmailsForAParticularUser() {
    return 'SELECT sent.messageid, messages.status, messages.receiver, messages.sender, messages.createdon, messages.subject, messages.messagebody, messages.parentmessageid FROM sent JOIN messages ON (messages.messageid = sent.messageid) WHERE sent.sender = $1';
  }

  static get insertNewUser() {
    return 'INSERT into users (firstname, lastname, username, password, email, alternateemail) VALUES ($1, $2, $3, $4, $5, $6) returning userid';
  }

  static get insertMessageAsDraft() {
    return 'INSERT INTO messages (subject, messagebody, parentmessageid, status, sender, receiver) VALUES ($1, $2, $3, $4, $5, $6) returning messageid';
  }

  static get checkForAlreadyExistentUser() {
    return 'SELECT * FROM users where username = $1';
  }

  static get searchForEmail() {
    return 'SELECT * FROM users WHERE email = $1';
  }

  static get checkIfEmailExists() {
    return 'SELECT * FROM users WHERE email = $1';
  }

  static get selectAllMessagesFromInboxBelongingToAParticularUser() {
    return 'SELECT * FROM inbox JOIN messages ON (messages.messageid = inbox.messageid) WHERE inbox.receiverusername = $1';
  }

  static get selectEmailByIdForParticularUser() {
    return 'SELECT * FROM messages WHERE (messageid = $1 AND receiver = $2) OR (messageid = $1 AND sender = $2)';
  }

  static get selectAllGroupsCreatedByAUser() {
    return 'SELECT * FROM groups WHERE creator = $1';
  }
}
