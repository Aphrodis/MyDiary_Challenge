"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var validateEntry = function validateEntry(entry) {
  var entrySchema = _joi["default"].object({
    id: _joi["default"].string(),
    title: _joi["default"].string().min(3).required(),
    description: _joi["default"].string().min(5).required()
  });

  return _joi["default"].validate(entry, entrySchema);
};

var validateUserSignup = function validateUserSignup(user) {
  var userSchema = _joi["default"].object({
    userId: _joi["default"].string(),
    firstname: _joi["default"].string().required(),
    lastname: _joi["default"].string().required(),
    email: _joi["default"].string().trim().email({
      minDomainAtoms: 2
    }).required(),
    password: _joi["default"].string().regex(/^[a-zA-Z0-9]{8,32}$/).required()
  });

  return _joi["default"].validate(user, userSchema);
};

var validateUserSignin = function validateUserSignin(userSignin) {
  var userSigninSchema = _joi["default"].object({
    email: _joi["default"].string().trim().email({
      minDomainAtoms: 2
    }).required(),
    password: _joi["default"].string().regex(/^[a-zA-Z0-9]{8,32}$/).required()
  });

  return _joi["default"].validate(userSignin, userSigninSchema);
};

var _default = {
  validateEntry: validateEntry,
  validateUserSignup: validateUserSignup,
  validateUserSignin: validateUserSignin
};
exports["default"] = _default;