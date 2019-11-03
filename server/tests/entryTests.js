/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import entryData from './dummyData/entries';
import userData from './dummyData/users';
import userAuthToken from '../helpers/userAuthToken';
// Configure chai
chai.use(chaiHttp);
const { expect } = chai;

let token;
let cachedEntry = '';

before('Create a user', (done) => {
    const user = {
        firstname: 'Aphrodice1',
        lastname: 'Izabayo0',
        email: 'izabayoaphrodice@gmail.com',
        password: 'thisismeheree',
    };
    chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('token');
            token = res.body.token;
            done();
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
                expect(res.body).to.have.property('message').equal('Entry successfully created');
                cachedEntry = res.body;
                done();
            });
    });
    it('should return status 200 to confirm the saved entry', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
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
                done();
            });
    });
});

// GET /api/v1/entries
describe('View all diary entries', () => {
    it('should return all entries', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').equal('Entries retrieved successfully');
                expect(res.body).to.have.property('allEntries');
                done();
            });
    });

    it('should not return entries due to not sending token', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries')
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(401);
                expect(res.body).to.have.property('message').equal('Ooops! Unauthenticated!');
                done();
            });
    });

    it('should allow the user to return a specific entry', (done) => {
        chai
            .request(app)
            .get(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
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
    it('should not return specific entry due to not sending token', (done) => {
        chai
            .request(app)
            .get(`/api/v1/entries/${entryData.nonExistentId}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(401);
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
            .patch(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send(entryData.validEntry)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').equal('Entry successfully edited');
                done();
            });
    });
});

// DELETE entry
describe('User wants to delete a specific entry', () => {
    it('should not delete entry due not sent token', (done) => {
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
    it('should delete an entry', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').equal('Entry successfully deleted');
                done();
            });
    });
});
