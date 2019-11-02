/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import userInput from './dummyData/users';
// Configure chai
chai.use(chaiHttp);

const { expect } = chai;
// User signup
describe('User wants to signup', () => {
    it('should return an error due to invalid signup', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(userInput.invalidSignUp)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('should create a user and allow them to sign in', (done) => {
        let token;
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(userInput.validSignUp)
            .end((err, res) => {
                if (err) done(err);
                token = res.body.token;
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('message').equal('User created successfully');
                done();
            });
    });

    it('should return that the email already exists', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(userInput.emailExists)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('message').equal('Email already exists');
                done();
            });
    });
});

// User sign in
describe('User tries to sign into his/her account', () => {
    it('should return an error due to invalid email', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(userInput.wrongUserEmail)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message').equal('Email not found');
                done();
            });
    });
    it('should return an error due to incorrect password', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(userInput.wrongUserPassword)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message').equal('Incorrect password');
                done();
            });
    });

    it('should allow the user to enter into account and perform action', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(userInput.validUserSignIn)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                done();
            });
    });
    it('should allow the user to enter into account and generate token', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(userInput.validUserSignIn)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').equal('User logged in successfully');
                expect(res.body).to.have.property('token');
                done();
            });
    });
});
