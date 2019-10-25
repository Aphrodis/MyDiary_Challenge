"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inputFieldsValidation = _interopRequireDefault(require("../helpers/inputFieldsValidation"));

var _diaryData = _interopRequireDefault(require("./diaryData"));

/* eslint-disable radix */
var entryControllers = {};

var getAllEntries = function getAllEntries(req, res) {
  try {
    res.status(200).send({
      message: 'Entries retrieved successfully',
      data: _diaryData["default"]
    });
  } catch (err) {
    console.log(err.details[0].message);
  }
};

var getEntry = function getEntry(req, res) {
  var entry = _diaryData["default"].find(function (c) {
    return c.id === parseInt(req.params.id);
  });

  if (!entry) {
    return res.status(404).send({
      message: "Entry with an id of ".concat(req.params.id, " was not found")
    });
  } else {
    return res.status(200).send({
      message: 'Entry retrieved successfully',
      entry: entry
    });
  }
};

var createEntry = function createEntry(req, res) {
  var _Schema$validateEntry = _inputFieldsValidation["default"].validateEntry(req.body),
      result = _Schema$validateEntry.result,
      error = _Schema$validateEntry.error;

  if (error !== null) {
    res.status(400).send({
      error: error.details[0].message
    });
  } else {
    var entry = {
      id: _diaryData["default"].length + 1,
      createdOn: new Date(),
      title: req.body.title,
      description: req.body.description
    };

    _diaryData["default"].push(entry);

    return res.status(200).send({
      id: entry.id,
      message: 'Entry successfully created',
      createdOn: entry.createdOn,
      title: entry.title,
      description: entry.description
    });
  }
};

var updateEntry = function updateEntry(req, res) {
  var entry = _diaryData["default"].find(function (c) {
    return c.id === parseInt(req.params.id);
  });

  if (!entry) {
    return res.status(404).send({
      message: "Sorry, Entry with an id of ".concat(req.params.id, " was not found")
    });
  }

  var result = _inputFieldsValidation["default"].validateEntry(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  } else {
    var index = _diaryData["default"].indexOf(entry);

    var updatedEntry = {
      id: entry.id,
      title: req.body.title || entry.title,
      updatedOn: new Date(),
      description: req.body.description || entry.description
    };

    _diaryData["default"].splice(index, 1, updatedEntry);

    return res.status(200).send({
      message: 'Entry successfully edited',
      updatedEntry: updatedEntry
    });
  }
};

var deleteEntry = function deleteEntry(req, res) {
  var entry = _diaryData["default"].find(function (c) {
    return c.id === parseInt(req.params.id);
  });

  if (!entry) {
    return res.status(404).send({
      message: "Can't find the entry with an id of ".concat(req.params.id)
    });
  }

  var index = _diaryData["default"].indexOf(entry);

  _diaryData["default"].splice(index, 1);

  return res.status(200).send({
    message: 'Entry successfully deleted',
    entry: entry
  });
};

entryControllers.getAllEntries = getAllEntries;
entryControllers.getEntry = getEntry;
entryControllers.createEntry = createEntry;
entryControllers.updateEntry = updateEntry;
entryControllers.deleteEntry = deleteEntry;
var _default = entryControllers;
exports["default"] = _default;