/*
 * @name getRouteMapping
 * @description Creates a map of all <Route /> components and their props.
 */
function getRouteMapping(routes, location, resolvedData) {
  return routes.reduce((acc, route) => {
    const { path, resolve, routeParams, cache = false, meta } = route.props;

    acc[path] = {
      resolve,
      routeParams,
      resolvedData: (path === location.pathname) ? resolvedData : null,
      cache,
      meta,
    };
    return acc;
  }, {});
}

export default getRouteMapping;
