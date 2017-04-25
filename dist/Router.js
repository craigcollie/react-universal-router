'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouterMiddleware = exports.sanitizePathname = exports.resolveRoute = exports.getRoute = exports.propLinker = exports.propExtractor = exports.isValidRoute = exports.clientRender = exports.RoutingProvider = exports.Link = exports.Route = exports.Router = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Router = require('./Router');

var _Route2 = require('./Route');

var _Route3 = _interopRequireDefault(_Route2);

var _Link2 = require('./Link');

var _Link3 = _interopRequireDefault(_Link2);

var _RoutingProvider2 = require('./RoutingProvider');

var _RoutingProvider3 = _interopRequireDefault(_RoutingProvider2);

var _clientRender2 = require('./clientRender');

var _clientRender3 = _interopRequireDefault(_clientRender2);

var _isValidRoute2 = require('./utils/isValidRoute');

var _isValidRoute3 = _interopRequireDefault(_isValidRoute2);

var _propExtractor2 = require('./utils/propExtractor');

var _propExtractor3 = _interopRequireDefault(_propExtractor2);

var _propLinker2 = require('./utils/propLinker');

var _propLinker3 = _interopRequireDefault(_propLinker2);

var _getRoute2 = require('./utils/getRoute');

var _getRoute3 = _interopRequireDefault(_getRoute2);

var _resolveRoute2 = require('./utils/resolveRoute');

var _resolveRoute3 = _interopRequireDefault(_resolveRoute2);

var _sanitizePathname2 = require('./utils/sanitizePathname');

var _sanitizePathname3 = _interopRequireDefault(_sanitizePathname2);

var _routerMiddleware = require('./routerMiddleware');

var _routerMiddleware2 = _interopRequireDefault(_routerMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = exports.Router = function (_Component) {
  _inherits(Router, _Component);

  function Router() {
    _classCallCheck(this, Router);

    return _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).apply(this, arguments));
  }

  _createClass(Router, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          routes = _props.routes,
          location = _props.location,
          resolvedData = _props.data;


      return _react2.default.createElement(
        'div',
        null,
        routes.map(function (route, i) {
          var path = route.props.path;

          var routeProps = _extends({}, route.props, { resolvedData: resolvedData });

          return _this2.constructor.isActive(location.pathname, path) && _react2.default.createElement(_Router.Route, _extends({ key: i }, routeProps));
        })
      );
    }
  }]);

  return Router;
}(_react.Component);

//  Exported components


Router.isActive = function (pathname, path) {
  return pathname === path;
};

exports.Route = _Route3.default;
exports.Link = _Link3.default;
exports.RoutingProvider = _RoutingProvider3.default;
exports.clientRender = _clientRender3.default;

//  Exported utils

exports.isValidRoute = _isValidRoute3.default;
exports.propExtractor = _propExtractor3.default;
exports.propLinker = _propLinker3.default;
exports.getRoute = _getRoute3.default;
exports.resolveRoute = _resolveRoute3.default;
exports.sanitizePathname = _sanitizePathname3.default;

//  Express middleware

exports.createRouterMiddleware = _routerMiddleware2.default;
exports.default = Router;