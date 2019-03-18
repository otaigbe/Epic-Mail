DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS sent CASCADE;
DROP TABLE IF EXISTS inbox CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS groupmembers CASCADE;


DROP TYPE IF EXISTS status cascade;
DROP TYPE IF EXISTS messagetype cascade;
CREATE TYPE messagestatus AS ENUM('read', 'unread', 'draft', 'sent');

CREATE TABLE users (
        userid bigserial PRIMARY KEY UNIQUE NOT NULL,
        firstname VARCHAR(200) NOT NULL,
        lastname VARCHAR(200) NOT NULL,
        username VARCHAR(200) UNIQUE NOT NULL,
        password VARCHAR(500) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        alternateemail VARCHAR(500) NOT NULL
    );

CREATE TABLE messages (
        messageid bigserial PRIMARY KEY UNIQUE NOT NULL,
        createdon TIMESTAMP DEFAULT NOW() NOT NULL,
        subject text NOT NULL,
        message TEXT NOT NULL,
        parentmessageid BIGINT REFERENCES messages(messageid),
        status messagestatus NOT NULL,
        sender VARCHAR(200) REFERENCES users(email),
        receiver VARCHAR(200) REFERENCES users(email)
                );


CREATE TABLE sent (
        messageid BIGINT REFERENCES messages(messageid),
        createdon TIMESTAMP(6) DEFAULT now(),
        sender VARCHAR(200) REFERENCES users(email) NOT NULL
   );

   CREATE TABLE inbox (
        messageid BIGINT REFERENCES messages(messageid),
        createdon TIMESTAMP(6) DEFAULT now(),
        status messagestatus NOT NULL,
        receiverusername VARCHAR(200) REFERENCES users(email)
   );
CREATE TABLE groups (
    groupid bigserial PRIMARY KEY UNIQUE NOT NULL,
    groupname VARCHAR(200) NOT NULL,
    createdon TIMESTAMP(6) DEFAULT now(),
    creator VARCHAR(200) REFERENCES users(email)
);
  CREATE TABLE groupmembers (
  groupid bigserial REFERENCES groups(groupid) NOT NULL,
  groupid bigserial PRIMARY KEY UNIQUE NOT NULL,
  memberemail VARCHAR(200) REFERENCES users(email),
  addedon TIMESTAMP(6) DEFAULT now()
);

INSERT into users (firstname, lastname, username, password, email, alternateemail) 
  VALUES ('otaigbe', 'okhueleigbe', 'otaigbe','${hashedPassword}', 'otaigbe@epicmail.com', 'otaigbe@gmail.com'),
  ('osas', 'okhueleigbe', 'osas422','${hashedPassword}', 'osas422@epicmail.com', 'otaigbe@gmail.com'),
  ('felicia', 'okhueleigbe', 'felicitas','${hashedPassword}', 'felicitas@epicmail.com', 'otaigbe@gmail.com');
  
INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver)
  VALUES ('rdtrfr ffafrge f g r  gg g', 'e wre wt e rewer gwerere', null, 'draft', 'felicitas@epicmail.com', null),
  ('sadasds sdsf f f dsf sgf etgf retg g gt', 'ewtwereb rgwerehgw reg rehrh ge trtrt gwrgewreg eg', null, 'sent', 'osas422@epicmail.com', 'felicitas@epicmail.com'),
  ('ewtrwer w4rwr gere', 'qwrewrr wefrwr  rgrw rgwtrgw trgwrgwegrwtrg', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com')