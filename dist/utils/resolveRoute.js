'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isPromise = function isPromise(fn) {
  return fn.then === 'function';
};

var resolveRoute = function resolveRoute(routeResolve) {
  var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (resolve) {
    if (typeof routeResolve === 'function') {
      routeResolve(routeParams).then(function (res) {
        return resolve(res);
      });
    } else {
      resolve({});
    }
  });
};

exports.default = resolveRoute;