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
  path: _propTypes2.default.string.isRequired,
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]).isRequired,
  resolve: _propTypes2.default.func,
  routeParams: _propTypes2.default.object,
  meta: _propTypes2.default.shape({
    title: _propTypes2.default.string.isRequired,
    description: _propTypes2.default.string.isRequired
  })
};

exports.default = Route;