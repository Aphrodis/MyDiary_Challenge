"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _entries = _interopRequireDefault(require("./dummyData/entries"));

/* eslint-disable import/named */

/* eslint-disable import/no-extraneous-dependencies */
// Configure chai
_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect; // Cache the token
// eslint-disable-next-line prefer-const

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImZpcnN0bmFtZSI6IkFwaHJvZGljZSIsImxhc3RuYW1lIjoiSXphYmF5byIsImVtYWlsIjoiaXphYmF5b2FwaHJvZGljZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6e30sImlhdCI6MTU3MjAwODg4MCwiZXhwIjoxNTcyMTgxNjgwfQ.AAQsgsCi06MUKweh3u-QdJc7hMq_F-LEuL4HgiHB86k'; // GET /api/v1/entries

describe('View all diary entries', function () {
  it('should return all the entries', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/entries').set('Content-Type', 'application/json').set('Authorization', "Bearer ".concat(token)).send(_entries["default"].retrieveOneEntry).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Entries retrieved successfully');
      expect(res.body).to.have.property('data');
      done();
    });
  });
  it('should not return entries due to not sending token/sending invalid token', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/entries').send(_entries["default"].retrieveOneEntry).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(401);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Ooops! Unauthenticated!');
      done();
    });
  });
  it('should allow the user to return a specific entry', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/entries/1').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should not return specific entry due to unavailable token', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/entries/1').set('Authorization', "Bearer ".concat(token, "dfdsfs")).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(401);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Unauthenticated');
      done();
    });
  });
  it('should not return specific entry due to non-existent id', function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/entries/".concat(_entries["default"].nonExistentId)).set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('should not return any entry due to sending invalid token', function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/entries/".concat(_entries["default"].nonExistentId)).set('Authorization', "Bearer ".concat(token, "dfsdfs")).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(401);
      done();
    });
  });
}); // POST /api/v1/entries

describe('User wants to create a new entry', function () {
  it('should return error due to not having access token', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/entries').send(_entries["default"].validEntry).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(401);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Ooops! Unauthenticated!');
      done();
    });
  });
  it('should create entry when valid values', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/entries').set('Content-Type', 'application/json').set('Authorization', "Bearer ".concat(token)).send(_entries["default"].validEntry).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Entry successfully created');
      done();
    });
  });
  it('should not add entry due to not filling all required fields', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/entries').set('Content-Type', 'application/json').set('Authorization', "Bearer ".concat(token)).send(_entries["default"].invalidEntry).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      done();
    });
  });
}); // Update entry

describe('User wants to update a specific entry', function () {
  it('should return unauthenticated due to missing token', function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/entries/".concat(_entries["default"].validId)).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message').equal('Ooops! Unauthenticated!');
      done();
    });
  });
  it('should return - Not Found- due to invalid entry id', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/entries/?id=10').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('should return error if both id and token are invalid', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/entries/?id=10').set('Authorization', 'Bearer nonvalid token').end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('should update the entry', function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/entries/".concat(_entries["default"].validId)).set('Authorization', "Bearer ".concat(token)).set('Content-Type', 'application/json').send(_entries["default"].validEntry).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Entry successfully edited');
      done();
    });
  });
}); // DELETE entry

describe('User wants to delete a specific entry', function () {
  it('should not delete entry due to invalid and/or not sent token', function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/entries/".concat(_entries["default"].validId)).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message').equal('Ooops! Unauthenticated!');
      done();
    });
  });
  it('should return - Not Found- due to invalid entry id', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/entries/?id=10').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('should return - Unauthenticated- if both id and token are invalid', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/entries/?id=10').set('Authorization', 'Bearer nonvalid token').end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('should delete a user', function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/entries/".concat(_entries["default"].validId)).set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message').equal('Entry successfully deleted');
      done();
    });
  });
});