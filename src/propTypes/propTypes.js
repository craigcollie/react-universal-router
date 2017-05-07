import { PropTypes } from 'React';

const {
  shape,
  string,
  oneOfType,
  node,
  component,
  func,
  any,
  element,
} = PropTypes;

export const locationShape = shape({
  pathname: string.isRequired,
  search: string,
});

export const routeMapShape = shape({
  path: string,
  component: oneOfType([node, component]),
  resolve: func,
  meta: shape({
    title: string,
    description: string,
  }),
});

export const routeShape = oneOfType([node, func]);

export const resolvedDataShape = oneOfType([any]);

export const childrenShape = oneOfType([node, element]);

export const componentShape = oneOfType([func, node]);
