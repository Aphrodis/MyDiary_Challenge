"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

(0, _dotenv.config)(0);

var verifyToken =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var token, authorizedUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (req.headers.authorization) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).send({
              message: 'Ooops! Unauthenticated!'
            }));

          case 3:
            _context.next = 5;
            return req.headers.authorization.split(' ')[1];

          case 5:
            token = _context.sent;
            _context.next = 8;
            return _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);

          case 8:
            authorizedUser = _context.sent;
            req.authorizedUser = authorizedUser;
            next();
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).send({
              message: 'Unauthenticated'
            }));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verifyToken;
exports["default"] = _default;