/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import entryData from './dummyData/entries';
// Configure chai
chai.use(chaiHttp);
const { expect } = chai;
// eslint-disable-next-line prefer-const
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0bmFtZSI6IkFwaHJvZGljZSIsImxhc3RuYW1lIjoiSXphYmF5byIsImVtYWlsIjoiaXphYmF5b2FwaHJvZGljZUBnbWFpbC5jb20iLCJpYXQiOjE1NzIyNzg2NjgsImV4cCI6MTU3Mjc5NzA2OH0.zaKVWLsT2S46Zp2SL5oBczJ4Fc0pmHg-lj-cQvQHlt0';
// GET /api/v1/entries
describe('View all diary entries', () => {
    it('should return all the entries', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(entryData.retrieveOneEntry)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').equal('Entries retrieved successfully');
                expect(res.body).to.have.property('data');
                done();
            });
    });
    it('should not return entries due to not sending token/sending invalid token', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries')
            .send(entryData.retrieveOneEntry)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').equal('Ooops! Unauthenticated!');
                done();
            });
    });
    it('should allow the user to return a specific entry', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries/1')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                done();
            });
    });
    it('should not return specific entry due to unavailable token', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries/1')
            .set('Authorization', `Bearer ${token}dfdsfs`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').equal('Unauthenticated');
                done();
            });
    });
    it('should not return specific entry due to non-existent id', (done) => {
        chai
            .request(app)
            .get(`/api/v1/entries/${entryData.nonExistentId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(404);
                done();
            });
    });
    it('should not return any entry due to sending invalid token', (done) => {
        chai
            .request(app)
            .get(`/api/v1/entries/${entryData.nonExistentId}`)
            .set('Authorization', `Bearer ${token}dfsdfs`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(401);
                done();
            });
    });
});

// POST /api/v1/entries
describe('User wants to create a new entry', () => {
    it('should return error due to not having access token', (done) => {
        chai
            .request(app)
            .post('/api/v1/entries')
            .send(entryData.validEntry)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').equal('Ooops! Unauthenticated!');
                done();
            });
    });
    it('should create entry when valid values', (done) => {
        chai
            .request(app)
            .post('/api/v1/entries')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(entryData.validEntry)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').equal('Entry successfully created');
                done();
            });
    });
    it('should not add entry due to not filling all required fields', (done) => {
        chai
            .request(app)
            .post('/api/v1/entries')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(entryData.invalidEntry)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});

// Update entry
describe('User wants to update a specific entry', () => {
    it('should return unauthenticated due to missing token', (done) => {
        chai
            .request(app)
            .patch(`/api/v1/entries/${entryData.validId}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(401);
                expect(res.body).to.have.property('message').equal('Ooops! Unauthenticated!');
                done();
            });
    });
    it('should return - Not Found- due to invalid entry id', (done) => {
        chai
            .request(app)
            .patch('/api/v1/entries/?id=10')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(404);
                done();
            });
    });
    it('should return error if both id and token are invalid', (done) => {
        chai
            .request(app)
            .patch('/api/v1/entries/?id=10')
            .set('Authorization', 'Bearer nonvalid token')
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(404);
                done();
            });
    });
    it('should update the entry', (done) => {
        chai
            .request(app)
            .patch(`/api/v1/entries/${entryData.validId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send(entryData.validEntry)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').equal('Entry successfully edited');
                done();
            });
    });
});

// DELETE entry
describe('User wants to delete a specific entry', () => {
    it('should not delete entry due to invalid and/or not sent token', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/entries/${entryData.validId}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(401);
                expect(res.body).to.have.property('message').equal('Ooops! Unauthenticated!');
                done();
            });
    });
    it('should return - Not Found- due to invalid entry id', (done) => {
        chai
            .request(app)
            .delete('/api/v1/entries/?id=10')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(404);
                done();
            });
    });
    it('should return - Unauthenticated- if both id and token are invalid', (done) => {
        chai
            .request(app)
            .delete('/api/v1/entries/?id=10')
            .set('Authorization', 'Bearer nonvalid token')
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(404);
                done();
            });
    });
    it('should delete a user', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/entries/${entryData.validId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').equal('Entry successfully deleted');
                done();
            });
    });
});
