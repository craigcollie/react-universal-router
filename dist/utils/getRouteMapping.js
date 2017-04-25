'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRouteMapping(routes) {
  return (0, _reduce2.default)(routes, function (acc, route) {
    var _route$props = route.props,
        path = _route$props.path,
        resolve = _route$props.resolve,
        routeParams = _route$props.routeParams,
        _route$props$cache = _route$props.cache,
        cache = _route$props$cache === undefined ? true : _route$props$cache,
        meta = _route$props.meta;


    acc[path] = {
      resolve: resolve,
      routeParams: routeParams,
      data: null,
      cache: cache,
      meta: meta
    };
    return acc;
  }, {});
}

exports.default = getRouteMapping;