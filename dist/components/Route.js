'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = function Route(props) {
  var ComponentView = props.component;

  return _react2.default.createElement(ComponentView, props);
};

Route.propTypes = {
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]).isRequired
};

exports.default = Route;