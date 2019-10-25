"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var userInput = {};
var validSignUp = {
  firstname: 'Aphrodice',
  lastname: 'Izabayo',
  email: 'izabayoaphrodis@gmail.com',
  password: 'thisismehere'
};
var invalidSignUp = {
  firstname: 'Aphrodice',
  email: 'aphrodis@kepler.org',
  password: 'thisismehere'
};
var emailExists = {
  firstname: 'Aphrodice',
  lastname: 'lastname',
  email: 'izabayoaphrodis@gmail.com',
  password: 'anotherpassword'
};
var wrongUser = {
  email: 'izabayo1@kepler.org',
  password: 'iamheretoo'
};
var validUserSignIn = {
  email: 'izabayoaphrodis@gmail.com',
  password: 'thisismehere'
};
var wrongUserPassword = {
  email: 'izabayoaphrodis@gmail.com',
  password: 'incorrectpassword'
};
var wrongUserEmail = {
  email: 'wrongemail@gmail.com',
  password: 'thisismehere'
};
userInput.validSignUp = validSignUp;
userInput.invalidSignUp = invalidSignUp;
userInput.emailExists = emailExists;
userInput.wrongUser = wrongUser;
userInput.validUserSignIn = validUserSignIn;
userInput.wrongUserPassword = wrongUserPassword;
userInput.wrongUserEmail = wrongUserEmail;
var _default = userInput;
exports["default"] = _default;