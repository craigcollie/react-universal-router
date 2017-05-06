'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPathMap(path) {
  var map = {
    '/': 'root'
  };
  return map[path] || path;
}


function getRouteMap(routes) {
  var routeNodes = routes().props.children;

  if (Array.isArray(routeNodes)) {
    return routeNodes.reduce(function (acc, route) {
      var _route$props = route.props,
          path = _route$props.path,
          component = _route$props.component,
          resolve = _route$props.resolve,
          meta = _route$props.meta;

      acc[getPathMap(path)] = { path: path, component: component, resolve: resolve, meta: meta };
      return acc;
    }, {});
  }

  var routeNode = routes().props;
  var path = routeNode.path,
      component = routeNode.component,
      resolve = routeNode.resolve,
      meta = routeNode.meta;


  return _defineProperty({}, getPathMap(path), { path: path, component: component, resolve: resolve, meta: meta });
}

exports.default = getRouteMap;