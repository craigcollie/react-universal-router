// @flow
import type { RouteNodes } from './../types/Route';

function getRouteMap(
  routes: RouteNodes,
) {
  const routeNodes = routes().props.children;

  if (Array.isArray(routeNodes)) {
    return routeNodes
      .reduce((acc, route) => {
        const { path, component, resolve, meta } = route.props;
        acc[path] = { path, component, resolve, meta };
        return acc;
      }, {});
  }

  const routeNode = routes().props;
  const { path, component, resolve, meta } = routeNode;

  return {
    [path]: { path, component, resolve, meta },
  };
}

export default getRouteMap;
