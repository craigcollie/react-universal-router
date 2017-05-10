// @flow
import type { RouteNodes } from './../types/Route';

function isMatchingPathname(path: string, pathname: string): boolean {
  //  Try to extract /:foo/:bar from route path
  const routeParams = path.match(/:+(.+)$/i);
  if (!routeParams) {
    return false;
  }

  const pathnameParts = pathname.split('/');
  const constructedPathname = path.split('/')
    .map((param, i) => (param.indexOf(':') !== -1 ? pathnameParts[i] : param))
    .join('/');

  return (pathname === constructedPathname);
}

function matchRoute(
  routes: RouteNodes,
  pathname: string,
) {
  const routeNodes = routes().props.children;

  if (Array.isArray(routeNodes)) {
    return routeNodes.reduce((acc, route) => {
      const { path } = route.props;
      if ((path === pathname) || isMatchingPathname(path, pathname)) {
        acc = { ...route.props }; // eslint-disable-line
      }
      return acc;
    }, {});
  }

  return routes().props;
}

export default matchRoute;
