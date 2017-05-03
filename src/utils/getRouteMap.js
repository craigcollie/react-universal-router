function getPathMap(path) {
  const map = {
    '/': 'root',
  };
  return (map[path] || path);
}

function getRouteMap(routeNodes, path, routeParams) {
  if (Array.isArray(routeNodes)) {
    return routeNodes
      .reduce((acc, route) => {
        const { path, component, resolve, meta } = route.props;

        acc[getPathMap(path)] = {
          path,
          component,
          resolve,
          meta,
        };

        return acc;
      }, {});
  }
}

export default getRouteMap;
