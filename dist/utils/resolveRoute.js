"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function resolveRoute(resolveFn, routeParams) {
  if (resolveFn) {
    return resolveFn(routeParams);
  }
  return Promise.resolve(null);
}

exports.default = resolveRoute;
//# sourceMappingURL=resolveRoute.js.map