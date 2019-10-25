"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _users = _interopRequireDefault(require("./dummyData/users"));

/* eslint-disable import/named */

/* eslint-disable import/no-extraneous-dependencies */
// Configure chai
_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect; // let token;
// User signup

describe('User wants to signup', function () {
  it('should return an error due to invalid signup', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(_users["default"].invalidSignUp).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('should create a user and allow them to sign in', function (done) {
    var token;

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(_users["default"].validSignUp).end(function (err, res) {
      if (err) done(err);
      token = res.body.token;
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('User created successfully');
      done();
    });
  });
  it('should return that the email already exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(_users["default"].emailExists).end(function (err, res) {
      if (err) done(err);
      expect(res).to.have.status(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Email already exists');
      done();
    });
  });
}); // User sign in

describe('User tries to sign into his/her account', function () {
  it('should return an error due to invalid email', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(_users["default"].wrongUserEmail).end(function (err, res) {
      if (err) done(err);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Email not found');
      done();
    });
  });
  it('should return an error due to incorrect password', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(_users["default"].wrongUserPassword).end(function (err, res) {
      if (err) done(err);
      expect(res).to.have.status(401);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Incorrect password');
      done();
    });
  });
  it('should allow the user to enter into account and perform action', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(_users["default"].validUserSignIn).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      done();
    });
  });
  it('should allow the user to enter into account and generate token', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(_users["default"].validUserSignIn).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('User logged in successfully');
      expect(res.body).to.have.property('token');
      done();
    });
  });
});