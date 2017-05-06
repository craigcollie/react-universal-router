'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Link, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var pathname = this.props.to;
      var onRouteChange = this.context.onRouteChange;

      event.preventDefault();

      //  Update the router
      onRouteChange(pathname);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          to = _props.to,
          text = _props.text;

      return _react2.default.createElement(
        'a',
        { href: to, onClick: this.handleClick },
        text
      );
    }
  }]);

  return Link;
}(_react.Component);

Link.propTypes = {
  to: _propTypes2.default.string.isRequired,
  text: _propTypes2.default.string.isRequired
};

Link.contextTypes = {
  onRouteChange: _propTypes2.default.func
};

exports.default = Link;