import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the Epic mail app', () => {
  describe('Testing the user account creation/signup Endpoint', () => {
    it('should create a new account successfully', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
        username: 'stanley',
        firstname: 'stanley',
        lastname: 'okhueleigbe',
        password: 'piloting',
        alternateemail: 'stanlex4400@gmail.com',
      });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });

    it('should return a validation error', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
        username: Number(34564),
        firstname: 'otaigbe',
        lastname: 'okhueleigbe',
        password: '',
        alternateemail: 'stanlex4400@gmail.com',
      });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });

    it('should return an already existent user message', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
        username: 'otaigbe',
        firstname: 'otaigbe',
        lastname: 'okhueleigbe',
        password: 'piloting',
        alternateemail: 'stanlex4400@gmail.com',
      });
      expect(res).to.have.status(409);
      expect(res.body).to.have.property('status');
    });
  });

  describe('Testing the signin method', () => {
    it('should signin a user successfully', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin').type('form').send({
        email: 'otaigbe@epicmail.com',
        password: 'password',
      });
      expect(res).to.have.status(200);
    });
    it('should throw a 404 signifying that email not found', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin').type('form').send({
        email: 'fanta@epicmail.com',
        password: 'password',
      });
      expect(res).to.have.status(404);
    });

    it('should return a validation error', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin/').type('form').send({
        email: 'otaigbe@epicmail.com',
        password: '',
      });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      // expect(res.body).to.have.property('error');
    });

    it('should return an invalid username/password error message', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin/').type('form').send({
        email: 'otaigbe@epicmail.com',
        password: 'piloti',
      });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      // expect(res.body).to.have.property('error');
    });

  });

});
