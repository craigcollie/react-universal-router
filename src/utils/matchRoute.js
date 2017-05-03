// @flow
import type { RouteComponent } from './../types/Route';

function isMatchingPathname(pathname, routeParams) {
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
  if (!Array.isArray(routes)) {
    return routes.props;
  }

  return routes
    .filter(route => {
      let { path } = route.props;
      const routeParams = path.match(/\:+(.+)$/i);

      return (path === pathname) ||
             (routeParams && isMatchingPathname(pathname, routeParams));
    })
    .reduce((acc, route) => {
      acc = { ...route.props };
      return acc;
    }, {});
}

export default matchRoute;
