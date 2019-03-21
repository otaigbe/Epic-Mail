import conf from 'dotenv';
import bcrypt from 'bcrypt';
import pool from './dbConnect';

conf.config();

async function createSchema() {
  const dropType = 'DROP TYPE IF EXISTS messagestatus cascade';
  const dropMessageType = 'DROP TYPE IF EXISTS messagetype cascade';
  const createTypeStatus = 'CREATE TYPE messagestatus AS ENUM(\'read\', \'unread\', \'draft\', \'sent\')';

  const createUserTable = `CREATE TABLE IF NOT EXISTS users (
        userid bigserial PRIMARY KEY UNIQUE NOT NULL,
        firstname VARCHAR(200) NOT NULL,
        lastname VARCHAR(200) NOT NULL,
        username VARCHAR(200) UNIQUE NOT NULL,
        password VARCHAR(500) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        alternateemail VARCHAR(500) NOT NULL
    )`;

  const createMessageTable = `CREATE TABLE IF NOT EXISTS messages (
        messageid bigserial PRIMARY KEY UNIQUE NOT NULL,
        createdon TIMESTAMP DEFAULT NOW() NOT NULL,
        subject text NOT NULL,
        message TEXT NOT NULL,
        parentmessageid BIGINT,
        status messagestatus NOT NULL,
        sender VARCHAR(200) REFERENCES users(email) ON DELETE RESTRICT,
        receiver VARCHAR(200) REFERENCES users(email) ON DELETE RESTRICT
        )`;

  const sent = `CREATE TABLE IF NOT EXISTS sent (
        messageid BIGINT REFERENCES messages(messageid) ON DELETE CASCADE,
        createdon TIMESTAMP(8) DEFAULT now(),
        sender VARCHAR(200) REFERENCES users(email),
        senderid BIGINT REFERENCES users(userid)
   )`;
  const inBox = `CREATE TABLE IF NOT EXISTS inbox (
        messageid BIGINT REFERENCES messages(messageid) ON DELETE CASCADE,
        createdon TIMESTAMP(8) DEFAULT now(),
        status messagestatus NOT NULL,
        receiverusername VARCHAR(200) REFERENCES users(email) ON DELETE RESTRICT,
        receiverid BIGINT REFERENCES users(userid) ON DELETE RESTRICT
   )`;
  const group = `CREATE TABLE IF NOT EXISTS groups (
    groupid bigserial PRIMARY KEY UNIQUE NOT NULL,
    groupname VARCHAR(200) NOT NULL,
    createdon TIMESTAMP(8) DEFAULT now(),
    creator VARCHAR(200) REFERENCES users(email),
    creatorid bigint
)`;
  const groupMembers = `CREATE TABLE IF NOT EXISTS groupmembers (
  groupid bigserial REFERENCES groups(groupid) NOT NULL,
  memberemail VARCHAR(200) REFERENCES users(email),
  memberid bigint,
  addedon TIMESTAMP(8) DEFAULT now()
)`;


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password', salt);
  const addUserToUserTable = `INSERT into users (firstname, lastname, username, password, email, alternateemail) 
  VALUES ('otaigbe', 'okhueleigbe', 'otaigbe','${hashedPassword}', 'otaigbe@epicmail.com', 'stanlex4400@gmail.com'),
  ('osas', 'okhueleigbe', 'osas422','${hashedPassword}', 'osas422@epicmail.com', 'otaigbe@gmail.com'),
  ('emmakhun', 'gearge', 'george','${hashedPassword}', 'george@epicmail.com', 'otaigbe@gmail.com'),
  ('omo', 'osahon', 'osahon','${hashedPassword}', 'osahon@epicmail.com', 'otaigbe@gmail.com'),
  ('ade', 'Ehi', 'ade','${hashedPassword}', 'ade@epicmail.com', 'otaigbe@gmail.com'),
  ('fidelis', 'christmas', 'fidelis','${hashedPassword}', 'fidelis@epicmail.com', 'otaigbe@gmail.com'),
  ('felicia', 'okhueleigbe', 'felicitas','${hashedPassword}', 'felicitas@epicmail.com', 'otaigbe@gmail.com')`;

  const addMessagesToMessageTable = `INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver)
  VALUES 
  ('subject', 'messagebody', null, 'draft', 'felicitas@epicmail.com', null),
  ('subject of mail', 'body of mail', null, 'sent', 'osas422@epicmail.com', 'felicitas@epicmail.com'),
  ('another test subject', 'body of this email', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com'),
  ('message for osas', 'Just created more and more ad more test message', null, 'sent', 'otaigbe@epicmail.com', 'osas422@epicmail.com'),
  ('message for osas',  'Just created more and more and more test message', null, 'sent',  'otaigbe@epicmail.com',  'osas422@epicmail.com'),
  ('message for osas',  'ths is the message body i am experimenting with', null, 'sent', 'otaigbe@epicmail.com', 'osas422@epicmail.com'),
  ('message for osas',  'can you feel me', null, 'sent',  'otaigbe@epicmail.com',  'osas422@epicmail.com'),
  ('message for osas',  'sucker free boss', null, 'sent',  'otaigbe@epicmail.com',  'osas422@epicmail.com'),
  ('message for osas',  'sucker free boss',  null,  'sent', 'otaigbe@epicmail.com',  'osas422@epicmail.com'),
  ('message for otaigbe',  'Are you there', null, 'sent',  'osas422@epicmail.com',  'otaigbe@epicmail.com'),
  ('message for otaigbe', 'You dey there', null, 'sent', 'osas422@epicmail.com', 'otaigbe@epicmail.com'),
  ('message for otaigbe', 'Whats up', null, 'sent', 'osas422@epicmail.com', 'otaigbe@epicmail.com'),
  ('message for otaigbe', 'Whats up? Are you there', null, 'sent', 'osas422@epicmail.com', 'otaigbe@epicmail.com'),
  ('message for otaigbe', 'Whats up? Are you there', null, 'sent', 'osas422@epicmail.com', 'otaigbe@epicmail.com'),
  ('message for otaigbe', 'Just created message', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com'),
  ('message for otaigbe', 'go home', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com'),
  ('message for otaigbe', 'where are you', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com')`;

  const insertIntoInbox = `INSERT INTO inbox (messageid, status, receiverusername) VALUES 
(4,'unread', 'osas422@epicmail.com'),
(5,'unread', 'osas422@epicmail.com'), 
(6,'unread', 'osas422@epicmail.com'), 
(7,'unread', 'osas422@epicmail.com'), 
(8,'unread', 'osas422@epicmail.com'), 
(9,'unread', 'otaigbe@epicmail.com'), 
(10,'unread', 'otaigbe@epicmail.com'), 
(11,'unread', 'otaigbe@epicmail.com'), 
(12,'unread', 'otaigbe@epicmail.com'), 
(13,'unread', 'otaigbe@epicmail.com'), 
(14,'unread', 'otaigbe@epicmail.com'), 
(15,'unread', 'otaigbe@epicmail.com'), 
(16,'unread', 'otaigbe@epicmail.com'), 
(17,'unread', 'otaigbe@epicmail.com')`;

  const insertIntosent = `INSERT INTO sent (messageid, sender, senderid) VALUES 
(4, 'otaigbe@epicmail.com', 1),
(5, 'otaigbe@epicmail.com', 1),
(6, 'otaigbe@epicmail.com', 1),
(7, 'otaigbe@epicmail.com', 1),
(8, 'otaigbe@epicmail.com', 1),
(9, 'osas422@epicmail.com', 2),
(10, 'osas422@epicmail.com', 2),
(11, 'osas422@epicmail.com', 2),
(12, 'osas422@epicmail.com', 2),
(13, 'osas422@epicmail.com', 2),
(14, 'felicitas@epicmail.com', 3),
(15, 'felicitas@epicmail.com', 3),
(16, 'felicitas@epicmail.com', 3),
(17, 'felicitas@epicmail.com', 3)`;

  const insertIntoGroup = `INSERT into groups (groupname, creator, creatorid) VALUES ('team', 'otaigbe@epicmail.com', 1),
                                                                         ('pals', 'otaigbe@epicmail.com', 1), 
                                                                         ('acquaintances', 'otaigbe@epicmail.com', 1)`;

  const insertIntoGroupMembers = `INSERT into groupmembers (groupid, memberemail, memberid) VALUES (2, 'felicitas@epicmail.com', 7), 
                                                                                         (2, 'osas422@epicmail.com', 2)`;
  pool.connect(async (err, client) => {
    if (err) console.log(err);
    try {
      await client.query('DROP TABLE IF EXISTS users, messages, sent, inbox, groups, groupmembers cascade');
      await client.query(dropType);
      await client.query(dropMessageType);
      await client.query(createTypeStatus);
      // await client.query(createTypeMessageType);
      await client.query(createUserTable);
      await client.query(createMessageTable);
      await client.query(inBox);
      await client.query(sent);
      await client.query(group);
      await client.query(groupMembers);
      await client.query(addUserToUserTable);
      await client.query(addMessagesToMessageTable);
      await client.query(insertIntoInbox);
      await client.query(insertIntosent);
      await client.query(insertIntoGroup);
      await client.query(insertIntoGroupMembers);


      console.log('Tables created and Populated');
    } catch (error) {
      console.log(error);
    }
    client.release();
    process.exit();
  });
}

createSchema();
