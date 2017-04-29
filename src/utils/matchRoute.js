const isPathMatch = (item, sanitizedUrl) =>
  (item.props.path === sanitizedUrl);

/*
 * @name matchRoute
 * @description Ensure the child components we're matching are 'Route' and the path matches
 */
const matchRoute = (routes, url) => {
  return routes().props.children.filter(item =>
    (isPathMatch(item, url))
  );
};

export default matchRoute;
