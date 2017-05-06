'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
  to: _react.PropTypes.string.isRequired,
  text: _react.PropTypes.string.isRequired
};

Link.contextTypes = {
  onRouteChange: _react.PropTypes.func
};

exports.default = Link;
//# sourceMappingURL=Link.js.map