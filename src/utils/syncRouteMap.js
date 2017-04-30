// @flow
import type { Location } from './../types/Location';

function syncRouteMap(
  location: Location,
  routeMapping: { [key: string]: any },
  resolvedData: ?{ [key: string]: any }
) {
  const { pathname } = location;
  const { resolvedData: cachedData } = routeMapping[pathname];

  return {
    routeMapping: Object.assign({}, routeMapping, {
      [pathname]: {
        ...routeMapping[pathname],
        resolvedData: (resolvedData ? resolvedData : cachedData),
      }
    }),
    location
  }
}

export default syncRouteMap;
