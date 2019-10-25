"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _inputFieldsValidation = _interopRequireDefault(require("../helpers/inputFieldsValidation"));

var _userAuthToken = _interopRequireDefault(require("../helpers/userAuthToken"));

var users = [];
var userControllers = {};

var createUser = function createUser(req, res) {
  var user = users.find(function (c) {
    return c.email === req.body.email;
  });

  if (user) {
    return res.status(409).send({
      message: 'Email already exists'
    });
  } else {
    // hash the password
    var passwordHash = _bcrypt["default"].hash(req.body.password, 10);

    var userData = _inputFieldsValidation["default"].validateUserSignup(req.body);

    if (userData.error) {
      return res.status(400).send({
        message: userData.error.details[0].message
      });
    }

    var data = {
      userId: users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passwordHash
    };
    users.push(data);
    var token = (0, _userAuthToken["default"])(data);
    return res.status(201).send({
      message: 'User created successfully',
      userId: data.userId,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      token: token
    });
  }
};

var signin = function signin(req, res) {
  var user = users.find(function (c) {
    return c.email === req.body.email;
  });

  if (!user) {
    return res.status(404).send({
      message: 'Email not found'
    });
  }

  var validPassword = _bcrypt["default"].compare(req.body.password, users[0].password);

  if (!validPassword) {
    return res.status(401).send({
      message: 'Incorrect password'
    });
  }

  var userSignInData = _inputFieldsValidation["default"].validateUserSignin(req.body);

  if (userSignInData.error) {
    return res.status(401).send({
      message: userSignInData.error.details[0].message
    });
  }

  var data = {
    userId: users[0].userId,
    firstname: users[0].firstname,
    lastname: users[0].lastname,
    email: users[0].email
  };
  var token = (0, _userAuthToken["default"])(data);
  return res.status(200).send({
    message: 'User logged in successfully',
    token: token
  });
};

userControllers.createUser = createUser;
userControllers.signin = signin;
var _default = userControllers;
exports["default"] = _default;