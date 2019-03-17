const queries = {};

queries.selectAllMessagesFromInbox = 'SELECT * FROM inbox';
queries.selectAllUnreadMessages = 'SELECT * FROM inbox WHERE status = $1';
queries.selectAllSentEmails = 'SELECT * FROM sent';
queries.checkIfUserAlreadyHasGroupWithGroupName = 'SELECT * FROM groups WHERE groupname = $1 AND creator = $2';
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