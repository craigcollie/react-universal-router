'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _parseUrl2 = require('./../utils/parseUrl');

var _parseUrl3 = _interopRequireDefault(_parseUrl2);

var _matchRoute = require('./../utils/matchRoute');

var _matchRoute2 = _interopRequireDefault(_matchRoute);

var _getParamsFromUrl = require('./../utils/getParamsFromUrl');

var _getParamsFromUrl2 = _interopRequireDefault(_getParamsFromUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoutingProvider = function (_Component) {
  _inherits(RoutingProvider, _Component);

  function RoutingProvider(props) {
    _classCallCheck(this, RoutingProvider);

    var _this = _possibleConstructorReturn(this, (RoutingProvider.__proto__ || Object.getPrototypeOf(RoutingProvider)).call(this, props));

    var location = props.location,
        routeMap = props.routeMap,
        routes = props.routes,
        _props$resolvedData = props.resolvedData,
        resolvedData = _props$resolvedData === undefined ? {} : _props$resolvedData;


    _this.state = {
      location: location,
      routeMap: routeMap,
      routes: routes,
      data: _defineProperty({}, location.pathname, resolvedData)
    };

    _this.onRouteChange = _this.onRouteChange.bind(_this);
    return _this;
  }

  _createClass(RoutingProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _state = this.state,
          location = _state.location,
          data = _state.data,
          routes = _state.routes;

      return {
        getLocation: function getLocation() {
          return location;
        },
        getRoutes: function getRoutes() {
          return routes;
        },
        getResolvedData: function getResolvedData(pathname) {
          return data[pathname];
        },
        onRouteChange: this.onRouteChange
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.onpopstate = function () {
        var _window$location = window.location,
            pathname = _window$location.pathname,
            search = _window$location.search;

        var locationString = '' + pathname + search;
        _this2.onRouteChange(locationString, true);
      };
    }
  }, {
    key: 'onRouteChange',
    value: function onRouteChange(locationString, isHistoryEvent) {
      var _this3 = this;

      var _parseUrl = (0, _parseUrl3.default)(locationString),
          pathname = _parseUrl.pathname,
          search = _parseUrl.search;

      var routes = this.state.routes;

      var route = (0, _matchRoute2.default)(routes, pathname);

      if (!route) {
        throw new Error(pathname + ' has no valid route');
      }

      var resolve = route.resolve;

      //  Add route change to window history

      if (!isHistoryEvent) {
        history.pushState({ page: locationString }, locationString, locationString);
      }

      //  Resolve route data and setState()
      var routeParams = (0, _getParamsFromUrl2.default)(route.path, pathname);

      if (!resolve) {
        this.updateRoute({ pathname: pathname, search: search });
      } else {
        resolve(routeParams).then(function (data) {
          return _this3.updateRoute({ pathname: pathname, search: search }, data);
        });
      }
    }
  }, {
    key: 'updateRoute',
    value: function updateRoute(location, resolvedData) {
      var data = this.state.data;
      var pathname = location.pathname;


      this.setState({
        location: location,
        data: _defineProperty({}, pathname, resolvedData || data[pathname])
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);

  return RoutingProvider;
}(_react.Component);

RoutingProvider.propTypes = {
  location: _propTypes2.default.shape({
    pathname: _propTypes2.default.string.isRequired,
    search: _propTypes2.default.string
  }).isRequired,
  routeMap: _propTypes2.default.shape({
    path: _propTypes2.default.string,
    component: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.component]),
    resolve: _propTypes2.default.func,
    meta: _propTypes2.default.shape({
      title: _propTypes2.default.string,
      description: _propTypes2.default.string
    })
  }).isRequired,
  routes: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]).isRequired,
  resolvedData: _propTypes2.default.oneOfType([_propTypes2.default.any]),
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.element]).isRequired
};

RoutingProvider.defaultProps = {
  resolvedData: {}
};

RoutingProvider.childContextTypes = {
  getLocation: _propTypes2.default.func,
  getRoutes: _propTypes2.default.func,
  getResolvedData: _propTypes2.default.func,
  onRouteChange: _propTypes2.default.func
};

exports.default = RoutingProvider;