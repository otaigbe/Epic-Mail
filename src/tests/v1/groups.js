/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the groups Endpoint', () => {
  describe('Testing the create and own group by user otaigbe Endpoint', () => {
    it('should create a group successfully for user otaigbe', async () => {
      const res = await chai.request(app).post('/api/v1/groups').type('form').send({
        groupname: 'friends',
        creator: 'otaigbe@epicmail.com',
      });
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body).to.have.property('message');
    });
    it('should create a group successfully for user osas422 with same group name as the one created by user otaigbe', async () => {
      const res = await chai.request(app).post('/api/v1/groups').type('form').send({
        groupname: 'friends',
        creator: 'osas422@epicmail.com',
      });
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body).to.have.property('message');
    });
    // eslint-disable-next-line no-template-curly-in-string
    it('should return a "You Already have a group with name this group name! Chooose a different group name" message', async () => {
      const res = await chai.request(app).post('/api/v1/groups').type('form').send({
        groupname: 'friends',
        creator: 'osas422@epicmail.com',
      });
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
    });
  });

  describe('Testing the delete group by id endpoint', () => {
    it('should delete a group with provided id', async () => {
      const res = await chai.request(app).delete('/api/v1/groups/1');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('message');
    });
  });

  describe('Testing the group all groups created by a particular user endpoint', () => {
    it('should delete a group with provided id', async () => {
      const res = await chai.request(app).get('/api/v1/groups');
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('message');
    });
  });
});
