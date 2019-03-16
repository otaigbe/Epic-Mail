-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS messages CASCADE;
-- DROP TABLE IF EXISTS sent CASCADE;
-- DROP TABLE IF EXISTS inbox CASCADE;
-- DROP TABLE IF EXISTS groups CASCADE;
-- DROP TABLE IF EXISTS groupmembers CASCADE;


DROP TYPE IF EXISTS status cascade;
DROP TYPE IF EXISTS messagetype cascade;
CREATE TYPE status AS ENUM('read', 'unread', 'draft', 'sent');
CREATE TYPE messagetype AS ENUM('received', 'sent', 'draft');

CREATE TABLE IF NOT EXISTS users (
        userid bigserial PRIMARY KEY UNIQUE NOT NULL,
        firstname VARCHAR(200) NOT NULL,
        lastname VARCHAR(200) NOT NULL,
        username VARCHAR(200) UNIQUE NOT NULL,
        password VARCHAR(500) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        alternateemail VARCHAR(500) NOT NULL
    );

CREATE TABLE IF NOT EXISTS messages (
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
        );


CREATE TABLE IF NOT EXISTS sent (
        senderid BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
        messageid BIGINT REFERENCES messages(messageid),
        createdon TIMESTAMP(6) DEFAULT now() 
   );

   CREATE TABLE IF NOT EXISTS inbox (
        receiverid bigserial PRIMARY KEY UNIQUE NOT NULL,
        messageid BIGINT REFERENCES messages(messageid),
        createdon TIMESTAMP(6) DEFAULT now()
   );
CREATE TABLE IF NOT EXISTS groups (
    groupid bigserial PRIMARY KEY UNIQUE NOT NULL,
    groupname VARCHAR(200) NOT NULL,
    createdon TIMESTAMP(6) DEFAULT now(),
    creator BIGINT REFERENCES users(userid)
);
  CREATE TABLE IF NOT EXISTS groupmembers (
  groupid bigserial PRIMARY KEY UNIQUE NOT NULL,
  memberid BIGINT REFERENCES users(userid),
  addedon TIMESTAMP(6) DEFAULT now()
);

INSERT into users (firstname, lastname, username, password, email, alternateemail) 
  VALUES ('otaigbe', 'okhueleigbe', 'otaigbe','${hashedPassword}', 'otaigbe@epicmail.com', 'otaigbe@gmail.com'),
  ('osas', 'okhueleigbe', 'osas422','${hashedPassword}', 'osas422@epicmail.com', 'otaigbe@gmail.com'),
  ('felicia', 'okhueleigbe', 'felicitas','${hashedPassword}', 'felicitas@epicmail.com', 'otaigbe@gmail.com');
  
INSERT INTO messages (subject, message, parentmessageid, status, creator, sentto, receivedfrom, messagetype)
  VALUES ('rdtrfr ffafrge f g r  gg g', 'e wre wt e rewer gwerere', null, 'draft', 2, 'felicitas@epicmail.com', null, 'draft'),
  ('sadasds sdsf f f dsf sgf etgf retg g gt', 'ewtwereb rgwerehgw reg rehrh ge trtrt gwrgewreg eg', null, 'draft', 3, 'osas422@epicmail.com', null, 'sent'),
  ('ewtrwer w4rwr gere', 'qwrewrr wefrwr  rgrw rgwtrgw trgwrgwegrwtrg', null, 'unread', 1, null, 'felicitas@epicmail.com', 'received');  