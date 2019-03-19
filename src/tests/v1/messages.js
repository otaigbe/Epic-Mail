/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the messages Endpoint', () => {
  describe('Testing the save/send mail Endpoint', () => {
    it('should save and send a message successfully', async () => {
      const res = await chai.request(app).post('/api/v1/messages').type('form').send({
        subject: 'oiiuyizsgrtfhtuyoiuo',
        message: 'Just created this test message',
        receiver: 'otaigbe@epicmail.com',
        sender: 'osas422@epicmail.com',
      });
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body.data).to.have.property('message');
    });

    it('should save a message as draft', async () => {
      const res = await chai.request(app).post('/api/v1/messages').type('form').send({
        sender: 'osas422@epicmail.com',
        subject: 'oiiuyizsgrtfhtuyoiuo',
        message: 'Just created this message',
      });
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body.data).to.have.property('message');
    });
    it('should return a validation error', async () => {
      const res = await chai.request(app).post('/api/v1/messages').type('form').send({
        to: 'stanley@epicmail.com',
        subject: '',
        message: 'tthyth thn4thnbet thntrhnth t thynthne tne etyne tjne tjntetjnh tjnt eyn',
      });
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
      chai.expect(res.body.error.message).to.eql('Something wrong with input!');
    });
  });

  describe('Testing the get all received email Endpoint', () => {
    it('should get all emails where status is received', async () => {
      const res = await chai.request(app).get('/api/v1/messages');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body.data).to.have.property('message');
    });
  });

  describe('Testing the get all unread emails Endpoint', () => {
    it('should get all emails where status is unread', async () => {
      const res = await chai.request(app).get('/api/v1/messages/unread');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body.data).to.have.property('message');
    });
  });

  describe('Testing the get all sent emails Endpoint', () => {
    it('should get all emails where type is sent', async () => {
      const res = await chai.request(app).get('/api/v1/messages/sent');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body.data).to.have.property('message');
    });
  });

  describe('Testing the get specific users email by Id Endpoint', () => {
    it('should get a specific users email by Id', async () => {
      const res = await chai.request(app).get('/api/v1/messages/1');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body.data).to.have.property('message');
    });

    it('should return a message not found error message', async () => {
      const res = await chai.request(app).get('/api/v1/messages/19300');
      chai.expect(res).to.have.status(404);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
      chai.expect(res.body.error).to.have.property('message');
    });
  });

  describe('Testing the Delete email by Id Endpoint', () => {
    it('should delete a specific users email by Id', async () => {
      const res = await chai.request(app).get('/api/v1/messages/3');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body.data).to.have.property('message');
    });

    it('should return a message not found error and deletion incomplete message', async () => {
      const res = await chai.request(app).get('/api/v1/messages/19300');
      chai.expect(res).to.have.status(404);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
      chai.expect(res.body.error).to.have.property('message');
    });
  });
});
