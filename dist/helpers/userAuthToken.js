"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

(0, _dotenv.config)(0);

var signAuthToken = function signAuthToken(data) {
  var jwtSecreteKey = process.env.JWT_SECRET_KEY;
  var options = {
    expiresIn: '2d'
  };
  return _jsonwebtoken["default"].sign(data, jwtSecreteKey, options);
};

var _default = signAuthToken;
exports["default"] = _default;