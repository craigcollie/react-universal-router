/* @name syncRouteMap
 * @description Keeps all route data in sync with when additional
                routes are loaded and data is resolved
 */
function syncRouteMap(location, routeMapping, resolvedData) {
  const { pathname } = location;

  return {
    routeMapping: Object.assign({}, routeMapping, {
      [pathname]: {
        ...routeMapping[pathname],
        resolvedData,
      }
    }),
    location
  }
}

export default syncRouteMap;
