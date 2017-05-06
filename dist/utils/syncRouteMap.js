'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


function syncRouteMap(location, routeMapping, resolvedData) {
  var pathname = location.pathname;

  console.log('trying to update data for ', pathname);

  // const { pathname } = location;
  // const { resolvedData: cachedData } = routeMapping[pathname];
  //
  // return {
  //   routeMapping: Object.assign({}, routeMapping, {
  //     [pathname]: {
  //       ...routeMapping[pathname],
  //       resolvedData: (resolvedData ? resolvedData : cachedData),
  //     }
  //   }),
  //   location
  // }
}
exports.default = syncRouteMap;