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
        parentmessageid BIGINT,
        status messagestatus NOT NULL,
        sender VARCHAR(200) REFERENCES users(email) ON DELETE RESTRICT,
        receiver VARCHAR(200) REFERENCES users(email) ON DELETE RESTRICT
                );


CREATE TABLE sent (
        messageid BIGINT REFERENCES messages(messageid) ON DELETE CASCADE,
        createdon TIMESTAMP(6) DEFAULT now(),
        sender VARCHAR(200) REFERENCES users(email),
        senderid BIGINT REFERENCES users(userid)

   );

   CREATE TABLE inbox (
        messageid BIGINT REFERENCES messages(messageid) ON DELETE CASCADE,
        createdon TIMESTAMP(6) DEFAULT now(),
        status messagestatus NOT NULL,
        receiverusername VARCHAR(200) REFERENCES users(email) ON DELETE RESTRICT,
        receiverid BIGINT REFERENCES users(userid) ON DELETE RESTRICT   
        );

CREATE TABLE groups (
    groupid bigserial PRIMARY KEY UNIQUE NOT NULL,
    groupname VARCHAR(200) NOT NULL,
    createdon TIMESTAMP(6) DEFAULT now(),
    creator VARCHAR(200) REFERENCES users(email),
    creatorid bigint

);
  CREATE TABLE groupmembers (
  groupid bigserial REFERENCES groups(groupid) NOT NULL,
  memberemail VARCHAR(200) REFERENCES users(email),
  memberid bigint,
  addedon TIMESTAMP(6) DEFAULT now()
);


 INSERT into users (firstname, lastname, username, password, email, alternateemail) 
  VALUES ('otaigbe', 'okhueleigbe', 'otaigbe','$2b$10$y26i0lpO492wmyy53QG58uMlbtMYNz7gem5PoNgpxbZ4wmo7.HQbe', 'otaigbe@epicmail.com', 'stanlex4400@gmail.com'),
  ('osas', 'okhueleigbe', 'osas422','$2b$10$y26i0lpO492wmyy53QG58uMlbtMYNz7gem5PoNgpxbZ4wmo7.HQbe', 'osas422@epicmail.com', 'otaigbe@gmail.com'),
  ('emmakhun', 'gearge', 'george','$2b$10$y26i0lpO492wmyy53QG58uMlbtMYNz7gem5PoNgpxbZ4wmo7.HQbe', 'george@epicmail.com', 'otaigbe@gmail.com'),
  ('omo', 'osahon', 'osahon','$2b$10$y26i0lpO492wmyy53QG58uMlbtMYNz7gem5PoNgpxbZ4wmo7.HQbe', 'osahon@epicmail.com', 'otaigbe@gmail.com'),
  ('ade', 'Ehi', 'ade','$2b$10$y26i0lpO492wmyy53QG58uMlbtMYNz7gem5PoNgpxbZ4wmo7.HQbe', 'ade@epicmail.com', 'otaigbe@gmail.com'),
  ('fidelis', 'christmas', 'fidelis','$2b$10$y26i0lpO492wmyy53QG58uMlbtMYNz7gem5PoNgpxbZ4wmo7.HQbe', 'fidelis@epicmail.com', 'otaigbe@gmail.com'),
  ('felicia', 'okhueleigbe', 'felicitas','$2b$10$y26i0lpO492wmyy53QG58uMlbtMYNz7gem5PoNgpxbZ4wmo7.HQbe', 'felicitas@epicmail.com', 'otaigbe@gmail.com');


INSERT INTO messages (subject, message, parentmessageid, status, sender, receiver)
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
  ('message for otaigbe', 'where are you', null, 'sent', 'felicitas@epicmail.com', 'otaigbe@epicmail.com');


  INSERT INTO inbox (messageid, status, receiverusername) 
  VALUES 
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
          (17,'unread', 'otaigbe@epicmail.com');

INSERT INTO sent (messageid, sender, senderid) 
VALUES 
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
      (17, 'felicitas@epicmail.com', 3);

INSERT into groups (groupname, creator, creatorid) 
VALUES ('team', 'otaigbe@epicmail.com', 1), ('pals', 'otaigbe@epicmail.com', 1),('acquaintances', 'otaigbe@epicmail.com', 1);

INSERT into groupmembers (groupid, memberemail, memberid) VALUES (2, 'felicitas@epicmail.com', 7),(2, 'osas422@epicmail.com', 2);