"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _entries = _interopRequireDefault(require("./routes/entries"));

var _users = _interopRequireDefault(require("./routes/users"));

// setup express app
var app = (0, _express["default"])(); // Parse incoming requests data

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // Make use of middleware(router)

app.use(_entries["default"]);
app.use(_users["default"]);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("The server is running on port: ".concat(PORT, "..."));
});
var _default = app;
exports["default"] = _default;