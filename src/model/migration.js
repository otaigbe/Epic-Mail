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
    creator VARCHAR(200) REFERENCES users(email)
)`;
  const groupMembers = `CREATE TABLE IF NOT EXISTS groupmembers (
  groupid bigserial REFERENCES groups(groupid) NOT NULL,
  memberemail VARCHAR(200) REFERENCES users(email),
  addedon TIMESTAMP(8) DEFAULT now()
)`;


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password', salt);
  const addUserToUserTable = `INSERT into users (firstname, lastname, username, password, email, alternateemail) 
  VALUES ('otaigbe', 'okhueleigbe', 'otaigbe','${hashedPassword}', 'otaigbe@epicmail.com', 'otaigbe@gmail.com'),
  ('osas', 'okhueleigbe', 'osas422','${hashedPassword}', 'osas422@epicmail.com', 'otaigbe@gmail.com'),
  ('felicia', 'okhueleigbe', 'felicitas','${hashedPassword}', 'felicitas@epicmail.com', 'otaigbe@gmail.com')`;
  const addMessagesToMessageTable = `INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver)
  VALUES ('rdtrfr ffafrge f g r  gg g', 'e wre wt e rewer gwerere', null, 'draft', 'felicitas@epicmail.com', null),
  ('sadasds sdsf f f dsf sgf etgf retg g gt', 'ewtwereb rgwerehgw reg rehrh ge trtrt gwrgewreg eg', null, 'sent', 'osas422@epicmail.com', 'felicitas@epicmail.com'),
  ('ewtrwer w4rwr gere', 'qwrewrr wefrwr  rgrw rgwtrgw trgwrgwegrwtrg', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com')`;
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
      console.log('Tables created and Populated');
    } catch (error) {
      console.log(error);
    }
    client.release();
    process.exit();
  });
}

createSchema();
