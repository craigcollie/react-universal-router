'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getRouteMap(route, location, resolvedData) {
  var path = route.path,
      resolve = route.resolve,
      routeParams = route.routeParams,
      _route$cache = route.cache,
      cache = _route$cache === undefined ? false : _route$cache,
      meta = route.meta;

  return {
    pathname: path,
    resolve: resolve,
    routeParams: routeParams,
    resolvedData: path === location.pathname ? resolvedData : null,
    cache: cache,
    meta: meta
  };
}

function getRouteMapping(routes, location, resolvedData) {
  //  Reduce all routes props to a single object
  if (Array.isArray(routes)) {
    return routes.reduce(function (acc, route) {
      var path = route.props.path;

      acc[path] = getRouteMap(route.props, location, resolvedData);
      return acc;
    }, {});
  }

  //  Only one route
  var path = routes.props.path;

  return _defineProperty({}, path, getRouteMap(routes.props, location, resolvedData));
}

exports.default = getRouteMapping;