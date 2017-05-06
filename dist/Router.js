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

/* @name Router
 * @description Replaces the <Route /> with the required component
                and injects resolved props and location from the routing context
 */
var Router = function (_Component) {
  _inherits(Router, _Component);

  function Router() {
    _classCallCheck(this, Router);

    return _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).apply(this, arguments));
  }

  _createClass(Router, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          getLocation = _context.getLocation,
          getRoutes = _context.getRoutes,
          getRouteMap = _context.getRouteMap;


      var location = getLocation();

      return getRoutes().filter(function (route) {
        return location.pathname === route.props.path;
      }).map(function (route) {
        var _route$props = route.props,
            path = _route$props.path,
            ComponentView = _route$props.component;

        var _getRouteMap = getRouteMap(path),
            resolvedData = _getRouteMap.resolvedData;

        //  Pass location and resolvedData props
        //  to the active route


        return _react2.default.createElement(ComponentView, {
          location: location,
          resolvedData: resolvedData
        });
      })[0];
    }
  }]);

  return Router;
}(_react.Component);

Router.contextTypes = {
  getLocation: _propTypes2.default.func.isRequired,
  getRoutes: _propTypes2.default.func.isRequired,
  getRouteMap: _propTypes2.default.func
};

exports.default = Router;