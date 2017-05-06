"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @name getRouteMapping
 * @description Creates a map of all <Route /> components and their props.
 */
function getRouteMapping(routes, location, resolvedData) {
  return routes.reduce(function (acc, route) {
    var _route$props = route.props,
        path = _route$props.path,
        resolve = _route$props.resolve,
        routeParams = _route$props.routeParams,
        _route$props$cache = _route$props.cache,
        cache = _route$props$cache === undefined ? false : _route$props$cache,
        meta = _route$props.meta;


    acc[path] = {
      location: location,
      resolve: resolve,
      routeParams: routeParams,
      resolvedData: path === location.pathname ? resolvedData : null,
      cache: cache,
      meta: meta
    };
    return acc;
  }, {});
}

exports.default = getRouteMapping;