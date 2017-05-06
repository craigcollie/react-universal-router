'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveRoute = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _getParamsFromUrl = require('./../utils/getParamsFromUrl');

var _getParamsFromUrl2 = _interopRequireDefault(_getParamsFromUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveRoute = exports.resolveRoute = function resolveRoute(resolveFn, routeParams) {
  if (typeof resolveFn === 'function') {
    return resolveFn(routeParams);
  }
  return Promise.resolve(null);
};

var isRouteCached = function isRouteCached(_ref) {
  var cache = _ref.cache,
      resolvedData = _ref.resolvedData;
  return cache && !resolvedData || !cache;
};

function resolveRoutePlugin(location, route, isHistoryEvent) {
  var _this = this;

  var locationObject = _url2.default.parse(location);
  var pathname = locationObject.pathname,
      search = locationObject.search;
  var path = route.path,
      resolve = route.resolve;


  var routeParams = (0, _getParamsFromUrl2.default)(path, pathname);

  if (!resolve || !isRouteCached(route)) {
    return this.updateRouteMap({ path: path });
  }

  return resolveRoute(resolve, routeParams).then(function (newResolvedData) {
    return _this.updateRouteMap({ path: path }, newResolvedData);
  }).catch(function (err) {
    console.error(err);
  });
}

exports.default = resolveRoutePlugin;