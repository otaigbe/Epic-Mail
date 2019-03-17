/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the Epic mail app', () => {
  describe('Testing the user account creation/signup Endpoint', () => {
    it('should create a new account successfully', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
        username: 'stanley',
        firstName: 'stanley',
        lastName: 'okhueleigbe',
        password: 'piloting',
        alternateEmail: 'stanlex4400@gmail.com',
      });
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      chai.expect(res.body.data).to.have.property('message');
    });

    it('should return a validation error', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
        username: Number(34564),
        firstName: 'otaigbe',
        lastName: 'okhueleigbe',
        password: '',
        alternateEmail: 'stanlex4400@gmail.com',
      });
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
      chai.expect(res.body.error.message).to.eql('Something wrong with input!');
    });

    it('should return an already existent user message', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
        username: 'otaigbe',
        firstName: 'otaigbe',
        lastName: 'okhueleigbe',
        password: 'piloting',
        alternateEmail: 'stanlex4400@gmail.com',
      });
      chai.expect(res).to.have.status(409);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
    });
  });

  describe('Testing the signin method', () => {
    it('should signin a user successfully', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin/').type('form').send({
        email: 'otaigbe@epicmail.com',
        password: 'password',
      });
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('data');
      // chai.expect(res.body.data).to.have.property('resource');
    });

    it('should return a validation error', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin/').type('form').send({
        email: 'otaigbe@epicmail.com',
        password: '',
      });
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
    });

    it('should return an invalid username/password error message', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin/').type('form').send({
        email: 'otaigbe@epicmail.com',
        password: 'piloti',
      });
      chai.expect(res).to.have.status(400);
      chai.expect(res.body).to.have.property('status');
      chai.expect(res.body).to.have.property('error');
    });

  });

});
