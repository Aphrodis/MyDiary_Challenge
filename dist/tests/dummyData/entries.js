"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var entryData = {};
var validEntry = {
  title: 'my title',
  description: 'put entry content here'
};
var invalidEntry = {
  title: 'another title',
  description: ''
};
var invalidToken = 'thistokenisnotvalid';
var updateEntry = {
  title: 'Busy day updated',
  description: 'Put the content here'
};
var retrieveOneEntry = {
  id: 4,
  createdOn: '2019-10-22T21:56:01.550Z',
  title: 'Retrieve',
  description: 'This entry should be retrieved'
};
var invalidId = 'id';
var nonExistentId = 56;
var validId = 1;
entryData.validEntry = validEntry;
entryData.invalidEntry = invalidEntry;
entryData.invalidToken = invalidToken;
entryData.updateEntry = updateEntry;
entryData.retrieveOneEntry = retrieveOneEntry;
entryData.invalidId = invalidId;
entryData.nonExistentId = nonExistentId;
entryData.validId = validId;
var _default = entryData;
exports["default"] = _default;