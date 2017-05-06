// @flow
import type { RouteNodes } from './../types/Route';

function getPathMap(path: string): string {
  const map = {
    '/': 'root',
  };
  return (map[path] || path);
}

function getRouteMap(
  routes: RouteNodes,
): { [key: string]: mixed } {
  const routeNodes = routes().props.children;

  if (Array.isArray(routeNodes)) {
    return routeNodes
      .reduce((acc, route) => {
        const { path, component, resolve, meta } = route.props;
        acc[getPathMap(path)] = { path, component, resolve, meta };
        return acc;
      }, {});
  }

  const routeNode = routes().props;
  const { path, component, resolve, meta } = routeNode;

  return {
    [getPathMap(path)]: { path, component, resolve, meta },
  };
}

export default getRouteMap;
