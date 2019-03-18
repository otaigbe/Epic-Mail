const queries = {};

queries.selectAllMessagesFromInbox = 'SELECT * FROM inbox';
queries.selectAllUnreadMessages = 'SELECT * FROM inbox WHERE status = $1';
queries.selectAllSentEmails = 'SELECT * FROM sent';
queries.checkIfUserAlreadyHasGroupWithGroupName = 'SELECT * FROM groups WHERE groupname = $1 AND creator = $2';
queries.checkIfUserOwnsTheGroupAboutToBeDeleted = 'SELECT * FROM groups WHERE groupid = $1 AND creator = $2';
queries.deleteGroupById = 'DELETE FROM groups WHERE groupid = $1 AND creator = $2';
queries.selectAllGroupsCreatedByAUser = 'SELECT * FROM groups WHERE creator = $1';
queries.renameGroup = 'UPDATE groups SET groupname = $1 WHERE groupid = $2 AND creator = $3';
queries.insertNewMembersIntoGroup = 'INSERT INTO groupmembers (groupid, memberemail) VALUES ($1,$2)';
queries.CheckIfUserIsAlreadyAMember = 'SELECT * FROM groupmembers WHERE groupid = $1 AND memberemail = $2';
queries.deleteUserFromASpecificGroup = 'Delete from groupmembers WHERE groupid = $1 AND memberemail = $2';
queries.selectEmailById = 'SELECT * FROM messages WHERE messageid = $1';
queries.deleteQueryById = 'DELETE FROM messages WHERE messageid = $1';
queries.createGroup = 'INSERT INTO groups (groupname, creator) VALUES ($1, $2) returning groupid';
queries.checkForAlreadyExistentUser = 'SELECT * FROM users where username = $1';
queries.insertNewUser = 'INSERT into users (firstname, lastname, username, password, email, alternateemail) VALUES ($1, $2, $3, $4, $5, $6)';
queries.searchForEmail = 'SELECT email, password FROM users WHERE email = $1';
queries.insertIntoMessageInboxOutbox = `WITH insertres AS (
    INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver)
    VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING messageid
   ), insertres2 AS (
   insert into inbox (messageid, status, receiverusername) values ((SELECT messageid FROM insertres), 'unread', $6)
   )
   insert into sent (messageid, sender) values ((SELECT messageid FROM insertres), $5) returning messageid`;
queries.insertMessageAsDraft = 'INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver) VALUES ($1, $2, $3, $4, $5, $6)';

export default queries;