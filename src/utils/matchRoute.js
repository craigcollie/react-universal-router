// @flow
import type { RouteComponent } from './../types/Route';

function isMatchingPathname(path: string, pathname: string): boolean {
  //  Try to extract /:foo/:bar from route path
  const routeParams = path.match(/\:+(.+)$/i);
  if (!routeParams) return false;

  const pathnameParts = pathname.split('/');
  const constructedPathname = path.split('/').map((param, i) => {
    return (param.indexOf(':') !== -1)
      ? pathnameParts[i]
      : param;
  }).join('/');

  return (pathname === constructedPathname);
}

function matchRoute(
  routes: Array<RouteComponent> | RouteComponent,
  pathname: string,
) {
  const routeNodes = routes().props.children;

  if (Array.isArray(routeNodes)) {
    return routeNodes.reduce((acc, route, i, arr) => {
      const { path } = route.props;
      if ((path === pathname) || isMatchingPathname(path, pathname)) {
        acc = { ...route.props };
      }
      return acc;
    }, {});

  } else {
    return routes().props;
  }
}

export default matchRoute;
