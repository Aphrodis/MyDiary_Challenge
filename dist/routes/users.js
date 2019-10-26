"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userControllers = _interopRequireDefault(require("../controllers/userControllers"));

var usersRouter = _express["default"].Router();

usersRouter.post('/api/v1/auth/signup', _userControllers["default"].createUser);
usersRouter.post('/api/v1/auth/signin', _userControllers["default"].signin);
var _default = usersRouter;
exports["default"] = _default;