// @flow
import type { RouteComponent } from './../types/Route';

function matchRoute(
  routes: Array<RouteComponent> | RouteComponent,
  pathname: string,
) {
  if (Array.isArray(routes)) {
    return routes.filter(item => (item.props.path === pathname));
  }
  return routes;
}

export default matchRoute;
