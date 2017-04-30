// @flow
import type { Location } from './../types/Location';
import type { Route } from './../types/Route';
import type { FunctionalComponent } from './../types/ReactTypes';

const getRouteMap = (
  { path, resolve, routeParams, cache = false, meta },
  location,
  resolvedData
) => ({
  location,
  resolve,
  routeParams,
  resolvedData: (path === location.pathname) ? resolvedData : null,
  cache,
  meta,
});

type RouteComponent = FunctionalComponent<{ props: Route }>;

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
