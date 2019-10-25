"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _entryControllers = _interopRequireDefault(require("../controllers/entryControllers"));

var _accessToken = _interopRequireDefault(require("../helpers/accessToken"));

var entriesRouter = _express["default"].Router();

entriesRouter.post('/api/v1/entries', _accessToken["default"], _entryControllers["default"].createEntry);
entriesRouter.get('/api/v1/entries', _accessToken["default"], _entryControllers["default"].getAllEntries);
entriesRouter.get('/api/v1/entries/:id', _accessToken["default"], _entryControllers["default"].getEntry);
entriesRouter.patch('/api/v1/entries/:id', _accessToken["default"], _entryControllers["default"].updateEntry);
entriesRouter["delete"]('/api/v1/entries/:id', _accessToken["default"], _entryControllers["default"].deleteEntry);
var _default = entriesRouter;
exports["default"] = _default;