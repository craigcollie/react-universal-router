import reduce from 'lodash/reduce';

function getRouteMapping(routes) {
  return reduce(routes, (acc, route) => {
    const {
      path,
      resolve,
      routeParams,
      cache = true,
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