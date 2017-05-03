// @flow
import type { Location } from './../types/Location';
import type { Route, RouteComponent } from './../types/Route';

function getRouteMap(route, location, resolvedData) {
  const { path, resolve, routeParams, cache = false, meta } = route;
  return {
    pathname: path,
    resolve,
    routeParams,
    resolvedData: (path === location.pathname) ? resolvedData : null,
    cache,
    meta,
  };
}

function getRouteMapping(
  routes: Array<RouteComponent> | RouteComponent,
  location: Location,
  resolvedData: { [key: string]: any }
) {
  //  Reduce all routes props to a single object
  if (Array.isArray(routes)) {
    return routes.reduce((acc, route) => {
      const { path } = route.props;
      acc[path] = getRouteMap(route.props, location, resolvedData);
      return acc;
    }, {});
  }

  //  Only one route
  const { path } = routes.props;
  return {
    [path]: getRouteMap(routes.props, location, resolvedData),
  };
}

export default getRouteMapping;
