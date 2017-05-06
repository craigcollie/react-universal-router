'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _metaPlugin = require('./plugins/metaPlugin');

var _metaPlugin2 = _interopRequireDefault(_metaPlugin);

var _historyPlugin = require('./plugins/historyPlugin');

var _historyPlugin2 = _interopRequireDefault(_historyPlugin);

var _resolveRoutePlugin = require('./plugins/resolveRoutePlugin');

var _resolveRoutePlugin2 = _interopRequireDefault(_resolveRoutePlugin);

var _syncRouteMap = require('./utils/syncRouteMap');

var _syncRouteMap2 = _interopRequireDefault(_syncRouteMap);

var _createRouteMapping = require('./utils/createRouteMapping');

var _createRouteMapping2 = _interopRequireDefault(_createRouteMapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoutingProvider = function (_Component) {
  _inherits(RoutingProvider, _Component);

  function RoutingProvider(props) {
    _classCallCheck(this, RoutingProvider);

    var _this = _possibleConstructorReturn(this, (RoutingProvider.__proto__ || Object.getPrototypeOf(RoutingProvider)).call(this, props));

    var location = props.location,
        resolvedData = props.resolvedData,
        routes = props.routes;


    var definedRoutes = routes().props.children;
    var routeMapping = (0, _createRouteMapping2.default)(definedRoutes, location, resolvedData);

    //  Create our route state object from
    //  connected Route components
    _this.state = {
      location: location,
      routes: definedRoutes,
      routeMapping: routeMapping
    };

    //  TODO - extend this from the context definition
    _this.plugins = {
      metaPlugin: _metaPlugin2.default,
      historyPlugin: _historyPlugin2.default,
      resolveRoutePlugin: _resolveRoutePlugin2.default
    };

    _this.updateRouteMap = _this.updateRouteMap.bind(_this);
    _this.onRouteChange = _this.onRouteChange.bind(_this);
    return _this;
  }

  _createClass(RoutingProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _state = this.state,
          routes = _state.routes,
          location = _state.location,
          routeMapping = _state.routeMapping;


      return {
        onRouteChange: this.onRouteChange,
        getRouteMap: function getRouteMap(path) {
          return routeMapping[path];
        },
        getRoutes: function getRoutes() {
          return routes;
        },
        getLocation: function getLocation() {
          return location;
        }
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      //  Listen for browser history changes
      window.onpopstate = function () {
        var _window$location = window.location,
            pathname = _window$location.pathname,
            search = _window$location.search;

        var locationString = '' + pathname + search;
        _this2.onRouteChange(locationString, true);
      };
    }

    //  Maps the current pathname to data
    //  -> Set on init from isomorphic

  }, {
    key: 'updateRouteMap',
    value: function updateRouteMap(location, resolvedData) {
      var routeMapping = this.state.routeMapping;

      this.setState((0, _syncRouteMap2.default)(location, routeMapping, resolvedData));
    }
  }, {
    key: 'onRouteChange',
    value: function onRouteChange(newLocation, isHistoryEvent) {
      var _this3 = this;

      var _url$parse = _url2.default.parse(newLocation),
          pathname = _url$parse.pathname;

      var routeMapping = this.state.routeMapping;


      (0, _forEach2.default)(this.plugins, function (plugin) {
        return plugin.apply(_this3, [newLocation, routeMapping[pathname], isHistoryEvent]);
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

RoutingProvider.childContextTypes = {
  onRouteChange: _propTypes2.default.func,
  getRoutes: _propTypes2.default.func,
  getLocation: _propTypes2.default.func,
  getRouteMap: _propTypes2.default.func
};

exports.default = RoutingProvider;