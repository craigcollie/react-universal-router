import isArray from 'lodash/isArray';

const getRouteMap = ({
  path,
  resolve,
  routeParams,
  cache = false,
  meta,
}, location, resolvedData) => ({
  location,
  resolve,
  routeParams,
  resolvedData: (path === location.pathname) ? resolvedData : null,
  cache,
  meta,
});

/*
 * @name getRouteMapping
 * @description Creates a map of all <Route /> components and their props.
 */
function getRouteMapping(routes, location, resolvedData) {

  //  Reduce all routes props to a single object
  if (isArray(routes)) {
    return routes.reduce((acc, route) => {
      const { path } = route.props;
      acc[path] = getRouteMap(route.props, location, resolvedData);
      return acc;
    }, {});
  }

  //  Routes is singular
  const { path } = routes.props;
  return {
    [path]: getRouteMap(routes.props, location, resolvedData),
  };
}

export default getRouteMapping;
