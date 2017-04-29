import isArray from 'lodash/isArray';

const isPathMatch = (item, pathname) =>
  (item.props.path === pathname);

/*
 * @name matchRoute
 * @description Ensure the child components we're matching are 'Route' and the path matches
 */
const matchRoute = (routes, pathname) => {
  const childRoutes = routes().props.children;

  if (isArray(childRoutes)) {
    return childRoutes.filter(item => isPathMatch(item, pathname));
  }

  return childRoutes;
};

export default matchRoute;
