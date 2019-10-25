"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var User = function User(firstname, lastname, email, password) {
  (0, _classCallCheck2["default"])(this, User);
  this.firstname = firstname;
  this.lastname = lastname;
  this.email = email;
  this.password = password;
};

var _default = User;
exports["default"] = _default;