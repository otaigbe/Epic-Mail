export default class Queries {
  static get insertIntoMessageInboxOutbox() {
    return `WITH insertres AS ( INSERT INTO messages (subject, messagebody, parentmessageid, sender, receiver)
          VALUES ($1, $2, $3, $4, $5) RETURNING messageid ), insertres2 AS ( insert into inbox (messageid, status, receiverusername) values ((SELECT messageid FROM insertres), 'unread', $5)
         ) insert into sent (messageid, sender, senderid, status) values ((SELECT messageid FROM insertres), $4, $6, 'sent') returning messageid`;
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
    return 'INSERT INTO messages (subject, messagebody, parentmessageid, status, sender, receiver) VALUES ($1, $2, $3, $4, $5, $6) returning *';
  }

  static get getAllMembersOfAGroup() {
    return 'SELECT * FROM groupmembers JOIN users ON (users.userid = groupmembers.memberid) WHERE groupid = $1';
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
    return 'SELECT messages.messageid, inbox.status, inbox.receiverusername, messages.sender, messages.createdon, messages.subject, messages.parentmessageid FROM inbox JOIN messages ON (messages.messageid = inbox.messageid) WHERE inbox.receiverusername = $1';
  }

  static get selectEmailByIdForParticularUser() {
    return 'SELECT * FROM messages WHERE (messageid = $1 AND receiver = $2) OR (messageid = $1 AND sender = $2)';
  }

  static get selectAllGroupsCreatedByAUser() {
    return 'SELECT * FROM groups WHERE creator = $1';
  }

  static get checkIfUserAlreadyHasGroupWithGroupName() {
    return 'SELECT * FROM groups WHERE groupname = $1 AND creator = $2';
  }

  static get createGroup() {
    return 'INSERT INTO groups (groupname, creator, creatorid) VALUES ($1, $2, $3) returning groupid';
  }

  static get deleteQueryByIdForParticularUserFromInbox() {
    return 'DELETE FROM inbox WHERE messageid = $1 AND receiverusername = $2';
  }

  static get getAllDraftMessages() {
    return 'SELECT * FROM messages WHERE status = $1 AND sender = $2';
  }

  static get getDraftMessageById() {
    return 'SELECT * FROM messages WHERE status = $1 AND sender = $2 AND messageid = $3';
  }

  static get checkIfUserOwnsTheGroupAboutToBeDeleted() {
    return 'SELECT * FROM groups WHERE groupid = $1 AND creator = $2';
  }

  static get checkIfUserIsAlreadyAMember() {
    return 'SELECT * FROM groupmembers WHERE groupid = $1 AND memberemail = $2';
  }

  static get insertNewMembersIntoGroup() {
    return `WITH selectres AS ( SELECT * FROM users WHERE email = $2)
     insert into groupmembers (groupid, memberemail, memberid) values ($1, $2, (SELECT userid FROM selectres))`;
  }

  static get deleteGroupById() {
    return 'DELETE FROM groups WHERE groupid = $1 AND creator = $2 RETURNING *';
  }

  static get renameGroup() {
    return 'UPDATE groups SET groupname = $1 WHERE groupid = $2 AND creator = $3 RETURNING *';
  }
}
