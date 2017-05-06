'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _matchRoute2 = require('./../utils/matchRoute');

var _matchRoute3 = _interopRequireDefault(_matchRoute2);

var _getParamsFromUrl = require('./../utils/getParamsFromUrl');

var _getParamsFromUrl2 = _interopRequireDefault(_getParamsFromUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function Router(props, context) {
  var getLocation = context.getLocation,
      getRoutes = context.getRoutes,
      getResolvedData = context.getResolvedData;

  //  Get location from <RouteProvider />

  var location = getLocation();

  //  Get data from <RouteProvider />
  var resolvedData = getResolvedData(location.pathname);

  //  Routes can be pattern matched
  //  So a /path/:id can be used

  var _matchRoute = (0, _matchRoute3.default)(getRoutes(), location.pathname),
      path = _matchRoute.path,
      ComponentView = _matchRoute.component;

  var routeParams = (0, _getParamsFromUrl2.default)(path, location.pathname);

  return _react2.default.createElement(ComponentView, {
    location: location,
    resolvedData: resolvedData,
    routeParams: routeParams
  });
};

Router.contextTypes = {
  getLocation: _propTypes2.default.func,
  getRoutes: _propTypes2.default.func,
  getResolvedData: _propTypes2.default.func
};

exports.default = Router;