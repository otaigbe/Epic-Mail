import conf from 'dotenv';
import format from 'pg-format';
import bcrypt from 'bcrypt';
import pool from './dbConnect';
import messages from '../fixtures/messages';

conf.config();

async function createSchema() {
  const dropType = 'DROP TYPE IF EXISTS status cascade';
  const dropMessageType = 'DROP TYPE IF EXISTS messagetype cascade';
  const createTypeStatus = 'CREATE TYPE status AS ENUM(\'read\', \'unread\', \'draft\', \'sent\')';
  const createTypeMessageType = 'CREATE TYPE messagetype AS ENUM(\'received\', \'sent\', \'draft\')';

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
        parentmessageid BIGINT REFERENCES messages(messageid),
        status STATUS NOT NULL,
        creator BIGINT REFERENCES users(userid),
        sentto VARCHAR(200) REFERENCES users(email),
        receivedfrom VARCHAR(200) REFERENCES users(email),
        messagetype messagetype NOT NULL
        )`;

  const sent = `CREATE TABLE IF NOT EXISTS sent (
        senderid BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
        messageid BIGINT REFERENCES messages(messageid),
        createdon TIMESTAMP(8) DEFAULT now() 
   )`;
  const inBox = `CREATE TABLE IF NOT EXISTS inbox (
        receiverid bigserial PRIMARY KEY UNIQUE NOT NULL,
        messageid BIGINT REFERENCES messages(messageid),
        createdon TIMESTAMP(8) DEFAULT now()
   )`;
  const group = `CREATE TABLE IF NOT EXISTS groups (
    groupid bigserial PRIMARY KEY UNIQUE NOT NULL,
    groupname VARCHAR(200) NOT NULL,
    createdon TIMESTAMP(8) DEFAULT now(),
    creator BIGINT REFERENCES users(userid)
)`;
  const groupMembers = `CREATE TABLE IF NOT EXISTS groupmembers (
  groupid bigserial PRIMARY KEY UNIQUE NOT NULL,
  memberid BIGINT REFERENCES users(userid),
  addedon TIMESTAMP(8) DEFAULT now()
)`;


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password', salt);
  const addUserToUserTable = `INSERT into users (firstname, lastname, username, password, email, alternateemail) 
  VALUES ('otaigbe', 'okhueleigbe', 'otaigbe','${hashedPassword}', 'otaigbe@epicmail.com', 'otaigbe@gmail.com'),
  ('osas', 'okhueleigbe', 'osas422','${hashedPassword}', 'osas422@epicmail.com', 'otaigbe@gmail.com'),
  ('felicia', 'okhueleigbe', 'felicitas','${hashedPassword}', 'felicitas@epicmail.com', 'otaigbe@gmail.com')`;
  // let addMessagesToMessageTable = 'INSERT into messages () VALUES ';
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
  const addMessagesToMessageTable = `INSERT INTO messages (subject, message, parentmessageid, status, creator, sentto, receivedfrom, messagetype)
  VALUES ('rdtrfr ffafrge f g r  gg g', 'e wre wt e rewer gwerere', null, 'draft', 2, 'felicitas@epicmail.com', null, 'draft'),
  ('sadasds sdsf f f dsf sgf etgf retg g gt', 'ewtwereb rgwerehgw reg rehrh ge trtrt gwrgewreg eg', null, 'draft', 3, 'osas422@epicmail.com', null, 'sent'),
  ('ewtrwer w4rwr gere', 'qwrewrr wefrwr  rgrw rgwtrgw trgwrgwegrwtrg', null, 'unread', 1, null, 'felicitas@epicmail.com', 'received')`;
  pool.connect(async (err, client) => {
    if (err) console.log(err);
    try {
      await client.query('DROP TABLE IF EXISTS users, messages, sent, groups cascade');
      await client.query(dropType);
      await client.query(dropMessageType);
      await client.query(createTypeStatus);
      await client.query(createTypeMessageType);
      await client.query(createUserTable);
      await client.query(createMessageTable);
      await client.query(inBox);
      await client.query(sent);
      await client.query(group);
      await client.query(groupMembers);
      await client.query(addUserToUserTable);
      await client.query(addMessagesToMessageTable);
      console.log('Tables created and Populated');
    } catch (error) {
      console.log(error);
    }
    client.release();
    process.exit();
  });
}

createSchema();
