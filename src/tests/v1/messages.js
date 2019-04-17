import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the messages Endpoint', () => {
  describe('Testing the save/send mail Endpoint', () => {
    it('should save and send a message successfully', async () => {
      const res = await chai.request(app).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: 'some random mail from test case',
          message: 'Just created this test message',
          receiver: 'felicitas@epicmail.com',
        });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });

    it('should throw a validation error for bad email input', async () => {
      const res = await chai.request(app).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: 'oiiuyizsgrtfhtuyoiuo',
          message: 'Just created this test message',
          receiver: 'felicitas@epicmaill.com',
        });
      expect(res).to.have.status(400);
    });

    it('should throw a 404 for non existent receiver', async () => {
      const res = await chai.request(app).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: 'oiiuyizsgrtfhtuyoiuo',
          message: 'Just created this test message',
          receiver: 'felicity@epicmail.com',
        });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
    });

    it('should throw an error! Cannot send message to yourself', async () => {
      const res = await chai.request(app).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: 'some random mail from test case',
          message: 'Just created this test message',
          receiver: 'otaigbe@epicmail.com',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
    });
  });

  describe('Testing the save/send mail Endpoint', () => {
    it('should save a message as draft', async () => {
      const res = await chai.request(app).post('/api/v1/messages/draft').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: 'oiiuyizsgrtfhtuyoiuo',
          message: 'Just created this message',
        });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });

    it('should return a 400 validation error ', async () => {
      const res = await chai.request(app).post('/api/v1/messages/draft').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: '',
          message: 'Just created this message',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
    });
  });


  describe('Testing the get all received email Endpoint', () => {
    it('should get all emails where status is received', async () => {
      const res = await chai.request(app).get('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
    });

    it('should check if email array is 0', async () => {
      const res = await chai.request(app).get('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJ1c2VybmFtZSI6ImFkZSIsImVtYWlsIjoiYWRlQGVwaWNtYWlsLmNvbSIsImlhdCI6MTU1MzgwMzczOH0.7JVBYAsF6NlzUsFAN7JoBjc5BtP0O1OyNm48tbfjFVo');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
    });
  });

  describe('Testing the get all draft messages Endpoint', () => {
    it('should get all draft messages', async () => {
      const res = await chai.request(app).get('/api/v1/messages/draft').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
    });

    it('should check if draft array is 0', async () => {
      const res = await chai.request(app).get('/api/v1/messages/draft').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJ1c2VybmFtZSI6ImFkZSIsImVtYWlsIjoiYWRlQGVwaWNtYWlsLmNvbSIsImlhdCI6MTU1MzgwMzczOH0.7JVBYAsF6NlzUsFAN7JoBjc5BtP0O1OyNm48tbfjFVo');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
    });
  });

  describe('Testing the get all unread emails Endpoint', () => {
    it('should get all emails where status is unread', async () => {
      const res = await chai.request(app).get('/api/v1/messages/unread').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });

    it('should handle the case where user has no unread message', async () => {
      const res = await chai.request(app).get('/api/v1/messages/unread').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJ1c2VybmFtZSI6ImZpZGVsaXMiLCJlbWFpbCI6ImZpZGVsaXNAZXBpY21haWwuY29tIiwiaWF0IjoxNTU1MjUyMDQ5fQ.AAjcASApWMwqBFf-m_2BU28wczPSrWC_AdG3chhx9Ms');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });
  });

  describe('Testing the get all sent emails Endpoint', () => {
    it('should get all emails where type is sent', async () => {
      const res = await chai.request(app).get('/api/v1/messages/sent').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
    });

    it('should check if email array is 0', async () => {
      const res = await chai.request(app).get('/api/v1/messages/sent').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJ1c2VybmFtZSI6ImFkZSIsImVtYWlsIjoiYWRlQGVwaWNtYWlsLmNvbSIsImlhdCI6MTU1MzgwMzczOH0.7JVBYAsF6NlzUsFAN7JoBjc5BtP0O1OyNm48tbfjFVo');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
    });
  });

  describe('Testing the get specific users email by Id Endpoint', () => {
    it('should get a specific users email by Id', async () => {
      const res = await chai.request(app).get('/api/v1/messages/11').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });

    it('should throw a 400 validation error', async () => {
      const res = await chai.request(app).get('/api/v1/messages/adc').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(400);
    });

    it('should throw a 404 not found error', async () => {
      const res = await chai.request(app).get('/api/v1/messages/1123343').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(404);
    });
  });

  describe('Testing the get draft message by Id Endpoint', () => {
    it('should get a specific draft message by Id', async () => {
      const res = await chai.request(app).get('/api/v1/messages/draft/19').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });

    it('should throw a 400 validation error', async () => {
      const res = await chai.request(app).get('/api/v1/messages/draft/adc').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(400);
    });

    it('should throw a 404 not found error', async () => {
      const res = await chai.request(app).get('/api/v1/messages/draft/1123343').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(404);
    });
  });

  describe('Testing the Delete email by Id Endpoint', () => {
    it('should return a not found error', async () => {
      const res = await chai.request(app).delete('/api/v1/messages/5876756').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
    });

    it('should delete a specific users email by Id', async () => {
      const res = await chai.request(app).delete('/api/v1/messages/11').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
    });

    it('should throw a 400 error bad url', async () => {
      const res = await chai.request(app).delete('/api/v1/messages/bar').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      expect(res).to.have.status(400);
    });
  });
});
