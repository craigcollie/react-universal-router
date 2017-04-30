// @flow
import url from 'url';

import type { Route } from './../types/Route';

export const resolveRoute = (route: Route) => {
  const { resolve: resolveFn, routeParams } = route;

  if (typeof resolveFn === 'function') {
    return resolveFn(routeParams);
  }
  return Promise.resolve(null);
};

const isRouteCached = ({ cache, resolvedData }) =>
  ((cache && !resolvedData) || (!cache));

function resolveRoutePlugin(
  location: string,
  route: Route,
  isHistoryEvent: boolean,
  callback: () => (any)
) {
  const locationObject = url.parse(location);
  const { pathname, search } = locationObject;

  if (!isRouteCached(route)) {
    return callback(locationObject);
  }

  return resolveRoute(route)
    .then(newResolvedData =>
      callback(locationObject, newResolvedData)
    ).catch((err) => {
      console.error(err);
    });
}

export default resolveRoutePlugin;
