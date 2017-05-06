'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function isMatchingPathname(path, pathname) {
  //  Try to extract /:foo/:bar from route path
  var routeParams = path.match(/:+(.+)$/i);
  if (!routeParams) return false;

  var pathnameParts = pathname.split('/');
  var constructedPathname = path.split('/').map(function (param, i) {
    return param.indexOf(':') !== -1 ? pathnameParts[i] : param;
  }).join('/');

  return pathname === constructedPathname;
}


function matchRoute(routes, pathname) {
  var routeNodes = routes().props.children;

  if (Array.isArray(routeNodes)) {
    return routeNodes.reduce(function (acc, route) {
      var path = route.props.path;

      if (path === pathname || isMatchingPathname(path, pathname)) {
        acc = _extends({}, route.props); // eslint-disable-line
      }
      return acc;
    }, {});
  }

  return routes().props;
}

exports.default = matchRoute;
//# sourceMappingURL=matchRoute.js.map