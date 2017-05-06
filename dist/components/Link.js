'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleClick = function handleClick(event, onRouteChange, to) {
  event.preventDefault();
  onRouteChange(to);
};

function Link(props, context) {
  var to = props.to,
      text = props.text;
  var onRouteChange = context.onRouteChange;


  return _react2.default.createElement(
    'a',
    {
      href: to,
      onClick: function onClick(event) {
        return handleClick(event, onRouteChange, to);
      }
    },
    text
  );
}

Link.propTypes = {
  to: _propTypes2.default.string.isRequired,
  text: _propTypes2.default.string.isRequired
};

Link.contextTypes = {
  onRouteChange: _propTypes2.default.func
};

exports.default = Link;