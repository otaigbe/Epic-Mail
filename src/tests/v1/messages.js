import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

// describe('Testing the messages Endpoint', () => {
//   describe('Testing the save/send mail Endpoint', () => {
//     it('should save and send a message successfully', async () => {
//       const res = await chai.request(app).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
//         .send({
//           subject: 'some random mail',
//           message: 'Just created this test message',
//           receiver: 'felicitas@epicmail.com',
//         });
//       chai.expect(res).to.have.status(201);
//       chai.expect(res.body).to.have.property('status');
//       chai.expect(res.body).to.have.property('data');
//     });

//     it('should throw a validation error for bad email input', async () => {
//       const res = await chai.request(app).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
//         .send({
//           subject: 'oiiuyizsgrtfhtuyoiuo',
//           message: 'Just created this test message',
//           receiver: 'felicitas@epicmaill.com',
//         });
//       chai.expect(res).to.have.status(400);
//     });


//     it('should save a message as draft', async () => {
//       const res = await chai.request(app).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
//         .send({
//           subject: 'oiiuyizsgrtfhtuyoiuo',
//           message: 'Just created this message',
//         });
//       chai.expect(res).to.have.status(201);
//       chai.expect(res.body).to.have.property('status');
//       chai.expect(res.body).to.have.property('data');
//     });

//     it('should save a message as draft and protect from sending message to self', async () => {
//       const res = await chai.request(app).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
//         .send({
//           subject: 'oiiuyizsgrtfhtuyoiuo',
//           message: 'Just created this message',
//           receiver: 'otaigbe@epicmail.com',
//         });
//       chai.expect(res).to.have.status(201);
//       chai.expect(res.body).to.have.property('status');
//       chai.expect(res.body).to.have.property('data');
//     });

//     it('should return a validation error', async () => {
//       const res = await chai.request(app).post('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
//         .send({
//           to: 'stanley@epicmail.com',
//           subject: '',
//           message: 'tthyth thn4thnbet thntrhnth t thynthne tne etyne tjne tjntetjnh tjnt eyn',
//         });
//       chai.expect(res).to.have.status(400);
//       chai.expect(res.body).to.have.property('status');
//       // chai.expect(res.body).to.have.property('error');
//     });
//     it('should return a unauthorised access error', async () => {
//       const res = await chai.request(app).post('/api/v1/messages').type('form')
//         .send({
//           subject: 'oiiuyizsgrtfhtuyoiuo',
//           message: 'Just created this test message',
//           receiver: 'osass@epicmail.com',
//         });
//       chai.expect(res).to.have.status(401);
//       // chai.expect(res.body).to.have.property('status');
//       // chai.expect(res.body).to.have.property('error');
//     });

//   });

describe('Testing the get all received email Endpoint', () => {
  it('should get all emails where status is received', async () => {
    const res = await chai.request(app).get('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property('status');
    chai.expect(res.body).to.have.property('data');
    chai.expect(res.body.data).to.be.an('array');
  });

  it('should check if email array is 0', async () => {
    const res = await chai.request(app).get('/api/v1/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJ1c2VybmFtZSI6ImFkZSIsImVtYWlsIjoiYWRlQGVwaWNtYWlsLmNvbSIsImlhdCI6MTU1MzgwMzczOH0.7JVBYAsF6NlzUsFAN7JoBjc5BtP0O1OyNm48tbfjFVo');
    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property('status');
    chai.expect(res.body).to.have.property('data');
    chai.expect(res.body.data).to.have.property('message');
  });
});

//   describe('Testing the get all unread emails Endpoint', () => {
//     it('should get all emails where status is unread', async () => {
//       const res = await chai.request(app).get('/api/v1/messages/unread').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
//       chai.expect(res).to.have.status(200);
//       chai.expect(res.body).to.have.property('status');
//       chai.expect(res.body).to.have.property('data');
//     });
//   });

//   describe('Testing the get all sent emails Endpoint', () => {
//     it('should get all emails where type is sent', async () => {
//       const res = await chai.request(app).get('/api/v1/messages/sent').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
//       chai.expect(res).to.have.status(200);
//       chai.expect(res.body).to.have.property('status');
//       chai.expect(res.body).to.have.property('data');
//     });

//     it('should throw 401 error', async () => {
//       const res = await chai.request(app).get('/api/v1/messages/sent');
//       chai.expect(res).to.have.status(401);
//     });

//   });

//   describe('Testing the get specific users email by Id Endpoint', () => {
//     it('should get a specific users email by Id', async () => {
//       const res = await chai.request(app).get('/api/v1/messages/5').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
//       chai.expect(res).to.have.status(200);
//       chai.expect(res.body).to.have.property('status');
//       chai.expect(res.body).to.have.property('data');
//     });

//     it('should throw a 400 error bad url', async () => {
//       const res = await chai.request(app).get('/api/v1/messages/_').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
//       chai.expect(res).to.have.status(400);
//       chai.expect(res.body).to.have.property('status');
//     });

//     it('should return a message not found error message', async () => {
//       const res = await chai.request(app).get('/api/v1/messages/19300').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
//       chai.expect(res).to.have.status(404);
//       chai.expect(res.body).to.have.property('status');
//       // chai.expect(res.body).to.have.property('error');
//     });
//   });

//   describe('Testing the Delete email by Id Endpoint', () => {
//     it('should delete a specific users email by Id', async () => {
//       const res = await chai.request(app).delete('/api/v1/messages/5').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
//       chai.expect(res).to.have.status(200);
//       chai.expect(res.body).to.have.property('status');
//     });

//     it('should throw a 400 error bad url', async () => {
//       const res = await chai.request(app).delete('/api/v1/messages/bar').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
//       chai.expect(res).to.have.status(400);
//     });

//     it('should return a message not found error and deletion incomplete message', async () => {
//       const res = await chai.request(app).get('/api/v1/messages/19300').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
//       chai.expect(res).to.have.status(404);
//       chai.expect(res.body).to.have.property('status');
//       // chai.expect(res.body).to.have.property('error');
//     });
//   });
// });
