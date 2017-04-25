'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resolveRoute = require('./utils/resolveRoute');

var _resolveRoute2 = _interopRequireDefault(_resolveRoute);

var _getRouteMapping = require('./utils/getRouteMapping');

var _getRouteMapping2 = _interopRequireDefault(_getRouteMapping);

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
        data = props.data,
        routes = props.routes;
    var pathname = location.pathname;

    //  Get route components (TODO check for Route)

    var definedRoutes = routes().props.children;
    var routeMapping = (0, _getRouteMapping2.default)(definedRoutes);

    //  Create our route state object from
    //  connected Route components
    _this.state = {
      location: { pathname: pathname },
      routes: definedRoutes,
      routeMapping: routeMapping
    };

    //  Hydrate the current route data
    _this.state.routeMapping[pathname].data = data;

    _this.updateRouteMap = _this.updateRouteMap.bind(_this);
    _this.registerRouteChange = _this.registerRouteChange.bind(_this);
    return _this;
  }

  _createClass(RoutingProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        updateRouteMap: this.updateRouteMap,
        registerRouteChange: this.registerRouteChange
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          location = _props.location,
          data = _props.data;

      //  Update initial mounting location with data
      //  from isomorphic resolve

      this.updateRouteMap(location.pathname, data);

      //  Add the event listener for popstate
      //  check for window.onpopstate and
      //  history and fallback if not available
      window.onpopstate = function () {
        _this2.registerRouteChange(window.location.pathname, true);
      };
    }

    //  Maps the current pathname to data
    //  -> Set on init from isomorphic

  }, {
    key: 'updateRouteMap',
    value: function updateRouteMap(pathname, data) {
      var routeMapping = this.state.routeMapping;


      this.setState({
        routeMapping: Object.assign({}, routeMapping, _defineProperty({}, pathname, _extends({}, routeMapping[pathname], {
          data: data ? data : routeMapping[pathname].data
        }))),
        location: {
          pathname: pathname
        }
      });
    }
  }, {
    key: 'registerRouteChange',
    value: function registerRouteChange(pathname, isHistoryEvent) {
      var _this3 = this;

      var routeMapping = this.state.routeMapping;
      var _routeMapping$pathnam = routeMapping[pathname],
          resolve = _routeMapping$pathnam.resolve,
          routeParams = _routeMapping$pathnam.routeParams,
          cache = _routeMapping$pathnam.cache,
          data = _routeMapping$pathnam.data,
          meta = _routeMapping$pathnam.meta;


      if (meta) {
        document.title = meta.title;
        document.querySelector('meta[name="description"]').setAttribute("content", meta.description);
      }

      //  Update push state
      if (!isHistoryEvent) {
        history.pushState({ page: pathname }, meta.title, pathname);
      }

      //  If caching is on, then we should only
      //  resolve the route data once
      var shouldFetchData = cache && !data || !cache;

      if (!shouldFetchData) {
        //  Update the routeMap only
        this.updateRouteMap(pathname, null);
      } else {
        //  Get data and update the route map
        (0, _resolveRoute2.default)(resolve, routeParams).then(function (data) {
          return _this3.updateRouteMap(pathname, data);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      //  Location must come from state, and not isomorphic
      //  because the router will change the current pathname
      var _state = this.state,
          location = _state.location,
          routes = _state.routes;

      //  Route data should be there for the
      //  initial page load (server) and null for
      //  other subsequent routes (fetch on client)

      var data = this.state.routeMapping[location.pathname].data;


      return _react2.default.createElement(
        'div',
        null,
        _react.Children.map(this.props.children, function (child) {
          return _react2.default.cloneElement(child, { data: data, location: location, routes: routes });
        })
      );
    }
  }]);

  return RoutingProvider;
}(_react.Component);

RoutingProvider.childContextTypes = {
  updateRouteMap: _propTypes2.default.func,
  registerRouteChange: _propTypes2.default.func
};

exports.default = RoutingProvider;