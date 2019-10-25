"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

// class for defining an entry model
var Entry =
/*#__PURE__*/
function () {
  function Entry(id, title, description) {
    (0, _classCallCheck2["default"])(this, Entry);
    this.id = id;
    this.setCreationDate();
    this.title = title;
    this.description = description;
  }

  (0, _createClass2["default"])(Entry, [{
    key: "setCreationDate",
    value: function setCreationDate() {
      var currentDate = new Date();
      var date = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();
      var fullDate = "".concat(year, "-").concat(month + 1, "-").concat(date);
      this.createdOn = fullDate;
      return this.createdOn;
    }
  }]);
  return Entry;
}();

var _default = Entry;
exports["default"] = _default;