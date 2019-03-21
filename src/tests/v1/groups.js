/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the groups Endpoint', () => {
  describe('Testing the create and own group by user otaigbe Endpoint', () => {
    it('should successfully create a group', async () => {
      const res = await chai.request(app).post('/api/v1/groups')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          groupname: 'friends',
        });
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
    });

    it('should successfully create a group buddies', async () => {
      const res = await chai.request(app).post('/api/v1/groups')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          groupname: 'buddies',
        });
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
    });


    it('should successfully create a group called enemies', async () => {
      const res = await chai.request(app).post('/api/v1/groups')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          groupname: 'enemies',
        });
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
    });


    it('should an invalid token error', async () => {
      const res = await chai.request(app).post('/api/v1/groups')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBiuo;pY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          groupname: 'friends',
        });
      chai.expect(res).to.have.status(400);
    });

    it('should throw an unauthorised error message', async () => {
      const res = await chai.request(app).post('/api/v1/groups')
        .type('form')
        .send({
          groupname: 'friends',
        });
      chai.expect(res).to.have.status(401);
    });

    it('should throw validation error', async () => {
      const res = await chai.request(app).post('/api/v1/groups')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send({
          groupname: '',
          creator: 'osas422@epicmail.com',
        });
      chai.expect(res).to.have.status(400);
    });
    // eslint-disable-next-line no-template-curly-in-string
    it('should return a "You Already have a group with name this group name! Chooose a different group name" message', async () => {
      const res = await chai.request(app).post('/api/v1/groups')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send({
          groupname: 'friends',
        });
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
    });
  });

  describe('Testing the rename a group endpoint', () => {
    it('should rename a group successfully', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/groups/1/name')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            groupname: 'classmates',
          },
        );
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('message');
    });
    it('should throw a no token error', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/groups/1/name')
        .type('form')
        .send(
          {
            groupname: 'buddies',
          },
        );
      chai.expect(res).to.have.status(401);
    });
    it('should throw an error because buddies group already exists', async () => {
      const res = await chai.request(app).patch('/api/v1/groups/1/name')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            groupname: 'buddies',
          },
        );
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
    });
    it('should throw validation error', async () => {
      const res = await chai.request(app).patch('/api/v1/groups/1/name')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            groupname: 'e',
          },
        );
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
    });

    it('should throw unfound error', async () => {
      const res = await chai.request(app).patch('/api/v1/groups/798/name')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            groupname: 'enemies',
          },
        );
      chai.expect(res).to.have.status(404);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
    });
  });

  describe('Testing the group all groups created by a particular user endpoint', () => {
    it('should get all groups', async () => {
      const res = await chai.request(app).get('/api/v1/groups')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('message');
    });
  });

  describe('Testing the add User to group Endpoint', () => {
    it('should add a user successfully add to group', async () => {
      const res = await chai.request(app).post('/api/v1/groups/2/users')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            useremail: 'ade@epicmail.com',
          },
        );
      chai.expect(res).to.have.status(200);
    });

    it('should add a user successfully add to group', async () => {
      const res = await chai.request(app).post('/api/v1/groups/2/users')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            useremail: 'felicitas@epicmail.com',
          },
        );
      chai.expect(res).to.have.status(200);
    });

    it('should add a user successfully add to group', async () => {
      const res = await chai.request(app).post('/api/v1/groups/2/users')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            useremail: 'osas422@epicmail.com',
          },
        );
      chai.expect(res).to.have.status(200);
    });

    it('should add a user successfully add to group', async () => {
      const res = await chai.request(app).post('/api/v1/groups/2/users')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            useremail: 'george@epicmail.com',
          },
        );
      chai.expect(res).to.have.status(200);
    });


    it('should add already a member of a group', async () => {
      const res = await chai.request(app).post('/api/v1/groups/2/users')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            useremail: 'ade@epicmail.com',
          },
        );
      chai.expect(res).to.have.status(200);
    });

    it('should not find group', async () => {
      const res = await chai.request(app).post('/api/v1/groups/200/users')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            useremail: 'ade@epicmail.com',
          },
        );
      chai.expect(res).to.have.status(404);
    });
    it('should throw a validation error', async () => {
      const res = await chai.request(app).post('/api/v1/groups/2/users')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4')
        .type('form')
        .send(
          {
            useremail: 1234,
          },
        );
      chai.expect(res).to.have.status(400);
    });
  });

  describe('Testing the send mail to all members in a group endpoint', () => {
    it('should send messages to all members in a group', async () => {
      const res = await chai.request(app).post('/api/v1/groups/2/messages').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: 'oiiuyizsgrtfhtuyoiuo',
          message: 'Just created this test to be sent to multiple folks',
        });
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.have.property('status');
    });

    it('shouldn\'t find message with supplied id', async () => {
      const res = await chai.request(app).post('/api/v1/groups/70/messages')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: 'oiiuyizsgrtfhtuyoiuo',
          message: 'Just created this test to be sent to multiple folks',
        });
      chai.expect(res).to.have.status(404);
      // chai.expect(res.body).to.have.property('status');
    });

    it('should return a not found error because no members in the group', async () => {
      const res = await chai.request(app).post('/api/v1/groups/6/messages')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: 'oiiuyizsgrtfhtuyoiuo',
          message: 'Just created this test to be sent to multiple folks',
        });
      chai.expect(res).to.have.status(404);
      // chai.expect(res.body).to.have.property('status');
    });

    it('should return a validation error', async () => {
      const res = await chai.request(app).post('/api/v1/groups/6/messages')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4').type('form')
        .send({
          subject: 'o',
          message: 'Ju',
        });
      chai.expect(res).to.have.status(400);
      // chai.expect(res.body).to.have.property('status');
    });
  });

  describe('Testing the delete users from group endpoint', () => {
    it('should delete a group with provided id', async () => {
      const res = await chai.request(app).delete('/api/v1/groups/2/users/5')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
    });

    it('shouldn\'t find message with supplied id', async () => {
      const res = await chai.request(app).delete('/api/v1/groups/18989898/users/5')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      chai.expect(res).to.have.status(404);
      chai.expect(res.body).to.have.property('status');
    });
  });

  describe('Testing the delete group by id endpoint', () => {
    it('should delete a group with provided id', async () => {
      const res = await chai.request(app).delete('/api/v1/groups/1')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
    });

    it('shouldn\'t find message with supplied id', async () => {
      const res = await chai.request(app).delete('/api/v1/groups/1898')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6Im90YWlnYmUiLCJlbWFpbCI6Im90YWlnYmVAZXBpY21haWwuY29tIiwiaWF0IjoxNTUyOTY3MDY3fQ.-9Gv6CLrGsoSTxeBSnd24Dse_1uKE5Gu_6x6IhOq9Q4');
      chai.expect(res).to.have.status(404);
      chai.expect(res.body).to.have.property('status');
    });
  });
});
