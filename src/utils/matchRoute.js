// @flow
import type { RouteComponent } from './../types/Route';

function isMatchingPathname(pathname: string, routeParams): boolean {
  if (!routeParams) {
    return false;
  }
  const pathnameParts = pathname.split('/');
  const constructedPathname = routeParams.input.split('/').map((param, i) => {
    if (param.indexOf(':') !== -1) {
      return pathnameParts[i];
    }
    return param;
  }).join('/');

  return (pathname === constructedPathname);
}

function matchRoute(
  routes: Array<RouteComponent> | RouteComponent,
  pathname: string,
) {
  const routeNodes = routes().props.children;

  if (Array.isArray(routeNodes)) {
    return routeNodes
      .filter(route => {
        let { path } = route.props;
        const routeParams = path.match(/\:+(.+)$/i);
        return (path === pathname) ||
               (isMatchingPathname(pathname, routeParams));
      })
      .reduce((acc, route) => {
        acc = { ...route.props };
        return acc;
      }, {});

  } else {
    return routes().props;
  }
}

export default matchRoute;
