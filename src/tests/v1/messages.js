/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the messages Endpoint', () => {
  describe('Testing the save/send mail Endpoint', () => {
    it('should save a message successfully', async () => {
      const res = await chai.request(app).post('/api/v1/messages').type('form').send({
        to: 'stanley@epicmail.com',
        subject: 'No subject',
        message: 'tthyth thn4thnbet thntrhnth t thynthne tne etyne tjne tjntetjnh tjnt eyn',
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
      chai.expect(res).to.have.status(422);
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
});
