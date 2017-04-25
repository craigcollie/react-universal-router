'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propExtractor = require('./utils/propExtractor');

var _propExtractor2 = _interopRequireDefault(_propExtractor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clientRender(Root) {
  var elementId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'root';

  _reactDom2.default.render(_react2.default.createElement(Root, (0, _propExtractor2.default)('app-props')), document.getElementById(elementId));
}

exports.default = clientRender;