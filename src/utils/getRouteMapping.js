import reduce from 'lodash/reduce';

/*
 * @name getRouteMapping
 * @description Creates a map of all <Route /> components and their props.
 */
function getRouteMapping(routes) {
  return reduce(routes, (acc, route) => {
    const {
      path,
      resolve,
      routeParams,
      cache = false,
      meta,
    } = route.props;

    acc[path] = {
      resolve,
      routeParams,
      data: null,
      cache,
      meta,
    };
    return acc;
  }, {});
}

export default getRouteMapping;
